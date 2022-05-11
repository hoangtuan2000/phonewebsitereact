const db = require('../../models')

const addSmartphone = async (req, res) => {

    let status = {
        addSmartphoneStatus: false,
        addSmartphoneData: '',
        addSmartphoneMessage: ''
    }

    // let productName = req.body.productName
    // let productPrice = req.body.productPrice
    // let productNumber = req.body.productNumber
    // let productOrigin = req.body.productOrigin
    // let productMemory = req.body.productMemory
    // let productRam = req.body.productRam
    // let productTrademark = req.body.productTrademark
    // let productOperatingSystem = req.body.productOperatingSystem
    // let productDesign = req.body.productDesign
    // let productChip = req.body.productChip
    // let productSize = req.body.productSize
    // let productPromotion = req.body.productPromotion
    // let productIntro = req.body.productIntro
    
    // upload images success
    // if(req.uploadImages) {
        // images name is saved in folder
        // let imagesNameSaved = req.imagesNameSaved
        // console.log(imagesNameSaved);
        // console.log('sadsa', productName);
        // console.log(productPrice);
        // console.log(productNumber);
        // console.log(productOrigin);
        // console.log(productMemory);
        // console.log(productRam);
        // console.log(productTrademark);
        // console.log(productOperatingSystem);
        // console.log(productDesign);
        // console.log(productChip);
        // console.log(productSize);
        // console.log(productPromotion);
        // console.log(productIntro);
        res.send('ok')
    // }

}

module.exports = {
    addSmartphone
}