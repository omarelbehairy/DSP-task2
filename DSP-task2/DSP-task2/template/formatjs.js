/*var plot1 = document.getElementById('plot1');
var plot2 = document.getElementById('plot2');
var plot3 = document.getElementById('plot3');


/*var signal = new DSP.Signal.signal(1000); // create a signal with 1000 data points
signal.fillWithSine(100, 0.5); // fill the signal with a sine wave of frequency 100 Hz and amplitude 0.5
var trace = {
    x: signal.timeVector().toArray(),
    y: signal.data,
    type: 'line',
    mode: 'lines',
    line: {
      color: 'rgb(255, 0, 0)',
      width: 2
    }
  };
  var layout = {
    xaxis: {
      title: 'Time (s)',
      range: [0, 1]
    },
    yaxis: {
      title: 'Amplitude',
      range: [-1, 1]
    }
  };
  Plotly.newPlot('Plot1', [trace], layout);  
  console.log("hi user");*-/
  // Create an HTML input element
var fileInput = document.createElement('input');
fileInput.type = 'file';

// Add an event listener to the input element
fileInput.addEventListener('change', function(e) {
  // Get the file object from the input element
    var file = e.target.files[0];

  // Create a FileReader object
    var reader = new FileReader();

  // Define a callback function for when the file is loaded
    reader.onload = function(event) {
    var data = event.target.result;
    var parsedData = Plotly.d3.csv.parse(data);

    var x = [], y = [];

    // Extract x and y data from the parsed CSV data
    parsedData.forEach(function(row) {
      x.push(row['x']);
      y.push(row['y']);
    });

    var trace = {
      x: x,
      y: y,
      mode: 'lines',
      type: 'scatter'
    };

    var layout = {
      title: 'CSV Data Plot'
    };

    var plotData = [trace];

    Plotly.newPlot('plotDiv', plotData, layout);
  };

  // Read the file as text using the FileReader object
  reader.readAsText(file);
});

// Append the input element to the HTML body
document.body.appendChild(fileInput);*/
var plotDiv = document.getElementById('plot');
var x = [];
var y = [];
var labels = [];
var cnt = 0;
var intervalID;
var plotColor = '#1f77b4'; // Default color
var yRange = [-2.5, 2.5];
var xRange = [0, 100];
var intervalTime = 50;
var windowSize = 100;
var windowStart = 0;
var windowEnd = windowStart + windowSize;

function updateInterval(intervalTime) {
    if (intervalID) {
        clearInterval(intervalID);
        intervalID = setInterval(update, intervalTime);
    }
}

function OpenFile(event) {
    cnt = 0;
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function () {
        var lines = reader.result.split('\n');
        for (var i = 0; i < lines.length - 1; i++) {
            var cols = lines[i].split('\t');
            if (cols[0] != NaN && cols[1] != NaN) {
                x.push(parseFloat(cols[0])); //
                y.push(parseFloat(cols[1]));
            }
        }
        plot();

    };
    reader.readAsText(input.files[0]);
}


function plot() {
    var layout = {
        scrollZoom: true,
        showlegend: true,
        modeBar: { orientation: 'v' },
        xaxis: { range: [0,0.1], fixedrange: true },
        yaxis: { range: [-2.5,2.5] },
    };
    var trace = {
        x: x,
        y: y,
        mode: 'lines',
        line: {
            color: 'blue',
            width: 2
        }

    };
    var data = [trace];

    Plotly.newPlot(plotDiv, data, layout);
}

/*function update() {  
    windowStart = Math.max(cnt - windowSize, 0);
    windowEnd = cnt;
    var update = {
        xaxis: {
            range: [x[windowStart], x[windowEnd]]
        }
    };

    if (cnt != x.length) {
        Plotly.update(plotDiv, { x: [x.slice(windowStart, windowEnd)], y: [y.slice(windowStart, windowEnd)], text: [labels.slice(windowStart, windowEnd)] }, update);        
        cnt++;
    }
}

function togglePlot() {
    updateLabel();
    var button = document.getElementById("toggle-btn");
    var slider = document.getElementById('interval-slider');
    if (button.innerHTML === "Stop") {
        clearInterval(intervalID);
        button.innerHTML = "Play";
        intervalID = 0
    } else {
        intervalID = setInterval(update, slider.value);
        button.innerHTML = "Stop";
    }
}

function updateLabel() {
    var label = document.getElementById('labelInput').value;
    var update = {
        annotations: [ {
                text: label,
                xref: 'paper',
                yref: 'paper',
                x: 1.0,
                y: 1.0,
                showarrow: false,
                font: {
                    size: 16
                }
            }
        ]
    };
    Plotly.update(plotDiv, {}, update);
}

function changeColor() {
    var randomColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    Plotly.restyle(plotDiv, { line: { color: randomColor } }, 0);
    plotColor = randomColor; 
}

function updateXRange() {
    xRange[1] = parseInt(document.getElementById("xRangeInput").value);
    var slider = (xRange[1] / 100);

    var first = Math.max((slider * cnt) - windowSize, 0);
    var last  = Math.min((slider * cnt), cnt);

    if (first == last && first == 0) {
        last = windowSize;
    }

    var update = {
        xaxis: {
            range: [x[parseInt(first)], x[parseInt(last)]],
        }
    };

    Plotly.update(plotDiv, { x: [x], y: [y] }, update);
}

function rewindPlot() {
    clearInterval(intervalID);
    x = [];
    y = [];
    cnt = 0;
    windowStart = 0;
    windowEnd = windowStart + windowSize;
    Plotly.purge(plotDiv);
    OpenFile({ target: { files: [document.getElementById("fileInput").files[0]] } });
    var button = document.getElementById("toggle-btn");
    button.innerHTML = "Start";
}*/
