import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import {globals, globalsChangedEvents} from './helpers/globals';


const Home = (props, state) => {

    let [PORT, setPORT ] = useState(globals.apiPort);
    let [version, setVersion ] = useState(globals.version);
    
    useEffect( () => {
        let func = () => {
            setPORT(globals.apiPort);
            setVersion(globals.version);
        }
        globalsChangedEvents.push( 
            func
        );
        return () => {
            // cleanup
            func = () => {}
        }
    });

    const pushTransaction = () => 
    {
        // ipcRenderer.send('pushTransaction', {
        //     sender : 10229,
        //     data : 'THIS IS SOME HASH DATA REFERRING TO ANY POSSIBLE COMBINATION OF ENTROPY.',
        //     signature : 'RND SIG',
        // });
    }

    return (
        <>
            <h1>
                MUSWADA
            </h1>
            <h2>🔨 API {version}</h2>
            <h2>☑️ OPEN ON PORT {PORT}</h2>
            <Button onClick={() => pushTransaction()}>☕ Add transaction</Button>
        </>
    )
};

export default Home;