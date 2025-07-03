
const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.static('dist'))

morgan.token('body', (request) => JSON.stringify(request.body))
const format = ':method :url :status :res[content-length] - :response-time ms :body'
app.use(morgan(format))

let persons = {
  "persons": [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": "1"
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": "2"
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": "3"
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": "4"
    }
  ]
}
app.use(express.json())
const generateId = () => {
  const randomID = Math.floor(Math.random()*100000000000)
  return String(randomID)
}

app.get('/info', (req, res) => {
  const date = new Date()
  const msg = `<p>Phonebook has info for ${persons.persons.length} people<p/><p>${date}<p/>`
  app.use(morgan('tiny'))
  res.send(msg)
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return (
      response.status(400).json({error: 'name or number missing'})
    )
  } else if (persons.persons.map(person => person.name).includes(body.name)) {
    return (
      response.status(400).json({error: 'name must be unique'})
    )
  } else {
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
    
    persons.persons = persons.persons.concat(person)
    
    response.json(person)
  }
  // if (!body.name) {
    //   return response.status(400).json({ 
      //     error: 'content missing' 
      //   })
      // }
      
    })
    
    app.get('/', (request, response) => {
      response.send('<h1>Helloa world!</h1>')
      app.use(morgan('tiny'))
    })
    
    app.get('/api/persons', (request, response) => {
      response.json(persons.persons)
      app.use(morgan('tiny'))
    })
    
    app.get('/api/persons/:id', (request, response) => {
      const id = request.params.id
      const person = persons.persons.find(person => person.id === id)
      
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
      app.use(morgan('tiny'))
    })
    
    app.delete('/api/persons/:id', (request, response) => {
      const id = request.params.id
      persons.persons = persons.persons.filter(person => person.id !== id)
      
      response.status(204).end()
      app.use(morgan('tiny'))
    })
    
    const PORT = 3001
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
