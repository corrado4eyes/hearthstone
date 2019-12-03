import CardService from "../services/cardService";
import serviceTypes from "../model/serviceTypes";
import CardsServiceImpl from "../implementation/cardServiceImpl";
import {ContainerModule} from "inversify";

export default new ContainerModule((bind) => {
    bind<CardService>(serviceTypes.CardService).to(CardsServiceImpl)
});