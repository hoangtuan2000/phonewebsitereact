const db = require('../../models')

const getIdCartUser = async (req, res, next) => {
    let status = {
        getIdCartStatus: false,
        getIdCartMessage: '',
        getIdCartValue: '',
    }
    // check login
    if (req.session.user) {
        const idUser = req.session.user[0].id_kh
        const sqlGetIdCart = 'SELECT * FROM `giohang` WHERE id_kh = ?'
        db.query(sqlGetIdCart, idUser, (errIdCart, resIdCart) => {
            if (errIdCart) {
                status.getIdCartMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: getIdCartUser 123)'
                req.getIdCartUser = status
                next()

            } else {
                // get id cart success
                if (resIdCart[0]) {
                    status.getIdCartStatus = true
                    status.getIdCartValue = resIdCart[0].id_gh
                    req.getIdCartUser = status
                    next()

                } else {
                    status.getIdCartMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: getIdCartUser 456)'
                    req.getIdCartUser = status
                    next()
                }
            }
        })

    } else {
        status.getIdCartMessage = 'Bạn Đã Hết Phiên Đăng Nhập, Vui Lòng Đăng Nhập Lại'
        req.getIdCartUser = status
        next()
    }
}

const addProductToCart = async (req, res) => {
    let status = {
        addCartStatus: false,
        addCartMessage: ''
    }

    let idProduct = req.body.idProduct

    // check login
    if (req.session.user) {
        //get id cart through middleware getIdCartUser function
        const getIdCart = req.getIdCartUser
        if (getIdCart.getIdCartStatus) {
            const idCart = getIdCart.getIdCartValue
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
            status.addCartMessage = getIdCart.getIdCartMessage
            res.send(status)
        }

    } else {
        status.addCartMessage = 'Bạn Đã Hết Phiên Đăng Nhập, Vui Lòng Đăng Nhập Lại'
        res.send(status)
    }
}




module.exports = {
    addProductToCart,
    getIdCartUser,
    // checkProductExistInCart
}

// let status = {
//     addCartStatus: false,
//     addCartMessage: ''
// }

// let idProduct = req.body.idProduct

// // check login
// if (req.session.user) {
//     // get ID Cart in database
//     const idUser = req.session.user[0].id_kh
//     const sqlGetIdCart = 'SELECT * FROM `giohang` WHERE id_kh = ?'
//     db.query(sqlGetIdCart, idUser, (errIdCart, resIdCart) => {
//         if (errIdCart) {
//             status.addCartMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: addCart 123)'
//             res.send(status)

//         } else {
//             if (resIdCart[0]) {
//                 const idCart = resIdCart[0].id_gh
//                 // Check the product already exists in the cart
//                 const sqlProductExistInCart = 'SELECT * FROM `chitietgiohang` WHERE id_sp = ? AND id_gh = ?'
//                 db.query(sqlProductExistInCart, [idProduct, idCart], (errExist, resExist) => {
//                     if (errExist) {
//                         status.addCartMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: addCart 456)'
//                         res.send(status)

//                     } else {
//                         // The product already exists in the cart
//                         if (Object.entries(resExist).length !== 0) {
//                             status.addCartMessage = 'Sản Phẩm Đã Có Trong Giỏ Hàng'
//                             status.addCartStatus = true
//                             res.send(status)

//                         } else {
//                             // The product does not exist in the cart => add product to cart
//                             const sqlAddProductCart = 'INSERT INTO `chitietgiohang`(`id_sp`, `id_gh`, `so_luong`) VALUES (?, ?, ?)'
//                             db.query(sqlAddProductCart, [idProduct, idCart, 1], (errAdd, resultAdd) => {
//                                 if (errAdd) {
//                                     status.addCartMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: addCart 789)'
//                                     res.send(status)

//                                 } else {
//                                     // insert success
//                                     if (resultAdd.affectedRows > 0) {
//                                         status.addCartMessage = 'Sản Phẩm Đã Thêm Vào Giỏ Hàng'
//                                         status.addCartStatus = true
//                                         res.send(status)

//                                     } else {
//                                         status.addCartMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: addCart 901)'
//                                         res.send(status)
//                                     }
//                                 }
//                             })
//                         }
//                     }
//                 })

//             } else {
//                 status.addCartMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: addCart 012)'
//                 res.send(status)
//             }
//         }
//     })

// } else {
//     status.addCartMessage = 'Bạn Đã Hết Phiên Đăng Nhập, Vui Lòng Đăng Nhập Lại'
//     res.send(status)
// }