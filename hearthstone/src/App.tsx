import React from 'react';
import './App.css';
import ServiceFactory from './services/serviceFactory';
import Card from './model/card';
import container from '../config/inversify';

const serviceFactory = new ServiceFactory(container);

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
            <>
                {
                    this.state.cards.map((el: Card) => {
                        return (
                            <div key={el.cardId} className='card'>
                                {el.name}
                            </div>
                        )
                    })
                }
            </>
        );
    }
}

export default App;
