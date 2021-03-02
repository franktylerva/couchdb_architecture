import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import PouchDB from 'pouchdb-browser';
import { Provider } from 'use-pouchdb';

// var pouchOpts = {
//   skip_setup: true,
//   auth: {
//       username: 'admin',
//       password: 'secret'
//   }
// };


const createSession = async () => await fetch("http://localhost:8080/couchdb/_session", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
});

createSession();

const db = new PouchDB('desserts');
const remoteDatabase = new PouchDB("http://localhost:8080/couchdb/desserts");

PouchDB.sync(db, remoteDatabase, {
  live: true,
  heartbeat: false,
  timeout: false,
  retry: true
});

ReactDOM.render(
  <React.StrictMode>
    <Provider pouchdb={db}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);