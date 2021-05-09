from flask import Flask, request, jsonify, Blueprint, Response
from flask_cors import cross_origin, CORS
from flask_api import status

import usertypes
from dbsetup import dbpersonnel
from hashlib import sha256

from os import path
filedir = (path.dirname(path.realpath(__file__)))

import globalledger as glb

from bson.objectid import ObjectId

##############################################################
#!IMPORTANT THIS ASSUMES PASSWORD IS HASHED THROUGH 256 HASH 
##############################################################

# app = Flask(__name__);
personnelApi = Blueprint('personnelApi', __name__);
cors = CORS(personnelApi, ressources = { r"/*" : {"origins" : "*"} })

#########################################################
## DATABASE TABLE 
#######################################################




@personnelApi.route('/register', methods = ['POST'])
@cross_origin()
def newPers():
    content = request.get_json(force=True)
    # print(content['name'])
    # return str(content);
    #####################################
    # parse to user
    print(' ;'.join(p for p in content))
    if (all(key in content for key in ['nom','prenom','email','tel','matricule','grade','fonction', 'promotion', 'datenaissance', 'villenaissance', 'cni', 'enfants', 'ecolesciviles', 'ecolesmilitaires', 'addresse', 'personneEnCharge'])):
        # correct
        newuser = {
            'nom' : content['nom'],
            'prenom' : content['prenom'],
            'email' : content['email'],
            'tel' : content['tel'],
            'matricule' : content['matricule'],
            'grade' : content['grade'],
            'fonction' : content['fonction'],
            'datenaissance' : content['datenaissance'],
            'promotion' : content['promotion'],
            'villenaissance' : content['villenaissance'],
            'cni' : content['cni'],
            'ecolesciviles' : content['ecolesciviles'],
            'ecolesmilitaires' : content['ecolesmilitaires'],
            'enfants' : content['enfants'],
            'addresse' : content['addresse'],
            'personneEnCharge' : content['personneEnCharge'],
            
            'commune' : content['commune'],
            'province' : content['province']  ,
            'nomPere' : content['nomPere'],
            'nomMere' : content['nomMere'],
            'professionPere' : content['professionPere'],
            'professionMere' : content['professionMere'],
            'situationMatrimoniale' : content['situationMatrimoniale']  ,
            'nbrEnfants' : content['nbrEnfants'],
            'dateMarriage' : content['dateMarriage']  ,
            'lieuMarriage' : content['lieuMarriage']  ,
            'nomEpouse' : content['nomEpouse']  ,
            'prenomEpouse' : content['prenomEpouse']  ,
            'filledePere' : content['filledePere']  ,
            'filledeMere' : content['filledeMere']  ,
            'nationnalite' : content['nationnalite']  ,
            'professionEpouse' : content['professionEpouse']  ,
            'professionOrganismeEpouse' : content['professionOrganismeEpouse']  ,
            'professionPereEpouse' : content['professionPereEpouse']  ,
            'professionMereEpouse' : content['professionMereEpouse']  ,
            'diplomeUniversitaire' : content['diplomeUniversitaire'],
            'niveauInstruction' : content['niveauInstruction']  ,
            'langueEtrangeres' : content['langueEtrangeres'],
            'dialectesParles' : content['dialectesParles'],
            'dateFonction' : content['dateFonction']  ,
            'numCarteMilitaire' : content['numCarteMilitaire']  ,
            'nrSOM' : content['nrSOM']  ,
            'nrCCP' : content['nrCCP']  ,
        }
        dbpersonnel.insert_one(newuser)

        return 'OK', 200
    else:
        return 'INVALID REQUEST ARGS', 201


def properlyFormat(str_ = "", len_ = 8):
    # format a string
    len_ = str(len_)
    newstr = ("{:^" + len_ + "}").format(str_);
    return newstr.replace(' ', '.')

@personnelApi.route('/profile', methods = ['POST'])
@cross_origin()
def getPers():
    content = request.get_json(force=True)
    # print(content['name'])
    # return str(content);
    #####################################
    # parse to user
    # print(' ;'.join(p for p in content))
    if (all(key in content for key in ['profile'])):
        # correct
        res = [ r for r in dbpersonnel.find({ "_id" :  ObjectId(content['profile'])})];
        
        # from random import randrange
            
        for val in res:
            val["_id"] = str(val["_id"]);
            return  { 'profile' : (val) }, 200
        
        return 'INVALID REQUEST ARGS', 201
    else:
        return 'INVALID REQUEST ARGS', 201

    
