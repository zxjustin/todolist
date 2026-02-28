// ============================================
// index.js - Entry Point / App Initialization
// ============================================
// WHY THIS FILE EXISTS:
// This is where the app STARTS. It's the first JavaScript file that runs.
// It imports all the other modules and initializes everything.
//
// WHAT IT DOES:
// 1. Import CSS (webpack bundles it)
// 2. Import all our modules
// 3. Load saved data from localStorage
// 4. Create default project if none exists
// 5. Display the UI
// 6. Set up event handlers
// ============================================

// Import CSS - webpack will bundle it
import './styles.css';

// Import our modules
import { getAllProjects, createDefaultProject } from './projectManager.js';
import { loadProjects, saveProjects } from './storage.js';
import {
    renderProjects,
    renderTodos,
    setupEventListeners,
    setCurrentProject
} from './DOMController.js';

// ============================================
// init() - Initialize the app
// ============================================
// This function runs when the page loads.
// It sets up everything the app needs to work.
function init() {
    console.log('Todo App Starting...');

    // Step 1: Load any saved projects from localStorage
    loadProjects();
    console.log('Loaded projects from storage');

    // Step 2: If no projects exist, create the default one
    if (getAllProjects().length === 0) {
        console.log('No projects found, creating default...');
        createDefaultProject();
        saveProjects();
    }

    // Step 3: Set the first project as the current project
    const projects = getAllProjects();
    if (projects.length > 0) {
        setCurrentProject(projects[0]);
    }

    // Step 4: Render the UI
    renderProjects();
    renderTodos();

    // Step 5: Set up event listeners for forms
    setupEventListeners();

    console.log('Todo App Ready!');
}

// Run init when the page is fully loaded
init();
