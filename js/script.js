{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    }

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();

    }

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const finishAllTasks = () => {
        tasks = tasks.map((task) => ({
            ...task, done: true,
        }));

        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }

    const bindHideTasksEvents = () => {
        const buttonHideDoneTasks = document.querySelector(".js-buttonHideDoneTasks");

        if (!buttonHideDoneTasks)
            return;

        buttonHideDoneTasks.addEventListener("click", () => {
            toggleHideDoneTasks();
        });
    }

    const bindFinishTasksEvent = () => {
        if (tasks.length > 0) {
            buttonFinishAllTasks = document.querySelector(".js-buttonFinishAllTasks");

            buttonFinishAllTasks.addEventListener("click", () => {
                finishAllTasks();
            });
        };
    };

    const renderTasks = () => {
        const taskToHTML = task => `
            <li class="list__item ${task.done && hideDoneTasks ? " list__item--hide" : ""}">
            <button class="js-done list__button list__button--done">${task.done ? "&#x2714;" : ""}</button>
            <span class="list__paragraph ${task.done ? "list__paragraph--done" : ""}">${task.content}</span> 
            <button class="js-remove list__button list__button--remove">&#128465;</button>
            </li>
            `;

        const htmlString = document.querySelector(".js-tasks");
        htmlString.innerHTML = tasks.map(taskToHTML).join("");
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }
        buttonsElement.innerHTML = `
                <button class="section__button js-buttonHideDoneTasks"> ${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"} </button>
            <button class="section__button js-buttonFinishAllTasks" ${tasks.every(({ done }) => done) ? "disabled" : ""}> Ukończ wszystkie </button>`;
    };

    const render = () => {

        renderTasks();
        renderButtons();
        bindEvents();
        bindHideTasksEvents();
        bindFinishTasksEvent();

    };

    const resetFormInput = (newTask) => {
        newTask.value = "";
        newTask.focus();
    };


    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-newTask");
        const newTaskContent = newTask.value.trim();

        if (newTaskContent === "") {
            resetFormInput(newTask);
            return;
        }

        addNewTask(newTaskContent);
        resetFormInput(newTask);
    };


    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();

};
