import mongoose from "mongoose";

export const connetDB=async()=>{
try {

    await mongoose.connect(process.env.MONGO_URL)
    console.log("mongodb conected succesfully")
    
} catch (error) {
    console.log(error)
}
}



