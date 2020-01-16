import { Action, Dispatch } from "redux";
import Card from "../../model/card";
import { RootState } from "../reducers/mainReducer";
import { ServiceFactory } from "../../services/serviceFactory";
import { CardSet } from "../../model/cardSet";
import { Rarity } from "../../model/rarity";
import { FirebaseCardService } from "../../firebase/firebaseCardService";
import CardService from "../../services/cardService";
import { CardClass } from "../../model/class";
import { CardType } from "../../model/cardType";
import { Mechanic } from "../../model/mechanic";

export enum CardActions {
    onSyncCards = "onSyncCards",
    onSyncCardsSucceed = "onSyncCardsSucceed",
    onSyncCardsFailed = "onSyncCardsFailed",
    onSubmitFilter = "OnSubmitFilter",
    onFilterByName = "onFilterByName",
    onSaveCard = "onSaveCard",
    onSaveCardSucceed = "onSaveCardSucceed",
    onSaveCardFailed = "onSaveCardFailed"
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
    filter: CardFilters
    filterKey: string
}

export interface OnFilterByName extends Action {
    type: CardActions.onFilterByName
    name: string
}

export interface OnSaveCardAction extends Action {
    type: CardActions.onSaveCard
}

export interface OnSaveCardSucceedAction extends Action {
    type: CardActions.onSaveCardSucceed
    card: Card
}

export interface OnSaveCardFailedAction extends Action {
    type: CardActions.onSaveCardFailed
    error: any
}

export type CardActionsType = onSyncCardsAction |
                              onSyncCardsSucceedAction |
                              onSyncCardsFailedAction |
                              OnSubmitFilterAction |
                              OnFilterByName |
                              OnSaveCardAction |
                              OnSaveCardSucceedAction |
                              OnSaveCardFailedAction;

export type CardFilters = CardSet | 
                   Rarity | 
                   CardClass | 
                   CardType|
                   Mechanic;

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

export const onSubmitFilterConstructor = (filter: CardFilters, filterKey: string): OnSubmitFilterAction => {
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

export const onSaveCardConstructor = (): OnSaveCardAction => {
    return {
        type: CardActions.onSaveCard
    }
}

export const onSaveCardSucceedConstructor = (card: Card): OnSaveCardSucceedAction => {
    return {
        type: CardActions.onSaveCardSucceed,
        card
    }
}

export const onSaveCardFailedConstructor = (error: any): OnSaveCardFailedAction => {
    return {
        type: CardActions.onSaveCardFailed,
        error
    }
}

export const dispatchSaveCard = (card: Card) => {
    return (dispatch: Dispatch<CardActionsType>, getState: () => RootState, serviceFactory: ServiceFactory) => {
        dispatch(onSaveCardConstructor())
        const cardService = serviceFactory.getFirebaseCardService().save(card)
        .then(() => {
            dispatch(onSaveCardSucceedConstructor(card))
        })
        .catch((err: any) => {
            dispatch(onSaveCardFailedConstructor(err))
        });
    }
}

export const dispatchSyncCard = (cardSet: CardSet | undefined = undefined) => {
    return (dispatch: Dispatch<CardActionsType>, getState: () => RootState, serviceFactory: ServiceFactory) => {
        dispatch(onSyncCardsConstructor())
        const cardService = serviceFactory.getFirebaseCardService()
        if (cardSet === undefined) {
            cardService.getAll()
            .then((cards: Card[]) => {
                dispatch(onSyncCardsSucceedConstructor(cards))
            })
            .catch((err: any) => {
                dispatch(onSyncCardsFailedConstructor(err))
            });
        } else {
            cardService.getByCardSet(cardSet)
            .then((cards: Card[]) => {
                dispatch(onSyncCardsSucceedConstructor(cards))
            })
            .catch((err: string) => {
                dispatch(onSyncCardsFailedConstructor(err))
            });
        }
    }
}

export const checkIfCached = (cardSet: CardSet, state: RootState) => {
    const card = state.card.cards.filter((card: Card) => card.cardSet === cardSet)
    return card.length > 0 ? true : false;
}

export const dispatchFilter = (filter: CardFilters, filterKey: string, enumType: any) => {
    return (dispatch: Dispatch<CardActionsType>, getState: () => RootState, serviceFactory: ServiceFactory) => {
        const cardService = serviceFactory.getFirebaseCardService()
        const state = getState()
        // If the filter is about the Rarity
        if(enumType != CardSet) {
            return dispatch(onSubmitFilterConstructor((filter as CardFilters), filterKey));
        }
        const cardSet = (filter as CardSet)
        if(checkIfCached((filter as CardSet), state)) {
            return dispatch(onSubmitFilterConstructor(cardSet, filterKey))
        } else {
            dispatchByCardSet((filter as CardSet), cardService, dispatch)
            return dispatch(onSubmitFilterConstructor(cardSet, filterKey));
        }
    }
}

export const dispatchByCardSet = (cardSet: CardSet, cardService: CardService, dispatch: Dispatch<CardActionsType>) => {
    cardService.getByCardSet(cardSet)
    .then((cards: Card[]) => {
        dispatch(onSyncCardsSucceedConstructor(cards))
    })
    .catch((err: string) => {
        dispatch(onSyncCardsFailedConstructor(err))
    });
}

export const dispatchFilterByName = (name: string) => {
    return (dispatch: Dispatch<CardActionsType>) => {
        return dispatch(onFilterByNameConstructor(name))
    }
}