from flask import Flask, jsonify
from data_etl import read_file, clean_data
import re, json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

last_report = '../SAIDI_SAIFI_raw_FY24_Q4_v2.csv'
temp_data = read_file(last_report)
clean_data = clean_data(temp_data)

# ------------------------ #
# OLD APPROACH
# ------------------------ #
'''@app.route('/distribution')
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
    return jsonify(return_data)'''



# ------------------------ #
# NUEVO...
# En español, puñeee...
# ------------------------ #

@app.route('/')
def hola_mundito():
    welcome = "Este API proporciona acceso a datos sobre los índices de confiabilidad eléctrica en Puerto Rico (SAIDI, SAIFI, y CAIFI). Estos índices permiten evaluar la duración y frecuencia de interrupciones del servicio eléctrico."
    response = app.response_class(
        response=json.dumps({"message": welcome}, ensure_ascii=False).encode('utf8'),
        mimetype='application/json; charset=utf-8'
    )
    return response

@app.route('/indices/todos')
def todos_indices():
    data = clean_data
    # Requerido para incluir valores en español
    response = jsonify(data)
    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    return response

@app.route('/indices/todos/por_periodos')
def indices_periodos():
    data = clean_data['by_period']    
    # Requerido para incluir valores en español
    response = jsonify(data)
    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    return response

@app.route('/indices/todos/por_regiones')
def indices_regiones():
    data = clean_data['by_region']    
    # Requerido para incluir valores en español
    response = jsonify(data)
    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    return response

if __name__ == '__main__':
    app.run(debug=True, port=3000)
