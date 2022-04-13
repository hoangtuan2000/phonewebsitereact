const db = require('../../models')
const bcrypt = require('bcrypt')

const {
    validateUserFullname,
    validateUserEmail,
    validateUserPassword,
    validateUserPhoneNumber,
    validateUserAddress,
    validateUserWard
} = require('../functionServer/validateInfoUserFunctionServer')

var authLogin = {
    isLogin: false,
    message: {
        emailFail: '',
        passwordFail: '',
        otherFail: ''
    },
    user: {}
}

const login = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    // trước khi truy vấn reset lại giá trị nếu còn lưu trước đó
    authLogin.isLogin = false
    authLogin.message.emailFail = ''
    authLogin.message.passwordFail = ''
    authLogin.message.otherFail = ''
    authLogin.user = {}

    if (email && password) {
        const sqlSelectEmail = 'SELECT * FROM khachhang WHERE email_kh = ?'
        db.query(sqlSelectEmail, email, (err, result) => {
            if (err) {
                authLogin.message.otherFail = 'Có Lỗi Xảy Ra Bên Phía Server'
                res.send(authLogin)
            } else {
                if (result.length > 0) {
                    bcrypt.compare(password, result[0].password_kh, function (errCompare, resultCompare) {
                        if (errCompare) {
                            authLogin.message.otherFail = 'Lỗi Xác Thực Server'
                            res.send(authLogin)
                        } else {
                            if (resultCompare) {
                                req.session.loggedin = true;
                                req.session.user = result;
                                authLogin.isLogin = true
                                delete result[0].password_kh //xóa cột password của khách hàng trước khi gửi cho client
                                authLogin.user = result[0]
                                res.send(authLogin)
                            } else {
                                authLogin.message.passwordFail = 'Vui Lòng Kiểm Tra Lại Mật Khẩu'
                                res.send(authLogin)
                            }
                        }
                    });
                } else {
                    authLogin.message.emailFail = 'Vui Lòng Kiểm Tra Lại Email'
                    res.send(authLogin)
                }
            }
        });
    } else {
        authLogin.message.otherFail = 'Vui Lòng Điền Đầy Đủ Thông Tin'
        res.send(authLogin)
    }
}

const logout = async (req, res) => {
    req.session.destroy()
    authLogin.isLogin = false
    authLogin.user = {}
    res.send(authLogin)
}

const getLogin = async (req, res) => {
    console.log(req.session.user);
    if (req.session.user) {
        authLogin.isLogin = true
        authLogin.user = req.session.user[0]
        res.send(authLogin)
    } else {
        authLogin.isLogin = false
        authLogin.user = {}
        res.send(authLogin)
    }
}

const existEmail = async (req, res) => {
    let status = {
        exitEmailStatus: false,
        exitEmailMessage: '',
    }
    let email = req.body.email
    const sql = 'SELECT * FROM `khachhang` WHERE email_kh = ?'
    db.query(sql, email, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            if (result.length > 0) {
                status.exitEmailStatus = true
                status.exitEmailMessage = 'Email đã đăng ký (Vui lòng chọn email khác)'
                res.send(status)
            } else {
                res.send(status)
            }
        }
    })
}

const register = async (req, res) => {
    const saltRounds = 5
    let status = {
        registerStatus: false,
        registerMessage: ''
    }

    let fullnameRegister = req.body.fullnameRegister
    let emailRegister = req.body.emailRegister
    let passwordRegister = req.body.passwordRegister
    let phoneNumberRegister = req.body.phoneNumberRegister
    let addressRegister = req.body.addressRegister
    let wardRegister = req.body.wardRegister

    if (
        validateUserFullname(fullnameRegister) && validateUserEmail(emailRegister) && validateUserPassword(passwordRegister) &&
        validateUserPhoneNumber(phoneNumberRegister) && validateUserAddress(addressRegister) && validateUserWard(wardRegister)
    ) {
        // hast password
        bcrypt.hash(passwordRegister, saltRounds, (err, hash) => {
            if (err) {
                status.registerMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: Register 123)'
                res.send(status)

            } else {
                // create user
                const sql = 'INSERT INTO `khachhang`(`ten_kh`, `sdt_kh`, `email_kh`, `password_kh`) VALUES (?, ?, ?, ?)'
                db.query(sql, [fullnameRegister, phoneNumberRegister, emailRegister, hash], (errUser, resultUser) => {
                    if (errUser) {
                        console.log(errUser);
                        status.registerMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: Register 456)'
                        res.send(status)
                    }
                    else {
                        // create address of user
                        const idUser = resultUser.insertId
                        const sqlAddress = 'INSERT INTO `diachi`(`dia_chi`, `mac_dinh`, `id_xp`, `id_kh`) VALUES (?, ?, ?, ?)'
                        db.query(sqlAddress, [addressRegister, 1, wardRegister, idUser], (errAddress, resultAddress) => {
                            if (errAddress) {
                                status.registerMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: Register 789)'
                                res.send(status)
                            } else {
                                // create cart of user
                                const sqlCart = 'INSERT INTO `giohang`(`id_kh`) VALUES (?)'
                                db.query(sqlCart, idUser, (errCart, resultCart) => {
                                    if (errCart) {
                                        status.registerMessage = 'Lỗi Hệ Thống (Liên Hệ Chúng Tôi Để Được Hỗ Trợ - Lỗi: Register 902)'
                                        res.send(status)
                                    } else {
                                        status.registerStatus = true
                                        res.send(status)
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })

    } else {
        status.registerMessage = 'Lỗi Thông Tin Khách Hàng'
        res.send(status)
    }
}


module.exports = {
    login,
    logout,
    getLogin,
    register,
    existEmail,
}