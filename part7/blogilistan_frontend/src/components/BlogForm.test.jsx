import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

test('BlogForm updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const setSuccessMessage = vi.fn()
  const setErrorMessage = vi.fn()
  const setBlogs = vi.fn()
  const blogs = vi.fn()
  const mockToggleVisibility = vi.fn()
  const noteFormRef = {
    current: {
      toggleVisibility: mockToggleVisibility
    }
  }

  const mockFunc = vi.fn()

  const { container } = render(
  <Togglable buttonLabel="create new" ref={noteFormRef}>
    <BlogForm
      blogs={[]}
      setBlogs={setBlogs}
      setSuccessMessage={setSuccessMessage}
      setErrorMessage={setErrorMessage}
      noteFormRef={noteFormRef}
      mockFunc={mockFunc}
    />
  </Togglable>
)
  await user.click(screen.getByText('create new'))
  const input = container.querySelector('#blog-title')

  await user.type(input, 'testingg')
  await user.click(screen.getByRole('button', { name: /create/i }))


  expect(mockFunc).toHaveBeenCalledTimes(1)
  expect(mockFunc.mock.calls[0][0].title).toBe('testingg')
})