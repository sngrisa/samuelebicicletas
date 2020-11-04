var express=require('express');
var router= express.Router();
var usuarioController=require('../controllers/usuario');

router.get('/registrarse', usuarioController.usuario_regitro_get);
router.post('/registrarse', usuarioController.usuario_registro_post);

module.exports = router;