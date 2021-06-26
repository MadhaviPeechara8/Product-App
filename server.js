//create express app
const exp = require("express")
const app = exp();
const path = require("path")
require("dotenv").config()

//connect angular app with express server
app.use(exp.static(path.join(__dirname, './dist/MEAN-APP/')))

//import APIS
const userApi = require("./APIS/user-api")
const productApi=require("./APIS/product-api")

//import MongoCLient
const mc = require("mongodb").MongoClient;



//connection string
const databaseUrl = process.env.DATABASE_URL

//const databaseUrl="mongodb://<username>:<password>@cluster0-shard-00-00.rjvoz.mongodb.net:27017,cluster0-shard-00-01.rjvoz.mongodb.net:27017,cluster0-shard-00-02.rjvoz.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"



//connect to DB
mc.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {

    if (err) {
        console.log("err in db connection", err);
    }
    else {
        //get database object
        let databaseObj = client.db("MyFirstdb")
        //create usercollection object

        let userCollectionObj = databaseObj.collection("usercollection")
        let adminCollection = databaseObj.collection("admincollection")
        let productCollectionObject = databaseObj.collection("productcollection")
        let usercartcollectionObject=databaseObj.collection("usercartcollection")

        app.set("userCollectionObj", userCollectionObj)
        app.set("adminCollection", adminCollection)
        app.set("productCollectionObject", productCollectionObject)
        app.set("usercartcollectionObject",usercartcollectionObject)
        console.log("connected to database")

    }
})

//execute specific api based on path
app.use("/user", userApi)
app.use("/product",productApi)

//invalid path
app.use((req, res, next) => {

    res.send({ message: `path ${req.url} is invalid` })
})

//error handling middleware
app.use((err, req, res, next) => {
    res.send({ message: `error is ${err.message}` })
})


//assign port
const port = process.env.PORT;
app.listen(port, () => console.log(`server on ${port}...`))