const exp=require("express")
const productApi=exp.Router();
const expressErrorHandler=require('express-async-handler')
productApi.use(exp.json())
const multerObj=require("./middlewares/multerCloudinary")


productApi.post("/add-product",multerObj.single('photo'),expressErrorHandler(async(req,res,next)=>{
    let productCollectionObject = req.app.get("productCollectionObject")
    let newProduct = JSON.parse(req.body.prodObj);

    //search
    let product=await productCollectionObject.findOne({model:newProduct.model})

    if(product!==null){
        res.send({message:"Product already existed"})
    }else{
        newProduct.productImage=req.file.path;
        delete newProduct.photo;
        await productCollectionObject.insertOne(newProduct);
        res.send({message:"New Product added"})
    }
}))


//to read all products
productApi.get("/getproducts", expressErrorHandler(async (req, res, next) => {

    let productCollectionObject = req.app.get("productCollectionObject")

    let products = await productCollectionObject.find().toArray()

    res.send({ message: products })

}))


module.exports=productApi;