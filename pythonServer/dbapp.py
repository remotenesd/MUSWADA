from bson.objectid import ObjectId
from usertypes import initData
from flask import Flask, request, jsonify, Blueprint, Response
from flask_cors import cross_origin, CORS
from flask_api import status

from dbsetup import dbdeplacer
from dbsetup import dbpersonnel
from dbsetup import dbapp
from hashlib import sha256

from os import path
import globalledger as glb

appApi = Blueprint('appApi', __name__);
cors = CORS(appApi, resources = { r"/*" : {"origins" : "*"}});

if dbapp.count() == 0:
    # the table is empty
    # let's write default values
    dbapp.insert_one({
        'firstUsage' : True,
        'batiment' : '',
        'batimentClass' : '',
        'commandant' : ''
    })

@appApi.route('/setData', methods = ['POST'])
@cross_origin()
def newDeplacer():
    content = request.get_json(force = True);
    if (all(key in content for key in ['batiment', 'classBatiment', 'commandant'])):
        newdeplacer = initData(
                               content['commandant'],
                               content['batiment'],
                               content['classBatiment']
                               );
        dbapp.drop();
        dbapp.insert_one(newdeplacer.__dict__);
        return 'OK', 200
    else:
        return 'INVALID REQUEST ARGS', 201

@appApi.route('/getdata', methods = ['GET'])
@cross_origin()
def appWelcome():
    res = dbapp.find({})
    dataParser = lambda d : {
        'firstUsage' : str(d['firstUsage']), 
        'batiment' : str(d['batiment']),
        'batimentClass' : str(d['batimentClass']),
        'commandant' : str(d['commandant'])
    }
    dataParse = list(map(dataParser, res))[0]
    return {'app' : dataParse}, 200

@appApi.route('/', methods = ['GET'])
@cross_origin()
def home():
    return Response('Home App.', status=status.HTTP_200_OK);