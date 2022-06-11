USE employee_tracker;
INSERT INTO departments (department_name)
VALUES ('plumber'),
    ('carpenter'),
    ('Electrical'),
    ('General contractor');
Insert INTO roles (title, salary, department_id)
Values ('plumber Manager', 50000, 1),
    ('plumber lvl 1', 40000, 1),
    ('plumber lvl 2', 45000, 1),
    ('carpenter manager', 55000, 2),
    ('carpenter lvl 1', 45000, 2),
    ('carpenter lvl 2', 50000, 2),
    ('electrical manager', 60000, 3),
    ('electrical lvl 1', 50000, 3),
    ('electrical lvl 2', 55000, 3),
    ('GC Project manager', 75000, 4),
    ('GC onsite', 80000, 4);
Insert Into employees (first_name, last_name, role_id, managers_id)
VALUES ('mikey', 'michaelson', 1, NULL),
    ('joey', 'joeyson', 2, 1),
    ('matt', 'materdaddy', 3, 1),
    ('billy', 'billson', 4, NULL),
    ('namey', 'namerson', 5, 3),
    ('tom', 'tomethson', 6, 1),
    ('hippity', 'hoppity', 7, NULL),
    ('hermit', 'Mcdermit', 8, 5),
    ('harry', 'McCarry', 9, 1),
    ('tony', 'Datiger', 10, NULL),
    ('sam', 'deTucan', 11, 7);