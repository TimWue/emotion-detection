
const photoButton = document.querySelector("#takePhoto");
const hiddenCanvas = document.querySelector("#hiddenCanvas");
const videoOutput = document.querySelector("#canvasOutput");
const video = document.querySelector("#videoElement");
video.setAttribute("playsinline", "");
video.setAttribute("autoplay", "");
video.setAttribute("muted", "");

function startCamera(faceCascade, model, chart) {

    if (navigator.mediaDevices.getUserMedia) {

        const facingMode = "user";
        const constraints = {
            audio: false,
            video: {
                facingMode
            }
        };

        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (stream) {
                video.srcObject = stream;
                const streamSettings = stream.getVideoTracks()[0].getSettings();
                videoOutput.width = streamSettings.width;
                videoOutput.height = streamSettings.height;
            })
            .catch(function () {
                console.log("Something went wrong!");
            });

        async function handleClickOrTouch(evt) {
            evt.preventDefault()
            await takePhoto(faceCascade, model, chart)
        }

        photoButton.addEventListener('touchstart', handleClickOrTouch);
        photoButton.addEventListener('click', handleClickOrTouch);
    }}

async function takePhoto(faceCascade, model, chart) {
    const context = hiddenCanvas.getContext('2d');
    context.drawImage(video, 0, 0, hiddenCanvas.width,hiddenCanvas.height);
    hiddenCanvas.toDataURL('image/png')
    let mat = cv.imread("hiddenCanvas");
    const face = await detectHaarFace(mat, faceCascade)
    if (face) {
        resizeImg(makeGray(face))
        const predictions = predict(model);
        updateChart(chart, predictions)
        updateEmoji(predictions.indexOf(Math.max(...predictions)))
        face.delete();
    }
}
function makeGray(img){
    const gray = new cv.Mat();
    cv.cvtColor(img, gray, cv.COLOR_RGBA2GRAY, 0);
    return gray;
}
function resizeImg(img) {
    const imageSize = 48;
    let dst = new cv.Mat();
    let dsize = new cv.Size(imageSize, imageSize);
    cv.resize(img, dst, dsize, 0, 0, cv.INTER_AREA);
    cv.imshow('canvasOutput', dst);
    dst.delete();
}