const taskform = document.querySelector('#newTaskForm');
const taskList = document.querySelector('#tasksList');
const empty = document.querySelector('#empty');
const username = document.querySelector('#username');

let nbTasks = 0;

async function getUser() {
    // TODO
    const response = await fetch('/.auth/me');
    const payload = await response.json();

    username.innerHTML = `Hi, ${payload.clientPrincipal.userDetails}`;
}

async function updateTask(e) {
    const taskId = this.closest('li').getAttribute('id');
    const status = e.target.checked ? 'checked' : '';
    
    const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
    });
}

taskform.addEventListener('submit', async (e) => {

    e.preventDefault();
    const newTaskInput = taskform.elements.new_task_input;

    const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ label: newTaskInput.value })
    });
    const payload = await response.json();

    if (nbTasks === 0) {
        document.querySelector("#empty").remove();
    }
    nbTasks++;
    
    const task = generateTask(payload);

    taskList.appendChild(task);

    newTaskInput.value = '';
});

async function getTasks() {
    const response = await fetch('/api/tasks');
    const payload = await response.json();
    console.log(payload);

    if (payload && payload.length > 0) {
        nbTasks += payload.length;
        document.querySelector("#empty").remove();
        for (const task of payload) {
            taskList.appendChild(generateTask(task))
        }
    }
}

function generateTask(task) {
    const tmpl = `
    <li class="task-item" id="${task._id}">
        <label>
            <input type="checkbox" ${task.status}>
            <p>${task.label}</p>
        </label>
    </li>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(tmpl);

    fragment.querySelector('input').addEventListener('change', updateTask);

    return fragment;
}

getUser();
getTasks();