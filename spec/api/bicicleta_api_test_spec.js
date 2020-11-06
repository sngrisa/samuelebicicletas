var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');
var mongoose = require('mongoose');

var base_url = "http://localhost:3000/api/bicicletas";


describe('Bicicletas API', () => {
  beforeAll((done) => { mongoose.connection.close(done) });
    beforeAll(function(done) {
      mongoose.connection.close().then(() => {
        var mongoDB = 'mongodb://localhost/bicicletas';
        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
  
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
          console.log('We are connected to test database');
          done();
      });
    });
});

afterEach(function(done) {
    Bicicleta.deleteMany({}, function(err, success){
      if(err) console.log(err);
      done();
    });
  });

  describe('GET Bicicletas /', () => {
    it('Status 200', (done) => {
        request.get(base_url, function(err, resp, body){
            var result = JSON.parse(body);
            expect(resp.statusCode).toBe(200);
            done();
        });
    });
})

describe('POST BICICLETAS /create', () => {
    it('STATUS 200', (done) => {
      var headers = {'content-type' : 'application/json'};
      var bici = '{"code": 1 , "color": "azul", "modelo":"BMX"}';
      request.post({
        headers: headers,
        url: base_url + '/create',
        body: bici,
        },
        function(error, response, body) {
        expect(response.statusCode).toBe(200);
        console.log((body).bici);
        console.log(bici);
        done();
      });
    });
});
});