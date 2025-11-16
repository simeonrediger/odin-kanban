import './style.css';

import {
    createCaretDownIcon,
    createThreeDotsVerticalIcon,
} from '@/shared/components/icons/create-icons.js';

export default class TaskView {
    #container;
    #header;
    #label;
    #detailsContainer;
    #toggleDescriptionButton
    #description;
    #priorityLevel;

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

        this.#detailsContainer = document.createElement('div');
        this.#detailsContainer.classList.add('task-details');

        this.#container.append(this.#header, this.#detailsContainer);

        if (taskId) {
            this.init(taskId, store, containerRole);
        }
    }

    init(taskId, store, containerRole) {
        this.#container.dataset.id = taskId;
        this.#container.dataset.role = containerRole;

        const optionsMenuButton = this.#createOptionsButton();
        this.#header.append(optionsMenuButton);

        this.render(store);
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

    render(store) {
        const taskName = store.getTaskName();
        const taskPriorityLevel = store.getTaskPriorityLevel();
        const taskDescription = store.getTaskDescription();

        this.#renderName(taskName);
        this.#renderPriorityLevel(taskPriorityLevel);
        this.#renderDescription(taskDescription);
    }

    #renderName(name) {
        this.#label.textContent = name;
    }

    #renderPriorityLevel(priorityLevel) {

        if (!priorityLevel) {
            return;
        }

        this.#priorityLevel = document.createElement('p');
        this.#priorityLevel.classList.add('task-priority-level');

        this.#priorityLevel.classList.add(
            this.#getPriorityLevelClass(priorityLevel)
        );

        this.#priorityLevel.textContent = this.#getPriorityLevelText(
            priorityLevel
        );

        this.#detailsContainer.prepend(this.#priorityLevel);
    }

    #getPriorityLevelClass(priorityLevel) {

        switch (priorityLevel) {
            case 10:
                return 'optional';
            case 20:
                return 'low';
            case 30:
                return 'medium';
            case 40:
                return 'high';
            case 50:
                return 'critical';
            default:
                throw new Error(`Unexpected 'priorityLevel': ${priorityLevel}`);
        }
    }

    #getPriorityLevelText(priorityLevel) {

        switch (priorityLevel) {
            case 10:
                return 'Optional';
            case 20:
                return 'Low';
            case 30:
                return 'Medium';
            case 40:
                return 'High';
            case 50:
                return 'Critical';
            default:
                throw new Error(`Unexpected 'priorityLevel': ${priorityLevel}`);
        }
    }

    #renderDescription(descriptionText) {

        if (!this.#description) {
            this.#createDescription();
        }

        if (descriptionText) {
            this.#setDescriptionText(descriptionText);
        } else {
            this.#unsetDescription();
        }
    }

    #setDescriptionText(text) {

        if (typeof text !== 'string' || text === '') {
            throw new TypeError(`'text' must be a string`);
        }

        this.#description.textContent = text;
        this.#toggleDescriptionButton.classList.remove('hidden');
    }

    #unsetDescription() {
        this.#description.textContent = '';
        this.#toggleDescriptionButton.classList.add('hidden');
    }

    #createDescription() {
        this.#toggleDescriptionButton = document.createElement('button');
        this.#toggleDescriptionButton.classList.add(
            'toggle-description-button'
        );
        this.#toggleDescriptionButton.dataset.action = (
            TaskView.#actions.toggleDescription
        );

        const toggleDescriptionIcon = createCaretDownIcon();
        toggleDescriptionIcon.classList.add('toggle-description-icon');

        this.#description = document.createElement('p');
        this.#description.classList.add('task-description', 'hidden');

        this.#toggleDescriptionButton.append(toggleDescriptionIcon);
        this.#detailsContainer.append(this.#toggleDescriptionButton);
        this.#container.append(this.#description);
    }

    toggleDescription() {
        this.#description.classList.toggle('hidden');
    }
}
