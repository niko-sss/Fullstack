/* eslint-disable @stylistic/js/semi */
/* eslint-disable @stylistic/js/quotes */
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");

morgan.token("body", (request) => JSON.stringify(request.body));
const format =
  ":method :url :status :res[content-length] - :response-time ms :body";
const app = express();
app.use(express.static("dist"));
app.use(express.json());
app.use(morgan(format));

const errorHandler = (error, req, res, next) => {
  if (error.message === "CastError") {
    return res.status(400).send({ error: "id malformed" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

const generateId = () => {
  const randomID = Math.floor(Math.random() * 100000000000);
  return String(randomID);
};

app.get("/info", (req, res, next) => {
  const date = new Date();
  Person.find({})
    .then((persons) => {
      res.send(
        `<p>Phonebook has info for ${persons.length} people<p/><p>${date}<p/>`
      );
    })
    .catch((error) => next(error));
  app.use(morgan("tiny"));
});

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => next(error));
  app.use(morgan("tiny"));
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).json({ error: "Person not found" });
      }
    })
    .catch((error) => next(error));
  app.use(morgan("tiny"));
});

app.post("/api/persons", (request, response, next) => {
  const { name, number } = request.body;
  if (!name || !number) {
    return response.status(400).json({ error: "name or number missing" });
  }
  Person.findOne({ name }).then((personInDb) => {
    if (personInDb) {
      return response.status(400).json({ error: "name must be unique" });
    }
    const person = new Person({
      name: name,
      number: number,
      id: generateId(),
    });
    return person
      .save()
      .then((savedPerson) => {
        response.json(savedPerson);
      })
      .catch((error) => next(error));
  });
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end();
      }
      person.name = name;
      person.number = number;
      return person.save().then((updatedPerson) => {
        response.json(updatedPerson);
      });
    })
    .catch((error) => next(error));
  app.use(morgan("tiny"));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
  app.use(morgan("tiny"));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  app.use(morgan("tiny"));
});

app.use(errorHandler);
