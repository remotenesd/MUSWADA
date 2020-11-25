# from pythonServer.core import block
################################################
#   MICROSERVICES INTEGRATION SOLUTION
#
###############################################


from sys import stdin
from flask import Flask
from flask.globals import request
from flask_cors import cross_origin, CORS
import socketio

# from usersApi import 
from blockapi import blocksApi
from todosApi import todosApi   

import globalledger

from os import path
filedir = (path.dirname(path.realpath(__file__)))




if __name__ == "__main__":
    from sys import argv
    from main import init
    init()

    port_ = int(argv[1])
    # import important info and the application itself
    print("[LOCAL] CURRENT PORT WITH APP", port_)
    globalledger.socketioinstance.run(globalledger.app, port = port_)
    # app.run(host='127.0.0.1', port=5001) # DEFAULT PORT WHEN NOT AUTHENTIFICATED
    
    
else:
    emitMyRegisteration = None