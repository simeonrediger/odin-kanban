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
        throw new TypeError(`${name} must be an array`);
    }
}

function assertFunction(value, name = defaultName) {
    assertType('function', value, name);
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

const assert = {
    array: assertArray,
    instanceOf: assertInstanceOf,
    string: assertString,

    function: assertFunction,
    type: assertType,
};

export default assert;
