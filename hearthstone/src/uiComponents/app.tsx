import React from 'react';
import '../styles/app.css';
import Card from '../model/card';
import {Container, Row, Col, Spinner} from 'react-bootstrap';
import {dispatchSyncCard} from '../redux/actions/cardActions'
import {RootState} from '../redux/reducers/mainReducer';
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import CardComponent from './cardComponent';
import '../styles/commonProperties.css';
import FilterBar from './filterBar';
import { CardSet } from '../model/cardSet';

interface StateProps {
    filteredCards: Card[];
    loading: boolean;
    cardSet: CardSet;
}

interface ActionProps {
    dispatchSyncCard: typeof dispatchSyncCard;
}

const mapStateToProps = ({card}: RootState) => {
    return{
        filteredCards: card.filteredCards,
        cardSet: (card.filters.cardSet as CardSet),
        loading: card.loading
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({dispatchSyncCard}, dispatch);
}
type Props = StateProps & ActionProps;
export class App extends React.PureComponent<Props, {}> {
    
    componentDidMount(){
        // Added to avoid that the limit in firestore is exceeded. 
        // Remove this.props.cardSet to load all the cards.
        this.props.dispatchSyncCard(this.props.cardSet)
    }

    render(){
        const cards = this.props.filteredCards;
        return (
        <Container className="no-background">
            {
                this.props.loading ? 
                    (
                        <Row className="justify-content-md-center">
                            <Col md="auto" className="vertically-centered">
                                <Spinner animation="grow" variant="success" />
                            </Col>
                        </Row>
                    ) 
                : 
                    (<>
                        <Row className="justify-content-md-center"><FilterBar/></Row>
                        <Row>
                            { 
                                !(cards.length === 0) ?
                                    cards.map((el: Card) => {
                                        return (el.img || el.imgGold) ? (
                                            <Col key={el.cardId} className='card no-border' md="4">
                                                <CardComponent card={el}/>
                                            </Col>
                                        ) : undefined
                                    })
                                    :
                                    <Row className="justify-content-md-center">
                                        <Col md="auto" className="vertically-centered">
                                            No Results Found!
                                        </Col>
                                    </Row>
                            }
                        </Row>
                    </>)
            }
        </Container>);
            
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
