"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const videoController_1 = require("../controllers/videoController");
const router = express_1.default.Router();
router
    .route("/")
    .get(videoController_1.getAllVideos)
    .post(videoController_1.postNewVideo);
router
    .get("/:id", videoController_1.getSingleVideo);
router
    .post("/:id/comments", videoController_1.postNewComment);
router
    .put("/:id/likes", videoController_1.putLike);
router
    .delete("/:id/comments/:commentId", videoController_1.deleteComment);
exports.default = router;
