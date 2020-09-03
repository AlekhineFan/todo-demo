class Todo {
    constructor(text, dom){
        this.isCompleted = false;
        this.dom = dom;
        this.markCompletedButtonHTML = `<img src="./images/check.png" class="completed">`;
        this.deleteButtonHTML = `<img src="./images/trash.png" class="delete">`;
        this.editButtonHTML = `<img src="./images/edit.png" class="edit">`;
        this.dom.innerHTML = `<span></span>${this.markCompletedButtonHTML}${this.deleteButtonHTML}${this.editButtonHTML}`;
        this.setText(text);
    }

    setText(text){
        this.text = text;
        this.dom.getElementsByTagName('span')[0].innerHTML = text;
    }
}

class TodoApp {
    constructor(){
        this.todos = [];
        this.listDom = document.getElementById('todo-items');
        this.todoText = document.getElementById("input-text");
        this.editedElementIndex = undefined;
        this.buttonSave = document.querySelector("#save-btn");
        this.initButtons();
        this.buttonSave.style.display = 'none';
    }

    initButtons(){
        document.getElementById("input-btn").addEventListener("click", this.addTodo.bind(this));
        document.getElementById("clear-btn").addEventListener("click", this.clearList.bind(this));
        this.buttonSave.addEventListener("click", this.addListenerToSaveButton.bind(this));
    }

    addTodo(){
        if(this.todoText.value){
            let todo = new Todo(this.todoText.value, document.createElement("p"));
            this.listDom.appendChild(todo.dom);
            this.todos.push(todo);
        
            this.addListenersToCompletedButtons(todo);
            this.addListenersToDeleteButtons(todo);
            this.addListenersToEditButtons(todo);
        
            this.todoText.value = '';
        }
    }
    
    addListenersToCompletedButtons(todo){
        todo.dom.getElementsByClassName('completed')[0].addEventListener('click', () => {
            todo.isCompleted = !todo.isCompleted;
            if(todo.isCompleted && !todo.dom.classList.contains('item-completed'))
                todo.dom.classList.add('item-completed');
            if(!todo.isCompleted && todo.dom.classList.contains('item-completed'))
                todo.dom.classList.remove('item-completed');
        });
    }
    
    addListenersToDeleteButtons(todo){
        todo.dom.getElementsByClassName('delete')[0].addEventListener('click', () => {
            let index = this.findIndex(todo);
            this.todos.splice(index, 1);
            this.listDom.removeChild(todo.dom);
        });
    }
    
    addListenersToEditButtons(todo){
        todo.dom.getElementsByClassName('edit')[0].addEventListener('click', () => {
            this.editedElementIndex = this.findIndex(todo);
            this.todoText.value = todo.text;

            this.buttonSave.style.display = 'block';
        });
    }
    
    addListenerToSaveButton(){
        let todo = this.todos[this.editedElementIndex];

        todo.setText(this.todoText.value);
        this.editedElementIndex = undefined;
        this.todoText.value = '';
        this.buttonSave.style.display = 'none';
    }
    
    clearList(){
        this.listDom.innerHTML = '';
        this.todos = [];
    }
    
    findIndex(todo){
        return [...this.listDom.children].indexOf(todo.dom);
    }
}

new TodoApp();
