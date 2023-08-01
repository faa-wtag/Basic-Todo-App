const inputElement = document.getElementById("todoInput");
const tasks = document.getElementById("tasksList");
const addBtn = document.getElementById("add-btn");

let todos = [];
let editTodoId = null;

function handleTodo() {
  const taskText = inputElement.value;

  if (editTodoId) {
    handleTodoUpdate(editTodoId);
  } else {
    const newTodo = {
      id: Date.now(),
      value: taskText,
      doneState: false,
    };
    todos.push(newTodo);
    renderTodoList();
  }

  resetInputField();
}

function resetInputField() {
  inputElement.value = "";
}

function renderTodoList() {
  tasks.innerHTML = "";

  todos.forEach((todo) => {
    const newTodoItem = document.createElement("li");

    if (editTodoId === todo.id) {
      const inputBox = document.createElement("input");
      inputBox.value = todo.value;
      const updateButtonElement = createUpdateButton();
      const cancelButtonElement = createCancelButton();

      newTodoItem.appendChild(inputBox);
      newTodoItem.appendChild(updateButtonElement);
      newTodoItem.appendChild(cancelButtonElement);
    } else {
      newTodoItem.innerHTML = todo.value;

      const deleteButtonElement = createDeleteButton(todo.id);
      const editButtonElement = createEditButton(todo.id);
      newTodoItem.appendChild(deleteButtonElement);
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

function createUpdateButton() {
  const updateButtonElement = document.createElement("button");
  updateButtonElement.innerHTML = "Update";
  updateButtonElement.addEventListener("click", () =>
    handleTodoUpdate(editTodoId)
  );
  return updateButtonElement;
}

function createCancelButton() {
  const cancelButtonElement = document.createElement("button");
  cancelButtonElement.innerHTML = "Cancel";
  cancelButtonElement.addEventListener("click", () => cancelEdit());
  return cancelButtonElement;
}

function handleTodoDelete(todoId) {
  deleteTodoItem(todoId);
  renderTodoList();
}

function deleteTodoItem(todoId) {
  todos = todos.filter((todo) => todo.id !== todoId);
}

function editTodoItem(todoId) {
  editTodoId = todoId;
  renderTodoList();
}

function updateTodoItem(todoId, editedText) {
  todos = todos.map((todo) => {
    if (todo.id === todoId) {
      return { ...todo, value: editedText };
    }
    return todo;
  });
  editTodoId = null;
  renderTodoList();
}

function cancelEdit() {
  editTodoId = null;
  renderTodoList();
}

function handleTodoEdit(todoId) {
  editTodoItem(todoId);
}

function handleTodoUpdate(todoId) {
  const editedText = document.querySelector("li input").value;
  updateTodoItem(todoId, editedText);
}

addBtn.addEventListener("click", handleTodo);
renderTodoList(); // Initial Rendering of TodoList
