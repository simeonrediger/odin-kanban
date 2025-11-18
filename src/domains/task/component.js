import './style.css';

import {
    createCaretDownIcon,
    createThreeDotsVerticalIcon,
} from '@/shared/components/icons/create-icons.js';

export default class TaskView {
    #container;
    #label;
    #detailsContainer
    #priorityLevel;
    #dueDate;
    #descriptionToggleContainer;
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

        const headerContainer = document.createElement('div');
        headerContainer.classList.add('task-header-container');

        this.#label = document.createElement('p');
        this.#label.classList.add('task-label');

        const optionsButton = this.#createOptionsButton();

        headerContainer.append(this.#label, optionsButton);

        this.#detailsContainer = document.createElement('div');
        this.#detailsContainer.classList.add('task-details-container');

        this.#priorityLevel = document.createElement('p');
        this.#priorityLevel.classList.add('task-priority-level');

        this.#dueDate = document.createElement('p');
        this.#dueDate.classList.add('task-due-date');

        this.#detailsContainer.append(this.#priorityLevel, this.#dueDate);

        this.#descriptionToggleContainer = document.createElement('div');
        this.#descriptionToggleContainer.classList.add(
            'task-description-toggle-container'
        );
        const descriptionToggle = this.#createDescriptionToggle();
        this.#descriptionToggleContainer.append(descriptionToggle);

        this.#description = document.createElement('p');
        this.#description.classList.add('task-description', 'hidden');

        this.#container.append(
            headerContainer,
            this.#detailsContainer,
            this.#descriptionToggleContainer,
            this.#description,
        );

        if (taskId) {
            this.init(taskId, store, containerRole);
        }
    }

    init(taskId, store, containerRole) {
        this.#container.dataset.id = taskId;
        this.#container.dataset.role = containerRole;
        this.render(store);
    }

    get container() {
        return this.#container;
    }

    get id() {
        return this.#container.dataset.id;
    }

    replaceLabelWithEditor(editor) {
        this.#container.classList.add('editing');
        this.#container.append(editor);
    }

    showLabel() {
        this.#container.classList.remove('editing');
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
        const taskDueDate = store.getTaskDueDate();
        const taskDescription = store.getTaskDescription();

        this.#renderName(taskName);
        this.#renderPriorityLevel(taskPriorityLevel);
        this.#renderDueDate(taskDueDate);
        this.#renderDescription(taskDescription);
    }

    #renderName(name) {
        this.#label.textContent = name;
    }

    #renderPriorityLevel(priorityLevel) {

        if (!priorityLevel) {
            this.#priorityLevel.classList.add('hidden');
            return;
        }

        const priorityLevelClass = this.#getPriorityLevelClass(priorityLevel);
        this.#priorityLevel.classList.add(priorityLevelClass);
        this.#removePriorityLevelClasses(priorityLevelClass);

        this.#priorityLevel.textContent = this.#getPriorityLevelText(
            priorityLevel
        );

        this.#priorityLevel.classList.remove('hidden');
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

    #removePriorityLevelClasses(exception) {
        const classNames = ['optional', 'low', 'medium', 'high', 'critical'];
        const classesToRemove = classNames.filter(
            className => className !== exception
        );

        this.#priorityLevel.classList.remove(...classesToRemove);
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

    #renderDueDate(dueDate) {

        if (!dueDate) {
            this.#dueDate.classList.add('hidden');
            return;
        }

        this.#dueDate.textContent = this.#formatDate(dueDate);
        this.#dueDate.classList.remove('hidden');
    }

    #formatDate(date) {
        date = new Date(date);
        const dayOfTheWeek = date.getDay();
        const month = date.getMonth();
        let day = date.getDate();
        const year = date.getFullYear();

        let ordinalDay = day;
        const lastDayDigit = day % 10;
        const last2DayDigits = day % 100;

        if (lastDayDigit === 1 && last2DayDigits !== 11) {
            ordinalDay += 'st';
        } else if (lastDayDigit === 2 && last2DayDigits !== 12) {
            ordinalDay += 'nd';
        } else if (lastDayDigit === 3 && last2DayDigits !== 13) {
            ordinalDay += 'rd';
        } else {
            ordinalDay += 'th';
        }

        let formattedDate = '';

        const now = new Date();
        const currentDayOfTheWeek = now.getDay();
        const deltaInMs = date - now;
        const dayInMs = 1000 * 60 * 60 * 24;
        const deltaInDays = Math.abs(deltaInMs / dayInMs);

        if (deltaInDays < 7 && (
            deltaInDays < 1 ||
            dayOfTheWeek !== currentDayOfTheWeek
        )) {

            const dayAbbreviation = new Intl.DateTimeFormat('en-US', {
                weekday: 'short',
            }).format(date);

            formattedDate += dayAbbreviation;
        }

        const monthAbbreviation = new Intl.DateTimeFormat('en-US', {
            month: 'short',
        }).format(date);

        formattedDate += ` ${monthAbbreviation} ${ordinalDay}`

        if (year !== now.getFullYear()) {
            formattedDate += ` ${year}`;
        }

        return formattedDate;
    }

    #renderDescription(descriptionText) {

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
        this.#descriptionToggleContainer.classList.remove('hidden');
    }

    #unsetDescription() {
        this.#description.textContent = '';
        this.#descriptionToggleContainer.classList.add('hidden');
    }

    #createDescriptionToggle() {
        const descriptionToggle = document.createElement('button');
        descriptionToggle.classList.add('task-description-toggle');
        descriptionToggle.dataset.action = (
            TaskView.#actions.toggleDescription
        );

        const toggleDescriptionIcon = createCaretDownIcon();
        toggleDescriptionIcon.classList.add('task-description-toggle-icon');
        descriptionToggle.append(toggleDescriptionIcon);

        return descriptionToggle;
    }

    toggleDescription() {
        this.#description.classList.toggle('hidden');
    }
}
