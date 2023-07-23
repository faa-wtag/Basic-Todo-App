const inputElement = document.getElementById("todoInput");
//const todos = document.getElementById("todoList");
const tasksList = document.getElementById("tasksList"); //ul
//const text = document.querySelector(".text");
const addBtn = document.getElementById("add-btn");

function handleTodo() {
  const taskText = inputElement.value;
  const newTodo = document.createElement("li");
  newTodo.innerHTML = taskText;
  tasksList.appendChild(newTodo);
  resetInputField();
}

/*
function handleTodo(inputElement) {
  const {value}= inputElement; //Gives Undefined o/p
  const newTodo = document.createElement("li");
  newTodo.innerHTML = value;
  tasksList.appendChild(newTodo);
  resetInputField();
}
 */

function resetInputField() {
  inputElement.value = "";
}

addBtn.addEventListener("click", handleTodo);
