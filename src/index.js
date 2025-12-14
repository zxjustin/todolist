import Todo from './todo.js';
import Project from './project.js';

const project = new Project ("Work:");

const todo1 = new Todo("Task 1, Description1, 2024-12-31", "High", "", []);
const todo2 = new Todo("Task 2, Description2, 2024-12-31", "High", "", []);

console.log("Todo1 ID:", todo1.id);
console.log("Todo2 ID:", todo2.id);

project.addTodo(todo1);
project.addTodo(todo2);

console.log("Before remove:", project.getTodos().length); // Should be 2
project.removeTodo(todo1.id);

console.log("After remove:", project.getTodos().length); // should be 1
console.log("Remaining todo:", project.getTodos()[0].title); // task2?