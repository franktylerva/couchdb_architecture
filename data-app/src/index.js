import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import PouchDB from 'pouchdb-browser';
import { Provider } from 'use-pouchdb';

var pouchOpts = {
  skip_setup: true,
  auth: {
      username: 'admin',
      password: 'secret'
  }
};

const db = new PouchDB('desserts');
const remoteDatabase = new PouchDB("http://localhost:5984/desserts", pouchOpts);

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