import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () =>{
    mongoose.set('strictQuery', true);         // FOR WARNING
    if(isConnected){
        console.log("Connected to DB");
        return;
    }

    try{
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "prompt_master",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true;
        console.log("Connect to DB");
    }catch(err){
        console.log("Not connect to DB - ", err)
    }
}