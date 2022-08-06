// see https://docs.opencv.org/4.x/d2/d99/tutorial_js_face_detection.html
async function detectHaarFace(img) {
    const haarCascadeFile = "haarcascade_frontalface_default.xml"
    await loadDataFile(haarCascadeFile, haarCascadeFile)
    const msize = new cv.Size(0, 0);
    const newImg = img;
    const gray = new cv.Mat();
    cv.cvtColor(newImg, gray, cv.COLOR_RGBA2GRAY, 0);
    const faces = new cv.RectVector();

    let faceCascade = new cv.CascadeClassifier();
    faceCascade.load(haarCascadeFile);
    faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize);

    for (let i = 0; i < faces.size(); ++i) {
        const point1 = new cv.Point(faces.get(i).x, faces.get(i).y);
        const point2 = new cv.Point(
            faces.get(i).x + faces.get(i).width,
            faces.get(i).y + faces.get(i).height
        );
        cv.rectangle(newImg, point1, point2, [255, 0, 0, 255]);
    }

    gray.delete();
    faces.delete();
    faceCascade.delete();

    return newImg;
}

/*function createFileFromUrl(path, url, callback) {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function(ev) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                let data = new Uint8Array(request.response);
                cv.FS_createDataFile('/', path, data, true, false, false);
                callback();
            } else {
                self.printError('Failed to load ' + url + ' status: ' + request.status);
            }
        }
    };
    request.send();
}*/

async function loadDataFile(cvFilePath, url) {
    // see https://docs.opencv.org/master/utils.js
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const data = new Uint8Array(buffer);
    cv.FS_createDataFile("/", cvFilePath, data, true, false, false);
}