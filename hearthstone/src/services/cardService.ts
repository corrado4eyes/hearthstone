import Card from "../model/card";

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
    getAll(): Promise<any>
}