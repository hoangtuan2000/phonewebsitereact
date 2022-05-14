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
            lsp.ten_lsp,
            sp.anh_sp,
            sp.ten_sp,
            sp.gia_sp,
            km.giam_km,
            ttsp.ten_ttsp
        FROM 
            sanpham as sp,
            khuyenmai as km,
            trangthaisanpham as ttsp,
            loaisanpham as lsp
        WHERE
            sp.id_km = km.id_km
            AND sp.id_ttsp = ttsp.id_ttsp
            AND sp.id_lsp = lsp.id_lsp
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

const getAllSmartphones = async (req, res) => {

    let status = {
        getAllSmartphonesStatus: false,
        getAllSmartphonesData: '',
        getAllSmartphonesMessage: ''
    }

    const sql =
        `SELECT
            sp.id_sp,
            lsp.ten_lsp,
            sp.anh_sp,
            sp.ten_sp,
            sp.gia_sp,
            km.giam_km,
            ttsp.ten_ttsp
        FROM 
            sanpham as sp,
            khuyenmai as km,
            trangthaisanpham as ttsp,
            loaisanpham as lsp
        WHERE
            sp.id_km = km.id_km
            AND sp.id_ttsp = ttsp.id_ttsp
            AND sp.id_lsp = 'DT'
            AND sp.id_lsp = lsp.id_lsp
        `

    db.query(sql, (err, result) => {
        if (err) {
            status.getAllSmartphonesMessage = 'Lỗi Hệ Thống (Lỗi: getAllSmartphones 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllSmartphonesStatus = true
                status.getAllSmartphonesData = result
                res.send(status)
            } else {
                status.getAllSmartphonesStatus = true
                status.getAllSmartphonesData = []
                res.send(status)
            }
        }
    })
}

const getAllHeadphones = async (req, res) => {

    let status = {
        getAllHeadphonesStatus: false,
        getAllHeadphonesData: '',
        getAllHeadphonesMessage: ''
    }

    const sql =
        `SELECT
            sp.id_sp,
            lsp.ten_lsp,
            sp.anh_sp,
            sp.ten_sp,
            sp.gia_sp,
            km.giam_km,
            ttsp.ten_ttsp
        FROM 
            sanpham as sp,
            khuyenmai as km,
            trangthaisanpham as ttsp,
            loaisanpham as lsp
        WHERE
            sp.id_km = km.id_km
            AND sp.id_ttsp = ttsp.id_ttsp
            AND sp.id_lsp = 'TN'
            AND sp.id_lsp = lsp.id_lsp
        `

    db.query(sql, (err, result) => {
        if (err) {
            status.getAllHeadphonesMessage = 'Lỗi Hệ Thống (Lỗi: getAllHeadphones 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllHeadphonesStatus = true
                status.getAllHeadphonesData = result
                res.send(status)
            } else {
                status.getAllHeadphonesStatus = true
                status.getAllHeadphonesData = []
                res.send(status)
            }
        }
    })
}

const getAllPhonecases = async (req, res) => {

    let status = {
        getAllPhonecasesStatus: false,
        getAllPhonecasesData: '',
        getAllPhonecasesMessage: ''
    }

    const sql =
        `SELECT
            sp.id_sp,
            lsp.ten_lsp,
            sp.anh_sp,
            sp.ten_sp,
            sp.gia_sp,
            km.giam_km,
            ttsp.ten_ttsp
        FROM 
            sanpham as sp,
            khuyenmai as km,
            trangthaisanpham as ttsp,
            loaisanpham as lsp
        WHERE
            sp.id_km = km.id_km
            AND sp.id_ttsp = ttsp.id_ttsp
            AND sp.id_lsp = 'OL'
            AND sp.id_lsp = lsp.id_lsp
        `

    db.query(sql, (err, result) => {
        if (err) {
            status.getAllPhonecasesMessage = 'Lỗi Hệ Thống (Lỗi: getAllPhonecases 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllPhonecasesStatus = true
                status.getAllPhonecasesData = result
                res.send(status)
            } else {
                status.getAllPhonecasesStatus = true
                status.getAllPhonecasesData = []
                res.send(status)
            }
        }
    })
}

