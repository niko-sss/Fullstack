import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import BlogStats from './BlogStats'

test('pressing like button registers once per click', async () => {
  const blog = {
    title: 'asdfg',
    author: 'asdasd',
    url: 'jgjg',
    likes: 3
  }
  const setSuccessMessage = vi.fn()
  const setBlogs = vi.fn()
  const blogs = vi.fn()

  const mockHandler = vi.fn()

  render(<BlogStats
      blog={blog}
      mockLike={mockHandler}
      setSuccessMessage={setSuccessMessage}
      setBlogs={setBlogs}
      blogs={blogs}
    />)

  screen.debug()

  const user = userEvent.setup()
  const button = screen.getByText('Like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})