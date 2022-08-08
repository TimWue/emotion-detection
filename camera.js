
const photoButton = document.querySelector("#takePhoto");
const hiddenCanvas = document.querySelector("#hiddenCanvas");
const videoOutput = document.querySelector("#canvasOutput");
const video = document.querySelector("#videoElement");
video.setAttribute("playsinline", "");
video.setAttribute("autoplay", "");
video.setAttribute("muted", "");

function startCamera(faceCascade) {

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

        photoButton.addEventListener('click', async function (evt) {
            evt.preventDefault()
            await takePhoto(faceCascade)
        });

        photoButton.addEventListener('touchstart', async function (evt) {
            evt.preventDefault()
            await takePhoto(faceCascade)
        });
    }}

async function takePhoto(faceCascade) {
    const context = hiddenCanvas.getContext('2d');
    context.drawImage(video, 0, 0, hiddenCanvas.width,hiddenCanvas.height);
    hiddenCanvas.toDataURL('image/png')
    let mat = cv.imread("hiddenCanvas");
    const face = await detectHaarFace(mat, faceCascade)
    console.log(face)
    face && cv.imshow('canvasOutput', face);
}