def digitize(res):
    from random import randrange
            
    for val in res:
        val["_id"] = str(val["_id"]);
        
        worddoc = "generated_doc{}.docx".format(randrange(1,100000));
        
        from docxtpl import DocxTemplate
        doc = DocxTemplate("fiche.docx")
        
        from datetime import date
        
        
        
        context = { 
                "addresse" : val["addresse"] ,
                "ecolesciviles" : val["ecolesciviles"] ,
                "ecolesmilitaires" : val["ecolesmilitaires"] ,
                "personneEnCharge" : val["personneEnCharge"] ,

                "nom" : properlyFormat(val["nom"], 20),
                "prenom" : properlyFormat(val["prenom"], 20) ,
                "email" : val["email"] ,

                "grade" : val["grade"] ,
                "cni" : val["cni"] ,
                "fonction" : val["fonction"] ,
                "promotion" : val["promotion"] ,
                "villenaissance" : val["villenaissance"] ,
                "datenaissance" : val["datenaissance"] ,
                "tel" : val["tel"] ,
                "matricule" : val["matricule"] ,
                
                "commune" : val["commune"],
                "province" : val["province"]  ,
                "nomPere" : val["nomPere"],
                "nomMere" : val["nomMere"],
                "professionPere" : val["professionPere"],
                "professionMere" : val["professionMere"],
                "situationMatrimoniale" : val["situationMatrimoniale"]  ,
                "nbrEnfants" : val["nbrEnfants"],
                "dateMarriage" : val["dateMarriage"]  ,
                "lieuMarriage" : val["lieuMarriage"]  ,
                "nomEpouse" : val["nomEpouse"]  ,
                "prenomEpouse" : val["prenomEpouse"]  ,
                "filledePere" : val["filledePere"]  ,
                "filledeMere" : val["filledeMere"]  ,
                "nationnalite" : val["nationnalite"]  ,
                "professionEpouse" : val["professionEpouse"]  ,
                "professionOrganismeEpouse" : val["professionOrganismeEpouse"]  ,
                "professionPereEpouse" : val["professionPereEpouse"]  ,
                "professionMereEpouse" : val["professionMereEpouse"]  ,
                "diplomeUniversitaire" : val["diplomeUniversitaire"],
                "niveauInstruction" : val["niveauInstruction"]  ,
                "langueEtrangeres" : val["langueEtrangeres"],
                "dialectesParles" : val["dialectesParles"],
                "dateFonction" : val["dateFonction"]  ,
                "numCarteMilitaire" : val["numCarteMilitaire"]  ,
                "nrSOM" : val["nrSOM"]  ,
                "nrCCP" : val["nrCCP"]  ,
                "dateAujourdhui" : date.today(),
        }
        
        indexer = 0;
        for enfant in val["enfants"]:
            # try to add enfant to context !
            context["enfants" + str(indexer)] = enfant
            indexer+=1;
        
        indexer = 0;
        for ecole in val["ecolesciviles"]:
            # try to add enfant to context !
            context["ecole" + str(indexer)] = ecole
            indexer+=1;
        
        indexer = 0;
        for ecole in val["ecolesmilitaires"]:
            # try to add enfant to context !
            context["ecolem" + str(indexer)] = ecole
            indexer+=1;
            
            
        doc.render(context)
        doc.save(worddoc)
        
        import pythoncom

        pythoncom.CoInitialize()
        
        from docx2pdf import convert
        convert(worddoc)
        
        return  { 'profile' : (val) , 'genDoc' : worddoc, 'genPdf' : worddoc.replace('docx','pdf')}, 200
    return 'INVALID REQUEST ARGS', 201
    
@personnelApi.route('/printprofile', methods = ['POST'])
@cross_origin()
def printPers():
    content = request.get_json(force=True)
    # print(content['name'])
    # return str(content);
    #####################################
    # parse to user
    # print(' ;'.join(p for p in content))
    if (all(key in content for key in ['profile'])):
        # correct
        res = [ r for r in dbpersonnel.find({ "_id" :  ObjectId(content['profile'])})];
        return digitize(res);        
    else:
        return 'INVALID REQUEST ARGS', 201
    
@personnelApi.route('/printprofileprinter', methods= ['POST'])
@cross_origin()
def printFile():
    content = request.get_json(force=True)
    if (all(key in content for key in ['profile'])):
        # correct
        res = [ r for r in dbpersonnel.find({ "_id" :  ObjectId(content['profile'])})];
        final = digitize(res);
        if final[1] == 200:
            import os
            os.startfile(final[0]['genPdf'],'print')
            return  {  }, 200
        else:
            return 'INVALID REQUEST ARGS', 201
    else:
        return 'INVALID REQUEST ARGS', 201
    
@personnelApi.route('/', methods = ['GET'])
@cross_origin()
def usersWelcome():
    return Response('USERS API VERANDA', status=status.HTTP_200_OK);


@personnelApi.route('/list', methods = ['GET'])
@cross_origin()
def listUsers():
    users = dbpersonnel.find({});
    # p = (', '.join(str(u) for u in users))
    baseUser = lambda user : {'id' : str(user['_id']) , 'nom' : user['nom'], 'prenom' : user['prenom'], 'grade' : user['grade'] }
    
    users = list(map(baseUser, users))
    print(users)
    return { 'users' : (users) }, 200;

