import * as fromReducer from '../../../src/redux/reducers/cardReduces';
import * as fromAction from '../../../src/redux/actions/cardActions';

import { CardActionsType } from '../../../src/redux/actions/cardActions';
import { dummyCardArray, cardNotFoundError, dummyCard, dummyCardUgly } from '../../__mocks__/mockObjects';

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
        expect(state.cards).toBe(dummyCardArray)
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
            value: "Not Dummy",
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
});