class Todo{
    constructor(title, description, dueDate, priority, notes, checklist){
        this.id = Date.now() + Math.random();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
    }
}

export default Todo;