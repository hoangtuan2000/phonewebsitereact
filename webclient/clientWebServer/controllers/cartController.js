const db = require('../../models')

const addProductToCart = async (req, res) => {
    let status = {
        addCartStatus: false,
        addCartMessage: ''
    }

    let idProduct = req.body.idProduct
    if (req.session.user) {
        const idUser = req.session.user[0].id_kh
        const sqlGetIdCart = 'SELECT * FROM `giohang` WHERE id_kh = ?'
        db.query(sqlGetIdCart, idUser, (err, result) => {
            if (err) { 
                status.addCartMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: addCart 123)'
                res.send(status)
            }else{

            }
        })
    }
}

module.exports = {
    addProductToCart,
}