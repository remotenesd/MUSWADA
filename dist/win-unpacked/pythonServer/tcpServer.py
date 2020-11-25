##############################USED TO GET LIST OF CLIENTS
# IF NONE ALREADY PRESENT
# BASICALLY A TRACKER

# from pythonServer.main import parseRequest
import socket
from time import sleep
import msgpack

import time
import threading

# Tell the user what port it's on
sock = socket.socket(socket.AF_INET,socket.SOCK_DGRAM)
sock.bind(('127.0.0.1',35790))

print('Listening for peers on UDP port %s' % sock.getsockname()[1])

listNodes = []
def addNode(host, port, username, id):
    global listNodes
    search = list(filter(lambda node : node['host'] == host and node['port'] == port, listNodes))
    print(search)
    if len(search) > 0:
        for el in search:
            print('REMOVED ITEM at port ' + str( port) )
            listNodes.remove(el);
    
    listNodes.append({
        'host' : host,
        'port' : port,
        'username' : username,
        'id' : id
    })
    
    # print(host, port, username, id)
    
    print((listNodes))

# Listen for packets and then do stuff with them
while True:
    # sock.setblocking(False)
    in_data,in_addr = sock.recvfrom(65536) # get a packet and get data
    print('Got a packet from %s' % str(in_addr))

    # Try and decode the packet's data and then print the contents
    data = None
    data_ = None
    try:
        # receive credentials
        print(in_data)
        data_ = msgpack.unpackb(in_data)
        
    except:
        print('Could not unpack data from peer')
    # print(data)
    data = data_[b'content']
    print('[GLOBAL] RECEIVED ', data)
    addNode(data[b'host'], data[b'port'], data[b'username'], data[b'id'])
    # time.sleep(1)
    # send back the list of nodes connected
    d = msgpack.packb({
        'title' : 'GET_ALL_NODES',
        'content' : (listNodes),
        'rhost' : data[b'host'],
        'rport' : data[b'port']
    })
    sock.sendto(d, (data[b'host'], data[b'port']))
    
    # Now, we have to tell everybody, that a new client has joined.
    for client in listNodes:
        # send individual invitation.
        d = msgpack.packb({
            'title' : 'CLIENT_JOIN',
            'rhost' : data[b'host'],
            'rport' : data[b'port'],
            'username' : data[b'username'],
            'id' : data[b'id'],
            'lhost' : client['host'],
            'lport' : client['port']
        })
        sock.sendto(d,  (client['host'] , client['port']))
    
    ## wait for some time until next iteration
    time.sleep(1);