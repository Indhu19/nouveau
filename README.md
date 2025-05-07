# React + TypeScript + Vite + Shadcn/UI Boilerplate

A modern, feature-rich boilerplate for building React applications with TypeScript, Vite, and Shadcn/UI.

## Features

- ⚡️ **[Vite](https://vitejs.dev/)** - Lightning fast build tool
- 🔄 **[React 19](https://react.dev/)** - Latest React version with improved performance
- 📘 **[TypeScript](https://www.typescriptlang.org/)** - Type safety for your JavaScript
- 🎭 **[shadcn/ui](https://ui.shadcn.com/)** - Beautifully designed components built with Radix UI and Tailwind CSS
- 🔐 **[Auth0](https://auth0.com/)** - Authentication and authorization
- 🧭 **[TanStack Router](https://tanstack.com/router)** - Type-safe routing
- 📊 **[TanStack Query](https://tanstack.com/query)** - Data fetching and caching
- 🌐 **[i18next](https://www.i18next.com/) + [Locize](https://locize.com/)** - Internationalization and localization
  management
- 🗃️ **[Zustand](https://zustand-demo.pmnd.rs/)** - State management
- 📝 **[React Hook Form](https://react-hook-form.com/)** - Form handling
- ✅ **[Zod](https://zod.dev/)** - Schema validation
- 🐞 **[Sentry](https://sentry.io/)** - Error tracking
- 🔍 **[ESLint](https://eslint.org/)** - Code linting
- ✨ **[Prettier](https://prettier.io/)** - Code formatting
- 🔄 **[Husky](https://typicode.github.io/husky/)** - Git hooks

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn

### Project Setup

1. Clone the repository.
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Update the `.env` file in the root directory with the required Auth0 and Sentry credentials. Verify other environment
   variables as well:
   ```
   VITE_APP_AUTH0_DOMAIN=your-auth0-domain
   VITE_APP_AUTH0_CLIENT_ID=your-auth0-client-id
   VITE_APP_AUTH0_CALLBACK_URL=http://localhost:5173
   VITE_APP_AUTH0_AUDIENCE=your-auth0-audience
   SENTRY_DSN=your-sentry-dsn
   SENTRY_AUTH_TOKEN=your-sentry-auth-token
   SENTRY_PROJECT=your-sentry-project-name
   ```
4. Update the `i18n.config.ts` file with your Locize project details and namespaces:
   ```ts
   const LOCIZE_PROJECT_ID = 'your-locize-project-id';
   const LOCIZE_API_KEY = 'your-locize-api-key';
   const namespaces = {
     common: 'common',
     // ... other namespaces
   } as const;
   ```
5. Update `package.json` with your project name.
6. Add the logo and favicon files to the `/public` folder. Include both light and dark versions using the same filenames
   as in this project.
7. Update `index.html` with the correct favicon filename and page title.
8. Customize the splash screen by modifying the configuration in `src/lib/splashScreenConfig.ts`.
9. Configure the navigation menu and breadcrumbs in `src/lib/menuConfig.ts`. Update this file whenever new routes are
   added.
10. Start the development server:
    ```bash
    yarn dev
    # or
    vite
    ```
11. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   └── ui/             # UI components (buttons, cards, etc.)
│   │       └── layout/     # Layout components
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and libraries
│   ├── modules/            # Feature modules
│   ├── pages/              # Page components (follows sidebar navigation structure)
│   │   └── [page-name]/    # Each page follows the sidebar navigation menu structure
│   │       ├── api/        # Page-specific backend request functions
│   │       ├── components/ # Page-specific components
│   │       ├── hooks/      # Page-specific hooks
│   │       ├── routes/     # Page-specific routes
│   │       └── utils/      # Page-specific utility functions
│   ├── providers/          # Context providers
│   ├── router/             # Routing configuration
│   ├── App.tsx             # Main App component
│   └── main.tsx            # Application entry point
├── .eslintrc.js            # ESLint configuration
├── i18n.config.ts          # i18next and Locize configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Key Components

### Authentication

The boilerplate uses Auth0 for authentication. Configure your Auth0 credentials in the `.env` file.

```tsx
// Example of using authentication
import { useAuth0 } from '@auth0/auth0-react';

function Profile() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  if (!isAuthenticated) {
    return <button onClick={() => loginWithRedirect()}>Log in</button>;
  }

  return (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={() => logout()}>Log out</button>
    </div>
  );
}
```

### Routing

The boilerplate uses TanStack Router for routing. Data can be loaded before rendering the page by defining a loader
function and a pending component to show the skeleton while loading the page.

```tsx
// Example of defining a route
import { createRoute } from '@tanstack/react-router';
import { root } from '@/components/routing/root.tsx';
import PageSkeleton from '@/components/ui/layout/loader/page-skeleton.tsx';
import Page from '@/pages/dashboard/Index.tsx';

export const dashboardRoute = createRoute({
  getParentRoute: () => root,
  path: '/',
  component: Index,
  pendingComponent: PageSkeleton,
  loader:
    () =>
    async ({ context }: { context: RouteContext }) => {
      await context.queryClient.prefetchQuery({
        queryKey: ['dashboard-data'],
        queryFn: fetchDashboardData,
      });
    },
});
```

### Internationalization

The boilerplate uses i18next with Locize for internationalization. It's configured for translation to Hindi and Tamil
languages.

```tsx
// Example of using translations with i18next
import { useTranslation } from 'react-i18next';

function Welcome() {
  const { t } = useTranslation('common');

  return <h1>{t('welcome.title')}</h1>;
}
```

### Theme Support

To change to the theme given in the shadcn/ui website(https://ui.shadcn.com/themes), copy the `:root` and `.dark` CSS
blocks provided and replace them in `src/index.css`, without changing other parts of the code.

```css
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /*... other values*/
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  /*... other values*/
}
```
