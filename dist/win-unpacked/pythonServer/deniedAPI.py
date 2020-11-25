from flask import request, jsonify, Blueprint, Response
from flask_cors import CORS, cross_origin

deniedAPI = Blueprint('deniedAPI', __name__)
cors = CORS(deniedAPI, ressources = { r"/*" : {"origins" : "*"}})

@deniedAPI.route('/', methods=['GET'])
@cross_origin()
def chatHome():
    return Response('DENIED', 400)

