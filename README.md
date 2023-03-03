# Emotion Detection

This application uses the camera stream in order to detect faces and classify the shown emotion.
For this purpose a custom convolutional neural network (cnn) was trained on the FER-2013 dataset (https://www.kaggle.com/datasets/msambare/fer2013)
and exported for the use in client-side code.
Face detection is done by using the haar-cascade detection of OpenCV (https://docs.opencv.org/3.4/db/d28/tutorial_cascade_classifier.html).

The output of emotion detection corresponds to a probability for the emotion class, which is most likely present.
In order to be able to manipulate the sensitivity of the classification, the output-probability is compared to a user 
defined threshold. If the probability is higher than the defined threshold, the emoji at the bottom right corner of the 
camera stream will show the detected emotion.
Additionally real time information about each detected emotion (even if the threshold is higher than the probability) is 
shown below the camera stream.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
