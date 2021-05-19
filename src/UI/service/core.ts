import { classes, classifyClasse, filterPontisteParFonction, fonctions, grades } from "../store/core/core";

// !IMPORTANT
// ONLY ONE PER LIST !!



class armesManager
{
    allPersonnel;
    __reserved;

    // only ids
    officiersGarde;
    maitresService;
    radioService;
    quartCoupee;
    quartMachine ;
    capitaineArme ;
    infirmier ;
    sc ;
    comie ;
    boulongier ;
    cuisinier ;
    maitreHotel ;
    stage ;
    consultation ;
    absent ;
    ptc ;
    ronde ;

    notRegistered;

    includedOfficierGarde;
    includedMaitreService;


    constructor(listPersonnel = {}, officierGardeGrades = [grades.MP, grades.PM, grades.SM1], maitresServiceGrades = [])
    {
        this.consultation = []
        this.ptc = []
        this.ronde = []
        this.stage = []
        this.absent = []
        this.comie = []
        this.sc = []
        this.capitaineArme = []

        this.notRegistered = []

        this.includedOfficierGarde = officierGardeGrades;
        this.includedMaitreService = maitresServiceGrades;

        // first, get the personnel
        this.allPersonnel = listPersonnel;

        this.__reserved = []

        // begin initialisation
        this.findSpecialities();
        this.constructOfficierGarde();
        this.constructMaitreService();
        this.constructRest()

        // //console.log("[CORE ARMES]initialised !")
    }

    findSpecialities()
    {
        this.boulongier = []
        this.infirmier = []
        this.maitreHotel = []
        this.radioService = []
        this.sc = []
        this.cuisinier = []

        this.allPersonnel.forEach(person_ => {
            switch (person_.fonction)
            {
                case String(fonctions.BOULANGER):
                    this.__reserved.push(person_.id)
                    this.boulongier.push(person_.id)
                    break;
                case String(fonctions.INFIRMIER):
                    this.infirmier.push(person_.id)
                    this.__reserved.push(person_.id)
                    break;
                case String(fonctions.MAITREHOTEL):
                    this.maitreHotel.push(person_.id)
                    this.__reserved.push(person_.id)
                    break;
                case String(fonctions.DETECTEUR):
                    this.radioService.push(person_.id)
                    this.__reserved.push(person_.id)
                    break;
                case String(fonctions.COMMISSARIAT):
                    this.sc.push(person_.id) 
                    this.__reserved.push(person_.id)
                    break;
                case String(fonctions.CUISINIER):
                    this.cuisinier.push(person_.id) 
                    this.__reserved.push(person_.id)
                    break;
            }
        });
    }

    constructOfficierGarde()
    {
        this.officiersGarde = []
        this.allPersonnel.forEach(person_ => {
            if (!this.__reserved.includes(person_.id) && this.includedOfficierGarde.includes(grades[person_.grade]))
            {
                this.officiersGarde.push(person_.id)
                this.__reserved.push(person_.id)
            }
        });
    }

    constructMaitreService()
    {
        this.maitresService = []
        this.allPersonnel.forEach(person_ => {
            if (!this.__reserved.includes(person_.id) && this.includedMaitreService.includes(grades[person_.grade]))
            {
                this.maitresService.push(person_.id)
            }
        });
    }

    constructRest()
    {
        this.quartCoupee = []
        this.quartMachine = []

        const auQuart = [String(fonctions.CHEFQUART), String(fonctions.DETECTEUR), String(fonctions.GABIER), String(fonctions.MISSILIER), String(fonctions.NAV)]
        // je sais
        const auMachine = [String(fonctions.MSEC), String(fonctions.ELECTRICIEN), String(fonctions.MECANICIEN)]

        this.allPersonnel.forEach(person_ => {
            if (!this.__reserved.includes(person_.id))
            {
                if (auQuart.includes(person_.fonction))
                {
                    this.quartCoupee.push(person_.id)
                    this.__reserved.push(person_.id)
                }
                if (auMachine.includes(person_.fonction))
                {
                    this.quartMachine.push(person_.id)
                    this.__reserved.push(person_.id)
                }
            }
        });
    }
    
