import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {logout} from '../../actions/authActions';
import { NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

export class Logout extends Component {
    static propTypes={
        logout:PropTypes.func.isRequired
    }
    componentDidMount = prevProps =>{
        this.props.history.push('/LoginForm')
    }
    render() {
        return (
            <Fragment>
                <NavLink onClick={this.props.logout}>Logout</NavLink>
            </Fragment>
        )
    }
}

export default connect(null,{logout})(Logout);
