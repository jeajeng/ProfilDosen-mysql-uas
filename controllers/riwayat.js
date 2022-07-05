const riwayat = require("../models/riwayat");
const modelRiwayat = require("../models/riwayat");

module.exports = {
  getRiwayat: (req, res) => {
    riwayat.getRiwayat((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || " onok error",
        });
      } else res.send(data);
    });
  },
  insert: (req, res) => {
    // ambildata request dari frontend
    if (!req.body) {
      res.status(400).send({
        message: "data tidak boleh ksong",
      });
    }
    modelRiwayat.insert(req.body, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "terjadi error",
        });
      } else {
        res.send(data);
      }
    });
  },
  getRiwayatByNidn:   (req,res)=>
  {
      // MENAMPILKAN DATA
  riwayat.getRiwayatByNidn(req.params.nidn,(err, data)=>{
      if(err){
          if(err.kind === "tidak ditemukan"){
              res.status(404).send({
                  message:`dosen  dengan nidn: ${req.params.nidn}tidak ditemukan`
              });

          }else{
              res.status(500).send({
                  message:"error"+ req.params.nidn
              })
          }
      }else res.send(data)
  })
  },

  update: (req, res) => {
    // UPDATE
    if (!req.body) {
      res.status(400).send({
        message: "data tidak boleh kosng",
      });
    }
    riwayat.update(req.params.nidn, req.body, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `not found riwayat with nidn ${req.params.nidn}`,
          });
        } else {
          res.status(500).send({
            message: "error updating tutorial with nidn " + req.params.nidn,
          });
        }
      } else res.send(data);
    });
  },

  delete: (req, res) => {
    riwayat.delete(req.params.nidn, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `not found riwayat with nidn ${req.params.nidn}`,
          });
        } else {
          res.status(500).send({
            message: "could not delete riwayat with nidn " + req.params.nidn,
          });
        }
      } else res.send({ message: `berhasil dihapus` });
    });
  },
//   getPelatihanByNidn: (req, res) => {
//     console.log(req.params.nidn + "controllers");
//     identitas.getPelatihanByNidn(req.params.nim, (err, data) => {
//       if (err) {
//         if (err.kind === "not found") {
//           res.status(404).send({
//             message: `not found dosen with nidn: ${req.params.nidn}`,
//           });
//         } else {
//           res.status(500).send({
//             pelatihan: [],
//           });
//         }
//       } else res.send(data);
//     });
//   },
};
