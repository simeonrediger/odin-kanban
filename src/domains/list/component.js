import './style.css';

import TaskView from '@/domains/task/component.js';

import {
    createPlusIcon,
    createThreeDotsVerticalIcon,
} from '@/shared/components/icons/create-icons.js';

export default class ListView {

    static #actions = {
        createTask: 'create-task',
        openOptionsMenu: 'open-list-options-menu',
    };

    static #roles = {
        taskContainer: 'task-container',
    };

    static get openOptionsMenuAction() {
        return this.#actions.openOptionsMenu;
    }

    static get createTaskAction() {
        return this.#actions.createTask;
    }

    #container;
    #header;
    #label;
    #tasks;

    constructor(listId, store, containerRole) {
        this.#container = document.createElement('li');
        this.#container.classList.add('list-container');

        this.#header = document.createElement('div');
        this.#header.classList.add('list-header');

        this.#label = document.createElement('p');
        this.#label.classList.add('list-label');

        this.#tasks = document.createElement('ul');
        this.#tasks.classList.add('tasks-list');

        this.#header.append(this.#label);
        this.#container.append(this.#header, this.#tasks);

        if (listId) {
            this.init(listId, store, containerRole);
        }
    }

    init(listId, store, containerRole) {
        this.#container.dataset.id = listId;
        this.#container.dataset.role = containerRole;

        this.#label.textContent = store.getListName(listId);
        const optionsMenuButton = this.#createOptionsButton();
        this.#header.append(optionsMenuButton);

        for (const taskId of store.getTaskIds(listId)) {
            const taskViewStore = store.getTaskViewStore(taskId);
            const taskView = new TaskView(
                taskId,
                taskViewStore,
                ListView.#roles.taskContainer,
            );

            this.#tasks.append(taskView.container);
        }

        const newTaskButton = this.#createTaskButton();
        this.#container.append(newTaskButton);
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

    updateLabel(labelText) {
        this.#label.textContent = labelText;
    }

    #createOptionsButton() {
        const button = document.createElement('button');
        button.dataset.action = ListView.#actions.openOptionsMenu;
        button.classList.add('list-options-button');
        button.ariaLabel = 'Open list options menu';

        const icon = createThreeDotsVerticalIcon();
        icon.classList.add('list-options-icon');
        button.append(icon);

        return button;
    }

    #createTaskButton() {
        const button = document.createElement('button');
        button.dataset.action = ListView.#actions.createTask;
        button.classList.add('new-task-button');
        button.ariaLabel = 'Create task';

        const plusIcon = createPlusIcon();
        plusIcon.classList.add('new-task-icon');
        button.append(plusIcon);

        return button;
    }
}