    __filterOut(id_)
    {
        this.consultation = this.consultation.filter(id => id != id_)
        this.maitresService = this.maitresService.filter(id => id != id_)
        this.radioService = this.radioService.filter(id => id != id_)
        this.quartCoupee = this.quartCoupee.filter(id => id != id_)
        this.quartMachine = this.quartMachine.filter(id => id != id_)
        this.capitaineArme = this.capitaineArme.filter(id => id != id_)
        this.infirmier = this.infirmier.filter(id => id != id_)
        this.sc = this.sc.filter(id => id != id_)
        this.comie = this.comie.filter(id => id != id_)
        this.boulongier = this.boulongier.filter(id => id != id_)
        this.cuisinier = this.cuisinier.filter(id => id != id_)
        this.maitreHotel = this.maitreHotel.filter(id => id != id_)
        this.stage = this.stage.filter(id => id != id_)
        this.absent = this.absent.filter(id => id != id_)
        this.ptc = this.ptc.filter(id => id != id_)
        this.ronde = this.ronde.filter(id => id != id_)
        this.notRegistered = this.notRegistered.filter(id => id != id_)
        this.officiersGarde = this.officiersGarde.filter(id => id != id_)
    }

    addToOffGardes(id_)
    {
        if (this.officiersGarde.includes(id_))
        {
            return;
        }
        
        this.__filterOut(id_);
        this.officiersGarde.push(id_)

        return;
    }
    
    addToMaitresService(id_)
    {
        this.__filterOut(id_);
        this.maitresService.push(id_)

        return;
    }
    addToCapitaineArmes(id_)
    {
        this.__filterOut(id_);
        this.capitaineArme.push(id_)
        return;
    }
    
    addToSC(id_)
    {
        this.__filterOut(id_);
        this.sc.push(id_)
        return;
    }
   
    addToComie(id_)
    {
        this.__filterOut(id_);
        this.comie.push(id_)
        return;
    }
   
    addToBoulongier(id_)
    {
        this.__filterOut(id_);
        this.boulongier.push(id_)
        return;
    }
   
    addToCuisinier(id_)
    {
        this.__filterOut(id_);
        this.cuisinier.push(id_)
        return;
    }
   
    addToMaitreHotel(id_)
    {
        this.__filterOut(id_);
        this.maitreHotel.push(id_)
        return;
    }
   
    addToStage(id_)
    {
        this.__filterOut(id_);
        this.stage.push(id_)
        return;
    }
   
    addToConsultation(id_)
    {
        this.__filterOut(id_);
        this.consultation.push(id_)
        return;
    }
   
    addToAbsent(id_)
    {
        this.__filterOut(id_);
        this.absent.push(id_)
        return;
    }
   
    addToPTC(id_)
    {
        this.__filterOut(id_);
        this.ptc.push(id_)
        return;
    }
   
    addToRonde(id_)
    {
        this.__filterOut(id_);
        this.ronde.push(id_)
        return;
    }

    addToInfirmier(id_)
    {
        this.__filterOut(id_);
        this.infirmier.push(id_)
        return;
    }
   
    addToQuartMachine(id_)
    {
        this.__filterOut(id_);
        this.quartMachine.push(id_)
        return;
    }

    addToQuartCoupee(id_)
    {
        this.__filterOut(id_);
        this.quartCoupee.push(id_)
        return;
    }

    addToRadioService(id_)
    {
        this.__filterOut(id_);
        this.radioService.push(id_)
        return;
    }

    removeID(id_)
    {
        // basically, it got to be in one.
        this.officiersGarde = this.officiersGarde.filter(id => id != id_)
        this.consultation = this.consultation.filter(id => id != id_)
        this.maitresService = this.maitresService.filter(id => id != id_)
        this.radioService = this.radioService.filter(id => id != id_)
        this.quartCoupee = this.quartCoupee.filter(id => id != id_)
        this.quartMachine = this.quartMachine.filter(id => id != id_)
        this.capitaineArme = this.capitaineArme.filter(id => id != id_)
        this.infirmier = this.infirmier.filter(id => id != id_)
        this.sc = this.sc.filter(id => id != id_)
        this.comie = this.comie.filter(id => id != id_)
        this.boulongier = this.boulongier.filter(id => id != id_)
        this.cuisinier = this.cuisinier.filter(id => id != id_)
        this.maitreHotel = this.maitreHotel.filter(id => id != id_)
        this.stage = this.stage.filter(id => id != id_)
        this.absent = this.absent.filter(id => id != id_)
        this.ptc = this.ptc.filter(id => id != id_)
        this.ronde = this.ronde.filter(id => id != id_)
        // to avoid duplicates...
        this.notRegistered = this.notRegistered.filter(id => id != id_)

        this.notRegistered.push(id_);
    }

