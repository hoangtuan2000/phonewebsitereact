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

        let productType = 'DT'

        //insert sanpham database 
        const sqlInsertProduct =
            `INSERT INTO 
                sanpham(ten_sp, gia_sp, so_luong_sp, anh_sp, gioi_thieu_sp, id_lsp, id_xx, id_km, id_th, id_ttsp) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        db.query(sqlInsertProduct,
            [
                productName, productPrice, productNumber,
                defaultImage, productIntro, productType, productOrigin,
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
                                                    status.addSmartphoneMessage = 'Thêm Sản Phẩm Thành Công'
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
        status.addSmartphoneMessage = 'Chỉ cho phép tải lên 10 ảnh và dưới 2MB'
        res.send(status)
    }
}

const addHeadphone = async (req, res) => {

    let status = {
        addHeadphoneStatus: false,
        addHeadphoneMessage: ''
    }

    let {
        productName, productPrice, productNumber, productIntro,
        productOrigin, productTrademark, productPromotion, productConnectionType
    } = req.body

    // Upload image to folder successfully
    if (req.uploadMultipleImagesStatus) {
        // images name is saved in folder
        let imagesNameSaved = req.imagesNameSaved

        let defaultImage = imagesNameSaved[0]

        let productType = 'TN'

        //insert sanpham database 
        const sqlInsertProduct =
            `INSERT INTO 
                sanpham(ten_sp, gia_sp, so_luong_sp, anh_sp, gioi_thieu_sp, id_lsp, id_xx, id_km, id_th, id_ttsp) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        db.query(sqlInsertProduct,
            [
                productName, productPrice, productNumber,
                defaultImage, productIntro, productType, productOrigin,
                productPromotion, productTrademark, 'CH'
            ],
            (errInsertProduct, resInsertProduct) => {
                if (errInsertProduct) {
                    console.log('addHeadphone', errInsertProduct);
                    status.addHeadphoneMessage = 'Lỗi Hệ Thống (Lỗi: addHeadphone 123)'
                    res.send(status)

                } else {

                    if (resInsertProduct.affectedRows > 0) {
                        let idProduct = resInsertProduct.insertId

                        //insert dienthoai database
                        const sqlInsertHeadphone =
                            `INSERT INTO tainghe(id_sp, id_lkn) VALUES (?, ?)`
                        db.query(sqlInsertHeadphone,
                            [
                                idProduct, productConnectionType
                            ],
                            (errHeadphone, resHeadphone) => {
                                if (errHeadphone) {
                                    console.log('addHeadphone', errHeadphone);
                                    status.addHeadphoneMessage = 'Lỗi Hệ Thống (Lỗi: addHeadphone 456)'
                                    res.send(status)

                                } else {
                                    if (resHeadphone.affectedRows > 0) {
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
                                                console.log('addHeadphone', errImages);
                                                status.addHeadphoneMessage = 'Lỗi Hệ Thống (Lỗi: addHeadphone 789)'
                                                res.send(status)

                                            } else {
                                                if (resImages.affectedRows > 0) {
                                                    status.addHeadphoneStatus = true
                                                    res.send(status)

                                                } else {
                                                    status.addHeadphoneMessage = 'Lỗi Hệ Thống (Lỗi: addHeadphone 901)'
                                                    res.send(status)

                                                }

                                            }
                                        })

                                    } else {
                                        status.addHeadphoneMessage = 'Lỗi Hệ Thống (Lỗi: addHeadphone 012)'
                                        res.send(status)

                                    }

                                }
                            })

                    } else {
                        status.addHeadphoneMessage = 'Lỗi Hệ Thống (Lỗi: addHeadphone 013)'
                        res.send(status)

                    }

                }
            })

    } else {
        console.log('addHeadphone', req.uploadMultipleImagesMessage);
        status.addHeadphoneMessage = 'Chỉ cho phép tải lên 10 ảnh và dưới 2MB'
        res.send(status)
    }
}

const addPhonecase = async (req, res) => {

    let status = {
        addPhonecaseStatus: false,
        addPhonecaseMessage: ''
    }

    let {
        productName, productPrice, productNumber, productIntro,
        productOrigin, productTrademark, productPromotion, productMaterial
    } = req.body

    // Upload image to folder successfully
    if (req.uploadMultipleImagesStatus) {
        // images name is saved in folder
        let imagesNameSaved = req.imagesNameSaved

        let defaultImage = imagesNameSaved[0]

        let productType = 'OL'

        //insert sanpham database 
        const sqlInsertProduct =
            `INSERT INTO 
                sanpham(ten_sp, gia_sp, so_luong_sp, anh_sp, gioi_thieu_sp, id_lsp, id_xx, id_km, id_th, id_ttsp) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        db.query(sqlInsertProduct,
            [
                productName, productPrice, productNumber,
                defaultImage, productIntro, productType, productOrigin,
                productPromotion, productTrademark, 'CH'
            ],
            (errInsertProduct, resInsertProduct) => {
                if (errInsertProduct) {
                    console.log('addPhonecase', errInsertProduct);
                    status.addPhonecaseMessage = 'Lỗi Hệ Thống (Lỗi: addPhonecase 123)'
                    res.send(status)

                } else {

                    if (resInsertProduct.affectedRows > 0) {
                        let idProduct = resInsertProduct.insertId

                        //insert dienthoai database
                        const sqlInsertHeadphone =
                            `INSERT INTO oplung(id_sp, id_cl) VALUES (?, ?)`
                        db.query(sqlInsertHeadphone,
                            [
                                idProduct, productMaterial
                            ],
                            (errPhonecase, resPhonecase) => {
                                if (errPhonecase) {
                                    console.log('addPhonecase', errPhonecase);
                                    status.addPhonecaseMessage = 'Lỗi Hệ Thống (Lỗi: addPhonecase 456)'
                                    res.send(status)

                                } else {
                                    if (resPhonecase.affectedRows > 0) {
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
                                                console.log('addPhonecase', errImages);
                                                status.addPhonecaseMessage = 'Lỗi Hệ Thống (Lỗi: addPhonecase 789)'
                                                res.send(status)

                                            } else {
                                                if (resImages.affectedRows > 0) {
                                                    status.addPhonecaseStatus = true
                                                    res.send(status)

                                                } else {
                                                    status.addPhonecaseMessage = 'Lỗi Hệ Thống (Lỗi: addPhonecase 901)'
                                                    res.send(status)

                                                }

                                            }
                                        })

                                    } else {
                                        status.addPhonecaseMessage = 'Lỗi Hệ Thống (Lỗi: addPhonecase 012)'
                                        res.send(status)

                                    }

                                }
                            })

                    } else {
                        status.addPhonecaseMessage = 'Lỗi Hệ Thống (Lỗi: addPhonecase 013)'
                        res.send(status)

                    }

                }
            })

    } else {
        console.log('addPhonecase', req.uploadMultipleImagesMessage);
        status.addPhonecaseMessage = 'Chỉ cho phép tải lên 10 ảnh và dưới 2MB'
        res.send(status)
    }
}

module.exports = {
    addSmartphone,
    addHeadphone,
    addPhonecase
}