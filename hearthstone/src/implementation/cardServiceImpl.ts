import CardService from "../services/cardService";
import Card from "../model/card";
import cards from "../assets/cards.json";

export default class CardsServiceImpl implements CardService {

    save(card: Card): Promise<boolean> {
        throw new Error("Method not implemented.");
    }    
    get(cardId: string): Promise<Card> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<any> {
        return Promise.resolve(this.readCards());
    }

    private readonly readCards = (): any => {
        let data = {};
        let obj = cards;
        for(let card in obj) {
            console.log(card)
            return -1
        }
    }
}