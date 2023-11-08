const taskInput = document.querySelector(".task-input input");
const taskBox = document.querySelector(".task-box");
const filters = document.querySelectorAll(".filters span");
const clearButton = document.querySelector(".clear-btn");

let todos = JSON.parse(localStorage.getItem("todo-list")) || [];

function showTodo() {
    taskBox.innerHTML = "";

    todos.forEach((todo, id) => {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task");
        taskItem.innerHTML = `
            <label for="task-${id}">
                <input type="checkbox" id="task-${id}" ${todo.status === "completed" ? "checked" : ""}>
                <p>${todo.name}</p>
            </label>
            <div class="settings">
                <i class="uil uil-ellipsis-h"></i>
                <ul class="task-menu">
                    <li><i class="uil uil-pen"></i>Edit</li>
                    <li><i class="uil uil-trash"></i>Delete</li>
                </ul>
            </div>
        `;

        const editButton = taskItem.querySelector(".uil-pen");
        const deleteButton = taskItem.querySelector(".uil-trash");

        // Edit task
        editButton.addEventListener("click", () => {
            const taskText = taskItem.querySelector("p");
            const originalText = taskText.innerText;
            taskText.contentEditable = true;
            taskText.focus();
            taskText.addEventListener("blur", () => {
                taskText.contentEditable = false;
                const newText = taskText.innerText.trim();
                if (newText === "") {
                    taskText.innerText = originalText;
                } else {
                    todo.name = newText;
                    localStorage.setItem("todo-list", JSON.stringify(todos));
                }
            });
        });

        // Delete task
        deleteButton.addEventListener("click", () => {
            todos.splice(id, 1);
            localStorage.setItem("todo-list", JSON.stringify(todos));
            showTodo();
        });

        // Toggle task status
        const checkbox = taskItem.querySelector("input");
        checkbox.addEventListener("change", () => {
            todo.status = checkbox.checked ? "completed" : "pending";
            localStorage.setItem("todo-list", JSON.stringify(todos));
        });

        taskBox.appendChild(taskItem);
    });
}

showTodo();

taskInput.addEventListener("keyup", (e) => {
    const userTask = taskInput.value.trim();
    if (e.key === "Enter" && userTask) {
        taskInput.value = "";
        const taskInfo = { name: userTask, status: "pending" };
        todos.push(taskInfo);
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo();
    }
});

// Filter tasks based on All, Pending, and Completed
filters.forEach((filter) => {
    filter.addEventListener("click", () => {
        filters.forEach((f) => f.classList.remove("active"));
        filter.classList.add("active");

        const filterType = filter.id;
        if (filterType === "all") {
            showTodo();
        } else {
            const filteredTodos = todos.filter((todo) => {
                return filterType === "completed" ? todo.status === "completed" : todo.status === "pending";
            });
            showFilteredTasks(filteredTodos);
        }
    });
});

// Show filtered tasks
function showFilteredTasks(filteredTodos) {
    taskBox.innerHTML = "";
    filteredTodos.forEach((todo, id) => {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task");
        taskItem.innerHTML = `
            <label for="task-${id}">
                <input type="checkbox" id="task-${id}" ${todo.status === "completed" ? "checked" : ""}>
                <p>${todo.name}</p>
            </label>
            <div class="settings">
                <i class="uil uil-ellipsis-h"></i>
                <ul class="task-menu">
                    <li><i class="uil uil-pen"></i>Edit</li>
                    <li><i class="uil uil-trash"></i>Delete</li>
                </ul>
            </div>
        `;

        const editButton = taskItem.querySelector(".uil-pen");
        const deleteButton = taskItem.querySelector(".uil-trash");

        // Edit task
        editButton.addEventListener("click", () => {
            const taskText = taskItem.querySelector("p");
            const originalText = taskText.innerText;
            taskText.contentEditable = true;
            taskText.focus();
            taskText.addEventListener("blur", () => {
                taskText.contentEditable = false;
                const newText = taskText.innerText.trim();
                if (newText === "") {
                    taskText.innerText = originalText;
                } else {
                    todo.name = newText;
                    localStorage.setItem("todo-list", JSON.stringify(todos));
                }
            });
        });

        // Delete task
        deleteButton.addEventListener("click", () => {
            todos.splice(id, 1);
            localStorage.setItem("todo-list", JSON.stringify(todos));
            showFilteredTasks(filteredTodos);
        });

        // Toggle task status
        const checkbox = taskItem.querySelector("input");
        checkbox.addEventListener("change", () => {
            todo.status = checkbox.checked ? "completed" : "pending";
            localStorage.setItem("todo-list", JSON.stringify(todos));
            showFilteredTasks(filteredTodos);
        });

        taskBox.appendChild(taskItem);
    });
}

// Clear all tasks
clearButton.addEventListener("click", () => {
    localStorage.removeItem("todo-list");
    todos = [];
    showTodo();
});
