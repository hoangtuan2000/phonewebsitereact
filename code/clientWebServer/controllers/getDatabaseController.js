const db = require('../../models')

const getAllOrdersStatus = async (req, res) => {
    let status = {
        getAllOrdersStatusStatus: false,
        getAllOrdersStatusData: '',
        getAllOrdersStatusMessage: ''
    }

    const sql = 'SELECT * FROM trangthaidonhang'

    db.query(sql, (err, result) => {
        if (err) {
            status.getAllOrdersStatusMessage = 'Lỗi Hệ Thống (Lỗi: getAllOrdersStatus 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllOrdersStatusStatus = true
                status.getAllOrdersStatusData = result
                res.send(status)
                
            } else {
                status.getAllOrdersStatusMessage = 'Lỗi Hệ Thống (Lỗi: getAllOrdersStatus 456)'
                res.send(status)
            }
        }
    })
}

module.exports = {
    getAllOrdersStatus
}