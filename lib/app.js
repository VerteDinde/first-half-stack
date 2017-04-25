const express = require('express');
const app = express();
const morgan = require('morgan');
const ObjectId = require('mongodb').ObjectId;

const connect = require('./helpers/connect');
const notFound = require('./helpers/notFound');
const bodyParser = require('./helpers/bodyParser');

app.use(morgan('dev'));


app.post('/puppies', (req, res) => {
  const poms = connect.db.collection('poms');
  bodyParser(req)
    .then(body => JSON.parse(body))
    .then(puppy => poms.insert(puppy))
    .then(puppy => {
      res.send(JSON.stringify(puppy.ops[0]));
      //console.log 'puppy' if you don't remember why .ops[0]
    });
});

app.get('/puppies', (req, res) => {
  const poms = connect.db.collection('poms');

  if (req.params.id) {
    poms.findOne({ _id: ObjectId(req.params.id) })
      .then(pom => {
        if (pom === null) {
          res.send(notFound(req, res));
        }
        const serialPom = JSON.stringify(pom);
        res.send(serialPom);
      });
  }

  poms.find()
    .toArray()
    .then(poms => {
      if (!poms) {
        res.send(notFound(req, res));
      }
      const serialPoms = JSON.stringify(poms);
      res.send(serialPoms);
    });

});

module.exports = app;