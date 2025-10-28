import EventBus from '@/shared/event-bus.js';
import * as events from './events.js';

const eventBus = new EventBus();

export default eventBus;
export { events };
