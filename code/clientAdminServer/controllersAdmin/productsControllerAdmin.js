const db = require('../../models')

const getAllProducts = async (req, res) => {

    let status = {
        getAllProductsStatus: false,
        getAllProductsData: '',
        getAllProductsMessage: ''
    }

    const sql =
        `SELECT
            sp.id_sp,
            sp.anh_sp,
            sp.ten_sp,
            sp.gia_sp,
            km.giam_km,
            ttsp.ten_ttsp
        FROM 
            sanpham as sp,
            khuyenmai as km,
            trangthaisanpham as ttsp
        WHERE
            sp.id_km = km.id_km
            AND sp.id_ttsp = ttsp.id_ttsp
        `

    db.query(sql, (err, result) => {
        if (err) {
            status.getAllProductsMessage = 'Lỗi Hệ Thống (Lỗi: getAllProducts 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllProductsStatus = true
                status.getAllProductsData = result
                res.send(status)
            } else {
                status.getAllProductsStatus = true
                status.getAllProductsData = []
                res.send(status)
            }
        }
    })
}

const getOneProduct = async (req, res) => {
    let status = {
        getOneProductStatus: false,
        getOneProductData: '',
        getOneProductMessage: ''
    }

    let idProduct = req.body.idProduct

    const sql =
        `SELECT
            sp.id_sp,
            sp.anh_sp,
            sp.ten_sp,
            sp.gia_sp,
            sp.so_luong_sp,
            km.giam_km,
            ttsp.ten_ttsp
        FROM 
            sanpham as sp,
            khuyenmai as km,
            trangthaisanpham as ttsp
        WHERE
            sp.id_sp = ?
            AND sp.id_km = km.id_km
            AND sp.id_ttsp = ttsp.id_ttsp
            AND ttsp.id_ttsp = 'C'`

    db.query(sql, idProduct, (err, result) => {
        if (err) {
            status.getOneProductMessage = 'Lỗi Hệ Thống (Lỗi: getOneProduct 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                // get images product
                const sqlImages = 'SELECT anh_asp FROM anhsanpham WHERE id_sp = ?'
                db.query(sqlImages, result[0].id_sp, (errImg, resImg) => {
                    if (errImg) {
                        status.getOneProductMessage = 'Lỗi Hệ Thống (Lỗi: getOneProduct 456)'
                        res.send(status)
                    } else {
                        if (resImg.length > 0) {
                            // insert images into result
                            result[0].anh_asp = {}
                            resImg.map((img, index) => {
                                result[0].anh_asp[index] = img.anh_asp
                            })
                            status.getOneProductStatus = true
                            status.getOneProductData = result[0]
                            res.send(status)
                        } else {
                            status.getOneProductMessage = 'Không Tìm Thấy Sản Phẩm (Lỗi: getOneProduct 789)'
                            res.send(status)
                        }
                    }
                })
            } else {
                status.getOneProductMessage = 'Không Tìm Thấy Sản Phẩm (Lỗi: getOneProduct 901)'
                res.send(status)
            }
        }
    })
}

module.exports = {
    getAllProducts,
    getOneProduct
}