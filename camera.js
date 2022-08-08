function startCamera(faceCascade) {
    const photoButton = document.querySelector("#takePhoto");
    const videoOutput = document.querySelector("#canvasOutput");
    const video = document.querySelector("#videoElement");
    video.setAttribute("playsinline", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("muted", "");
    video.style.width = "200px";
    video.style.height = "200px";

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
            })
            .catch(function () {
                console.log("Something went wrong!");
            });

        photoButton.addEventListener('click', async function () {
            const context = videoOutput.getContext('2d');
            context.drawImage(video, 0, 0, videoOutput.width, videoOutput.height);
            videoOutput.toDataURL('image/png')
            let mat = cv.imread("canvasOutput");
            const imgWithFace = await detectHaarFace(mat, faceCascade)
            cv.imshow('canvasOutput', imgWithFace);
        });
    }}
