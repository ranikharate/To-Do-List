document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (!taskText) return alert("Please enter a task!");
    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    taskInput.value = "";
    loadTasks();
}

function loadTasks(filter = "all") {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    JSON.parse(localStorage.getItem("tasks") || "[]").forEach((task, index) => {
        if ((filter === "pending" && task.completed) || (filter === "completed" && !task.completed)) return;

        let li = document.createElement("li");
        li.textContent = task.text;
        li.classList.toggle("completed", task.completed);

        li.appendChild(createButton(task.completed ? "Undo" : "Complete", () => toggleComplete(index)));
        li.appendChild(createButton("Delete", () => deleteTask(index)));

        taskList.appendChild(li);
    });
}

function createButton(text, onClick) {
    let btn = document.createElement("button");
    btn.textContent = text;
    btn.onclick = onClick;
    return btn;
}

function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function showTab(tab) {
    loadTasks(tab);
}
