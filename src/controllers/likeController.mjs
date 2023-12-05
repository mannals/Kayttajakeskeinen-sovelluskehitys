import { getLikesByMedia, getLikesByUser, getSpecificLike, addLike, removeLike } from "../models/likeModel.mjs";

const getMediaLikes = async (req, res, next) => {
    const result = await getLikesByMedia(req.params.id);
    if (result) {
        res.json(result);
    } else {
        const error = new Error('like not found');
        error.status = 404;
        return next(error);
    }
};

const getUserLikes = async (req, res, next) => {
    const result = await getLikesByUser(req.params.id);
    if (result) {
        res.json(result);
    } else {
        const error = new Error('like not found');
        error.status = 404;
        return next(error);
    }
};

const postLike = async (req, res, next) => {
    const {media_id, user_id} = req.body;
    if (media_id && user_id) {
        const result = await addLike({media_id, user_id});
        if (result.like_id) {
            res.status(201);
            res.json({message: 'New like added.', ...result});
        } else {
            const error = new Error("could not add like");
            error.status = 400;
            return next(error);
        }
    } else {
        const error = new Error("invalid or missing fields");
        error.status = 400;
        return next(error);
    }
};

const deleteLike = async (req, res, next) => {
    const like = await getSpecificLike(req.params.id);
    if (!like) {
        const error = new Error("like not found");
        error.status = 400;
        return next(error);
    }
    console.log(like);
    if (like.user_id === req.user.user_id) {
        const result = await removeLike(req.params.id);
        if (result) {
            res.json({message: "Like deleted successfully"});
        } else {
            const error = new Error("could not delete like");
            error.status = 404;
            return next(error);
        }
    } else {
        const error = new Error("like not found");
        error.status = 404;
        return next(error);
    }
};

export {getMediaLikes, getUserLikes, postLike, deleteLike};