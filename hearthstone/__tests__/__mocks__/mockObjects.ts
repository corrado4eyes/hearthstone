import Card from "../../src/model/card";
import { CardSet } from "../../src/model/cardSet";

export const dummyCard: Card = {
    artist: "Corrado Quattrocchi",
    cardId: "what a dummy card!",
    cardSet: "Dummy",
    collectible: true,
    cost: 9999,
    faction: "Splendo",
    flavor: "Meat",
    howToGet: "Ask Frits",
    howToGetGold: "Feeds and Walk Frits for 2 years every day (excluded the holidays)",
    img: "http://media.services.zam.com/v1/media/byName/hs/cards/enus/DS1_183.png",
    imgGold: "http://media.services.zam.com/v1/media/byName/hs/cards/enus/animated/DS1_183_premium.gif",
    locale: "enUS",
    name: "corrado4eyes",
    playerClass: "Human",
    rarity: "Super Rare",
    text: "A dummy Italian boy",
    type: "Developer"
}

export const dummyCardUgly: Card = {
    artist: "lala",
    cardId: "what an ugly dummy card!",
    cardSet: CardSet.Basic,
    collectible: true,
    cost: 9999,
    faction: "Splendo",
    flavor: "Meat",
    howToGet: "Ask Frits",
    howToGetGold: "Feeds and Walk Frits for 2 years every day (excluded the holidays)",
    img: "http://media.services.zam.com/v1/media/byName/hs/cards/enus/DS1_183.png",
    imgGold: "http://media.services.zam.com/v1/media/byName/hs/cards/enus/animated/DS1_183_premium.gif",
    locale: "enUS",
    name: "lalala",
    playerClass: "Human",
    rarity: "Not Super Rare",
    text: "A dummy Italian boy",
    type: "Developer"
}

export const noImgCard: Card = {
    artist: "lolo",
    cardId: "no_img_card",
    cardSet: CardSet.Classic,
    collectible: true,
    cost: 9999,
    faction: "lala",
    flavor: "Meat",
    howToGet: "no img",
    howToGetGold: "have no img",
    locale: "enUS",
    name: "lalala",
    playerClass: "Human",
    rarity: "Not Super Rare",
    text: "A dummy Italian boy",
    type: "Developer"
}

export const dummyCardArray = [dummyCard, dummyCardUgly]

export const cardNotFoundError = "Cards not Found!";
