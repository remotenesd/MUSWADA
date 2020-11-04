from flask import Flask
from flask_cors import cross_origin, CORS
import core
from users import usersApi

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
blockchain = core.blockchain();

class HelloRPC(object):
    def hello(self, name):
        return "Started Blockchain, mr %s" % name


app = Flask(__name__);
cors = CORS(app, ressources = { r"/*" : {"origins" : "*"} })

@app.route('/')
@cross_origin()
def hello():
    return "1.00 REV {0}".format(versionData)

@app.route('/blockchain/transaction/new')
@cross_origin()
def newTransaction():
    pass


########################################################
# REGISTERING APIS
app.register_blueprint(usersApi, url_prefix='/user');



if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5001)