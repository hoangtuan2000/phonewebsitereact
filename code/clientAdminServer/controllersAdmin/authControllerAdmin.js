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

const loginAdmin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    // trước khi truy vấn reset lại giá trị nếu còn lưu trước đó
    authLogin.isLogin = false
    authLogin.message.emailFail = ''
    authLogin.message.passwordFail = ''
    authLogin.message.otherFail = ''
    authLogin.user = {}

    if (email && password) {
        // check email
        const sqlSelectEmail = 'SELECT * FROM nhanvien WHERE email_nv = ?'
        db.query(sqlSelectEmail, email, (err, result) => {
            if (err) {
                authLogin.message.otherFail = 'Có Lỗi Xảy Ra Bên Phía Server'
                res.send(authLogin)
            } else {
                if (result.length > 0) {
                    if (result[0].id_tthd == 'C') {
                        // check password
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
                        authLogin.message.otherFail = 'Tài Khoản Của Bạn Đã Bị Khóa Từ Nhà Quản Trị'
                        res.send(authLogin)
                    }

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

const logoutAdmin = async (req, res) => {
    req.session.destroy()
    authLogin.isLogin = false
    authLogin.user = {}
    res.send(authLogin)
}

const getLoginAdmin = async (req, res) => {
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

const emailExist = async (req, res, next) => {

    let accountEmail = req.body.accountEmail

    const sql = 'SELECT * FROM `nhanvien` WHERE email_nv = ?'

    db.query(sql, accountEmail, (errCheck, resCheck) => {
        if (errCheck) {
            req.emailExistStatus = true
            req.emailExistMessage = 'Lỗi Hệ Thống (Lỗi: emailExist 123)'
            next()

        } else {
            if (resCheck.length > 0) {
                // email exist
                req.emailExistStatus = true
                req.emailExistMessage = 'Email đã tồn tại. Hãy chọn email khác'
                next()

            } else {
                // email not exist
                req.emailExistStatus = false
                next()
            }

        }
    })
}

const registerAdmin = async (req, res) => {
    let status = {
        registerAdminStatus: false,
        registerAdminMessage: ''
    }

    let {
        accountName, accountPhone, accountAddress, accountEmail,
        accountWard, accountPassword, accountPosition
    } = req.body

    const saltRounds = 5

    // check email not exist
    if (req.emailExistStatus == false) {
        bcrypt.hash(accountPassword, saltRounds, (err, hashPassword) => {
            if (err) {
                status.registerAdminMessage = 'Lỗi Hệ Thống (Lỗi: registerAdmin 123)'
                res.send(status)

            } else {
                // create account
                const sql =
                    `INSERT INTO nhanvien(ten_nv, sdt_nv, dia_chi_nv, email_nv, id_xp, password_nv, id_cv, id_tthd) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
                db.query(sql,
                    [
                        accountName, accountPhone, accountAddress, accountEmail,
                        accountWard, hashPassword, accountPosition, 'C'
                    ],
                    (errAccount, resultAccount) => {
                        if (errAccount) {
                            console.log('registerAdmin', errAccount);
                            status.registerAdminMessage = 'Lỗi Hệ Thống (Lỗi: registerAdmin 456)'
                            res.send(status)
                        }
                        else {
                            if (resultAccount.affectedRows > 0) {
                                status.registerAdminStatus = true
                                status.registerAdminMessage = 'Tạo Tài Khoản Thành Công'
                                res.send(status)

                            } else {
                                status.registerAdminMessage = 'Lỗi Hệ Thống (Lỗi: registerAdmin 789)'
                                res.send(status)
                            }
                        }
                    })
            }
        })

    } else if (req.emailExistStatus == true) {
        // check email exist
        status.registerAdminMessage = req.emailExistMessage
        res.send(status)

    }
}

const emailExistUpdateAccount = async (req, res, next) => {

    let accountEmail = req.body.accountEmail
    let idAccount = req.body.idAccount

    const sql = 'SELECT * FROM `nhanvien` WHERE email_nv = ? AND id_nv != ?'

    db.query(sql, [accountEmail, idAccount], (errCheck, resCheck) => {
        if (errCheck) {
            req.emailExistUpdateAccountStatus = true
            req.emailExistUpdateAccountMessage = 'Lỗi Hệ Thống (Lỗi: emailExistUpdateAccount 123)'
            next()

        } else {
            if (resCheck.length > 0) {
                // email exist
                req.emailExistUpdateAccountStatus = true
                req.emailExistUpdateAccountMessage = 'Email đã tồn tại. Hãy chọn email khác'
                next()

            } else {
                // email not exist
                req.emailExistUpdateAccountStatus = false
                next()
            }

        }
    })
}

const updateAccountAdmin = async (req, res) => {
    let status = {
        updateAccountAdminStatus: false,
        updateAccountAdminMessage: ''
    }

    let {
        idAccount, accountName, accountPhone, accountAddress, accountEmail,
        accountWard, accountPassword, accountPosition, accountActiveStatus
    } = req.body

    const saltRounds = 5

    // check email not exist
    if (req.emailExistUpdateAccountStatus == false) {

        // nếu có đổi mật khẩu
        if (accountPassword != '') {
            bcrypt.hash(accountPassword, saltRounds, (err, hashPassword) => {
                if (err) {
                    status.updateAccountAdminMessage = 'Lỗi Hệ Thống (Lỗi: updateAccountAdmin 123)'
                    res.send(status)

                } else {
                    // update account
                    const sql =
                        `UPDATE 
                            nhanvien 
                        SET 
                            ten_nv= ?, sdt_nv= ?, dia_chi_nv= ?, 
                            email_nv= ?, id_xp= ?, password_nv= ?,
                            id_cv= ?, id_tthd= ? 
                        WHERE id_nv = ?`
                    db.query(sql,
                        [
                            accountName, accountPhone, accountAddress, accountEmail,
                            accountWard, hashPassword, accountPosition, accountActiveStatus,
                            idAccount
                        ],
                        (errAccount, resultAccount) => {
                            if (errAccount) {
                                console.log('updateAccountAdmin', errAccount);
                                status.updateAccountAdminMessage = 'Lỗi Hệ Thống (Lỗi: updateAccountAdmin 456)'
                                res.send(status)
                            }
                            else {
                                if (resultAccount.affectedRows > 0) {
                                    status.updateAccountAdminStatus = true
                                    status.updateAccountAdminMessage = 'Cập Nhật Tài Khoản Thành Công'
                                    res.send(status)

                                } else {
                                    status.updateAccountAdminMessage = 'Lỗi Hệ Thống (Lỗi: updateAccountAdmin 789)'
                                    res.send(status)
                                }
                            }
                        })
                }
            })

        } else {
            // nếu không đổi mật khẩu
            const sql =
                `UPDATE 
                nhanvien 
            SET 
                ten_nv= ?, sdt_nv= ?, dia_chi_nv= ?, 
                email_nv= ?, id_xp= ?,
                id_cv= ?, id_tthd= ? 
            WHERE id_nv = ?`
            db.query(sql,
                [
                    accountName, accountPhone, accountAddress, accountEmail,
                    accountWard, accountPosition, accountActiveStatus,
                    idAccount
                ],
                (errAccount, resultAccount) => {
                    if (errAccount) {
                        console.log('updateAccountAdmin', errAccount);
                        status.updateAccountAdminMessage = 'Lỗi Hệ Thống (Lỗi: updateAccountAdmin 901)'
                        res.send(status)
                    }
                    else {
                        if (resultAccount.affectedRows > 0) {
                            status.updateAccountAdminStatus = true
                            status.updateAccountAdminMessage = 'Cập Nhật Tài Khoản Thành Công'
                            res.send(status)

                        } else {
                            status.updateAccountAdminMessage = 'Lỗi Hệ Thống (Lỗi: updateAccountAdmin 012)'
                            res.send(status)
                        }
                    }
                })
        }

    } else if (req.emailExistUpdateAccountStatus == true) {
        // check email exist
        status.updateAccountAdminMessage = req.emailExistUpdateAccountMessage
        res.send(status)

    }
}



module.exports = {
    loginAdmin,
    getLoginAdmin,
    registerAdmin,
    emailExist,
    emailExistUpdateAccount,
    updateAccountAdmin,
    logoutAdmin
}