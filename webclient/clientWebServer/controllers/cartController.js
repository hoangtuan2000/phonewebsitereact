const db = require('../../models')

// middleware
const getIdCartUser = async (req, res, next) => {
    let status = {
        getIdCartUserIsLogin: true,
        getIdCartUserStatus: false,
        getIdCartUserMessage: '',
        getIdCartUserValue: '',
    }
    // check login
    if (req.session.user) {
        const idUser = req.session.user[0].id_kh
        const sqlGetIdCart = 'SELECT * FROM `giohang` WHERE id_kh = ?'
        db.query(sqlGetIdCart, idUser, (errIdCart, resIdCart) => {
            if (errIdCart) {
                status.getIdCartUserMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: getIdCartUser 123)'
                req.getIdCartUser = status
                next()

            } else {
                // get id cart success
                if (resIdCart[0]) {
                    status.getIdCartUserStatus = true
                    status.getIdCartUserValue = resIdCart[0].id_gh
                    req.getIdCartUser = status
                    next()

                } else {
                    status.getIdCartUserMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: getIdCartUser 456)'
                    req.getIdCartUser = status
                    next()
                }
            }
        })

    } else {
        status.getIdCartUserIsLogin = false
        status.getIdCartUserMessage = 'Bạn Đã Hết Phiên Đăng Nhập, Vui Lòng Đăng Nhập Lại'
        req.getIdCartUser = status
        next()
    }
}

const addProductCart = async (req, res) => {
    let status = {
        addCartStatus: false,
        addCartMessage: ''
    }

    let idProduct = req.body.idProduct

    // check login
    if (req.session.user) {
        //get id cart through middleware getIdCartUser function
        const getIdCart = req.getIdCartUser
        if (getIdCart.getIdCartUserStatus) {
            const idCart = getIdCart.getIdCartUserValue
            // Check if the product exists in the cart 
            const sqlProductExistInCart = 'SELECT * FROM `chitietgiohang` WHERE id_sp = ? AND id_gh = ?'
            db.query(sqlProductExistInCart, [idProduct, idCart], (errExist, resExist) => {
                if (errExist) {
                    status.addCartMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: addCart 123)'
                    res.send(status)

                } else {
                    // The product already exists in the cart
                    if (Object.entries(resExist).length !== 0) {
                        status.addCartMessage = 'Sản Phẩm Đã Có Trong Giỏ Hàng'
                        status.addCartStatus = true
                        res.send(status)

                    } else {
                        // The product does not exist in the cart => add product to cart
                        const sqlAddProductCart = 'INSERT INTO `chitietgiohang`(`id_sp`, `id_gh`, `so_luong`) VALUES (?, ?, ?)'
                        db.query(sqlAddProductCart, [idProduct, idCart, 1], (errAdd, resultAdd) => {
                            if (errAdd) {
                                status.addCartMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: addCart 456)'
                                res.send(status)

                            } else {
                                // insert success
                                if (resultAdd.affectedRows > 0) {
                                    status.addCartMessage = 'Sản Phẩm Đã Thêm Vào Giỏ Hàng'
                                    status.addCartStatus = true
                                    res.send(status)

                                } else {
                                    status.addCartMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: addCart 789)'
                                    res.send(status)
                                }
                            }
                        })
                    }
                }
            })

        } else {
            status.addCartMessage = getIdCart.getIdCartUserMessage
            res.send(status)
        }

    } else {
        status.addCartMessage = 'Bạn Đã Hết Phiên Đăng Nhập, Vui Lòng Đăng Nhập Lại'
        res.send(status)
    }
}

