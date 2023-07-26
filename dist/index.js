"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const videos_1 = __importDefault(require("./routes/videos"));
const json_server_1 = __importDefault(require("json-server"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const { PORT } = process.env || 8082;
app.use((0, cors_1.default)());
app.use(json_server_1.default.router(path_1.default.join(__dirname, 'data/video-details.json')));
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use('/videos', videos_1.default);
app.listen(PORT, () => {
    console.log('Server is running');
});
