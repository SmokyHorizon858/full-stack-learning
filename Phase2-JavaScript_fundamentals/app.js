const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll("[data-filter]");
const prioritySelect = document.getElementById("prioritySelect");

let tasks = []; // each task: { id, text, completed, priority }
let currentFilter = "all"; // "all" | "active" | "completed"

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (!storedTasks) return;

    try {
        tasks = JSON.parse(storedTasks);
        tasks = tasks.map((task) => ({
            ...task,
            priority: task.priority || "medium" // default to medium if missing
        }))
        if (!Array.isArray(tasks)) tasks = []; // Reset if not an array
    } catch (error) {
        console.error("Failed to parse tasks from localStorage:", error);
        tasks = [];
    }
}


function renderTasks() {
    taskList.innerHTML = "";

    const filteredTasks = tasks.filter((task) => {
        if (currentFilter === "active") return !task.completed;
        if (currentFilter === "completed") return task.completed;
        return true; // all
    });
    
    filteredTasks.forEach((task) => {
        const li = document.createElement("li");

        // Task text
        const span = document.createElement("span");
        span.textContent = `${task.text} (${task.priority})`;
        if (task.completed) {
            span.style.textDecoration = "line-through";
            span.style.opacity = "0.6";
        }

        // Complete button
        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = task.completed? "Undo" : "Complete";
        toggleBtn.addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        })

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            tasks = tasks.filter((t) => t.id !== task.id);
            saveTasks();
            renderTasks();
        })

        // Append elements to the list item
        li.appendChild(span);
        li.appendChild(toggleBtn);
        li.appendChild(deleteBtn);
        
        taskList.appendChild(li);
    });
}

addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if(!text) return; // basic error handling for empty input (empty input)

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false,
        priority: prioritySelect.value // use selected priority
    };

    tasks.push(newTask);
    taskInput.value = "";
    prioritySelect.value = "medium"; // reset to default

    saveTasks();
    renderTasks();
});


filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;
        renderTasks();
    });
});

// optional: press Enter to add task
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") addBtn.click();
});

async function fetchSampleTasks() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        // convert API format to our task format
        return data.map((item) => ({
            id: item.id + Date.now(), // avoid id collision
            text: item.title,
            completed: item.completed,
            priority: "medium"
        }));
    } catch (error) {
        console.error("Failed to fetch sample tasks:", error);
        return [];
    }
}

// init
async function init() {
    loadTasks();

    // only fetch from API if localStorage is empty
    if (tasks.length === 0) {
        const apiTasks = await fetchSampleTasks();
        tasks = apiTasks;
        saveTasks();
    }

    renderTasks();
}

init();