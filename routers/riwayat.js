const express = require("express");
const routerRiwayat = express.Router()
const controllerRiwayat = require('../controllers/riwayat')


// squential search


routerRiwayat.route('/riwayat')
    .get(controllerRiwayat.getRiwayat )

    .post( controllerRiwayat.insert)
                
routerRiwayat.route('/riwayat')
    .get( (req,res)=>{
        res.send(riwayat)
    })

    .post( (req,res)=>{
        res.send('Data dosen Sukses Tersimpan')
    })

routerRiwayat.route('/riwayat/:nidn')
    .put( controllerRiwayat.update)

    // session delete 
    .delete(controllerRiwayat.delete)
    .get(controllerRiwayat.getRiwayatByNidn)

// routerRiwayat.route('/riwayat/jenis_pelatihan/:nidn')
//     .get(controllerIdentitas.getPelatihanByNidn)

// routerIdentitas.get('/identitas/:nama/:email', (req,res)=>{
//     const nama = req.params.nama
//     const email = req.params.email
//     res.send('Dosen dengan nama : ' + nama + 'email :' + email)
// })
    module.exports=routerRiwayat