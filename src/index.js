import '@/shared/styles/reset.css';
import '@/shared/styles/colors.css';

import injectIcons from '@/shared/components/icons/inject-icons.js';
import storage from '@/domains/workspace/storage.js';
import workspace from '@/domains/workspace/model.js';
import workspaceController from '@/domains/workspace/controller.js';

injectIcons(document);

const workspaceJson = storage.load();
workspaceController.init(workspace, workspaceJson);
