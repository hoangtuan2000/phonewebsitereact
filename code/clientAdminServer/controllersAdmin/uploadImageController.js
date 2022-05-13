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
const upload = multer({ storage: storage, fileFilter: imageFilter, limits: { fileSize: 2000000 } })

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
            for (let i = 0; i < req.files.length; i++) {
                let array = []
                array.push('/images/' + req.files[i].filename)
                imagesNameSaved.push(array)
            }
            req.imagesNameSaved = imagesNameSaved
            next();
        }
    })
}

const uploadAvatarAndImages = async (req, res, next) => {
    upload.fields([{ name: 'productDefaultImage', maxCount: 1 }, { name: 'productImages', maxCount: 9 }])(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            req.uploadAvatarAndImagesMessage = err
            req.uploadAvatarAndImagesStatus = false
            next()
        } else if (err) {
            console.log('uploadAvatarAndImages abc', err);
        }
        else {
            // req.uploadAvatarAndImagesStatus = true
            // req.avatarNameSaved = ''
            // // If choose a avatar image => update 
            // if(req.file.length > 0){
            //     req.avatarNameSaved = '/images/' + req.file.filename
            // }

            // let imagesNameSaved = []
            // // If choose a list images => update 
            // for(let i = 0; i< req.files.length; i++){
            //     let array = []
            //     array.push('/images/' + req.files[i].filename)
            //     imagesNameSaved.push(array)
            // }
            // req.imagesNameSaved = imagesNameSaved

            if (req.files['productDefaultImage']) {
                console.log('ok productDefaultImage');
                console.log(req.files['productDefaultImage'][0]);
            }else{
                console.log('not productDefaultImage');
                
            }
            
            if (req.files['productImages']) {
                console.log('ok productImages');
                console.log(req.files['productImages']);
            }else{
                console.log('not productImages');

            }
            // next();
        }
    })
}

module.exports = { uploadMultipleImages, uploadAvatarAndImages }