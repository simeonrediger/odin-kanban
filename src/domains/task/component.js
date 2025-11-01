import './style.css';

export default class TaskView {

    constructor(taskId, store, containerRole) {
        this.container = document.createElement('li');
        this.container.dataset.id = taskId;
        this.container.dataset.role = containerRole;
        this.container.classList.add('task-container');

        this.label = document.createElement('p');
        this.label.textContent = store.getTaskName(taskId);
        this.label.classList.add('task-label');

        this.container.append(this.label);
    }
}
