export class someone {
    _id : string = '';
    nom : string = '';
    prenom : string = '';
    email : string = '';
    tel : string = '';
    matricule: string = '';
    grade : string = '';
    fonction : string = '';
    promotion : string = '';
    datenaissance : string = '';
    villenaissance : string = '';
    cni : string = '';
    

    // s2
    enfants : Array<string> = [""];
    ecolesciviles : Array<string> = [""];
    ecolesmilitaires : Array<string> = [""];
    addresse : string = '';
    personneEnCharge : string = ''; 

    // s3
    photo;
}

export class baseperson {
    id : string = '';
    grade : string = '';
    nom : string = '';
    prenom : string = '';
}

export class basedeplacer {
    id : string = '';
    personID : string = '';
    motif : string = '';
    fromTime : string = '';
    toTime : string = '';
    date : string = '';
    appelation : string = '';
}

export class basepermission {
    id : string = '';
    personID : string = '';
    addresse : string = '';
    fromDate : string = '';
    toDate : string = '';
    appelation : string = '';
}

export interface ISelect 
{
    title : string,
    commentary : string,
}