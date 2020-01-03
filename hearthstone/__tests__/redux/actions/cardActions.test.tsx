import * as fromCard from '../../../src/redux/actions/cardActions';
import {generateMockStore} from '../../__mocks__/mockStore';
import { MockStore } from 'redux-mock-store';
import CardService from '../../../src/services/cardService';
import ServiceFactory from '../../../src/services/serviceFactory';
import { spyRejects, spyResolves } from '../../testUtils/promiseUtils';
import { dummyCardArray, cardNotFoundError, dummyCard, dummyCardUgly } from '../../__mocks__/mockObjects';
import { CardSet } from '../../../src/model/cardSet';
import { initialState } from '../../../src/redux/reducers/cardReducer';

const mockCardServiceFailure = (error?: any): CardService => {
    return {
        getAll: spyRejects(error),
        get: spyRejects(error),
        save: spyRejects(error),
        getByCardSet: spyRejects(error)
    }
}

const mockSyncCardReject = mockCardServiceFailure()

const mockCardServiceSuccess = (resolvedData?: any): CardService => {
    return {
        getAll: spyResolves(resolvedData),
        get: spyResolves(resolvedData),
        save: spyResolves(resolvedData),
        getByCardSet: spyResolves(resolvedData)
    }
}

const serviceSetup = (result: CardService) => {
    return jest.spyOn(ServiceFactory.prototype, "getFirebaseCardService")
               .mockImplementation(() => result);
};

describe('Card Actions', () => {
    let store: MockStore<any, any>;
    let spy: jest.SpyInstance<CardService>;

    afterAll(() => {
        spy.mockRestore();
    });
    describe('onSyncCard Action', () => {
        beforeEach(async () => {
            spy.mockClear();
            store = generateMockStore({card: {...initialState}});
            store.clearActions();
            await store.dispatch(fromCard.dispatchSyncCard())
        });
        describe('onSyncCardSucceeded getAll', () => {
            beforeAll(() => {
                jest.resetModules();
                spy = serviceSetup(mockCardServiceSuccess(dummyCardArray));
            });

            it("creates the right payload", () => {
                const action = fromCard.onSyncCardsConstructor();
                expect(action).toEqual({
                    type: fromCard.CardActions.onSyncCards,
                });
            });

            it("dispatches the right action", () => {
                const action = store.getActions();
                expect(action.length).toBe(2);
                expect(action[1]).toEqual({type: fromCard.CardActions.onSyncCardsSucceed, cards: dummyCardArray});
            });
        });

        describe('onSyncCardSucceeded getByCardSet not cached', () => {
            beforeAll( async () => {
                spy.mockClear();
                store.clearActions();
                // Calling the syncing passing a cardSet
                await store.dispatch(fromCard.dispatchSyncCard(CardSet.Basic))
                jest.resetModules();
                spy = serviceSetup(mockCardServiceSuccess([dummyCardUgly]));
            });

            it("creates the right payload", () => {
                const action = fromCard.onSyncCardsConstructor();
                expect(action).toEqual({
                    type: fromCard.CardActions.onSyncCards,
                });
            });

            it("dispatches the right action", () => {
                const action = store.getActions();
                expect(action.length).toBe(2);
                expect(action[1]).toEqual({type: fromCard.CardActions.onSyncCardsSucceed, cards: [dummyCardUgly]});
            });
        });

        describe('onSyncCardFailed', () => {
            beforeAll(() => {
                jest.resetModules();
                spy = serviceSetup(mockCardServiceFailure(cardNotFoundError))
            });

            it("creates the right payload", () => {
                const action = fromCard.onSyncCardsConstructor();
                expect(action).toEqual({
                    type: fromCard.CardActions.onSyncCards,
                });
            });

            it("dispatches the right action", () => {
                const action = store.getActions();
                expect(action.length).toBe(2);
                expect(action[1]).toEqual({type: fromCard.CardActions.onSyncCardsFailed, error: cardNotFoundError});
            });
        }); 
    });

    describe('onSubmitFilter Action', () => {
        const cards = dummyCardArray
        const filterKey = "cardSet"
        const filter = CardSet.Basic
        beforeEach(async () => {
            spy.mockClear();
            store = generateMockStore({card: {...initialState, cards: cards}});
            store.clearActions();
            await store.dispatch(fromCard.dispatchFilter(filter, filterKey, CardSet))
        });

        it("dispatches the right action", () => {
            const action = store.getActions();
            expect(action.length).toBe(1);
            expect(action[0]).toEqual({type: fromCard.CardActions.onSubmitFilter, filter, filterKey});
        });

    });

    describe('onFilterByName Action', () => {
        const cardName = dummyCard.name!
        beforeEach(async () => {
            spy.mockClear();
            store = generateMockStore({});
            store.clearActions();
            await store.dispatch(fromCard.dispatchFilterByName(cardName))
        });

        it("dispatches the right action", () => {
            const action = store.getActions();
            expect(action.length).toBe(1);
            expect(action[0]).toEqual({type: fromCard.CardActions.onFilterByName, name: cardName});
        });

    });

    describe('onSyncCardSucceeded getByCardSet cached (dispatchSubmitFilter)', () => {
        beforeAll( async () => {
            spy.mockClear();
            spy = serviceSetup(mockCardServiceSuccess([dummyCardUgly]))
            store.clearActions();
            store = generateMockStore({card: {...initialState}});
            // Calling the syncing passing a cardSet
            await store.dispatch(fromCard.dispatchSyncCard(CardSet.Basic))
            jest.resetModules();
        });

        it("creates the right payload", () => {
            const action = fromCard.onSyncCardsConstructor();
            expect(action).toEqual({
                type: fromCard.CardActions.onSyncCards,
            });
        });

        it("dispatches the right action", () => {
            const action = store.getActions();
            expect(action.length).toBe(2);
            expect(action[1]).toEqual({type: fromCard.CardActions.onSyncCardsSucceed, cards: [dummyCardUgly]});
        });
    });
});