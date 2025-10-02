import assert from '../utils/assert.js';

export default class Task {
    name;
    description;
    dueDate;
    priorityLevel;
    isDone;

    constructor(name) {
        assert.string(name, `${this.constructor.name} 'name'`);
        this.name = name;
    }
}
