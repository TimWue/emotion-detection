
async function initializeModel () {
    return await tf.loadLayersModel('./model.json');
}

function predict(model){
    const resizedImgElement = document.querySelector("#canvasOutput");
    const img = tf.browser.fromPixels(resizedImgElement).expandDims()
    const predictionTensor = model.predict(img)
    const predictions = tensor2Array(predictionTensor)
    updateChart(predictions)
}

function tensor2Array(tensor){
    const values = tensor.dataSync();
    return Array.from(values);
}
