// This is a simple JavaScript file for a Todo List application
let tasks = [];

function addTask() {
    // Function to add a task
    const taskInput = document.getElementById("todo-input");
    const dateInput = document.getElementById("date-input");

    // Check if the inputs are empty
    if (taskInput.value === "" || dateInput.value === "") {
        // Alert the user to enter both task and date
        alert("Please enter a task and a date.");
    } else {
        // Add the task to the tasks array
        tasks.push({
            title: taskInput.value,
            date: dateInput.value,
            completed: false,
        });

        renderTasks();
    }

}

function removeAllTask() {
    // Function to remove a task
    tasks = [];

    renderTasks();
}

// Jangan buka dropdown otomatis saat DOM ready
document.addEventListener("DOMContentLoaded", function () {
    // Kosongkan atau isi dengan sesuatu yang lain kalau butuh
});


function handleFilterTodos(status) {
    let filteredTasks;
    if (status === "completed") {
        filteredTasks = tasks.filter((task) => task.completed);
    } else if (status === "active") {
        filteredTasks = tasks.filter((task) => !task.completed);
    } else {
        filteredTasks = tasks;
    }
    renderTasks(filteredTasks);
}
let filterInitialized = false;

function toggleFilter() {
    const dropdown = document.getElementById("filterDropdown");

    if (dropdown.classList.contains("hidden")) {
        // Tampilkan dropdown
        dropdown.classList.remove("hidden");

        // Pakai delay kecil agar transition bisa berjalan
        requestAnimationFrame(() => {
            dropdown.classList.remove("opacity-0", "scale-95", "-translate-y-2", "pointer-events-none");
            dropdown.classList.add("opacity-100", "scale-100", "translate-y-0", "pointer-events-auto");
        });

        // Tambahkan event filter sekali saja
        if (!filterInitialized) {
            const filterButtons = dropdown.querySelectorAll("a");
            filterButtons.forEach((button) => {
                button.addEventListener("click", (e) => {
                    e.preventDefault();
                    const status = button.getAttribute("data-filter") || "all";
                    handleFilterTodos(status);
                    toggleFilter(); // tutup setelah klik
                });
            });
            filterInitialized = true;
        }

    } else {
        // Tutup dropdown dengan animasi
        dropdown.classList.remove("opacity-100", "scale-100", "translate-y-0", "pointer-events-auto");
        dropdown.classList.add("opacity-0", "scale-95", "-translate-y-2", "pointer-events-none");

        // Tunggu animasi selesai baru hidden
        setTimeout(() => {
            dropdown.classList.add("hidden");
        }, 300); // 300ms sesuai duration Tailwind
    }
}

function playSound(url) {
    const audio = new Audio(url);
    audio.play();
}

function completeTask(index) {
    tasks[index].completed = true; // Ubah status, jangan hapus

    playSound("https://s17.aconvert.com/convert/p3r68-cdx67/4sd1m-tfr3y.mp3");
    alert("Task completed! Congrats you became more productive!");

    renderTasks();
}


function deleteTask(index) {
    // Function to delete a task
    tasks.splice(index, 1);
    renderTasks();
}

function renderTasks(taskArray = tasks) {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; // Clear current list

    if (taskArray.length === 0) {
        taskList.innerHTML = `
            <tr>
                <td colspan="4" class="text-center py-2 text-gray-500">No tasks available</td>
            </tr>
        `;
        return;
    }

    taskArray.forEach((task, index) => {
        const statusLabel = task.completed
            ? `<span class="text-green-600 font-semibold">Completed</span>`
            : `<span class="text-yellow-600 font-semibold">Pending</span>`;

        const completeBtn = task.completed
            ? "" // Hilangkan tombol complete jika sudah selesai
            : `<button type="button" class="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600" onclick="completeTask(${index});">Complete</button>`;

        taskList.innerHTML += `
            <tr class="bg-[aliceblue] border">
                <td class="border px-4 py-2 font-semibold text-black">${task.title}</td>

                <td class="border px-4 py-2 text-gray-600">${task.date}</td>

                <td class="border px-4 py-2">${statusLabel}</td>

                <td class="border px-4 py-2">
                    <div class="flex flex-wrap gap-2 justify-center">
                        ${completeBtn}
                        <button class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600" onclick="deleteTask(${index});">Delete</button>
                    </div>
                </td>
            </tr>
        `;
    });
}
