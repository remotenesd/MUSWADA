/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */

import React from 'react';
import { useEffect } from 'react';
import { Widget, addResponseMessage, setQuickButtons } from 'react-chat-widget';
 
import 'react-chat-widget/lib/styles.css';
import './styles/app.css'
 
import logo from './logo.svg';


import { generals} from './helpers/globals';
 
function Chat({route, gotoRoute}) {

  const selectedProfile = generals.selectedProfile!;

  const buttons = [
    {
      label : 'Back to profile',
      value : '/profile'
    }
  ]

  setQuickButtons(buttons);

  useEffect(() => {
    addResponseMessage('Welcome to this awesome chat!');
  }, []);
 
  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  };

  const handleNewResponseMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  };

  const linkSnippet = {
    title: 'My awesome link',
    link: 'https://github.com/Wolox/react-chat-widget',
    target: '_blank'
  }

  const returnToAPP = (
    <div>
      <h4>Return to <a onClick={() => gotoRoute('/profile') }>profile</a></h4>
    </div>
  )

  

  const handleQuickButtonClicked = data => {
    console.log(data);
    if (String(data).startsWith('/'))
    {
      // this is a route
      gotoRoute(data);
    }
    setQuickButtons(buttons.filter(button => button.value !== data));
  };

  // applyTheme('dark')
 
  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      profileAvatar={logo}
      title={selectedProfile!['userName'] + ' -🏠 online'} 
      subtitle={"Chatting with "  + selectedProfile!['userName'] + ' - online for 1 hour'} 
      fullScreenMode={true}
      handleQuickButtonClicked={handleQuickButtonClicked}
      addLinkSnippet = { () =>    linkSnippet}
      renderCustomComponent = {() => returnToAPP}
      handleSubmit = {handleNewResponseMessage}
    />
  );
}
 
export default Chat;