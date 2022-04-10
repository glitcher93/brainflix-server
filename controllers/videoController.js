const { videoRead, videoWrite } = require('../utils/utils');

exports.getAllVideos = (req, res) => {
    const videoData = videoRead();
    const reducedVideoData = videoData.map(video => {
        return {
        id: video.id,
        title: video.title,
        channel: video.channel,
        image: video.image
        }
    })
    res.json(reducedVideoData);
}

exports.postNewVideo = (req, res) => {
    const videoData = videoRead();
    if (!req.body.title || !req.body.description) {
        return res.status(400).json({
            error: "Please supply a title and description in your body"
        })
    }
    const newVideo = {
        id: uuidv4(),
        title: req.body.title,
        channel: "BrainStation Man",
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
        channel: "BrainStation Man",
        image: "http://localhost:8080/images/image9.jpg"
    }
    videoData.push(newVideo);
    videoWrite(videoData);
    res.status(201).json(reducedNewVideo);
}

exports.getSingleVideo = (req, res) => {
    const videoData = videoRead();
    const videoId = req.params.id;
    const foundVideo = videoData.find(video => video.id === videoId);
    if (!foundVideo) {
        return res.status(404).json({
            error: "Video not found"
        });
    }
    res.json(foundVideo);
}

exports.postNewComment = (req, res) => {
    const videoData = videoRead();
    const newComment = {
        id: uuidv4(),
        name: req.body.name,
        comment: req.body.comment,
        likes: 0,
        timestamp: Date.now()
    }
    const videoId = req.params.id;
    const foundVideo = videoData.find(video => video.id === videoId);
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

exports.putLike = (req, res) => {
    const videoData = videoRead();
    const videoId = req.params.id;
    const foundVideo = videoData.find(video => video.id === videoId);
    if(!foundVideo) {
        return res.status(404).json({
            error: "Video not found"
        });
    }
    foundVideo.likes++;
    videoWrite(videoData);
    res.status(200).json(foundVideo);
}

exports.deleteComment = (req, res) => {
    const videoData = videoRead();
    const videoId = req.params.id;
    const foundVideo = videoData.find(video => video.id === videoId);
    const commentId = req.params.commentId;
    const foundVideoComments = foundVideo.comments;
    const foundComment = foundVideoComments.find(comment => comment.id === commentId);
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