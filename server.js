const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// Read and return the list of employees
app.get('/employees', (req, res) => {
    fs.readFile('employees.json', 'utf-8', (err, data) => {
        if (err) throw err;
        res.send(JSON.parse(data));
    });
});

// Add a new employee
app.post('/add-employee', (req, res) => {
    fs.readFile('employees.json', 'utf-8', (err, data) => {
        if (err) throw err;
        
        const employees = JSON.parse(data);
        employees.push(req.body);

        fs.writeFile('employees.json', JSON.stringify(employees, null, 4), err => {
            if (err) throw err;
            res.sendStatus(200);
        });
    });
});

// Update employee
app.post('/update-employee', (req, res) => {
    fs.readFile('employees.json', 'utf-8', (err, data) => {
        if (err) throw err;

        let employees = JSON.parse(data);
        employees = employees.map(emp => 
            emp.name === req.body.oldName ? { name: req.body.newName, role: req.body.newRole } : emp
        );

        fs.writeFile('employees.json', JSON.stringify(employees, null, 4), err => {
            if (err) throw err;
            res.sendStatus(200);
        });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
