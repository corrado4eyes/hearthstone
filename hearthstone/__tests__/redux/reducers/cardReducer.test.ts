import * as fromReducer from '../../../src/redux/reducers/cardReducer';
import * as fromAction from '../../../src/redux/actions/cardActions';

import { CardActionsType } from '../../../src/redux/actions/cardActions';
import { dummyCardArray, cardNotFoundError, dummyCard, dummyCardUgly } from '../../__mocks__/mockObjects';
import { CardSet } from '../../../src/model/cardSet';

describe('Card Reducer', () => {
    let payload: CardActionsType;
    let state: fromReducer.State;
    let mockState: fromReducer.State;

    beforeEach(() => {
        payload = fromAction.onSyncCardsConstructor();
        mockState = {...fromReducer.initialState, cards: dummyCardArray};
        state = fromReducer.reducer(mockState, payload);
    });

    it('set loading as false and fill the array', () => {
        payload = fromAction.onSyncCardsSucceedConstructor(dummyCardArray);
        expect(state.loading).toBeTruthy()
        state = fromReducer.reducer(mockState, payload);
        mockState.loading = true
        expect(state.loading).toBeFalsy()
        // Since the initialState in mockState contains a copy of dummyCard Array, the expected content becomes
        // 2 times the value of dummyCardArray 
        expect(state.cards).toEqual(dummyCardArray.concat(dummyCardArray))
    });

    it('set loading to false and the error', () => {
        payload = fromAction.onSyncCardsFailedConstructor(cardNotFoundError);
        state = fromReducer.reducer(mockState, payload);
        expect(state.loading).toBeFalsy()
        expect(state.error).toBe(cardNotFoundError)
    });

    const scenario = [
        {
            key: "rarity",
            value: "Super Rare",
            expectedValue: dummyCard
        },
        {
            key: "cardSet",
            value: CardSet.Basic,
            expectedValue: dummyCardUgly
        }
    ]
    scenario.forEach((el: any) => {
        it(`filters by ${el.key}`, () => {
            payload = fromAction.onSubmitFilterConstructor(el.value, el.key)
            state = fromReducer.reducer(mockState, payload);
            expect(state.filteredCards).toStrictEqual([el.expectedValue])
        });
    });

    it(`filters by name`, () => {
        const cardName = "corrado"
        payload = fromAction.onFilterByNameConstructor(cardName);
        state = fromReducer.reducer(mockState, payload);
        expect(state.filteredCards).toStrictEqual([dummyCard])
    });

    it('update the card changes onSaveCardSucces', () => {
        expect(state.cards[0].cardSet).toBe("Dummy")
        payload = fromAction.onSaveCardSucceedConstructor({...dummyCard, cardSet: CardSet.Basic});
        state = fromReducer.reducer(mockState, payload);
        expect(state.cards[0].cardSet).toStrictEqual(CardSet.Basic)
    });

    it('update the error onSaveCardFailed', () => {
        expect(state.error).toBe("")
        payload = fromAction.onSaveCardFailedConstructor("Card has not been updated");
        state = fromReducer.reducer(mockState, payload);
        expect(state.error).toBe("Card has not been updated")
    });
});