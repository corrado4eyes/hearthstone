import CardService from '../services/cardService';
import Card from '../model/card';
import * as firebase from "firebase/app";
import { injectable, inject } from 'inversify';
import types from './types';
import { IFirebaseCommon } from './firebaseCommon';
import { CardSet } from '../model/cardSet';

@injectable()
export class FirebaseCardService implements CardService {
    constructor(@inject(types.FirebaseCommon) private readonly firebaseCommon: () => IFirebaseCommon){}

    docRef = (): firebase.firestore.CollectionReference => {
        return this.firebaseCommon().collection('cards')
    }

    save(card: Card): Promise<boolean> {
        return this.docRef().doc(card.cardId!).set(card)
        .then(() => true)
        .catch((err) => err);
    }    
    get(cardId: string): Promise<Card> {
        return this.docRef().doc(cardId).get()
        .then((doc: firebase.firestore.DocumentData) => doc.data())
        .catch((err) => err);
    }
    getAll(): Promise<Card[]> {
        return this.docRef().get()
        .then((doc: firebase.firestore.QuerySnapshot) => {
            return doc.docs.map((el: firebase.firestore.DocumentData) => {
                return el.data()
            });
        })
        .catch((err) => {
            return err
        });
    }

    getByCardSet(cardSet: CardSet): Promise<Card[]> {
        const filter = {'field': 'cardSet', 'operator': "==", 'cardSet': cardSet}
        return this.docRef().where(filter.field, '==', filter.cardSet).get()
        .then((doc: firebase.firestore.QuerySnapshot) => {
            return doc.docs.map((el: firebase.firestore.DocumentData) => {
                return el.data()
            });
        })
        .catch((err) => {
            return err
        });
    }


}