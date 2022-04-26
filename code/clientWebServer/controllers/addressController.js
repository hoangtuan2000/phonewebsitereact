const db = require('../../models')

const getAllProvinces = async (req, res) => {
    const sql = 'SELECT * FROM tinhthanhpho'
    db.query(sql, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
}

const getDistrictsProvince = async (req, res) => {
    let idProvince = req.body.idProvince //typeof String => sql not need '?'

    const sql = 'SELECT * FROM quanhuyen WHERE id_ttp = ?'
    db.query(sql, idProvince, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
}

const getWardsDistrict = async (req, res) => {
    let idDistrict = req.body.idDistrict //typeof String => sql not need '?'

    const sql = 'SELECT * FROM xaphuong WHERE id_qh = ?'
    db.query(sql, idDistrict, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
}

const getAddressUser = async (req, res) => {
    let status = {
        getAddressUserStatus: false,
        getAddressUserData: ''
    }
    if (req.session.user) {
        let idUser = req.session.user[0].id_kh
        const sql =
            `SELECT
            dc.id_dc, dc.dia_chi, dc.mac_dinh,
            dc.id_xp, xp.ten_xp, xp.id_qh,
            qh.ten_qh, qh.id_ttp, ttp.ten_ttp
        FROM 
            diachi as dc, xaphuong as xp,
            quanhuyen as qh, tinhthanhpho as ttp
        WHERE 
            dc.id_kh = ? AND dc.id_xp = xp.id_xp
            AND xp.id_qh = qh.id_qh AND qh.id_ttp = ttp.id_ttp`
        db.query(sql, idUser, (err, result) => {
            if (err) {
                res.send(status)
            } else {
                status.getAddressUserStatus = true
                status.getAddressUserData = result
                res.send(status)
            }
        })
    } else {
        res.send(status)
    }
}

module.exports = {
    getAllProvinces,
    getDistrictsProvince,
    getWardsDistrict,
    getAddressUser
}