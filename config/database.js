const mongoose =require("mongoose");

const connectDatabase =( )=>{
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.DB_URI, {
    }).then((data) => {
        console.log(`MongoDB is connect with server ${data.connection.host}`);
    }) 
}
 
module.exports =connectDatabase