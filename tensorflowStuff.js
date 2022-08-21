
async function initializeModel () {
    return await tf.loadGraphModel('./model.json');
}

function predict(model){
    const resizedImgElement = document.querySelector("#canvasOutput");
    const img = tf.browser.fromPixels(resizedImgElement).expandDims()
    const predictionTensor = model.predict(img.cast('float32'))
    return tensor2Array(predictionTensor)
}

function tensor2Array(tensor){
    const values = tensor.dataSync();
    return Array.from(values);
}
