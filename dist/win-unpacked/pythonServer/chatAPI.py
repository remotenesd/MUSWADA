from flask import request, jsonify, Blueprint, Response
from flask_cors import CORS, cross_origin
import json
import globalledger as glb

# import core
import usertypes
from dbsetup import dbchat
from core import msg as msg_
from os import path
filedir = (path.dirname(path.realpath(__file__)))

chatAPI = Blueprint('chatApi', __name__)
cors = CORS(chatAPI, ressources = { r"/*" : {"origins" : "*"}})

@chatAPI.route('/', methods=['GET'])
@cross_origin()
def chatHome():
    return Response('CHATS AND MESSAGES.', 200)

@chatAPI.route('/toid', methods=['POST'])
@cross_origin()
def sendToId():
    # find person
    content = request.get_json(force = True)
    if ('id' in content and 'content' in content):
        msg = msg_(glb.loggedin['_id'], 
                    content['id'], 
                    content['content'], 
                    '',
                    'UNREAD'
                )
        dbchat.insert_one(msg.__dict__)
        return {}, 200
    else:
        return "Input data invalid", 401

@chatAPI.route('/byid', methods = ['POST'])
@cross_origin()
def getMessagesById():
    # by id
    content = request.get_json(force = True)
    if ('id' in content):
        #first the messages we received
        sent = dbchat.find({ 'senderID' : content['id']})
        # then those we sent
        rec = dbchat.find({ 'receiverID' : content['id']})
        # now combine in one response
        sent = [str(u['content']) for u in sent]
        rec = [str(u['content']) for u in rec]
        
        return {
            "sent" : sent,
            "rec" : rec, 
        }, 200
    else:
        return Response("No id", 401)