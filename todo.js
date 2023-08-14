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
    editState: false,
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

    if (todo.editState) {
      const editInput = document.createElement("input");
      editInput.value = todo.value;
      editInput.classList.add("edited-input"); //edited
      newTodoItem.appendChild(editInput);

      const updateButtonElement = createUpdateButton(todo.id);
      newTodoItem.appendChild(updateButtonElement);

      const cancelButtonElement = createCancelButton(todo.id);
      newTodoItem.appendChild(cancelButtonElement);
    } else {
      newTodoItem.innerHTML = todo.value;

      const deleteButtonElement = createDeleteButton(todo.id);
      newTodoItem.appendChild(deleteButtonElement);

      const editButtonElement = createEditButton(todo.id);
      newTodoItem.appendChild(editButtonElement);
    }
    tasks.appendChild(newTodoItem);
  });
}

function createDeleteButton(todoId) {
  const deleteButtonElement = document.createElement("button");
  deleteButtonElement.innerHTML = "Delete";
  deleteButtonElement.addEventListener("click", () => handleTodoDelete(todoId));
  return deleteButtonElement;
}

function createEditButton(todoId) {
  const editButtonElement = document.createElement("button");
  editButtonElement.innerHTML = "Edit";
  editButtonElement.addEventListener("click", function () {
    handleTodoEdit(todoId);
  });
  return editButtonElement;
}

function createUpdateButton(todoId) {
  const updateButtonElement = document.createElement("button");
  updateButtonElement.innerHTML = "Update";
  updateButtonElement.addEventListener("click", () => handleTodoUpdate(todoId));
  return updateButtonElement;
}

function createCancelButton(todoId) {
  const cancelButtonElement = document.createElement("button");
  cancelButtonElement.innerHTML = "Cancel";
  cancelButtonElement.addEventListener("click", () => cancelEdit(todoId));
  return cancelButtonElement;
}

function handleTodoEdit(todoId) {
  todos.forEach((todo) => {
    if (todo.id === todoId) {
      todo.editState = true;
      return;
    }
    todo.editState = false;
  });
  renderTodoList();
}

function handleTodoUpdate(todoId) {
  todos.forEach((todo) => {
    if (todo.id === todoId) {
      const editedText = tasks.querySelector("li input.edited-input");
      todo.value = editedText.value;
      todo.editState = false;
    }
  });
  renderTodoList();
}

function cancelEdit(todoId) {
  todos.forEach((todo) => {
    if (todo.id === todoId) {
      todo.editState = false;
    }
  });
  renderTodoList();
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
