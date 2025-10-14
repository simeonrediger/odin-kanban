import assert from '@/shared/validation/assert.js';
import {
    createCancelCircleIcon,
    createCheckmarkIcon,
    createClipboardPlusIcon,
    createSquirclePlusIcon,
} from './create-icons.js';

const iconMap = {
    'cancel-circle': createCancelCircleIcon,
    'checkmark': createCheckmarkIcon,
    'clipboard-plus': createClipboardPlusIcon,
    'squircle-plus': createSquirclePlusIcon,
};

export default function injectIcons(root) {
    const injectionTargets = root.querySelectorAll('[data-icon]');

    for (const element of injectionTargets) {
        const iconSpec = element.dataset.icon.split(' ');
        const iconName = iconSpec[0];
        const isPrepended = iconSpec.length > 1 && iconSpec[1] === 'prepend';

        const createIcon = iconMap[iconName];
        assert.defined(createIcon, `'${iconName}'`);

        const icon = createIcon();

        if (isPrepended) {
            element.prepend(icon);
        } else {
            element.append(icon);
        }
    }
}
