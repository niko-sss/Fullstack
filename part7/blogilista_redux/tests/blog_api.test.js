const { test, after, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const newBlog = {
  title: "jepjepjoo",
  author: "joooooo o",
  url: "www.aaaaaaaaaaagggggewewewot.com/blogs",
  likes: 22
}

test('test if GET returns json formatted blogs', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('test if GET returns correct amount of blogs', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, 2)
})

test('test if id is named id and not _id', async () => {
  const response = await api.get('/api/blogs')
  const keysOfBlog = Object.keys(await response.body[0])
  const key = keysOfBlog[4]
  
  assert.strictEqual(key, 'id')
})

test.only('test if POST is succesful', async () => {
  const usersArray = await User.find({})
  console.log('usersArrayyyyyyyyyyyyyyyyyyyyyyyYYYYYYYYYYYYYYYYYY', usersArray);
  
  const firstBlog = {
    title: 'First Title',
    author: 'First Author',
    url: 'www.FirstAuthorfggggdfsdsdsddssdjjt.com',
    likes: 43,
    user: `${usersArray[1]._id}`
  }
  const initialResponse = await api.get('/api/blogs')
  const initialBlogAmount = initialResponse.body.length

  await api.post('/api/blogs')
    .send(firstBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/blogs')

  const blogTitles = response.body.map(blog => blog.title)
  assert.strictEqual(response.body.length, initialBlogAmount + 1)
  assert(blogTitles.includes('First Title'))
})

test('test if non-inserted likes amount in POST returns 0 likes', async () => {
  const blogWithoutLikes = {
    title: 'jeajeasjs',
    author: 'asdasddodododod',
    url: 'www.asdfasdfjfjdjfjdsfjddddd.com/blogs',
    likes: 0
  }
  await api.post('/api/blogs')
    .send(blogWithoutLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  
  const returnedBlog = await response.body.filter((blog) => blog.url === 'www.asdfasdfjfjdjfjdsfjddddd.com/blogs')
  
  assert.strictEqual(returnedBlog[0].likes, 0)
})

test('test if non-inserted title/url responses 400', async () => {
  const blogWithoutTitleOrUrl = {
    title: null,
    author: null,
    url: null,
    likes: 12
  }
  await api.post('/api/blogs')
    .send(blogWithoutTitleOrUrl)
    .expect(400)
})

test('deletion of last record was successful', async () => {
  const response = await api.get('/api/blogs')
  const blogsAtStart = response.body
  const blogAmount = blogsAtStart.length
  const blogToDelete = blogsAtStart[blogAmount - 1]
  await api.delete(`/api/blogs/${blogToDelete.id}`)
  const responseAtEnd = await api.get('/api/blogs')
  const blogIdsAtEnd = responseAtEnd.body.map(blog => blog.id)
  assert(!blogIdsAtEnd.includes(blogToDelete.id))
})

after(async () => {
  await mongoose.connection.close()
})
