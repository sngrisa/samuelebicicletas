var express= require('express');
var router = express.Router();
var bicicletacontroller2 = require('../controllers/bicicleta2');

router.get('/', bicicletacontroller2.bicicleta_list);
router.get('/create', bicicletacontroller2.bicicleta_create_get);
router.post('/create', bicicletacontroller2.bicicleta_create_post);
router.post('/:id/delete', bicicletacontroller2.bicicleta_delete_post);
router.get('/:id/update', bicicletacontroller2.bicicleta_update_get);
router.post('/:id/update', bicicletacontroller2.bicicleta_update_post);

module.exports = router;