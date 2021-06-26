//create mini express app
const exp = require('express')
const userApi = exp.Router();
const expressErrorHandler = require("express-async-handler")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()


const checkToken=require('./middlewares/verifyToken')
//import cloudinary
const cloudinary=require("cloudinary").v2;
const multer=require("multer")
const {CloudinaryStorage}=require("multer-storage-cloudinary")

//configure cloudinary
cloudinary.config({
    cloud_name:'dkuycoir3',
    api_key:'813488322345129',
    api_secret:'WkmhF_dOg58w30tasO937qaZRFs'
})
//configure multer-storage-cloudinary
const clStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async (req,file)=>{
        return {
            folder:"ecommerceapp",
            public_id:file.fieldname+'-'+Date.now()
        }
    }
})
//configure multer
const multerObj=multer({storage:clStorage})



//add body parsing middleware
userApi.use(exp.json())







//http://localhost:3000/user/getusers
//get users
userApi.get("/getusers", expressErrorHandler(async (req, res) => {
    let userCollectionObj=req.app.get("userCollectionObj")
    let userList = await userCollectionObj.find().toArray()
    res.send({ message: userList })

}))





//get user by username
userApi.get("/getuser/:username", expressErrorHandler(async (req, res, next) => {
    let userCollectionObj=req.app.get("userCollectionObj")
    //get username from url
    let un = req.params.username;
    //search
    let userObj = await userCollectionObj.findOne({ username: un })

    if (userObj === null) {
        res.send({ message: "User not existed" })
    }
    else {
        res.send({ message: userObj })
    }
}))



















//http://localhost:3000/user/createuser
//create user
userApi.post("/createuser", multerObj.single('photo'),expressErrorHandler(async (req, res, next) => {
    let userCollectionObj=req.app.get("userCollectionObj")
    //get user obj
    let newUser =JSON.parse(req.body.userObj);

    //search for existing user
    let user = await userCollectionObj.findOne({ username: newUser.username })
    //if user existed
    if (user !== null) {
        res.send({ message: "User already existed" });
    }
    else {
        //hash password
        let hashedPassword = await bcryptjs.hash(newUser.password, 7)
        //replace password
        newUser.password = hashedPassword;
        //add img url
        newUser.profileImage=req.file.path;
         delete newUser.photo;
        //insert
        await userCollectionObj.insertOne(newUser)
        res.send({ message: "User created" })
    }
}))




//http://localhost:3000/user/updateuser/<username>

userApi.put("/updateuser/:username", expressErrorHandler(async (req, res, next) => {
    let userCollectionObj=req.app.get("userCollectionObj")
    //get modified user
    let modifiedUser = req.body;
    //update
    await userCollectionObj.updateOne({ username: modifiedUser.username }, { $set: { ...modifiedUser } })
    //send res
    res.send({ message: "User modified" })

}))




//delete user
userApi.delete("/deleteuser/:username", expressErrorHandler(async (req, res) => {
    let userCollectionObj=req.app.get("userCollectionObj")
    //get username from url
    let un = req.params.username;
    //find the user
    let user = await userCollectionObj.findOne({ username: un })

    if (user === null) {
        res.send({ message: "User not existed" })
    }
    else {
        await userCollectionObj.deleteOne({ username: un })
        res.send({ message: "user removed" })
    }
}))




//user login
userApi.post('/login', expressErrorHandler(async (req, res) => {
    let userCollectionObj=req.app.get("userCollectionObj")
    //get user credetials
    let credentials = req.body;
    //search user by username
    let user = await userCollectionObj.findOne({ username: credentials.username })
    //if user not found
    if (user === null) {
        res.send({ message: "invalid username" })
    }
    else {
        //compare the password
        let result = await bcryptjs.compare(credentials.password, user.password)
        //if not matched
        if (result === false) {
            res.send({ message: "Invalid password" })
        }
        else {
            //create a token
            let signedToken = jwt.sign({ username: credentials.username }, process.env.SECRET, { expiresIn: 10 })
            //send token to client
            res.send({ message: "login success", token: signedToken, username: credentials.username, userObj: user })
        }

    }

}))


userApi.post("/add-to-cart",expressErrorHandler(async (req,res,next)=>{
    let usercartcollectionObject=req.app.get("usercartcollectionObject")
    let newProductObject=req.body;
    //console.log(newProductObject)

    let usercartObj=await usercartcollectionObject.findOne({username:newProductObject.username})
    if(usercartObj===null){
    let products=[];
    products.push(newProductObject.productObject);
    let newUsercartObj={username:newProductObject.username,products}
    //console.log(newUsercartObj)
    await usercartcollectionObject.insertOne(newUsercartObj)
    res.send({message:"New Product added"})
    }
    else{
        usercartObj.products.push(newProductObject.productObject)
        await usercartcollectionObject.updateOne({username:newProductObject.username},{$set:{...usercartObj}})
        res.send({message:"New Product added"})
    }
}))
//read cart items
userApi.get("/getproducts/:username",expressErrorHandler(async (req,res,next)=>{
    let usercartcollectionObject=req.app.get("usercartcollectionObject");
    let un=req.params.username;

    let userProdObj=await usercartcollectionObject.findOne({username:un});
    if(userProdObj===null){
        res.send({message:"Cart Empty"})
    }else{
        res.send({message:userProdObj})
    }
    
}))


userApi.get("/testing",checkToken,(req,res)=>{
    res.send({message:"This is protected data"})
})
//export
module.exports = userApi;