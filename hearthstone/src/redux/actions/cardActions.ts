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
    onSyncCardsFailed = "onSyncCardsFailed",
    onSubmitFilter = "OnSubmitFilter",
    onFilterByName = "onFilterByName"
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

export interface OnSubmitFilterAction extends Action {
    type: CardActions.onSubmitFilter
    filter: string
    filterKey: string
}

export interface OnFilterByName extends Action {
    type: CardActions.onFilterByName
    name: string
}

export type CardActionsType = onSyncCardsAction |
                              onSyncCardsSucceedAction |
                              onSyncCardsFailedAction |
                              OnSubmitFilterAction |
                              OnFilterByName;

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

export const onSubmitFilterConstructor = (filter: string, filterKey: string): OnSubmitFilterAction => {
    return {
        type: CardActions.onSubmitFilter,
        filter,
        filterKey
    }
}

export const onFilterByNameConstructor = (name: string):OnFilterByName => {
    return {
        type: CardActions.onFilterByName,
        name
    }
} 

export const dispatchSyncCard = (index: string | undefined = undefined) => {
    return (dispatch: Dispatch<CardActionsType>, getState: () => RootState, serviceFactory: ServiceFactory) => {
        dispatch(onSyncCardsConstructor())
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

export const dispatchFilter = (filter: string, filterKey: string) => {
    return (dispatch: Dispatch<CardActionsType>) => {
        return dispatch(onSubmitFilterConstructor(filter, filterKey));
    }
}

export const dispatchFilterByName = (name: string) => {
    return (dispatch: Dispatch<CardActionsType>) => {
        return dispatch(onFilterByNameConstructor(name))
    }
}