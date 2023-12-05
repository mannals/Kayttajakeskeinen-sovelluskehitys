import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { login, findUserByName } from "../models/userModel.mjs";
import bcrypt from 'bcryptjs';

const postLogin = async (req, res, next) => {
    const getPassword = await findUserByName(req.body.username);
    console.log('getPassword', getPassword);
    const match = await bcrypt.compare(req.body.password, getPassword);
    if (match) {
        req.body.password = getPassword;
        const user = await login(req.body);

        if (!user) {
            const error = new Error('username/password invalid');
            error.status = 401;
            return next(error);
        }

        if (user.error) {
            return next(new Error(res.error));
        }

        if (user) {
            delete user.password;
            console.log('postLogin', user);
            const token = jwt.sign(user, process.env.JWT_SECRET);
            res.json({message: 'logged in', token, user});
        } else {
            res.status(401).json({message: 'invalid username/password'});
        }
    }
};

const getMe = (req, res) => {
    console.log('getMe user', req.user);
    res.json(req.user);
};

export {postLogin, getMe};