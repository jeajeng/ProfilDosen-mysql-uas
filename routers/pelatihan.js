const express = require("express");
const routerPelatihan = express.Router()
const controllerPelatihan = require('../controllers/pelatihan')


// squential search


routerPelatihan.route('/pelatihan')
    .get(controllerPelatihan.getPelatihan )

    .post( controllerPelatihan.insert)
                
routerPelatihan.route('/pelatihan')
    .get( (req,res)=>{
        res.send(pelatihan)
    })

    .post( (req,res)=>{
        res.send('Data Pelatihan dosen Sukses Tersimpan')
    })

routerPelatihan.route('/pelatihan/:nidn')
    .put( controllerPelatihan.update)

    // session delete 
    .delete(controllerPelatihan.delete)
    .get(controllerPelatihan.getPelatihanByNidn)

// routerRiwayat.route('/riwayat/jenis_pelatihan/:nidn')
//     .get(controllerIdentitas.getPelatihanByNidn)

// routerIdentitas.get('/identitas/:nama/:email', (req,res)=>{
//     const nama = req.params.nama
//     const email = req.params.email
//     res.send('Dosen dengan nama : ' + nama + 'email :' + email)
// })
    module.exports=routerPelatihan