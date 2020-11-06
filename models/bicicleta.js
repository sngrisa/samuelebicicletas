var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number], 
        index: {
            type: '2dsphere', 
            sparse: true 
        }
    }
});

bicicletaSchema.statics.createInstance = function (code, color, modelo, ubicacion) {
    return new this({
        code: code,
        color: color,
        modelo: modelo,
        ubicacion: ubicacion
    });
};

bicicletaSchema.methods.toString = function () { 
    return 'id: ' + this.code + ' | color: ' + this.color; };
bicicletaSchema.statics.allBicis = function (cb) { 
    return this.find({}, cb); };
bicicletaSchema.statics.add = function (oBici, cb) { 
    this.create(oBici, cb); };
bicicletaSchema.statics.findByCode = function (ncode, cb) { 
    return this.findOne({ code: ncode }, cb); };
bicicletaSchema.statics.removeByCode = function (ncode, cb) {
     return this.deleteOne({ code: ncode }, cb); };

module.exports = mongoose.model('Bicicleta', bicicletaSchema);