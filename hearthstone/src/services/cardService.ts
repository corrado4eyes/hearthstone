import Card from "../model/card";
import { CardSet } from "../model/cardSet";

export default interface CardService {
    /**
     * It saves a card if it does not exist in firestore.
     */
    save(card: Card): Promise<boolean>

    /**
     * It gets the card with the specified id. 
     * @param cardId 
     */
    get(cardId: string): Promise<Card>

    /**
     * It gets all the cards in the dataset.
     */
    getAll(): Promise<Card[]>

    /**
     * It return the card which the passed cardSet
     * @param cardSet 
     */
    getByCardSet(cardSet: CardSet): Promise<Card[]>
}