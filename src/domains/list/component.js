import './style.css';

import TaskView from '@/domains/task/component.js';

export default class ListView {

    #roles = {
        taskContainer: 'task-container',
    };

    constructor(listId, store, containerRole) {
        this.container = document.createElement('li');
        this.container.dataset.id = listId;
        this.container.dataset.role = containerRole;
        this.container.classList.add('list-container');

        this.label = document.createElement('p');
        this.label.textContent = store.getListName(listId);
        this.label.classList.add('list-label');

        this.tasks = document.createElement('ul');
        this.tasks.classList.add('tasks-list');

        for (const taskId of store.getTaskIds(listId)) {
            const taskViewStore = store.getTaskViewStore(taskId);
            const taskView = new TaskView(
                taskId,
                taskViewStore,
                this.#roles.taskContainer,
            );

            this.tasks.append(taskView.container);
        }

        this.container.append(this.label, this.tasks);
    }
}
