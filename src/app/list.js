import isValidName from '../validation/is-valid-name.js';
import InvalidNameError from '../errors/invalid-name-error.js'; 

export default class List {

    constructor(name, tasks) {

        if (!isValidName(name)) {
            throw new InvalidNameError(name);
        }

        this.name = name.trim();
        this.tasks = tasks;
    }
}
