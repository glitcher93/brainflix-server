import fs from 'fs';
import { Video } from './interfaces';

let videoRead = () => {
    const videoData = fs.readFileSync('./data/video-details.json');
    const videoParse = JSON.parse(videoData.toString())
    return videoParse;
}

let videoWrite = (data) => {
    const stringifiedData = JSON.stringify(data)
    fs.writeFileSync('./data/video-details.json', stringifiedData)
}

exports.videoRead = videoRead;
exports.videoWrite = videoWrite;