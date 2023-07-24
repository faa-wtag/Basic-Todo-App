const inputElement = document.getElementById("todoInput");
const tasksList = document.getElementById("tasksList"); //ul
const addBtn = document.getElementById("add-btn");

function handleTodo() {
  const taskText = inputElement.value;
  const newTodo = document.createElement("li");
  newTodo.innerHTML = taskText;
  tasksList.appendChild(newTodo);

  const deleteButton = createDeleteButton();
  newTodo.appendChild(deleteButton);

  resetInputField();
}

function resetInputField() {
  inputElement.value = "";
}

function createDeleteButton() {
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.addEventListener("click", function () {
    deleteButton.parentElement.remove();
  });
  return deleteButton;
}

addBtn.addEventListener("click", handleTodo);
