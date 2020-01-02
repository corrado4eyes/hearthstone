import * as React from 'react';
import { CardState,  } from './cardComponent';
import CardModel from '../model/card';
import noImg from '../assets/noImg.jpg';
import changeImg from '../assets/change-img-32x32.png';
import favoriteImg from '../assets/favorite.png';
import notFavorite from '../assets/not-favorite.png';
import manaIcon from '../assets/mana-icon.png';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

export interface CardDetailProps {
    cardState: CardState
    card: CardModel
    switchImage: () => void
    addToFavourites: () => void
}

export interface OwnState {
    show: boolean
}

export class CardDetail extends React.PureComponent<CardDetailProps, OwnState> {
    constructor(props: CardDetailProps) {
        super(props)
        this.state = {
            show: false,
        }
    }

    render() {
        return (
            <Container className="cardDetailContainer">
                <Row style={{height: "auto"}}>
                    <Col>
                        <Image src={
                        (this.props.cardState.isImgAvailable) ? 
                            ((this.props.card.img) ? 
                                (this.props.cardState.goldImg ? 
                                    this.props.card.imgGold 
                                : this.props.card.img) 
                            : noImg) 
                        : noImg
                        } height="90%" width="90%"/>
                    </Col>
                    <Col className="cardDetail-font">
                        <Col>
                            {this.props.card.name}
                        </Col>
                        <Row>
                            <Col>
                                Card set: {this.props.card.cardSet}
                            </Col>
                        </Row>
                        <Row>
                            <Col> 
                                Rarity: {this.props.card.rarity} 
                            </Col>
                        </Row>
                        <Row>
                            <Col> 
                                Type: {this.props.card.type} 
                            </Col>
                        </Row>
                        <Row>
                            <Col> 
                                Player class: {this.props.card.playerClass} 
                            </Col>
                        </Row>
                        <Row>
                            <Col> 
                                Cost: {this.props.card.cost} <Image src={manaIcon}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>{ this.props.card.attack ? `Attack: ${this.props.card.attack}\n` : null}</Col>
                            <Col>{ this.props.card.health ? `Health: ${this.props.card.health}\n`: null}</Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button id="switchImg" 
                            className="no-borders" 
                            onClick={this.props.switchImage} 
                            disabled={this.props.card.imgGold ? false : true}>
                            <Image src={changeImg}/>
                        </Button>
                    </Col>
                    <Col>
                        <Button id="favBtn" 
                            onClick={this.props.addToFavourites}>
                                <Image src={this.props.card.favourite ? favoriteImg : notFavorite}/>
                        </Button>
                    </Col>
                </Row>
                </Container>
        )
    }

}