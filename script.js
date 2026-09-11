// ===== Step 1: Access the HTML elements =====
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const priorityInput = document.querySelector("#priority");
const taskList = document.querySelector("#task-list");
const listCard = document.querySelector(".list-card");
const errorMessage = document.querySelector("#error-message");
const taskCount = document.querySelector("#task-count");

// ===== Step 2: Store tasks =====
// Each task is an object with a name, priority, and completion status.
const tasks = [];
let nextId = 1;

// ===== Step 3: Respond to form submission =====
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskName = taskInput.value.trim();
  const taskPriority = priorityInput.value;

  // Do not create a task if the name is empty.
  if (taskName === "") {
    errorMessage.textContent = "Please enter a task name.";
    return;
  }

  errorMessage.textContent = "";

  // ===== Step 4: Add the task =====
  tasks.push({
    id: nextId,
    name: taskName,
    priority: taskPriority,
    completed: false,
  });
  nextId = nextId + 1;

  // Reset the form for the next entry.
  taskInput.value = "";
  priorityInput.value = "medium";

  displayTasks();
});

// ===== Step 5: Display tasks =====
function displayTasks() {
  // Clear the list before redrawing it.
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    listCard.classList.add("is-empty");
  } else {
    listCard.classList.remove("is-empty");
  }

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    const taskElement = document.createElement("div");
    taskElement.className = "task-item";
    if (task.completed) {
      taskElement.classList.add("completed");
    }

    // Checkbox button
    const checkButton = document.createElement("button");
    checkButton.type = "button";
    checkButton.className = "check-btn";
    checkButton.textContent = task.completed ? "✓" : "";
    checkButton.addEventListener("click", function () {
      toggleComplete(task.id);
    });

    // Task name
    const nameElement = document.createElement("span");
    nameElement.className = "task-name";
    nameElement.textContent = task.name;

    // Priority dot
    const dotElement = document.createElement("span");
    dotElement.className = "priority-dot priority-" + task.priority;

    // Priority label
    const labelElement = document.createElement("span");
    labelElement.className = "priority-label";
    labelElement.textContent = task.priority;

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      deleteTask(task.id);
    });

    taskElement.appendChild(checkButton);
    taskElement.appendChild(nameElement);
    taskElement.appendChild(dotElement);
    taskElement.appendChild(labelElement);
    taskElement.appendChild(deleteButton);

    taskList.appendChild(taskElement);
  }

  updateTaskCount();
}

// ===== Step 6: Update the task counter text =====
function updateTaskCount() {
  if (tasks.length === 0) {
    taskCount.textContent = "No tasks yet";
    return;
  }

  let remaining = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (!tasks[i].completed) {
      remaining = remaining + 1;
    }
  }

  taskCount.textContent = remaining + " task(s) remaining";
}

// ===== Step 7: Complete a task =====
function toggleComplete(id) {
  const task = tasks.find(function (t) {
    return t.id === id;
  });

  if (task) {
    task.completed = !task.completed;
    displayTasks();
  }
}

// ===== Step 8: Delete a task =====
function deleteTask(id) {
  const index = tasks.findIndex(function (t) {
    return t.id === id;
  });

  if (index !== -1) {
    tasks.splice(index, 1);
    displayTasks();
  }
}

// Initial render (shows the "no tasks yet" state).
displayTasks();
