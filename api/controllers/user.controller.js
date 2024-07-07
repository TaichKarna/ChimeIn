const bcrypt = require('bcryptjs');
const errorHandler = require('../utils/error')
const {prisma} = require('../utils/prisma')

const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403,'You are not allowed to update this user'));
    }

    const data = {};

    if(req.body.password){
        if(req.body.password.length < 6){
            return next(errorHandler(400,'Password must atleast be 6 characters'));
        }
        req.body.password = await bcrypt.hash(req.body.password,10);     
        data.password = req.body.password; 
    }

    if(req.body.name){
        if(req.body.name.length < 1 || req.body.name.length > 20){
            return next(errorHandler(400,'Username must be between 1 and 20 characters'));
        }
        data.name = req.body.name;
    }

    if(req.body.profilePic){
        data.profilePic = req.body.profilePic;
    }

    try {
        const updateUser = await prisma.user.update({
            where: {
                id: req.params.userId
            },
            data: data
        })

        const {password, ...rest} = updateUser;
        res.status(200).json(rest);
        
    } catch(error){
        next(error);
    }
}



const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.userId ){
        return next(errorHandler(403,"You are not allowed to delete this user"));
    }

    try {
        const deleteUser = await prisma.user.delete({
            where: {
                id: req.params.userId
            }
        })
        res.status(200).json("User has been deleted");
    } catch(error) {
        next(error);
    }
}


const signOut = (req, res, next) => {
    try{
        res.clearCookie('access_token').status(200).json("User has signout out");

    } catch(error) {
        next(error);
    }
}



module.exports.signOut = signOut;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
