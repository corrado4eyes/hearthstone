export default interface Card {
    cardId?: string
    name?: string
    cardSet?: string
    type?: string
    text?: string
    playerClass?: string
    locale?: string
    mechanics?: any[]
    faction?: string
    rarity?: string
    health?: number
    collectible?: boolean
    img?: string
    imgGold?: string
    durability?: number
    flavor?: string
    artist?: string
    howToGet?: string
    howToGetGold?: string
    cost?: number
    attack?: number
}