from flask import request, jsonify
from app import app
from app.utils import data_processing as dp

# Load and preprocess data when the application starts
grouped_data = dp.initialize_data()

@app.route("/api/cities", methods=["GET"])
def get_available_cities():
    cities = grouped_data["Location City"].unique().tolist()
    cities.sort()
    return jsonify({"cities": cities})

@app.route("/api/report", methods=["GET"])
def get_report():
    cities = request.form.getlist("cities")
    report = dp.display_report_by_city(grouped_data, cities)
    return jsonify({"report": report.to_dict(orient="records")})

@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "message": "Service is running"}), 200
