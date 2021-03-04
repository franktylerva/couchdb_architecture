import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PouchDB from 'pouchdb-browser';
import { Provider } from 'use-pouchdb';

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