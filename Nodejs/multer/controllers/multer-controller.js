const File = require('../models/multer-models');
const { uploadToCloudinary } = require('../utils/cloudinary');
const fs = require('fs');
const logger = require('../configs/logger')

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      logger.warn('⚠️ Upload attempt without file');
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const cloudinaryResult = await uploadToCloudinary(req.file.path);

    if (!cloudinaryResult) {
      logger.error('❌ Cloudinary upload failed for file: %s', req.file.originalname);
      return res.status(500).json({ message: 'Failed to upload to Cloudinary' });
    }

    // Save file metadata
    const fileData = new File({
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      cloudinaryUrl: cloudinaryResult.secure_url,
      cloudinaryId: cloudinaryResult.public_id,
    });

    const savedFile = await fileData.save();
    logger.info('💾 File metadata saved for: %s', savedFile);

    fs.unlinkSync(req.file.path); // cleanup local file

    logger.info('✅ File uploaded: %s (%d bytes)', savedFile.originalname, savedFile.size);

    return res.status(201).json({
      message: 'File uploaded successfully',
      file: savedFile,
    });
  } catch (error) {
    logger.error('❌ Error in uploadFile: %s', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc Get all uploaded files
// @route GET /files
// @access Public
const getFiles = async (req, res) => {
    try {
        const files = await File.find().sort({ uploadDate: -1 });
        return res.status(200).json(files);
    } catch (error) {
        console.error('Error fetching files:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc Get file by ID
// @route GET /files/:id
// @access Public
const getFileById = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        return res.status(200).json(file);
    } catch (error) {
        console.error('Error fetching file:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc Delete file by ID
// @route DELETE /files/:id
// @access Public
const deleteFile = async (req, res) => {
    try {
        const file = await File.findByIdAndDelete(req.params.id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        return res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Error deleting file:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    uploadFile,
    getFiles,
    getFileById,
    deleteFile
};
