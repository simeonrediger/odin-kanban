export default class extends Error {

    constructor(name) {
        super(`Name '${name}' is already in use`);
        this.name = 'DuplicateNameError';
    }
}
