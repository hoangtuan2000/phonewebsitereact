const db = require('../../models')


const getAllAccounts = async (req, res) => {

    let status = {
        getAllAccountsStatus: false,
        getAllAccountsData: '',
        getAllAccountsMessage: ''
    }

    const sql =
        `SELECT 
            nv.id_nv,
            nv.ten_nv,
            nv.sdt_nv,
            nv.dia_chi_nv,
            nv.email_nv,
            xp.ten_xp,
            qh.ten_qh,
            ttp.ten_ttp,
            cv.ten_cv,
            tthd.ten_tthd
        FROM 
            nhanvien as nv,
            xaphuong as xp,
            quanhuyen as qh,
            tinhthanhpho as ttp,
            chucvu as cv,
            trangthaihoatdong as tthd
        WHERE
            nv.id_xp = xp.id_xp
            AND xp.id_qh = qh.id_qh
            AND qh.id_ttp = ttp.id_ttp
            AND nv.id_cv = cv.id_cv
            AND nv.id_tthd = tthd.id_tthd
        ORDER BY 
            nv.id_cv, nv.ten_nv`

    db.query(sql, (err, result) => {
        if (err) {
            status.getAllAccountsMessage = 'Lỗi Hệ Thống (Lỗi: getAllAccounts 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllAccountsStatus = true
                status.getAllAccountsData = result
                res.send(status)
            } else {
                status.getAllAccountsStatus = true
                status.getAllAccountsData = []
                res.send(status)
            }
        }
    })
}

const getAllManagementAccounts = async (req, res) => {

    let status = {
        getAllManagementAccountsStatus: false,
        getAllManagementAccountsData: '',
        getAllManagementAccountsMessage: ''
    }

    const sql =
        `SELECT 
            nv.id_nv,
            nv.ten_nv,
            nv.sdt_nv,
            nv.dia_chi_nv,
            nv.email_nv,
            xp.ten_xp,
            qh.ten_qh,
            ttp.ten_ttp,
            cv.ten_cv,
            tthd.ten_tthd
        FROM 
            nhanvien as nv,
            xaphuong as xp,
            quanhuyen as qh,
            tinhthanhpho as ttp,
            chucvu as cv,
            trangthaihoatdong as tthd
        WHERE
            nv.id_xp = xp.id_xp
            AND nv.id_cv = 'QT'
            AND xp.id_qh = qh.id_qh
            AND qh.id_ttp = ttp.id_ttp
            AND nv.id_cv = cv.id_cv
            AND nv.id_tthd = tthd.id_tthd
        ORDER BY 
            nv.id_cv, nv.ten_nv`

    db.query(sql, (err, result) => {
        if (err) {
            status.getAllManagementAccountsMessage = 'Lỗi Hệ Thống (Lỗi: getAllManagementAccounts 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllManagementAccountsStatus = true
                status.getAllManagementAccountsData = result
                res.send(status)
            } else {
                status.getAllManagementAccountsStatus = true
                status.getAllManagementAccountsData = []
                res.send(status)
            }
        }
    })
}

const getAllStaffAccounts = async (req, res) => {

    let status = {
        getAllStaffAccountsStatus: false,
        getAllStaffAccountsData: '',
        getAllStaffAccountsMessage: ''
    }

    const sql =
        `SELECT 
            nv.id_nv,
            nv.ten_nv,
            nv.sdt_nv,
            nv.dia_chi_nv,
            nv.email_nv,
            xp.ten_xp,
            qh.ten_qh,
            ttp.ten_ttp,
            cv.ten_cv,
            tthd.ten_tthd
        FROM 
            nhanvien as nv,
            xaphuong as xp,
            quanhuyen as qh,
            tinhthanhpho as ttp,
            chucvu as cv,
            trangthaihoatdong as tthd
        WHERE
            nv.id_xp = xp.id_xp
            AND nv.id_cv = 'NV'
            AND xp.id_qh = qh.id_qh
            AND qh.id_ttp = ttp.id_ttp
            AND nv.id_cv = cv.id_cv
            AND nv.id_tthd = tthd.id_tthd
        ORDER BY 
            nv.id_cv, nv.ten_nv`

    db.query(sql, (err, result) => {
        if (err) {
            status.getAllStaffAccountsMessage = 'Lỗi Hệ Thống (Lỗi: getAllStaffAccounts 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllStaffAccountsStatus = true
                status.getAllStaffAccountsData = result
                res.send(status)
            } else {
                status.getAllStaffAccountsStatus = true
                status.getAllStaffAccountsData = []
                res.send(status)
            }
        }
    })
}

const getAccountInfo = async (req, res) => {

    let status = {
        getAccountInfoStatus: false,
        getAccountInfoData: '',
        getAccountInfoMessage: ''
    }

    let idAccount = req.body.idAccount

    const sql =
        `SELECT 
            nv.id_nv,
            nv.ten_nv,
            nv.sdt_nv,
            nv.dia_chi_nv,
            nv.email_nv,
            nv.id_cv,
            nv.id_xp,
            nv.id_tthd,
            qh.id_qh,
            ttp.id_ttp,
            xp.ten_xp,
            qh.ten_qh,
            ttp.ten_ttp,
            cv.ten_cv,
            tthd.ten_tthd
        FROM 
            nhanvien as nv,
            xaphuong as xp,
            quanhuyen as qh,
            tinhthanhpho as ttp,
            chucvu as cv,
            trangthaihoatdong as tthd
        WHERE
            nv.id_nv = ?
            AND nv.id_xp = xp.id_xp
            AND xp.id_qh = qh.id_qh
            AND qh.id_ttp = ttp.id_ttp
            AND nv.id_cv = cv.id_cv
            AND nv.id_tthd = tthd.id_tthd
        ORDER BY 
            nv.id_cv, nv.ten_nv`

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
}



module.exports = {
    getAllAccounts,
    getAccountInfo,
    getAllManagementAccounts,
    getAllStaffAccounts
}