import CardService from "./cardService";
import { Container } from "inversify";
import serviceTypes from "../model/serviceTypes";

export interface ServiceFactory {
    getCardService(): CardService
    getFirebaseCardService(): CardService
}

export default class ServiceFactoryImpl implements ServiceFactory {
    constructor(private readonly container: Container) {}
    
    getCardService(): CardService {
        return this.container.get<CardService>(serviceTypes.CardService);
    }

    getFirebaseCardService(): CardService {
        return this.container.get<CardService>(serviceTypes.FirebaseCardService)
    }

}