import '@/shared/styles/reset.css';
import '@/shared/styles/colors.css';

import assert from '@/shared/validation/assert.js';
import defaultBoard from '@/domains/board/defaults/board.js';
import workspace from '@/domains/workspace/model/workspace.js';
import workspaceView from '@/domains/workspace/components/workspace-view.js';

const workspaceContainer = document.querySelector("[data-role='workspace']");
assert.notNull(workspaceContainer);

workspace.addBoard(defaultBoard);
workspaceView.render(workspace, workspaceContainer);
