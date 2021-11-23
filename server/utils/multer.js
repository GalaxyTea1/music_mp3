const multer = require('multer');
const path = require('path');

// Multer config
// module.exports = multer({
//     storage: multer.diskStorage({}),
//     fileFilter: (req, file, cb) => {
//         let ext = path.extname(file.originalname);
//         if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
//             cb(new Error('File type is not supported'), false);
//             return;
//         }
//         cb(null, true);
//     },
// });

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cd) => {
        if (file.mimetype.matc(/png||jpeg||jpg||webp||mp3||gif$i/)) {
            cb(new Error('File does not supported'), false);
            return;
        }

        cb(null, true);
    },
});
