const mongoose = require("mongoose")

const connectToDatabase = async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/VRV_Security', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database Connected")
    } catch (error) {
        console.log("Error")
        
    }
}

module.exports = connectToDatabase;