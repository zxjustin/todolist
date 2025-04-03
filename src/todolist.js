import Storage from "./storage";
export default class TodoList {
    constructor() {
        this.projects = [new Project("Default")];
    }

    addProject(name) {
        this.projects.push(new Project(name));
        Storage.saveTodoList(this);
    }

    removeProject(index) {
        this.projects.splice(index, 1);
        Storage.saveTodoList(this);
    }
}