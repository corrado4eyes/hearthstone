import * as React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import {Image, NavDropdown, Nav, Form, Button, Row, Col} from 'react-bootstrap';
import '../styles/filterBar.css';

import logo from '../assets/hearthstone-mini-logo.png';
import shinyLogo from '../assets/hearthstone-mini-logo-shiny.png';
import filterBarImg from '../assets/navBar.png';
import { CardSet } from '../model/cardSet';
import { Rarity } from '../model/rarity';
import {dispatchFilter, dispatchFilterByName} from '../redux/actions/cardActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../redux/reducers/mainReducer';
const filters: Filter[] = [{
    name: "Card Set",
    enum: CardSet,
    id: "cardSetFilter",
    key: "cardSet"
},
{
    name: "Rarity",
    enum: Rarity,
    id: "rarityFilter",
    key: "rarity"
}]

interface Filter {
    name: string,
    enum: any
    id: string
    key: string
}

interface StateProps {
    filters: any
}

interface ActionProps {
    dispatchFilter: typeof dispatchFilter
    dispatchFilterByName: typeof dispatchFilterByName
}

interface OwnState {
    shinyImg: boolean
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({dispatchFilter, dispatchFilterByName}, dispatch)
}
const mapStateToProps = ({card}: RootState) => {
    return {
        filters: card.filters
    }
}

type Props = ActionProps & StateProps;
export class FilterBar extends React.PureComponent<Props, OwnState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            shinyImg: false
        }
    }

    onFilterSelected = (filter: string, filterKey: string) => {
        this.props.dispatchFilter(filter, filterKey);
    }

    onFilterByName = (e: any) => {
        e.preventDefault();
        const text = e.currentTarget.cardName.value
        if(text.trim() === '')
            return
        this.props.dispatchFilterByName(text);
    }

    render() {
        return(
            <Row className="justify-content-md-center" >
                <Navbar className="navbar" bg="dark" expanded expand="lg">
                    <Col>
                        <Navbar.Brand >
                            <Image 
                            src={!this.state.shinyImg ? logo : shinyLogo} 
                            onMouseEnter={() => this.setState({shinyImg: true})} 
                            onMouseLeave={() => this.setState({shinyImg: false})} 
                            width="64px" height="64px"/>
                        </Navbar.Brand>
                    </Col>
                        <Navbar.Collapse>
                            <Nav>
                                {
                                    filters.map((el, i) => {
                                        return (
                                            <Col key={i}>
                                                <NavDropdown title={this.props.filters[el.key]} id={el.id} key={el.id}>
                                            {
                                                Object.values(el.enum).map((value) => {
                                                    return <NavDropdown.Item 
                                                            key={value as string} 
                                                            onClick={this.onFilterSelected.bind(this, (value as string), el.key)}>
                                                            >
                                                                {value as string}
                                                            </NavDropdown.Item>
                                                })
                                            }
                                        </NavDropdown></Col>)
                                    })
                                }
                            </Nav>
                                <Form inline onSubmit={this.onFilterByName.bind(this)}>
                                    <Form.Group>
                                        <Col>
                                            <Form.Control name="cardName" id="nameFilter" type="text" placeholder="Search" className="mr-sm-2" />
                                        </Col>
                                        <Col>
                                            <Button type="submit" variant="outline-success">Search</Button>
                                        </Col>
                                    </Form.Group>
                                </Form>
                        </Navbar.Collapse>
                </Navbar>
            </Row>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar)