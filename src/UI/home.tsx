import { cleanup } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import {globals, globalsChangedEvents} from './helpers/globals';
import { setRoute, getFirstUsage } from './store/Actions/actionCreator';
import { store } from './store/store';

const dispatcher = store.dispatch
dispatcher(getFirstUsage());

const Home = (props, state) => {

    const [PORT, setPORT ] = useState(globals.apiPort);
    const [version, setVersion ] = useState(globals.version);
    const [batiment, setBatiment ] = useState(globals.appData.batiment);
    const [batimentClass, setBatimentClass ] = useState(globals.appData.batimentClass);

    
    
    const func = () => {
        setPORT(globals.apiPort);
        setVersion(globals.version);
        setBatiment(globals.appData.batiment)
        setBatimentClass(globals.appData.batimentClass)
    }
    globalsChangedEvents.push( 
        func
    );

    useEffect(
        () => {
            setPORT(PORT);
            }, [globals.appData.batiment]
    )

    const pushTransaction = () => 
    {
        // ipcRenderer.send('pushTransaction', {    
        //     sender : 10229,
        //     data : 'THIS IS SOME HASH DATA REFERRING TO ANY POSSIBLE COMBINATION OF ENTROPY.',
        //     signature : 'RND SIG',
        // });
        dispatcher(setRoute('/personnel'));
    }

    return (
        <div className={"d-flex w-100 h-100 align-items-center justify-content-center coverHome"}>
            <div className="flexboxupdown">
                <h1 className="flexitem display-1">
                    {batimentClass + ' ' + batiment} 
                </h1>
                <h2 className="flexitem"> 🔨 API {version}</h2>
                <h2 className="flexitem">☑️ OPEN ON PORT {PORT}</h2>
                <h2 className="flexitem">Base de données personnel et batiment.</h2>
                <Button className="flexitem" onClick={() => pushTransaction()}>☕ Commencer ➡️</Button>
            </div>
        </div>
    )
};

export default Home;