const express = require('express');
const app = express();
const morgan = require('morgan');
const ObjectId = require('mongodb').ObjectId;
require('../lib/connect');


const connect = require('mongoose').connection;
app.use(morgan('dev'));

new Pom

app.post('/puppies', (req, res) => {
  new Pom(req.body).save().then(pom => {
    res.send(pom);
  })
  .catch(err => {
    console.log(err);
    res.status(500).statusMessage('Internal Server Error');
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