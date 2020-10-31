var Bicicleta = require('../models/bicicleta2');

exports.bicicleta_list = function(req,res){
    res.render('bicicletas2/index', {bicis: Bicicleta.allBicis});
}

exports.bicicleta_create_get = function(req,res){
    res.render('bicicletas2/create');
}

exports.bicicleta_create_post =function(req, res){
    var bici= new Bicicleta(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion=[req.body.lat,req.body.lng];
    Bicicleta.add(bici);

    res.redirect('/bicicletas2');
}

exports.bicicleta_update_get = function(req,res){
    var bici = Bicicleta.findById(req.params.id);
    res.render('bicicletas2/update', {bici});
}

exports.bicicleta_update_post= function(req,res){
    var bici= Bicicleta.findById(req.params.id)   
    bici.id=req.body.id;
    bici.color=req.body.color;   
    bici.modelo=req.body.modelo;
    bici.ubicacion=[req.body.lat, req.body.lng];

    res.redirect('/bicicletas2');
}


exports.bicicleta_delete_post= function(req,res){
    Bicicleta.removeById(req.body.id);
    res.redirect('/bicicletas2');
}