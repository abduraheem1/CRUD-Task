// javascript to get data from backend and display ot dynamically

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    const fetchTasks = async () => {
        try {
            const response = await fetch('/api/tasks');
            const tasks = await response.json();
            tasks.forEach(task => addTaskToDOM(task));
        } catch (error) {
            console.error('Error fetching tasks:', error);
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

    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const taskName = taskInput.value.trim();
        if (taskName) {
            try {
                const response = await fetch('/api/tasks', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: taskName })
                });
                const newTask = await response.json();
                addTaskToDOM(newTask);
                taskInput.value = '';
            } catch (error) {
                console.error('Error adding task:', error);
            }
        }
    });

    const deleteTask = async (id, taskElement) => {
        try {
            await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
            taskList.removeChild(taskElement);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const editTask = async (id, oldName, taskElement) => {
        const newName = prompt('Edit task name:', oldName);
        if (newName && newName !== oldName) {
            try {
                const response = await fetch(`/api/tasks/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: newName })
                });
                const updatedTask = await response.json();
                taskElement.querySelector('span').textContent = updatedTask.name;
            } catch (error) {
                console.error('Error updating task:', error);
            }
        }
    };

    fetchTasks();
});
