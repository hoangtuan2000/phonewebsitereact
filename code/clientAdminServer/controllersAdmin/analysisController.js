const db = require('../../models')

const countUser = async (req, res) => {

    let status = {
        countUserStatus: false,
        countUserData: '',
        countUserMessage: ''
    }

    const sql = 'SELECT COUNT(id_kh) as tong_kh FROM khachhang'

    db.query(sql, (err, result) => {
        if (err) {
            status.countUserMessage = 'Lỗi Hệ Thống (Lỗi: countUser 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                status.countUserStatus = true
                status.countUserData = result[0].tong_kh
                res.send(status)
            } else {
                status.countUserMessage = 'Lỗi Hệ Thống (Lỗi: countUser 456)'
                res.send(status)
            }
        }
    })
}

const countTodayOrder = async (req, res) => {

    let status = {
        countTodayOrderStatus: false,
        countTodayOrderData: '',
        countTodayOrderMessage: ''
    }

    const sql =
        `SELECT COUNT(id_dh) as tong_dh
        FROM donhang
        WHERE
            DAY(NOW()) = DAY(ngay_dat)
            AND MONTH(NOW()) = MONTH(ngay_dat)
            AND YEAR(NOW()) = YEAR(ngay_dat)`

    db.query(sql, (err, result) => {
        if (err) {
            status.countTodayOrderMessage = 'Lỗi Hệ Thống (Lỗi: countTodayOrder 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                status.countTodayOrderStatus = true
                status.countTodayOrderData = result[0].tong_dh
                res.send(status)
            } else {
                status.countTodayOrderMessage = 'Lỗi Hệ Thống (Lỗi: countTodayOrder 456)'
                res.send(status)
            }
        }
    })
}

const countYesterdayOrder = async (req, res) => {

    let status = {
        countYesterdayOrderStatus: false,
        countYesterdayOrderData: '',
        countYesterdayOrderMessage: ''
    }

    const sql =
        `SELECT 
            COUNT(id_dh) as tong_dh
        FROM 
            donhang
        WHERE
            DATE_SUB( CURRENT_DATE(), INTERVAL 1 DAY) = DATE(ngay_dat)`

    db.query(sql, (err, result) => {
        if (err) {
            status.countYesterdayOrderMessage = 'Lỗi Hệ Thống (Lỗi: countYesterdayOrder 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                status.countYesterdayOrderStatus = true
                status.countYesterdayOrderData = result[0].tong_dh
                res.send(status)
            } else {
                status.countYesterdayOrderMessage = 'Lỗi Hệ Thống (Lỗi: countYesterdayOrder 456)'
                res.send(status)
            }
        }
    })
}

const totalMoneyYesterdayOrder = async (req, res) => {

    let status = {
        totalMoneyYesterdayOrderStatus: false,
        totalMoneyYesterdayOrderData: '',
        totalMoneyYesterdayOrderMessage: ''
    }

    const sql =
        `SELECT 
            date(dh.ngay_dat) as ngay,
            ROUND(SUM((ctdh.gia - ((ctdh.gia*ctdh.khuyen_mai)/100))*ctdh.so_luong)) as doanh_thu_hom_qua
        FROM 
            donhang as dh,
            chitietdonhang as ctdh
        WHERE
            DATE_SUB( CURRENT_DATE(), INTERVAL 1 DAY) = DATE(ngay_dat)
            AND dh.id_dh = ctdh.id_dh`

    db.query(sql, (err, result) => {
        if (err) {
            status.totalMoneyYesterdayOrderMessage = 'Lỗi Hệ Thống (Lỗi: totalMoneyYesterdayOrder 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                status.totalMoneyYesterdayOrderStatus = true
                status.totalMoneyYesterdayOrderData = result[0]
                res.send(status)
            } else {
                status.totalMoneyYesterdayOrderMessage = 'Lỗi Hệ Thống (Lỗi: totalMoneyYesterdayOrder 456)'
                res.send(status)
            }
        }
    })
}

const totalMoneyTodayOrder = async (req, res) => {

    let status = {
        totalMoneyTodayOrderStatus: false,
        totalMoneyTodayOrderData: '',
        totalMoneyTodayOrderMessage: ''
    }

    const sql =
        `SELECT 
            date(dh.ngay_dat) as ngay,
            ROUND(SUM((ctdh.gia - ((ctdh.gia*ctdh.khuyen_mai)/100))*ctdh.so_luong)) as doanh_thu_hom_nay
        FROM 
            donhang as dh,
            chitietdonhang as ctdh
        WHERE
            DAY(NOW()) = DAY(dh.ngay_dat)
            AND MONTH(NOW()) = MONTH(dh.ngay_dat)
            AND YEAR(NOW()) = YEAR(dh.ngay_dat)
            AND dh.id_dh = ctdh.id_dh
        GROUP BY DAY(dh.ngay_dat)`

    db.query(sql, (err, result) => {
        if (err) {
            status.totalMoneyTodayOrderMessage = 'Lỗi Hệ Thống (Lỗi: totalMoneyTodayOrder 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                status.totalMoneyTodayOrderStatus = true
                status.totalMoneyTodayOrderData = result[0]
                res.send(status)
            } else {
                status.totalMoneyTodayOrderMessage = 'Lỗi Hệ Thống (Lỗi: totalMoneyTodayOrder 456)'
                res.send(status)
            }
        }
    })
}

// sản phẩm bán chạy
const sellingProducts = async (req, res) => {

    let status = {
        sellingProductsStatus: false,
        sellingProductsData: '',
        sellingProductsMessage: ''
    }

    const sql =
        `SELECT ctdh.id_sp, sp.ten_sp, COUNT(ctdh.id_sp) as tong_sp
        FROM 
            chitietdonhang as ctdh,
            sanpham as sp
        WHERE 
            ctdh.id_sp = sp.id_sp
        GROUP BY ctdh.id_sp`

    db.query(sql, (err, result) => {
        if (err) {
            status.sellingProductsMessage = 'Lỗi Hệ Thống (Lỗi: sellingProducts 123)'
            res.send(status)
        } else {
            if (result.length > 0) {

                for (let i = 0; i < result.length; i++) {
                    for (let j = i + 1; j < result.length; j++) {
                        if (result[j].tong_sp > result[i].tong_sp) {
                            let temp = {}
                            temp = result[i]
                            result[i] = result[j]
                            result[j] = temp
                        }
                    }
                }

                if (result.length > 5) {
                    status.sellingProductsStatus = true
                    status.sellingProductsData = result.slice(0, 5)
                    res.send(status)
                }else{
                    status.sellingProductsStatus = true
                    status.sellingProductsData = result
                    res.send(status)
                }


            } else {
                status.sellingProductsMessage = 'Lỗi Hệ Thống (Lỗi: sellingProducts 456)'
                res.send(status)
            }
        }
    })
}




module.exports = {
    countUser,
    countTodayOrder,
    totalMoneyTodayOrder,
    countYesterdayOrder,
    sellingProducts,
    totalMoneyYesterdayOrder
}