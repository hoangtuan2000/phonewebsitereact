const db = require('../../models')

const orderProductInCart = async (req, res) => {
    //resert queryError
    queryError = []

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
                                    const sqlDetailOrder =
                                        'INSERT INTO `chitietdonhang`(`id_dh`, `id_sp`, `gia`, `so_luong`, `khuyen_mai`) VALUES ?'
                                    db.query(
                                        sqlDetailOrder,
                                        [products],
                                        (errDetailOrder, resDetailOrder) => {
                                            if (errDetailOrder) {
                                                status.orderProductInCartMessage =
                                                    `Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: orderProductInCart 789)`
                                                res.send(status)
                                            } else {
                                                if (resDetailOrder.affectedRows > 0) {
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

module.exports = {
    orderProductInCart
}