    getOfficiersGarde()
    {
        return this.officiersGarde.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }

    getMaitresService()
    {
        return this.maitresService.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }
    
    getComie()
    {
        return this.comie.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }
    
    getsc()
    {
        return this.sc.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }

    getCDArmes()
    {
        return this.capitaineArme.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }
    getinfirmier()
    {
        return this.infirmier.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }
    getmaitreHotel()
    {
        return this.maitreHotel.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }
    getquartCoupee()
    {
        return this.quartCoupee.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }
    getquartMachine()
    {
        return this.quartMachine.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }
    
    getptc()
    {
        return this.ptc.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }
    getradioService()
    {
        return this.radioService.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }

    getstage()
    {
        return this.stage.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }
    getronde()
    {
        return this.ronde.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }
    
    getboulongier()
    {
        return this.boulongier.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }

    getcuisinier()
    {
        return this.cuisinier.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }
    getconsultation()
    {
        return this.consultation.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }
    getabsent()
    {
        return this.absent.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }

    getNonRegistered()
    {
        return this.notRegistered.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }
    
    compileObject()
    {
        return {
            "officierGarde" : this.officiersGarde,
            "radioService" : this.radioService,
            "maitreService" : this.maitresService,
            "quartCoupee" : this.quartCoupee,
            "quartMachine" : this.quartMachine,
            "capitaineArme" : this.capitaineArme,
            "infirmier" : this.infirmier,
            "sc" : this.sc,
            "comie" : this.comie,
            "boulongier" : this.boulongier,
            "cuisinier" : this.cuisinier,
            "maitreHotel" : this.maitreHotel,
            "stage" : this.stage,
            "consultation" : this.consultation,
            "absent" : this.absent,
            "ptc" : this.ptc,
            "ronde" : this.ronde,
        }
    }
}

class armesManagerPourJournee
{
    allPersonnel;
    __reserved;
    enPermission;
    ayantDeplacer;

    // only ids
    officiersGarde;
    maitresService;
    radioService;
    quartCoupee;
    quartMachine ;
    capitaineArme ;
    infirmier ;
    sc ;
    comie ;
    boulongier ;
    cuisinier ;
    maitreHotel ;
    stage ;
    consultation ;
    absent ;
    ptc ;
    ronde ;

    notRegistered;

    count_passerelle;
    count_machine;

    debrief()
    {
        // compile a summary
        if (this.allPersonnel == undefined)
        {
            return "";
        }
        const a = []
        let summary = "Total personnel affecté : " + this.allPersonnel.length;
        summary += "\nTotal effectivement a bord : " + (this.allPersonnel.length - this.enPermission.length)
        summary += "\nTotal en permission : " + (this.enPermission.length)
        summary += "\n\nDe cet effectif, ceux : "
        
        this.count_passerelle = 0
        this.count_machine = 0
        console.log(this.enPermission)
        this.allPersonnel.forEach(pers =>{
            if (this.enPermission.map(e => e.personID).includes(pers.id))
            {
                return;
            }
            const class_ = classifyClasse(pers);
            if (class_ === classes.PONTISTE)
            {
                this.count_passerelle += 1
            }
            else{
                this.count_machine += 1
            }
        });

        summary += "\n - Pouvant assister a la passerelle : " + (this.count_passerelle)
        summary += "\n - Pouvant assister a la machine : " + (this.count_machine)
        
        return summary;
    }

