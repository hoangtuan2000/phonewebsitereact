const db = require('../../models')

// ****************** mua => giỏ hàng ******************
const orderProductInCart = async (req, res) => {
    let status = {
        orderProductInCartStatus: false,
        orderProductInCartMessage: '',
        orderProductInCartIdOrder: ''
    }

    let receiver = req.body.receiver
    let phoneNumber = req.body.phoneNumber
    let address = req.body.address
    let note = req.body.note

    if (req.session.user) {
        const idUser = req.session.user[0].id_kh
        const sqlOrder =
            `INSERT INTO donhang(nguoi_nhan, so_dien_thoai, dia_chi_giao, ghi_chu, id_kh) VALUES (?, ?, ?, ?, ?)`
        db.query(
            sqlOrder,
            [receiver, phoneNumber, address, note, idUser],
            (err, result) => {
                if (err) {
                    status.orderProductInCartMessage =
                        `Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: orderProductInCart 123)`
                    res.send(status)
                } else {
                    if (result.affectedRows > 0) {
                        const idOrder = result.insertId
                        // lấy thông tin sản phẩm
                        const sqlSelectProductInCart =
                            `SELECT
                                sp.id_sp,
                                sp.gia_sp,
                                gh.id_gh,
                                ctgh.so_luong,
                                km.giam_km
                            FROM 
                                khachhang as kh,
                                giohang as gh,
                                chitietgiohang as ctgh,
                                sanpham as sp,
                                khuyenmai as km
                            WHERE 
                                kh.id_kh = ?
                                AND kh.id_kh = gh.id_kh
                                AND ctgh.id_gh = gh.id_gh
                                AND ctgh.id_sp = sp.id_sp
                                AND sp.id_km = km.id_km`
                        db.query(
                            sqlSelectProductInCart,
                            idUser,
                            (errProductCart, resProductCart) => {
                                if (errProductCart) {
                                    status.orderProductInCartMessage =
                                        `Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: orderProductInCart 456)`
                                    res.send(status)
                                } else {
                                    const idCart = resProductCart[0].id_gh
                                    // gộp nhiều object sản phẩm trong giỏ hàng thành mảng con của mảng products => để insert vào chi tiết giỏ hàng
                                    let products = []
                                    for (let i in resProductCart) {
                                        let array = []
                                        array.push(idOrder)
                                        array.push(resProductCart[i].id_sp)
                                        array.push(resProductCart[i].gia_sp)
                                        array.push(resProductCart[i].so_luong)
                                        array.push(resProductCart[i].giam_km)
                                        products.push(array)
                                    }
                                    // thêm sản phẩm vào chi tiết đơn hàng
                                    const sqlOrderDetail =
                                        'INSERT INTO `chitietdonhang`(`id_dh`, `id_sp`, `gia`, `so_luong`, `khuyen_mai`) VALUES ?'
                                    db.query(
                                        sqlOrderDetail,
                                        [products],
                                        (errOrderDetail, resOrderDetail) => {
                                            if (errOrderDetail) {
                                                status.orderProductInCartMessage =
                                                    `Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: orderProductInCart 789)`
                                                res.send(status)
                                            } else {
                                                if (resOrderDetail.affectedRows > 0) {
                                                    // update number product in sanpham table
                                                    for (let i = 0; i < resProductCart.length; i++) {
                                                        const sqlUpdateProduct =
                                                            `UPDATE sanpham SET so_luong_sp = so_luong_sp - ?  WHERE id_sp = ?`
                                                        db.query(
                                                            sqlUpdateProduct,
                                                            [resProductCart[i].so_luong, resProductCart[i].id_sp],
                                                            (errUpdateProduct, resUpdateProduct) => {
                                                                if (errUpdateProduct) {
                                                                    console.log(errUpdateProduct);
                                                                }
                                                            })
                                                    }

                                                    // delete products in cart
                                                    const sqlDeleteCart = `DELETE FROM chitietgiohang WHERE id_gh = ?`
                                                    db.query(sqlDeleteCart, idCart, (errDeleteCart, resDetailCart) => {
                                                        if (errDeleteCart) {
                                                            status.orderProductInCartMessage =
                                                                `Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: orderProductInCart 012)`
                                                            res.send(status)
                                                        } else {
                                                            if (resDetailCart.affectedRows > 0) {
                                                                status.orderProductInCartStatus = true
                                                                status.orderProductInCartMessage = 'Click để xem chi tiết đơn hàng'
                                                                status.orderProductInCartIdOrder = idOrder
                                                                res.send(status)
                                                            } else {
                                                                status.orderProductInCartMessage =
                                                                    `Lỗi Hệ Thống (Liên  Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: orderProductInCart 012)`
                                                                res.send(status)
                                                            }
                                                        }
                                                    })
                                                } else {
                                                    status.orderProductInCartMessage =
                                                        `Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: orderProductInCart 013)`
                                                    res.send(status)
                                                }
                                            }
                                        })
                                }
                            })

                    } else {
                        status.orderProductInCartMessage =
                            `Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: orderProductInCart 014)`
                        res.send(status)
                    }
                }
            })
    } else {
        status.orderProductInCartMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: orderProductInCart 015)'
        res.send(status)
    }
}


