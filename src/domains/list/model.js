import assert from '@/shared/validation/assert.js';
import Task from '@/domains/task/model.js';

export default class List {
    #id;
    #name;
    #tasks;

    constructor(name, tasks, id) {
        this.#id = id ?? crypto.randomUUID();
        this.name = name;
        this.tasks = tasks;
        Object.freeze(this);
    }

    addTask(task, targetIndex) {
        assert.instanceOf(Task, task, "'task'");

        if (targetIndex === undefined) {
            this.#tasks.push(task);
        } else {
            assert.nonNegativeInteger(targetIndex, "'targetIndex'");
            this.#tasks.splice(targetIndex, 0, task);
        }
    }

    removeTask(targetTask) {
        assert.instanceOf(Task, targetTask, "'targetTask'");

        if (!this.#tasks.includes(targetTask)) {
            throw new Error("'targetTask' not found on this list");
        }

        this.#tasks.splice(this.tasks.indexOf(targetTask), 1);
    }

    moveTask(task, targetIndex) {
        assert.instanceOf(Task, task, "'task'");
        assert.nonNegativeInteger(targetIndex, "'targetIndex'");

        this.removeTask(task);
        this.addTask(task, targetIndex);
    }

    get id() {
        return this.#id;
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

    toObject() {
        const tasks = [];

        for (const task of this.#tasks) {
            tasks.push(task.toObject());
        }

        return Object.freeze({
            name: this.#name,
            tasks: Object.freeze(tasks),
        });
    }

    toJson(replacer, space) {
        return JSON.stringify(this.toObject(), replacer, space);
    }
}
