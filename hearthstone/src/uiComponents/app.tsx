import React from 'react';
import '../styles/app.css';
import Card from '../model/card';
import {Container, Row, Col, Image, Spinner} from 'react-bootstrap';
import {dispatchSyncCard} from '../redux/actions/cardActions'
import {RootState} from '../redux/reducers/mainReducer';
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import { CardComponent } from './cardComponent';
import '../styles/commonProperties.css';
import FilterBar from './filterBar';

interface StateProps {
    filteredCards: Card[];
    loading: boolean;
}

interface ActionProps {
    dispatchSyncCard: typeof dispatchSyncCard;
}

interface OwnProps {
    cardSet: string;
}

const mapStateToProps = ({card}: RootState, ownProps: OwnProps) => {
    return{
        filteredCards: card.filteredCards,
        cardSet: ownProps.cardSet,
        loading: card.loading
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
        const cards = this.props.filteredCards;
        return this.props.loading ? 
        (<Container >
            <Row className="justify-content-md-center">
                <Col md="auto" className="vertically-centered">
                    <Spinner animation="grow" variant="success" />
                </Col>
            </Row>
        </Container>) 
        : (<Container>
                <Row><FilterBar/></Row>
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
            </Container>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
