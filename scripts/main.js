document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");
  const bgPic = document.getElementById("imageAndText");
  //   const container = document.querySelector('.container')

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const todoText = todoInput.value.trim();

    if (todoText !== "") {
      addTodoItem(todoText);
      todoInput.value = "";
      todoInput.focus();
      //   bgPic.classList.toggle("todo-pic-hide")
      //   bgPic.classList.add('no-bg')
      bgPic.style.setProperty("display", "none");
    }
  });

  function addTodoItem(text) {
    const li = document.createElement("li");
    li.textContent = text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "حذف";
    deleteButton.className = "delete";
    deleteButton.onclick = () => {
      li.remove();
      if (todoList.children.length === 0) {
        // bgPic.classList.remove('no-bg')
        bgPic.style.setProperty("display", "flex");
      }
    };

    li.appendChild(deleteButton);
    todoList.appendChild(li);
  }
});
