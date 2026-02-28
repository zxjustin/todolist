// ============================================
// Todo Class - Blueprint for ONE todo item
// ============================================

class Todo {
    constructor(title, description, dueDate, priority, notes, checklist) {
        this.id = Date.now() + Math.random();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
        this.isComplete = false;  // NEW: Track if todo is done
    }

    // Toggle the completion status
    toggleComplete() {
        this.isComplete = !this.isComplete;
    }
}

export default Todo;