import React from 'react';
import App from '../src/App';
import {shallow, ShallowWrapper} from 'enzyme'
import { dummyCardArray } from './__mocks__/mockObjects';
import Card from '../src/model/card';


describe('App', () => {
    const cards: Card[] = dummyCardArray
    it('renders n elements in an array', () => {
        const component: ShallowWrapper = shallow(<App/>);
        component.setState({cards: cards})
        const divs: ShallowWrapper = component.find('.card');
        expect(divs).toHaveLength(cards.length);
    });

    it('Snapshot testing', () => {
            const component: ShallowWrapper = shallow(<App/>);
            component.setState({cards: cards})
            expect(component).toMatchSnapshot();
    });
});
