import session from "../../storage/localStorage";


// auth
class user {
  userID;
  name;
  password;
  fonction;
  lirePermissions;
  ecrirePermissions;
  lirePersonnel;
  ecrirePersonnel;
  personID = -1;

  constructor(userID: string, name: string, password: string) {
    this.name = name;
    this.password = password;
    this.userID = userID;
    this.lirePermissions = false;
    this.ecrirePermissions = false;
    this.lirePersonnel = false;
    this.ecrirePersonnel = false;
    this.fonction = '';
    this.personID = -1;
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
  isLoggedIn : boolean;
  loadingAPILogIn : boolean; // only use for startup
  loadingAPIFirstData : boolean; // only use for startup
  routing: string;
  theme : string;
  myblkchn : blockchain  | null;
  peers : []; 
  mypeer : {};
  firstUsage : boolean;
  firstUsageShunt : boolean;
  batiment : string;
  commandant : string;
  batimentClass : string;
  priseArmes : {};
  priseArmesEtablie : boolean;
  priseArmesEcrite : boolean;
}

enum grades
{
  CVM = "CVM",
  CV = "CV",
  CF = "CF",
  CC = "CC",
  LV = "LV",
  EV1 = "EV1",
  EV2 = "EV2",
  MP = "MP",
  PM = "PM",
  SM1 = "S1,",
  SM2 = "SM",
  QM1 = "QM",
  QM2 = "QM",
}

enum roleNavigation
{
  Barreur,
  Veilleur,
  RADIO,
  CNEARMES,
  SECRETAIRE,
  INFIRMIER,
  CUISINIER,
  AIDECOMIS,
  BOULANGER,
  MOTEL,
  CDQ,
}

enum roleManoeuvre
{
  PASSERELLE,
  PLAGEAV,
  PLAGEAR,
  PCSECURITE,
  PCMACHINE,
  MACHINE,
  PCRADIO,
  LOCALBARRE,
}

enum fonctions // specialite
{
  MSEC,
  MECANICIEN,
  ELECTRICIEN,
  COMMISSARIAT,
  MISSILIER,
  GABIER,
  DETECTEUR,
  NAV,
  CHEFQUART,
  INFIRMIER,
  CUISINIER,
  BOULANGER,
  MAITREHOTEL
}

enum fonctionsMecanicien
{
  MSEC,
  MECANICIEN,
  ELECTRICIEN,
}

enum fonctionsPontiste
{
  COMMISSARIAT,
  MISSILIER,
  GABIER,
  DETECTEUR,
  NAV,
  CHEFQUART,
  INFIRMIER,
  CUISINIER,
  BOULANGER,
  MAITREHOTEL
}

const filterMecanicienParFonction = (fonction : fonctions) => {
    return fonction in fonctionsMecanicien;
}

const filterPontisteParFonction = (fonction : fonctions) => {
    return fonction in fonctionsPontiste;
}

export type { IState };
export { 
  user, 
  block, 
  transaction, 
  blockchain, 
  grades, 
  roleNavigation, 
  roleManoeuvre, 
  fonctions, 
  filterMecanicienParFonction, 
  filterPontisteParFonction 
};
