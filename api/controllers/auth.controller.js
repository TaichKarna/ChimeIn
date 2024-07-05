const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const errorHandler = require('../utils/error')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const signup = async (req, res, next) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password || password === '' || email === '' || username === ''){
        next(errorHandler(400,"All fields are required"));
    }

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        const user = new User({username: username,
            email: email,
           password: hashedPassword});

        try{
            await user.save();
            res.json({message: "Signup successful"})
        }
        catch (error){
            next(error)
        }

      });
 
}



const signin = async (req, res, next) => {
    const { email, password} = req.body;

    if( !email || !password || password === '' || email === ''){
        next(errorHandler(400,"All fields are required"));
    }

    try{
        const validUser = await User.findOne({email});
        if(!validUser){
          return  next(errorHandler(404,"User not found"))
        }

        const validPassword = await bcrypt.compare(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(400,"Incorrect Password"))
        }

        const {password: pass, ...rest} = validUser._doc;

        const token = jwt.sign(
        {id: validUser._id, isAdmin: validUser.isAdmin}, process.env.JWT_SECRET_KEY
        )

        res.status(200).cookie("access_token",token,{
         httpOnly: true 
        }).json(rest);

    } catch(error) {
        next(error);
    }

}

const google = async (req, res, next) => {
    const {name, email, googlePhotoUrl} = req.body;

    try{
        const user = await User.findOne({email});

        if(user){
            const token = jwt.sign(
                {id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET_KEY
                ); 

            const {password, ...rest} = user._doc;
            res.status(200).cookie('access_token',token,{
                httpOnly: true
            }).json(rest);

        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            bzcrypt.hash(generatedPassword, 10, async (err, hashedPassword) => {
                const user = new User({
                    username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                    email: email,
                   password: hashedPassword,
                   profilePicture: googlePhotoUrl
                });

                await user.save();
                const token = jwt.sign(
                    {id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET_KEY
                    ); 
    
                const {password, ...rest} = user._doc;
                res.status(200).cookie('access_token',token,{
                    httpOnly: true
                }).json(rest);

              });
        }

    } catch(error){
        next(error);
    }
}

module.exports.signup = signup;
module.exports.signin = signin;
module.exports.google = google;

