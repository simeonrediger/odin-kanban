import './style.css';

import {
    createCaretDownIcon,
    createThreeDotsVerticalIcon,
} from '@/shared/components/icons/create-icons.js';

export default class TaskView {
    #container;
    #header;
    #label;
    #description;

    static #actions = {
        openOptionsMenu: 'open-task-options-menu',
        toggleDescription: 'toggle-task-description',
    };

    static get openOptionsMenuAction() {
        return this.#actions.openOptionsMenu;
    }

    static get toggleDescriptionAction() {
        return this.#actions.toggleDescription;
    }

    constructor(taskId, store, containerRole) {
        this.#container = document.createElement('li');
        this.#container.classList.add('task-container');

        this.#label = document.createElement('p');
        this.#label.classList.add('task-label');

        this.#header = document.createElement('div');
        this.#header.classList.add('task-header');
        this.#header.append(this.#label);

        this.#container.append(this.#header);

        if (taskId) {
            this.init(taskId, store, containerRole);
        }
    }

    init(taskId, store, containerRole) {
        this.#container.dataset.id = taskId;
        this.#container.dataset.role = containerRole;

        this.#label.textContent = store.getTaskName(taskId);
        const optionsMenuButton = this.#createOptionsButton();
        this.#header.append(optionsMenuButton);

        const taskDescription = store.getTaskDescription();

        if (taskDescription) {
            this.#renderDescription(taskDescription);
        }
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
        this.#header.prepend(editor);
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

    #renderDescription(descriptionText) {
        const toggleDescriptionButtonWrapper = document.createElement('div');
        toggleDescriptionButtonWrapper.classList.add(
            'toggle-description-button-wrapper'
        );

        const toggleDescriptionButton = document.createElement('button');
        toggleDescriptionButton.classList.add('toggle-description-button')
        toggleDescriptionButton.dataset.action = (
            TaskView.#actions.toggleDescription
        );

        const toggleDescriptionIcon = createCaretDownIcon();
        toggleDescriptionIcon.classList.add('toggle-description-icon');

        this.#description = document.createElement('p');
        this.#description.classList.add('task-description', 'hidden');
        this.#description.textContent = descriptionText;

        toggleDescriptionButton.append(toggleDescriptionIcon);
        toggleDescriptionButtonWrapper.append(toggleDescriptionButton);
        this.#container.append(
            toggleDescriptionButtonWrapper,
            this.#description,
        );
    }

    toggleDescription() {
        this.#description.classList.toggle('hidden');
    }
}
