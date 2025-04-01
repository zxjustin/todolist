import Project from "./project";

export default class addTodoList {
    constructor() {
        this.projects = [new Project("Default")];
    }

    addProject(name) {
        this.projects.push(new Project(name));
    }

    getProject(name) {
        return this.projects.find(project => project.name===name);
    }

    removeProject(name) {
        this.projects = this.projects.filter(project => project.name != name);
    }
}

