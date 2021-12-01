const express = require('express');
const router = express.Router();
const {adminView, createArticleView,readArticleView, saveNewArticle,updateArticleDb, updateArticleView, deleteArticle}=require(`../controllers/AdminController.js`);
const { checkSign } = require('../middlewares/auth.js');
const { upload } = require('../middlewares/upload.js');

/* GET home page. */
router.get('/',checkSign,  adminView);

//create new article view
router.get("/createArticle",checkSign,createArticleView)

//create new article save
router.post("/addNewArticle/",checkSign,upload, saveNewArticle)

//update article view
router.get(`/updateArticle/:id`,checkSign,updateArticleView)


//update article db
router.post(`/updateArticle`,checkSign,upload, updateArticleDb)

//delete

router.get(`/deleteArticle/:id`,deleteArticle)

//read article
router.get("/readArticle/:id",readArticleView)


module.exports = router;
