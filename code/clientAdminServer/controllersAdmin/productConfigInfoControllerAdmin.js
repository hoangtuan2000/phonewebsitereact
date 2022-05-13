const db = require('../../models')

const getAllOrigin = async (req, res) => {
    let status = {
        getAllOriginData: []
    }
    const sql = 'SELECT * FROM xuatxu'
    db.query(sql, (err, result) => {
        if (err) {
            console.log('getAllOrigin err:', err);
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllOriginData = result
                res.send(status)
            } else {
                console.log('getAllOrigin not data');
                res.send(status)
            }
        }
    })
}

const getAllMemory = async (req, res) => {
    let status = {
        getAllMemoryData: []
    }
    const sql = 'SELECT * FROM bonho ORDER BY id_bn'
    db.query(sql, (err, result) => {
        if (err) {
            console.log('getAllMemory err:', err);
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllMemoryData = result
                res.send(status)
            } else {
                console.log('getAllMemory not data');
                res.send(status)
            }
        }
    })
}

const getAllRam = async (req, res) => {
    let status = {
        getAllRamData: []
    }
    const sql = 'SELECT * FROM ram ORDER BY id_ram'
    db.query(sql, (err, result) => {
        if (err) {
            console.log('getAllRam err:', err);
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllRamData = result
                res.send(status)
            } else {
                console.log('getAllRam not data');
                res.send(status)
            }
        }
    })
}

const getAllTrademark = async (req, res) => {
    let status = {
        getAllTrademarkData: []
    }
    const sql = 'SELECT * FROM thuonghieu'
    db.query(sql, (err, result) => {
        if (err) {
            console.log('getAllTrademark err:', err);
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllTrademarkData = result
                res.send(status)
            } else {
                console.log('getAllTrademark not data');
                res.send(status)
            }
        }
    })
}

const getAllOperatingSystem = async (req, res) => {
    let status = {
        getAllOperatingSystemData: []
    }
    const sql = 'SELECT * FROM hedieuhanh'
    db.query(sql, (err, result) => {
        if (err) {
            console.log('getAllOperatingSystem err:', err);
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllOperatingSystemData = result
                res.send(status)
            } else {
                console.log('getAllOperatingSystem not data');
                res.send(status)
            }
        }
    })
}

const getAllDesign = async (req, res) => {
    let status = {
        getAllDesignData: []
    }
    const sql = 'SELECT * FROM thietke'
    db.query(sql, (err, result) => {
        if (err) {
            console.log('getAllDesign err:', err);
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllDesignData = result
                res.send(status)
            } else {
                console.log('getAllDesign not data');
                res.send(status)
            }
        }
    })
}

const getAllChip = async (req, res) => {
    let status = {
        getAllChipData: []
    }
    const sql = 'SELECT * FROM chip'
    db.query(sql, (err, result) => {
        if (err) {
            console.log('getAllChip err:', err);
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllChipData = result
                res.send(status)
            } else {
                console.log('getAllChip not data');
                res.send(status)
            }
        }
    })
}

const getAllSize = async (req, res) => {
    let status = {
        getAllSizeData: []
    }
    const sql = 'SELECT * FROM manhinh'
    db.query(sql, (err, result) => {
        if (err) {
            console.log('getAllSize err:', err);
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllSizeData = result
                res.send(status)
            } else {
                console.log('getAllSize not data');
                res.send(status)
            }
        }
    })
}

const getAllPromotion = async (req, res) => {
    let status = {
        getAllPromotionData: []
    }
    const sql = 'SELECT * FROM khuyenmai'
    db.query(sql, (err, result) => {
        if (err) {
            console.log('getAllPromotion err:', err);
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllPromotionData = result
                res.send(status)
            } else {
                console.log('getAllPromotion not data');
                res.send(status)
            }
        }
    })
}

const getAllMaterial = async (req, res) => {
    let status = {
        getAllMaterialData: []
    }
    const sql = 'SELECT * FROM chatlieu'
    db.query(sql, (err, result) => {
        if (err) {
            console.log('getAllMaterial err:', err);
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllMaterialData = result
                res.send(status)
            } else {
                console.log('getAllMaterial not data');
                res.send(status)
            }
        }
    })
}

const getAllConnectionType = async (req, res) => {
    let status = {
        getAllConnectionTypeData: []
    }
    const sql = 'SELECT * FROM loaiketnoi'
    db.query(sql, (err, result) => {
        if (err) {
            console.log('getAllConnectionType err:', err);
            res.send(status)
        } else {
            if (result.length > 0) {
                status.getAllConnectionTypeData = result
                res.send(status)
            } else {
                console.log('getAllConnectionType not data');
                res.send(status)
            }
        }
    })
}

module.exports = {
    getAllOrigin,
    getAllMemory,
    getAllRam,
    getAllTrademark,
    getAllOperatingSystem,
    getAllDesign,
    getAllChip,
    getAllSize,
    getAllPromotion,
    getAllMaterial,
    getAllConnectionType
}