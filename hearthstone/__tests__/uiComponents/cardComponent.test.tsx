import * as React from 'react';
import { dummyCard, noImgCard } from '../__mocks__/mockObjects';
import { ShallowWrapper, shallow } from 'enzyme';
import { CardComponent, OwnState } from '../../src/uiComponents/cardComponent';
import { Button, Card } from 'react-bootstrap';

describe('Card Component(unconnected)', () => {
    const card = dummyCard;
    const dispatchSaveCard = jest.fn()
    const component: ShallowWrapper = shallow(<CardComponent card={card} dispatchSaveCard={dispatchSaveCard}/>)

    it('matches the snapshot', () => {
        expect(component).toMatchSnapshot()
    });

    it('switches the image onClick on changeImageButton', () => {
        const button = component.find("#switchImg");
        const img = component.find(Card.Img);
        expect((component.state() as OwnState).goldImg).toBeFalsy();
        button.simulate('click');
        expect((component.state() as OwnState).goldImg).toBeTruthy();
    });

    it('disables the button if the card has no img', () => {
        const noImgComponent: ShallowWrapper = shallow(<CardComponent card={noImgCard} dispatchSaveCard={dispatchSaveCard}/>)
        const button = noImgComponent.find("#switchImg")
        expect(button.prop('disabled')).toBeTruthy()
    });
});