import { validationResult } from "express-validator";
import { listAllUsers, findUserById, addUser, updateUser, removeUser } from "../models/userModel.mjs";
import bcrypt from "bcryptjs";

const postUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Invalid or missing fields');
        error.status = 400;
        return next(error);
    }
    const newUser = req.body;
    console.log(typeof newUser.password);
    const newUserId = await addUser(newUser);
    res.status(201).json({message: 'user added', user_id: newUserId});
};


const getUsers = async (req, res, next) => {
  const result = await listAllUsers();
  if (!result.error) {
    res.json(result);
  } else {
    const error = new Error('could not get users');
    error.status = 404;
    return next(error);
  }
};

// Following functions are just stubs at the moment
const getUserById = async (req, res) => {
    const user = await findUserById(req.params.id);
    if (user) {
        res.json(user);
    } else {
        const error = new Error('could not get users');
        error.status = 404;
        return next(error);
    }
};

const putUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('validation errors', errors.array());
        const error = new Error('invalid input fields');
        error.status(400);
        return next(error);
    }

    const user_id = req.params.id;
    const {username, password, email} = req.body;
    const editor_id = req.user.user_id;
    if (editor_id === parseInt(user_id)) {
        const result = await updateUser({user_id, username, password, email});
        if (!result.media_id) {
            res.status(200);
            res.json({message: 'Successfully updated user.', ...result});
        } else {
            const error = new Error('user data not found');
            error.status = 404;
            return next(error);
        }
    } else {
        const error = new Error('unauthorized');
        error.status = 404;
        return next(error);
    }
};

const deleteUser = async (req, res) => {
    const user = await findUserById(req.params.id);
    if (user.user_id === req.user.user_id) {
        const result = await removeUser(req.params.id);
        if (result) {
            return res.status(204).json({message: "User deleted successfully"});
        } else {
            const error = new Error('user data not found');
            error.status = 404;
            return next(error);
        }
    } else {
        const error = new Error('unauthorized');
        error.status = 404;
        return next(error);
    }
};

export {getUsers, getUserById, postUser, putUser, deleteUser};