    constructor(listPersonnel = {}, dataAPI, permission, deplacers)
    {

        //console.log(dataAPI)

        if (dataAPI == {} || dataAPI == undefined)
        {
            return;
        }



        
        this.consultation = dataAPI.consultation ?? [];
        this.ptc = dataAPI.ptc ?? [];
        this.ronde = dataAPI.ronde ?? [];
        this.absent = dataAPI.absent ?? [];
        this.comie = dataAPI.comie ?? [];
        this.sc = dataAPI.sc ?? [];
        this.capitaineArme = dataAPI.capitaineArme ?? [];
        this.boulongier = dataAPI.boulongier ?? [];
        this.infirmier = dataAPI.infirmier ?? [];
        this.maitreHotel = dataAPI.maitreHotel ?? [];
        this.radioService = dataAPI.radioService ?? [];
        this.sc = dataAPI.sc ?? [];
        this.cuisinier = dataAPI.cuisinier ?? [];
        this.quartCoupee = dataAPI.quartCoupee ?? [];
        this.quartMachine = dataAPI.quartMachine ?? [];
        this.officiersGarde = dataAPI.officierGarde ?? [];
        this.maitresService = dataAPI.maitreService ?? [];
        this.stage = dataAPI.stage ?? [];
        this.consultation = dataAPI.consultation ?? [];

        this.enPermission = permission ?? [];
        this.ayantDeplacer = deplacers ?? [];

        this.notRegistered = []

        // first, get the personnel
        this.allPersonnel = listPersonnel ?? [];

        this.__reserved = []

        
        // begin initialisation
        // from API
        this.construct();

        // //console.log("[CORE ARMES]initialised !")
    }

    construct()
    {
        this.enPermission.forEach(person_ => {
            this.__filterOut(person_.personID)
        });
    }

    __filterOut(id_)
    {
        this.consultation = this.consultation.filter(id => id != id_)
        this.maitresService = this.maitresService.filter(id => id != id_)
        this.radioService = this.radioService.filter(id => id != id_)
        this.quartCoupee = this.quartCoupee.filter(id => id != id_)
        this.quartMachine = this.quartMachine.filter(id => id != id_)
        this.capitaineArme = this.capitaineArme.filter(id => id != id_)
        this.infirmier = this.infirmier.filter(id => id != id_)
        this.sc = this.sc.filter(id => id != id_)
        this.comie = this.comie.filter(id => id != id_)
        this.boulongier = this.boulongier.filter(id => id != id_)
        this.cuisinier = this.cuisinier.filter(id => id != id_)
        this.maitreHotel = this.maitreHotel.filter(id => id != id_)
        this.stage = this.stage.filter(id => id != id_)
        this.absent = this.absent.filter(id => id != id_)
        this.ptc = this.ptc.filter(id => id != id_)
        this.ronde = this.ronde.filter(id => id != id_)
        this.notRegistered = this.notRegistered.filter(id => id != id_)
        this.officiersGarde = this.officiersGarde.filter(id => id != id_)
    }

    addToOffGardes(id_)
    {
        if (this.officiersGarde.includes(id_))
        {
            return;
        }
        
        this.__filterOut(id_);
        this.officiersGarde.push(id_)

        return;
    }
    
    addToMaitresService(id_)
    {
        this.__filterOut(id_);
        this.maitresService.push(id_)

        return;
    }

    addToCapitaineArmes(id_)
    {
        this.__filterOut(id_);
        this.capitaineArme.push(id_)
        return;
    }
    
    addToSC(id_)
    {
        this.__filterOut(id_);
        this.sc.push(id_)
        return;
    }
   
    addToComie(id_)
    {
        this.__filterOut(id_);
        this.comie.push(id_)
        return;
    }
   
    addToBoulongier(id_)
    {
        this.__filterOut(id_);
        this.boulongier.push(id_)
        return;
    }
   
    addToCuisinier(id_)
    {
        this.__filterOut(id_);
        this.cuisinier.push(id_)
        return;
    }
   
    addToMaitreHotel(id_)
    {
        this.__filterOut(id_);
        this.maitreHotel.push(id_)
        return;
    }
   
    addToStage(id_)
    {
        this.__filterOut(id_);
        this.stage.push(id_)
        return;
    }
   
    addToConsultation(id_)
    {
        this.__filterOut(id_);
        this.consultation.push(id_)
        return;
    }
   
    addToAbsent(id_)
    {
        this.__filterOut(id_);
        this.absent.push(id_)
        return;
    }
   
    addToPTC(id_)
    {
        this.__filterOut(id_);
        this.ptc.push(id_)
        return;
    }
   
    addToRonde(id_)
    {
        this.__filterOut(id_);
        this.ronde.push(id_)
        return;
    }

    addToInfirmier(id_)
    {
        this.__filterOut(id_);
        this.infirmier.push(id_)
        return;
    }
   
