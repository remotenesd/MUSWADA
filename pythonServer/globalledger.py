import usertypes

def init():
    global loggedin
    global app, socketioinstance, versionData, blockchain

    socketioinstance = None
    app = None
    loggedin = None;

    versionData = -1
    blockchain = None

def getVersion():
    return "2.00 REV {0}".format(versionData);