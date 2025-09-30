export default function deepFreeze(object, seen = new WeakSet()) {

    if (object === null || typeof object !== 'object' || seen.has(object)) {
        return object;
    }

    seen.add(object);
    Object.freeze(object);

    for (let symbol of Object.getOwnPropertySymbols(object)) {
        deepFreeze(object[symbol], seen);
    }

    for (let value of Object.values(object)) {
        deepFreeze(value, seen);
    }

    return object;
}
