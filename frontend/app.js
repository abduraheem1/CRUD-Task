document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const signinButton = document.getElementById('signin-button');
    const logoutButton = document.getElementById('logout-button');
    const errorMessage = document.getElementById('error-message');
    const signinErrorMessage = document.getElementById('signin-error-message');
    const registerErrorMessage = document.getElementById('register-error-message');
    let token = localStorage.getItem('token');

    const getToken = () => {
        return localStorage.getItem('token');
    };

    const setToken = (newToken) => {
        token = newToken;
        localStorage.setItem('token', newToken);
    };

    const removeToken = () => {
        token = null;
        localStorage.removeItem('token');
    };

    const showError = (message) => {
        if (errorMessage) errorMessage.textContent = message;
    };

    const fetchTasks = async () => {
        try {
            const response = await fetch('/api/tasks', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch tasks.');
            const tasks = await response.json();
            tasks.forEach(task => addTaskToDOM(task));
        } catch (error) {
            showError('Error fetching tasks. Please sign in.');
        }
    };

    const addTaskToDOM = (task) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span>${task.name}</span>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        `;
        li.querySelector('.delete').addEventListener('click', () => deleteTask(task.id, li));
        li.querySelector('.edit').addEventListener('click', () => editTask(task.id, task.name, li));
        taskList.appendChild(li);
    };

    taskForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const taskName = taskInput.value.trim();
        if (taskName) {
            try {
                const response = await fetch('/api/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ name: taskName })
                });
                if (!response.ok) throw new Error('Failed to add task.');
                const newTask = await response.json();
                addTaskToDOM(newTask);
                taskInput.value = '';
            } catch (error) {
                showError('Error adding task. Please sign in.');
            }
        }
    });

    const deleteTask = async (id, taskElement) => {
        try {
            await fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            taskList.removeChild(taskElement);
        } catch (error) {
            showError('Error deleting task. Please sign in.');
        }
    };

    const editTask = async (id, oldName, taskElement) => {
        const newName = prompt('Edit task name:', oldName);
        if (newName && newName !== oldName) {
            try {
                const response = await fetch(`/api/tasks/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ name: newName })
                });
                if (!response.ok) throw new Error('Failed to update task.');
                const updatedTask = await response.json();
                taskElement.querySelector('span').textContent = updatedTask.name;
            } catch (error) {
                showError('Error updating task. Please sign in.');
            }
        }
    };

    const handleSignin = async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) throw new Error('Failed to sign in.');
            const data = await response.json();
            setToken(data.token);
            window.location.href = 'index.html';
        } catch (error) {
            if (signinErrorMessage) signinErrorMessage.textContent = 'Invalid email or password.';
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) throw new Error('Failed to register.');
            const data = await response.json();
            window.location.href = 'signin.html';
        } catch (error) {
            if (registerErrorMessage) registerErrorMessage.textContent = 'Error registering. Please try again.';
        }
    };

    const handleLogout = () => {
        removeToken();
        window.location.href = 'signin.html';
    };

    const initializeAuthButtons = () => {
        if (token) {
            signinButton.style.display = 'none';
            logoutButton.style.display = 'inline-block';
            taskForm.style.display = 'block';
            fetchTasks();
        } else {
            signinButton.style.display = 'inline-block';
            logoutButton.style.display = 'none';
            taskForm.style.display = 'none';
        }
    };

    signinButton?.addEventListener('click', () => {
        window.location.href = 'signin.html';
    });

    logoutButton?.addEventListener('click', handleLogout);

    const signinForm = document.getElementById('signin-form');
    signinForm?.addEventListener('submit', handleSignin);

    const registerForm = document.getElementById('register-form');
    registerForm?.addEventListener('submit', handleRegister);

    initializeAuthButtons();
});
