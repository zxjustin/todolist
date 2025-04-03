import Todo from "./todo";
export default class Storage {

static saveTodoList(todoList) {
    localStorage.setItem("todoList", JSON.stringify(todoList.projects));
  }
  
  static loadTodoList() {
    const data = JSON.parse(localStorage.getItem("todoList"));
    if (!data) return new TodoList();
  
    const todoList = new TodoList();
    todoList.projects = data.map(projectData => {
      const project = new Project(projectData.name);
      project.todos = projectData.todos.map(todo => 
        new Todo(todo.title, todo.description, todo.dueDate, todo.priority));
      return project;
    });
  
    return todoList;
  }
}
