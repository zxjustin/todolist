export default class Todo {
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}

const myTodo = new Todo("Buy groceries", "Milk, Eggs, Bread", "2025-04-01", "High");
console.log(myTodo);