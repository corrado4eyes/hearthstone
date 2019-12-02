import React from 'react';
import './App.css';
import "reflect-metadata";
import ServiceFactory from './services/serviceFactory';
import * as Inversify from "inversify-react";
import container from '../config/inversify';

const serviceFactory = new ServiceFactory(container);

const App: React.FC = () => {
  return (
    <Inversify.Provider container={container}>
        <div className="App">
          {getData()}
        </div>
    </Inversify.Provider>
  );
}

const getData = () => {
  return serviceFactory.getCardService().getAll()
  .then((value: any) => console.log(value))
  .catch((error: any) => console.log("dio cane"))
}

export default App;
