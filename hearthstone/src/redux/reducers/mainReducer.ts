import {combineReducers} from 'redux';
import * as fromCard from './cardReduces';
export interface RootState {
    card: fromCard.State
}

export const initialState: RootState = {
    card: fromCard.initialState
}

export const mainReducer = combineReducers<RootState>({card: fromCard.reducer}) 