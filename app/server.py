from flask import Flask, jsonify
from data_etl import read_file
import re

app = Flask(__name__)

@app.route('/')
def hello_world():
    input_file = '../SAIDI_SAIFI_raw_FY24_Q4_v2.csv'
    data = read_file(input_file)
    return_data = {}
    for k, v in data.items():
        data = v['transmission']
        district_data = {
            row[0]: {
                "SAIDI": row[1],
                "SAIFI": row[2]
            }
            for row in data[2:]
        }
        return_data[k] = district_data
    return jsonify(return_data)

@app.route('/distribution')
def distribution_index():
    return jsonify(message="Distribution Index per district")

@app.route('/transmission')
def transmission_index():
    return jsonify(message="Transmission Index per district")

@app.route('/saidi')
def saidi_index():
    return jsonify(message="SAIDI Index")

@app.route('/saifi')
def saifi_index():
    return jsonify(message="SAIFI Index")

@app.route('/caidi')
def caidi_index():
    return jsonify(message="CAIDI Index")

if __name__ == '__main__':
    app.run(debug=True)