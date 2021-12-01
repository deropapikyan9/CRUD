const multer=require(`multer`);
const path=require(`path`)

let Storage=multer.diskStorage({
    destination:path.join(__dirname,`..`,`/public/images`),
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname)
    }
})

let upload=multer({
    storage:Storage,
    limits:4*1024*1024,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype.startsWith(`image`)){
            cb(null, true)
        }else{
            cb(null, false)
        }
    }
}).single(`image`);

module.exports={
    upload
}