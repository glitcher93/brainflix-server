import { videoRead, videoWrite } from '../utils/utils';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { Video, Comment } from '../utils/interfaces';

export const getAllVideos = (req: Request, res: Response) => {
    const videoData = videoRead();
    const reducedVideoData = videoData.map((video: Video) => {
        return {
        id: video.id,
        title: video.title,
        channel: video.channel,
        image: video.image
        }
    })
    res.json(reducedVideoData);
}

export const postNewVideo = (req: Request, res: Response) => {
    const videoData = videoRead();
    if (!req.body.title || !req.body.description) {
        return res.status(400).json({
            error: "Please supply a title and description in your body"
        })
    }
    const newVideo = {
        id: uuidv4(),
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
    }
    const reducedNewVideo = {
        id: uuidv4(),
        title: req.body.title,
        channel: "Nigel D'Souza",
        image: "http://localhost:8080/images/image9.jpg"
    }
    videoData.push(newVideo);
    videoWrite(videoData);
    res.status(201).json(reducedNewVideo);
}

export const getSingleVideo = (req: Request, res: Response) => {
    const videoData = videoRead();
    const videoId = req.params.id;
    const foundVideo = videoData.find((video: Video) => video.id === videoId);
    if (!foundVideo) {
        return res.status(404).json({
            error: "Video not found"
        });
    }
    res.json(foundVideo);
}

export const postNewComment = (req: Request, res: Response) => {
    const videoData = videoRead();
    const newComment = {
        id: uuidv4(),
        name: req.body.name,
        comment: req.body.comment,
        likes: 0,
        timestamp: Date.now()
    }
    const videoId = req.params.id;
    const foundVideo = videoData.find((video: Video) => video.id === videoId);
    if (!foundVideo) {
        return res.status(404).json({
            error: "Video not found"
        });
    }
    if (!req.body.name || !req.body.comment) {
        return res.status(400).json({
            error: "Please supply a name and comment in your body"
        })
    }
    foundVideo.comments.push(newComment);
    videoWrite(videoData);
    res.status(201).json(newComment);
}

export const putLike = (req: Request, res: Response) => {
    const videoData = videoRead();
    const videoId = req.params.id;
    const foundVideo = videoData.find((video: Video) => video.id === videoId);
    if(!foundVideo) {
        return res.status(404).json({
            error: "Video not found"
        });
    }
    foundVideo.likes++;
    videoWrite(videoData);
    res.status(200).json(foundVideo);
}

export const deleteComment = (req: Request, res: Response) => {
    const videoData = videoRead();
    const videoId = req.params.id;
    const foundVideo = videoData.find((video: Video) => video.id === videoId);
    const commentId = req.params.commentId;
    const foundVideoComments = foundVideo.comments;
    const foundComment = foundVideoComments.find((comment: Comment) => comment.id === commentId);
    if(!foundVideo) {
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
    videoWrite(videoData);
    res.status(200).json(foundComment);
}