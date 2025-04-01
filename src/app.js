import UI from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
    UI.displayProjects();

    document.getElementById("add-project-btn").addEventListener("click", () => {
        const name = prompt("Enter project name:");
        if (name) UI.addProject(name);
    });

    document.getElementById("add-todo-btn").addEventListener("click", () => {
        const title = document.getElementById("todo-title").value;
        const description = document.getElementById("todo-description").value;
        const dueDate = document.getElementById("todo-dueDate").value;
        const priority = document.getElementById("todo-priority").value;
        const projectIndex = 0; // Default project for now

        if (!title) return alert("Please enter a title!");
        UI.addTodoToProject(projectIndex, title, description, dueDate, priority);
    });
});
