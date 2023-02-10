CREATE DATABASE IF NOT EXISTS db;
USE db;

CREATE TABLE ToDoList (
    ID int primary key auto_increment,
    ToDoName varchar(255),
    StatusState varchar(255)
);

