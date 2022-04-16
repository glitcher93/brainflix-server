"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.putLike = exports.postNewComment = exports.getSingleVideo = exports.postNewVideo = exports.getAllVideos = void 0;
const utils_1 = require("../utils/utils");
const uuid_1 = require("uuid");
const getAllVideos = (req, res) => {
    const videoData = (0, utils_1.videoRead)();
    const reducedVideoData = videoData.map((video) => {
        return {
            id: video.id,
            title: video.title,
            channel: video.channel,
            image: video.image
        };
    });
    res.json(reducedVideoData);
};
exports.getAllVideos = getAllVideos;
const postNewVideo = (req, res) => {
    const videoData = (0, utils_1.videoRead)();
    if (!req.body.title || !req.body.description) {
        return res.status(400).json({
            error: "Please supply a title and description in your body"
        });
    }
    const newVideo = {
        id: (0, uuid_1.v4)(),
        title: req.body.title,
        channel: "Nigel D'Souza",
        image: "http://localhost:8080/images/image9.jpeg",
        description: req.body.description,
        views: "0",
        likes: 0,
        duration: "11:06",
        video: "",
        timestamp: Date.now(),
        comments: []
    };
    const reducedNewVideo = {
        id: (0, uuid_1.v4)(),
        title: req.body.title,
        channel: "Nigel D'Souza",
        image: "http://localhost:8080/images/image9.jpg"
    };
    videoData.push(newVideo);
    (0, utils_1.videoWrite)(videoData);
    res.status(201).json(reducedNewVideo);
};
exports.postNewVideo = postNewVideo;
const getSingleVideo = (req, res) => {
    const videoData = (0, utils_1.videoRead)();
    const videoId = req.params.id;
    const foundVideo = videoData.find((video) => video.id === videoId);
    if (!foundVideo) {
        return res.status(404).json({
            error: "Video not found"
        });
    }
    res.json(foundVideo);
};
exports.getSingleVideo = getSingleVideo;
const postNewComment = (req, res) => {
    const videoData = (0, utils_1.videoRead)();
    const newComment = {
        id: (0, uuid_1.v4)(),
        name: req.body.name,
        comment: req.body.comment,
        likes: 0,
        timestamp: Date.now()
    };
    const videoId = req.params.id;
    const foundVideo = videoData.find((video) => video.id === videoId);
    if (!foundVideo) {
        return res.status(404).json({
            error: "Video not found"
        });
    }
    if (!req.body.name || !req.body.comment) {
        return res.status(400).json({
            error: "Please supply a name and comment in your body"
        });
    }
    foundVideo.comments.push(newComment);
    (0, utils_1.videoWrite)(videoData);
    res.status(201).json(newComment);
};
exports.postNewComment = postNewComment;
const putLike = (req, res) => {
    const videoData = (0, utils_1.videoRead)();
    const videoId = req.params.id;
    const foundVideo = videoData.find((video) => video.id === videoId);
    if (!foundVideo) {
        return res.status(404).json({
            error: "Video not found"
        });
    }
    foundVideo.likes++;
    (0, utils_1.videoWrite)(videoData);
    res.status(200).json(foundVideo);
};
exports.putLike = putLike;
const deleteComment = (req, res) => {
    const videoData = (0, utils_1.videoRead)();
    const videoId = req.params.id;
    const foundVideo = videoData.find((video) => video.id === videoId);
    const commentId = req.params.commentId;
    const foundVideoComments = foundVideo.comments;
    const foundComment = foundVideoComments.find((comment) => comment.id === commentId);
    if (!foundVideo) {
        return res.status(404).json({
            error: "Video not found"
        });
    }
    if (!foundComment) {
        return res.status(404).json({
            error: "Comment not found"
        });
    }
    foundVideoComments.splice(foundVideoComments.indexOf(foundComment), 1);
    (0, utils_1.videoWrite)(videoData);
    res.status(200).json(foundComment);
};
exports.deleteComment = deleteComment;
