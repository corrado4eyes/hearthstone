import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "reflect-metadata";
import * as Inversify from "inversify-react";
import container from '../../config/inversify';
import { configureStore } from '../redux/store/storeConfig';
import * as Redux from "react-redux";

const store = configureStore(container);
ReactDOM.render(
    <Inversify.Provider container={container}>
        <Redux.Provider store={store}>
            <App cardSet={"Basic"}/>
        </Redux.Provider>
    </Inversify.Provider>
, document.getElementById('root'));
