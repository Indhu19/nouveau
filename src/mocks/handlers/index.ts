import { chartHandlers } from '@/mocks/handlers/chartHandlers.ts';
import { userHandlers } from '@/mocks/handlers/users.ts';

export const handlers = [...userHandlers, ...chartHandlers];
