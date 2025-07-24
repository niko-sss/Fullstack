const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'asdasdddddd',
        username: 'asdasd',
        password: 'asd'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByText('username:')).toBeVisible()
    await expect(page.getByText('password:')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      const correctCredentials = {
        username: 'asdasd',
        password: 'asd'
        }
      await expect(page.getByLabel('username')).toBeVisible()
      await expect(page.getByLabel('password')).toBeVisible()
      await page.getByLabel('username').fill(correctCredentials.username)
      await page.getByLabel('password').fill(correctCredentials.password)
      await page.getByText('login' ).click()
      await expect(page.getByText('Blogs')).toBeVisible()
      await expect(page.getByRole('button', { name: 'create new' })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      const wrongCredentials = {
        username: 'asdasd',
        password: 'asddd'
      }
      await expect(page.getByLabel('username')).toBeVisible()
      await expect(page.getByLabel('password')).toBeVisible()
      await expect(page.getByRole('textbox').first()).toBeVisible()
      await expect(page.getByRole('textbox').last()).toBeVisible()
      await page.getByLabel('username').fill(wrongCredentials.username)
      await page.getByLabel('password').fill(wrongCredentials.password)
      await page.getByText('login').click()
      await expect(page.getByText('Wrong username or password')).toBeVisible()
      })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      const correctCredentials = {
        username: 'asdasd',
        password: 'asd'
        }
      await expect(page.getByLabel('username')).toBeVisible()
      await expect(page.getByLabel('password')).toBeVisible()
      await page.getByLabel('username').fill(correctCredentials.username)
      await page.getByLabel('password').fill(correctCredentials.password)
      await page.getByText('login' ).click()
      await expect(page.getByText('Blogs')).toBeVisible()
      await expect(page.getByRole('button', { name: 'create new' })).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      const data = {
        title: 'first blog',
        author: 'some author',
        url: 'www.someblogurlmaybeyes.com/blogg'
      }
      await page.getByText('create new').click()
      await page.getByRole('textbox', { name: 'title:' }).fill(data.title)
      await page.getByRole('textbox', { name: 'author:' }).fill(data.author)
      await page.getByRole('textbox', { name: 'url:' }).fill(data.url)
      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.getByText('view')).toBeVisible()
      await expect(page.getByText('New blog created')).toBeVisible()
    })
    describe('When logged in and blog is created', () => {
      beforeEach(async ({ page }) => {
        const data = {
          title: 'first blog',
          author: 'some author',
          url: 'www.someblogurlmaybeyes.com/blogg'
        }
        await page.getByText('create new').click()
        await page.getByRole('textbox', { name: 'title:' }).fill(data.title)
        await page.getByRole('textbox', { name: 'author:' }).fill(data.author)
        await page.getByRole('textbox', { name: 'url:' }).fill(data.url)
        await page.getByRole('button', { name: 'create' }).click()
      })
      test('blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'Like' }).click()
        await expect(page.getByText('Like successful')).toBeVisible()
      })
      test('blog removal causes confirm popup', async ({ page }) => {
        let isConfirmPopupping = false
        page.once('dialog', async dialog => {
          if (dialog.message() === 'Remove first blog by some author?') {
            isConfirmPopupping = true
            await dialog.accept()
          }
        })
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'remove' }).click()
        expect(isConfirmPopupping).toBe(true)
      })
    })
  })
})

