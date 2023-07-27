const inputElement = document.getElementById("todoInput");
const tasks = document.getElementById("tasksList");
const addBtn = document.getElementById("add-btn");

let todos = [];

function handleTodo() {
  const taskText = inputElement.value;

  const newTodo = {
    id: Date.now(),
    value: taskText,
    doneState: false,
  };

  todos.push(newTodo);
  renderTodoList();
  resetInputField();
}

function resetInputField() {
  inputElement.value = "";
}

function renderTodoList() {
  tasks.innerHTML = "";

  todos.forEach((todo) => {
    const newTodoItem = document.createElement("li");
    newTodoItem.innerHTML = todo.value;

    const deleteButtonElement = createDeleteButton(todo.id);
    newTodoItem.appendChild(deleteButtonElement);
    tasks.appendChild(newTodoItem);
  });
}

function createDeleteButton(todoId) {
  const deleteButtonElement = document.createElement("button");
  deleteButtonElement.innerHTML = "Delete";
  deleteButtonElement.addEventListener("click", () => handleTodoDelete(todoId));
  return deleteButtonElement;
}

function handleTodoDelete(todoId) {
  deleteTodoItem(todoId);
  renderTodoList();
}

function deleteTodoItem(todoId) {
  todos = todos.filter((todo) => todo.id !== todoId);
}

addBtn.addEventListener("click", handleTodo);

renderTodoList(); // Initial Rendering of TodoList
