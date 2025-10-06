import '@/shared/styles/reset.css';
import '@/shared/styles/colors.css';

import defaultBoard from '@/domains/board/defaults/board.js';
import workspace from '@/domains/workspace/model/workspace.js';

workspace.addBoard(defaultBoard);
