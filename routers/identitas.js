const express = require("express");
const routerIdentitas = express.Router()
const controllerIdentitas = require('../controllers/identitas')


// squential search


routerIdentitas.route('/identitas')
    .get(controllerIdentitas.getIdentitas )

    .post( controllerIdentitas.insert)
                
routerIdentitas.route('/identitas')
    .get( (req,res)=>{
        res.send(identitas)
    })

    .post( (req,res)=>{
        res.send('Data dosen Sukses Tersimpan')
    })

routerIdentitas.route('/identitas/:nidn')
    .put( controllerIdentitas.update)

    // session delete 
    .delete(controllerIdentitas.delete)
    .get(controllerIdentitas.getDosenByNidn)

routerIdentitas.route('/identitas/jenis_pelatihan/:nidn')
    .get(controllerIdentitas.getPelatihanByNidn)

routerIdentitas.get('/identitas/:nama/:email', (req,res)=>{
    const nama = req.params.nama
    const email = req.params.email
    res.send('Dosen dengan nama : ' + nama + 'email :' + email)
})
    module.exports=routerIdentitas