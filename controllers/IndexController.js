const { ArticleModel } = require("../models/ArticleModel");

class IndexController{
    async indexView(req,res){
        let articles=await ArticleModel.find().sort(`-createdAt`).lean();
        res.render('index',{articles});
    }
}

module.exports=new IndexController()