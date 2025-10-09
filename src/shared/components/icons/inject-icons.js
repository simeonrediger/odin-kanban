import {
    createSquirclePlusIcon,
} from './create-icons.js';

const iconMap = {
    'squircle-plus': createSquirclePlusIcon,
};

export default function injectIcons(root) {
    const injectionTargets = root.querySelectorAll('[data-icon]');

    for (const element of injectionTargets) {
        const createIcon = iconMap[element.dataset.icon];
        // assert.defined(createIcon, "''");
        const icon = createIcon();
        element.append(icon);
    }
}
