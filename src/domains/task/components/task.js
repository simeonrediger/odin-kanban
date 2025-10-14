import '../styles/task.css';

export default class TaskView {

    constructor(task) {
        this.container = document.createElement('li');
        this.container.dataset.id = task.id;
        this.container.classList.add('task-container');

        this.label = document.createElement('p');
        this.label.textContent = task.name;
        this.label.classList.add('task-label');

        this.container.append(this.label);
    }
}
