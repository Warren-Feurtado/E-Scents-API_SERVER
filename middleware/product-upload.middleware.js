const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/product-image'));
    },
    filename: (req, file, cb) => {
        let ext = file.mimetype.split('/')[1];
        let filename = `${file.fieldname}-${Date.now()}.${ext}`;
        cb(null, filename);
    }
    // filename: (req, file, cb) => {
    //     let ext = path.extname(file.originalname);
    //     cb(null, file.originalname.split(ext)[0] + Date.now() + ext);
    // }
});

const multerFilter = (req, file, cb) => {
    if(file.mimetype == ('image/jpeg')){
        cb(null, true)
    } else{
        console.log('Unsupported File');
        cb(new Error('Unsupported file type. Only images may be uploaded'), false);
    }
};

let upload = multer({
    storage: storage,
    fileFilter: multerFilter,
    limits: {
        fieldSize: 1024 * 1024 * 20
    },
});

module.exports = upload;


