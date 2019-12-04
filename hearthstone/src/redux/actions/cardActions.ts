import { Action, Dispatch } from "redux";
import Card from "../../model/card";
import { RootState } from "../reducers/mainReducer";
import { ServiceFactory } from "../../services/serviceFactory";

export enum CardActions {
    // onStore = "onStore",
    // onStoreSucceed = "onStoreSucced",
    // onStoreFailed = "onStoreFailed"
    onSyncCards = "onSyncCards",
    onSyncCardsSucceed = "onSyncCardsSucceed",
    onSyncCardsFailed = "onSyncCardsFailed"
}

export interface onSyncCardsAction extends Action {
    type: CardActions.onSyncCards
}

export interface onSyncCardsSucceedAction extends Action {
    type: CardActions.onSyncCardsSucceed
    cards: Card[]
}

export interface onSyncCardsFailedAction extends Action {
    type: CardActions.onSyncCardsFailed
    error: any
}

export type CardActionsType = onSyncCardsAction |
                              onSyncCardsSucceedAction |
                              onSyncCardsFailedAction;

export const onSyncCardsConstructor = (): onSyncCardsAction => {
    return {
        type: CardActions.onSyncCards
    }
}

export const onSyncCardsSucceedConstructor = (cards: Card[]): onSyncCardsSucceedAction => {
    return {
        type: CardActions.onSyncCardsSucceed,
        cards
    }
}

export const onSyncCardsFailedConstructor = (error: any): onSyncCardsFailedAction => {
    return {
        type: CardActions.onSyncCardsFailed,
        error
    }
}

export const dispatchSyncCard = (index: string | undefined = undefined) => {
    return (dispatch: Dispatch<CardActionsType>, getState: () => RootState, serviceFactory: ServiceFactory) => {
        const cardService = serviceFactory.getCardService()
        cardService.getAll()
        .then((cards: Card[]) => {
            dispatch(onSyncCardsSucceedConstructor(cards))
        })
        .catch((err: string) => {
            dispatch(onSyncCardsFailedConstructor(err))
        });
    }
}