// ****************** mua => nút mua ******************
// hiển thị thông tin sản phẩm nếu mua bằng nút mua
const getProductInfoOrder = async (req, res) => {
    let idProduct = req.body.idProduct
    const sql =
        `SELECT
        sp.id_sp,
        sp.ten_sp,
        sp.anh_sp,
        sp.gia_sp,
        km.giam_km
    FROM 
        sanpham as sp,
        khuyenmai as km
    WHERE 
        sp.id_sp = ?
        AND sp.id_km = km.id_km`
    db.query(sql, idProduct, (err, result) => {
        if (err) {
            console.log('getProductInfoOrder', err);
        } else {
            // thêm cột số lượng mặc định là 1 để hiển thị trong table cho khách hàng xem lúc đặt hàng
            result[0].so_luong = 1
            res.send(result)
        }
    })
}

// thay đổi số lượng sản phẩm mua => kiểm tra số lượng sản phấm có trong kho
const changeNumberProductOrder = async (req, res) => {
    let status = {
        changeNumberProductOrderStatus: false,
        changeNumberProductOrderMessage: '',
    }

    let idProductOrder = req.body.idProductOrder
    let numberProductOrder = req.body.numberProductOrder

    const sql = 'SELECT so_luong_sp FROM sanpham WHERE id_sp = ?'
    db.query(sql, idProductOrder, (err, result) => {
        if (err) {
            status.changeNumberProductOrderMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: changeNumberProductOrder 123)'
            res.send(status)
        } else {
            if (numberProductOrder > result[0].so_luong_sp) {
                status.changeNumberProductOrderMessage = `Cửa hàng chỉ còn ${result[0].so_luong_sp} sản phẩm`
                res.send(status)
            } else {
                status.changeNumberProductOrderStatus = true
                res.send(status)
            }
        }
    })
}

// ****************** mua => nút mua ******************
const orderProduct = async (req, res) => {
    let status = {
        orderProductStatus: false,
        orderProductMessage: '',
        orderProductIdOrder: ''
    }

    let receiver = req.body.receiver
    let phoneNumber = req.body.phoneNumber
    let address = req.body.address
    let note = req.body.note
    let idProductOrder = req.body.idProductOrder
    let numberProductOrder = req.body.numberProductOrder

    if (req.session.user) {
        const idUser = req.session.user[0].id_kh
        // create order
        const sqlOrder =
            `INSERT INTO donhang(nguoi_nhan, so_dien_thoai, dia_chi_giao, ghi_chu, id_kh) VALUES (?, ?, ?, ?, ?)`
        db.query(sqlOrder, [receiver, phoneNumber, address, note, idUser], (errOrder, resOrder) => {
            if (errOrder) {
                status.orderProductMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: orderProduct 123)'
                res.send(status)
            } else {
                if (resOrder.affectedRows > 0) {
                    const idOrder = resOrder.insertId
                    //select info product
                    const sqlProductInfo =
                        `SELECT sp.id_sp, sp.gia_sp, km.giam_km 
                            FROM sanpham as sp, khuyenmai as km 
                            WHERE sp.id_sp = ? AND sp.id_km = km.id_km`
                    db.query(sqlProductInfo, idProductOrder, (errProductInfo, resProductInfo) => {
                        if (errProductInfo) {
                            status.orderProductMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: orderProduct 456)'
                            res.send(status)
                        } else {
                            if (resProductInfo.length > 0) {
                                // insert product chitietgiohang table
                                const sqlOrderDetail =
                                    'INSERT INTO `chitietdonhang`(`id_dh`, `id_sp`, `gia`, `so_luong`, `khuyen_mai`) VALUES (?, ?, ?, ?, ?)'
                                db.query(
                                    sqlOrderDetail,
                                    [
                                        idOrder,
                                        idProductOrder,
                                        resProductInfo[0].gia_sp,
                                        numberProductOrder,
                                        resProductInfo[0].giam_km
                                    ],
                                    (errOrderDetail, resOrderDetail) => {
                                        if (errOrderDetail) {
                                            status.orderProductMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: orderProduct 789)'
                                            res.send(status)
                                        } else {
                                            if (resOrderDetail.affectedRows > 0) {
                                                // update number product of sanpham table
                                                const sqlUpdateProduct =
                                                    `UPDATE sanpham SET so_luong_sp = so_luong_sp - ?  WHERE id_sp = ?`
                                                db.query(
                                                    sqlUpdateProduct,
                                                    [numberProductOrder, idProductOrder],
                                                    (errUpdateProduct, resUpdateProduct) => {
                                                        if (errUpdateProduct) {
                                                            status.orderProductMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: orderProduct 901)'
                                                            res.send(status)
                                                        } else {
                                                            if (resUpdateProduct.changedRows > 0) {
                                                                status.orderProductStatus = true
                                                                status.orderProductMessage = 'Click để xem chi tiết đơn hàng'
                                                                status.orderProductIdOrder = idOrder
                                                                res.send(status)
                                                            } else {
                                                                status.orderProductMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: orderProduct 012)'
                                                                res.send(status)
                                                            }
                                                        }
                                                    }
                                                )
                                            } else {
                                                status.orderProductMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: orderProduct 013)'
                                                res.send(status)
                                            }
                                        }
                                    }
                                )
                            } else {
                                status.orderProductMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: orderProduct 014)'
                                res.send(status)
                            }
                        }
                    })

                } else {
                    status.orderProductMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: orderProduct 015)'
                    res.send(status)
                }
            }
        })

    } else {
        status.orderProductMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: orderProduct 016)'
        res.send(status)
    }
}

