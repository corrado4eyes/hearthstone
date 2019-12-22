import {ContainerModule, interfaces} from "inversify";
import types from "./types";
import firebase from "firebase/app";
import { IFirebaseCommon, FirebaseCommon } from "./firebaseCommon";
import serviceTypes from "../model/serviceTypes";
import { FirebaseCardService } from "./firebaseCardService";

export default new ContainerModule((bind) => {
    bind(types.Firebase).toConstantValue(firebase);
    bind<interfaces.Factory<IFirebaseCommon>>(types.FirebaseCommon)
    .toFactory<IFirebaseCommon>(
        (context: interfaces.Context) => {
            return () => {
                return new FirebaseCommon(firebase);
            }
        }
    );
    bind(serviceTypes.FirebaseCardService).to(FirebaseCardService);
});