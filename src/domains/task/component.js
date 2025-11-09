import './style.css';

import {
    createThreeDotsVerticalIcon,
} from '@/shared/components/icons/create-icons.js';

export default class TaskView {
    #container;
    #label;

    static #actions = {
        openOptionsMenu: 'open-task-options-menu',
    };

    static get openOptionsMenuAction() {
        return this.#actions.openOptionsMenu;
    }

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
        const optionsMenuButton = this.#createOptionsButton();
        this.#container.append(optionsMenuButton);
    }

    get container() {
        return this.#container;
    }

    get id() {
        return this.#container.dataset.id;
    }

    replaceLabelWithEditor(editor) {
        this.#label.classList.add('hidden');
        this.#container.classList.add('editing');
        this.#container.prepend(editor);
    }

    showLabel() {
        this.#container.classList.remove('editing');
        this.#label.classList.remove('hidden');
    }

    updateLabel(taskText) {
        this.#label.textContent = taskText;
    }

    #createOptionsButton() {
        const button = document.createElement('button');
        button.dataset.action = TaskView.#actions.openOptionsMenu;
        button.classList.add('task-options-button');
        button.ariaLabel = 'Open task options menu';

        const icon = createThreeDotsVerticalIcon();
        icon.classList.add('task-options-icon');
        button.append(icon);

        return button;
    }
}
