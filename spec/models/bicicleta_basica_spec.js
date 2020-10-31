var Bicicleta = require('../../models/bicicleta2');


beforeEach(() => {
 Bicicleta.allBicis = [];
});

describe('Bicicletas.allBicis', () =>{
    it('Lista Vacia', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicletas.add', () => {
    it('Agregamos una sola bicicleta', ()=>{
        expect(Bicicleta.allBicis.length).toBe(0);

        var bici = new Bicicleta(1,'celeste','rural', [-32.183868, -64.119901]);
        Bicicleta.add(bici);
        expect(Bicicleta.allBicis.length).toBe(1);
        console.log('....................');
        console.log('Bicicletas.add');
        console.log(Bicicleta.allBicis);
    });
});

describe('Bicicleta.findById', ()=>{
    it('Busca el id 1 de las bicicletas', ()=>{
        expect(Bicicleta.allBicis.length).toBe(0);
        var bici = new Bicicleta(1,'celeste','rural', [-32.183868, -64.119901]);
        var bici2 = new Bicicleta(2,'amarillo','competencia', [-32.183868, -64.119901]);
        Bicicleta.add(bici);
        Bicicleta.add(bici2);
        var targetBici= Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe('celeste');
        expect(targetBici.modelo).toBe('rural');
        console.log('....................');
        console.log('Bicicletas.findById');
        console.log(Bicicleta.findById(1));
        console.log('');
        console.log('Pruebas Finalizadas');
    });
});
