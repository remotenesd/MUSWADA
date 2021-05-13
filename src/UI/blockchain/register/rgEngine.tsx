import { Select } from "@blueprintjs/select";
import { setRoute } from "../store/Actions/actionCreator";
import { PERSONNEL_PRINT_PROFILE_DIGITAL } from "../store/Actions/actionTypes";
import { programNav, store } from "../store/store";
import {ISelect} from './core';

export default class regEngine
{
    // s1
    id : string = "";
    nom : string;
    prenom : string;
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

    // s4
    commune : string = ''; 
    province : string = ''; 

    // s5
    nomPere : string = ''; 
    nomMere : string = ''; 
    professionPere : string = ''; 
    professionMere : string = ''; 
    

    // s6
    situationMatrimoniale : string = '';
    nbrEnfants : number = 0;
    dateMarriage : string = '';
    lieuMarriage : string = '';
    nomEpouse : string = '';
    prenomEpouse : string = '';
    filledePere : string = '';
    filledeMere : string = '';
    nationnalite : string = '';
    professionEpouse : string = '';
    professionOrganismeEpouse : string = '';
    professionPereEpouse : string = '';
    professionMereEpouse : string = '';


    // s7
    diplomeUniversitaire : string = '';
    niveauInstruction : string = '';
    langueEtrangeres : string = '';
    dialectesParles : string = '';

    // s8
    dateFonction : string = '';
    numCarteMilitaire : string = '';
    nrSOM : string = '';
    nrCCP : string = '';

    // validation
    _curStep: number = 1;
    registered : boolean = false;


    get curStep()
    {
        return this._curStep;
    }
    set curStep(stp : number)
    {
        this._curStep = stp;
        this.stepChanged.forEach(stp => stp());
    }

    // events
    stepChanged : Array<() => {}> = [];

    regStepListener(func : () => {})
    {
        this.stepChanged.push(func);
    }


    public constructor()
    {
        this.nom = '';
        this.prenom = '';
    }

    validateS1()
    {
        var spaceRegex = /\s+/;
        var moreThanTwoRegex = /[\w]{2,}/;
        var emailRegex = /^[a-zA-Z0-9]{3,}@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}$/;
        var telRegex = /^0[5-7][0-9]{8}$/;
        var promotionRegex = /^19[7-9][0-9]|20[0-3][0-9]$/;
        var dateRegex = /^19[4-9][0-9]|20[0-3][0-9]$/;

        let nomcheck = (name : string) => name.length > 2;
        let prenomcheck = (name : string) => name.length > 2;
        let emailcheck = (email : string) => !spaceRegex.test(email) && emailRegex.test(email);
        let telcheck = (tel : string) => telRegex.test(tel);
        let promotioncheck = (name : string) => promotionRegex.test(name);
        let datecheck = (name : string) => dateRegex.test(name);
        
        // console.log(emailcheck(this.email));
        // console.log(this.email);
        // console.log(telcheck(this.tel));
        // console.log(promotioncheck(this.promotion));
        // console.log(datecheck(this.datenaissance));
        // console.log(prenomcheck(this.prenom));
        // console.log(nomcheck(this.nom));

