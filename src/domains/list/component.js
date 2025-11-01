import './style.css';

import TaskView from '@/domains/task/component.js';

export default class ListView {

    #roles = {
        taskContainer: 'task-container',
    };

    constructor(listId, store, containerRole) {
        this.container = document.createElement('li');
        this.container.classList.add('list-container');

        this.label = document.createElement('p');
        this.label.classList.add('list-label');

        this.tasks = document.createElement('ul');
        this.tasks.classList.add('tasks-list');

        this.container.append(this.label, this.tasks);

        if (listId) {
            this.init(listId, store, containerRole);
        }
    }

    init(listId, store, containerRole) {
        this.container.dataset.id = listId;
        this.container.dataset.role = containerRole;

        this.label.textContent = store.getListName(listId);

        for (const taskId of store.getTaskIds(listId)) {
            const taskViewStore = store.getTaskViewStore(taskId);
            const taskView = new TaskView(
                taskId,
                taskViewStore,
                this.#roles.taskContainer,
            );

            this.tasks.append(taskView.container);
        }
    }

    replaceLabelWithEditor(editor) {
        this.label.classList.add('hidden');
        this.container.classList.add('editing');
        this.container.prepend(editor);
    }

    showLabel() {
        this.container.classList.remove('editing');
        this.label.classList.remove('hidden');
    }
}
