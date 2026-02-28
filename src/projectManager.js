import Project from "./project.js";

// ============================================
// projectManager.js - Manages ALL projects
// ============================================
// WHY: This is the "master controller" for all projects.
// It stores them in an array and provides functions to manipulate them.
// ============================================

// This array holds ALL projects in the app
let projects = [];

// ============================================
// clearProjects() - Clear all projects
// ============================================
// WHY: Needed when loading from localStorage to avoid duplicates
function clearProjects() {
    projects = [];
}

function createDefaultProject(){
    const defaultProject = new Project ("Default");
    projects.push(defaultProject);
    return defaultProject;
}

function addProject(name){
    const newProject = new Project(name);
    projects.push(newProject);
    return newProject;
}

function getAllProjects(){
    return projects;
}

function removeProject(projectName){
    projects = projects.filter(project => project.name !== projectName)
}

function getProjectByName(name) {
    return projects.find(project => project.name === name);
}

export {
    createDefaultProject,
    addProject,
    getAllProjects,
    removeProject,
    getProjectByName,
    clearProjects
};