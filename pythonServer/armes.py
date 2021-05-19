from datetime import datetime
from bson.objectid import ObjectId
from flask import Flask, request, jsonify, Blueprint, Response
from flask_cors import cross_origin, CORS
from flask_api import status

from dbsetup import dbarmes, dbpersonnel

armesApi = Blueprint('armesApi', __name__);
cors = CORS(armesApi, resources = { r"/*" : {"origins" : "*"}});

@armesApi.route('/sendPriseArmes', methods = ['POST'])
@cross_origin()
def newDeplacer():
    content = request.get_json(force = True);

    import datetime
    today = str(datetime.date.today())

    if (all(key in content for key in ['officierGarde','radioService','maitreService','quartCoupee', 'quartMachine','capitaineArme','infirmier','sc','comie','boulongier','cuisinier','maitreHotel','stage','consultation','absent','ptc','ronde'])):
        context = {
            "officierGarde" : content["officierGarde"],
            "radioService" : content["radioService"],
            "maitreService" : content["maitreService"],
            "quartCoupee" : content["quartCoupee"],
            "quartMachine" : content["quartMachine"],
            "capitaineArme" : content["capitaineArme"],
            "infirmier" : content["infirmier"],
            "sc" : content["sc"],
            "comie" : content["comie"],
            "boulongier" : content["boulongier"],
            "cuisinier" : content["cuisinier"],
            "maitreHotel" : content["maitreHotel"],
            "stage" : content["stage"],
            "consultation" : content["consultation"],
            "absent" : content["absent"],
            "ptc" : content["ptc"],
            "ronde" : content["ronde"],
            "date" : today
        }

        dbarmes.insert_one(context);
        
        return 'OK', 200
    else:
        return 'INVALID REQUEST ARGS', 201

@armesApi.route('/', methods = ['GET'])
@cross_origin()
def usersWelcome():
    return Response('PRISE D ARMES !', status=status.HTTP_200_OK);

@armesApi.route('/list', methods = ['GET'])
@cross_origin()
def listArmes():
    res = dbarmes.find({});
    deplacerFunc = lambda d : {
            'id' : str(d['_id']), 
            'maitreService' : str(d['maitreService']),
            'radioService' : str(d['radioService']),
            'officierGarde' : str(d['officierGarde']),
            'date' : str(d['date']),
            'capitaineArme' : str(d['capitaineArme']),
    } 
    deplacers = list(map(deplacerFunc, res))
    # p = (', '.join(str(u) for u in users))
    return {'armes' : deplacers}, 200;

def listeDuNonAPI(date_):
    date_ = str(date_).replace('/','-')
    res = dbarmes.find({'date': date_});

    deplacerFunc = lambda d : {
            'id' : str(d['_id']), 
            'ronde' : (d['ronde']), 
            'ptc' : (d['ptc']), 
            'absent' : (d['absent']),
            'consultation' : (d['consultation']),
            'stage' : (d['stage']),
            'maitreHotel' : (d['maitreHotel']),
            'cuisinier' : (d['cuisinier']),
            'boulongier' : (d['boulongier']),
            'comie' : (d['comie']),
            'sc' : (d['sc']),
            'infirmier' : (d['infirmier']),
            'quartMachine' : (d['quartMachine']),
            'quartCoupee' : (d['quartCoupee']),
            'maitreService' : (d['maitreService']),
            'radioService' : (d['radioService']),
            'officierGarde' : (d['officierGarde']),
            'date' : (d['date']),
            'capitaineArme' : (d['capitaineArme']),
    } 
            
    deplacers = list(map(deplacerFunc, res))

    return deplacers


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
    doc = DocxTemplate("priseArmes.docx")
    
    from datetime import date
    today = str(datetime.today())

    context = {
        "capitaineArme" : getAppelation(val["capitaineArme"]),
        "infirmier" : getAppelation(val["infirmier"]),
        "sc" : getAppelation(val["sc"]),
        "comie" : getAppelation(val["comie"]),
        "ronde" : getAppelation(val["ronde"]),
        "date" : today,
    }


    multitude = [
        'officierGarde','radioService','maitreService',
        'quartCoupee', 'quartMachine'
        ,'boulongier','cuisinier','maitreHotel',
        'stage','consultation','absent', 'permission',
        'ptc']
    
    for mul in multitude:
        indexer = 0
        for itm in val[mul]:
            # try to add item to context !
            res = [ r for r in dbpersonnel.find({ "_id" :  ObjectId(itm)})];
            firstguy = res[0]
            context[mul + str(indexer)] = firstguy["grade"] + ' ' + firstguy["nom"] + ' ' + firstguy["prenom"]
            indexer+=1;
        context["total" + mul] = len(val[mul])
    
    doc.render(context=context)
    doc.save(worddoc)

    import pythoncom
    pythoncom.CoInitialize()
    from docx2pdf import convert
    convert(worddoc)

    return  { 'profile' : (val) , 'genDoc' : worddoc, 'genPdf' : worddoc.replace('docx','pdf')}, 200


@armesApi.route('/doc', methods=['POST'])
@cross_origin()
def generateDOC():
    content = request.get_json(force = True);

    if (all(key in content for key in ['officierGarde','radioService','maitreService','quartCoupee', 'quartMachine','capitaineArme','infirmier','sc','comie','boulongier','cuisinier','maitreHotel','stage','consultation','absent','ptc','ronde'])):
        return digitize(content)
    else:
        return 'INVALID REQUEST ARGS', 201

@armesApi.route('/listdu', methods = ['POST'])
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
        
        lst = listeDuNonAPI(content['date_']);
        foundAny = len(lst) > 0
        return {'armes' : lst, 'exist' : foundAny}, 200;
    else:
        return 'INVALID REQUEST ARGS', 201;