from bson.objectid import ObjectId
from usertypes import deplacer
from flask import Flask, request, jsonify, Blueprint, Response
from flask_cors import cross_origin, CORS
from flask_api import status

from dbsetup import dbdeplacer
from dbsetup import dbpersonnel
from hashlib import sha256

from os import path
import globalledger as glb

deplacerApi = Blueprint('deplacerApi', __name__);
cors = CORS(deplacerApi, resources = { r"/*" : {"origins" : "*"}});


@deplacerApi.route('/register', methods = ['POST'])
@cross_origin()
def newDeplacer():
    content = request.get_json(force = True);
    if (all(key in content for key in ['personID', 'date', 'fromTime', 'toTime', 'motif'])):
        newdeplacer = deplacer(content['personID'],
                               content['date'],
                               content['fromTime'],
                               content['toTime'],
                               content['motif'],
                               
                               );
        dbdeplacer.insert_one(newdeplacer.__dict__);
        
        return 'OK', 200
    else:
        return 'INVALID REQUEST ARGS', 201

@deplacerApi.route('/', methods = ['GET'])
@cross_origin()
def usersWelcome():
    return Response('LES SE DEPLACER !!', status=status.HTTP_200_OK);

@deplacerApi.route('/list', methods = ['GET'])
@cross_origin()
def listUsers():
    res = dbdeplacer.find({});
    deplacerFunc = lambda d : {'id' : str(d['_id']), 'personID' : str(d['personID']),'date' : str(d['date']),'fromTime' : str(d['fromTime']),'toTime' : str(d['toTime']),'motif' : str(d['motif']),} 
    deplacers = list(map(deplacerFunc, res))
    # p = (', '.join(str(u) for u in users))
    return {'deplacers' : deplacers}, 200;

@deplacerApi.route('/listdu', methods = ['POST'])
@cross_origin()
def listDu():
    content = request.get_json(force = True);
    if ('date_' in content):
        # list by date 
        import datetime        
        try:
            datetime.datetime.strptime(content['date_'], '%Y/%m/%d')
        except:
            return 'INVALID REQUEST ARGS', 201;
        
        res = dbdeplacer.find({'date': content['date_']});
        deplacerFunc = lambda d : {'id' : str(d['_id']), 'personID' : str(d['personID']),'date' : str(d['date']),'fromTime' : str(d['fromTime']),'toTime' : str(d['toTime']),'motif' : str(d['motif']),} 
        deplacers = list(map(deplacerFunc, res))
        for dep in deplacers:
            pers = dep['personID'];
            print(pers)
            # res_ = dbpersonnel.find({"id" : ObjectId(str(pers))});/
            res_ = [ r for r in dbpersonnel.find({ "_id" :  ObjectId(str(pers))})];
            # print(len(res_));
            if len(res_) > 0:
                firstguy = res_[0];
                # print(firstguy);
                dep['appelation'] = firstguy["grade"] + ' ' + firstguy["nom"] + ' ' + firstguy["prenom"]
        # p = (', '.join(str(u) for u in users))
        
        return {'deplacers' : deplacers}, 200;
    else:
        return 'INVALID REQUEST ARGS', 201;