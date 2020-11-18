# from pythonServer.core import block
import threading
from flask import Flask
from flask_cors import cross_origin, CORS

from p2phome import createP2P, addToRequests, n2, sendP2P
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
    globalledger.app = Flask(__name__);
    cors = CORS(globalledger.app, ressources = { r"/*" : {"origins" : "*"} })
    globalledger.app.config['SECRET_KEY'] = 'jrieoy'
    globalledger.socketioinstance = SocketIO(globalledger.app)
    
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
workerP2P = None
def init():
    global workerP2P
    # setUpRoutes()
    init2()

    from users import usersApi
    from blockapi import blocksApi
    from todosApi import todosApi
    from connectEverything import p2pApi

    # register actions
    ## register
    globalledger.app.register_blueprint(usersApi, url_prefix='/user');
    globalledger.app.register_blueprint(blocksApi, url_prefix='/blockchain');
    globalledger.app.register_blueprint(todosApi, url_prefix='/todos');
    globalledger.app.register_blueprint(p2pApi, url_prefix='/p2p');
    ## add specific features
    setUpRoutes()

    # working on P2P SERVICE
    workerP2P = threading.Thread(target = createP2P,  kwargs = {"parser" : parseRequest})
    workerP2P.start()

    senderP2P = threading.Thread(target = sendP2P)
    senderP2P.start()

    # finally
    broadcast()

def broadcast(username = '', id = -1):
    # IDENTIFY SELF TO OTHER PEERS
    # TODO IMPLEMENT DISCOVERY OPTION
    print("[BROADCAST] New broadcast.")
    myinfo = {
        'host' : '127.0.0.1',
        'port' : n2,
        'username' : username,
        'id' : id
    }
    addToRequests('HANDSHAKE', myinfo, '127.0.0.1', COMMON_PORT)


def parseRequest(request):
    # req = request
    print(request[b'title'])
    if request[b'title'] == b'GET_API_VERSION':
        # RETURNS THE API VERSION
        return versionData
    elif request[b'title'] == b'GET_ALL_NODES':
        # register nodes
        remoteNodes = request[b'content']
        # clear all prev records
        print(remoteNodes)
        globalledger.remoteNodes.clear()
        for node in remoteNodes:
            # register node
            print('[*] ',node)
            if node[b'port'] != n2:
                globalledger.addRemoteNode(node[b'host'], node[b'port'])
    elif request[b'title'] == '':
        print("[ERROR] !! EMPTY COMMAND !!")
        pass
    else:
        print("[ERROR] !! UNKNOWN COMMAND !!")
        pass

if False:
    
    pass
    
    
########################################################


    
if __name__ == "__main__":
    init()
    
    globalledger.app.run(host='127.0.0.1', port=5001)
    from time import sleep
    sleep(1)
    # addToRequests('GET_API_VERSION','')
