const express = require('express');
const router = express.Router();

//importar modelo bdd (models)
const Alumnos = require('../models/estudiante');

//callbacks de rutas

router.get('/Home', async (req, res) => {

    const listaRegistros = await Alumnos.find();
    console.log('los registros de la base de datos: ' + listaRegistros);
    res.render('index',{
         listaRegistros
    });
});
    router.get('/formulario', (req, res)=>{
res.render('Pag1');
});
router.get('/Pag2', (req, res)=>{
    res.render('Pag2');
    });
    router.get('/Pag3', (req, res)=>{
        res.render('Pag3');
        });
            
router.post('/add',async(req, res)=>{
    console.log(new Alumnos(req.body));
    const objAlumnos = new Alumnos(req.body);
    await objAlumnos.save();
    res.render('Pag1',{
        mensaje:'los datos han sido guardados',});
});

module.exports = router
