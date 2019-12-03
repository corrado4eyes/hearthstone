import React from 'react';
import './App.css';
import Card from './model/card';
import {Container, Row, Col, Image} from 'react-bootstrap';
import {dispatchSyncCard} from '../src/redux/actions/cardActions'
import {RootState} from './redux/reducers/mainReducer';
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";

interface StateProps {
    cards: Card[]
}

interface ActionProps {
    dispatchSyncCard: typeof dispatchSyncCard;
}

interface OwnProps {
    cardSet: string
}

const mapStateToProps = ({card}: RootState, ownProps: OwnProps) => {
    return{
        cards: card.cards,
        cardSet: ownProps.cardSet
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({dispatchSyncCard}, dispatch);
}
type Props = StateProps & ActionProps & OwnProps;
export class App extends React.PureComponent<Props, {}> {
    
    componentDidMount(){
        this.props.dispatchSyncCard()
    }

    render(){
        return (
            <Container>
                <Row>
                    {
                        this.props.cards.filter((el: Card) => el.cardSet === this.props.cardSet).map((el: Card) => {
                            return (el.img || el.imgGold) ? (
                                <Col key={el.cardId} className='card' md="4">
                                    <Image src={el.img}/>
                                </Col>
                            ) : undefined
                        })
                    }
                </Row>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
