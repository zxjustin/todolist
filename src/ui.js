import Storage from "./storage";
import Todo from "./todo";
import Project from "./project";
import TodoList from "./todolist";

const todoList = Storage.loadTodoList();
const projectSelect = document.getElementById("project-select");
const todoListContainer = document.getElementById("todo-list");

//Display Projects
function displayProjects() {
    projectSelect.innerHTML = "";
    todoList.projects.forEach((project , index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = project.name;
        projectSelect.appendChild(option);
    })
}

//Display Todos for selected projects
function displayTodos(projectIndex) {
    todoListContainer.innerHTML = "";
    const project = todoList.projects[projectIndex]

    project.todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.innerHTML =`<strong>${todo.title}</strong> - Due: ${todo.dueDate} - Priority: ${todo.priority} 
            <button onclick="removeTodo(${projectIndex}, ${index})">Delete</button>`;
        todoListContainer.appendChild(li);
    })
}

//Add New Project
document.getElementById("new-project-btn").addEventListener("click", () => {
    const projectName = prompt("Enter Project Name");
    if (projectName) {
        todoList.addProject(projectName);
        displayProjects();
    }
});

//add New Todo
document.getElementById("add-todo-btn").addEventListener("click", () => {
    const title = document.getElementById("todo-title").value;
    const dueDate = document.getElementById("todo-dueDate").value
    const priority = document.querySelector("select[name='todo-priority']").value
    const projectIndex = projectSelect.value;

    if (title && dueDate) {
        const newTodo = new Todo(title, "", dueDate, priority);
        todoList.projects[projectIndex].addTodo(newTodo);
        displayTodos(projectIndex);
    }
});

//Remove Todo
window.removeTodo = (projectIndex, todoIndex) => {
    todoList.projects[projectIndex].removeTodo(todoIndex);
    displayTodos(projectIndex);
};

//UI Set up initial
document.addEventListener("DOMContentLoaded", () => {
    displayProjects();
    displayTodos(0);
});