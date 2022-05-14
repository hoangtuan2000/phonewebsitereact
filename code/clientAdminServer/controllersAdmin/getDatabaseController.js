const db = require('../../models')

const getAllPositions = async (req, res) => {

    let status = {
        getAllPositionsStatus: false,
        getAllPositionsData: '',
        getAllPositionsMessage: ''
    }

    const sql = 'SELECT * FROM chucvu'

    db.query(sql, (err, result) => {
        if (err) {
            status.getAllPositionsMessage = 'Lỗi Hệ Thống (Lỗi: getAllPositions 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllPositionsStatus = true
                status.getAllPositionsData = result
                res.send(status)
            } else {
                status.getAllPositionsMessage = 'Lỗi Hệ Thống (Lỗi: getAllPositions 456)'
                res.send(status)
            }
        }
    })
}

const getAllProvinces = async (req, res) => {

    let status = {
        getAllProvincesStatus: false,
        getAllProvincesData: '',
        getAllProvincesMessage: ''
    }

    const sql = 'SELECT * FROM tinhthanhpho'

    db.query(sql, (err, result) => {
        if (err) {
            status.getAllProvincesMessage = 'Lỗi Hệ Thống (Lỗi: getAllProvinces 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllProvincesStatus = true
                status.getAllProvincesData = result
                res.send(status)
            } else {
                status.getAllProvincesMessage = 'Lỗi Hệ Thống (Lỗi: getAllProvinces 456)'
                res.send(status)
            }
        }
    })
}

const getAllDistricts = async (req, res) => {

    let status = {
        getAllDistrictsStatus: false,
        getAllDistrictsData: '',
        getAllDistrictsMessage: ''
    }

    const sql = 'SELECT * FROM quanhuyen'

    db.query(sql, (err, result) => {
        if (err) {
            status.getAllDistrictsMessage = 'Lỗi Hệ Thống (Lỗi: getAllDistricts 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllDistrictsStatus = true
                status.getAllDistrictsData = result
                res.send(status)
            } else {
                status.getAllDistrictsMessage = 'Lỗi Hệ Thống (Lỗi: getAllDistricts 456)'
                res.send(status)
            }
        }
    })
}

const getAllWards = async (req, res) => {

    let status = {
        getAllWardsStatus: false,
        getAllWardsData: '',
        getAllWardsMessage: ''
    }

    const sql = 'SELECT * FROM xaphuong'

    db.query(sql, (err, result) => {
        if (err) {
            status.getAllWardsMessage = 'Lỗi Hệ Thống (Lỗi: getAllWards 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllWardsStatus = true
                status.getAllWardsData = result
                res.send(status)
            } else {
                status.getAllWardsMessage = 'Lỗi Hệ Thống (Lỗi: getAllWards 456)'
                res.send(status)
            }
        }
    })
}

const getDistrictsProvince = async (req, res) => {
    let idProvince = req.body.idProvince //typeof String => sql not need '?'

    const sql = 'SELECT * FROM quanhuyen WHERE id_ttp = ?'
    db.query(sql, idProvince, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
}

const getWardsDistrict = async (req, res) => {
    let idDistrict = req.body.idDistrict //typeof String => sql not need '?'

    const sql = 'SELECT * FROM xaphuong WHERE id_qh = ?'
    db.query(sql, idDistrict, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
}

const getAllActiveStatus = async (req, res) => {
    let status = {
        getAllActiveStatusStatus: false,
        getAllActiveStatusData: '',
        getAllActiveStatusMessage: ''
    }

    const sql = 'SELECT * FROM trangthaihoatdong'

    db.query(sql, (err, result) => {
        if (err) {
            status.getAllActiveStatusMessage = 'Lỗi Hệ Thống (Lỗi: getAllActiveStatus 123)'
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllActiveStatusStatus = true
                status.getAllActiveStatusData = result
                res.send(status)
                
            } else {
                status.getAllActiveStatusMessage = 'Lỗi Hệ Thống (Lỗi: getAllActiveStatus 456)'
                res.send(status)
            }
        }
    })
}


module.exports = {
    getAllPositions,
    getAllProvinces,
    getAllDistricts,
    getAllWards,
    getDistrictsProvince,
    getWardsDistrict,
    getAllActiveStatus
}