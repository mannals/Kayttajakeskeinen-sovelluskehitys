import { validationResult } from "express-validator";
import { listAllUsers, findUserById, addUser, updateUser, removeUser } from "../models/userModel.mjs";

const postUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({message: 'validation error'});
    }
    const newUserId = await addUser(req.body);
    res.status(201).json({message: 'user added', user_id: newUserId});
};


const getUsers = async (req, res) => {
  const result = await listAllUsers();
  if (!result.error) {
    res.json(result);
  } else {
    res.status(500);
    res.json(result);
  }
};

// Following functions are just stubs at the moment
const getUserById = async (req, res) => {
    const user = await findUserById(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404);
    }
};

const putUser = async (req, res) => {
    const user_id = req.params.id;
    const {username, password, email} = req.body;
    if (user_id && username && password && email) {
        const result = await updateUser({user_id, username, password, email});
        if (!result.media_id) {
            res.status(200);
            res.json({message: 'Successfully updated user.', ...result});
        } else {
            res.status(404);
            res.json(result);
        }
    } else {
        res.sendStatus(400);
    }
};

const deleteUser = async (req, res) => {
    const user = await findUserById(req.params.id);
    if (user) {
        const result = await removeUser(req.params.id);
        if (result) {
            res.json({message: "User deleted successfully"});
        } else {
        res.status(404);
        }
    } else {
        res.sendStatus(404);
    }
};

export {getUsers, getUserById, postUser, putUser, deleteUser};