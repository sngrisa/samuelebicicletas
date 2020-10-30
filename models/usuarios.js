var mongoose = require('mongoose');
var Reserva = require('./reserva');
var Schema = mongoose.Schema;
var Token = require('./token');
const uniqueValidor = require('mongoose-unique-validator');
let crypto = require('crypto');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const validateEmail = function(email){
    const regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return regExp.test(email);
}

var usuarioSchema= new Schema({
    nombre:{
        type: String,
        trim: true,
        required: [true, 'El campo de nombre de usuario es obligatorio'],
    },
     email:{
         type: String,
         trim: true,
         lowercase: true,
         unique: true,
         validate: [
             validateEmail,
             'Por favor ingrese un email valido',
         ],
         required: [true, 'El campo de correo electronico es obligatorio'],
         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/],
     },
     password:{
         type: String,
         trim: true,
         required: [true, 'El campo de contraseñas es obligatorio'],
     },
     passwordResetToken: String,
     passwordResetTokenExpires: Date,
     verificado:{
         type: Boolean,
         deafult: false,
     }
}); 

usuarioSchema.plugin(uniqueValidor, {message: 'El {PATH} ya existe con otro usuario'});

usuarioSchema.pre('save', function(next){
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});

usuarioSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb){
    var reserva = new Rerserva({
        usuario: this._id,
        bicicleta: biciId,
        desde: desde,
        hasta: hasta
    });
    reserva.save(cb);
}

module.exports = mongoose.model('Usuario', usuarioSchema);





