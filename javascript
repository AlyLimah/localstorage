document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    const filterStatusButton = document.getElementById("filterStatus");
    const filterPriorityButton = document.getElementById("filterPriority");

    // Função para salvar tarefas no localStorage
    const saveTasks = (tasks) => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Função para carregar tarefas do localStorage
    const loadTasks = () => {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    };

    // Função para renderizar tarefas
    const renderTasks = (tasks) => {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.classList.add("task-item");
            li.dataset.index = index;

            li.innerHTML = `
                <span>${task.name}</span>
                <span>${task.date}</span>
                <span>${task.priority}</span>
                <button onclick="editTask(${index})">Editar</button>
                <button onclick="deleteTask(${index})">Excluir</button>
            `;
            taskList.appendChild(li);
        });
    };

    // Função para adicionar tarefa
    const addTask = (e) => {
        e.preventDefault();
        const name = document.getElementById("taskName").value;
        const date = document.getElementById("taskDate").value;
        const priority = document.getElementById("taskPriority").value;

        const tasks = loadTasks();
        tasks.push({ name, date, priority });
        saveTasks(tasks);
        renderTasks(tasks);
        taskForm.reset();
    };

    // Event listeners para adicionar tarefa e filtros
    taskForm.addEventListener("submit", addTask);

    // Funções para editar e excluir tarefas
    // Filtro por status e prioridade
    // Exibir notificações para tarefas com prazos próximos

    // Carregar tarefas ao iniciar
    renderTasks(loadTasks());
});
