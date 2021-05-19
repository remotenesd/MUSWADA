import * as actionTypes from '../Actions/actionTypes';
import rg from '../../register/rgEngine';
import regEngine from '../../register/rgEngine';
import { basedeplacer, basepermission, baseperson, someone } from '../../register/core';
import { grades } from '../core/core';


let myrg  = new rg();
const sm1 = new someone()
const initialState = {
    rg : myrg,
    basicList : Array<baseperson>(),
    basicDeplacers : Array<basedeplacer>(),
    basicPermission : Array<basepermission>(),
    profile : sm1,
    lastPrintedPdf : '',
    lastPrintedDoc : '',
    lastPrintedID : '',
    listDu : Array<basedeplacer>(),
    resPermissionDu : Array<basepermission>(),
    resPermissionDe : Array<basepermission>(),
    
    // PRISE ARMES
    priseArmes : {},
    priseArmesEtablie : false,
    priseArmesEcrite : false,

    priseArmesJourneeEcrite : false,
    priseArmesJournee : {},
    priseArmesJourneeDoc : false,
    priseArmesJourneeDocFile : '',

    permissionPDF : false,
    permissionPDFFile : '',
    ///


}

function registerReducer (state = initialState, action) {
    console.log(action);
   
    if (action.type === 'S1')
    {
        try{
            console.log("Commencing S1...")
            state.rg.nom = action.data.nom;
            state.rg.prenom = action.data.prenom;
            state.rg.email = action.data.email;
            state.rg.promotion = action.data.promotion;
            state.rg.grade = action.data.grade;
            state.rg.matricule = action.data.matricule;
            state.rg.tel = action.data.tel;
            state.rg.fonction = action.data.fonction;
            state.rg.datenaissance = action.data.datenaissance;
            state.rg.villenaissance = action.data.villenaissance;
            state.rg.cni = action.data.cni;

            if (state.rg.validateS1())
            {
                return Object.assign({}, state, {rg : state.rg});
            }
            else{
                return state;
            }
        }catch (e){return state}
    }


    if (action.type === 'S2')
    {
        try{

            state.rg.addresse = action.data.addresse;
            state.rg.enfants = action.data.enfants;
            state.rg.ecolesciviles = action.data.ecolesciviles;
            state.rg.ecolesmilitaires = action.data.ecolesmilitaires;
            state.rg.personneEnCharge = action.data.personneEnCharge;

            if (state.rg.validateS2())
            {
                console.log(state.rg);
                return Object.assign({}, state, {rg : state.rg});
            }
            else{
                return state;
            }
        }catch (e){return state}
    }

    if (action.type === actionTypes.PERSONNEL_REGISTER)
    {
        if (action.success)
        {
            /// set registered
            state.rg.registered = true;
            // also clear the registered user for future modification
            return Object.assign({}, state, {rg : new regEngine()})
        }
        else
        {
            state.rg.registered = false;
            return Object.assign({}, state, {rg : state.rg});
    }
    }
   

    if (action.type === actionTypes.PERSONNEL_PROFILE_SM1)
    {
        if (action.data)
        {
            if (action.data === "INVALID REQUEST ARGS")
            {
                return state;
            }
            console.log(action.data.profile)
            return Object.assign({}, state, {profile : action.data.profile});
        }
    }

    if (action.type === actionTypes.PERSONEL_DEPLACER_LIST_DU)
    {
        if (action.data)
        {
            if (action.data === "INVALID REQUEST ARGS")
            {
                return state;
            }
            console.log(action.data.profile)
            return Object.assign({}, state, {listDu : action.data.deplacers});
        }
    }

    if (action.type === actionTypes.PERSONNEL_LIST_PERMISSION_DU)
    {
        if (action.data)
        {
            if (action.data === "INVALID REQUEST ARGS")
            {
                return state;
            }
            return Object.assign({}, state, {resPermissionDu : action.data.permissions});
        }
    }

    if (action.type === actionTypes.PERSONNEL_LIST_PERMISSION_DE)
    {
        if (action.data)
        {
            if (action.data === "INVALID REQUEST ARGS")
            {
                return state;
            }
            console.log(action.data.profile)
            return Object.assign({}, state, {resPermissionDe : action.data.permissions});
        }
    }

    if (action.type === actionTypes.PERSONNEL_PRINT_PROFILE_DIGITAL)
    {
        if (action.data)
        {
            if (action.data === "INVALID REQUEST ARGS")
            {
                console.log("error !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                return state;
            }
            console.log("returning ?30")
            return Object.assign({}, state, {
                profile : action.data.profile, 
                lastPrintedDoc : action.data.genDoc, 
                lastPrintedPdf : action.data.genPdf,
                lastPrintedID : action.data.myid,
            });
        }
    }

    if (action.type === actionTypes.PERSONNEL_PRINT_PROFILE_PRINTER)
    {
        if (action.success)
        {
            return Object.assign({}, state, {});
        }
    }

    if (action.type === actionTypes.PERSONNEL_CLEAR_PROFILE)
    {
        if (action.data)
        {
            myrg = new rg();
            myrg.nom = '...';
            return Object.assign({}, state, {profile :  myrg});
        }
    }

    if (action.type === actionTypes.PERSONNEL_LIST_PERSONNEL)
    {
        if (action.success)
        {
            if (action.data)
            {
                action.data.users.forEach(user => {
                    user.grade = String(user.grade).toUpperCase() as grades
                })
                return Object.assign({}, state, {basicList : action.data.users});
            }
        }
        else{
            return Object.assign({}, state, {basicList : []});
        }
    }

    if (action.type === actionTypes.PERSONNEL_LIST_DEPLACER)
    {
        if (action.success)
        {
            if (action.data)
            {
                return Object.assign({}, state, {basicDeplacers : action.data.deplacers});
            }
        }
        else{
            return Object.assign({}, state, {basicList : []});
        }
    }

    if (action.type === actionTypes.PERSONNEL_GET_PRISE_ARMES)
    {
        console.log(action.data)
        if (action.success)
        {
                return Object.assign({}, state,
                    { 
                        // user : state.user,
                        priseArmes : action.data.priseArmes,
                        priseArmesEtablie : true,
                    }
                )
        }
        else{
                if (!state.priseArmesEtablie)
                {
                    return Object.assign({}, state,
                        { 
                            // user : state.user,
                            priseArmes : {},
                            priseArmesEtablie : false,
                        }
                    )
                }
        }
    }
    
    if (action.type === actionTypes.PERSONNEL_SET_PRISE_ARMES)
    {
        return Object.assign({}, state,
            { 
                // user : state.user,
                priseArmesEcrite : action.success,
            }
        )
    }

    if (action.type === actionTypes.PERSONNEL_SEND_PRISE_ARMES_JOURNEE)
    {
        if (action.success)
        {
            console.log("1040")
            return Object.assign({} , state , {
                priseArmesJourneeEcrite : true,
            })
        }
    }

    if (action.type === actionTypes.PERSONNEL_DOC_PRISE_ARMES_JOURNEE)
    {
        if (action.success)
        {
            return Object.assign({} , state , {
                priseArmesJourneeDoc : true,
                priseArmesJourneeDocFile : action.data.genDoc,
            })
        }
    }

    if (action.type === actionTypes.PERSONNEL_GET_PRISE_ARMES_JOURNEE)
    {
        console.log(action)
        if (action.success)
        {
            if (action.data.exist)
            {
                return Object.assign({} , state , {
                    priseArmesJourneeEcrite : true,
                    priseArmesJournee : action.data.armes[0],
                })
            }
        }
    }

    if (action.type === 'clearPers')
    {
        return Object.assign({}, state, {rg : new regEngine()})
    }

    if (action.type === actionTypes.PERSONNEL_PERMISSION_PDF)
    {
        if (action.success)
        {
            return Object.assign({} , state , {
                permissionPDF : true,
                permissionPDFFile : action.data.genPdf,
            })
        }
    }

    if (action.type === actionTypes.PERSONNEL_RESET_FLAGS)
    {
        return Object.assign({}, state, {
            profile : new someone(),
            lastPrintedPdf : '',
            lastPrintedDoc : '',
            lastPrintedID : '',

            // PRISE ARMES        
            priseArmesJourneeDoc : false,
            priseArmesJourneeDocFile : '',
        
            permissionPDF : false,
            permissionPDFFile : '',
        })
    }
    

    return state;
}

export default registerReducer;