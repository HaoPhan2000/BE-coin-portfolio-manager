const express =require("express");
const cors =require("cors");
const app =express();
const mongoose =require("mongoose");
const morgan =require("morgan");
const dotenv=require("dotenv");
const bodyParser = require("body-parser");
const userRoutes= require("./routes/users");
const coinRoutes= require("./routes/coins");
const favoriteRoutes= require("./routes/favorites");
const transactionRoutes= require("./routes/transactions");



async function connectToDatabase() {
    try {
      dotenv.config();
      await mongoose.connect((process.env.Mongodb_url), {
      });
      console.log('Đã kết nối đến cơ sở dữ liệu MongoDB');
    } catch (error) {
      console.error('Lỗi kết nối đến cơ sở dữ liệu:', error.message);
    }
  }
connectToDatabase();
app.use(bodyParser.json({limit:"50mb"}))
app.use(cors())
app.use(morgan("common"))


app.use("/Api/User",userRoutes);

app.use("/Api/Coin",coinRoutes);

app.use("/Api/Favorite",favoriteRoutes);

app.use("/Api/Transaction",transactionRoutes);

app.listen(8000,()=>{
console.log("server đang chạy");
})

