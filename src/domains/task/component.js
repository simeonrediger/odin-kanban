import './style.css';

export default class TaskView {
    #container;
    #label;

    constructor(taskId, store, containerRole) {
        this.#container = document.createElement('li');
        this.#container.classList.add('task-container');

        this.#label = document.createElement('p');
        this.#label.classList.add('task-label');

        this.#container.append(this.#label);

        if (taskId) {
            this.init(taskId, store, containerRole);
        }
    }

    init(taskId, store, containerRole) {
        this.#container.dataset.id = taskId;
        this.#container.dataset.role = containerRole;

        this.#label.textContent = store.getTaskName(taskId);
    }

    get container() {
        return this.#container;
    }

    replaceLabelWithEditor(editor) {
        this.#label.classList.add('hidden');
        this.#container.classList.add('editing');
        this.#container.prepend(editor);
    }
}
