// import * as mocker from '../../TODOs/TODOsMocker';
import * as action from '../Actions/actionCreator';
import * as actionTypes from '../Actions/actionTypes';
import * as defs from '../core/defs';
import {store} from '../store';
import { TODO as TODODEF, TODOSTATUS  } from '../core/defs';
import { convertToPriority, convertToStatus } from '../Actions/converters';
import rg from '../../register/rgEngine';
import regEngine from '../../register/rgEngine';
import { setRoute } from '../Actions/actionCreator';
import { basedeplacer, basepermission, baseperson, someone } from '../../register/core';


let myrg  = new rg();
let sm1 = new someone()
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

    if (action.type === 'registerPers')
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
   

    if (action.type === 'profilesm1')
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

    if (action.type === 'listdu')
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

    if (action.type === 'listduPermission')
    {
        if (action.data)
        {
            if (action.data === "INVALID REQUEST ARGS")
            {
                return state;
            }
            console.log(action.data.profile)
            return Object.assign({}, state, {resPermissionDu : action.data.permissions});
        }
    }

    if (action.type === 'listdePermission')
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

    if (action.type === 'printprofile')
    {
        if (action.data)
        {
            if (action.data === "INVALID REQUEST ARGS")
            {
                return state;
            }
            console.log(action.data.profile)
            return Object.assign({}, state, {
                profile : action.data.profile, 
                lastPrintedDoc : action.data.genDoc, 
                lastPrintedPdf : action.data.genPdf,
                lastPrintedID : action.data.myid,
            });
        }
    }

    if (action.type === 'printprofileprinter')
    {
        if (action.success)
        {
            return Object.assign({}, state, {});
        }
    }

    if (action.type === 'clearprofile')
    {
        if (action.data)
        {
            myrg = new rg();
            myrg.nom = '...';
            return Object.assign({}, state, {profile :  myrg});
        }
    }

    if (action.type === 'listPers')
    {
        if (action.success)
        {
            if (action.data)
            {
                return Object.assign({}, state, {basicList : action.data.users});
            }
        }
        else{
            return Object.assign({}, state, {basicList : []});
        }
    }

    if (action.type === 'listDeplacer')
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

    if (action.type === 'clearPers')
    {
        return Object.assign({}, state, {rg : new regEngine()})
    }

    

    return state;
}

export default registerReducer;