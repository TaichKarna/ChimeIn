const bcrypt = require('bcryptjs');
const errorHandler = require('../utils/error');
const { prisma } = require('../utils/prisma');

const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this user'));
    }

    const data = {};

    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'Password must be at least 6 characters'));
        }
        req.body.password = await bcrypt.hash(req.body.password, 10);
        data.password = req.body.password;
    }

    if (req.body.username) {
        if (req.body.username.length < 1 || req.body.username.length > 20) {
            return next(errorHandler(400, 'Username must be between 1 and 20 characters'));
        }
        data.username = req.body.username;
    }

    if (req.body.displayName) {
        if (req.body.displayName.length < 1 || req.body.displayName.length > 50) {
            return next(errorHandler(400, 'Display name must be between 1 and 50 characters'));
        }
        data.displayName = req.body.displayName;
    }

    if (req.body.profilePicture) {
        data.profilePicture = req.body.profilePicture;
    }

    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: req.params.userId
            },
            data: data
        });

        const { password, ...rest } = updatedUser;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, "You are not allowed to delete this user"));
    }

    try {
        await prisma.user.delete({
            where: {
                id: req.params.userId
            }
        });
        res.status(200).json("User has been deleted");
    } catch (error) {
        next(error);
    }
};




module.exports = {  updateUser, deleteUser };
