from flask import request
from flask_restful import Resource

from Backend.main.DataReceiver import data_receiver_intraday, data_receiver_day_week_month
from Backend.main.SearchDataReceiver import get_data_from_file

class DataConnector(Resource):
    def get(self):
        symbol = request.args.get('symbol')
        time_series = request.args.get('series')
        if time_series.find('min') != -1: # 1min, 5min, 15min, 30min, 60min are only acceptable time values
            return data_receiver_intraday(symbol, time_series)
        return data_receiver_day_week_month(symbol, time_series.upper())

class SearchDataConnector(Resource):
    def get(self):
        return get_data_from_file()