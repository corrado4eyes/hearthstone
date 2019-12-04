import {CardActionsType, CardActions} from '../actions/cardActions';
import Card from '../../model/card';

export interface State {
    cards: Card[]
    loading: boolean
    error: string
    cardSet: string,
}

export const initialState = {
    cards: [],
    loading: false,
    error: "",
    cardSet: "Basic"
}

export const reducer = (state: State = initialState, action: CardActionsType) => {
    switch(action.type) {
        case CardActions.onSyncCards:
            return Object.assign({}, state, {
                loading: true
            });
        case CardActions.onSyncCardsSucceed:
            return Object.assign({}, state, {
                loading: false,
                cards: action.cards
            });
        case CardActions.onSyncCardsFailed:
            return Object.assign({}, state, {
                loading: false,
                error: action.error,
            });
        default:
            return Object.assign({}, state);
    }
}