import session from "../../storage/localStorage";


// auth
class user {
  userID;
  name;
  password;

  constructor(userID: string, name: string, password: string) {
    this.name = name;
    this.password = password;
    this.userID = userID;
  }
}

// blockchain
class transaction {
  sender;
  data;
  signature;

  constructor (sender, data, signature)
  {
    this.sender = sender;
    this.data = data;
    this.signature = signature;
  }
}

class block{
    timestamp;
    data;
    prevHash;
    signature;

    constructor( timestamp, data, prevHash , signature )
    {
      this.prevHash = prevHash;
      this.data = data;
      this.timestamp = timestamp;
      this.signature = signature;
    }
}

class blockchain{

  blocks;
  latestHash;
  invalidatedBlocks;

  constructor(blocks, latestHash, invalidatedBlocks)
  {
    this.blocks = blocks
    this.latestHash = latestHash
    this.invalidatedBlocks = invalidatedBlocks

  }
}
        

interface IState {
  user: session;
  registeringUser: user;
  usernameExist: boolean;
  registerSuccess: boolean;
  routing: string;
  theme : string;
  myblkchn : blockchain  | null;
}

export type { IState };
export { user, block, transaction, blockchain };
