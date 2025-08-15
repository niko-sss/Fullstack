const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
  
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  if (typeof(blog.likes) != 'number') {
    blog.likes = Number(0)
  }
  if (typeof(blog.title) != 'string') {
    response.status(400).end()
    return
  }
  if (typeof(blog.url) != 'string') {
    response.status(400).end()
    return
  }
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() === decodedToken.id) {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
      if (!deletedBlog) {
        response.status(404).end()
        return
      }
      response.status(204).end()
    } catch (error) {
      response.status(500).end()
    }
  } else {
    response.status(401).json({error: "invalid token"})
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() === decodedToken.id) {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        { $inc: { likes: 1 } },
        { new: true })
      response.status(201).json(updatedBlog)
    } catch (error) {
      response.status(500).end()
    }
  } else {
    response.status(401).json({error: "invalid token"})
  }
})

module.exports = blogsRouter
