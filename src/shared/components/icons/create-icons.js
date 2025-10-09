import cancelCircleSvg from './cancel-circle.svg?raw';
import checkmarkSvg from './checkmark.svg?raw';
import squirclePlusSvg from './squircle-plus.svg?raw';
import threeDotsHorizontalSvg from './three-dots-horizontal.svg?raw';

const parser = new DOMParser();

function createIconFromString(svgString) {
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const svg = doc.documentElement;

    return svg;
}

export function createCancelCircleIcon() {
    return createIconFromString(cancelCircleSvg);
}

export function createCheckmarkIcon() {
    return createIconFromString(checkmarkSvg);
}

export function createSquirclePlusIcon() {
    return createIconFromString(squirclePlusSvg);
}

export function createThreeDotsHorizontalIcon() {
    return createIconFromString(threeDotsHorizontalSvg);
}
