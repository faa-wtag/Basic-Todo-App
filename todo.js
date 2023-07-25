const inputElement = document.getElementById("todoInput");
const tasksList = document.getElementById("tasksList"); //ul
const addBtn = document.getElementById("add-btn");

let todoItems = [];

function handleTodo() {
  const taskText = inputElement.value;

  const newTodo = {
    id: Date.now(),
    value: taskText,
    doneState: false,
  };

  todoItems.push(newTodo);
  renderTodoList();
  resetInputField();
}

function resetInputField() {
  inputElement.value = "";
}

function renderTodoList() {
  tasksList.innerHTML = "";

  todoItems.forEach((todo) => {
    const newTodoItem = document.createElement("li");
    newTodoItem.innerHTML = todo.value;

    const deleteButtonElement = createDeleteButton(todo.id);
    newTodoItem.appendChild(deleteButtonElement);
    tasksList.appendChild(newTodoItem);
  });
}

function createDeleteButton(todoId) {
  const deleteButtonElement = document.createElement("button");
  deleteButtonElement.innerHTML = "Delete";
  deleteButtonElement.addEventListener("click", function () {
    deleteTodoItem(todoId);
  });
  return deleteButtonElement;
}

function deleteTodoItem(todoId) {
  todoItems = todoItems.filter((todo) => todo.id !== todoId);
  renderTodoList();
}

addBtn.addEventListener("click", handleTodo);

renderTodoList(); // Initial Rendering of TodoList
