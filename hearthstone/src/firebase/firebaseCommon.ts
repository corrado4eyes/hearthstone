import {firestore} from "firebase/app";
import { injectable } from "inversify";

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