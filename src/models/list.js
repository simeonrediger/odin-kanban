import assert from '../utils/assert.js';

export default class List {
    name;
    tasks;

    constructor(name, tasks) {
        assert.string(name, `${this.constructor.name} 'name'`);
        assert.array(tasks, `${this.constructor.name} 'tasks'`);

        this.name = name;
        this.tasks = tasks;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(targetTask) {
        this.tasks.splice(this.tasks.indexOf(targetTask), 1);
    }
}
