const db = require('../../models')
const bcrypt = require('bcrypt')

const getAccountInfo = async (req, res) => {

    let status = {
        getAccountInfoStatus: false,
        getAccountInfoData: '',
        getAccountInfoMessage: ''
    }

    // if login
    if (req.session.user) {
        let idAccount = req.session.user[0].id_kh
        const sql =
            `SELECT 
                ten_kh,
                email_kh,
                sdt_kh 
            FROM 
                khachhang 
            WHERE 
                id_kh = ?`

        db.query(sql, idAccount, (err, result) => {
            if (err) {
                status.getAccountInfoMessage = 'Lỗi Hệ Thống (Lỗi: getAccountInfo 123)'
                res.send(status)
            } else {
                if (result.length > 0) {
                    status.getAccountInfoStatus = true
                    status.getAccountInfoData = result[0]
                    res.send(status)

                } else {
                    status.getAccountInfoMessage = 'Lỗi Hệ Thống (Lỗi: getAccountInfo 456)'
                    res.send(status)
                }
            }
        })

    } else {
        status.getAccountInfoMessage = 'Bạn Chưa Đăng Nhập'
        res.send(status)

    }

}

const existEmailUpdateAccount = async (req, res, next) => {

    let accountEmail = req.body.accountEmail

    const sql = 'SELECT * FROM khachhang WHERE email_kh = ? AND id_kh != ?'

    if (req.session.user) {
        let idAccount = req.session.user[0].id_kh

        db.query(sql, [accountEmail, idAccount], (errEmail, resEmail) => {
            if (errEmail) {
                req.existEmailUpdateAccountStatus = true
                req.existEmailUpdateAccountMessage = 'Lỗi Hệ Thống (Lỗi: existEmailUpdateAccount 123)'
                next()

            } else {
                //email hợp lệ và không trùng
                if (resEmail.length == 0) {
                    req.existEmailUpdateAccountStatus = false
                    next()

                } else {
                    req.existEmailUpdateAccountStatus = true
                    req.existEmailUpdateAccountMessage = 'Email đã đăng ký'
                    next()
                }
            }
        })

    } else {
        req.existEmailUpdateAccountStatus = true
        req.existEmailUpdateAccountMessage = 'Lỗi Chưa Đăng Nhập (Lỗi: existEmailUpdateAccount 456)'
        next()
    }
}

const updateAccountInfo = async (req, res) => {
    let status = {
        updateAccountInfoStatus: false,
        updateAccountInfoMessage: ''
    }

    let {
        accountName, accountEmail, accountPhone
    } = req.body

    // email không trùng
    if (req.existEmailUpdateAccountStatus == false) {
        if (req.session.user) {
            let idAccount = req.session.user[0].id_kh

            const sql =
                `UPDATE khachhang SET ten_kh= ?, sdt_kh= ?, email_kh= ? WHERE id_kh = ?`

            db.query(sql,
                [
                    accountName, accountPhone, accountEmail, idAccount
                ],
                (errUpdate, resUpdate) => {
                    if (errUpdate) {
                        status.updateAccountInfoMessage = 'Lỗi Hệ Thống (Lỗi: updateAccountInfo 123)'
                        res.send(status)

                    } else {
                        if (resUpdate.affectedRows > 0) {
                            status.updateAccountInfoStatus = true
                            status.updateAccountInfoMessage = 'Cập Nhật Thông Tin Thành Công'
                            res.send(status)

                        } else {
                            status.updateAccountInfoMessage = 'Lỗi Hệ Thống (Lỗi: updateAccountInfo 456)'
                            res.send(status)
                        }

                    }

                })

        } else {
            status.updateAccountInfoMessage = 'Lỗi Chưa Đăng Nhập (Lỗi: updateAccountInfo 789)'
            res.send(status)
        }

    } else {
        status.updateAccountInfoMessage = req.existEmailUpdateAccountMessage
        res.send(status)
    }
}

