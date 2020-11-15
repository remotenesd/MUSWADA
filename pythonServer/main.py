# from pythonServer.core import block
from flask import Flask
from flask_cors import cross_origin, CORS

import core
import globalledger
# from flask_socketio import SocketIO
import socketio

def increaseBuildNumber():
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



################################################################
## IMPORTANT INITIALIZATIONS 
################################################################
def init2():
    blockchain = core.blockchain();

    globalledger.init()
    globalledger.app = Flask(__name__);
    cors = CORS(globalledger.app, ressources = { r"/*" : {"origins" : "*"} })
    globalledger.app.config['SECRET_KEY'] = 'jrieoy'
    globalledger.socketioinstance = socketio.SocketIO(globalledger.app)
    
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

########################################################
# REGISTERING APIS
########################################################
def init():
    init2()
    setUpRoutes()

    ## register
    from users import usersApi
    from blockapi import blocksApi
    from todosApi import todosApi
    globalledger.app.register_blueprint(usersApi, url_prefix='/user');
    globalledger.app.register_blueprint(blocksApi, url_prefix='/blockchain');
    globalledger.app.register_blueprint(todosApi, url_prefix='/todos');
########################################################


    
if __name__ == "__main__":
    globalledger.app.run(host='127.0.0.1', port=5001)
