export default class List {

    constructor(name, tasks) {

        if (!Array.isArray(tasks)) {
            throw new TypeError("Expected 'tasks' to be an array");
        }

        this.name = name.trim();
        this.tasks = tasks;
    }
}
