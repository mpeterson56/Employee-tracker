DROP DATABASE IF EXISTS  employee_tracker;

CREATE DATABASE  employee_tracker;

USE employee_tracker;

CREATE TABLE departments (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE  roles  (
  id INTEGER AUTO_INCREMENT PRIMARY KEY ,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
   department_id INTEGER ,
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id)

);

CREATE TABLE  employees  (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER ,
managers_id Integer ,
CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) 
);