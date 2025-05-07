import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { toast } from 'sonner'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { server } from '@/mocks/server.ts';
import UserEnrollmentForm from '@/pages/user-management/UserForm.tsx';

// Mock toast from sonner
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

// Mock navigation from @tanstack/react-router
const navigateMock = vi.fn()
vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => navigateMock,
}))

describe('UserEnrollmentForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset MSW handlers in case any were overridden
    server.resetHandlers()
  })

  it('renders all form fields and submit button', () => {
    render(<UserEnrollmentForm />)

    expect(screen.getByText('User Registration')).toBeInTheDocument()
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Mobile Number/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Register User/i })).toBeEnabled()
  })

  it('shows validation errors when submitting empty form', async () => {
    render(<UserEnrollmentForm />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /Register User/i }))

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
      expect(screen.getByText('Username is required')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(screen.getByText('Password is required')).toBeInTheDocument()
      expect(screen.getByText('Mobile number is required')).toBeInTheDocument()
    })
  })

  it('submits form successfully with valid data', async () => {
    render(<UserEnrollmentForm />)
    const user = userEvent.setup()

    // Fill in valid form data
    await user.type(screen.getByLabelText(/Full Name/i), 'John Doe')
    await user.type(screen.getByLabelText(/Username/i), 'johndoe')
    await user.type(screen.getByLabelText(/Email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/Password/i), 'Password123!')
    await user.type(screen.getByLabelText(/Mobile Number/i), '+12345678900')

    // Submit the form
    await user.click(screen.getByRole('button', { name: /Register User/i }))

    await waitFor(() => {
      // Confirm toast & navigation
      expect(toast.success).toHaveBeenCalledWith('User successfully registered!')
      expect(navigateMock).toHaveBeenCalledWith({ to: '/users' })
    })
  })

  it('shows error toast when API fails', async () => {
    // Override POST handler to return 500
    server.use(
      http.post('/api/users', () => HttpResponse.json({}, { status: 500 }))
    )

    render(<UserEnrollmentForm />)
    const user = userEvent.setup()

    // Fill in valid form data
    await user.type(screen.getByLabelText(/Full Name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/Username/i), 'janedoe')
    await user.type(screen.getByLabelText(/Email/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/Password/i), 'Secure123!')
    await user.type(screen.getByLabelText(/Mobile Number/i), '+12345678901')

    // Submit the form
    await user.click(screen.getByRole('button', { name: /Register User/i }))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to register user. Please try again.')
      // Navigation should not occur on failure
      expect(navigateMock).not.toHaveBeenCalled()
    })
  })
})
