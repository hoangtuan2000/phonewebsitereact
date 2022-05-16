const db = require('../../models')

const getAllProducts = async (req, res) => {
    const sqlSelect =
        `SELECT sp.id_sp, sp.ten_sp, sp.anh_sp, sp.gia_sp, km.giam_km
        FROM sanpham as sp, khuyenmai as km
        WHERE sp.id_km = km.id_km AND sp.so_luong_sp > 0 AND sp.id_ttsp = 'CH'`
    db.query(sqlSelect, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
}

const getPromotionalProducts = async (req, res) => {
    const sql =
        `SELECT sp.id_sp, sp.ten_sp, sp.anh_sp, sp.gia_sp, km.giam_km
            FROM sanpham as sp, khuyenmai as km 
            WHERE sp.id_km = km.id_km AND sp.so_luong_sp > 0 AND km.giam_km > 0 AND sp.id_ttsp = 'CH'
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

const getOneProduct = async (req, res) => {
    const id = req.params.idProduct
    const sqlSelect =
        `SELECT
                sp.id_sp, sp.id_lsp, sp.ten_sp, sp.gia_sp,
                sp.so_luong_sp, sp.anh_sp, sp.gioi_thieu_sp,
                xx.ten_xx, km.giam_km, ttsp.ten_ttsp, th.ten_th, ttsp.id_ttsp
            FROM 
                sanpham as sp, xuatxu as xx, khuyenmai as km, trangthaisanpham as ttsp, thuonghieu as th
            WHERE 
                sp.id_sp = ? AND sp.id_xx = xx.id_xx AND sp.id_km = km.id_km AND sp.id_ttsp = ttsp.id_ttsp AND sp.id_th = th.id_th`
    db.query(sqlSelect, id, (err, product) => {
        if (err) {
            res.status(200).send(err)
        } else {
            const id_lsp = product[0].id_lsp
            switch (id_lsp) {
                case 'DT':
                    const sqlSmartphone =
                        `SELECT 
                            bn.dung_luong_bn, ram.dung_luong_ram, 
                            hdh.ten_hdh, tk.kieu_tk, chip.ten_chip, mh.kich_thuoc_mh
                        FROM
                            dienthoai AS dt, bonho as bn, ram,
                            hedieuhanh as hdh, thietke as tk, chip, manhinh as mh
                        WHERE
                            dt.id_sp = ? 
                            AND dt.id_bn = bn.id_bn
                            AND dt.id_ram = ram.id_ram
                            AND dt.id_hdh = hdh.id_hdh
                            AND dt.id_tk = tk.id_tk
                            AND dt.id_chip = chip.id_chip
                            AND dt.id_mh = mh.id_mh`
                    db.query(sqlSmartphone, id, (err, smartphone) => {
                        if (err) {
                            res.send(err)
                        } else {
                            // let result = product.map((item, i) => Object.assign(item, smartphone[i]));
                            let result = Object.assign(product[0], smartphone[0]); // Object.assign gộp nhiều đối tượng thành một và ghi đề các thuộc tính trùng nhau
                            res.send(result)
                        }
                    })
                    break;
                case 'TN':
                    const sqlHeadphone =
                        `SELECT 
                            lkn.ten_lkn
                        FROM 
                            tainghe as tn,
                            loaiketnoi as lkn
                        WHERE 
                            tn.id_sp = ?
                            AND tn.id_lkn = lkn.id_lkn`
                    db.query(sqlHeadphone, id, (err, headphone) => {
                        if (err) {
                            res.send(err)
                        } else {
                            let result = Object.assign(product[0], headphone[0]); // Object.assign gộp nhiều đối tượng thành một và ghi đề các thuộc tính trùng nhau
                            res.send(result)
                        }
                    })
                    break;
                default:
                    const sqlPhonecase =
                        `SELECT 
                            cl.ten_cl
                        FROM 
                            oplung as ol,
                            chatlieu as cl
                        WHERE 
                            ol.id_sp = ?
                            AND ol.id_cl = cl.id_cl`
                    db.query(sqlPhonecase, id, (err, phonecase) => {
                        if (err) {
                            res.send(err)
                        } else {
                            let result = Object.assign(product[0], phonecase[0]); // Object.assign gộp nhiều đối tượng thành một và ghi đề các thuộc tính trùng nhau
                            res.send(result)
                        }
                    })
            }
        }
    })
}

const getImagesProduct = async (req, res) => {
    const id = req.params.idProduct
    const sqlSelect = 'SELECT * FROM `anhsanpham` WHERE id_sp = ?'
    db.query(sqlSelect, id, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
}

module.exports = {
    getAllProducts,
    getPromotionalProducts,
    getOneProduct,
    getImagesProduct,
}