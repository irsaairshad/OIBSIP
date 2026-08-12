/* ================================================
   TO-DO WEB APP JAVASCRIPT
   OASIS INFOBYTE - Web Development L2, Task 3
   ================================================ */

// Task Manager Class
class TaskManager {
    constructor() {
        this.tasks = [];
        this.editingTaskId = null;
        this.storageKey = 'todoAppTasks';
        
        this.initializeElements();
        this.loadTasks();
        this.attachEventListeners();
        this.render();
        
        console.log('✅ Task Manager initialized');
    }

    // Initialize DOM elements
    initializeElements() {
        this.taskInput = document.getElementById('taskInput');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.pendingList = document.getElementById('pendingList');
        this.completedList = document.getElementById('completedList');
        this.pendingCount = document.getElementById('pendingCount');
        this.completedCount = document.getElementById('completedCount');
        this.totalTasks = document.getElementById('totalTasks');
        this.completionRate = document.getElementById('completionRate');
        this.tasksToday = document.getElementById('tasksToday');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.taskTemplate = document.getElementById('taskTemplate');
        this.modal = document.getElementById('editModal');
        this.editTaskInput = document.getElementById('editTaskInput');
        this.saveEditBtn = document.getElementById('saveEditBtn');
        this.cancelEditBtn = document.getElementById('cancelEditBtn');
        this.closeModalBtn = document.getElementById('closeModalBtn');
        this.toast = document.getElementById('toast');
        this.pendingEmpty = document.getElementById('pendingEmpty');
        this.completedEmpty = document.getElementById('completedEmpty');
    }

    // Attach event listeners
    attachEventListeners() {
        this.addTaskBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        this.resetBtn.addEventListener('click', () => this.resetAllTasks());
        this.saveEditBtn.addEventListener('click', () => this.saveEdit());
        this.cancelEditBtn.addEventListener('click', () => this.closeModal());
        this.closeModalBtn.addEventListener('click', () => this.closeModal());
        this.editTaskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.saveEdit();
        });
    }

    // Load tasks from localStorage
    loadTasks() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            this.tasks = stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading tasks:', error);
            this.tasks = [];
        }
    }

    // Save tasks to localStorage
    saveTasks() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
        } catch (error) {
            console.error('Error saving tasks:', error);
            this.showToast('Error saving tasks', 'error');
        }
    }

    // Add new task
    addTask() {
        const taskText = this.taskInput.value.trim();
        
        if (!taskText) {
            this.showToast('Please enter a task', 'error');
            this.taskInput.focus();
            return;
        }

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date().toLocaleString(),
            completedAt: null
        };

        this.tasks.unshift(task);
        this.saveTasks();
        this.taskInput.value = '';
        this.taskInput.focus();
        this.render();
        this.showToast('Task added successfully!');
    }

    // Toggle task completion
    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date().toLocaleString() : null;
            this.saveTasks();
            this.render();
            
            const message = task.completed ? 'Task completed!' : 'Task moved back to pending';
            this.showToast(message);
        }
    }

    // Open edit modal
    openEditModal(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            this.editingTaskId = taskId;
            this.editTaskInput.value = task.text;
            this.editTaskInput.focus();
            this.modal.style.display = 'flex';
        }
    }

    // Close edit modal
    closeModal() {
        this.modal.style.display = 'none';
        this.editingTaskId = null;
        this.editTaskInput.value = '';
    }

    // Save task edits
    saveEdit() {
        if (this.editingTaskId === null) return;

        const newText = this.editTaskInput.value.trim();
        if (!newText) {
            this.showToast('Task cannot be empty', 'error');
            return;
        }

        const task = this.tasks.find(t => t.id === this.editingTaskId);
        if (task) {
            task.text = newText;
            this.saveTasks();
            this.closeModal();
            this.render();
            this.showToast('Task updated successfully!');
        }
    }

    // Delete task
    deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(t => t.id !== taskId);
            this.saveTasks();
            this.render();
            this.showToast('Task deleted');
        }
    }

    // Clear completed tasks
    clearCompleted() {
        const completedCount = this.tasks.filter(t => t.completed).length;
        
        if (completedCount === 0) {
            this.showToast('No completed tasks to clear', 'info');
            return;
        }

        if (confirm(`Delete ${completedCount} completed task(s)?`)) {
            this.tasks = this.tasks.filter(t => !t.completed);
            this.saveTasks();
            this.render();
            this.showToast('Completed tasks cleared');
        }
    }

    // Reset all tasks
    resetAllTasks() {
        if (confirm('Delete ALL tasks? This cannot be undone.')) {
            this.tasks = [];
            this.saveTasks();
            this.render();
            this.showToast('All tasks reset');
        }
    }

    // Show toast notification
    showToast(message, type = 'success') {
        this.toast.textContent = message;
        this.toast.className = `toast ${type}`;
        this.toast.style.display = 'block';

        setTimeout(() => {
            this.toast.style.display = 'none';
        }, 3000);
    }

    // Render all tasks
    render() {
        this.renderTaskList();
        this.updateStats();
    }

    // Render task lists
    renderTaskList() {
        const pending = this.tasks.filter(t => !t.completed);
        const completed = this.tasks.filter(t => t.completed);

        // Clear lists
        this.pendingList.innerHTML = '';
        this.completedList.innerHTML = '';

        // Render pending tasks
        if (pending.length === 0) {
            this.pendingList.appendChild(this.pendingEmpty.cloneNode(true));
        } else {
            pending.forEach(task => {
                this.pendingList.appendChild(this.createTaskElement(task));
            });
        }

        // Render completed tasks
        if (completed.length === 0) {
            this.completedList.appendChild(this.completedEmpty.cloneNode(true));
        } else {
            completed.forEach(task => {
                this.completedList.appendChild(this.createTaskElement(task));
            });
        }

        // Update counts
        this.pendingCount.textContent = `${pending.length} pending`;
        this.completedCount.textContent = `${completed.length} completed`;
    }

    // Create task element from template
    createTaskElement(task) {
        const clone = this.taskTemplate.content.cloneNode(true);
        const taskItem = clone.querySelector('.task-item');
        const checkbox = clone.querySelector('.task-checkbox');
        const taskText = clone.querySelector('.task-text');
        const taskTimestamp = clone.querySelector('.task-timestamp');
        const btnEdit = clone.querySelector('.btn-edit');
        const btnDelete = clone.querySelector('.btn-delete');

        taskItem.setAttribute('data-task-id', task.id);
        checkbox.checked = task.completed;
        taskText.textContent = task.text;
        
        // Show completion time if completed, otherwise show creation time
        const timeToShow = task.completed ? task.completedAt : task.createdAt;
        taskTimestamp.textContent = timeToShow ? new Date(timeToShow).toLocaleTimeString() : '';

        if (task.completed) {
            taskItem.classList.add('completed');
        }

        checkbox.addEventListener('change', () => this.toggleTask(task.id));
        btnEdit.addEventListener('click', () => this.openEditModal(task.id));
        btnDelete.addEventListener('click', () => this.deleteTask(task.id));

        return clone;
    }

    // Update statistics
    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const today = this.tasks.filter(t => {
            const taskDate = new Date(t.createdAt).toDateString();
            const todayDate = new Date().toDateString();
            return taskDate === todayDate;
        }).length;

        this.totalTasks.textContent = total;
        this.completionRate.textContent = total === 0 ? '0%' : `${Math.round((completed / total) * 100)}%`;
        this.tasksToday.textContent = today;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
});
