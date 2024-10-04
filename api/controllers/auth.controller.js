const bcrypt = require('bcryptjs');
const { errorHandler } = require('../utils/error');
const jwt = require('jsonwebtoken');
const { prisma } = require('../utils/prisma');
require('dotenv').config();

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    
    let errors = {};
    if (!username || username.trim() === '') {
        errors.username = 'Username is required';
    }
    if (!email || email.trim() === '') {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Invalid email format';
    }
    if (!password || password.trim() === '') {
        errors.password = 'Password is required';
    } else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
    }

    if (Object.keys(errors).length > 0) {
        return next(errorHandler(400, "Validation failed", errors));
    }

    bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
            return next(errorHandler(500, 'Error hashing password'));
        }
        try {
            const newUser = await prisma.user.create({
                data: {
                    email: email,
                    username: username,
                    password: hashedPassword,
                }
            });
            res.status(201).json(newUser);
        } catch (error) {
            if (error.code === 'P2002') { 
                return next(errorHandler(409, 'User with this email or username already exists'));
            }
            console.log(error)
            next(errorHandler(500, 'Something went wrong', error));
        }
    });
};


const signin = async (req, res, next) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return next(errorHandler(400, "All fields are required."));
    }

    try {
        const validUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: identifier },
                    { username: identifier } 
                ]
            }
        });

        if (!validUser) {
            return next(errorHandler(404, "User not found."));
        }

        const validPassword = await bcrypt.compare(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, "Incorrect password."));
        }

        const { password: pass, ...userData } = validUser;

        const token = jwt.sign(
            { id: validUser.id, username: validUser.username },
            process.env.JWT_SECRET_KEY,
        );

        res.status(200).json({
            message: "Login successful!",
            token: token,
            user: userData
        });
    } catch (error) {
        console.error(error); 
        next(errorHandler(500, "Internal server error."));
    }
};


// const google = async (req, res, next) => {
//     const {username, email, googlePhotoUrl} = req.body;

//     try{
//         const user = await User.findOne({email});

//         if(user){
//             const token = jwt.sign(
//                 {id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET_KEY
//                 ); 

//             const {password, ...rest} = user._doc;
//             res.status(200).cookie('access_token',token,{
//                 httpOnly: true
//             }).json(rest);

//         } else {
//             const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
//             bzcrypt.hash(generatedPassword, 10, async (err, hashedPassword) => {
//                 const user = new User({
//                     userusername: username.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
//                     email: email,
//                    password: hashedPassword,
//                    profilePicture: googlePhotoUrl
//                 });

//                 await user.save();
//                 const token = jwt.sign(
//                     {id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET_KEY
//                     ); 
    
//                 const {password, ...rest} = user._doc;
//                 res.status(200).cookie('access_token',token,{
//                     httpOnly: true
//                 }).json(rest);

//               });
//         }

//     } catch(error){
//         next(error);
//     }
// }

module.exports = { signup, signin}
