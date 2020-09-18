import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container,Col,Alert,Card,CardBody } from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';

class LoginForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email:'',
             password:'',
             msg:null,
        }
    }
    static propTypes = {
        isAuthenticated : PropTypes.bool,
        error : PropTypes.object.isRequired,
        auth : PropTypes.object.isRequired,
        login : PropTypes.func.isRequired,
        clearErrors : PropTypes.func.isRequired
    }

    componentDidUpdate = prevProps =>{
        const {error,isAuthenticated} = this.props;
        if(error !== prevProps.error){
            // Check for Login Error
            if(error.id === 'LOGIN_FAIL'){
                this.setState({msg:error.msg.msg});
            }else{
                this.setState({msg:null});
            }
        }
        if(isAuthenticated){
            return(this.props.history.push('/search'));
        }
    }

    onChange = (e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit = (e)=>{
        e.preventDefault();
        const {email,password} = this.state;
        const{auth} = this.props.auth;
        const user = {
            email,
            password
        }
        // Attempt To Login
        this.props.login(user);
    }
    

    render() {
        return (
            <div className='form-group'>
                <Card className='card'>
                    <CardBody>
                        <Form onSubmit={this.onSubmit} className='loginform-group center'>
                        {this.state.msg ? <Alert color='danger'>{this.state.msg}</Alert> : null}
                            <h2>Admin Login</h2>
                            <Container>
                                <FormGroup row>
                                    <Label for='email' sm={2}>Email</Label>
                                    <Col>
                                        <Input type='text' name='email' id='email' placeholder='Email' onChange={this.onChange} className='form-box'></Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for='password' sm={2}>Password</Label>
                                    <Col>
                                        <Input type='password' name='password' id='password' placeholder='Password' onChange={this.onChange} className='form-box'></Input>
                                    </Col>
                                </FormGroup>
                                <Button color='primary' type='submit'>Login</Button>
                            </Container>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
const mapStateToProps = state =>({
    isAuthenticated : state.auth.isAuthenticated,
    error : state.error,
    auth : state.auth
})

export default connect(mapStateToProps,{login,clearErrors})(LoginForm);
