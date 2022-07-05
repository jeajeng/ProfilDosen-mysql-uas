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
  insert: (riwayatBaru, result) => {
    db.query("INSERT INTO riwayat_pendidikan SET?", riwayatBaru, (err, res) => {
      if (err) {
        console.log("error:", err);
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...riwayatBaru });
    });
  },
  getRiwayat(result) {
    let query = "SELECT * FROM riwayat_pendidikan";
    db.query(query, (err, res) => {
      if (err) {
        console.log("error:", err);
        return;
      }
      result(null, res);
    });
  },
  getRiwayatByNidn: (nidn, result) => {
    db.query(`SELECT * FROM riwayat_pendidikan WHERE nidn = ${nidn}`, (err, res) => {
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

  update: (nidn, riwayat, result) => {
    db.query(
      "UPDATE riwayat_pendidikan SET thn_lulus=?, progpen=?, perguruan_tinggi=?, prodi=? WHERE nidn=?",
      [riwayat.thn_lulus, riwayat.progpen, riwayat.perguruan_tinggi,riwayat.prodi, nidn],
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
        console.log("update riwayat: ", { nidn: nidn, ...riwayat });
        result(null, { nidn: nidn, ...riwayat });
      }
    );
  },

  delete: (nidn, result) => {
    db.query("DELETE FROM riwayat_pendidikan WHERE nidn = ?", nidn, (err, res) => {
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
