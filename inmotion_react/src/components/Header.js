import React, {Component} from 'react';
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import r from '../_Resources/r'

class Header extends Component {

    generateRightNav() {
        let button;
        if (this.props.userData) {
            button = (
                <NavDropdown eventKey={2} title={this.props.userData.username} id="header-user-dropdown">
                    <MenuItem eventKey={2.1}>Stub</MenuItem>
                    <MenuItem divider/>
                    <MenuItem eventKey={2.2}>{r.strings.signOut}</MenuItem>
                </NavDropdown>
            )
        } else {
            button = <NavItem eventKey={1} href="#" onClick={() => console.log('Sign In')}>{r.strings.signIn}</NavItem>
        }
        return (
            <Nav pullRight>
                {button}
            </Nav>
        )
    }

    render() {

        return (

            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">{r.strings.title}</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    {this.generateRightNav()}
                </Navbar.Collapse>
            </Navbar>

        )

    }

}

// See ./Maps.js for explanation
export default connect(({authStore: {userData}, navigationStore}) => ({userData, navigationStore}))(Header);