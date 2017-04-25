const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pomSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  color: {
    type: String,
    enum: ['red', 'white', 'grey','black', 'rainbow']
  },
  weight: {
    type: Number,
    min: 2
  }
});

const model = mongoose.model('Pom', pomSchema);
model.exports = model;