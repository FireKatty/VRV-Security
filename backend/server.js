const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 5432;


const authRoutes = require("./routes/authRoutes");
const dataRoutes = require("./routes/dataRoutes")

const connectToDatabase = require("./db/connectDatabase");

app.use('/api/auth',authRoutes);
app.use('/api/data',dataRoutes);

app.listen(PORT,()=>{
    connectToDatabase();
    console.log("server is started")
});