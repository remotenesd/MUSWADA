import usertypes

def init():
    global loggedin
    global app, socketioinstance, versionData, blockchain, remoteNodes, addRemoteNode, getNodes

    socketioinstance = None
    app = None
    loggedin = None;

    versionData = -1
    blockchain = None

    ## blockchain nodes
    remoteNodes = []
    def addRemoteNode(rhost = '127.0.0.1', rport = '10000', username = 'JOE', id = -1):
        print("[+] ADDING ",(rhost, rport))
        # CHECK IF USER IS IN DB,
        # IF SO DECIDE TO UPDATE
        rhost = (rhost).decode("utf-8")
        if rhost in list(map(lambda s : s['rhost'], remoteNodes)):
            # well
            entry = list(filter(lambda item : item['rhost'] == rhost, remoteNodes))
            for item in entry:
                # check port
                if item['rport'] == rport:
                    # well, remove entryx   
                    remoteNodes.remove(item)
        remoteNodes.append({
            'rhost' : rhost,
            'rport' : (rport),
            'userName' : username,
            'id' : id
        })
        
    def getNodes():
        return remoteNodes

def getVersion():
    return "2.00 REV {0}".format(versionData);