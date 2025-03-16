import requests
import os
from dotenv import load_dotenv

load_dotenv()
VANTAGE_ALPHA_API_KEY = os.getenv('API_KEY2')

def data_receiver_intraday(symbol, interval):
    url = f'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol={symbol}&interval={interval}&apikey={VANTAGE_ALPHA_API_KEY}'
    r = requests.get(url)
    json_data = r.json()
    return json_data

def data_receiver_day_week_month(symbol, time_series):
    url = f'https://www.alphavantage.co/query?function=TIME_SERIES_{time_series}&symbol={symbol}&apikey={VANTAGE_ALPHA_API_KEY}'
    r = requests.get(url)
    json_data = r.json()
    return json_data