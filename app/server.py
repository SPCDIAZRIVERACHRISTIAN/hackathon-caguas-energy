from flask import Flask, jsonify
from data_etl import read_file
import re

app = Flask(__name__)

@app.route('/')
def hello_world():
    return jsonify("Welcome to the Caguas Energy API")

@app.route('/distribution')
def distribution_index():
    input_file = '../SAIDI_SAIFI_raw_FY24_Q4_v2.csv'
    data = read_file(input_file)
    return_data = {}
    for k, v in data.items():
        regex = r"\d{2}-\d{2}-\d{4}"
        matches = re.finditer(regex, k, re.MULTILINE)
        dates_list = []
        for matchNum, match in enumerate(matches, start=1):
            dates_list.append(match.group())
        data = v['distribution']
        district_data = {
            row[0]: {
                "SAIDI": row[1],
                "SAIFI": row[2]
            }
            for row in data[2:]
        }
        if len(dates_list) > 0:
            return_data[dates_list[0]] = district_data
    return jsonify(return_data)

@app.route('/transmission')
def transmission_index():
    input_file = '../SAIDI_SAIFI_raw_FY24_Q4_v2.csv'
    data = read_file(input_file)
    return_data = {}
    for k, v in data.items():
        regex = r"\d{2}-\d{2}-\d{4}"
        matches = re.finditer(regex, k, re.MULTILINE)
        dates_list = []
        for matchNum, match in enumerate(matches, start=1):
            dates_list.append(match.group())
        data = v['transmission']
        district_data = {
            row[0]: {
                "SAIDI": row[1],
                "SAIFI": row[2]
            }
            for row in data[2:]
        }
        print(dates_list)

        if len(dates_list) > 0:
            return_data[dates_list[0]] = district_data
    return jsonify(return_data)

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
    app.run(debug=True, port=3000)
