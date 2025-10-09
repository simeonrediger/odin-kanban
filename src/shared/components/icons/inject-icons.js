import assert from '@/shared/validation/assert.js';
import {
    createSquirclePlusIcon,
} from './create-icons.js';

const iconMap = {
    'squircle-plus': createSquirclePlusIcon,
};

export default function injectIcons(root) {
    const injectionTargets = root.querySelectorAll('[data-icon]');

    for (const element of injectionTargets) {
        const iconName = element.dataset.icon;
        const createIcon = iconMap[iconName];
        assert.defined(createIcon, `'${iconName}'`);
        const icon = createIcon();
        element.append(icon);
    }
}
