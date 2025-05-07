import { http, HttpResponse } from 'msw';
import { userSchema, User } from '@/pages/user-management/users.ts';

const users: User[] = [];

export const userHandlers = [
  /**
   * GET /api/users
   * Returns the current list of users.
   */
  http.get('/api/users', () => {
    return HttpResponse.json(users);
  }),

  /**
   * POST /api/users
   * Creates a new user with the request JSON payload.
   */
  http.post('/api/users', async ({ request }) => {
    const body = await request.json();
    const result = userSchema.safeParse(body);

    if (!result.success) {
      return HttpResponse.json({ errors: result.error.format() }, { status: 400 });
    }
    const payload = result.data;

    const newUser: User = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...payload,
    };

    users.push(newUser);

    return HttpResponse.json(newUser, { status: 201 });
  }),
];
