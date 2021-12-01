const { ArticleModel}=require(`../models/ArticleModel`)

class AdminController{
    async adminView(req,res){
        console.log(req.session.user.username);
        let articles=await ArticleModel.find().sort(`-createdAt`).lean();
        let username=req.session.user.username;
        res.render('admin',{username,articles})
    }
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    createArticleView(req,res){
        res.render(`articleCreate`)
    }

    async saveNewArticle(req,res){
     try{
      let imageName;
      console.log(`req,file`,req.file)
       if(req.file.filename){
             imageName=req.file.filename
       }else{
           imageName=""
       }
       let article=new ArticleModel({
           title:req.body.title,
           description:req.body.description,
           content:req.body.content,
           image:imageName

       })
      let newArticle= await article.save();
      console.log(newArticle);
       res.redirect("/admin")
      }catch(err){
        console.log(err.message);
        res.redirect(`/admin/createArticle`)
      }
    }


    async updateArticleView(req,res){
        
        let id=req.params.id;
        let article=await ArticleModel.findOne({_id:id});
        console.log(46,article);
        res.render(`articleUpdate`,{article})
    }

    async updateArticleDb(req,res){
        console.log(54,req.body);
       let id=req.body.id;
       console.log(55,id);
       let article=await ArticleModel.findOne({_id:id});  
       console.log(56,article)
       try{ 
       
        article.title=req.body.title;
        article.description=req.body.description;
        article.content=req.body.content;
        if(req.file){
            article.image=req.file.filename; 
        }
        await article.save();
        res.redirect(`/admin`)
     }catch(err){
         console.log(err);
         res.render(`articleUpdate`,{article})
         
     }
       
    }

    async deleteArticle(req,res){
       try{ 
        let id=req.params.id;
        await ArticleModel.deleteOne({_id:id});
        res.redirect("/admin")
       }catch(err){
           console.log(err);
           res.redirect("/admin")
       } 
    }


    //read

    async readArticleView(req,res){
        
        let id=req.params.id;
        let article=await ArticleModel.findOne({_id:id});
        res.render(`articleRead`,{article})
    }
}

module.exports=new AdminController();