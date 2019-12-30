import * as React from 'react';
import { Image, Card, Button, Row, Col } from 'react-bootstrap';
import CardModel from '../model/card';
import noImg from '../assets/noImg.jpg';
import changeImg from '../assets/change-img-32x32.png';
import { urlIsFound } from '../utils/utils';
import { dispatchSaveCard } from '../redux/actions/cardActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styles/cardComponent.css';

interface OwnProps {
    card: CardModel;
}

export interface OwnState {
    goldImg: boolean
    isImgAvailable: boolean
}

interface ActionProps {
    dispatchSaveCard: typeof dispatchSaveCard;
}

const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({dispatchSaveCard}, dispatch)
}

type Props = ActionProps & OwnProps;
export class CardComponent extends React.PureComponent<Props, OwnState> {
    private _isMounted = false;

    constructor(props: Props){
        super(props)
        this.state = {
            goldImg: false,
            isImgAvailable: true,
        }
    }

    switchImage = () => {
        this.setState({goldImg: !this.state.goldImg})
    }

    addToFavourites = () => {
        const card = Object.assign({}, this.props.card, {
            favourite: !this.props.card.favourite
        })
        this.props.dispatchSaveCard(card)
    }

    componentDidMount = () => {
        this._isMounted = true;
        urlIsFound(this.props.card.img!)
        .then((resp) => {
            if(this._isMounted){
                if(resp){
                    this.setState({isImgAvailable: true});
                } else {
                    this.setState({isImgAvailable: false});
                }
            }
        });
    }

    componentWillUnmount = () => {
        this._isMounted = false
    }

    render() {
        return(
            <Card className="no-border text-center">
                <Card.Img variant="top" src={
                    (this.state.isImgAvailable) ? 
                        ((this.props.card.img) ? 
                            (this.state.goldImg ? 
                                this.props.card.imgGold 
                            : this.props.card.img) 
                        : noImg) 
                    : noImg
                    }
                    />
                <Card.Title className="card-font">{this.props.card.name}</Card.Title>
                <Card.Text className="card-font">
                {`Attack: ${this.props.card.attack || "NaN"}\n
                  Health: ${this.props.card.health || "NaN"}\n`}
                </Card.Text>
                <Row>
                    <Col>
                        <Button id="switchImg" 
                            className="no-borders" 
                            onClick={this.switchImage} 
                            disabled={this.props.card.img ? false : true}><Image src={changeImg}/></Button>
                    </Col>
                    <Col>
                        <Button id="favBtn" onClick={this.addToFavourites}>Add to Favourites</Button>
                    </Col>
                </Row>
            </Card>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CardComponent)