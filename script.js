document.addEventListener("DOMContentLoaded", function () {

  const taskInput = document.getElementById("taskInput");
  const addBtn = document.getElementById("addBtn");
  const taskList = document.getElementById("taskList");

  const allBtn = document.getElementById("allBtn");
  const activeBtn = document.getElementById("activeBtn");
  const completedBtn = document.getElementById("completedBtn");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let currentFilter = "all";

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function createTaskElement(task, index) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
      span.classList.add("completed");
    }

    span.addEventListener("click", function () {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";

    deleteBtn.addEventListener("click", function () {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);

    return li;
  }

  function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

      if (currentFilter === "active" && task.completed) return;
      if (currentFilter === "completed" && !task.completed) return;

      const li = createTaskElement(task, index);
      taskList.appendChild(li);
    });
  }

  addBtn.addEventListener("click", function () {
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({
      text: text,
      completed: false
    });

    taskInput.value = "";

    saveTasks();
    renderTasks();
  });

  taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addBtn.click();
    }
  });

  allBtn.addEventListener("click", function () {
    currentFilter = "all";
    renderTasks();
  });

  activeBtn.addEventListener("click", function () {
    currentFilter = "active";
    renderTasks();
  });

  completedBtn.addEventListener("click", function () {
    currentFilter = "completed";
    renderTasks();
  });

  renderTasks();

});