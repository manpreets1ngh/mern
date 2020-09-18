import React, { Component, Fragment } from 'react';
import {Navbar,Nav,NavbarBrand,NavItem,NavLink,NavbarToggler,NavbarText,Collapse,Container, Button} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../actions/authActions';
import {addEmp} from '../actions/empActions';

class HeaderNavbar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             isOpen:true
        }
    }

    static propTypes = {
        isAuthenticated : PropTypes.bool,
        auth : PropTypes.object.isRequired,
        logout : PropTypes.func.isRequired
    }

    toggle=()=>{
        this.setState({
            isOpen:!this.state.isOpen
        })
    }
    
    render() {
        const {isAuthenticated,user} = this.props.auth;

        return (
            <Container>
                <Navbar color="grey" light expand="md" className='sm-5'>
                    <NavbarBrand href="/" style={{color:'darkslategrey',fontWeight:'bold',fontSize:'30px'}}></NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink href="/" style={{color:'darkslategrey'}}>Home</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav>
                                {isAuthenticated ?
                                    <React.Fragment>
                                        <NavItem>
                                        <span className='navbar-text mr-3'>
                                            <strong>{user ? `Welcome ${user.username}`: ''}</strong>
                                        </span>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="Logout" style={{color:'darkslategrey'}} onClick={this.props.logout}>Logout</NavLink>
                                        </NavItem>
                                        
                                    </React.Fragment>
                                :
                                    <React.Fragment>
                                        <NavItem>
                                            <NavLink href="LoginForm" onClick={this.props.login} style={{color:'darkslategrey'}}>Admin Login</NavLink>
                                        </NavItem>
                                    </React.Fragment>
                                }
                            </Nav>
                        </Collapse>
                </Navbar>
            </Container>
        )
    }
}

const mapStateToProps = state =>({
    auth : state.auth
})

export default connect(mapStateToProps,{logout})(HeaderNavbar);
