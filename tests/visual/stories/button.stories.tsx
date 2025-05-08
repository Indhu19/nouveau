import type { Meta, StoryObj } from '@storybook/react';

import { userEvent, within, waitFor } from '@storybook/testing-library';
import { expect } from 'vitest';
import Button from '../stories/Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
    },
    size: {
      control: 'select',
      options: ['md', 'sm', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Default Button',
    variant: 'primary',
    size: 'sm',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /default button/i });

    expect(button).toBeInTheDocument();
    await userEvent.click(button);
    await waitFor(() => {
      expect(args.onClick).toHaveBeenCalled();
    });
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    expect(button).toBeDisabled();
    await userEvent.click(button);
    await waitFor(() => {
      expect(args.onClick).not.toHaveBeenCalled();
    });
  },
};
