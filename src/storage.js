// ============================================
// storage.js - Handles saving/loading data
// ============================================
// WHY THIS FILE EXISTS:
// When user refreshes the page, JavaScript memory is cleared.
// localStorage lets us save data permanently in the browser.
// This file handles converting our objects to/from JSON.
// ============================================

import Project from './project.js';
import Todo from './todo.js';
import { getAllProjects, addProject, clearProjects } from './projectManager.js';

// The key we use to store data in localStorage
const STORAGE_KEY = 'todoAppProjects';

// ============================================
// saveProjects() - Save all projects to localStorage
// ============================================
// WHY: We need to save whenever data changes (add/remove todo or project)
// HOW: Convert projects array to JSON string and store it
//
// IMPORTANT: localStorage can only store STRINGS, not objects!
// So we use JSON.stringify() to convert objects to a string.
// ============================================
function saveProjects() {
    const projects = getAllProjects();

    // Convert to JSON-friendly format (just the data, no methods)
    const data = projects.map(project => ({
        name: project.name,
        todos: project.getTodos().map(todo => ({
            id: todo.id,
            title: todo.title,
            description: todo.description,
            dueDate: todo.dueDate,
            priority: todo.priority,
            notes: todo.notes,
            checklist: todo.checklist,
            isComplete: todo.isComplete  // Save completion status
        }))
    }));

    // Save to localStorage as a string
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ============================================
// loadProjects() - Load projects from localStorage
// ============================================
// WHY: When app starts, we need to get saved data
// HOW: Get JSON string from localStorage and convert back to objects
//
// IMPORTANT: When we load, we get plain objects (no methods!)
// We need to create new Project and Todo instances from the data.
// ============================================
function loadProjects() {
    // Get the saved string from localStorage
    const saved = localStorage.getItem(STORAGE_KEY);

    // If nothing saved, return empty (don't crash!)
    if (!saved) {
        return;
    }

    // Clear existing projects before loading (avoid duplicates)
    clearProjects();

    // Parse JSON string back to objects
    const data = JSON.parse(saved);

    // Recreate Project and Todo objects from the plain data
    data.forEach(projectData => {
        // Create a new Project object
        const project = addProject(projectData.name);

        // Add each todo to the project
        projectData.todos.forEach(todoData => {
            // Create a new Todo object with the saved data
            const todo = new Todo(
                todoData.title,
                todoData.description,
                todoData.dueDate,
                todoData.priority,
                todoData.notes,
                todoData.checklist
            );
            // Restore the original ID (don't generate new one)
            todo.id = todoData.id;

            // Restore completion status
            todo.isComplete = todoData.isComplete || false;

            // Add to project
            project.addTodo(todo);
        });
    });
}

// Export so other files can use these functions
export { saveProjects, loadProjects };
