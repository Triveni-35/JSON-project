// Fetch and display employees from JSON
fetch('/employees')
    .then(response => response.json())
    .then(data => {
        const employeeList = document.getElementById('employee-list');
        employeeList.innerHTML = data.map(emp => 
            `<tr>
                <td>${emp.name}</td>
                <td>${emp.role}</td>
                <td><button onclick="editEmployee('${emp.name}', '${emp.role}')">Edit</button></td>
            </tr>`
        ).join('');
    });

// Add new employee
document.getElementById('add-employee-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    
    fetch('/add-employee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role })
    })
    .then(() => {
        window.location.reload(); // Reload to see the updated list
    });
});

// Edit employee (basic edit functionality for demo purposes)
function editEmployee(name, role) {
    const newName = prompt('Enter new name:', name);
    const newRole = prompt('Enter new role:', role);
    
    if (newName && newRole) {
        fetch('/update-employee', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ oldName: name, newName, newRole })
        })
        .then(() => {
            window.location.reload(); // Reload to see the updated list
        });
    }
}
