import mongoose from "mongoose"

export const connectDb = async () => {
    try {
await mongoose.connect(process.env.MONGO_URI); 
{
    console.log("database connect successfully!")
}
    } catch (error) {
        console.log("database failed to connect", error);
       process.exit(1); 
    }
}//ayodeji247
//mongodb+srv://malikayodeji2003_db_user:ayodeji247@cluster0.wbssbun.mongodb.net/?appName=Cluster0