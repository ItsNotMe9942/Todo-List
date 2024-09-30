const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;

    // Use Bootstrap's list-group-item for a clean layout
    const html = `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <span class="fw-bold">${name}</span> <br>
          <small class="text-muted">Due: ${dueDate}</small>
        </div>
        <button class="btn btn-danger btn-sm js-delete-todo-button">Delete</button>
      </li>
    `;
    todoListHTML += html;
  });

  // Render the updated HTML
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  // Add event listeners to all delete buttons
  document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todoList.splice(index, 1);
      renderTodoList();
    });
  });

  saveToStorage();
}

document.querySelector('.js-add-todo-button').addEventListener('click', () => {
  addTodo();
});

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value.trim();

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  // Validate inputs
  if (!name || !dueDate) {
    alert("Please fill out both the todo name and due date.");
    return;
  }

  todoList.push({ name, dueDate });

  inputElement.value = '';
  dateInputElement.value = '';

  renderTodoList();
}

function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}
