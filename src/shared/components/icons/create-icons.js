import cancelCircleSvg from './cancel-circle.svg?raw';
import caretDownSvg from './caret-down.svg?raw';
import checkmarkSvg from './checkmark.svg?raw';
import clipboardPlusSvg from './clipboard-plus.svg?raw';
import plusSvg from './plus.svg?raw';
import squirclePlusSvg from './squircle-plus.svg?raw';
import threeDotsHorizontalSvg from './three-dots-horizontal.svg?raw';
import threeDotsVerticalSvg from './three-dots-vertical.svg?raw';

const parser = new DOMParser();

function createIconFromString(svgString) {
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const svg = doc.documentElement;

    return svg;
}

export function createCancelCircleIcon() {
    return createIconFromString(cancelCircleSvg);
}

export function createCaretDownIcon() {
    return createIconFromString(caretDownSvg);
}

export function createCheckmarkIcon() {
    return createIconFromString(checkmarkSvg);
}

export function createClipboardPlusIcon() {
    return createIconFromString(clipboardPlusSvg);
}

export function createPlusIcon() {
    return createIconFromString(plusSvg);
}

export function createSquirclePlusIcon() {
    return createIconFromString(squirclePlusSvg);
}

export function createThreeDotsHorizontalIcon() {
    return createIconFromString(threeDotsHorizontalSvg);
}

export function createThreeDotsVerticalIcon() {
    return createIconFromString(threeDotsVerticalSvg);
}
