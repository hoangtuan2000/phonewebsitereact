// const db = require('../models/index')

const multer = require('multer')

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        // callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        const ext = file.mimetype.split("/")[1];
        const name = file.originalname.split(".")[0];
        callBack(null, `test-${name}-${Date.now()}.${ext}`);
    }
})

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let uploadMultipleFiles = multer({ storage: storage, fileFilter: imageFilter, limits: { fileSize: 5000000 } }).array('productImages', 9);


const uploadMultipleImages = async (req, res, next) => {
    uploadMultipleFiles(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            req.uploadMultipleImagesMessage = err
            req.uploadMultipleImagesStatus = false
            next()
        }
        else {
            req.uploadMultipleImagesStatus = true
            let imagesNameSaved = []
            for(let i = 0; i< req.files.length; i++){
                let array = []
                array.push('/images/' + req.files[i].filename)
                imagesNameSaved.push(array)
            }
            req.imagesNameSaved = imagesNameSaved
            next();
        }
    })
}

module.exports = { uploadMultipleImages }