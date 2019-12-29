import * as firebase from 'firebase';
import {firestore} from "firebase/app";
import "firebase/firestore";

export interface IFirebaseCommon {
    collection(collectionId: string): firestore.CollectionReference;
    firestore(): firestore.Firestore;
}

export class FirebaseCommon implements IFirebaseCommon{
    constructor(private readonly firebase: any) {}

    
    firestore = (): firestore.Firestore => {
        return this.firebase.firestore();
    }

    collection = (collectionId: string): firestore.CollectionReference => {
        return this.firestore().collection(collectionId);
    }

}