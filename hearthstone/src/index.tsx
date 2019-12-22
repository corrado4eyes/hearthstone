import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './uiComponents/app';
import "reflect-metadata";
import * as Inversify from "inversify-react";
import container from '../config/inversify';
import { configureStore } from './redux/store/storeConfig';
import * as Redux from "react-redux";
import * as firebase from "firebase/app";
import "firebase/firestore";
import config from '../config/firebaseConfig'

firebase.initializeApp(config);
const store = configureStore(container);
ReactDOM.render(
    <Inversify.Provider container={container}>
        <Redux.Provider store={store}>
            <App cardSet={"Basic"}/>
        </Redux.Provider>
    </Inversify.Provider>
, document.getElementById('root'));
