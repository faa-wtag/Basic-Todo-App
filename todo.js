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
    let newTodoItem = null;

    if (todo.doneState) {
      newTodoItem = manageDoneState(todo);
    } else if (todo.editState) {
      newTodoItem = manageEditState(todo);
    } else {
      newTodoItem = manageInitialState(todo);
    }

    tasks.appendChild(newTodoItem);
  });
}

function manageDoneState(todo) {
  const newTodoItem = document.createElement("li");
  newTodoItem.textContent = todo.value;
  newTodoItem.classList.add("completed");
  const deleteButtonElement = createDeleteButton(todo.id);
  newTodoItem.appendChild(deleteButtonElement);
  return newTodoItem;
}

function manageEditState(todo) {
  const newTodoItem = document.createElement("li");
  const editInput = document.createElement("input");
  editInput.value = todo.value;
  editInput.classList.add("edited-input");
  newTodoItem.appendChild(editInput);

  const updateButtonElement = createUpdateButton(todo.id);
  newTodoItem.appendChild(updateButtonElement);

  const cancelButtonElement = createCancelButton(todo.id);
  newTodoItem.appendChild(cancelButtonElement);
  return newTodoItem;
}

function manageInitialState(todo) {
  const newTodoItem = document.createElement("li");
  newTodoItem.innerHTML = todo.value;

  const doneButtonElement = createDoneButton(todo.id);
  newTodoItem.appendChild(doneButtonElement);

  const editButtonElement = createEditButton(todo.id);
  newTodoItem.appendChild(editButtonElement);

  const deleteButtonElement = createDeleteButton(todo.id);
  newTodoItem.appendChild(deleteButtonElement);
  return newTodoItem;
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

function createDoneButton(todoId) {
  const doneButtonElement = document.createElement("button");
  doneButtonElement.innerHTML = "Done";
  doneButtonElement.addEventListener("click", () => handleTodoDone(todoId));
  return doneButtonElement;
}

function handleTodoDone(todoId) {
  const todo = todos.find(({ id }) => id === todoId);
  if (todo === undefined) {
    return;
  }
  todo.doneState = true;
  //todo.editState = false;
  renderTodoList();
}

function handleTodoEdit(todoId) {
  const todo = todos.find(({ id }) => id === todoId);
  if (todo === undefined) {
    return;
  }
  todo.editState = true;
  renderTodoList();
}

function handleTodoUpdate(todoId) {
  const todo = todos.find(({ id }) => id === todoId);

  if (todo === undefined) {
    return;
  }
  const editedText = tasks.querySelector("li input.edited-input");
  todo.value = editedText.value;
  todo.editState = false;
  renderTodoList();
}

function cancelEdit(todoId) {
  const todo = todos.find(({ id }) => id === todoId);
  if (todo === undefined) {
    return;
  }
  todo.editState = false;
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
