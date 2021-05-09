# from pythonServer.core import block
# from usertypes import permission
import threading
from flask import Flask
from flask_cors import cross_origin, CORS

import core as core
import globalledger as globalledger
from flask_socketio import SocketIO


COMMON_PORT = 35790
versionData = ''

def increaseBuildNumber():
    global versionData
    
    from os import path
    filedir = (path.dirname(path.realpath(__file__)))

    versionData = 0;
    with  open(filedir + r'\version.txt', 'r+' ) as file_object:
        versionData = file_object.read();
        # file_object = open('version.txt', 'w+');
        file_object.seek(0);
        xt = versionData.split('\n')[0];
        try:
            #
            versionData = int(xt) + 1;
        except:
            versionData = 0;
        file_object.write(str(versionData));
        file_object.truncate();
        globalledger.versionData = versionData
        print('[INFO] VERSION 1',str(versionData / 1000))



################################################################
## IMPORTANT INITIALIZATIONS 
################################################################
def init2():
    global versionData
    globalledger.blockchain = core.blockchain();

    globalledger.init()
    globalledger.lport = 5001
    globalledger.app = Flask(__name__);
    cors = CORS(globalledger.app, ressources = { r"/*" : {"origins" : "*"} })
    globalledger.app.config['SECRET_KEY'] = 'jrieoy'
    
    increaseBuildNumber()



def setUpRoutes():
    @globalledger.app.route('/')
    @cross_origin()
    def hello():
        return "1.00 REV {0}".format(globalledger.versionData), 200

    def getVersion():
        return "2.00 REV {0}".format(globalledger.versionData);

    @globalledger.app.route('/misc/getVersion')
    @cross_origin()
    def getApiVersion():
        return { 'version' : getVersion() }, 200
    
    @globalledger.app.route('/misc/getP2PInfo', methods = ['GET'])
    @cross_origin()
    def getP2PInfo():
        return {
            'lhost' : globalledger.lhost,
            'lport' : globalledger.lport
        }, 200

########################################################
# REGISTERING APIS
########################################################
workerP2P = None
def init():
    global workerP2P
    # setUpRoutes()
    init2()
    from users import usersApi
    from todosApi import todosApi
    # from connectEverything import p2pApi
    from personnel import personnelApi
    from sedeplacer import deplacerApi
    from permissions import permissionApi
    from dbapp import appApi

    # register actions
    ## register
    globalledger.app.register_blueprint(appApi, url_prefix='/app')
    globalledger.app.register_blueprint(usersApi, url_prefix='/user');
    globalledger.app.register_blueprint(todosApi, url_prefix='/todos');
    globalledger.app.register_blueprint(personnelApi, url_prefix='/pers');
    globalledger.app.register_blueprint(permissionApi, url_prefix='/permission');
    globalledger.app.register_blueprint(deplacerApi, url_prefix='/deplacer');
    ## add specific features
    setUpRoutes()

########################################################


    
if __name__ == "__main__":
    init()
    
    globalledger.app.run(host='127.0.0.1', port=5001)
