// ============================================
// DOMController.js - Handles everything the user sees and clicks
// ============================================
// WHY THIS FILE EXISTS:
// Separation of concerns! Logic files (todo.js, project.js) don't know about HTML.
// This file is the "bridge" between your data and what the user sees.
//
// WHAT IT DOES:
// 1. renderProjects() - Shows projects in the sidebar
// 2. renderTodos() - Shows todos in the main area
// 3. setupEventListeners() - Handles button clicks and form submissions
// ============================================

import Todo from './todo.js';
import {
    getAllProjects,
    addProject,
    getProjectByName,
    removeProject,
    createDefaultProject
} from './projectManager.js';
import { saveProjects } from './storage.js';

// Keep track of which project is currently selected
let currentProject = null;

// ============================================
// Helper: Clear all children from an element
// ============================================
// WHY: Before we render new content, we clear the old content
// This prevents duplicate items appearing
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

// ============================================
// renderProjects() - Display all projects in sidebar
// ============================================
// HOW IT WORKS:
// 1. Get the container element from HTML
// 2. Clear old content
// 3. Loop through all projects
// 4. Create a button for each project
// 5. Add click handler to select that project
function renderProjects() {
    const projectsList = document.getElementById('projects-list');
    clearElement(projectsList);

    const projects = getAllProjects();

    projects.forEach(project => {
        // Create a div for each project
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project-item');

        // Create the project button
        const projectBtn = document.createElement('button');
        projectBtn.textContent = project.name;
        projectBtn.classList.add('project-btn');

        // Highlight if this is the current project
        if (currentProject && project.name === currentProject.name) {
            projectBtn.classList.add('active');
        }

        // When clicked, select this project and show its todos
        projectBtn.addEventListener('click', () => {
            currentProject = project;
            renderProjects(); // Re-render to update active state
            renderTodos();
        });

        // Create delete button (don't delete "Default" project)
        if (project.name !== 'Default') {
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'X';
            deleteBtn.classList.add('delete-project-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Don't trigger project selection
                removeProject(project.name);
                saveProjects();

                // If we deleted the current project, switch to first project
                if (currentProject && currentProject.name === project.name) {
                    currentProject = getAllProjects()[0];
                }
                renderProjects();
                renderTodos();
            });
            projectDiv.appendChild(deleteBtn);
        }

        projectDiv.appendChild(projectBtn);
        projectsList.appendChild(projectDiv);
    });
}

// ============================================
// renderTodos() - Display todos for current project
// ============================================
// HOW IT WORKS:
// 1. Get the todo list container
// 2. Clear old content
// 3. Update the project title
// 4. Loop through todos and create HTML for each
function renderTodos() {
    const todoList = document.getElementById('todo-list');
    const projectTitle = document.getElementById('current-project-name');
    clearElement(todoList);

    // If no project selected, show message
    if (!currentProject) {
        projectTitle.textContent = 'Select a project';
        return;
    }

    // Update title
    projectTitle.textContent = currentProject.name;

    // Get todos from current project
    const todos = currentProject.getTodos();

    // If no todos, show message
    if (todos.length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.textContent = 'No todos yet. Add one below!';
        emptyMsg.classList.add('empty-message');
        todoList.appendChild(emptyMsg);
        return;
    }

    // Create HTML for each todo
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-item');

        // Add 'completed' class if todo is complete
        if (todo.isComplete) {
            todoDiv.classList.add('completed');
        }

        // Todo header (checkbox + title)
        const todoHeader = document.createElement('div');
        todoHeader.classList.add('todo-header');

        // CIRCULAR CHECKBOX - Like Todoist!
        const checkbox = document.createElement('div');
        checkbox.classList.add('todo-checkbox');
        checkbox.classList.add(`priority-${todo.priority.toLowerCase()}`);

        // Show checkmark if completed
        if (todo.isComplete) {
            checkbox.innerHTML = '&#10003;'; // Checkmark symbol
            checkbox.classList.add('checked');
        }

        // When checkbox is clicked, toggle complete status
        checkbox.addEventListener('click', (e) => {
            e.stopPropagation();
            todo.toggleComplete();
            saveProjects();
            renderTodos();
        });
        todoHeader.appendChild(checkbox);

        // Title
        const title = document.createElement('span');
        title.classList.add('todo-title');
        title.textContent = todo.title;
        todoHeader.appendChild(title);

        // Delete button (small X)
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '&times;'; // X symbol
        deleteBtn.classList.add('delete-todo-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentProject.removeTodo(todo.id);
            saveProjects();
            renderTodos();
        });
        todoHeader.appendChild(deleteBtn);

        todoDiv.appendChild(todoHeader);

        // Todo details (description, notes) - collapsed by default
        const todoDetails = document.createElement('div');
        todoDetails.classList.add('todo-details');
        todoDetails.style.display = 'none'; // Hidden by default

        if (todo.description) {
            const desc = document.createElement('p');
            desc.textContent = `Description: ${todo.description}`;
            todoDetails.appendChild(desc);
        }

        if (todo.notes) {
            const notes = document.createElement('p');
            notes.textContent = `Notes: ${todo.notes}`;
            todoDetails.appendChild(notes);
        }

        todoDiv.appendChild(todoDetails);

        // Click to expand/collapse details
        todoHeader.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') {
                todoDetails.style.display = todoDetails.style.display === 'none' ? 'block' : 'none';
            }
        });

        todoList.appendChild(todoDiv);
    });
}

