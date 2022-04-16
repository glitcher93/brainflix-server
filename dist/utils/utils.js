"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoWrite = exports.videoRead = void 0;
const fs_1 = __importDefault(require("fs"));
const videoRead = () => {
    const videoData = fs_1.default.readFileSync('./data/video-details.json');
    const videoParse = JSON.parse(videoData.toString());
    return videoParse;
};
exports.videoRead = videoRead;
const videoWrite = (data) => {
    const stringifiedData = JSON.stringify(data);
    fs_1.default.writeFileSync('./data/video-details.json', stringifiedData);
};
exports.videoWrite = videoWrite;
