import assert from '../utils/assert.js';
import Task from './task.js';

export default class List {
    #name;
    #tasks;

    constructor(name, tasks) {
        this.name = name;
        this.tasks = tasks;
        Object.freeze(this);
    }

    addTask(task) {
        assert.instanceOf(Task, task, "'task'");
        this.#tasks.push(task);
    }

    removeTask(targetTask) {
        assert.instanceOf(Task, targetTask, "'targetTask'");
        this.#tasks.splice(this.tasks.indexOf(targetTask), 1);
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        assert.string(name);
        this.#name = name;
    }

    get tasks() {
        return Object.freeze([...this.#tasks]);
    }

    set tasks(tasks) {
        assert.array(tasks, "'tasks'");
        this.#tasks = tasks;
    }
}
