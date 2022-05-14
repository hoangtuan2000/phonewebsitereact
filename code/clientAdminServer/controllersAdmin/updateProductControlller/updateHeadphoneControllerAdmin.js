const db = require('../../../models')

const updateHeadphone = async (req, res) => {

    let status = {
        updateHeadphoneStatus: false,
        updateHeadphoneMessage: ''
    }

    let {
        idProduct, productName, productPrice, productNumber,
        productOrigin, productStatus, productIntro,
        productTrademark, productPromotion, productConnectionType
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
                        console.log('updateHeadphone', errUpdateProduct);
                        status.updateHeadphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateHeadphone 123)'
                        res.send(status)

                    } else {
                        // update tainghe table
                        if (resUpdateProduct.affectedRows > 0) {
                            const sqlUpdateHeadphone =
                                `UPDATE tainghe SET id_lkn= ? WHERE id_sp = ?`
                            db.query(sqlUpdateHeadphone,
                                [
                                    productConnectionType, idProduct
                                ],
                                (errUpHeadphone, resUpHeadphone) => {
                                    if (errUpHeadphone) {
                                        console.log('updateHeadphone', errUpHeadphone);
                                        status.updateHeadphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateHeadphone 456)'
                                        res.send(status)

                                    } else {
                                        if (resUpHeadphone.affectedRows > 0) {
                                            // exist list images update => continue update images => anhsanpham table
                                            if (imagesNameSaved.length > 0) {
                                                // delete old images 
                                                const sqlDeleteImages =
                                                    `DELETE FROM anhsanpham WHERE id_sp = ?`
                                                db.query(sqlDeleteImages, idProduct, (errDeleteImg, resDeleteImg) => {
                                                    if (errDeleteImg) {
                                                        console.log('updateHeadphone', errDeleteImg);
                                                        status.updateHeadphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateHeadphone 789)'
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
                                                                    console.log('updateHeadphone', errImages);
                                                                    status.updateHeadphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateHeadphone 901)'
                                                                    res.send(status)

                                                                } else {
                                                                    if (resImages.affectedRows > 0) {
                                                                        status.updateHeadphoneStatus = true
                                                                        status.updateHeadphoneMessage = 'Cập Nhật Thành Công'
                                                                        res.send(status)

                                                                    } else {
                                                                        status.updateHeadphoneMessage = 'Lỗi Hệ Thống (Lỗi: addHeadphone 012)'
                                                                        res.send(status)

                                                                    }
                                                                }
                                                            })

                                                        } else {
                                                            status.updateHeadphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateHeadphone 013)'
                                                            res.send(status)

                                                        }
                                                    }
                                                })

                                            } else {
                                                // send result
                                                status.updateHeadphoneStatus = true
                                                status.updateHeadphoneMessage = 'Cập Nhật Thành Công'
                                                res.send(status)
                                            }

                                        } else {
                                            status.updateHeadphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateHeadphone 014)'
                                            res.send(status)

                                        }
                                    }
                                })

                        } else {
                            status.updateHeadphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateHeadphone 015)'
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
                        console.log('updateHeadphone', errUpdateProduct);
                        status.updateHeadphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateHeadphone 016)'
                        res.send(status)

                    } else {
                        // update tainghe table
                        if (resUpdateProduct.affectedRows > 0) {
                            const sqlUpdateHeadphone =
                                `UPDATE tainghe SET id_lkn= ? WHERE id_sp = ?`
                            db.query(sqlUpdateHeadphone,
                                [
                                    productConnectionType, idProduct
                                ],
                                (errUpHeadphone, resUpHeadphone) => {
                                    if (errUpHeadphone) {
                                        console.log('updateHeadphone', errUpHeadphone);
                                        status.updateHeadphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateHeadphone 017)'
                                        res.send(status)

                                    } else {
                                        if (resUpHeadphone.affectedRows > 0) {
                                            // exist list images update => continue update images => anhsanpham table
                                            if (imagesNameSaved.length > 0) {
                                                // delete old images 
                                                const sqlDeleteImages =
                                                    `DELETE FROM anhsanpham WHERE id_sp = ?`
                                                db.query(sqlDeleteImages, idProduct, (errDeleteImg, resDeleteImg) => {
                                                    if (errDeleteImg) {
                                                        console.log('updateHeadphone', errDeleteImg);
                                                        status.updateHeadphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateHeadphone 018)'
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
                                                                    console.log('updateHeadphone', errImages);
                                                                    status.updateHeadphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateHeadphone 019)'
                                                                    res.send(status)

                                                                } else {
                                                                    if (resImages.affectedRows > 0) {
                                                                        status.updateHeadphoneStatus = true
                                                                        status.updateHeadphoneMessage = 'Cập Nhật Thành Công'
                                                                        res.send(status)

                                                                    } else {
                                                                        status.updateHeadphoneMessage = 'Lỗi Hệ Thống (Lỗi: addHeadphone 021)'
                                                                        res.send(status)

                                                                    }
                                                                }
                                                            })

                                                        } else {
                                                            status.updateHeadphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateHeadphone 022)'
                                                            res.send(status)

                                                        }
                                                    }
                                                })

                                            } else {
                                                // send result
                                                status.updateHeadphoneStatus = true
                                                status.updateHeadphoneMessage = 'Cập Nhật Thành Công'
                                                res.send(status)
                                            }

                                        } else {
                                            status.updateHeadphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateHeadphone 023)'
                                            res.send(status)

                                        }
                                    }
                                })

                        } else {
                            status.updateHeadphoneMessage = 'Lỗi Hệ Thống (Lỗi: updateHeadphone 024)'
                            res.send(status)
                        }

                    }
                })
        }

    } else {
        console.log('updateHeadphone', req.uploadAvatarAndImagesMessage);
        status.addHeadphoneMessage = 'Chỉ cho phép tải lên 10 ảnh và dưới 2MB'
        res.send(status)

    }
}


module.exports = {
    updateHeadphone,
}