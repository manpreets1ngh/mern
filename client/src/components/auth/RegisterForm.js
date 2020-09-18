import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container,Col,NavLink,Alert } from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';
import store from '../../store';


class RegisterForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             fullname:'',
             username:'',
             email:'',
             password:'',
             msg:null
        }
    }
    static propTypes = {
        isAuthenticated : PropTypes.bool,
        error : PropTypes.object.isRequired,
        register : PropTypes.func.isRequired,
        clearErrors:PropTypes.func.isRequired
    }
    
    componentDidUpdate = (prevProps)=>{
        const {error,isAuthenticated} = this.props;
        if(error !== prevProps.error){
            // Check For Register Error
            if(error.id === 'REGISTER_FAIL'){
                this.setState({msg:error.msg.msg});
            }else{
                this.setState({msg:null});
            }
        }
    }

    onChange = (e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit = (e)=>{
        e.preventDefault();
        const{fullname,username,email,password} = this.state;

        // Create a new User object
        const newUser = {
            fullname,
            username,
            email,
            password
        };
        // Attempt to register
        this.props.register(newUser); 
    }

    render() {
        return (
            <div className="formmargin">
                <h2>Register</h2>
                {this.state.msg ? <Alert color='danger'>{this.state.msg}</Alert> : null}
                <Form onSubmit={this.onSubmit} className='loginform-group-one'>
                    <Container>
                        <FormGroup row>
                            <Label className='label' for='fullname'>Fullname:</Label>
                            <Col>
                                <Input type='text' name='fullname' id='fullname' placeholder='Fullname' onChange={this.onChange} className='form-box1'></Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label className='label' for='username'>Username:</Label>
                            <Col>
                                <Input type='text' name='username' id='username' placeholder='Username' onChange={this.onChange} className='form-box1'></Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label className='label' for='email'>Email:</Label>
                            <Col>
                                <Input type='text' name='email' id='email' placeholder='Email' onChange={this.onChange} className='form-box1'></Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label className='label' for='password'>Password:</Label>
                            <Col>
                                <Input type='password' name='password' id='password' placeholder='Password' onChange={this.onChange} className='form-box1'></Input>
                            </Col>
                        </FormGroup>
                        <Button style={{marginTop:'1rem'}} type='submit' color='primary'>Register</Button>
                    </Container>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    isAuthenticated : state.auth.isAuthenticated,
    error : state.error
});

export default connect(mapStateToProps,{register,clearErrors})(RegisterForm);
