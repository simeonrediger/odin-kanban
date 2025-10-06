const typePhrases = {
    'object': 'an object',
    'undefined': 'undefined',
    'boolean': 'a boolean',
    'number': 'a number',
    'bigint': 'a bigint',
    'string': 'a string',
    'function': 'a function',
    'symbol': 'a symbol',
};

const validTypes = Object.keys(typePhrases);
const defaultName = 'variable';

function assertArray(value, name = defaultName) {

    if (!Array.isArray(value)) {
        throw new TypeError(`${name} must be an Array`);
    }
}

function assertFunction(value, name = defaultName) {
    assertType('function', value, name);
}

function assertInValues(value, object, name = defaultName, objectName) {
    assertObject(object, "'object'");

    if (!Object.values(object).includes(value)) {
        throw new TypeError(`${name} value does not exist`);
    }
}

function assertInstanceOf(constructor, value, name = defaultName) {
    assertFunction(constructor, "'constructor'");

    if (!(value instanceof constructor)) {
        const constructorPhrase = constructor.name
            || 'the specified constructor';

        throw new TypeError(
            `${name} must be an instance of ${constructorPhrase}`
        );
    }
}

function assertInteger(value, name) {

    if (!Number.isInteger(value)) {
        throw new TypeError(`${name} must be an integer`);
    }
}

function assertNonNegativeInteger(value, name = defaultName) {
    assertInteger(value, name);

    if (value < 0) {
        throw new TypeError(`${name} must be a non-negative integer`);
    }
}

function assertObject(value, name = defaultName) {

    if (!(typeof value === 'object') || value === null) {
        throw new TypeError(`${name} must be an object`);
    }
}

function assertString(value, name = defaultName) {
    assertType('string', value, name);
}

function assertType(type, value, name = defaultName) {

    if (!validTypes.includes(type)) {
        throw new TypeError(`Invalid data type '${type}'`);
    }

    if (typeof value !== type) {
        throw new TypeError(`${name} must be ${typePhrases[type]}`);
    }
}

function assertValidDate(value, name = defaultName) {

    if (!(value instanceof Date) || isNaN(value)) {
        throw new TypeError(`${name} must be a valid Date`);
    }
}

const assert = {
    array: assertArray,
    inValues: assertInValues,
    instanceOf: assertInstanceOf,
    nonNegativeInteger: assertNonNegativeInteger,
    string: assertString,
    validDate: assertValidDate,
};

export default assert;