// ============================================
// setupEventListeners() - Handle form submissions
// ============================================
// WHY: Forms need JavaScript to work with our data
// Instead of sending data to a server, we capture it and use our classes
function setupEventListeners() {
    // ====== Handle New Project Form ======
    const projectForm = document.getElementById('new-project-form');
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Don't reload page

        const nameInput = document.getElementById('new-project-name');
        const name = nameInput.value.trim();

        if (name) {
            // Check if project already exists
            if (getProjectByName(name)) {
                alert('A project with this name already exists!');
                return;
            }

            // Add the project
            const newProject = addProject(name);
            saveProjects();

            // Select the new project
            currentProject = newProject;

            // Clear input and re-render
            nameInput.value = '';
            renderProjects();
            renderTodos();
        }
    });

    // ====== Modal Elements ======
    const modalOverlay = document.getElementById('modal-overlay');
    const addTodoBtn = document.getElementById('add-todo-btn');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // Open modal when "Add Todo" button is clicked
    addTodoBtn.addEventListener('click', () => {
        if (!currentProject) {
            alert('Please select a project first!');
            return;
        }
        modalOverlay.classList.add('active');
    });

    // Close modal when X button is clicked
    modalCloseBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    // Close modal when clicking outside the modal content
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });

    // ====== Handle New Todo Form ======
    const todoForm = document.getElementById('new-todo-form');
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Don't reload page

        // Make sure a project is selected
        if (!currentProject) {
            alert('Please select a project first!');
            return;
        }

        // Get form values
        const title = document.getElementById('new-todo-title').value.trim();
        const description = document.getElementById('new-todo-description').value.trim();
        const dueDate = document.getElementById('new-todo-due-date').value;
        const priority = document.getElementById('new-todo-priority').value;
        const notes = document.getElementById('new-todo-notes').value.trim();

        if (title && dueDate) {
            // Create new todo
            const todo = new Todo(title, description, dueDate, priority, notes, []);

            // Add to current project
            currentProject.addTodo(todo);
            saveProjects();

            // Clear form and close modal
            todoForm.reset();
            modalOverlay.classList.remove('active');

            // Re-render todos
            renderTodos();
        }
    });
}

// ============================================
// setCurrentProject() - Set which project is active
// ============================================
function setCurrentProject(project) {
    currentProject = project;
}

// ============================================
// getCurrentProject() - Get the active project
// ============================================
function getCurrentProject() {
    return currentProject;
}

// Export functions so index.js can use them
export {
    renderProjects,
    renderTodos,
    setupEventListeners,
    setCurrentProject,
    getCurrentProject
};
