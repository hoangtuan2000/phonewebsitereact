const db = require('../../models')
const bcrypt = require('bcrypt')

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
        const sqlSelectEmail = 'SELECT * FROM nhanvien WHERE email_nv = ?'
        db.query(sqlSelectEmail, email, (err, result) => {
            if (err) {
                authLogin.message.otherFail = 'Có Lỗi Xảy Ra Bên Phía Server'
                res.send(authLogin)
            } else {
                if (result.length > 0) {
                    bcrypt.compare(password, result[0].password_nv, function (errCompare, resultCompare) {
                        if (errCompare) {
                            authLogin.message.otherFail = 'Lỗi Xác Thực Server'
                            res.send(authLogin)
                        } else {
                            if (resultCompare) {
                                req.session.userAdmin = result;
                                authLogin.isLogin = true
                                delete result[0].password_nv //xóa cột password của khách hàng trước khi gửi cho client
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

const getLogin = async (req, res) => {
    // console.log('user admin: ', req.session.userAdmin);
    if (req.session.userAdmin) {
        res.send(req.session.userAdmin[0])
    //     authLogin.isLogin = true
    //     authLogin.user = req.session.userAdmin[0]
    //     res.send(authLogin)
    } else {
        authLogin.isLogin = false
        authLogin.user = {}
        res.send(authLogin)
    }
}

module.exports = {
    login,
    getLogin
}