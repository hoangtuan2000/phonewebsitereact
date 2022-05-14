const db = require('../../../models')

const updateSmartphone = async (req, res) => {

    let status = {
        updateSmartphoneStatus: false,
        updateSmartphoneMessage: ''
    }

    let {
        idProduct, productName, productPrice, productNumber,
        productOrigin, productMemory, productRam, productStatus,
        productTrademark, productOperatingSystem, productDesign,
        productChip, productSize, productPromotion, productIntro
    } = req.body

    //    Upload image to folder successfully
    if (req.uploadAvatarAndImagesStatus) {
        //get image avatar and list image
        let avatarNameSaved = req.avatarNameSaved
        let imagesNameSaved = req.imagesNameSaved

        // exist avatarNameSaved
        if (avatarNameSaved != '') {
            const sqlUpdateProduct =
                `UPDATE 
                    sanpham 
                SET 
                    ten_sp= ?, gia_sp= ?, so_luong_sp= ?,
                    anh_sp= ?, gioi_thieu_sp= ?, id_xx= ?,
                    id_km= ?, id_th= ?, id_ttsp= ?
                WHERE id_sp = ?`

            // update sanpham table
            db.query(sqlUpdateProduct,
                [
                    productName, productPrice, productNumber,
                    avatarNameSaved, productIntro, productOrigin,
                    productPromotion, productTrademark, productStatus,
                    idProduct
                ],
                (errUpdateProduct, resUpdateProduct) => {
                    if (errUpdateProduct) {
                        console.log('updateSmartphone', errUpdateProduct);
                        status.updateSmartphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateSmartphone 123)'
                        res.send(status)

                    } else {
                        // update dienthoai table
                        if (resUpdateProduct.affectedRows > 0) {
                            const sqlUpdateSmartphone =
                                `UPDATE 
                                    dienthoai 
                                SET 
                                    id_bn= ?, id_ram= ?, id_hdh= ?,
                                    id_tk= ?, id_chip= ?, id_mh= ? 
                                WHERE id_sp = ?`
                            db.query(sqlUpdateSmartphone,
                                [
                                    productMemory, productRam, productOperatingSystem,
                                    productDesign, productChip, productSize,
                                    idProduct
                                ],
                                (errUpSmartphone, resUpSmartphone) => {
                                    if (errUpSmartphone) {
                                        console.log('updateSmartphone', errUpSmartphone);
                                        status.updateSmartphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateSmartphone 456)'
                                        res.send(status)

                                    } else {
                                        if (resUpSmartphone.affectedRows > 0) {
                                            // exist list images update => continue update images => anhsanpham table
                                            if (imagesNameSaved.length > 0) {
                                                // delete old images 
                                                const sqlDeleteImages =
                                                    `DELETE FROM anhsanpham WHERE id_sp = ?`
                                                db.query(sqlDeleteImages, idProduct, (errDeleteImg, resDeleteImg) => {
                                                    if (errDeleteImg) {
                                                        console.log('updateSmartphone', errDeleteImg);
                                                        status.updateSmartphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateSmartphone 789)'
                                                        res.send(status)

                                                    } else {
                                                        if (resDeleteImg.affectedRows > 0) {
                                                            // insert new images
                                                            // format values insert into database (bỏ ảnh đầu, ảnh đầu là ảnh avatar)
                                                            let images = []
                                                            for (let i = 0; i < imagesNameSaved.length; i++) {
                                                                imagesNameSaved[i].push(idProduct)
                                                                images.push(imagesNameSaved[i])
                                                            }
                                                            //insert anhsanpham database
                                                            const sqlInsertImages = 'INSERT INTO `anhsanpham`(`anh_asp`, `id_sp`) VALUES ?'
                                                            db.query(sqlInsertImages, [images], (errImages, resImages) => {
                                                                if (errImages) {
                                                                    console.log('updateSmartphone', errImages);
                                                                    status.updateSmartphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateSmartphone 901)'
                                                                    res.send(status)

                                                                } else {
                                                                    if (resImages.affectedRows > 0) {
                                                                        status.updateSmartphoneStatus = true
                                                                        status.updateSmartphoneMessage = 'Cập Nhật Thành Công'
                                                                        res.send(status)

                                                                    } else {
                                                                        status.updateSmartphoneMessage = 'Lỗi Hệ Thống (Lỗi: addSmartphone 012)'
                                                                        res.send(status)

                                                                    }
                                                                }
                                                            })

                                                        } else {
                                                            status.updateSmartphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateSmartphone 013)'
                                                            res.send(status)

                                                        }
                                                    }
                                                })

                                            } else {
                                                // send result
                                                status.updateSmartphoneStatus = true
                                                status.updateSmartphoneMessage = 'Cập Nhật Thành Công'
                                                res.send(status)
                                            }

                                        } else {
                                            status.updateSmartphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateSmartphone 014)'
                                            res.send(status)

                                        }
                                    }
                                })

                        } else {
                            status.updateSmartphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateSmartphone 015)'
                            res.send(status)
                        }

                    }
                })


            // not exist avatar update
        } else {
            const sqlUpdateProduct =
                `UPDATE 
                    sanpham 
                SET 
                    ten_sp= ?, gia_sp= ?, so_luong_sp= ?,
                    gioi_thieu_sp= ?, id_xx= ?,
                    id_km= ?, id_th= ?, id_ttsp= ?
                WHERE id_sp = ?`

            // update sanpham table
            db.query(sqlUpdateProduct,
                [
                    productName, productPrice, productNumber,
                    productIntro, productOrigin,
                    productPromotion, productTrademark, productStatus,
                    idProduct
                ],
                (errUpdateProduct, resUpdateProduct) => {
                    if (errUpdateProduct) {
                        console.log('updateSmartphone', errUpdateProduct);
                        status.updateSmartphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateSmartphone 016)'
                        res.send(status)

                    } else {
                        // update dienthoai table
                        if (resUpdateProduct.affectedRows > 0) {
                            const sqlUpdateSmartphone =
                                `UPDATE 
                                    dienthoai 
                                SET 
                                    id_bn= ?, id_ram= ?, id_hdh= ?,
                                    id_tk= ?, id_chip= ?, id_mh= ? 
                                WHERE id_sp = ?`
                            db.query(sqlUpdateSmartphone,
                                [
                                    productMemory, productRam, productOperatingSystem,
                                    productDesign, productChip, productSize,
                                    idProduct
                                ],
                                (errUpSmartphone, resUpSmartphone) => {
                                    if (errUpSmartphone) {
                                        console.log('updateSmartphone', errUpSmartphone);
                                        status.updateSmartphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateSmartphone 017)'
                                        res.send(status)

                                    } else {
                                        if (resUpSmartphone.affectedRows > 0) {
                                            // exist list images update => continue update images => anhsanpham table
                                            if (imagesNameSaved.length > 0) {
                                                // delete old images 
                                                const sqlDeleteImages =
                                                    `DELETE FROM anhsanpham WHERE id_sp = ?`
                                                db.query(sqlDeleteImages, idProduct, (errDeleteImg, resDeleteImg) => {
                                                    if (errDeleteImg) {
                                                        console.log('updateSmartphone', errDeleteImg);
                                                        status.updateSmartphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateSmartphone 018)'
                                                        res.send(status)

                                                    } else {
                                                        if (resDeleteImg.affectedRows > 0) {
                                                            // insert new images
                                                            // format values insert into database (bỏ ảnh đầu, ảnh đầu là ảnh avatar)
                                                            let images = []
                                                            for (let i = 0; i < imagesNameSaved.length; i++) {
                                                                imagesNameSaved[i].push(idProduct)
                                                                images.push(imagesNameSaved[i])
                                                            }
                                                            //insert anhsanpham database
                                                            const sqlInsertImages = 'INSERT INTO `anhsanpham`(`anh_asp`, `id_sp`) VALUES ?'
                                                            db.query(sqlInsertImages, [images], (errImages, resImages) => {
                                                                if (errImages) {
                                                                    console.log('updateSmartphone', errImages);
                                                                    status.updateSmartphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateSmartphone 019)'
                                                                    res.send(status)

                                                                } else {
                                                                    if (resImages.affectedRows > 0) {
                                                                        status.updateSmartphoneStatus = true
                                                                        status.updateSmartphoneMessage = 'Cập Nhật Thành Công'
                                                                        res.send(status)

                                                                    } else {
                                                                        status.updateSmartphoneMessage = 'Lỗi Hệ Thống (Lỗi: addSmartphone 021)'
                                                                        res.send(status)

                                                                    }
                                                                }
                                                            })

                                                        } else {
                                                            status.updateSmartphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateSmartphone 022)'
                                                            res.send(status)

                                                        }
                                                    }
                                                })

                                            } else {
                                                // send result
                                                status.updateSmartphoneStatus = true
                                                status.updateSmartphoneMessage = 'Cập Nhật Thành Công'
                                                res.send(status)
                                            }

                                        } else {
                                            status.updateSmartphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateSmartphone 023)'
                                            res.send(status)

                                        }
                                    }
                                })

                        } else {
                            status.updateSmartphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateSmartphone 024)'
                            res.send(status)
                        }

                    }
                })
        }

    } else {
        console.log('updateSmartphone', req.uploadAvatarAndImagesMessage);
        status.addSmartphoneMessage = 'Chỉ cho phép tải lên 10 ảnh và dưới 2MB'
        res.send(status)

    }
}


module.exports = {
    updateSmartphone,
}