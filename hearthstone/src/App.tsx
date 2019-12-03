import React from 'react';
import './App.css';
import ServiceFactory from './services/serviceFactory';
import Card from './model/card';
import inversifyContainer from '../config/inversify';
import {Container, Row, Col, Image} from 'react-bootstrap';

const serviceFactory = new ServiceFactory(inversifyContainer);

interface State {
    cards: any[]
}

interface Props{}
class App extends React.PureComponent<Props, State> {
constructor(props: Props){
      super(props)
      this.state = {
        cards: []
      }
    }

    getData = (): any => {
        return serviceFactory.getCardService().getAll()
        .then((cards: Card[]) => this.setState({cards: cards}))
        .catch((error: any) => {return error});
    }

    componentDidMount(){
      this.getData()
    }

    render(){
        return (
            <Container>
                <Row>
                    {
                        this.state.cards.map((el: Card) => {
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

export default App;
