import * as React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import {Image, NavDropdown, Nav, Form, FormControl, Button, Row} from 'react-bootstrap';
import '../styles/filterBar.css';

import logo from '../assets/hearthstone-mini-logo.png';
import shinyLogo from '../assets/hearthstone-mini-logo-shiny.png';
import { CardSet } from '../model/cardSet';
import { Rarity } from '../model/rarity';

// interface StateProps {
//     cardSet: string,
//     type: string,
// }
// type Props = StateProps;
interface Filter {
    name: string,
    enum: any
    id: string
}
const filters: Filter[] = [{
        name: "Card Set",
        enum: CardSet,
        id: "cardSetFilter"
    },
    {
        "name": "Rarity",
        "enum": Rarity,
        "id": "rarityFilter"
    }]

interface OwnState {
    shinyImg: boolean
}
export class FilterBar extends React.PureComponent<{}, OwnState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            shinyImg: false
        }
    }

    render() {
        return(
            <Row>
                <Navbar bg="dark" expanded expand="lg">
                        <Navbar.Brand >
                            <Image 
                            src={!this.state.shinyImg ? logo : shinyLogo} 
                            onMouseEnter={() => this.setState({shinyImg: true})} 
                            onMouseLeave={() => this.setState({shinyImg: false})} 
                            width="64px" height="64px"/>
                        </Navbar.Brand>
                        <Navbar.Collapse>
                            <Nav>
                                {
                                    filters.map((el) => {
                                        return (
                                        <NavDropdown title={el.name} id={el.id}>
                                            {
                                                Object.values(el.enum).map((cardSet) => {
                                                    return <NavDropdown.Item key={cardSet as string}>{cardSet}</NavDropdown.Item>
                                                })
                                            }
                                        </NavDropdown>)
                                    })
                                }
                                <NavDropdown title="Card Set" id="cardSetDropDown">
                                    {
                                        Object.values(CardSet).map((el) => {
                                            return <NavDropdown.Item key={el}>{el}</NavDropdown.Item>
                                        })
                                    }
                                </NavDropdown>
                            </Nav>
                            <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </Navbar.Collapse>
                </Navbar>
            </Row>
        );
    }
}