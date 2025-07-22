import multer from "multer";
import path from "path";
import crypto from "crypto"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12,(err,bytes)=>{
      const fn=bytes.toString("hex")+path.extname(file.originalname)
      cb(null, fn);

    })
    
  },
});

const upload = multer({ storage: storage });

export default upload;
