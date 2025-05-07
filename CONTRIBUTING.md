# Contributing to React + TypeScript + Vite + Shadcn/UI Boilerplate

Thank you for considering contributing to this project! This document provides guidelines and instructions to help you
contribute effectively.

## Table of Contents

- [Getting Started](#getting-started)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## Getting Started

Set up the project by following the instructions in the [README.md](./README.md) file.

## Coding Standards

This project follows specific coding standards to maintain consistency:

### TypeScript

- Use TypeScript for all new code
- Define proper types for all variables, parameters, and return values
- Avoid using `any` type when possible
- Use interfaces for object shapes

### Styling

- [shadcn/ui](https://ui.shadcn.com/) uses Tailwind CSS for styling. Refer to
  the [Tailwind documentation](https://tailwindcss.com/docs/installation/using-vite) for more information.
- To add new components, use the CLI provided by shadcn. Refer to the [shadcn/ui docs](https://ui.shadcn.com/) for setup
  and usage details.

### File Structure

- **Common files:**

  - UI components: `src/components/ui/`
  - Layout components: `src/components/ui/layout/`
  - Hooks: `src/hooks/`
  - Contexts: `src/contexts/`
  - Routes: `src/router/routes/`
  - Pages: `src/pages/`

- **Page-specific files (under `src/pages/[page-name]/`):**
  - Components: `components/`
  - Hooks: `hooks/`
  - Routes: `routes/`
  - Utils: `utils/`

### Naming Conventions

- **Important:** Components in the `src/components/ui/` directory follow the [shadcn/ui](https://ui.shadcn.com/) naming
  convention, which differs from the rest of the application:
  - `shadcn/ui` components use **kebab-case** (e.g., `alert-dialog.tsx`, `button.tsx`)
- For all other application files:
  - **Components** use **PascalCase** (e.g., `UserProfile.tsx`, `DashboardLayout.tsx`)
  - **Hooks, utilities, and context files** use **camelCase** (e.g., `useUserData.ts`, `fetchDashboardData.ts`,
    `authContext.ts`)
- Please maintain this distinction to clearly separate shadcn base UI components from custom application logic and to
  ensure consistency across the codebase.

## Testing

- Write tests for all new features and bug fixes

## Documentation

- Update README.md or CONTRIBUTING.md, if necessary.
