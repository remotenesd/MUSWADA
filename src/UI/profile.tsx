import React, { useState } from 'react';
import { Button } from 'reactstrap';
import {globals, globalsChangedEvents, generals} from './helpers/globals';
import { Container, Row, Col, Media } from 'reactstrap';
import { questionIcon } from './icons';

const Profile = ({route, gotoRoute}) => {

    let [PORT, setPORT ] = useState(globals.apiPort);
    let [version, setVersion ] = useState(globals.version);
    let selectedProfile = generals.selectedProfile!;

    console.log(generals.selectedProfile)
    
    globalsChangedEvents.push( 
        () => {
            setPORT(globals.apiPort);
            setVersion(globals.version);
        }
    );

    const pushTransaction = () => 
    {
        // ipcRenderer.send('pushTransaction', {
        //     sender : 10229,
        //     data : 'THIS IS SOME HASH DATA REFERRING TO ANY POSSIBLE COMBINATION OF ENTROPY.',
        //     signature : 'RND SIG',
        // });
    }

    const makeIcon = (size : number , icon : JSX.Element) => {
        return (
            <div className=" w-auto my-auto d-inline mx-4 ">
                <svg width= {size + "em"} height= {size + "em"}  viewBox="0 0 16 16" className="bi bi-calendar4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    {icon}
                </svg>
            </div>
        );
    }

    return (<>
        <h1>
            Profile
        </h1>
        {/* <Container>
            <Row>
                <Col></Col>
                <Col></Col>
                <Col>
                    Selected Profile : 
                </Col>
            </Row>
        </Container> */}
        <Media>
            <Media left href="#">
                {makeIcon(4, questionIcon)}
            </Media>
            <Media body className={'p-3'}>
                <Media heading>
                    Name : {selectedProfile!['userName'] }
                </Media>
                
                This is the default profile page, user {selectedProfile!['userName']}, connected from
                port {selectedProfile!['rhost']}:{selectedProfile!['rport']}
            </Media>
        </Media>
        <hr/>
        <h4>
            🔕 Current status with {selectedProfile!['userName'] } : 
                <b> Not friends.</b>
        </h4>

        <h5>
            ☑️ You could request an invitation for a friend request via port {PORT}, to enable 
            features like chat and other things.
        </h5>
        <Button onClick={() => gotoRoute('/chat')} className="float-right m-4">😃 Request friendship.</Button>
        <Button onClick={() => gotoRoute('/blockchain')} className="float-right m-4">🤚 Go back.</Button>   
    </>)
};

export default Profile;