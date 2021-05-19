/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */

import React from 'react';
import "./styles/about.css"

const About = (props, state) => {
    return (
    <div className="coverAbout">
        <div className="boxCenter">
            <h1>
                MUSWADA APP <h3 className="lead">About</h3>
            </h1>
            <hr className="bg-secondary" />
            <p>
                <blockquote className="text-right">
                    Programmation EV FOUQANI Younes
                </blockquote>
                Envie d'ajouter une fonctionnalite ou de corriger un bug ?
                <br />Contact : 
                <br /><em>Tel : </em>0707761025
                <br /><em>Email : </em>younessf31@gmail.com
                <br /><br />Enjoy :)
            </p>
        </div>
    </div>)
};

export default About;