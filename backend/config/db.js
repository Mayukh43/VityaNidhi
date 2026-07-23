const mongoose=require('mongoose');

const connectdb=async()=>{

    try{
        await mongoose.connect(process.env.dburl);
        console.log("mongodb connected");
    }
    catch(err)
    {
        console.log(err);
    }
}
module.exports=connectdb;