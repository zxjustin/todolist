export default class Todo {
    constructor(title, description, dueDate, priority, notes = "", checklist = []){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
        this.notes = notes;
        this.checklist = checklist;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
//if I need multiple notes how use array?
    addNote(note) {
        this.notes = note
    }

    addChecklistItem(item) {
        this.checklist.push({task: item, done: false});
    }

    completeChecklistItem(index) {
        if (this.checklist[index]) {
            this.checklist[index].done = true; 
        }
    }
}
