const cloudinary = require('../configs/cloudinaryConfig');

async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return res;
  }

const uploadImage = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        const {url} = cldRes
        res.status(201).json({url});

      } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });

      }
};

module.exports = { uploadImage }
