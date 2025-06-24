import type { Meta, StoryObj } from '@storybook/react-vite';

import Logout from '../pages/logout.tsx';

const meta = {
  component: Logout
} satisfies Meta<typeof Logout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
