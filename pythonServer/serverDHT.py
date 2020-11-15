
from flask.app import Flask
# from flask_cors import cross_origin, CORS
from flask_socketio import SocketIO, emit, send
import socketio
# import socketio
import eventlet

from os import path
filedir = (path.dirname(path.realpath(__file__)))

from random import randint


if __name__ == "__main__":
    from sys import argv
    # init

    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'jrieoy'

    socketio = SocketIO(app)

    @socketio.on('connection')
    def handleConnection():
        print("connection established")

    socketio.emit('connection', broadcast=True)
    socketio.run(app, port=randint(1000,9000))
else:
    emitMyRegisteration = None