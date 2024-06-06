document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const todoTitle = document.getElementById("todo-title");
  const todoInput = document.getElementById("todo-input");
  const todoPriority = document.getElementById("todo-priority");
  const todoList = document.getElementById("todo-list");
  const bgPic = document.getElementById("imageAndText");
  const addTask = document.getElementById("addTask");

  // const container = document.querySelector('.container');

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    todoList.innerHTML = "";

    const incompleteTasks = tasks.filter((task) => !task.completed);
    const completedTasks = tasks.filter((task) => task.completed);

    incompleteTasks.sort((a, b) => {
      const priorities = { high: 3, medium: 2, low: 1 };
      return priorities[b.priority] - priorities[a.priority];
    });

    const sortedTasks = [...incompleteTasks, ...completedTasks];

    // <button class="complete">${task.completed ? "Undo" : "Complete"}</button>;

    sortedTasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = `priority-${task.priority} ${
        task.completed ? "completed" : ""
      }`;
      li.innerHTML = `
              <div id="priority-line"></div>
              <img id="tick-square" src=${task.completed ? "./src/tick-square.svg": "./src/checkbox.svg"} ? alt="" class="complete">

              <div class="text">
                <p class="title">${task.title}</p>
                <p class="description">${task.description}</p>
              </div>
              <img id="edit-and-delete" src="./src/Frame 33317.svg" alt="">
              <div id="edit-and-delete-menu">
                <div class="edit"></div>
                <div class="line"></div>
                <div class="delete"></div>
              </div>
          
          `;

      li.querySelector(".complete").onclick = () => {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
      };

      li.querySelector(".edit").onclick = () => {
        todoTitle.value = task.title;
        todoInput.value = task.description;
        todoPriority.value = task.priority;
        tasks = tasks.filter((t) => t !== task);
        saveTasks();
        renderTasks();
      };

      li.querySelector(".delete").onclick = () => {
        tasks = tasks.filter((t) => t !== task);
        saveTasks();
        renderTasks();
        if (tasks.length === 0) {
          bgPic.style.setProperty("display", "flex");
          // addTask.style.setProperty("display", "flex");
        }
      };

      todoList.appendChild(li);
    });
  }

  renderTasks();

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = todoTitle.value.trim();
    const description = todoInput.value.trim();
    const priority = todoPriority.value;

    if (title && description) {
      const task = {
        title,
        description,
        priority,
        completed: false,
      };
      tasks.push(task);
      saveTasks();
      renderTasks();
      todoTitle.value = "";
      todoInput.value = "";
      todoPriority.value = "low";
      todoInput.focus();
      bgPic.style.setProperty("display", "none");
      // addTask.style.setProperty("display", "none");

    }
  });
});
