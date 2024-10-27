const mongoose = require("mongoose");
require('dotenv').config()
// async function main() {
//     await mongoose.connect('mongodb+srv://hiteshchangrani:admin@cluster0.c0vwrvt.mongodb.net/'); 
// }

const connectDb = async () => {
    try {
      await mongoose.connect(process.env.DB_URL, {
        serverSelectionTimeoutMS: 30000, // 30 seconds
        socketTimeoutMS: 45000 // 45 seconds
      });
      console.log("Server is connected to the database");
    } catch (err) {
      console.log("Server is not connected to the database", err.message);
    }
  };
connectDb();


const userSchema = new mongoose.Schema({
    email: String,
    password: String,   
    firstName: String,
    lastName: String,
})

const blogSchema = new mongoose.Schema({
    email: String,
    title: String,
    author: String,
    blog: String,
    date: Date
})

const User = mongoose.model('User', userSchema);
const Blog = mongoose.model('Blog', blogSchema);

module.exports = {
    User,
    Blog
}