export default class List {
    #name;

    constructor(name, tasks) {
        this.#name = name.trim();
        this.tasks = tasks;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(targetTask) {
        this.tasks.splice(this.tasks.indexOf(targetTask), 1);
    }

    set name(name) {
        this.#name = name;
    }
}
