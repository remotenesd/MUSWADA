export class someone {
    _id  = '';
    nom  = '';
    prenom  = '';
    email  = '';
    tel  = '';
    matricule = '';
    grade  = '';
    fonction  = '';
    promotion  = '';
    datenaissance  = '';
    villenaissance  = '';
    cni  = '';
    

    // s2
    enfants : Array<string> = [""];
    ecolesciviles : Array<string> = [""];
    ecolesmilitaires : Array<string> = [""];
    addresse  = '';
    personneEnCharge  = ''; 

    // s3
    photo;
}

export class baseperson {
    id  = '';
    grade  = '';
    nom  = '';
    prenom  = '';
    fonction  = '';
}

export class basedeplacer {
    id  = '';
    personID  = '';
    motif  = '';
    fromTime  = '';
    toTime  = '';
    date  = '';
    appelation  = '';
}

export class basepermission {
    id  = '';
    personID  = '';
    addresse  = '';
    fromDate  = '';
    toDate  = '';
    appelation  = '';
}

export interface ISelect 
{
    title : string,
    commentary : string,
}