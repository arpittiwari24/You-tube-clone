import mongoose from "mongoose"
import User from "../models/User.js"
import bcrypt from "bcryptjs"

export const signup = async (req,res,next) => {
    try{
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({...req.body, password: hash})

        await newUser.save();
        res.send(200).send("user has been created");
    }catch(err){
        next(err)
    }
}

export const signin = async (req,res,next) => {
    try{
        const user = await User.findOne({name: req.body.name})
        if(!user) return next(404,"not found")

        const isCorrect = await bcrypt.compare(req.body.password,user.password)

        if(!isCorrect) return next(400,"incorrect password")

        const token = jwt.sign({id:user._id},process.env.JWT)
        const {password,...others} = user._doc

        res.cookie("access_token",token,{
            httpOnly: true
        }).status(200).json(others)
    }catch(err){
        next(err)
    }
}