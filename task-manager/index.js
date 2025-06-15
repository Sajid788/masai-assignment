const fs = require("fs");
const readline = require("readline");

// File to store tasks
const TASK_FILE = "tasks.json";

// Read tasks from file
function readTasks() {
  try {
    const data = fs.readFileSync(TASK_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Write tasks to file
function writeTasks(tasks) {
  fs.writeFileSync(TASK_FILE, JSON.stringify(tasks, null, 2));
}

// Add a task
function addTask(title, dueDate) {
  if (!title || !dueDate) {
    console.log("❌ Error: Title and due date are required.");
    return;
  }

  const tasks = readTasks();
  const newTask = {
    id: tasks.length + 1,
    title,
    dueDate,
    status: "pending",
  };

  tasks.push(newTask);
  writeTasks(tasks);
  console.log(`✅ Task "${title}" added successfully.`);
}

// List all tasks
function listTasks() {
  const tasks = readTasks();
  if (tasks.length === 0) {
    console.log("📭 No tasks available.");
    return;
  }

  console.log("\n📋 Task List:");
  tasks.forEach((task) => {
    console.log(
      `#${task.id} | ${task.title} | Due: ${task.dueDate} | Status: ${task.status}`
    );
  });
}

// Complete a task by ID or title
function completeTask(identifier) {
  let tasks = readTasks();
  const taskIndex = tasks.findIndex(
    (t) => t.id === parseInt(identifier) || t.title.toLowerCase() === identifier.toLowerCase()
  );

  if (taskIndex === -1) {
    console.log("❌ Task not found.");
    return;
  }

  tasks[taskIndex].status = "completed";
  writeTasks(tasks);
  console.log(`✅ Task "${tasks[taskIndex].title}" marked as completed.`);
}

// CLI Interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("📝 Welcome to Terminal Task Manager!");
console.log("Available commands: add-task, list-tasks, complete-task, exit");

function prompt() {
  rl.question("\n👉 Enter command: ", (command) => {
    if (command === "exit") {
      console.log("👋 Goodbye!");
      rl.close();
    } else if (command === "add-task") {
      rl.question("📌 Enter task title: ", (title) => {
        rl.question("📅 Enter due date: ", (dueDate) => {
          addTask(title.trim(), dueDate.trim());
          prompt();
        });
      });
    } else if (command === "list-tasks") {
      listTasks();
      prompt();
    } else if (command === "complete-task") {
      rl.question("✅ Enter task ID or Title to mark as complete: ", (identifier) => {
        completeTask(identifier.trim());
        prompt();
      });
    } else {
      console.log("❓ Unknown command. Try again.");
      prompt();
    }
  });
}

prompt();
