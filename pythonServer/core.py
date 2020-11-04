import json;
import hashlib;
import random;
import string;

sha256 = hashlib.sha256();

class transaction:
    

    def __init__(self, sender = 0, data = '', signature = ''):
        self.sender = sender;
        self.data = data;
        self.signature = signature;

    def toJson(self):
        # converting class to json
        k = {
            "sender" : self.sender,
            "data" : self.data,
            "signature" : self.signature
        };
        # print(k)
        return json.dumps(k);

    def fromJson(self, json_):
        jason = json.loads(json_);
        print(jason)
        self.sender = jason['sender'];
        self.signature = jason['signature'];
        self.data = jason['data'];
    
    def isTransactionValid(self):
       # checks if the transaction is a valid one
       #TODO VERIFY SIGNATURE 
       return (
           self.sender > 0
           and len(self.data) > 0
           and len(self.signature) > 0
       );

class block:
    def __init__(self, timestamp = 0, data = [], prevHash = '', signature = ''):
        self.prevHash = prevHash;
        self.data = data;
        self.timestamp = timestamp;
        self.signature = signature;
    
    def toJson(self):
        # converting class to json
        getJson = lambda x : x.__dict__;
        # listJasons = [];
        listJasons = list(map(getJson, self.data));
        k = {
            "prevHash" : self.prevHash,
            "timestamp" : self.timestamp,
            "data" : listJasons,
            "signature" : self.signature
        };
        # print(k)
        return json.dumps(k);

    def fromJson(self, json_):
        jason = json.loads(json_);
        print(jason)
        self.timestamp = jason['timestamp'];
        self.prevHash = jason['prevHash'];
        self.signature = jason['signature'];
        self.data = jason['data'];

    def computeHash(self, json_):
        #  computes the hash function and returns it to the
        #  server
        myjson = '';
        if json_:
            # let's take that json for granted
            myjson = json_;
        else:
            myjson = self.toJson();
        # now that we have the json => hash
        # sha256.update(myjson.encode('utf-8'));
        # 
        hash_ = hashlib.sha256(myjson.encode('utf-8')).hexdigest();
        
        return hash_;

    def get_random_string(self, length):
        letters = string.ascii_lowercase
        result_str = ''.join(random.choice(letters) for i in range(length))
        # print("Random string of length", length, "is:", result_str)
        return result_str;
    
    def isBlockMature(self):
        # if computed for => POLICY IS TO BE MATURE
        if self.isBlockComputed():
            return True
        # TODO IMPROVE FUNCTIONALITY
        # for now, just see if it has a certain number of transactions
        return len(self.data) > 4;
    
    def isBlockComputed(self):
        # verify block's signature
        hash_ = self.computeHash(None);
        return str(hash_).startswith("00");
    
    def mine(self, prevHash = ''):
        # if self.isBlockComputed():
        #     return;
        if prevHash != '':
            self.prevHash = prevHash;
        while (not self.isBlockComputed()):
            # tries a new signature
            self.signature = self.get_random_string(10);
        return;
    
    def addTransaction(self, transaction : transaction): #  inserted ?
        # Only if computed for, add code for maturity respectively in your function
        if transaction.isTransactionValid() and not self.isBlockComputed():
            self.data += [transaction];
            if self.isBlockMature() :
                # TODO ENGAGE IN SIGNATURE SEARCH ***MINING***
                self.mine();
            return True;
        return False;

class blockchain:
    def __init__(self, blocks = [], latestHash = "", invalidatedBlocks = []):
        # 
        self.blocks = blocks;
        self.latestHash = latestHash;
        self.invalidatedBlocks = invalidatedBlocks;

        # verify blocks
        if self.blocks == []:
            # add a first block
            import datetime;
            b = block(datetime.datetime.now().timestamp(), [], "", "***FIRST BLOCK SIGNATURE RANDOM***");
            c = block(datetime.datetime.now().timestamp(), [], "", "");
            
            self.invalidatedBlocks = [];
            self.blocks = [b];
        else:
            # otherwise the queue for now should be empty
            # TODO synchronization with user.
            self.invalidatedBlocks = [block(0, None, None, "")];
        
        self.latestHash = '';
        self.computeLatestHash();
            

    def computeLatestHash(self):
        # todo : future versions : should include invalidated blocks
        if len(self.blocks) > 0:
            self.latestHash = self.blocks[len(self.blocks) - 1].computeHash(None);
        else:
            self.latestHash = '';
        return self.latestHash;
    
    def addBlock(self, block : block = None):
        # whether or not block insertion was performed correctly
        if not block:
            return False;
        
        # verifies blocks for consistence
        hash_ = block.computeHash(None);
        
        # this could be the hash of the last blockchain,
        # which SHOULD be the case in this version of the
        # blockchain
        # TODO *IMPORTANT Implement block verification based on PROOF OF WORK
    
        # TODO MAKE SURE THAT BLOCK'S SHA256 ENDS UP WITH X AMOUNT OF ZEROES
        # for now: the first two bits should be zero
        if not block.isBlockComputed():
            return False;
        
        # TODO ADD BLOCK WHEN PREV HASH IS CONSISTENT WITH THE HASH OF THE PREV BLOCK'S HASH
        if block.prevHash != self.latestHash:
            # the latest hash is incorrect, don't proceed 
            return False;
        
        # TODO IMPLEMENT STACK OF INVALIDATED BLOCKS
        if len(self.invalidatedBlocks) > 0:
            return False;
        
        self.invalidatedBlocks = [block];
        
        # TODO only move when fully trusting blockchain
        if True:
            # move to blocks
            self.blocks = [block];
            self.invalidatedBlocks = []
        
        # recompute latest hash
        self.computeLatestHash();
        
        # end of verification
        return True;
    
    def addTransaction(self, transaction_ : transaction):
        # tries to add a transaction to the latest block
        if self.invalidatedBlocks[0] != None:
            self.invalidatedBlocks[0].addTransaction(transaction_);
            return True;
        else:
            self.blocks[len(self.blocks) - 1].addTransaction(transaction_);
            return True;
        #
    

#############################################
## testing mechanism routine
# t = transaction(39808,'ooe[','wkw');
# b = (t.toJson())
# k = transaction();
# k.fromJson(b);

# bl = block();
# bl.addTransaction(t);
# bl.addTransaction(t);
# bl.addTransaction(t);
# bl.addTransaction(t);

# ct = block();
# ct.addTransaction(t);
# ct.addTransaction(t);
# ct.addTransaction(t);
# ct.addTransaction(t);
# ct.addTransaction(t);
# ct.addTransaction(t);
# ct.addTransaction(t);

# f = blockchain();
# bl.mine(f.computeLatestHash());


# print(bl.isBlockMature());

# print(f.addBlock(bl));


# ct.mine(f.computeLatestHash());
# print(f.addBlock(ct));
# print(f.computeLatestHash());