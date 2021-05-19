from datetime import datetime
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

def listDuNonAPI(b):
    # it works ! 
    import datetime     
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
    
    return newDeplacers;
    

@permissionApi.route('/permissionsdu', methods = ['POST'])
@cross_origin()
def listDu():
    content = request.get_json(force = True);
    if ('date_' in content):
        # list by date 
        import datetime        
        try:
            datetime.datetime.strptime(content['date_'], '%Y/%m/%d')
            datetime.date.today()
        except:
            return 'INVALID REQUEST ARGS', 201;

        
        # get dates btw
        
        b = datetime.datetime.strptime(content['date_'], '%Y/%m/%d')

        return {'permissions' : listDuNonAPI(b)}, 200;
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


def getAppelation(id_):
    if id_ == None or id_ == '' or len(id_) == 0:
        return ''
    id_ = id_[0]
    res = [ r for r in dbpersonnel.find({ "_id" :  ObjectId(id_)})];
    firstguy = res[0]
    return firstguy["grade"] + ' ' + firstguy["nom"] + ' ' + firstguy["prenom"]
def digitize(res):
    from random import randrange
            
    val = res

    # val["_id"] = str(val["_id"]);
    
    worddoc = "generated_doc{}.docx".format(randrange(1,100000));
    
    from docxtpl import DocxTemplate
    doc = DocxTemplate("permission.docx")
    
    from datetime import date
    today = str(date.today())

    context = {
        "nomprenom" : (val["nomprenom"]),
        "grade" : (val["grade"]),
        "duree" : (val["duree"]),
        "valableDu" : (val["valableDu"]),
        "valableAu" : (val["valableAu"]),
        "allerDe" : (val["allerDe"]),
        "allerA" : (val["allerA"]),
        "lieu" : (val["lieu"]),
        "date" : today,
    }
    
    doc.render(context=context)
    doc.save(worddoc)

    import pythoncom
    pythoncom.CoInitialize()
    from docx2pdf import convert
    convert(worddoc)

    return  { 'profile' : (val) , 'genDoc' : worddoc, 'genPdf' : worddoc.replace('docx','pdf')}, 200


@permissionApi.route('/doc', methods=['POST'])
@cross_origin()
def generateDOC():
    content = request.get_json(force = True);

    if (all(key in content for key in ['nomprenom','grade','duree','valableDu', 'valableAu','allerDe','allerA','lieu'])):
        return digitize(content)
    else:
        return 'INVALID REQUEST ARGS', 201