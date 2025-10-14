import '../styles/list.css';

import TaskView from '@/domains/task/components/task.js';

export default class ListView {

    constructor(list) {
        this.container = document.createElement('li');
        this.container.dataset.id = list.id;
        this.container.dataset.role = 'list-container';
        this.container.classList.add('list-container');

        this.label = document.createElement('p');
        this.label.textContent = list.name;
        this.label.classList.add('list-label');

        this.tasks = document.createElement('ul');
        this.tasks.classList.add('tasks-list');

        for (const task of list.tasks) {
            const taskView = new TaskView(task);
            this.tasks.append(taskView.container);
        }

        this.container.append(this.label, this.tasks);
    }
}
