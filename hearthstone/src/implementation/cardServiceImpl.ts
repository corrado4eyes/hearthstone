import CardService from "../services/cardService";
import Card from "../model/card";
import cards from "../assets/cards.json";
import { injectable } from "inversify";
import "reflect-metadata";
import { CardSet } from "../model/cardSet";

@injectable()
export default class CardsServiceImpl implements CardService {
    
    getByCardSet(cardSet: CardSet): Promise<Card[]> {
        throw new Error("Method not implemented.");
    }

    save(card: Card): Promise<boolean> {
        throw new Error("Method not implemented.");
    }    
    get(cardId: string): Promise<Card> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Card[]> {
        return Promise.resolve(this.readCards());
    }

    private readonly readCards = (): Card[] => {
        let data: Card[] = [];
        let obj: any = cards;
        for(let type in obj) {
            if(obj.hasOwnProperty(type)){
                for(let card in obj[type]){
                    if(obj[type].hasOwnProperty(card)) {
                        const cardObj: Card = obj[type][card];
                        data = [...data, cardObj]
                    }
                }
            }
        }
        return data;
    }
}