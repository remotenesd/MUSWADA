import usertypes
verbose = False

def init():
    global loggedin, lhost, lport
    global app, socketioinstance, versionData, blockchain, remoteNodes, addRemoteNode, getNodes, updateRequired

    lhost = '127.0.0.1'
    lport = -1

    socketioinstance = None
    app = None
    loggedin = None;

    versionData = -1
    blockchain = None

    ## blockchain nodes
    remoteNodes = []
    
    updateRequired = []
    
    def correctStr(obj):
        if isinstance(obj, int):
            return obj
        elif isinstance(obj, str):
            return obj
        else:
            return obj.decode('utf-8')
    def addRemoteNode(rhost = '127.0.0.1', rport = '10000', username = 'JOE', id = -1):
        if verbose: 
            print("[+] ADDING ",(rhost, rport))
            
        rhost = correctStr(rhost)
        rport =  correctStr(rport)
        username = correctStr(username)
        id = correctStr(id)
        # CHECK IF USER IS IN DB,
        # IF SO DECIDE TO UPDATE
        # rhost = (rhost).decode("utf-8")
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