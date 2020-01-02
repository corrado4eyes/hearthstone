import * as React from 'react';
import {CardDetail} from '../../src/uiComponents/cardDetail';
import { shallow, ShallowWrapper, ReactWrapper, mount } from 'enzyme';
import { dummyCard } from '../__mocks__/mockObjects';
import { CardState } from '../../src/uiComponents/cardComponent';
import { CardDetailProps } from '../../src/uiComponents/cardDetail';
import { Button } from 'react-bootstrap';

const addToFavorite = jest.fn()
const switchImage = jest.fn()

const cardStateInitialValues: CardState = {
    goldImg: false,
    isImgAvailable: true,
    isOpen: false
}


describe('CardDetail', () => {
    const component: ReactWrapper = mount(<CardDetail switchImage={switchImage} addToFavourites={addToFavorite} cardState={cardStateInitialValues} card={dummyCard}/>);

    afterAll(() => {
        component.unmount()
    })

    it('matches the snapshot', () => {
        expect(component).toMatchSnapshot();
    })

    it('checks the props', () => {
        const props: CardDetailProps = (component.find(CardDetail).props() as CardDetailProps)
        expect(props.cardState.goldImg).toBe(cardStateInitialValues.goldImg)
        expect(props.cardState.isImgAvailable).toBe(cardStateInitialValues.isImgAvailable)
        expect(props.cardState.isOpen).toBe(cardStateInitialValues.isOpen)
    })

    it('fires swithImage onClick', () => {
        const switchButton = component.find('#switchImg').find(Button)
        expect(switchImage).not.toHaveBeenCalled()
        switchButton.simulate('click')
        expect(switchImage).toHaveBeenCalled()
    });

    it('fires addToFavorite onClick', () => {
        const switchButton = component.find('#favBtn').find(Button)
        expect(addToFavorite).not.toHaveBeenCalled()
        switchButton.simulate('click')
        expect(addToFavorite).toHaveBeenCalled()
    });
});
