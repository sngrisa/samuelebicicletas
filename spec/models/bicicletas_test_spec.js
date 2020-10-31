var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');

describe('Testeando Bicicletas', ()=>{

  beforeEach(function(done){
    var mongodb = 'mongodb://localhost/bicicletas';
    mongoose.connect(mongodb, {useNewUrlParser: true,
      useUnifiedTopology: true});

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Error con la conexion con la base de datos'));
    db.once('open', function(){
      console.log('Conexion a la base de datos con exito');
    });
    done();
  });
  afterEach(function(done){
    Bicicleta.deleteMany({}, function(err,sucess){
      if(err){
        console.log(err);
      }
      done();
    }); 
  });

  describe('Bicicleta.createInstance', () =>{
    it('Crea una instancia de bicicleta', ()=>{
      var bici = Bicicleta.createInstance(1, "azul", "bmx", [-34, -54]);

      expect(bici.code).toBe(1);
      expect(bici.color).toBe("azul");
      expect(bici.modelo).toBe("bmx");
      expect(bici.ubicacion[0]).toEqual(-34);
      expect(bici.ubicacion[1]).toEqual(-54);
    });
  });

  describe('Bicicletas.allBicis', () => {
    it('Lista que comienza Vacia',(done) => {
        Bicicleta.allBicis(function(err,bicis){
          expect(bicis.length).toBe(0);
          done();
        });
    });
  });

  describe('Bicicleta.add', () =>{
    it('Agrega una bicicleta a la lista de bicicletas', (done) =>{
      var aBici = new Bicicleta({code: 1, color: "celeste", modelo: "BMX"});
      Bicicleta.add(aBici, function(err,newBici){
        if(err){
          console.log(err);
        }
        Bicicleta.allBicis(function(err,bicis){
          expect(bicis.length).toEqual(1);
          expect(bicis[0].code).toEqual(aBici.code);

          done();
      });
      });

    });
  });

  describe('Bicicleta.findById', () =>{
    it('Busca el id 1 en la lista de bicicletas', (done)=>{
      Bicicleta.allBicis(function(err,bicis){
        expect(bicis.length).toBe(0);

        var bici1= new Bicicleta({code: 1, color: "amarilla", modelo: "BMX"});
         Bicicleta.add(bici1, function(err, newbici){
            if(err){
            console.log(err);
            }
        var bici2= new Bicicleta({code: 2, color: "celeste", modelo: "BMX"});
        Bicicleta.add(bici2, function(err,newbici2){
          if(err){
            console.log(err);
          }
          Bicicleta.findByCode(1, function(error, targetBici){
              expect(targetBici.code).toBe(bici1.code);
              expect(targetBici.color).toBe(bici1.color);
              expect(targetBici.modelo).toBe(bici1.modelo);

              done();
          });
        });
        });
        });
      });
    });
  });