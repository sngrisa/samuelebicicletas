var Bicicleta = require('../../models/bicicleta2');
var request = require('request');
var server = require('../../bin/www');

describe('Bicicleta API', ()=>{
    describe('GET BICICLETAS', ()=>{
        it('Status 200', () =>{
            expect(Bicicleta.allBicis.length).toBe(2);
            var aBici = new Bicicleta({id: 1, color:"verde", modelo:"urbana", ubicacion: [-34, -55]});
            Bicicleta.add(aBici);

            request.get('http://localhost:3000/api/bicicletas2'), function(error, responsibe, body){
                expect(response.statusCode).toBe(200);
            };
    });
    });

    describe('POST BICICLETAS /create', () =>{
        it('Status 200', (done) =>{
            var headers = {'content-type': 'application/json'};
            var aBici= '{"id": 100 , "color":"rojo", "modelo":"pista", "lat":-34, "lng":-55 }';
            request.post({
               headers: headers,
               url:  'http://localhost:3000/api/bicicletas2/create',
               body: aBici
            }),
                function(error,response,body) {
                expect(response.statusCode).toBe(200)
                expect(Bicicleta.findById(1).color).toBe("verde");
                expect(Bicicleta.findById(1).modelo).toBe("pista");
            };
            done();
        });
    });
});