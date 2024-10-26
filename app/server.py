from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def hello_world():
    return jsonify(message="Hello, World!")

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