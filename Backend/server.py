from flask import Flask
from flask_restful import Api
from flask_cors import CORS

from Backend.api.DataConnector import DataConnector, SearchDataConnector

app = Flask(__name__)

CORS(app)

api = Api(app)

api.add_resource(DataConnector, '/get') #GET
api.add_resource(SearchDataConnector, '/data')

if __name__ == '__main__':
    app.run(debug=True, port=4999)