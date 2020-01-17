import CardService from "../services/cardService";
import Card from "../model/card";
import cards from "../assets/cards.json";
import { injectable } from "inversify";
import "reflect-metadata";
import { CardSet } from "../model/cardSet";

@injectable()
export default class CardsServiceImpl implements CardService {
    cards: Card[]; 

    constructor() {
        this.cards = this.readCards()
    }

    getByCardSet(cardSet: CardSet): Promise<Card[]> {
        return Promise.resolve(this.cards.filter((card: Card) => card.cardSet === cardSet));
    }

    save(card: Card): Promise<boolean> {
        return Promise.resolve(true)
    }    
    get(cardId: string): Promise<Card> {
        const card: Card = this.cards.filter((card: Card) => card.cardId === cardId)[0]
        return Promise.resolve(card);
    }
    getAll(): Promise<Card[]> {
        return Promise.resolve(this.cards);
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