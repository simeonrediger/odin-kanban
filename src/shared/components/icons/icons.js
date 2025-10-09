import threeDotsHorizontalSvg from './three-dots-horizontal.svg?raw';

const parser = new DOMParser();

function createIconFromString(svgString) {
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const svg = doc.documentElement;

    return svg;
}

export function createThreeDotsHorizontalIcon() {
    return createIconFromString(threeDotsHorizontalSvg);
}