const updateAccountPassword = async (req, res) => {
    const saltRounds = 5

    let status = {
        updateAccountPasswordStatus: false,
        updateAccountPasswordMessage: ''
    }

    let {
        accountPasswordOld, accountPasswordNew
    } = req.body

    // if login
    if (req.session.user) {
        let idAccount = req.session.user[0].id_kh

        // select password database
        const sqlAccount = 'SELECT password_kh FROM khachhang WHERE id_kh = ?'

        db.query(sqlAccount, idAccount, (errAccount, resAccount) => {
            if (errAccount) {
                status.updateAccountPasswordMessage = 'Lỗi Hệ Thống (Lỗi: updateAccountPassword 123)'
                res.send(status)

            } else {
                if (resAccount.length > 0) {
                    // so sánh password cũ và password database => giống nhau hay không
                    bcrypt.compare(accountPasswordOld, resAccount[0].password_kh, function (errCompare, resultCompare) {
                        if (errCompare) {
                            status.updateAccountPasswordMessage = 'Lỗi Hệ Thống (Lỗi: updateAccountPassword 456)'
                            res.send(status)

                        } else {
                            if (resultCompare) {
                                // hash password
                                bcrypt.hash(accountPasswordNew, saltRounds, (errHash, resHash) => {
                                    if (errHash) {
                                        status.updateAccountPasswordMessage = 'Lỗi Hệ Thống (Lỗi: updateAccountPassword 789)'
                                        res.send(status)

                                    } else {
                                        // update password
                                        const sqlUpdatePass = 'UPDATE khachhang SET password_kh= ? WHERE id_kh = ?'
                                        db.query(sqlUpdatePass, [resHash, idAccount], (errUpdatePass, resUpdatePass) => {
                                            if (errUpdatePass) {
                                                status.updateAccountPasswordMessage = 'Lỗi Hệ Thống (Lỗi: updateAccountPassword 901)'
                                                res.send(status)
                                            }
                                            else {
                                                if (resUpdatePass.affectedRows > 0) {
                                                    status.updateAccountPasswordStatus = true
                                                    status.updateAccountPasswordMessage = 'Thay Đổi Mật Khẩu Thành Công'
                                                    res.send(status)

                                                } else {
                                                    status.updateAccountPasswordMessage = 'Lỗi Hệ Thống (Lỗi: updateAccountPassword 012)'
                                                    res.send(status)
                                                }
                                            }
                                        })
                                    }
                                })

                            } else {
                                status.updateAccountPasswordMessage = 'Mật Khẩu Cũ Không Chính Xác'
                                res.send(status)
                            }
                        }
                    });

                } else {
                    status.updateAccountPasswordMessage = 'Lỗi Hệ Thống (Lỗi: updateAccountPassword 013)'
                    res.send(status)
                }
            }
        })


    } else {
        status.updateAccountPasswordMessage = 'Lỗi Chưa Đăng Nhập (Lỗi: updateAccountPassword 014)'
        res.send(status)
    }

}

const addAddressAccount = async (req, res) => {
    let status = {
        addAddressAccountStatus: false,
        addAddressAccountMessage: ''
    }

    let {
        accountAddressAdd, accountWardAdd
    } = req.body

    if (req.session.user) {
        let idAccount = req.session.user[0].id_kh

        const sql =
            `INSERT INTO diachi(dia_chi, mac_dinh, id_xp, id_kh) VALUES (?, ?, ?, ?)`
        db.query(sql,
            [
                accountAddressAdd, 0, accountWardAdd, idAccount
            ],
            (errAdd, resAdd) => {
                if (errAdd) {
                    status.addAddressAccountMessage = 'Lỗi Hệ Thống (Lỗi: addAddressAccount 123)'
                    res.send(status)
                } else {
                    if (resAdd.affectedRows > 0) {
                        status.addAddressAccountStatus = true
                        status.addAddressAccountMessage = 'Thêm Địa Chỉ Thành Công'
                        res.send(status)

                    } else {
                        status.addAddressAccountMessage = 'Lỗi Hệ Thống (Lỗi: addAddressAccount 456)'
                        res.send(status)
                    }
                }

            }
        )

    } else {
        status.addAddressAccountMessage = 'Lỗi Chưa Đăng Nhập (Lỗi: addAddressAccount 789)'
        res.send(status)
    }
}

const getAllAddressAccount = async (req, res) => {
    let status = {
        getAllAddressAccountStatus: false,
        getAllAddressAccountData: '',
        getAllAddressAccountMessage: ''
    }

    if (req.session.user) {
        let idAccount = req.session.user[0].id_kh

        const sql =
            `SELECT 
                dc.id_dc,
                dc.dia_chi,
                dc.mac_dinh,
                dc.id_xp,
                qh.id_qh,
                ttp.id_ttp,
                qh.ten_qh,
                xp.ten_xp,
                ttp.id_ttp,
                ttp.ten_ttp
            FROM 
                diachi as dc,
                xaphuong as xp,
                quanhuyen as qh,
                tinhthanhpho as ttp
            WHERE 
                id_kh = ?
                AND dc.id_xp = xp.id_xp
                AND xp.id_qh = qh.id_qh
                AND qh.id_ttp = ttp.id_ttp`

        db.query(sql, idAccount, (errAddress, resAddress) => {
            if (errAddress) {
                status.getAllAddressAccountMessage = 'Lỗi Hệ Thống (Lỗi: getAllAddressAccount 123)'
                res.send(status)
            } else {
                if (resAddress.length > 0) {
                    status.getAllAddressAccountStatus = true
                    status.getAllAddressAccountData = resAddress
                    res.send(status)

                } else {
                    status.getAllAddressAccountMessage = 'Lỗi Hệ Thống (Lỗi: getAllAddressAccount 123)'
                    res.send(status)
                }
            }
        })


    } else {
        status.getAllAddressAccountMessage = 'Lỗi Chưa Đăng Nhập (Lỗi: getAllAddressAccount 123)'
        res.send(status)
    }
}

