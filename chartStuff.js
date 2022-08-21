function updateChart(predictions) {
    const ctx = document.getElementById('prediction');

    const data = {
        labels: [
            'Angry',
            'Disgust',
            'Fear',
            'Happy',
            'Neutral',
            'Sad',
            'Surprise'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: predictions,
            backgroundColor: [
                'rgb(102,194,165)',
                'rgb(252,141,98)',
                'rgb(141,160,203)',
                'rgb(231,138,195)',
                'rgb(166,216,84)',
                'rgb(255,217,47)',
                'rgb(229,196,148)'
            ]
            ,
            hoverOffset: 4
        }]
    };

    new Chart(ctx, {
        type: 'pie',
        data: data
    })
}



