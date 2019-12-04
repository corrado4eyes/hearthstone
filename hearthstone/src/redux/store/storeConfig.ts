import {Container} from 'inversify';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import ServiceFactory from '../../services/serviceFactory';
import {mainReducer} from '../reducers/mainReducer'

export const configureStore = (container: Container) => {
    const serviceFactory = new ServiceFactory(container);
    const middleware = applyMiddleware(thunk.withExtraArgument(serviceFactory));
    const store = createStore(mainReducer, composeWithDevTools(middleware));
    return store;
} 