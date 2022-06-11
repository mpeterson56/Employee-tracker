const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    console.log('Connected to the employee_tracker database.')
);

const PromptUser = () => {
    inquirer
        .prompt({
                name: 'action',
                type: 'list',
                message: "What would you like to do?",
                choices: [
                    'View All Departments', 
                    'View All Roles', 
                    'View All Employees', 
                    'Add a Department', 
                    'Add a Role', 
                    'Add an Employee', 
                    'Update an Employee Role'
                ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View All Departments':
                    viewDepartments();
                    break;
                
                case 'View All Roles':
                    viewRoles();
                    break;
                
                case 'View All Employees':
                    viewEmployees();
                    break;

                case 'Add a Department':
                    addDepartment();
                    break;

                case 'Add an Employee':
                    addEmployee();
                    break;
                
                case 'Update an Employee Record':
                    updateEmployee();
                    break;
                
                    case "Update Employee Roles":
                        updateRoles();
                        break;


                case 'Add a Role':
                    addRoles();
                    break;
            }
        });
};

const viewDepartments = () => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err);
            return;
        }
        console.table(rows);
        PromptUser();
        return;
    });
};

const viewRoles = () => {
    const sql = 'SELECT * FROM roles';
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err);
            return;
        }
        console.table(rows);
        PromptUser();
        return;
    });
};

const viewEmployees = () => {
    const sql = `SELECT * FROM employees`;
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err);
            return;
        }
        console.table(rows);
        PromptUser();
        return;
    });
};
const addDepartment = () => {

    inquirer
        .prompt([
            {
                name: 'addDepartment',
                type: 'input',
                message: 'What is the name of the new department?',
            }
        ])
        .then(body = (response) => {
            const sql = `INSERT INTO departments (department_name) VALUES ('${response.addDepartment}');`;
            const param = [body.addDepartment];
            db.query(sql, param, (err, res) => {
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                }
                viewDepartments();
            });
        });
};
const addEmployee = () => {
    console.log("Add an employee");
      inquirer
      .prompt([
        {
          name: "newEmployeeFirstName",
          type: "input",
          message: "What is the new employee's first name?",
        },
        {
          name: "newEmployeeLastName",
          type: "input",
          message: "What is the new employee's last name?",
        },
        {
          name: "newEmployeeRoleID",
          type: "number",
          message: "What is the role ID for your new employee?",
        },
        {
          name: "newEmployeeManagerID",
          type: "number",
          message: "What is the manager ID for your new employee?",
        },
      ])
      .then(function (answer) {
        db.query(
          `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.newEmployeeFirstName}", "${answer.newEmployeeLastName}", "${answer.newEmployeeSalary}", "${answer.newEmployeeRoleID}", "${answer.newEmployeeManagerID}");`,
          function (err, data) {
               console.log("Employee has been added.");
          }
        );
        viewEmployees();
      });
  }
    


const updateEmployee = () => {
    console.log("Update an employee record");
  
    db.query("SELECT * FROM employees;", function (err, data) {
        console.table(data);
          inquirer
          .prompt([
            {
            name: "updateEmployee",
            type: "input",
            message: "Enter the id of the employee to update.",
          },
          {
            name: "updateInfo",
            type: "list",
            message: "What would you like to update?",
            choices: [
                "first_name",
                "last_name",
                "role_id",
                "manager_id",
              ],
          },
          {
              name: "updateInput",
              type: "input",
              message: "What is the new Data?",
            }
        ])
          .then(function (answer) {
              let query = `
                UPDATE employees 
                SET ${answer.updateInfo} = '${answer.updateInput}'
                WHERE id = ${answer.updateEmployee};`
              console.log(query)
            db.query(
              query,
              function (err, data) {
                if (err) {
                    console.log(err)
                    return;
                } else {
                    console.log("updated Employee.");
                    viewEmployees();
                    return;
                }
              }
            )}
        )
    });
  }


  function addRoles() {
    console.log('aa');

    // query all the depts
    connection.promise().query("SELECT * FROM Department")
        .then((res) => {
            // make the choice dept arr
            return res[0].map(dept => {
                return {
                    name: dept.name,
                    value: dept.id
                }
            })
        })
        .then((departments) => {

            return inquirer.prompt([

                {
                    type: 'input',
                    name: 'roles',
                    message: 'Please add a role:'
                },

                {
                    type: 'input',
                    name: 'salary',
                    message: 'Please enter a salary:'
                },

                {
                    type: 'list',
                    name: 'department',
                    choices: departments,
                    message: 'Please select your department.'
                }
            ])
        })

        .then(answer => {
            console.log(answer);
            return connection.promise().query('INSERT INTO role SET ?', { title: answer.roles, salary: answer.salary, department_id: answer.departments });
        })
        .then(res => {
            console.log('Added new role')
            runList();

        })
        .catch(err => {
            throw err
        });
}




const updateRoles = () => {
    console.log("Update Roles");

    db.query("SELECT * FROM roles;", function (err, data) {
        console.table(data);
          inquirer
          .prompt([
        {
          name: "newRoleTitle",
          type: "input",
          message: "What is the job title for the new role?",
        },
        {
          name: "newRoleSalary",
          type: "number",
          message: "What is the salary for the new role?",
        },
        {
          name: "newRoleDepartmentID",
          type: "number",
          message: "What is the department ID for the new role? 1=plumber,2=carpenter,3=electrical,4=General contractor",
        },
      ])
        .then(function (answer) {
            db.query(
          `INSERT INTO roles (title, salary, department_id) VALUES ("${answer.newRoleTitle}", "${answer.newRoleSalary}", "${answer.newRoleDepartmentID}");`,
          function (err, data) {
            if (err) {
                console.log(err);
                return;
            } else {
                console.log("The New Role has been added.");
                viewRoles();
                return;
            }
          }
        );
      });
    }
)}

PromptUser();

