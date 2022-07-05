const SqlString = require("mysql/lib/protocol/SqlString");
const db = require("./db");

const cari = (arrData, nidn) => {
  ketemu = -1;
  indeks = 0;
  while (ketemu == -1 && indeks < arrData.length) {
    if (arrData[indeks].nidn == nidn) {
      ketemu = indeks;
      return indeks;
    }
    indeks++;
  }
  return -1;
};

module.exports = {
  insert: (pelatihanBaru, result) => {
    db.query("INSERT INTO pelatihan SET?", pelatihanBaru, (err, res) => {
      if (err) {
        console.log("error:", err);
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...pelatihanBaru });
    });
  },
  getPelatihan(result) {
    let query = "SELECT * FROM pelatihan";
    db.query(query, (err, res) => {
      if (err) {
        console.log("error:", err);
        return;
      }
      result(null, res);
    });
  },
  getPelatihanByNidn: (nidn, result) => {
    db.query(`SELECT * FROM pelatihan WHERE nidn = ${nidn}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("dosen ditemukan:", res[0]); //opsi
        result(null, res[0]);
        return;
      }
      result({ kind: "tidak ditemukan" }, null);
    });
  },

  update: (nidn, pelatihan, result) => {
    db.query(
      "UPDATE pelatihan SET tahun=?, jenis_pelatihan=?, penyelenggara=?, WHERE nidn=?",
      [pelatihan.tahun,pelatihan.jenis_pelatihan, pelatihan.penyelenggara,  nidn],
      (err, res) => {
        if (err) {
          console.log("error:", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("update pelatihan: ", { nidn: nidn, ...pelatihan });
        result(null, { nidn: nidn, ...pelatihan });
      }
    );
  },

  delete: (nidn, result) => {
    db.query("DELETE FROM peltihan WHERE nidn = ?", nidn, (err, res) => {
      if (err) {
        console.log("error:", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted riwayat with nidn : ", nidn);
      result(null, res);
    });
  },
//   getPelatihanByNidn: (nidn, result) => {
//     console.log(nidn);
//     try {
//       db.query(
//         `SELECT identitas.nidn, identitas.nama,pelatihan.jenis_pelatihan,riwayat_pendidikan.prodi,riwayat_pendidikan.perguruan_tinggi FROM identitas,pelatihan,riwayat_pendidikan
//                              WHERE identitas.nidn=${nidn} AND pelatihan.nidn=${nidn} AND pelatihan.nidn=riwayat_pendidikan.nidn;  `,
//         (err, res) => {
//           result(null, res);
//         }
//       );
//     } catch (error) {
//       result(error, null);
//     }
//   },
};
