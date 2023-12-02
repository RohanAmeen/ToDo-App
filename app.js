let todos = [];

function renderTodos() {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="text" value="${todo}" disabled>
      <button onclick="editTodo(${index})">Edit</button>
      <button onclick="deleteTodo(${index})">Delete</button>
    `;
    todoList.appendChild(li);
  });
}

function addTodo() {
  const newTodoInput = document.getElementById('newTodo');
  const newTodo = newTodoInput.value.trim();

  if (newTodo !== '') {
    todos.push(newTodo);
    saveToLocalStorage();
    newTodoInput.value = '';
    renderTodos();
  }
}

function deleteAllTodos() {
  todos = [];
  saveToLocalStorage();
  renderTodos();
}

function editTodo(index) {
  const li = document.getElementById('todoList').children[index];
  const input = li.querySelector('input');
  const editButton = li.querySelector('button');

  if (input.disabled) {
    input.disabled = false;
    editButton.innerText = 'Save';
    editButton.onclick = function () {
      saveTodo(index);
    };
  } else {
    input.disabled = true;
    editButton.innerText = 'Edit';
    editButton.onclick = function () {
      editTodo(index);
    };
  }
}

function saveTodo(index) {
  const li = document.getElementById('todoList').children[index];
  const input = li.querySelector('input');
  const newTodo = input.value.trim();

  if (newTodo !== '') {
    todos[index] = newTodo;
    saveToLocalStorage();
    renderTodos();
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveToLocalStorage();
  renderTodos();
}

function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadFromLocalStorage() {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
    renderTodos();
  }
}

// Initial rendering and loading from local storage
loadFromLocalStorage();