const deleteAddressAccount = async (req, res) => {
    let status = {
        deleteAddressAccountStatus: false,
        deleteAddressAccountMessage: ''
    }

    let {
        idAddress
    } = req.body

    if (req.session.user) {
        let idAccount = req.session.user[0].id_kh

        const sql =
            `DELETE FROM diachi WHERE id_dc = ? AND id_kh = ? AND mac_dinh != 1`
        db.query(sql,
            [
                idAddress, idAccount
            ],
            (errDelete, resDelete) => {
                if (errDelete) {
                    status.deleteAddressAccountMessage = 'Lỗi Hệ Thống (Lỗi: deleteAddressAccount 123)'
                    res.send(status)
                } else {
                    if (resDelete.affectedRows > 0) {
                        status.deleteAddressAccountStatus = true
                        status.deleteAddressAccountMessage = 'Xóa Địa Chỉ Thành Công'
                        res.send(status)

                    } else {
                        status.deleteAddressAccountMessage = 'Lỗi Hệ Thống (Lỗi: deleteAddressAccount 456)'
                        res.send(status)
                    }
                }

            }
        )

    } else {
        status.deleteAddressAccountMessage = 'Lỗi Chưa Đăng Nhập (Lỗi: deleteAddressAccount 789)'
        res.send(status)
    }
}

const updateAddressDefaultAccount = async (req, res) => {
    let status = {
        updateAddressDefaultAccountStatus: false,
        updateAddressDefaultAccountMessage: ''
    }

    let {
        idAddress
    } = req.body

    if (req.session.user) {
        let idAccount = req.session.user[0].id_kh

        // xóa địa chỉ mặc định cũ => thành địa chỉ thường
        const sqlAddressDefaultOld =
            `UPDATE diachi SET mac_dinh= 0 WHERE id_kh = ? AND mac_dinh = 1`
        db.query(sqlAddressDefaultOld, idAccount, (errAddressDefaultOld, resAddressDefaultOld) => {
            if (errAddressDefaultOld) {
                status.updateAddressDefaultAccountMessage = 'Lỗi Hệ Thống (Lỗi: updateAddressDefaultAccount 123)'
                res.send(status)
            } else {
                if (resAddressDefaultOld.changedRows > 0) {
                    //cập nhật lại địa chỉ mặc định
                    const sqlAddressDefaultNew =
                        `UPDATE diachi SET mac_dinh = 1 WHERE id_kh = ? AND id_dc = ?`
                    db.query(sqlAddressDefaultNew, [idAccount, idAddress], (errUpdate, resUpdate) => {
                        if (errUpdate) {
                            status.updateAddressDefaultAccountMessage = 'Lỗi Hệ Thống (Lỗi: updateAddressDefaultAccount 456)'
                            res.send(status)
                        } else {
                            if (resUpdate.changedRows > 0) {
                                status.updateAddressDefaultAccountStatus = true
                                status.updateAddressDefaultAccountMessage = 'Đặt Địa Chỉ Mặc Định Thành Công'
                                res.send(status)
                            } else {
                                status.updateAddressDefaultAccountMessage = 'Lỗi Hệ Thống (Lỗi: updateAddressDefaultAccount 789)'
                                res.send(status)
                            }
                        }
                    })
                } else {
                    status.updateAddressDefaultAccountMessage = 'Lỗi Hệ Thống (Lỗi: updateAddressDefaultAccount 901)'
                    res.send(status)
                }
            }
        })

    } else {
        status.updateAddressDefaultAccountMessage = 'Lỗi Chưa Đăng Nhập (Lỗi: updateAddressDefaultAccount 012)'
        res.send(status)
    }
}


module.exports = {
    getAccountInfo,
    existEmailUpdateAccount,
    updateAccountInfo,
    updateAccountPassword,
    addAddressAccount,
    getAllAddressAccount,
    deleteAddressAccount,
    updateAddressDefaultAccount
}
