#import json

#from flask import Flask, render_template

#from flask import request

#app = Flask(__name__)

#@app.route('/')
#def format():
#    return render_template('format.html')

#@app.route('/test0', methods=['POST'])
#def test():
#    output = request.get_json()
#    print(output)#this is the output that was stored in the json within the browser
#    print(type(output))
#    result = json.load(output)
#    print(result)3    print(type(result))
#    return result

#if __name__ == "__main__":
#    app.run(debug=True)
'''
import numpy as np
import matplotlib.pyplot as plt
from scipy.interpolate import interp1d
import os

# Get the full path of the file
dir_path = os.path.dirname(os.path.realpath(__file__))
file_path = os.path.join("C:\\Users\\omara\\OneDrive\\Desktop\\DSP_tasks\\DSP-task2", "EMG_Healthy_T.txt")

# Load the signal
signal = np.loadtxt(file_path)

# Define the sampling frequencies
freqs = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

# Create three subplots for the original signal, sampled signal, and reconstructed signal
fig, axs = plt.subplots(3, 1, figsize=(10, 10))

# Plot the original signal in the first subplot
axs[0].plot(signal, label='Original Signal')

# Loop over the sampling frequencies
for freq in freqs:
    # Sample the signal at the current frequency
    sampled_signal = signal[::int(len(signal)/(freq*10))]
    
    # Plot the sampled signal in the second subplot
    axs[1].plot(sampled_signal, label='Sampled Signal at {} Hz'.format(freq))

    # Interpolate the sampled signal to recover the original signal
    t = np.arange(len(signal))
    f = interp1d(np.arange(len(sampled_signal)), sampled_signal, kind='cubic')
    reconstructed_signal = f(np.linspace(0, len(sampled_signal) - 1, len(signal)))
    
    # Plot the reconstructed signal in the third subplot
    axs[2].plot(reconstructed_signal, label='Reconstructed Signal from {} Hz Sampled Signal'.format(freq))

# Plot legends, titles, and axes labels for all three subplots
for ax in axs:
    ax.legend()
    ax.set_xlabel('Time (ms)')
    ax.set_ylabel('Amplitude')
    ax.grid()

axs[0].set_title('Original Signal vs. Sampled and Reconstructed Signals')

# Plot the difference between the original and reconstructed signals in a separate figure
fig2, ax2 = plt.subplots()
ax2.plot(signal - reconstructed_signal)
ax2.set_xlabel('Time (ms)')
ax2.set_ylabel('Amplitude')
ax2.set_title('Difference between Original and Reconstructed Signals')

plt.show()
'''
from flask import Flask, request, jsonify
import numpy as np
from scipy.interpolate import interp1d

app = Flask(__name__)

# Route for sampling the signal
@app.route('/sample', methods=['POST'])
def sample_signal():
    # Get the signal data from the AJAX request
    signal = np.array(request.json['signal'])
    freq = request.json['freq']

    # Sample the signal at the given