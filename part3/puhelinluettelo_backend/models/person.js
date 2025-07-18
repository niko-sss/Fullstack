
const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(() => {
    console.log('Connected to database')
  })
  .catch((error) => {
    console.log('Error connecting to database', error.message)
  })


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: function(value) {
        return /\d{2,3}-\d{6,}/.test(value)
      },
      message: person => `${person.value} is not a valid phonenumber!`
    },
    required: true
  },
})

personSchema.set('toJSON', {
  transform: (document, returnObj) => {
    returnObj.id = returnObj._id.toString()
    delete returnObj._id
    delete returnObj.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
