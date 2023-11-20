import { getLikesByMedia, getLikesByUser, getSpecificLike, addLike, removeLike } from "../models/likeModel.mjs";

const getMediaLikes = async (req, res) => {
    const result = await getLikesByMedia(req.params.id);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
};

const getUserLikes = async (req, res) => {
    const result = await getLikesByUser(req.params.id);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
};

const postLike = async (req, res) => {
    const {media_id, user_id} = req.body;
    if (media_id && user_id) {
        const result = await addLike({media_id, user_id});
        if (result.like_id) {
            res.status(201);
            res.json({message: 'New like added.', ...result});
        } else {
            res.status(500);
            res.json(result);
        }
    } else {
        res.sendStatus(400);
    }
};

const deleteLike = async (req, res) => {
    const like = await getSpecificLike(req.params.id);
    if (like) {
        const result = await removeLike(req.params.id);
        if (result) {
            res.json({message: "Like deleted successfully"});
        } else {
            res.status(404);
        }
    } else {
        res.sendStatus(404);
    }
};

export {getMediaLikes, getUserLikes, postLike, deleteLike};