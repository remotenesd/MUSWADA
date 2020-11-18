# from pythonServer.main import parseRequest
import socket
from time import sleep
import msgpack

import time
import threading
# import pprint

from random import randint
n = randint(12000, 64000)
n2 = randint(12000, 64000)
outRequests = []
inRequests = []

def addToRequests(title = '', content = None, rhost = '', rport = n):
    # convert req to bin form  for transmission
    global outRequests
    
    d = msgpack.packb({
        'title' : title,
        'content' : content,
        'rhost' : rhost,
        'rport' : rport
    })
    # print('[LOCAL] ',d)
    outRequests.append({ 'rhost' : rhost, 'rport' : rport, 'data' : d })
    # print(outRequests)

sock = socket.socket(socket.AF_INET,socket.SOCK_DGRAM)
sock.bind(('127.0.0.1',n2))

# Create our UDP socket and bind it to a random high port on all interfaces
def createP2P(parser = None):
    # global sock
    # Tell the user what port it's on
    print('[LOCAL] Listening for peers on UDP port %s' % sock.getsockname()[1])

    # Listen for packets and then do stuff with them
    while True:
        # sock.setblocking(False)
        in_data,in_addr = sock.recvfrom(65536) # get a packet and get data
        print('[LOCAL] Got a packet from %s' % str(in_addr))

        # Try and decode the packet's data and then print the contents
        # print(parser)
        data = None
        try:
            data = msgpack.unpackb(in_data)
        except:
            print('[LOCAL] ERR! Could not unpack data from peer')
        if parser != None:
            parser(data)
            # print(data)
        
        ## wait for some time until next iteration
        time.sleep(1);

def sendP2P():
    global sock
    while True:
        while len(outRequests) > 0:
                ## empty the lot
                req = outRequests.pop()
                # print(req)
                print("[LOCAL] SENDING REQ TO ",(req['rhost'], req['rport']))
                sock.sendto(req['data'], (req['rhost'], int(req['rport'])))
                time.sleep(0.1)
        sleep(1)



if __name__ == "__main__":
    time.sleep(3)
    # workerP2P = threading.Thread(target= createP2Pn, kwargs = {"parser" : parseRequest})
    # workerP2P.start()
    time.sleep(1)
    # addToRequests('hey there', 'good so far')
    # addToRequests('hey there', 'good so far')

    # workerP2P = threading.Thread(target= sendP2P, args=())
    # workerP2P.start()

    # while True:
    #     r = randint(10,20000)
    #     addToRequests('rndcheck', str(r))
    #     time.sleep(3)
##################client
#  import socket
#  import msgpack
#  s.bind(('',0))
#  d = msgpack.packb({'hello' : 'hello world !'})
#  s.sendto(d,('127.0.0.1',56253))