const getBasicProductInfo = async (req, res) => {
    let status = {
        getBasicProductInfoStatus: false,
        getBasicProductInfoData: '',
        getBasicProductInfoMessage: ''
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
            AND sp.id_ttsp = ttsp.id_ttsp`

    db.query(sql, idProduct, (err, result) => {
        if (err) {
            status.getBasicProductInfoMessage = 'Lỗi Hệ Thống (Lỗi: getBasicProductInfo 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                // get images product
                const sqlImages = 'SELECT anh_asp FROM anhsanpham WHERE id_sp = ?'
                db.query(sqlImages, result[0].id_sp, (errImg, resImg) => {
                    if (errImg) {
                        status.getBasicProductInfoMessage = 'Lỗi Hệ Thống (Lỗi: getBasicProductInfo 456)'
                        res.send(status)
                    } else {
                        if (resImg.length > 0) {
                            // insert images into result
                            result[0].anh_asp = []
                            resImg.map((img, index) => {
                                result[0].anh_asp[index] = img.anh_asp
                            })
                            status.getBasicProductInfoStatus = true
                            status.getBasicProductInfoData = result[0]
                            res.send(status)
                        } else {
                            status.getBasicProductInfoMessage = 'Không Tìm Thấy Sản Phẩm (Lỗi: getBasicProductInfo 789)'
                            res.send(status)
                        }
                    }
                })
            } else {
                status.getBasicProductInfoMessage = 'Không Tìm Thấy Sản Phẩm (Lỗi: getBasicProductInfo 901)'
                res.send(status)
            }
        }
    })
}

// const getDetailProductInfoOld = async (req, res) => {
//     let status = {
//         getDetailProductInfotStatus: false,
//         getDetailProductInfotData: '',
//         getDetailProductInfotMessage: ''
//     }

//     let idProduct = req.body.idProduct

//     const sql =
//         `SELECT
//             sp.id_sp,
//             sp.id_lsp,
//             sp.ten_sp,
//             sp.gia_sp,
//             sp.so_luong_sp,
//             sp.anh_sp,
//             sp.gioi_thieu_sp,
//             sp.ngay_tao,
//             xx.ten_xx,
//             km.giam_km,
//             th.ten_th,
//             ttsp.ten_ttsp
//         FROM 
//             sanpham as sp,
//             xuatxu as xx,
//             khuyenmai as km, 
//             trangthaisanpham as ttsp,
//             thuonghieu as th
//         WHERE 
//             sp.id_sp = ?
//             AND sp.id_xx = xx.id_xx
//             AND sp.id_km = km.id_km
//             AND sp.id_ttsp = ttsp.id_ttsp
//             AND sp.id_th = th.id_th
//         `        

//     db.query(sql, idProduct, (err, result) => {
//         if (err) {
//             console.log(err);
//             status.getDetailProductInfotMessage = 'Lỗi Hệ Thống (Lỗi: getDetailProductInfo 123)'
//             res.send(status)
//         } else {
//             if (result.length > 0) {
//                 const productType = result[0].id_lsp
//                 let sqlConfigProduct = ''
//                 switch (productType) {
//                     case 'DT':
//                         sqlConfigProduct =
//                             `SELECT 
//                                 bn.dung_luong_bn,
//                                 ram.dung_luong_ram,
//                                 hdh.ten_hdh,
//                                 tk.kieu_tk,
//                                 chip.ten_chip,
//                                 mh.kich_thuoc_mh
//                             FROM 
//                                 dienthoai as dt,
//                                 bonho as bn,
//                                 ram as ram,
//                                 hedieuhanh as hdh,
//                                 thietke as tk,
//                                 chip as chip,
//                                 manhinh as mh
//                             WHERE 
//                                 dt.id_sp = ?
//                                 AND dt.id_bn = bn.id_bn
//                                 AND dt.id_ram = ram.id_ram
//                                 AND dt.id_hdh = hdh.id_hdh
//                                 AND dt.id_tk = tk.id_tk
//                                 AND dt.id_chip = chip.id_chip
//                                 AND dt.id_mh = mh.id_mh`
//                         break
//                     case 'TN':
//                         sqlConfigProduct =
//                             `SELECT 
//                                 lkn.ten_lkn
//                             FROM
//                                 tainghe as tn,
//                                 loaiketnoi as lkn
//                             WHERE 
//                                 tn.id_sp = ?
//                                 AND tn.id_lkn = lkn.id_lkn`
//                         break
//                     case 'OL':
//                         sqlConfigProduct =
//                             `SELECT 
//                                 cl.ten_cl
//                             FROM
//                                 oplung as ol,
//                                 chatlieu as cl
//                             WHERE 
//                                 ol.id_sp = ?
//                                 AND ol.id_cl = cl.id_cl`
//                         break
//                 }

//                 db.query(sqlConfigProduct, idProduct, (errConfigProduct, resConfigProduct) => {
//                     if (errConfigProduct) {
//                         status.getDetailProductInfotMessage = 'Lỗi Hệ Thống (Lỗi: getDetailProductInfo 456)'
//                         res.send(status)
//                     } else {
//                         if (resConfigProduct.length > 0) {
//                             status.getDetailProductInfotStatus = true
//                             status.getDetailProductInfotData = result[0]
//                             status.getDetailProductInfotData.configInfo = resConfigProduct[0]
//                             res.send(status)
//                         } else {
//                             status.getDetailProductInfotMessage = 'Không Tìm Thấy Sản Phẩm (Lỗi: getDetailProductInfo 789)'
//                             res.send(status)
//                         }
//                     }
//                 })

//             } else {
//                 status.getDetailProductInfotMessage = 'Không Tìm Thấy Sản Phẩm (Lỗi: getDetailProductInfo 901)'
//                 res.send(status)
//             }
//         }
//     })
// }

const getDetailProductInfo = async (req, res) => {
    let status = {
        getDetailProductInfotStatus: false,
        getDetailProductInfotData: '',
        getDetailProductInfotMessage: ''
    }

    let idProduct = req.body.idProduct

    const sql =
        `SELECT
            sp.id_sp, sp.id_lsp, sp.ten_sp, sp.gia_sp, sp.so_luong_sp, 
            sp.anh_sp, sp.gioi_thieu_sp, sp.id_xx, sp.id_km, sp.id_th, sp.id_ttsp
        FROM 
            sanpham as sp
        WHERE 
            sp.id_sp = ?
        `

    db.query(sql, idProduct, (err, result) => {
        if (err) {
            console.log(err);
            status.getDetailProductInfotMessage = 'Lỗi Hệ Thống (Lỗi: getDetailProductInfo 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                const productType = result[0].id_lsp
                let sqlConfigProduct = ''
                switch (productType) {
                    case 'DT':
                        sqlConfigProduct =
                            `SELECT 
                                dt.id_bn,
                                dt.id_ram,
                                dt.id_hdh,
                                dt.id_tk,
                                dt.id_chip,
                                dt.id_mh
                            FROM 
                                dienthoai as dt
                            WHERE 
                                dt.id_sp = ?`
                        break
                    case 'TN':
                        sqlConfigProduct =
                            `SELECT 
                                tn.id_lkn
                            FROM
                                tainghe as tn
                            WHERE 
                                tn.id_sp = ?`
                        break
                    case 'OL':
                        sqlConfigProduct =
                            `SELECT 
                                ol.id_cl
                            FROM
                                oplung as ol
                            WHERE 
                                ol.id_sp = ?`
                        break
                }

                db.query(sqlConfigProduct, idProduct, (errConfigProduct, resConfigProduct) => {
                    if (errConfigProduct) {
                        status.getDetailProductInfotMessage = 'Lỗi Hệ Thống (Lỗi: getDetailProductInfo 456)'
                        res.send(status)

                    } else {
                        if (resConfigProduct.length > 0) {
                            const sqlImages = 'SELECT * FROM `anhsanpham` WHERE id_sp = ?'
                            db.query(sqlImages, idProduct, (errImages, resImages) => {
                                if (errImages) {
                                    status.getDetailProductInfotMessage = 'Lỗi Hệ Thống (Lỗi: getDetailProductInfo 789)'
                                    res.send(status)
                                } else {
                                    if (resImages.length > 0) {
                                        status.getDetailProductInfotStatus = true
                                        status.getDetailProductInfotData = result[0]
                                        status.getDetailProductInfotData.configInfo = resConfigProduct[0]
                                        status.getDetailProductInfotData.images = []
                                        for (const key in resImages) {
                                            status.getDetailProductInfotData.images.push(resImages[key].anh_asp)
                                        }
                                        res.send(status)

                                    } else {
                                        status.getDetailProductInfotMessage = 'Không Tìm Thấy Sản Phẩm (Lỗi: getDetailProductInfo 901)'
                                        res.send(status)
                                    }

                                }
                            })

                        } else {
                            status.getDetailProductInfotMessage = 'Không Tìm Thấy Sản Phẩm (Lỗi: getDetailProductInfo 012)'
                            res.send(status)
                        }
                    }
                })

            } else {
                status.getDetailProductInfotMessage = 'Không Tìm Thấy Sản Phẩm (Lỗi: getDetailProductInfo 013)'
                res.send(status)
            }
        }
    })
}

module.exports = {
    getAllProducts,
    getBasicProductInfo,
    getDetailProductInfo,
    getAllSmartphones,
    getAllHeadphones,
    getAllPhonecases
}