        if (nomcheck(this.nom) 
            && prenomcheck(this.prenom)
            && emailcheck(this.email)
            && telcheck(this.tel)
            && promotioncheck(this.promotion)
            && datecheck(this.datenaissance)
            )
        {
            // console.log(" S1 VALIDATED...")
            if (this._curStep === 1)  this.curStep = 2 
            return true;
        }
        // console.log("ERROR VALIDATION S1...")
        // something is off
        return false;
    }


    validateS2()
    {
        var spaceRegex = /\s+/;
        var moreThanTwoRegex = /[\w]{2,}/;

        if (moreThanTwoRegex.test(this.addresse) 
            && moreThanTwoRegex.test(this.personneEnCharge) 
            && String(this.ecolesmilitaires[0]).length > 1
            )
        {
            console.log(" S2 VALIDATED...")
            if (this._curStep < 3)  this.curStep = 3
            programNav('/S3')
            return true;
        }
        console.log("ERROR VALIDATION S1...")
        // something is off
        return false;
    }

    dataToReq()
    {
        // console.log(this);
        if (this._curStep === 3)
        {
            // validated first two steps !
            const data = [
                {
                    id : 0,
                    name : 'Commune',
                    onChange : (name : string) => { 
                        this.commune = name;
                    },
                    type : 'string', disabled : false,
                    getValue : () => this.commune,
                    placeholder : 'Nom de la commune de la ville de ' + this.villenaissance,
                    label : 'Commune : '
                },
                {
                    id : 1,
                    name : 'Province',
                    onChange : (name : string) => {
                        this.province = name;
                    },
                    getValue : () => this.province,
                    type : 'string', disabled : false,
                    placeholder : 'Nom de la province de la ville de ' + this.villenaissance,
                    label : 'Province : '
                }
            ]

            let remarks = '';

            const meta = {
                title : 'Addresses et localisations',
                description : 'Continuez a fournir les informations de base.'
            }

            let validated = false;

            const register = () => {
                // continue the process
                var spaceRegex = /\s+/;
                var moreThanTwoRegex = /[\w]{2,}/;
                if (moreThanTwoRegex.test(this.commune) && moreThanTwoRegex.test(this.province))
                {
                    validated = true;
                    this.curStep += 1;
                    programNav('/S3');

                    return {
                        validated : true,
                        remarks : ''
                    }
                }
                else{
                    validated = false;
                    if (!moreThanTwoRegex.test(this.commune))
                    {
                        remarks += 'S\'assurer que la commune a plus de trois charactères';
                    }
                    if (!moreThanTwoRegex.test(this.province))
                    {
                        remarks += '\nS\'assurer que la province a plus de trois charactères';
                    }
                    return {
                        validated : false,
                        remarks : remarks
                    }
                    console.log(remarks);
                }

            }
            return {data : data, meta : meta, register : register, remarks : remarks, validated : validated};
        }

        if (this._curStep === 4)
        {
            // validated first two steps !
            const data = [
                {
                    id : 0,
                    name : 'nomPere',
                    onChange : (name : string) => {
                        this.nomPere = name;
                    },
                    type : 'string', disabled : false,
                    getValue : () => this.nomPere,
                    placeholder : 'Mohamed ben mohamed ',
                    label : 'Fils de : '
                },
                {
                    id : 1,
                    name : 'professionPere',
                    onChange : (name : string) => {
                        this.professionPere = name;
                    },
                    type : 'string', disabled : false,
                    getValue : () => this.professionPere,
                    placeholder : 'Profession',
                    label : 'Profession du père :'
                },
                {
                    id : 2,
                    name : 'nomMere',
                    onChange : (name : string) => {
                        this.nomMere = name;
                    },
                    type : 'string', disabled : false,
                    getValue : () => this.nomMere,
                    placeholder : 'Fatima ben mohamed ',
                    label : 'Fils de : '
                },
                {
                    id : 3,
                    name : 'professionMere',
                    onChange : (name : string) => {
                        this.professionMere = name;
                    },
                    type : 'string', disabled : false,
                    getValue : () => this.professionMere,
                    placeholder : 'Profession',
                    label : 'Profession de la mère :'
                }
            ]

            let remarks = '';

            const meta = {
                title : 'Addresses et localisations',
                description : 'Continuez a fournir les informations de base.'
            }

            let validated = false;

            const register = () => {
                // continue the process
                var moreThanTwoRegex = /[\w]{2,}/;
                if (
                    moreThanTwoRegex.test(this.nomMere) && moreThanTwoRegex.test(this.nomPere)
                    &&
                    moreThanTwoRegex.test(this.professionMere) && moreThanTwoRegex.test(this.professionPere)
                )
                {
                    this.curStep += 1;
                    programNav('/S3');

                    return {
                        validated : true,
                        remarks : ''
                    }
                }
                else{
                    validated = false;
                    remarks += 'S\'assurer que tout les champs ont plus de trois charactères';
                    return {
                        validated : false,
                        remarks : remarks
                    }
                    console.log(remarks);
                }

            }
            return {data : data, meta : meta, register : register};
        }

        if (this._curStep === 5)
        {
            // validated first two steps !

            let marie : ISelect = {
                title : 'MARIE',commentary : 'Situation actuelle.'
            }
            let divorce : ISelect = {
                title : 'DIVORCE',commentary : 'Situation actuelle.'
            }
            let celibataire : ISelect = {
                title : 'CELIBATAIRE',commentary : 'Situation actuelle.'
            }

            if (this.enfants.length > 0)
            {
                this.situationMatrimoniale = 'MARIE';
            }
            else{
                this.situationMatrimoniale = 'CELIBATAIRE';
            }
            
            const data = [
                {
                    id : 0,
                    name : 'situationMatrimoniale',
                    onChange : (name : string) => { 
                        this.situationMatrimoniale = name;
                    },
                    type : 'select',
                    options : (this.enfants.length > 0 && this.enfants[0].length > 0) ? [marie, divorce] : [celibataire, marie, divorce],
                    getValue : () => this.situationMatrimoniale,
                    placeholder : 'Situation matrimoniale :',
                    label : 'Situation matrimoniale : ',
                    customSelect : Select.ofType<ISelect>(),
                }
            ]

            this.situationMatrimoniale = (this.enfants.length > 0 && this.enfants[0].length > 0) ? marie.title : celibataire.title;

            let remarks = '';

            const meta = {
                title : 'Situation matrimoniale :',
                description : 'Continuez a fournir les informations de base.'
            }

            let validated = false;

            const register = () => {
                // continue the process
                var spaceRegex = /\s+/;
                var moreThanTwoRegex = /[\w]{2,}/;
                if (true)
                {
                    validated = true;
                    console.log(this.situationMatrimoniale);
                    if (this.situationMatrimoniale.includes('MARIE'))
                    {
                        this.curStep += 1;
                    }
                    else{
                        this.curStep += 2;
                    }
                    programNav('/S3');

                    return {
                        validated : true,
                        remarks : ''
                    }
                }
                else{
                    validated = false;
                    remarks += 'S\'assurer que tout les champs ont plus de trois charactères';
                    return {
                        validated : false,
                        remarks : remarks
                    }
                    console.log(remarks);
                }

            }
            return {data : data, meta : meta, register : register, remarks : remarks, validated : validated};
        }


        if (this._curStep === 6)
        {
            // validated first two steps !
            this.nbrEnfants = this.enfants.length;
            const data = [
                {
                    id : 0,
                    name : 'nbrEnfants',
                    onChange : (name : string) => {
                        
                    },
                    type : 'string',
                    getValue : () => this.enfants.length,
                    placeholder : 'Mohamed ben mohamed ',
                    disabled : true,
                    label : 'Nombre d\'enfants : '
                },
                {
                    id : 1,
                    name : 'dateMarriage',
                    onChange : (name : string) => {
                        this.dateMarriage = name;
                    },
                    type : 'string', disabled : false,
                    getValue : () => this.dateMarriage,
                    placeholder : '11/11/1970',
                    label : 'Date de marriage :'
                },
                {
                    id : 2,
                    name : 'lieuMarriage',
                    onChange : (name : string) => {
                        this.lieuMarriage = name;
                    },
                    type : 'string', disabled : false,
                    getValue : () => this.lieuMarriage,
                    placeholder : '11000 Rabat ',
                    label : 'Lieu de marriage (addresse) : '
                },
                {
                    id : 3,
                    name : 'nomEpouse',
                    onChange : (name : string) => {
                        this.nomEpouse = name;
                    },
                    type : 'string', disabled : false,
                    getValue : () => this.nomEpouse,
                    placeholder : '',
                    label : 'Nom épouse :'
                },
                {
                    id : 4,
                    name : 'prenomEpouse',
                    onChange : (name : string) => {
                        this.prenomEpouse = name;
                    },
                    type : 'string', disabled : false,
                    getValue : () => this.prenomEpouse,
                    placeholder : '',
                    label : 'Prénom épouse :'
                },
                {
                    id : 5,
                    name : 'filledePere',
                    onChange : (name : string) => {
                        this.filledePere = name;
                    },
                    type : 'string', disabled : false,
                    getValue : () => this.filledePere,
                    placeholder : 'Mohammed ben Mohammed',
                    label : 'Nom pére de l\'épouse :'
                },
                {
                    id : 6,
                    name : 'filledeMere',
                    onChange : (name : string) => {
                        this.filledeMere = name;
                    },
                    type : 'string', disabled : false,
                    getValue : () => this.filledeMere,
                    placeholder : 'Fatna ben Mohammed',
                    label : 'Nom mére de l\'épouse :'
                },
                {
                    id : 7,
                    name : 'nationnaliteEpouse',
                    onChange : (name : string) => {
                        this.nationnalite = name;
                    },
                    type : 'string', disabled : false,
                    getValue : () => this.nationnalite,
                    placeholder : 'MAROCAINE',
                    label : 'Nationnalité de l\'épouse :'
                },
                {
                    id : 8,
                    name : 'professionEpouse',
                    onChange : (name : string) => {
                        this.professionEpouse = name;
                    },
                    type : 'string', disabled : false,
                    getValue : () => this.professionEpouse,
                    placeholder : '',
                    label : 'Profession de l\'épouse :'
                },
                {
                    id : 9,
                    name : 'professionOrgEpouse',
                    onChange : (name : string) => {
                        this.professionOrganismeEpouse = name;
                    },
                    type : 'string', disabled : false,
                    getValue : () => this.professionOrganismeEpouse,
                    placeholder : 'ONCF',
                    label : 'Organisme de profession de l\'épouse :'
                },
                {
                    id : 10,
                    name : 'professionPereEpouse',
                    onChange : (name : string) => {
                        this.professionPereEpouse = name;
                    },
                    type : 'string', disabled : false,
                    getValue : () => this.professionPereEpouse,
                    placeholder : '',
                    label : 'Profession du pére de l\'épouse :'
                },
                {
                    id : 11,
                    name : 'professionMereEpouse',
                    onChange : (name : string) => {
                        this.professionMereEpouse = name;
                    },
                    type : 'string', disabled : false,
                    getValue : () => this.professionMereEpouse,
                    placeholder : '',
                    label : 'Profession de la mère de l\'épouse :'
                }
            ]

            let remarks = '';

            const meta = {
                title : 'INFORMATIONS MATRIMONIALES',
                description : 'Informations concernant conjoint. Remplir avec soin pour fiche renseignements.'
            }

            let validated = false;

            const register = () => {
                // continue the process
                var moreThanTwoRegex = /[\w]{2,}/;
                if (
                    moreThanTwoRegex.test(this.nomEpouse) && moreThanTwoRegex.test(this.prenomEpouse)
                    &&
                    moreThanTwoRegex.test(this.professionEpouse) && moreThanTwoRegex.test(this.nationnalite)
                )
                {
                    this.curStep += 1;
                    programNav('/S3');

                    return {
                        validated : true,
                        remarks : ''
                    }
                }
                else{
                    validated = false;
                    remarks += 'S\'assurer que les champs suivants ont plus de trois charactères : Nom et prenom épouse, nationnalité et profession.';
                    return {
                        validated : false,
                        remarks : remarks
                    }
                    console.log(remarks);
                }

            }
            return {data : data, meta : meta, register : register};
        }

        if (this._curStep === 7)
        {
            // validated first two steps !
            const data = [
                {
                    id : 0,
                    name : 'diplomes',
                    onChange : (name : string) => {
                        this.diplomeUniversitaire = name;
                    },
                    type : 'string', disabled : false,
                    getValue : () => this.diplomeUniversitaire,
                    placeholder : '',
                    label : 'Diplomes universitaires (séparer par ;) : '
                },
                {
                    id : 1,
                    name : 'niveau',
                    onChange : (name : string) => {
                        this.niveauInstruction = name;
                    },
                    type : 'string', disabled : false,
                    getValue : () => this.niveauInstruction,
                    placeholder : 'Profession',
                    label : 'Niveau Instruction :'
                },
                {
                    id : 2,
                    name : 'dialectes',
                    onChange : (name : string) => {
                        this.dialectesParles = name;
                    },
                    type : 'string', disabled : false,
                    getValue : () => this.dialectesParles,
                    placeholder : '',
                    label : 'Dialectes parlés : '
                },
                {
                    id : 3,
                    name : 'langueEtrangeres',
                    onChange : (name : string) => {
                        this.langueEtrangeres = name;
                    },
                    type : 'string', disabled : false,
                    getValue : () => this.langueEtrangeres,
                    placeholder : 'Francais; Anglais',
                    label : 'Langues étrangères (séparer par ;) :'
                }
            ]

            let remarks = '';

            const meta = {
                title : 'Langues',
                description : 'Continuez a fournir les informations de base.'
            }

            let validated = false;

            const register = () => {
                // continue the process
                var moreThanTwoRegex = /[\w]{2,}/;
                if (
                    moreThanTwoRegex.test(this.niveauInstruction) 
                )
                {
                    this.curStep += 1;
                    programNav('/S3');

                    return {
                        validated : true,
                        remarks : ''
                    }
                }
                else{
                    validated = false;
                    remarks += 'S\'assurer que le niveau d\'instruction est correct et a plus de trois charactères';
                    return {
                        validated : false,
                        remarks : remarks
                    }
                    console.log(remarks);
                }

            }
            return {data : data, meta : meta, register : register};
        }
        if (this._curStep === 8)
        {
           
            // validated first two steps !
            const data = [
                {
                    id : 0,
                    name : 'fonctionDate',
                    onChange : (name : string) => {
                        this.dateFonction = name;
                    },
                    type : 'string', disabled : false,
                    getValue : () => this.dateFonction,
                    placeholder : '11/11/1970',
                    label : 'Date occupation fonction '  + this.fonction + ' :'
                },
                {
                    id : 1,
                    name : 'numCarteMilitaire',
                    onChange : (name : string) => {
                        this.numCarteMilitaire = name;
                    },
                    type : 'string', disabled : false,
                    getValue : () => this.numCarteMilitaire,
                    placeholder : '',
                    label : 'Numero de carte militaire :'
                },
                {
                    id : 2,
                    name : 'nrSOM',
                    onChange : (name : string) => {
                        this.nrSOM = name;
                    },
                    type : 'string', disabled : false,
                    getValue : () => this.nrSOM,
                    placeholder : '',
                    label : 'Numero SOM : '
                },
                {
                    id : 3,
                    name : 'nrCCP',
                    onChange : (name : string) => {
                        this.nrCCP = name;
                    },
                    type : 'string', disabled : false,
                    getValue : () => this.nrCCP,
                    placeholder : '',
                    label : 'Numero CCP :'
                }
            ]

            let remarks = '';

            const meta = {
                title : 'Dernière étape ',
                description : 'Derniéres informations a introduire'
            }

            let validated = false;

            const register = () => {
                // continue the process
                var moreThanTwoRegex = /[\w]{2,}/;
                if (
                    moreThanTwoRegex.test(this.niveauInstruction) 
                )
                {
                    this.curStep += 1;
                    this.pushToReg();
                    programNav('/resultRegisteration');

                 
                }
                else{
                    validated = false;
                    remarks += 'S\'assurer que le niveau d\'instruction est correct et a plus de trois charactères';
                    return {
                        validated : false,
                        remarks : remarks
                    }
                    console.log(remarks);
                }

            }
            return {data : data, meta : meta, register : register};
        }

        if (this._curStep === 9)
        {
           
            // validated first two steps !
            const data = [
                {
                    id : 0,
                    name : 'rien',
                    label : 'ATTENDEZ SVP ',
                    
                    getValue : () => '',
                    onChange : (e) =>{},
                },
            ]

            let remarks = '';

            const meta = {
                title : 'TRAITEMENT ',
                description : '....'
            }

            let validated = false;

            const register = () => {
                // continue the process
                return {
                    validated : false,
                    remarks : remarks
                }

            }
            return {data : data, meta : meta, register : register};
        }


        return null;
    }

    pushToReg()
    {
        // trigger automatic api req
        store.dispatch({type: PERSONNEL_PRINT_PROFILE_DIGITAL, data : {user : this.toUser()} })
    }

    toUser()
    {
        let user;
        user = {
            id : this.id,
            addresse : this.addresse,
            enfants : this.enfants,
            ecolesciviles : this.ecolesciviles,
            ecolesmilitaires : this.ecolesmilitaires,
            personneEnCharge : this.personneEnCharge,

            nom : this.nom,
            prenom : this.prenom,
            email : this.email,
            
            grade : this.grade,
            cni : this.cni,
            fonction : this.fonction,
            promotion : this.promotion,
            villenaissance : this.villenaissance,
            datenaissance : this.datenaissance,
            tel : this.tel,
            matricule : this.matricule,

            // s4
            commune : this.commune  , 
            province : this.province  , 

            // s5
            nomPere : this.nomPere  , 
            nomMere : this.nomMere  , 
            professionPere : this.professionPere  , 
            professionMere : this.professionMere  , 
            

            // s6
            situationMatrimoniale : this.situationMatrimoniale  ,
            nbrEnfants : this.nbrEnfants,
            dateMarriage : this.dateMarriage  ,
            lieuMarriage : this.lieuMarriage  ,
            nomEpouse : this.nomEpouse  ,
            prenomEpouse : this.prenomEpouse  ,
            filledePere : this.filledePere  ,
            filledeMere : this.filledeMere  ,
            nationnalite : this.nationnalite  ,
            professionEpouse : this.professionEpouse  ,
            professionOrganismeEpouse : this.professionOrganismeEpouse  ,
            professionPereEpouse : this.professionPereEpouse  ,
            professionMereEpouse : this.professionMereEpouse  ,


            // s7
            diplomeUniversitaire : this.diplomeUniversitaire  ,
            niveauInstruction : this.niveauInstruction  ,
            langueEtrangeres : this.langueEtrangeres,
            dialectesParles : this.dialectesParles,

            // s8
            dateFonction : this.dateFonction  ,
            numCarteMilitaire : this.numCarteMilitaire  ,
            nrSOM : this.nrSOM  ,
            nrCCP : this.nrCCP  ,
        }

        return user;
    }
}