const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password, blogs } = request.body
  if (password.length < 3 || username.length < 3) {
    return response.status(400).json({ message: 'Username and password should be over 2 characters long' })
  } else {
    const saltRounds = 10
    const hashedPassword = await bcryptjs.hash(password, saltRounds)
    const user = await new User({
      username,
      name,
      hashedPassword,
      blogs,
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }
})

module.exports = usersRouter
