from bson.objectid import ObjectId
from usertypes import permission
from flask import Flask, request, jsonify, Blueprint, Response
from flask_cors import cross_origin, CORS
from flask_api import status

from dbsetup import dbpermission
from dbsetup import dbpersonnel
from hashlib import sha256

from os import path
import globalledger as glb

permissionApi = Blueprint('permissionApi', __name__);
cors = CORS(permissionApi, resources = { r"/*" : {"origins" : "*"}});


@permissionApi.route('/register', methods = ['POST'])
@cross_origin()
def newPermission():
    content = request.get_json(force = True);
    if (all(key in content for key in ['personID', 'fromDate', 'toDate', 'addresse'])):
        newdeplacer = permission(content['personID'],
                               content['fromDate'],
                               content['toDate'],
                               content['addresse'],
                               );
        dbpermission.insert_one(newdeplacer.__dict__);
        
        return 'OK', 200
    else:
        return 'INVALID REQUEST ARGS', 201

@permissionApi.route('/', methods = ['GET'])
@cross_origin()
def usersWelcome():
    return Response('LES PERMISSIONS !!', status=status.HTTP_200_OK);

@permissionApi.route('/list', methods = ['GET'])
@cross_origin()
def listUsers():
    res = dbpermission.find({});
    deplacerFunc = lambda d : {'id' : str(d['_id']), 'personID' : str(d['personID']),'fromDate' : str(d['fromDate']),'toDate' : str(d['toDate']),'addresse' : str(d['addresse']),} 
    deplacers = list(map(deplacerFunc, res))
    # p = (', '.join(str(u) for u in users))
    return {'permissions' : deplacers}, 200;

@permissionApi.route('/permissionsdu', methods = ['POST'])
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

        
        # get dates btw
        
        b = datetime.datetime.strptime(content['date_'], '%Y/%m/%d')
        
        #
        
        res = dbpermission.find({});
        deplacerFunc = lambda d : {'id' : str(d['_id']), 'personID' : str(d['personID']),'fromDate' : str(d['fromDate']),'toDate' : str(d['toDate']),'addresse' : str(d['addresse']),} 
        deplacers = list(map(deplacerFunc, res))
        for dep in deplacers:
            pers = dep['personID'];
            # res_ = dbpersonnel.find({"id" : ObjectId(str(pers))});/
            a = datetime.datetime.strptime(dep['fromDate'], '%Y/%m/%d');
            c = datetime.datetime.strptime(dep['toDate'], '%Y/%m/%d');
            
            if a <= b <= c:
                # if true then get the person's name !
                res_ = [ r for r in dbpersonnel.find({ "_id" :  ObjectId(str(pers))})];
                # print(len(res_));
                if len(res_) > 0:
                    firstguy = res_[0];
                    # print(firstguy);
                    dep['appelation'] = firstguy["grade"] + ' ' + firstguy["nom"] + ' ' + firstguy["prenom"]
            else:
                dep['appelation'] = ''
                
        newDeplacers = [d for d in deplacers if d['appelation'] != '']
        # p = (', '.join(str(u) for u in users))
        
        return {'permissions' : newDeplacers}, 200;
    else:
        return 'INVALID REQUEST ARGS', 201;
    
@permissionApi.route('/permissionsde', methods = ['POST'])
@cross_origin()
def listDe():
    content = request.get_json(force = True);
    if ('personID' in content):
        # list by date 
        
        
        res = dbpermission.find({'personID': content['personID']});
        deplacerFunc = lambda d : {'id' : str(d['_id']), 'personID' : str(d['personID']),'fromDate' : str(d['fromDate']),'toDate' : str(d['toDate']),'addresse' : str(d['addresse']),} 
        deplacers = list(map(deplacerFunc, res))
        # p = (', '.join(str(u) for u in users))
        for dep in deplacers:
            pers = dep['personID'];
            res_ = [ r for r in dbpersonnel.find({ "_id" :  ObjectId(str(pers))})];
                # print(len(res_));
            if len(res_) > 0:
                firstguy = res_[0];
                # print(firstguy);
                dep['appelation'] = firstguy["grade"] + ' ' + firstguy["nom"] + ' ' + firstguy["prenom"]
        return {'permissions' : deplacers}, 200;
    else:
        return 'INVALID REQUEST ARGS', 201;