const { app, ipcMain } = require("electron");
const { BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

const { PythonShell } = require("python-shell");
const fetch = require("node-fetch");
const { fstat } = require("fs");
// const { randomInt } = require("crypto");
// const express = require('express');
// const mongoose = require('mongodb');
// var server = require("../src/server/server");
// var blocAPI = require('../src/server/routes/cryptic/controller');

let win;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const randomPortNumber = randomInt(1000, 9000);

function createWindow() {
  // Node JS back server

  // creates the browser win
  win = new BrowserWindow({
    width: 1200,
    height: 800,
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
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  win.on("closed", () => (win = null));
}

app.on("ready", createWindow);

let doop = async () => {
  return "";
};

let options = {
  mode: "text",
  // args : [randomPortNumber]
};

let optionsP2P = {
  mode: "text",
  args : [randomPortNumber]
};

let dir = path.join ( app.getAppPath(), "../pythonServer/main.py");
let dirP2P = path.join(app.getAppPath(), "../pythonServer/myp2p.py");

if (!isDev)
{
  dir = path.join ( app.getAppPath(), "../../pythonServer/main.py");
  dirP2P = path.join(app.getAppPath(), "../../pythonServer/myp2p.py");
}

// DONT RUN MAIN FOR NOW
// PythonShell.run(dir, options, (err, results) => {
//   if (err) throw err; 
//   console.log(results);
// });

let shell = new PythonShell(dirP2P, optionsP2P);



if (false)
{
  shell.end(function (err,code,signal) {
    if (err) throw err;
    console.log('The exit code was: ' + code);
    console.log('The exit signal was: ' + signal);
    console.log('finished');
  });
}

ipcMain.on("reqVersion", (event, arg) => {
  // good so far
  shell.send('reqAPIVersion');
})

ipcMain.on("rerender", (event, arg) => {
  // good so far
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
})

shell.on('getAPIVersion' , (message) => {
  console.log('=|||||||======!!!!!!!!! listenig ');
  ipcMain.emit('getAPIVersion', message);
});

ipcMain.on('reqPortNumber', (event, args) => {
  event.reply( 'gotAPIVersion' , randomPortNumber );
});

/////// SENDING ARGS TO SERVER

// OBSOLETE : NO MORE MAIN
// ipcMain.on("startServer", (event, arg) => {
//   // what kind of message ?
//   // await client.invoke("hello", "RPC", function(error, res, more) {
//   //     console.log(res);
//   //     event.reply('startServerResponse', res);
//   // });

//   fetch(`http://127.0.0.1:5001/`)
//     .then((data) => {
//       return data.text();
//     })
//     .then((text) => {
//       console.log("data: ", text);
//       // result.textContent = text;
//       event.reply("startServerResponse", text);
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// });

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (win === null) {
    createWindow();
  }
});
