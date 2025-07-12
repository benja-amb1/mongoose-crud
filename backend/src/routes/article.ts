import express from 'express';
import multer from 'multer';
import { addArticle, deleteArticle, updateArticle } from '../controllers/article';

// configure Multer storage
const storage = multer.diskStorage({
  // 1. destination → folder where uploaded files will be saved
  destination: function (req, file, cb) {
    // always pass null as the first argument (no error), second is the folder path
    cb(null, './images/articles'); // make sure this folder exists (always at the root of the project)
  },

  // 2. filename → define the name of the saved file
  filename: function (req, file, cb) {
    // prefix the file with a timestamp to avoid name conflicts
    cb(null, 'articles' + Date.now() + '_' + file.originalname);
  }
});

// create a multer instance with the storage configuration
const upload = multer({ storage });

const router = express.Router();

/*
  multer provides two main methods:
  - upload.single('fieldName') → for uploading a single file
  - upload.array('fieldName', maxCount) → for uploading multiple files

  'file0' is the field name the frontend must use in the FormData.
*/

router.post('/add-article', upload.array('file0', 10), addArticle); // works ✅

router.delete('/delete-article/:id', deleteArticle); // works ✅

router.put('/update-article/:id', upload.array('file0', 10), updateArticle); // works ✅


export default router;
