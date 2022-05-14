const db = require('../../../models')

const updatePhonecase = async (req, res) => {

    let status = {
        updatePhonecaseStatus: false,
        updatePhonecaseMessage: ''
    }

    let {
        idProduct, productName, productPrice, productNumber,
        productOrigin, productStatus, productIntro,
        productTrademark, productPromotion, productMaterial
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
                        console.log('updatePhonecase', errUpdateProduct);
                        status.updatePhonecaseMessage = 'Lỗi Hệ Thống (Lỗi: updatePhonecase 123)'
                        res.send(status)

                    } else {
                        // update tainghe table
                        if (resUpdateProduct.affectedRows > 0) {
                            const sqlUpdatePhonecase =
                                `UPDATE oplung SET id_cl = ? WHERE  id_sp = ?`
                            db.query(sqlUpdatePhonecase,
                                [
                                    productMaterial, idProduct
                                ],
                                (errUpPhonecase, resUpPhonecase) => {
                                    if (errUpPhonecase) {
                                        console.log('updatePhonecase', errUpPhonecase);
                                        status.updatePhonecaseMessage = 'Lỗi Hệ Thống (Lỗi: updatePhonecase 456)'
                                        res.send(status)

                                    } else {
                                        if (resUpPhonecase.affectedRows > 0) {
                                            // exist list images update => continue update images => anhsanpham table
                                            if (imagesNameSaved.length > 0) {
                                                // delete old images 
                                                const sqlDeleteImages =
                                                    `DELETE FROM anhsanpham WHERE id_sp = ?`
                                                db.query(sqlDeleteImages, idProduct, (errDeleteImg, resDeleteImg) => {
                                                    if (errDeleteImg) {
                                                        console.log('updatePhonecase', errDeleteImg);
                                                        status.updatePhonecaseMessage = 'Lỗi Hệ Thống (Lỗi: updatePhonecase 789)'
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
                                                                    console.log('updatePhonecase', errImages);
                                                                    status.updatePhonecaseMessage = 'Lỗi Hệ Thống (Lỗi: updatePhonecase 901)'
                                                                    res.send(status)

                                                                } else {
                                                                    if (resImages.affectedRows > 0) {
                                                                        status.updatePhonecaseStatus = true
                                                                        status.updatePhonecaseMessage = 'Cập Nhật Thành Công'
                                                                        res.send(status)

                                                                    } else {
                                                                        status.updatePhonecaseMessage = 'Lỗi Hệ Thống (Lỗi: addPhonecase 012)'
                                                                        res.send(status)

                                                                    }
                                                                }
                                                            })

                                                        } else {
                                                            status.updatePhonecaseMessage = 'Lỗi Hệ Thống (Lỗi: updatePhonecase 013)'
                                                            res.send(status)

                                                        }
                                                    }
                                                })

                                            } else {
                                                // send result
                                                status.updatePhonecaseStatus = true
                                                status.updatePhonecaseMessage = 'Cập Nhật Thành Công'
                                                res.send(status)
                                            }

                                        } else {
                                            status.updatePhonecaseMessage = 'Lỗi Hệ Thống (Lỗi: updatePhonecase 014)'
                                            res.send(status)

                                        }
                                    }
                                })

                        } else {
                            status.updatePhonecaseMessage = 'Lỗi Hệ Thống (Lỗi: updatePhonecase 015)'
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
                        console.log('updatePhonecase', errUpdateProduct);
                        status.updatePhonecaseMessage = 'Lỗi Hệ Thống (Lỗi: updatePhonecase 016)'
                        res.send(status)

                    } else {
                        // update tainghe table
                        if (resUpdateProduct.affectedRows > 0) {
                            const sqlUpdatePhonecase =
                                `UPDATE oplung SET id_cl = ? WHERE  id_sp = ?`
                            db.query(sqlUpdatePhonecase,
                                [
                                    productMaterial, idProduct
                                ],
                                (errUpPhonecase, resUpPhonecase) => {
                                    if (errUpPhonecase) {
                                        console.log('updatePhonecase', errUpPhonecase);
                                        status.updatePhonecaseMessage = 'Lỗi Hệ Thống (Lỗi: updatePhonecase 017)'
                                        res.send(status)

                                    } else {
                                        if (resUpPhonecase.affectedRows > 0) {
                                            // exist list images update => continue update images => anhsanpham table
                                            if (imagesNameSaved.length > 0) {
                                                // delete old images 
                                                const sqlDeleteImages =
                                                    `DELETE FROM anhsanpham WHERE id_sp = ?`
                                                db.query(sqlDeleteImages, idProduct, (errDeleteImg, resDeleteImg) => {
                                                    if (errDeleteImg) {
                                                        console.log('updatePhonecase', errDeleteImg);
                                                        status.updatePhonecaseMessage = 'Lỗi Hệ Thống (Lỗi: updatePhonecase 018)'
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
                                                                    console.log('updatePhonecase', errImages);
                                                                    status.updatePhonecaseMessage = 'Lỗi Hệ Thống (Lỗi: updatePhonecase 019)'
                                                                    res.send(status)

                                                                } else {
                                                                    if (resImages.affectedRows > 0) {
                                                                        status.updatePhonecaseStatus = true
                                                                        status.updatePhonecaseMessage = 'Cập Nhật Thành Công'
                                                                        res.send(status)

                                                                    } else {
                                                                        status.updatePhonecaseMessage = 'Lỗi Hệ Thống (Lỗi: addPhonecase 021)'
                                                                        res.send(status)

                                                                    }
                                                                }
                                                            })

                                                        } else {
                                                            status.updatePhonecaseMessage = 'Lỗi Hệ Thống (Lỗi: updatePhonecase 022)'
                                                            res.send(status)

                                                        }
                                                    }
                                                })

                                            } else {
                                                // send result
                                                status.updatePhonecaseStatus = true
                                                status.updatePhonecaseMessage = 'Cập Nhật Thành Công'
                                                res.send(status)
                                            }

                                        } else {
                                            status.updatePhonecaseMessage = 'Lỗi Hệ Thống (Lỗi: updatePhonecase 023)'
                                            res.send(status)

                                        }
                                    }
                                })

                        } else {
                            status.updatePhonecaseMessage = 'Lỗi Hệ Thống (Lỗi: updatePhonecase 024)'
                            res.send(status)
                        }

                    }
                })
        }

    } else {
        console.log('updatePhonecase', req.uploadAvatarAndImagesMessage);
        status.addPhonecaseMessage = 'Chỉ cho phép tải lên 10 ảnh và dưới 2MB'
        res.send(status)

    }
}


module.exports = {
    updatePhonecase,
}