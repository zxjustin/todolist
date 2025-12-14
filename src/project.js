class Project {
    constructor (name, todos =[]){
        this.name = name;
        this.todos = todos;
    }

    //consist of todos in the empty array
    addTodo(todo) {
        this.todos.push(todo);        
    }

    //removing of todo from array
    removeTodo(todoId){
        this.todos = this.todos.filter(todo => todo.id !== todoId); 
    }

    //retreive todos so I put return?
    getTodos(){
        return this.todos;
    }
}

export default Project;