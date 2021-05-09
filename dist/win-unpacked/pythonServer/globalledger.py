import usertypes
verbose = False

def init():
    global loggedin, lhost, lport
    global app, versionData, updateRequired

    lhost = '127.0.0.1'
    lport = -1

    app = None
    loggedin = None;

    versionData = -1

    
    updateRequired = []
    
    def correctStr(obj):
        if isinstance(obj, int):
            return obj
        elif isinstance(obj, str):
            return obj
        else:
            return obj.decode('utf-8')


def getVersion():
    return "2.00 REV {0}".format(versionData);