const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

/* CONNECT TO DB */
//Connect to the test DB
process.env.MONGODB_URI = 'mongodb://localhost:27017/puppies-test';
//Run the actual connext to DB
require('../lib/connect');
//Get reference to local connection, because we need to drop DB prior to test
const connection = require('mongoose').connection;

/* RUN OUR APP */
const app = require('../lib/app');
//let chai-http (via chai.request); chai doesn't have native request method
const request = chai.request(app);

describe('Puppies DB /', () => {
  //start with clean slate, empty db
  before(() => connection.db.dropDatabase());
  

  function savePom(pom) {
    return request
      .post('/puppies')
      .send(pom);
  }

  const gibbs = {
    name: 'Gibbs',
    color: 'white'
  };

  describe('POST /', () => {

    it('saves a pom', () => {
      return savePom(gibbs)
        .then(res => res.body)
        .then(savedPom => {
          assert.isOk(savedPom._id);
          gibbs._id = savedPom._id;
          assert.deepEqual(savedPom, gibbs);
        });
    });

  });

  describe('GET /', () => {
    it('find poms db', () => {
      connection.db.collection('poms');
      return request
        .get('/puppies')
        .then(res => {
          console.log(res.body);
          return res.body;
        })
        .then(pom => assert.deepEqual(pom, null));
    });

    it('finds a pom by id', () => {
      connection.db.collection('poms');
      return request.get(`/puppies/:${gibbs._id}`)
        .then(res => res.body)
        .then(pom => assert.deepEqual(pom, gibbs));
    });
  });

});