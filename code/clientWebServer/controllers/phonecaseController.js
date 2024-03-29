const db = require('../../models')

const getAllPhonecases = async (req, res) => {
    const sqlSelect =
        `SELECT sp.id_sp, sp.ten_sp, sp.anh_sp, sp.gia_sp, km.giam_km
        FROM sanpham as sp, khuyenmai as km, oplung as ol
        WHERE sp.id_km = km.id_km AND sp.id_sp = ol.id_sp AND sp.so_luong_sp > 0 AND sp.id_ttsp = 'CH'`
    db.query(sqlSelect, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
}

const getPromotionalPhonecases = async (req, res) => {
    const sql =
        `SELECT sp.id_sp, sp.ten_sp, sp.anh_sp, sp.gia_sp, km.giam_km
        FROM sanpham as sp, khuyenmai as km, oplung as ol
        WHERE sp.id_km = km.id_km AND sp.id_sp = ol.id_sp AND sp.so_luong_sp > 0 AND km.giam_km > 0 AND sp.id_ttsp = 'CH'
        ORDER BY km.giam_km DESC
        LIMIT 18`
    db.query(sql, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
}

const getHighPricePhonecases = async (req, res) => {
    const sql =
        `SELECT
            sp.id_sp,
            sp.ten_sp,
            sp.gia_sp,
            sp.anh_sp,
            km.giam_km
        FROM 
            sanpham as sp,
            oplung as ol,
            khuyenmai as km
        WHERE 
            sp.id_sp = ol.id_sp 
            AND sp.so_luong_sp > 0 
            AND sp.id_km = km.id_km
            AND sp.id_ttsp = 'CH'
        ORDER BY sp.gia_sp DESC
        LIMIT 12`
    db.query(sql, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
}

module.exports = {
    getAllPhonecases,
    getPromotionalPhonecases,
    getHighPricePhonecases
}