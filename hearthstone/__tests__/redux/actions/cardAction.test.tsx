import * as fromCard from '../../../src/redux/actions/cardActions';
import {generateMockStore} from '../../__mocks__/mockStore';
import { MockStore } from 'redux-mock-store';
import CardService from '../../../src/services/cardService';
import ServiceFactory from '../../../src/services/serviceFactory';
import { spyRejects, spyResolves } from '../../testUtils/promiseUtils';
import { dummyCardArray, cardNotFoundError } from '../../__mocks__/mockObjects';

const mockCardServiceFailure = (error?: any): CardService => {
    return {
        getAll: spyRejects(error),
        get: spyRejects(error),
        save: spyRejects(error),
    }
}

const mockSyncCardReject = mockCardServiceFailure()

const mockCardServiceSuccess = (resolvedData?: any): CardService => {
    return {
        getAll: spyResolves(resolvedData),
        get: spyResolves(resolvedData),
        save: spyResolves(resolvedData),
    }
}

const serviceSetup = (result: CardService) => {
    return jest.spyOn(ServiceFactory.prototype, "getCardService")
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
            store = generateMockStore({});
            store.clearActions();
            await store.dispatch(fromCard.dispatchSyncCard())
        });
        describe('onSyncCardSucceeded', () => {
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
});