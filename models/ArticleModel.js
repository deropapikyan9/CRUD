const {Schema,model}=require(`mongoose`);

let ArticleSchema=new Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    content:{
        type:String,
    },
    image:{
        type:String
    }
},{
    timestamps:true
})

let ArticleModel=model(`articles`,ArticleSchema);

module.exports={
    ArticleModel
}