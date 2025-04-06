import json
import requests
import csv
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

COCKTAILS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRxZnG0uDkj24vDcMr96JYTqKeaVyYmvAvEwKF_SgSEXM12rKl_TIufI_oDKaSIKmLMfZU1srdDB1oS/pub?gid=0&single=true&output=csv"
INGREDIENTS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRxZnG0uDkj24vDcMr96JYTqKeaVyYmvAvEwKF_SgSEXM12rKl_TIufI_oDKaSIKmLMfZU1srdDB1oS/pub?gid=1237016155&single=true&output=csv"

def fix_encoding(text):
    """Fix misinterpreted characters from encoding issues."""
    if text is None:
        return ""  # Return an empty string if None
    return text.encode("utf-8", errors="ignore").decode("utf-8", errors="ignore")  # Ensures valid UTF-8

@app.route('/api/cocktails', methods=['GET'])
def fetch_cocktails():
    try:
        # Fetch CSV data from URLs
        cocktails_response = requests.get(COCKTAILS_CSV_URL)
        ingredients_response = requests.get(INGREDIENTS_CSV_URL)

        if cocktails_response.status_code != 200 or ingredients_response.status_code != 200:
            return json.dumps({"error": "Failed to fetch data"}), 500

        # Decode with UTF-8-SIG to remove potential BOM (Byte Order Mark)
        cocktails_text = cocktails_response.content.decode("utf-8-sig", errors="ignore")
        ingredients_text = ingredients_response.content.decode("utf-8-sig", errors="ignore")

        # Parse CSV content
        cocktails_csv = csv.reader(cocktails_text.splitlines(), delimiter=',')
        ingredients_csv = csv.reader(ingredients_text.splitlines(), delimiter=',')

        # Skip headers
        cocktails_list = list(cocktails_csv)[2:]
        ingredients_list = list(ingredients_csv)[1:]

        # Build cocktails dictionary
        cocktails = {}
        for row in cocktails_list:
            cocktails[row[0]] = {
                "id": row[0],
                "name": fix_encoding(row[1]),
                "base_spirit": fix_encoding(row[2]),
                "category": fix_encoding(row[3]),
                "description": fix_encoding(row[4]),
                "instructions": fix_encoding(row[5]),
                "recommendations": fix_encoding(row[6]),
                "history": fix_encoding(row[7]),
                "ingredients": [],
                "image": fix_encoding(row[8]),
            }

        # Add ingredients
        for row in ingredients_list:
            cocktail_id = row[0]
            if cocktail_id in cocktails:
                cocktails[cocktail_id]["ingredients"].append({
                    "ingredient": fix_encoding(row[1]),
                    "amount": fix_encoding(row[2])
                })

        # Check for a query parameter "name"
        query_name = request.args.get('name')
        if query_name:
            query_name = query_name.lower().strip()
            for cocktail in cocktails.values():
                if cocktail["name"].lower() == query_name:
                    return json.dumps(cocktail, ensure_ascii=False, indent=4)
            return json.dumps({"error": "Cocktail not found"}), 404

        # If no name query provided, return full list
        return json.dumps(list(cocktails.values()), ensure_ascii=False, indent=4)

    except Exception as e:
        return json.dumps({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
