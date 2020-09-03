let todos = [];
class Todo {
    constructor(text){
        this.text = text;
        this. isCompleted = false;
    }
}

let buttonAdd = document.getElementById("input-btn");
let buttonClear = document.getElementById("clear-btn");
let list = document.getElementById("todo-items");
let listItems = document.getElementsByTagName("p");
let editedElementIndex = undefined;
let todoText = document.getElementById("input-text");

const markCompletedButtons = document.getElementsByClassName("completed");
const buttonDelete = document.getElementsByClassName("delete");
const buttonEdit = document.getElementsByClassName("edit");
const buttonSave = document.querySelector("#save-btn");

const markCompletedButtonHTML = `<img src="./images/check.png" class="completed">`;
const deleteButtonHTML = `<img src="./images/trash.png" class="delete">`;
const editButtonHTML = `<img src="./images/edit.png" class="edit">`;


addTodo = () => {
    list.innerHTML = null; 
    
    let td = new Todo(todoText.value);
    todos.push(td);

    for(let i = 0; i < todos.length; i++){
        list.innerHTML += `<p>${todos[i].text}${markCompletedButtonHTML}${deleteButtonHTML}${editButtonHTML}</p>`;
        if(todos[i].isCompleted){
        listItems[i].className += " item-completed";
        }
    }

    addListenersToCompletedButtons();
    addListenersToDeleteButtons();
    addListenersToEditButtons();
    addListenerToSaveButton();

    todoText.value = null;
}

addListenersToCompletedButtons = () => {
    for(let i = 0; i < markCompletedButtons.length; i++){
        let btn = markCompletedButtons[i];
        btn.addEventListener("click", () => {
            let status = btn.parentElement.className.includes("item-completed");
            if(!status){
                btn.parentElement.className += " item-completed";
                todos[i].isCompleted = true;
            } else {
                btn.parentElement.className -= " item-completed";
                todos[i].isCompleted = false;
            }
        });
    }
}

addListenersToDeleteButtons = () => {
    for(let dbtn of buttonDelete){
        dbtn.addEventListener("click", () => {
            let p = dbtn.parentElement;
            p.style.display = "none";
            let idx = findIndex(dbtn);
            todos.splice(idx, 1);
        });
    }
}

addListenersToEditButtons = () => {
    for(let edbtn of buttonEdit){
        edbtn.addEventListener("click", () => {
            todoText.value = edbtn.parentElement.innerText;
            editedElementIndex = findIndex(edbtn);
        });
    }
}

addListenerToSaveButton = () => {
    buttonSave.addEventListener("click", () => {
        listItems[editedElementIndex].innerHTML = `${todoText.value}${markCompletedButtonHTML}${deleteButtonHTML}${editButtonHTML}`;
        addListenersToCompletedButtons();
        addListenersToDeleteButtons();
        addListenersToEditButtons();

        //todoText.value = null;
    });
}

clearList = () => {
    list.innerHTML = null;
    todos = [];
}

findIndex = (e) => {
    let idx = 0;
    let p = e.parentElement;
    while(p = p.previousSibling){
        idx++;
    }
    return idx;
}


buttonAdd.addEventListener("click", addTodo);
buttonClear.addEventListener("click", clearList);
