DROP DATABASE IF EXISTS  employee_tracker;

CREATE DATABASE  employee_tracker;

USE employee_tracker;

CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE  role  (
  id INTEGER AUTO_INCREMENT PRIMARY KEY ,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
   department_id INTEGER ,
  FOREIGN KEY (department_id) REFERENCES department(id) on delete set null

);

CREATE TABLE  employee  (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER ,
manager_id Integer ,
FOREIGN KEY (role_id) REFERENCES role(id) on delete set null
);