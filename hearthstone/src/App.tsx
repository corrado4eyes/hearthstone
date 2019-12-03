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

const mapStateToProps = ({card}: RootState) => {
    return{cards: card.cards}
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({dispatchSyncCard}, dispatch);
}
type Props = StateProps & ActionProps;
export class App extends React.PureComponent<Props, {}> {
    
    componentDidMount(){
        this.props.dispatchSyncCard()
    }

    render(){
        return (
            <Container>
                <Row>
                    {
                        this.props.cards.filter((el: Card) => el.cardSet === "Basic").map((el: Card) => {
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
