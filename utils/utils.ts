import fs from 'fs';
import { Video } from './interfaces';

export const videoRead = () => {
    const videoData = fs.readFileSync('./data/video-details.json');
    const videoParse = JSON.parse(videoData.toString())
    return videoParse;
}

export const videoWrite = (data: Video[]) => {
    const stringifiedData = JSON.stringify(data)
    fs.writeFileSync('./data/video-details.json', stringifiedData)
}