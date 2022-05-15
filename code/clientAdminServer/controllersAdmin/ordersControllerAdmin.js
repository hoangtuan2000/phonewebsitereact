const db = require('../../models')

const getAllOrders = async (req, res) => {

    let status = {
        getAllOrdersStatus: false,
        getAllOrdersData: '',
        getAllOrdersMessage: ''
    }

    const sql =
        `SELECT 
            dh.id_dh,
            dh.nguoi_nhan,
            dh.so_dien_thoai,
            CONVERT(dh.ngay_dat, char) as ngay_dat,
            ttdh.ten_ttdh    
        FROM 
            donhang as dh,
            trangthaidonhang as ttdh
        WHERE
            dh.id_ttdh = ttdh.id_ttdh
        ORDER BY dh.ngay_dat DESC`

    db.query(sql, (err, result) => {
        if (err) {
            status.getAllOrdersMessage = 'Lỗi Hệ Thống (Lỗi: getAllOrders 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllOrdersStatus = true
                status.getAllOrdersData = result
                res.send(status)
            } else {
                status.getAllOrdersStatus = true
                status.getAllOrdersData = []
                res.send(status)
            }
        }
    })
}

const getAllOrdersUnprocessed = async (req, res) => {

    let status = {
        getAllOrdersUnprocessedStatus: false,
        getAllOrdersUnprocessedData: '',
        getAllOrdersUnprocessedMessage: ''
    }

    const sql =
        `SELECT 
            dh.id_dh,
            dh.nguoi_nhan,
            dh.so_dien_thoai,
            CONVERT(dh.ngay_dat, char) as ngay_dat,
            ttdh.ten_ttdh    
        FROM 
            donhang as dh,
            trangthaidonhang as ttdh
        WHERE
            dh.id_ttdh = ttdh.id_ttdh
            AND dh.id_ttdh = 1
        ORDER BY dh.ngay_dat DESC`

    db.query(sql, (err, result) => {
        if (err) {
            status.getAllOrdersUnprocessedMessage = 'Lỗi Hệ Thống (Lỗi: getAllOrdersUnprocessed 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllOrdersUnprocessedStatus = true
                status.getAllOrdersUnprocessedData = result
                res.send(status)
            } else {
                status.getAllOrdersUnprocessedStatus = true
                status.getAllOrdersUnprocessedData = []
                res.send(status)
            }
        }
    })
}

const getAllOrdersProcessed = async (req, res) => {

    let status = {
        getAllOrdersProcessedStatus: false,
        getAllOrdersProcessedData: '',
        getAllOrdersProcessedMessage: ''
    }

    const sql =
        `SELECT 
            dh.id_dh,
            dh.nguoi_nhan,
            dh.so_dien_thoai,
            CONVERT(dh.ngay_dat, char) as ngay_dat,
            ttdh.ten_ttdh    
        FROM 
            donhang as dh,
            trangthaidonhang as ttdh
        WHERE
            dh.id_ttdh = ttdh.id_ttdh
            AND dh.id_ttdh = 2
        ORDER BY dh.ngay_dat DESC`

    db.query(sql, (err, result) => {
        if (err) {
            status.getAllOrdersProcessedMessage = 'Lỗi Hệ Thống (Lỗi: getAllOrdersProcessed 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllOrdersProcessedStatus = true
                status.getAllOrdersProcessedData = result
                res.send(status)
            } else {
                status.getAllOrdersProcessedStatus = true
                status.getAllOrdersProcessedData = []
                res.send(status)
            }
        }
    })
}

const getAllOrdersTransported = async (req, res) => {

    let status = {
        getAllOrdersTransportedStatus: false,
        getAllOrdersTransportedData: '',
        getAllOrdersTransportedMessage: ''
    }

    const sql =
        `SELECT 
            dh.id_dh,
            dh.nguoi_nhan,
            dh.so_dien_thoai,
            CONVERT(dh.ngay_dat, char) as ngay_dat,
            ttdh.ten_ttdh    
        FROM 
            donhang as dh,
            trangthaidonhang as ttdh
        WHERE
            dh.id_ttdh = ttdh.id_ttdh
            AND dh.id_ttdh = 3
        ORDER BY dh.ngay_dat DESC`

    db.query(sql, (err, result) => {
        if (err) {
            status.getAllOrdersTransportedMessage = 'Lỗi Hệ Thống (Lỗi: getAllOrdersTransported 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllOrdersTransportedStatus = true
                status.getAllOrdersTransportedData = result
                res.send(status)
            } else {
                status.getAllOrdersTransportedStatus = true
                status.getAllOrdersTransportedData = []
                res.send(status)
            }
        }
    })
}

const getAllOrdersDelivery = async (req, res) => {

    let status = {
        getAllOrdersDeliveryStatus: false,
        getAllOrdersDeliveryData: '',
        getAllOrdersDeliveryMessage: ''
    }

    const sql =
        `SELECT 
            dh.id_dh,
            dh.nguoi_nhan,
            dh.so_dien_thoai,
            CONVERT(dh.ngay_dat, char) as ngay_dat,
            ttdh.ten_ttdh    
        FROM 
            donhang as dh,
            trangthaidonhang as ttdh
        WHERE
            dh.id_ttdh = ttdh.id_ttdh
            AND dh.id_ttdh = 4
        ORDER BY dh.ngay_dat DESC`

    db.query(sql, (err, result) => {
        if (err) {
            status.getAllOrdersDeliveryMessage = 'Lỗi Hệ Thống (Lỗi: getAllOrdersDelivery 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllOrdersDeliveryStatus = true
                status.getAllOrdersDeliveryData = result
                res.send(status)
            } else {
                status.getAllOrdersDeliveryStatus = true
                status.getAllOrdersDeliveryData = []
                res.send(status)
            }
        }
    })
}

