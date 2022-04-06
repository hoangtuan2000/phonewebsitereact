const db = require('../models')

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

    if (email && password) {
        const sqlSelectEmail = 'SELECT * FROM khachhang WHERE email_kh = ?'
        db.query(sqlSelectEmail, email, (err, resultEmail) => {
            if (err) {
                authLogin.message.otherFail = 'Có Lỗi Xảy Ra Bên Phía Server'
                res.send(authLogin)
            } else {
                if (resultEmail.length > 0) {
                    const sqlSelectUser = 'SELECT * FROM khachhang WHERE email_kh = ? AND password_kh = ?'
                    db.query(sqlSelectUser, [email, password], (err, result) => {
                        if (err) {
                            authLogin.message.otherFail = 'Có Lỗi Xảy Ra Bên Phía Server'
                            res.send(authLogin)
                        } else {
                            if (result.length > 0) {
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

const test = async (req, res) => {
    res.redirect('http://localhost:3000/smartphone')
}


module.exports = {
    login,
    logout,
    getLogin,
    test
}