from flask import  request, jsonify, Blueprint, Response
from flask import json
from flask_cors import cross_origin, CORS
from flask_api import status
import msgpack

import globalledger as glb
from dbsetup import dbpeers

from os import path
filedir = (path.dirname(path.realpath(__file__)))


##############################################################
#!IMPORTANT THIS ASSUMES PASSWORD IS HASHED THROUGH 256 HASH 
##############################################################

# app = Flask(__name__);
p2pApi = Blueprint('p2pApi', __name__);
cors = CORS(p2pApi, ressources = { r"/*" : {"origins" : "*"} })

#########################################################
## DATABASE TABLE 
#######################################################

@p2pApi.route('/listNodes/<force>', methods = ['GET'])
@cross_origin()
def listNodes(force = False):
    """
        RETURNS THE LIST OF AVAILABLE P2P NODES
    """
    if force:
        # force the server to return P2P nodes
        # TODO IMPLEMENT FUNCTIONALITY
        pass
    
    return json.dumps({'nodes' : glb.getNodes()}) , 200
    
@p2pApi.route('/', methods = ['GET'])
@cross_origin()
def usersWelcome():
    return Response('Welcome, everybody !', status=status.HTTP_200_OK);

