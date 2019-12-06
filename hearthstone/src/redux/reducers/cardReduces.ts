import {CardActionsType, CardActions} from '../actions/cardActions';
import Card from '../../model/card';

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
        cardSet: "Basic",
        rarity: "Free",
    },
    filteredCards: []
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
        const cardInitialState = action.cards.filter((el: Card) => el.cardSet === state.filters['cardSet'])
            return Object.assign({}, state, {
                loading: false,
                cards: action.cards,
                filteredCards: cardInitialState
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
        default:
            return Object.assign({}, state);
    }
}