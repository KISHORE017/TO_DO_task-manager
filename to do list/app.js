document.addEventListener("DOMContentLoaded", function () {
  // Retrieve tasks from local storage on page load
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Display tasks
  displayTasks(tasks);
});

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  // Retrieve tasks from local storage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Add the new task
  tasks.push(newTask);

  // Save tasks to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Display tasks
  displayTasks(tasks);

  // Clear input field
  taskInput.value = "";
}

function displayTasks(tasks) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
          <span class="${task.completed ? "completed" : ""}">${task.text}</span>
          <button onclick="toggleTask(${task.id})">${
      task.completed ? "incomplete" : "Complete"
    }</button>
          <button onclick="editTask(${task.id})">Edit</button>
          <button onclick="deleteTask(${task.id})">Delete</button>
      `;
    taskList.appendChild(li);
  });
}

function toggleTask(id) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Find the task by id
  const taskIndex = tasks.findIndex((task) => task.id === id);

  // Toggle the completion status
  tasks[taskIndex].completed = !tasks[taskIndex].completed;

  // Save tasks to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Display updated tasks
  displayTasks(tasks);
}

function editTask(id) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Find the task by id
  const taskIndex = tasks.findIndex((task) => task.id === id);

  // Prompt the user to edit the task
  const updatedTaskText = prompt("Edit the task:", tasks[taskIndex].text);

  // Update the task if the user provided a new text
  if (updatedTaskText !== null) {
    tasks[taskIndex].text = updatedTaskText;

    // Save tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Display updated tasks
    displayTasks(tasks);
  }
}

function deleteTask(id) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Filter out the task with the specified id
  const filteredTasks = tasks.filter((task) => task.id !== id);

  // Save updated tasks to local storage
  localStorage.setItem("tasks", JSON.stringify(filteredTasks));

  // Display updated tasks
  displayTasks(filteredTasks);
}
