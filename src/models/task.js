import isValidName from '../validation/is-valid-name.js';
import InvalidNameError from '../errors/invalid-name-error.js'; 

export default class Task {

    constructor(name) {

        if (!isValidName(name)) {
            throw new InvalidNameError(name, this.constructor.name);
        }

        this.name = name.trim();
    }
}
