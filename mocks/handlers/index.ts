import { chartHandlers } from './chartHandlers.ts';
import { userHandlers } from './users.ts';

export const handlers = [...userHandlers, ...chartHandlers];