const getAllOrdersSuccessDelivery = async (req, res) => {

    let status = {
        getAllOrdersSuccessDeliveryStatus: false,
        getAllOrdersSuccessDeliveryData: '',
        getAllOrdersSuccessDeliveryMessage: ''
    }

    const sql =
        `SELECT 
            dh.id_dh,
            dh.nguoi_nhan,
            dh.so_dien_thoai,
            CONVERT(dh.ngay_dat, char) as ngay_dat,
            ttdh.ten_ttdh    
        FROM 
            donhang as dh,
            trangthaidonhang as ttdh
        WHERE
            dh.id_ttdh = ttdh.id_ttdh
            AND dh.id_ttdh = 5
        ORDER BY dh.ngay_dat DESC`

    db.query(sql, (err, result) => {
        if (err) {
            status.getAllOrdersSuccessDeliveryMessage = 'Lỗi Hệ Thống (Lỗi: getAllOrdersSuccessDelivery 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllOrdersSuccessDeliveryStatus = true
                status.getAllOrdersSuccessDeliveryData = result
                res.send(status)
            } else {
                status.getAllOrdersSuccessDeliveryStatus = true
                status.getAllOrdersSuccessDeliveryData = []
                res.send(status)
            }
        }
    })
}

const getOrderInfo = async (req, res) => {

    let status = {
        getOrderInfoStatus: false,
        getOrderInfoData: '',
        getOrderInfoMessage: ''
    }

    let idOrder = req.body.idOrder

    const sql =
        `SELECT 
            dh.id_dh,
            dh.nguoi_nhan,
            dh.so_dien_thoai,
            CONVERT(dh.ngay_dat, char) as ngay_dat,
            dh.dia_chi_giao,
            dh.ghi_chu,
            ttdh.id_ttdh,
            ttdh.ten_ttdh,
            dh.id_kh,
            kh.ten_kh,
            dh.id_nv,
            nv.ten_nv
        FROM 
            donhang as dh,
            trangthaidonhang as ttdh,
            nhanvien as nv,
            khachhang as kh
        WHERE
            dh.id_dh = ?
            AND dh.id_ttdh = ttdh.id_ttdh
            AND dh.id_kh = kh.id_kh
            AND dh.id_nv = nv.id_nv`

    db.query(sql, idOrder, (err, result) => {
        if (err) {
            status.getOrderInfoMessage = 'Lỗi Hệ Thống (Lỗi: getOrderInfo 123)'
            res.send(status)
        } else {
            if (result.length > 0) {

                // get product info
                const sqlProduct =
                    `SELECT 
                        sp.id_sp,
                        sp.ten_sp,
                        sp.anh_sp,
                        ctdh.gia,
                        ctdh.so_luong,
                        ctdh.khuyen_mai
                    FROM 
                        chitietdonhang as ctdh,
                        sanpham as sp
                    WHERE 
                        id_dh = ?
                        AND ctdh.id_sp = sp.id_sp`
                db.query(sqlProduct, idOrder, (errProduct, resProduct) => {
                    if (errProduct) {
                        status.getOrderInfoMessage = 'Lỗi Hệ Thống (Lỗi: getOrderInfo 456)'
                        res.send(status)

                    } else {
                        if (resProduct.length > 0) {
                            status.getOrderInfoStatus = true
                            status.getOrderInfoData = result[0]
                            status.getOrderInfoData.products = resProduct
                            res.send(status)

                        } else {
                            status.getOrderInfoMessage = 'Lỗi Hệ Thống (Lỗi: getOrderInfo 789)'
                            res.send(status)
                        }
                    }
                })

            } else {
                status.getOrderInfoMessage = 'Lỗi Hệ Thống (Lỗi: getOrderInfo 901)'
                res.send(status)
            }
        }
    })
}

const updateOrder = async (req, res) => {

    let status = {
        updateOrderStatus: false,
        updateOrderMessage: ''
    }

    let idOrder = req.body.idOrder
    let idOrderStatus = req.body.idOrderStatus

    const sql =
        `UPDATE donhang SET id_ttdh = ? WHERE id_dh = ?`

    db.query(sql, [idOrderStatus, idOrder], (err, result) => {
        if (err) {
            status.updateOrderMessage = 'Lỗi Hệ Thống (Lỗi: updateOrder 123)'
            res.send(status)

        } else {
            if (result.affectedRows > 0) {
                status.updateOrderStatus = true
                status.updateOrderMessage = 'Cập Nhật Thành Công'
                res.send(status)

            } else {
                status.updateOrderMessage = 'Lỗi Hệ Thống (Lỗi: updateOrder 456)'
                res.send(status)
            }
        }
    })
}

module.exports = {
    getAllOrders,
    getOrderInfo,
    updateOrder,
    getAllOrdersUnprocessed,
    getAllOrdersProcessed,
    getAllOrdersTransported,
    getAllOrdersDelivery,
    getAllOrdersSuccessDelivery
}