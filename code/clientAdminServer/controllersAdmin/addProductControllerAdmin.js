const db = require('../../models')

const addSmartphone = async (req, res) => {

    let status = {
        addSmartphoneStatus: false,
        addSmartphoneMessage: ''
    }

    let {
        productName, productPrice, productNumber,
        productOrigin, productMemory, productRam,
        productTrademark, productOperatingSystem, productDesign,
        productChip, productSize, productPromotion, productIntro
    } = req.body

    // Upload image to folder successfully
    if (req.uploadMultipleImagesStatus) {
        // images name is saved in folder
        let imagesNameSaved = req.imagesNameSaved

        let defaultImage = imagesNameSaved[0]

        //insert sanpham database 
        const sqlInsertProduct =
            `INSERT INTO 
                sanpham(ten_sp, gia_sp, so_luong_sp, anh_sp, gioi_thieu_sp, id_lsp, id_xx, id_km, id_th, id_ttsp) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        db.query(sqlInsertProduct,
            [
                productName, productPrice, productNumber,
                defaultImage, productIntro, 'DT', productOrigin,
                productPromotion, productTrademark, 'CH'
            ],
            (errInsertProduct, resInsertProduct) => {
                if (errInsertProduct) {
                    console.log('addSmartphone', errInsertProduct);
                    status.addSmartphoneMessage = 'Lỗi Hệ Thống (Lỗi: addSmartphone 123)'
                    res.send(status)

                } else {

                    if (resInsertProduct.affectedRows > 0) {
                        let idProduct = resInsertProduct.insertId

                        //insert dienthoai database
                        const sqlInsertSmartphone =
                            `INSERT INTO dienthoai(id_sp, id_bn, id_ram, id_hdh, id_tk, id_chip, id_mh) VALUES (?,?,?,?,?,?,?)`
                        db.query(sqlInsertSmartphone,
                            [
                                idProduct, productMemory, productRam, productOperatingSystem,
                                productDesign, productChip, productSize
                            ],
                            (errSmartphone, resSmartphone) => {
                                if (errSmartphone) {
                                    console.log('addSmartphone', errSmartphone);
                                    status.addSmartphoneMessage = 'Lỗi Hệ Thống (Lỗi: addSmartphone 456)'
                                    res.send(status)

                                } else {
                                    if (resSmartphone.affectedRows > 0) {
                                        // format values insert into database (bỏ ảnh đầu, ảnh đầu là ảnh avatar)
                                        let images = []
                                        for (let i = 1; i < imagesNameSaved.length; i++) {
                                            imagesNameSaved[i].push(idProduct)
                                            images.push(imagesNameSaved[i])
                                        }
                                        //insert anhsanpham database
                                        const sqlInsertImages = 'INSERT INTO `anhsanpham`(`anh_asp`, `id_sp`) VALUES ?'
                                        db.query(sqlInsertImages, [images], (errImages, resImages) => {
                                            if (errImages) {
                                                console.log('addSmartphone', errImages);
                                                status.addSmartphoneMessage = 'Lỗi Hệ Thống (Lỗi: addSmartphone 789)'
                                                res.send(status)

                                            } else {
                                                if (resImages.affectedRows > 0) {
                                                    status.addSmartphoneStatus = true
                                                    res.send(status)

                                                } else {
                                                    status.addSmartphoneMessage = 'Lỗi Hệ Thống (Lỗi: addSmartphone 901)'
                                                    res.send(status)

                                                }

                                            }
                                        })

                                    } else {
                                        status.addSmartphoneMessage = 'Lỗi Hệ Thống (Lỗi: addSmartphone 012)'
                                        res.send(status)

                                    }

                                }
                            })

                    } else {
                        status.addSmartphoneMessage = 'Lỗi Hệ Thống (Lỗi: addSmartphone 013)'
                        res.send(status)

                    }

                }
            })

    } else {
        console.log('addSmartphone', req.uploadMultipleImagesMessage);
        status.addSmartphoneMessage = 'Lỗi Hệ Thống (Lỗi: addSmartphone 014)'
        res.send(status)
    }
}

module.exports = {
    addSmartphone
}