# from pythonServer.main import newTransaction
from core import block, blockchain, transaction
from flask import Flask, request, jsonify, Blueprint, Response
from flask_cors import cross_origin, CORS
from flask_api import status

# import core
import usertypes
from dbsetup import dbblocks, dbtransactions
from hashlib import sha256

from os import path
filedir = (path.dirname(path.realpath(__file__)))

# app = Flask(__name__);
blocksApi = Blueprint('blocksApi', __name__);
cors = CORS(blocksApi, ressources = { r"/*" : {"origins" : "*"} })

#########################################################
## DATABASE TABLE PROCESS INTO MEM
## INVALIDATED BLOCKS NOT SAVED BE CAREFUL
#######################################################

myblkchn : blockchain = None


def dbload():
    global myblkchn
    # load blockchain into mem
    blocks = dbblocks.find({}) ## load all blocks
    # add block into blockchain
    myblocks = []
    for block in blocks:
        myblocks.append(block)
    myblkchn = blockchain(myblocks)
    print(myblkchn)
    # TODO ADD SUPPORT FOR INVALIDATED BLOCKS

# if (__name__ == "__main__"):
dbload();

@blocksApi.route('/', methods = ['GET'])
@cross_origin()
def blockchainWelcome():
    return Response('BLOCKS HALL.', status=status.HTTP_200_OK);

@blocksApi.route('/addTransaction', methods = ['POST'])
@cross_origin()
def newTransaction():
    # request.content_type()
    content = request.get_json(force=True)
    if finalizeTransactionRequest(content):
        return 'OK', 200
    else:
        return 'INVALID REQUEST ARGS', 201


    

def finalizeTransactionRequest(content):
    global myblkchn
    if (all(key in content for key in ['sender','data','signature'])):
        # correct

        # TODO process transaction into block

        # try to save into db
        nTransaction = transaction(content['sender'], content['data'], content['signature']);
        # dbtransactions.insert_one(nTransaction.__dict__)
        myblkchn.addTransaction(nTransaction)
        return True
    else:
        return False
        
    
    


@blocksApi.route('/list', methods = ['GET'])
@cross_origin()
def listUsers():
    # blocks = dbblocks.find({});   
    p = (', '.join(str(u) for u in myblkchn.blocks))
    p += (' ,'.join(str(j.__dict__) for u in myblkchn.invalidatedBlocks for j in u.data ))
    return {'blocks' : p}, 200;