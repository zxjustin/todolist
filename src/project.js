import Todo from "./todo.js";
import Storage from "./storage.js";
export default class Project{
    constructor(name) {
        this.name = name;
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
        Storage.saveTodoList(todoList);
    }

    removeTodo(index) {
        this.todos.splice(index, 1);
        Storage.saveTodoList(todoList)
    }
}