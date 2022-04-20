const db = require('../../models')

const getAllHeadphones = async (req, res) => {
    const sqlSelect =
        `SELECT sp.id_sp, sp.ten_sp, sp.anh_sp, sp.gia_sp, km.giam_km
        FROM sanpham as sp, khuyenmai as km, tainghe as tn
        WHERE sp.id_km = km.id_km AND sp.id_sp = tn.id_sp AND sp.so_luong_sp > 0 AND sp.id_ttsp = 'CH'`
    db.query(sqlSelect, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
}

const getPromotionalHeadphones = async (req, res) => {
    const sql =
        `SELECT sp.id_sp, sp.ten_sp, sp.anh_sp, sp.gia_sp, km.giam_km
        FROM sanpham as sp, khuyenmai as km, tainghe as tn
        WHERE sp.id_km = km.id_km AND sp.id_sp = tn.id_sp AND sp.so_luong_sp > 0 AND km.giam_km > 0 AND sp.id_ttsp = 'CH'
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

const getHighPriceHeadphones = async (req, res) => {
    const sql =
        `SELECT
            sp.id_sp,
            sp.ten_sp,
            sp.gia_sp,
            sp.anh_sp,
            km.giam_km
        FROM 
            sanpham as sp,
            tainghe as tn,
            khuyenmai as km
        WHERE 
            sp.id_sp = tn.id_sp 
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
    getAllHeadphones,
    getPromotionalHeadphones,
    getHighPriceHeadphones
}