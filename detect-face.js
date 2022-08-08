// see https://docs.opencv.org/4.x/d2/d99/tutorial_js_face_detection.html
function detectHaarFace(img, faceCascade) {
    const msize = new cv.Size(0, 0);
    const newImg = img;
    const gray = new cv.Mat();
    cv.cvtColor(newImg, gray, cv.COLOR_RGBA2GRAY, 0);
    const faces = new cv.RectVector();
    faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize);

   /* for (let i = 0; i < faces.size(); ++i) {
        const point1 = new cv.Point(faces.get(i).x, faces.get(i).y);
        const point2 = new cv.Point(
            faces.get(i).x + faces.get(i).width,
            faces.get(i).y + faces.get(i).height
        );
        cv.rectangle(newImg, point1, point2, [255, 0, 0, 255]);
    }*/
    let dst = undefined;
    if (faces.size() > 0) {
        let rect = new cv.Rect(faces.get(0).x, faces.get(0).y, faces.get(0).width, faces.get(0).height);
        dst = newImg.roi(rect);
    }

    gray.delete();
    faces.delete();

    return dst;
}

async function loadDataFile(cvFilePath, url) {
    // see https://docs.opencv.org/master/utils.js
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const data = new Uint8Array(buffer);
    cv.FS_createDataFile("/", cvFilePath, data, true, false, false);
}