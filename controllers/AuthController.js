const { UserModel } = require("../models/UserModel");
const bcrypt=require(`bcryptjs`)

class AuthController{

    registerView(req,res){
        let message=""
        res.render(`register`,{message})
    }

   async  registerNewUser(req,res){
    try{
       //coding with algoritm
       let hashPassword=bcrypt.hashSync(req.body.password);
       let newUser=new UserModel({
           username:req.body.username,
           email:req.body.email,
           password:hashPassword,
       })
       let savedUser=await newUser.save();
        res.redirect(`/auth/login`)
     }catch(err){
        res.render(`register`,{message:err.message})
     }     
    }


    loginView(req,res){
        let message=""
        res.render(`login`,{message})
    }

    //login
    async loginUser(req,res){
        try{
         let email=req.body.email;
         let user= await UserModel.findOne({email:email});

         //user is null not founded
         if(!user){
           return  res.render(`login`,{message:`Invalid Email or Password`}) 
         } 

         //if founded

         let okPassword=bcrypt.compareSync(req.body.password,user.password);

         if(!okPassword){
            return  res.render(`login`,{message:`Invalid Email or Password`}) 
         }

         req.session.user=user
         
         res.redirect(`/admin`)
         

        }catch(err){
            res.render(`login`,{message:err.message}) 
        }
        
    }
    logOut(req,res){
        req.session.destroy();
        res.redirect(`/`)
    }
}

module.exports=new AuthController()