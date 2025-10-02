import assert from '../utils/assert.js';
import Task from './task.js';

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
        assert.instanceOf(Task, task, "'task'");
        this.tasks.push(task);
    }

    removeTask(targetTask) {
        assert.instanceOf(Task, targetTask, "'targetTask'");
        this.tasks.splice(this.tasks.indexOf(targetTask), 1);
    }
}
