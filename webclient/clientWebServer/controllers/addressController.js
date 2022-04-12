const db = require('../../models')

const getAllProvinces = async (req, res) => {
    const sql = 'SELECT * FROM tinhthanhpho'
    db.query(sql, (err, result) => {
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
}

const getDistrictsProvince = async (req, res) => {
    let idProvince = req.body.idProvince //typeof String => sql not need '?'
    
    const sql = 'SELECT * FROM quanhuyen WHERE id_ttp = ?'
    db.query(sql, idProvince, (err, result) => {
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
}

const getWardsDistrict = async (req, res) => {
    let idDistrict = req.body.idDistrict //typeof String => sql not need '?'
    
    const sql = 'SELECT * FROM xaphuong WHERE id_qh = ?' 
    db.query(sql, idDistrict, (err, result) => {
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
}

module.exports = {
    getAllProvinces,
    getDistrictsProvince,
    getWardsDistrict
}