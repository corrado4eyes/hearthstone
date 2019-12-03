import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "reflect-metadata";
import * as Inversify from "inversify-react";
import container from '../config/inversify';

ReactDOM.render(
    <Inversify.Provider container={container}>
        <App />
    </Inversify.Provider>
, document.getElementById('root'));
