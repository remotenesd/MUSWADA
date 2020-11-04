const {app, ipcMain  } = require('electron');
const { BrowserWindow } = require('electron');
const path = require('path');
const isDev = require("electron-is-dev");


const { PythonShell } = require('python-shell'); 
const fetch = require("node-fetch");
// const express = require('express');
// const mongoose = require('mongodb');
// var server = require("../src/server/server");   
// var blocAPI = require('../src/server/routes/cryptic/controller');


let win;

function createWindow(){
    // Node JS back server
    
    // creates the browser win
    let win = new BrowserWindow(
        {
            width: 800,
            height: 600,
            frame: false,
            minWidth: 700,
            minHeight: 600, 
            maximizable: true,
            webPreferences: {
                nodeIntegration: true,
                // enableRemoteModule: true,
            },
        });
    // load index.html
    // win.loadFile('src/index.html')
    // console.log(`file://${path.join(__dirname, '../build/index.html')}`
    win.loadURL(
        isDev ? "http://localhost:3000" : 
            `file://${path.join(__dirname, '../build/index.html')}`)
    win.on("closed", () => (win = null));
}

app.on('ready', createWindow);

let doop = async () => {
    return '';
}



let options = {
    mode : 'text'
};

let dir = path.join(__dirname, '../pythonServer/main.py');

PythonShell.run(dir, options, (err, results) => {
    if (err) throw err;
    console.log(results);
});

ipcMain.on('startServer',  (event, arg) => {
    // what kind of message ?
    // await client.invoke("hello", "RPC", function(error, res, more) {
    //     console.log(res);
    //     event.reply('startServerResponse', res);
    // });

    fetch(`http://127.0.0.1:5001/`).then((data)=>{      
        return data.text();
        
    }).then((text)=>{
        console.log("data: ", text);
        // result.textContent = text;
        event.reply('startServerResponse', text);
    }).catch(e=>{
        console.log(e);
    })

});


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

app.on('activate', function () {
    if (win === null) {
      createWindow();
    }
});


