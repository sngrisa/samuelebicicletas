var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var Reserva = require('../../models/reserva');
var Usuario = require('../../models/usuarios');

describe('Testeando Usuarios', function(){

    beforeAll((done) => { mongoose.connection.close(done) });
    beforeEach(function(done){
        var mongodb = 'mongodb://localhost/testdb';
        mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Error al conectarse a la base de datos'));
        db.once('open', function(){
            console.log('Conexion Exitosa con la base de datos');
        });
        done();
    });

    afterEach(function(done){
        Reserva.deleteMany({}, function(err,success){
            if(err){
                console.log(err);
            } 
        });
        Usuario.deleteMany({}, function(err,success){
            if(err){
                console.log(err);
            } 
        });
        Bicicleta.deleteMany({}, function(err,success){
            if(err){
                console.log(err);
            } 
        });
        done();
    });

    describe('Cuando un Usuario tiene una reserva', () =>{
        it('Debe Existir la reserva', (done) => {

            const usuario = new Usuario({
                nombre: 'user',
                email: 'user@test.com',
                password: '432394'
            })
            usuario.save();

            const bicicleta = new Bicicleta({
                code: 1,
                color: "azul",
                modelo: "BMX",
            })
            bicicleta.save();

            var hoy = new Date();
            var mañana = new Date();
            mañana.setDate(hoy.getDate() +1);

            usuario.reservar(bicicleta.id, hoy, mañana, function(error,reserva){
                Reserva.find({}).populate('bicicleta').populate('usuario').exec((err,reservas) => {
                    console.log(reserva[0]);

                    expect(reservas.length).toBe(1);
                    expect(reservas[0].diasDeReserva()).toBe(2);
                    expect(reservas[0].bicicleta.code).toBe(1);
                    expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                    done();

                })
            })
        })
    });

});