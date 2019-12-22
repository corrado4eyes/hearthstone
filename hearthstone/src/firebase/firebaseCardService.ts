import CardService from '../services/cardService';
import Card from '../model/card';
import * as firebase from "firebase/app";
import { injectable, inject } from 'inversify';
import types from './types';
import { IFirebaseCommon } from './firebaseCommon';

@injectable()
export class FirebaseCardService implements CardService {
    constructor(@inject(types.FirebaseCommon) private readonly firebaseCommon: () => IFirebaseCommon){}

    save(card: Card): any {
        const docRef = this.firebaseCommon().collection('cards')
        return docRef.doc(card.cardId!)
        .set(card)
    }    
    get(cardId: string): Promise<Card> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Card[]> {
        throw new Error("Method not implemented.");
    }


}