const getAllProductsCart = async (req, res) => {
    let status = {
        getAllProductsCartIsLogin: true,
        getAllProductsCartStatus: false,
        getAllProductsCartMessage: '',
        getAllProductsCartData: {},
    }
    // middleware getIdCartUser
    const getIdCart = req.getIdCartUser
    if (getIdCart.getIdCartUserStatus) {
        const idCart = getIdCart.getIdCartUserValue
        const sql =
            `SELECT 
                    sp.id_sp,
                    sp.anh_sp, 
                    sp.ten_sp, 
                    sp.gia_sp,
                    km.giam_km,
                    ctgh.so_luong
                FROM 
                    chitietgiohang as ctgh, 
                    sanpham as sp,
                    khuyenmai as km
                WHERE 
                    sp.id_sp = ctgh.id_sp 
                    AND ctgh.id_gh = ?
                    AND sp.id_km = km.id_km`

        db.query(sql, idCart, (err, result) => {
            if (err) {
                status.getAllProductsCartMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: getAllProductsCart 123)'
                res.send(status)
            } else {
                // not empty
                if (result.length > 0) {
                    status.getAllProductsCartStatus = true
                    status.getAllProductsCartData = result
                    res.send(status)

                } else {
                    status.getAllProductsCartMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: getAllProductsCart 456)'
                    res.send(status)
                }
            }
        })

    } else {
        // logged in but got an error
        if (getIdCart.getIdCartUserIsLogin) {
            status.getAllProductsCartMessage = getIdCart.getIdCartUserMessage
            res.send(status)

        } else {
            // not login
            status.getAllProductsCartIsLogin = getIdCart.getIdCartUserIsLogin
            status.getAllProductsCartMessage = getIdCart.getIdCartUserMessage
            res.send(status)
        }
    }
}

const deleteProductCart = async (req, res) => {
    let status = {
        deleteProductCartStatus: false,
        deleteProductCartMessage: '',
    }

    let idProduct = req.body.idProduct

    // middleware getIdCartUser
    const getIdCart = req.getIdCartUser
    if (getIdCart.getIdCartUserStatus) {
        const idCart = getIdCart.getIdCartUserValue
        const sql = 'DELETE FROM `chitietgiohang` WHERE id_sp = ? AND id_gh = ?'
        db.query(sql, [idProduct, idCart], (err, result) => {
            if (err) {
                status.deleteProductCartMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: deleteProductCart 123)'
                res.send(status)

            } else {
                if (result.affectedRows > 0) {
                    status.deleteProductCartStatus = true
                    status.deleteProductCartMessage = 'Xóa Sản Phẩm Thành Công'
                    res.send(status)

                } else {
                    status.deleteProductCartMessage = 'Xóa Sản Phẩm Thất Bại'
                    res.send(status)
                }
            }
        })

    } else {
        status.deleteProductCartMessage = getIdCart.getIdCartUserMessage
        res.send(status)
    }
}

const changeNumberProductCart = async (req, res) => {
    let status = {
        changeNumberProductCartStatus: false,
        changeNumberProductCartMessage: '',
    }

    let idProduct = req.body.idProduct
    let numberProduct = req.body.numberProduct

    // middleware getIdCartUser
    const getIdCart = req.getIdCartUser
    if (getIdCart.getIdCartUserStatus) {
        const idCart = getIdCart.getIdCartUserValue
        //check number product of exist
        const sqlCheck = 'SELECT so_luong_sp FROM `sanpham` WHERE id_sp = ?'
        db.query(sqlCheck, idProduct, (errCheck, resCheck) => {
            if (errCheck) {
                status.changeNumberProductCartMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: changeNumberProductCart 123)'
                res.send(status)
            } else {
                if (resCheck.length > 0) {
                    if (numberProduct > resCheck[0].so_luong_sp) {
                        status.changeNumberProductCartMessage = `Cửa Hàng Chỉ còn ${resCheck[0].so_luong_sp} Sản Phẩm`
                        res.send(status)
                    } else {
                        const sqlUpdate = 'UPDATE `chitietgiohang` SET `so_luong` = ? WHERE id_sp = ? AND id_gh = ?'
                        db.query(sqlUpdate, [numberProduct, idProduct, idCart], (errUpdate, resultUpdate) => {
                            if (errUpdate) {
                                status.changeNumberProductCartMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: changeNumberProductCart 456)'
                                res.send(status)

                            } else {
                                if (resultUpdate.changedRows > 0) {
                                    status.changeNumberProductCartStatus = true
                                    status.changeNumberProductCartMessage = 'Cập Nhật Số Lượng Sản Phẩm Thành Công'
                                    res.send(status)

                                } else {
                                    status.changeNumberProductCartMessage = 'Cập Nhật Số Lượng Sản Phẩm Thất Bại'
                                    res.send(status)
                                }
                            }
                        })
                    }
                } else {
                    status.changeNumberProductCartMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: changeNumberProductCart 012)'
                    res.send(status)
                }
            }
        })

    } else {
        status.changeNumberProductCartMessage = getIdCart.getIdCartUserMessage
        res.send(status)
    }
}

module.exports = {
    addProductCart,
    getIdCartUser,
    getAllProductsCart,
    deleteProductCart,
    changeNumberProductCart
}
