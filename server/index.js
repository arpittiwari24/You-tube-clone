import  express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/videos.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"

const app = express()
dotenv.config()

const connect = () => {
    mongoose.connect(process.env.MONGO).then( () => {
        console.log("connected to db")
    })
    .catch(err => {
        throw err;
    });
};

app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/videos",videoRoutes)
app.use("/api/comments",commentRoutes)

app.listen(8800,() => {
    connect()
    console.log("Server started");
});