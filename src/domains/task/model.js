import assert from '@/shared/validation/assert.js';

export default class Task {

    static fromJson(taskJson) {

        return new Task(
            taskJson.name,
            taskJson.description,
            Number(taskJson.priorityLevel),
            Number(taskJson.dueDate),
            taskJson.id,
        );
    }

    static #PRIORITY = Object.freeze({
        OPTIONAL: 10,
        LOW: 20,
        MEDIUM: 30,
        HIGH: 40,
        CRITICAL: 50,
    });

    #id;
    #name;
    #description;
    #dueDate;
    #priorityLevel;

    constructor(name, description, priorityLevel, dueDate, id) {
        this.#id = id ?? crypto.randomUUID();
        this.name = name;
        this.#description = description;
        this.#priorityLevel = priorityLevel;
        this.#dueDate = dueDate;
        Object.freeze(this);
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

    get description() {
        return this.#description;
    }

    set description(description) {

        if (description !== undefined) {
            assert.string(description);
        }

        this.#description = description;
    }

    get priorityLevel() {
        return this.#priorityLevel;
    }

    set priorityLevel(priorityLevel) {

        if (priorityLevel !== undefined) {
            assert.inValues(priorityLevel, Task.#PRIORITY, "'priorityLevel'");
        }

        this.#priorityLevel = priorityLevel;
    }

    get dueDate() {
        return this.#dueDate;
    }

    set dueDate(dueDate) {

        if (dueDate !== undefined) {
            assert.validDate(new Date(dueDate));
        }

        this.#dueDate = dueDate;
    }

    toObject() {

        return Object.freeze({
            id: this.#id,
            name: this.name,
            description: this.description,
            dueDate: this.dueDate,
            priorityLevel: this.priorityLevel,
        });
    }

    toJson(replacer, space) {
        return JSON.stringify(this.toObject(), replacer, space);
    }
}
