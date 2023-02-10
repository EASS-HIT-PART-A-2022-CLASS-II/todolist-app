from http import client
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "bobo"}

def test_dbget():
    response = client.get("/todos/get_all_todos")
    print(response)
    assert response.status_code == 200