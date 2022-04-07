const db = require('../models')

const getAllSmartphones = async (req, res) => {
    const sqlSelect =
        `SELECT sp.id_sp, sp.ten_sp, sp.anh_sp, sp.gia_sp, km.giam_km
        FROM sanpham as sp, khuyenmai as km, dienthoai as dt
        WHERE sp.id_km = km.id_km AND sp.id_sp = dt.id_sp AND sp.so_luong_sp > 0`
    db.query(sqlSelect, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
}

const getPromotionalSmartphones = async (req, res) => {
    const sql =
        `SELECT 
            sp.id_sp,
            sp.ten_sp,
            sp.anh_sp,
            sp.gia_sp,
            km.giam_km
        FROM 
            sanpham as sp,
            khuyenmai as km,
            dienthoai as dt
        WHERE 
            sp.id_km = km.id_km 
            AND sp.id_sp = dt.id_sp 
            AND sp.so_luong_sp > 0 
            AND km.giam_km > 0
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

const getHighPriceSmartphones = async (req, res) => {
    const sql =
        `SELECT
            sp.id_sp,
            sp.ten_sp,
            sp.gia_sp,
            sp.anh_sp,
            km.giam_km
        FROM 
            sanpham as sp,
            dienthoai as dt,
            khuyenmai as km
        WHERE 
            sp.id_sp = dt.id_sp 
            AND sp.so_luong_sp > 0 
            AND sp.id_km = km.id_km
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
    getAllSmartphones,
    getPromotionalSmartphones,
    getHighPriceSmartphones
}