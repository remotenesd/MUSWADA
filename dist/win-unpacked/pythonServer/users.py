from flask import Flask, request, jsonify, Blueprint, Response
from flask_cors import cross_origin, CORS
from flask_api import status

import core
import usertypes
from dbsetup import dbusers
from hashlib import sha256

from os import path
filedir = (path.dirname(path.realpath(__file__)))

from myp2p import emitMyRegisteration
import globalledger as glb

##############################################################
#!IMPORTANT THIS ASSUMES PASSWORD IS HASHED THROUGH 256 HASH 
##############################################################

# app = Flask(__name__);
usersApi = Blueprint('usersApi', __name__);
cors = CORS(usersApi, ressources = { r"/*" : {"origins" : "*"} })

#########################################################
## DATABASE TABLE 
#######################################################


def registerUser(user):
    ### register logged in user
    print("[LOGIN] SUCCESS.", user)
    loggedin = user;
    ## let's update (broadcast) our P2P status ID
    from main import broadcast
    glb.loggedin = user
    broadcast(user['name'], str(user['_id']))

def unregisterUser():
    # logout
    loggedin = None;


@glb.socketioinstance.on('newUserRegistration')
def handleNewUserRegisteration(json):
    print('Starting user registration ' + json)
    req = {
            'sender' : json.sender,
            'data' : json.data,
            'signature' : 'everything valid for now'
        };

    blocksApi.finalizeTransactionRequest(req)
    print(req)


def emitMyRegisteration(req):
    print('emiting event')
    # glb.socketioinstance.emit('newUserRegisteration', req)
    #!IMPORTANT TODO ADD EMISSION OF MY REGISTERATION TO P2P

@glb.socketioinstance.on('reqAPIVersion')
def sendAPIVersion():
    glb.socketioinstance.emit('getAPIVersion' ,  glb.getVersion())


@usersApi.route('/register', methods = ['POST'])
@cross_origin()
def newUser():
    # request.content_type()
    content = request.get_json(force=True)
    # print(content['name'])
    # return str(content);
    #####################################
    # parse to user
    # print(' ;'.join(p for p in content))
    if (all(key in content for key in ['name','password','email'])):
        # correct
        newuser = usertypes.user(content['name'], content['email'], content['password']);
        dbusers.insert_one(newuser.__dict__)

        # emit registeration event
        req = {
                'sender' : content['name'],
                'data' : newuser.getPort(),
                'signature' : 'everything valid for now'
        }
        # print(emitMyRegisteration)
        if (emitMyRegisteration) :
            emitMyRegisteration(req)

        return 'OK', 200
    else:
        return 'INVALID REQUEST ARGS', 201
    
@usersApi.route('/', methods = ['GET'])
@cross_origin()
def usersWelcome():
    return Response('USERS API VERANDA', status=status.HTTP_200_OK);


@usersApi.route('/list', methods = ['GET'])
@cross_origin()
def listUsers():
    users = dbusers.find({});
    p = (', '.join(str(u) for u in users))
    return p, 200;

@usersApi.route('/login', methods = ['POST'])
@cross_origin()
def login():
    content = request.get_json(force = True);
    # see if all params present
    if ('name' in content and 'password' in content):
        results = dbusers.find({'name' : content['name']});
        
        ### is there a user with the name ?
        if (results.count() > 0):
            ## okay
            # correctLogin = None
            # print(' ;'.join(str(p) for p in results))
            for usr in results:
                print(usr['password'])
                if usr['password'] == content['password']:
                    registerUser(usr)
                    return Response('OK', 200)
                else:
                    return Response('INCORRECT KEY', status.HTTP_401_UNAUTHORIZED)
            # ex = map( 
            #     lambda user : user if user.password == content['password'] else None
            #         , results);
        else:
            return Response('INCORRECT LOGIN', status.HTTP_401_UNAUTHORIZED)
    else:
        return Response('INVALID', status.HTTP_401_UNAUTHORIZED)
    return Response('UNKNOWN', status.HTTP_500_INTERNAL_SERVER_ERROR)

@usersApi.route('/isUsernameTaken', methods = ['POST'])
@cross_origin()
def doesUserExist():
    content = request.get_json(force = True);
    # see if all params present
    if ('username' in content):
        results = dbusers.find({'name' : content['username']});
        b = (results.count() > 0);
        return jsonify({'exist' : b, 'ok' : 'ok'}), 200;
    else:
        return Response('INVALID', status.HTTP_401_UNAUTHORIZED)
    return Response('UNKNOWN', status.HTTP_500_INTERNAL_SERVER_ERROR)

@usersApi.route('/logout', methods = ['POST'])
@cross_origin()
def logout():
    r=unregisterUser();
    return Response('OK', status.HTTP_200_OK);