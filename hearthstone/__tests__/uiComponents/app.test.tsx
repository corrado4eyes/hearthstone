import React from 'react';
import ConnectedApp, {App} from '../../src/uiComponents/app';
import {shallow, mount, ShallowWrapper, ReactWrapper} from 'enzyme'
import { dummyCardArray } from '../__mocks__/mockObjects';
import Card from '../../src/model/card';
import { RootState, initialState } from '../../src/redux/reducers/mainReducer';
import { Provider } from 'react-redux';
import { generateMockStore } from '../__mocks__/mockStore';

describe('App', () => {
    const cardSet = "Dummy"
    describe('App(unconnected)', () => {
        const dispatchSyncCard = jest.fn()
        const cards: Card[] = dummyCardArray
        const component: ShallowWrapper = shallow(<App cardSet={cardSet} cards={cards} dispatchSyncCard={dispatchSyncCard}/>);
        it('renders n elements in an array', () => {
            component.setState({cards: cards})
            const divs: ShallowWrapper = component.find('.card');
            expect(divs).toHaveLength(cards.length);
        });
    
        it('Snapshot testing', () => {
                component.setState({cards: cards})
                expect(component).toMatchSnapshot();
        });

        it('fires dispatchSyncCard onComponentDidMount', () => {
            expect(dispatchSyncCard).toHaveBeenCalledTimes(1);
        });
    });

    describe('App(connected)', () => {
        const state: RootState = {
            ...initialState, 
        }
        state.card.cards = dummyCardArray;
        state.card.cardSet = cardSet
        const store = generateMockStore(state)
        const component: ReactWrapper = mount(<Provider store={store}><ConnectedApp cardSet={cardSet}/></Provider>);
        it('checks the props', () => {
            expect(component.find(App).prop('cards')).toBe(dummyCardArray)
        });
    });
});