import '@/shared/styles/reset.css';
import '@/shared/styles/colors.css';

import defaultBoard from '@/domains/board/data/default-board.js';
import demo from '@/shared/dev/demo.js';
import injectIcons from '@/shared/components/icons/inject-icons.js';
import workspace from '@/domains/workspace/model.js';
import workspaceController from '@/domains/workspace/controller.js';

injectIcons(document);

workspace.addBoard(defaultBoard);
demo.run(workspace);

workspaceController.init(workspace);
