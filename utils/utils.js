const fs = require('fs');

let videoRead = () => {
    const videoParse = JSON.parse(fs.readFileSync('./data/video-details.json', 'utf8', (err, data) => {
        if (err) {
            res.json({message: "Error retrieving videos"});
        }
        return data;
    }));
    return videoParse;
}

let videoWrite = (file) => {
    fs.writeFile('./data/video-details.json', JSON.stringify(file), (error) => {
        if (error) {
            console.log(error);
        }
        console.log('file written successfully');
    })
}

exports.videoRead = videoRead;
exports.videoWrite = videoWrite;