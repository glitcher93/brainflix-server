import express from 'express';
import { getAllVideos, postNewVideo, getSingleVideo, postNewComment, putLike, deleteComment } from '../controllers/videoController';

const router = express.Router();

router
    .route("/")
    .get(getAllVideos)
    .post(postNewVideo)

router
    .get("/:id", getSingleVideo)

router
    .post("/:id/comments", postNewComment)

router
    .put("/:id/likes", putLike)

router
    .delete("/:id/comments/:commentId", deleteComment)

export default router;