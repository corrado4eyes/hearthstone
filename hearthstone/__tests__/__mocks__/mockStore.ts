import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import container from "../../config/inversify";
import {RootState} from "../../src/redux/reducers/mainReducer";
import ServiceFactory from "../../src/services/serviceFactory";

export const generateMockStore = (state: RootState | {}) => {
    const factory = new ServiceFactory(container);

    const middlewares = [thunk.withExtraArgument(factory)];
    const mockStore = configureMockStore(middlewares);

    const store = mockStore(state);

    store.clearActions();

    return store;
};
