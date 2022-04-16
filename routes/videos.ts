const express = require('express');
const router = express.Router();
const { getAllVideos, postNewVideo, getSingleVideo, postNewComment, putLike, deleteComment } = require('../controllers/videoController');

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

module.exports = router;