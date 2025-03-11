import requests
import os
from dotenv import load_dotenv

load_dotenv()
VANTAGE_ALPHA_API_KEY = os.getenv('API_KEY')

def data_receiver(symbol):
    url = f'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol={symbol}&interval=5min&apikey={VANTAGE_ALPHA_API_KEY}'
    r = requests.get(url)
    json_data = r.json()
    return json_data