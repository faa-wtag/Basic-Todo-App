const inputElement = document.getElementById("todoInput");
const tasksList = document.getElementById("tasksList"); //ul
const addBtn = document.getElementById("add-btn");

function handleTodo() {
  const taskText = inputElement.value;
  const newTodo = document.createElement("li");
  newTodo.innerHTML = taskText;
  tasksList.appendChild(newTodo);
  resetInputField();
}

function resetInputField() {
  inputElement.value = "";
}

addBtn.addEventListener("click", handleTodo);