    addToQuartMachine(id_)
    {
        this.__filterOut(id_);
        this.quartMachine.push(id_)
        return;
    }

    addToQuartCoupee(id_)
    {
        this.__filterOut(id_);
        this.quartCoupee.push(id_)
        return;
    }

    addToRadioService(id_)
    {
        this.__filterOut(id_);
        this.radioService.push(id_)
        return;
    }

    removeID(id_)
    {
        // basically, it got to be in one.
        this.officiersGarde = this.officiersGarde.filter(id => id != id_)
        this.consultation = this.consultation.filter(id => id != id_)
        this.maitresService = this.maitresService.filter(id => id != id_)
        this.radioService = this.radioService.filter(id => id != id_)
        this.quartCoupee = this.quartCoupee.filter(id => id != id_)
        this.quartMachine = this.quartMachine.filter(id => id != id_)
        this.capitaineArme = this.capitaineArme.filter(id => id != id_)
        this.infirmier = this.infirmier.filter(id => id != id_)
        this.sc = this.sc.filter(id => id != id_)
        this.comie = this.comie.filter(id => id != id_)
        this.boulongier = this.boulongier.filter(id => id != id_)
        this.cuisinier = this.cuisinier.filter(id => id != id_)
        this.maitreHotel = this.maitreHotel.filter(id => id != id_)
        this.stage = this.stage.filter(id => id != id_)
        this.absent = this.absent.filter(id => id != id_)
        this.ptc = this.ptc.filter(id => id != id_)
        this.ronde = this.ronde.filter(id => id != id_)
        // to avoid duplicates...
        this.notRegistered = this.notRegistered.filter(id => id != id_)

        this.notRegistered.push(id_);
    }

    getOfficiersGarde()
    {
        return this.officiersGarde.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }

    getPermission()
    {
        // //console.log(this.enPermission)
        // returns the list of the personnel in leave
        return this.enPermission.map(permissionInfo => 
            { return {
                    person : this.allPersonnel.filter(pers => pers.id == permissionInfo.personID)[0],
                    dateRentree : permissionInfo.toDate,
                    addresse : permissionInfo.addresse
                }
            }
        );
    }

    getDeplacer()
    {
        return this.ayantDeplacer.map(deplacerInfo => 
            { return {
                    person : this.allPersonnel.filter(pers => pers.id == deplacerInfo.personID)[0],
                    heureRentree : deplacerInfo.toTime,
                    heureSortie : deplacerInfo.fromTime,
                }
            }
        );
    }

    getMaitresService()
    {
        return this.maitresService.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }
    
    getComie()
    {
        return this.comie.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }
    
    getsc()
    {
        return this.sc.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }

    getCDArmes()
    {
        return this.capitaineArme.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }
    getinfirmier()
    {
        return this.infirmier.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }
    getmaitreHotel()
    {
        return this.maitreHotel.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }
    getquartCoupee()
    {
        return this.quartCoupee.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }
    getquartMachine()
    {
        return this.quartMachine.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }
    
    getptc()
    {
        return this.ptc.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }
    getradioService()
    {
        return this.radioService.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }

    getstage()
    {
        return this.stage.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }
    getronde()
    {
        return this.ronde.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }
    
    getboulongier()
    {
        return this.boulongier.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }

    getcuisinier()
    {
        return this.cuisinier.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }
    getconsultation()
    {
        return this.consultation.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }
    getabsent()
    {
        return this.absent.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }

    getNonRegistered()
    {
        return this.notRegistered.map(offIndex => 
            this.allPersonnel.filter(pers => pers.id == offIndex)[0]
        )
    }
    
    compileObject()
    {
        return {
            "officierGarde" : this.officiersGarde,
            "radioService" : this.radioService,
            "maitreService" : this.maitresService,
            "quartCoupee" : this.quartCoupee,
            "quartMachine" : this.quartMachine,
            "capitaineArme" : this.capitaineArme,
            "infirmier" : this.infirmier,
            "sc" : this.sc,
            "comie" : this.comie,
            "boulongier" : this.boulongier,
            "cuisinier" : this.cuisinier,
            "maitreHotel" : this.maitreHotel,
            "stage" : this.stage,
            "consultation" : this.consultation,
            "absent" : this.absent,
            "ptc" : this.ptc,
            "ronde" : this.ronde,
        }
    }
}

export {armesManager, armesManagerPourJournee};