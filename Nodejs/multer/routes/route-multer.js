const express = require('express')
const { upload } = require('../middlewares/multer-middleware')
const router = express.Router()


const {
    uploadFile,
    getFiles,
    getFileById,
    deleteFile
} = require('../controllers/multer-controller');

// Upload file
router.post('/upload', upload.single('file'), uploadFile);

// Get all files
router.get('/files', getFiles);

// Get single file
router.get('/files/:id', getFileById);

// Delete file
router.delete('/files/:id', deleteFile);

module.exports = router;
