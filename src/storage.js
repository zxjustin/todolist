import Project from "./project";

export default class Storage{
    static saveProjects(projects) {
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    static loadProjects() {
        const data = JSON.parse(localStorage.getItem("projects")) || [];
        return data.map(projectData => {
            const project = new Project(projectData.name);
            projectData.todos.forEach(todo => {
                project.addTodo(new todo(todo.title, todo.description, todo.dueDate, todo.priority, todo.notes, todo.checklist));
            });
            return project;
        });
    }
}