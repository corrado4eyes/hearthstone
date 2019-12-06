import React from 'react';
import ConnectedApp, {App} from '../../src/uiComponents/app';
import {shallow, mount, ShallowWrapper, ReactWrapper} from 'enzyme'
import { dummyCardArray } from '../__mocks__/mockObjects';
import Card from '../../src/model/card';
import { RootState, initialState } from '../../src/redux/reducers/mainReducer';
import { Provider } from 'react-redux';
import { generateMockStore } from '../__mocks__/mockStore';
import { CardComponent } from '../../src/uiComponents/cardComponent';

describe('App', () => {
    const cardSet = "Dummy"
    describe('App(unconnected)', () => {
        const dispatchSyncCard = jest.fn()
        const cards: Card[] = dummyCardArray
        const loading = false;
        const component: ShallowWrapper = shallow(<App cardSet={cardSet} filteredCards={cards} dispatchSyncCard={dispatchSyncCard} loading={loading}/>);
        it('renders n elements in an array', () => {
            component.setState({cards: cards})
            const cardComponent = component.find(CardComponent);
            expect(cardComponent).toHaveLength(cards.length);
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
        state.card.filteredCards = dummyCardArray;
        state.card.filters['cardSet'] = cardSet
        state.card.loading = false
        const store = generateMockStore(state)
        const component: ReactWrapper = mount(<Provider store={store}><ConnectedApp cardSet={cardSet}/></Provider>);

        afterAll(() => {
            component.unmount()
        });

        
        it('checks the props', () => {
            expect(component.find(App).prop('filteredCards')).toBe(dummyCardArray)
            expect(component.find(App).prop('loading')).toBe(false)
            expect(component.find(App).prop('cardSet')).toBe(cardSet)
        });
    });
});