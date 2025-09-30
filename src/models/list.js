export default class List {

    constructor(name, tasks) {
        this.name = name.trim();
        this.tasks = tasks;
    }

    addTask(task) {
        this.tasks.push(task);
    }
}
