let todos = [];
loadTodos();

const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const message = document.getElementById("message");

addBtn.addEventListener("click", function () {
  handleAddTodo();
});

todoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleAddTodo();
  }
});

function handleAddTodo() {
  const value = todoInput.value;
  let text = String(value).trim();
  if (text === "") {
    text = "Untitled";
  }

  const todo = { text: text, done: false };
  todos.push(todo);
  todoInput.value = "";
  updateApp();
}

function renderTodos() {
  todoList.textContent = "";

  for (let i = 0; i < todos.length; i++) {
    const li = document.createElement("li");

    const textSpan = document.createElement("span");
    textSpan.textContent = todos[i].text;

    //New tasks shown

    if (i === todos.length - 1) {
      li.classList.add("pop", "fresh");
    }

    // Deleting the tasks

    if (todos[i].done === true) {
      li.classList.add("done");
    }

    textSpan.addEventListener("click", function () {
      todos[i].done = !todos[i].done;

      if (todos[i].done === true) {
        li.classList.add("glow");
        setTimeout(function () {
          li.classList.remove("glow");
        }, 500);
      }
      updateApp();
    });
    const tickBtn = document.createElement("button");
    tickBtn.textContent = "✓";

    tickBtn.addEventListener("click", function () {
      todos[i].done = !todos[i].done;
      updateApp();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "x";

    delBtn.addEventListener("click", function () {
      todos.splice(i, 1);
      updateApp();
    });

    li.appendChild(textSpan);
    li.appendChild(delBtn);
    li.appendChild(tickBtn);

    todoList.appendChild(li);
  }

  renderState();
}

function renderState() {
  let doneCount = 0;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].done === true) {
      doneCount += 1;
    }
  }

  const total = todos.length;
  const left = total - doneCount;

  message.textContent = `Total: ${total} | Done: ${doneCount} | Left: ${left}`;
}
//For savind the tasks while we reloading the APP

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const data = localStorage.getItem("todos");
  if (data) {
    todos = JSON.parse(data);
  }
}

function updateApp() {
  saveTodos();
  renderTodos();
}

renderTodos();