// *******************************************
const getOrderInfo = async (req, res) => {

    let status = {
        getOrderInfoStatus: false,
        getOrderInfoData: '',
        getOrderInfoMessage: ''
    }

    let idOrder = req.body.idOrder

    const sql =
        `SELECT 
            dh.id_dh,
            dh.nguoi_nhan,
            dh.so_dien_thoai,
            CONVERT(dh.ngay_dat, char) as ngay_dat,
            dh.dia_chi_giao,
            dh.ghi_chu,
            ttdh.id_ttdh,
            ttdh.ten_ttdh
        FROM 
            donhang as dh,
            trangthaidonhang as ttdh
        WHERE
            dh.id_dh = ?
            AND dh.id_ttdh = ttdh.id_ttdh`

    db.query(sql, idOrder, (err, result) => {
        if (err) {
            status.getOrderInfoMessage = 'Lỗi Hệ Thống (Lỗi: getOrderInfo 123)'
            res.send(status)
        } else {
            if (result.length > 0) {

                // get product info
                const sqlProduct =
                    `SELECT 
                        sp.id_sp,
                        sp.ten_sp,
                        sp.anh_sp,
                        ctdh.gia,
                        ctdh.so_luong,
                        ctdh.khuyen_mai
                    FROM 
                        chitietdonhang as ctdh,
                        sanpham as sp
                    WHERE 
                        id_dh = ?
                        AND ctdh.id_sp = sp.id_sp`
                db.query(sqlProduct, idOrder, (errProduct, resProduct) => {
                    if (errProduct) {
                        status.getOrderInfoMessage = 'Lỗi Hệ Thống (Lỗi: getOrderInfo 456)'
                        res.send(status)

                    } else {
                        if (resProduct.length > 0) {
                            status.getOrderInfoStatus = true
                            status.getOrderInfoData = result[0]
                            status.getOrderInfoData.products = resProduct
                            res.send(status)

                        } else {
                            status.getOrderInfoMessage = 'Lỗi Hệ Thống (Lỗi: getOrderInfo 789)'
                            res.send(status)
                        }
                    }
                })

            } else {
                status.getOrderInfoMessage = 'Lỗi Hệ Thống (Lỗi: getOrderInfo 901)'
                res.send(status)
            }
        }
    })
}

const getAllOrderAccount = async (req, res) => {

    let status = {
        getAllOrderAccountStatus: false,
        getAllOrderAccountData: '',
        getAllOrderAccountMessage: ''
    }

    if(req.session.user){
        let idAccount = req.session.user[0].id_kh

        const sql =
            `SELECT 
                dh.id_dh,
                dh.nguoi_nhan,
                CONVERT(dh.ngay_dat, char) as ngay_dat,
                ttdh.ten_ttdh,
                ROUND(SUM((ctdh.gia - (ctdh.gia*ctdh.khuyen_mai/100))*ctdh.so_luong)) as tong_tien
            FROM 
                donhang as dh,
                chitietdonhang as ctdh,
                trangthaidonhang as ttdh
            WHERE
                dh.id_kh = ?
                AND dh.id_dh = ctdh.id_dh
                AND dh.id_ttdh = ttdh.id_ttdh
            GROUP BY dh.id_dh
            ORDER BY dh.ngay_dat DESC`
    
        db.query(sql, idAccount, (err, result) => {
            if (err) {
                status.getAllOrderAccountMessage = 'Lỗi Hệ Thống (Lỗi: getAllOrderAccount 123)'
                res.send(status)
            } else {
                if (result.length > 0) {
                    console.log(result.length);
                    status.getAllOrderAccountStatus = true
                    status.getAllOrderAccountData = result
                    res.send(status)
    
                } else {
                    status.getAllOrderAccountMessage = 'Lỗi Hệ Thống (Lỗi: getAllOrderAccount 901)'
                    res.send(status)
                }
            }
        })
    }
}

module.exports = {
    orderProductInCart,
    getProductInfoOrder,
    orderProduct,
    changeNumberProductOrder,
    getOrderInfo,
    getAllOrderAccount
}
