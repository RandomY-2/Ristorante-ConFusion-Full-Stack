const express = require("express");
const authenticate = require("../authenticate");
const multer = require("multer");
const {
  postImage,
  uploadUnsupportedHandler,
} = require("../controllers/uploadController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("You can upload only image files!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter });
const uploadRouter = express.Router();

uploadRouter.use(express.json({ extended: false }));
uploadRouter.use(express.urlencoded({ extended: false }));

uploadRouter.get(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  uploadUnsupportedHandler
);
uploadRouter.post(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  upload.single("imageFile"),
  postImage
);
uploadRouter.put(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  uploadUnsupportedHandler
);
uploadRouter.delete(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  uploadUnsupportedHandler
);

module.exports = uploadRouter;
