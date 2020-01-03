import {CardActionsType, CardActions} from '../actions/cardActions';
import Card from '../../model/card';
import { CardSet } from '../../model/cardSet';
import { Rarity } from '../../model/rarity';
import { CardClass } from '../../model/class';
import { CardType } from '../../model/cardType';

export interface State {
    cards: Card[]
    filteredCards: Card[]
    loading: boolean
    error: string
    filters: {
        [key: string]: string
    }
}

export const initialState = {
    cards: [],
    loading: false,
    error: "",
    filters: {
        cardSet: CardSet.Basic,
        rarity: Rarity.Free,
        playerClass: CardClass.Druid,
        type: CardType.Hero
    },
    filteredCards: []
}

const updateCards = (array: Card[], updatedCard: Card) => {
    return array.map((card: Card) => {
        if(card.cardId! === updatedCard.cardId!)
            return updatedCard
        else
            return card
    }) 
}

export const reducer = (state: State = initialState, action: CardActionsType) => {
    const stateCopy = Object.assign({}, state)
    let filteredCards: Card[] = []
    switch(action.type) {
        case CardActions.onSyncCards:
            return Object.assign({}, state, {
                loading: true
            });
        case CardActions.onSyncCardsSucceed:
        const cardState = stateCopy.cards.concat(action.cards)
        const filteredCardState = cardState.filter((el: Card) => el.cardSet === state.filters['cardSet'])
            return Object.assign({}, state, {
                loading: false,
                cards: cardState,
                filteredCards: filteredCardState
            });
        case CardActions.onSyncCardsFailed:
            return Object.assign({}, state, {
                loading: false,
                error: action.error,
            });
        case CardActions.onSubmitFilter: 
            const newFilter = Object.assign({}, stateCopy.filters, {[action.filterKey]: action.filter});
            filteredCards = stateCopy.cards.filter((el: Card) => (el as any)[action.filterKey] === newFilter[action.filterKey]);
                return Object.assign({}, state, {
                filteredCards: filteredCards,
                filters: newFilter
            });
        case CardActions.onFilterByName:
            filteredCards = stateCopy.cards.filter((el: Card) => {
                if (el.name!.indexOf(action.name) >= 0) {
                    return el
                }else{}
            });
            return Object.assign({}, state, {
                filteredCards
            });
        case CardActions.onSaveCardSucceed:
            const cards = updateCards(stateCopy.cards, action.card)
            filteredCards = updateCards(stateCopy.filteredCards, action.card)
            return Object.assign({}, stateCopy, {
                cards: cards,
                filteredCards: filteredCards
            });
        case CardActions.onSaveCardFailed:
            return Object.assign({}, stateCopy, {
                error: action.error,
            })
        default:
            return Object.assign({}, state);
    }
}