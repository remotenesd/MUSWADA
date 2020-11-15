# from pythonServer.main import newTransaction
# from core import block, blockchain, transaction
from flask import Flask, request, jsonify, Blueprint, Response
from flask_cors import cross_origin, CORS
from flask_api import status
# from flask_rest import RESTResource
from bson.json_util import dumps, ObjectId
import json
import jsonpickle



# import core
import usertypes
from dbsetup import dbtodos
from hashlib import sha256
from core import todo
from os import path
filedir = (path.dirname(path.realpath(__file__)))


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

# app = Flask(__name__);
todosApi = Blueprint('todosApi', __name__);
cors = CORS(todosApi, ressources = { r"/*" : {"origins" : "*"} })


@todosApi.route('/', methods = ['GET'])
@cross_origin()
def todosHome():
    return Response('TODOS HALL.', status=status.HTTP_200_OK);


@todosApi.route('/list', methods = ['GET'])
@cross_origin()
def todosList():
    res = dbtodos.find({})
    # p = (', '.join(str(u) for u in res))
    p = []
    for u in res:
        u['_id'] = str(u['_id'])
        p.append(u)
    return {"todos" : p}, 200

@todosApi.route('/save', methods = ['POST'])
@cross_origin()
def saveTodo():
    # request.content_type()
    content = request.get_json(force=True)
    # print(content['name'])
    # return str(content);
    #####################################
    # parse to user
    # print(' ;'.join(p for p in content))
    if (all(key in content for key in ['id','content','title', 'priority', 'status'])):
        # correct

        # process transaction into block


        # try to save into db
        nTodo = todo(content['id'], content['title'], content['content'], content['priority'], content['status']);
        # dbtransactions.insert_one(nTransaction.__dict__)
        dbtodos.insert_one(nTodo.__dict__)
        # dbtodos.save()

        return 'OK', 200
    else:
        return 'INVALID REQUEST ARGS', 201
    