import CardService from "../services/cardService";
import Card from "../model/card";
import cards from "../assets/cards.json";
import { injectable } from "inversify";

@injectable()
export default class CardsServiceImpl implements CardService {

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
        let obj = cards;
        for(let type in obj) {
            if(type === "Basic"){
                for(let card in obj[type]){
                    const cardObj: Card = obj[type][card];
                    data = [...data, cardObj]
                }
            }
        }
        return data;
    }
}