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
        // Buttons will be 2 because also the modal of the card detail view will be rendered.
        const buttons = component.find("#switchImg").at(0);
        const img = component.find(Card.Img);
        expect((component.state() as OwnState).goldImg).toBeFalsy();
        buttons.simulate('click');
        expect((component.state() as OwnState).goldImg).toBeTruthy();
    });

    it('disables the button if the card has no img', () => {
        const noImgComponent: ShallowWrapper = shallow(<CardComponent card={noImgCard} dispatchSaveCard={dispatchSaveCard}/>)
        // Buttons will be 2 because also the modal of the card detail view will be rendered.
        const buttons = noImgComponent.find("#switchImg").at(0)
        expect(buttons.prop('disabled')).toBeTruthy()
    });

    it('changes the value of isOpen property on the state', () => {
        const imageButton = component.find(Card.Img)
        expect((component.state() as any)['isOpen']).toBeFalsy()
        imageButton.simulate('click')
        expect((component.state() as any)['isOpen']).toBeTruthy()
    });
});