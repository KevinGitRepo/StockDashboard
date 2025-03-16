import csv
import os
from flask import jsonify
from dotenv import load_dotenv
load_dotenv()

reader_file_name = os.getenv('FILE_NAME')

def get_data_from_file():
    companies = []
    with open(reader_file_name, newline='', encoding='utf-8') as csv_file:
        csv_reader = csv.reader(csv_file)
        for row in csv_reader:
            if len(row) >= 2:
                companies.append({'name': row[1].strip(), 'symbol': row[0].strip()})

    return jsonify(companies)