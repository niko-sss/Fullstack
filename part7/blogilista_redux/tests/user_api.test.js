const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const assert = require('node:assert')
const app = require('../app')

const api = supertest(app)
describe('Initially only root user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })
  test('test if initial user is created', async () => {
    const rootUser = {
      username: "root",
      name: "",
      password: "Password1"
    }
    await api.post('/api/users')
      .send(rootUser)
      .expect(201)
  })
})

describe('getting information from database', () => {
  test('get data from database with response 200 OK', async () => {
    await api
      .get('/api/users')
      .expect(200)
  })
})

describe('addition of a new user', () => {
  test('fails with statuscode 400 if invalid length of username', async () => {
    newUser = {
      username: "as",
      name: "asdasd",
      password: "password"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.message.includes('Username and password should be over 2 characters long'))
  })
  test('test if addition of two more users with reference to blogs succeeds', async () => {
    const firstUser = {
      username: "asdfg",
      name: "asdf gasd",
      password: "Paasword",
      blogs: ['6871717432a15fdf96072468']
    }
    const secondUser = {
      username: "fdsa",
      name: "fdsa fadsaaa",
      password: "Paaaasword",
      blogs: ['687171c732a15fdf96072469']
    }
    await api.post('/api/users')
      .send(firstUser)
      .expect(201)
    await api.post('/api/users')
      .send(secondUser)
      .expect(201)
  })
})

after(async () => {
  await mongoose.connection.close()
})