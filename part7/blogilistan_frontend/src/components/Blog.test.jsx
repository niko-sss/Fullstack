import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title, author, not url and toggleabble set to "view"', () => {
  const blog = {
    title: 'asdfg',
    author: 'asdasd',
    url: 'jgjg',
    likes: 3
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('asdfg asdasd')
  const element1 = screen.getByText('view')
  const element2 = screen.getByText('jgjg')
  expect(element).toBeDefined()
  expect(element1).toBeDefined()
  expect(element2).not.toBe('jgjg')
})

test('clicking toggleable works and then more information is being rendered', async () => {
  const blog = {
    title: 'asdfg',
    author: 'asdasd',
    url: 'jgjg',
    likes: 3
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const element = screen.getByText('jgjg')
  const element1 = screen.getByText('Likes 3')
  const element2 = screen.getByText('asdasd')

  expect(element).toBeDefined()
  expect(element1).toBeDefined()
  expect(element2).toBeDefined()
})