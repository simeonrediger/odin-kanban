import '@/shared/styles/reset.css';
import '@/shared/styles/colors.css';

import assert from '@/shared/validation/assert.js';
import defaultBoard from '@/domains/board/data/default-board.js';
import demo from '@/shared/dev/demo.js';
import injectIcons from '@/shared/components/icons/inject-icons.js';
import workspace from '@/domains/workspace/model.js';
import workspaceView from '@/domains/workspace/component.js';

const workspaceContainer = document.querySelector("[data-role='workspace']");
assert.notNull(workspaceContainer);

injectIcons(document);

workspace.addBoard(defaultBoard);
demo.run(workspace);

workspaceView.init(workspaceContainer, workspace);
workspaceView.render();
