from flask import Flask, request
from flask_restful import Resource

from Backend.main.DataReceiver import data_receiver

class DataConnector(Resource):
    def get(self):
        symbol = request.args.get('symbol')
        print(symbol)
        return data_receiver(symbol)