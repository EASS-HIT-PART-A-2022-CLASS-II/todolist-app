from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector


mydb = mysql.connector.connect(
  host="database",
  user="root",
  password="root",
  database="db",
  port="3306"
)

mycursor = mydb.cursor()

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Todo(BaseModel):
    task: str
    id: str
    completed: bool = False

todos = []

@app.get("/")
async def root():
  return {"message": "bobo"}


@app.get("/todos/get_all_todos")
def read_todos():
  print("got here")
  mycursor.execute("SELECT * FROM ToDoList")
  myresult = mycursor.fetchall()
  print(myresult)
  return {"res": myresult}


@app.get("/todos/create_todo/{todoName}/{statusState}")
def create_todo(todoName, statusState):
  sql = "INSERT INTO ToDoList (ToDoName, StatusState) VALUES (%s, %s)"
  val = (todoName, statusState)
  print(todoName, statusState)
  mycursor.execute(sql, val)
  mydb.commit()
  return todos

@app.put("/todos/{task_id}")
def update_todo(task_id: str, task: Todo):
  for t in todos:
      if t.id == task_id:
        t.task = task.task
        return t
  return {"error": "Task not found"}

@app.put("/todos/complete/{task_id}")
def complete_todo(task_id: str):
  for t in todos:
      if t.id == task_id:
        t.completed = True
        return t
  return {"error": "Task not found"}

@app.get("/todos/delete/{name}")
def delete_todo(name):
  temp = name
  sql = "DELETE FROM ToDoList WHERE ToDoName = '" + temp + "'"
  mycursor.execute(sql)
  mydb.commit() 
  return {"deleted {name}"}
 
@app.get("/todos/statuschange/{state}/{name}")
def statusState(state,name):
  sql = "UPDATE ToDoList SET StatusState = '" + state + "' WHERE ToDoName = '" + name + "'"
  mycursor.execute(sql)
  mydb.commit()

@app.get("/todos/editname/{name}/{new_name}")
def editName(name,new_name):
   sql = "UPDATE ToDoList SET ToDoName = '" + new_name + "' WHERE ToDoName = '" + name + "'"
   mycursor.execute(sql)
   mydb.commit()
