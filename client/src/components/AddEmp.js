import React, { Component } from 'react';
import {Button,Modal,ModalHeader,ModalBody,Form,FormGroup,Label,Input,Card,CardBody,Alert,Col,Container} from 'reactstrap';
import {connect} from 'react-redux';
import {addEmp} from '../actions/empActions';
import PropTypes from 'prop-types';


class EmpAdd extends Component {
    state={
        name:'',
        address:'',
        city:'',
        mobile:''
    }
    static propTypes={
        isAuthenticated:PropTypes.bool
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
            return(this.props.history.push('/'));
        }
    }
    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    onSubmit=(e)=>{
        e.preventDefault();
        const {name, address, city, salary, job_title, mobile} = this.state;
        const newEmp={
            name,
            address,
            city,
            salary,
            job_title,
            mobile
        }
        // Add Emp via addEmp action
        this.props.addEmp(newEmp);
    }

    render() {
        return (
            <div className='form-group1'>
                <Card className='card1'>
                    <CardBody>
                        <Form onSubmit={this.onSubmit} className='loginform-group1 center'>
                        {this.state.msg ? <Alert color='danger'>{this.state.msg}</Alert> : null}
                            <h2>Add Emp</h2>
                            <Container>
                                <FormGroup row>
                                    <Label for='name' sm={2}>Name</Label>
                                    <Col>
                                        <Input type='text' name='name' id='name' placeholder='Name' onChange={this.onChange} className='form-box1'></Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for='address' sm={2}>Address</Label>
                                    <Col>
                                        <Input type='text' name='address' id='address' placeholder='Address' onChange={this.onChange} className='form-box1'></Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for='city' sm={2}>City</Label>
                                    <Col>
                                        <Input type='text' name='city' id='city' placeholder='City' onChange={this.onChange} className='form-box1'></Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for='salary' sm={2}>Salary</Label>
                                    <Col>
                                        <Input type='number' name='salary' id='salary' placeholder='Salary' onChange={this.onChange} className='form-box1'></Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for='job_title' sm={2}>Job Title</Label>
                                    <Col>
                                        <Input type='text' name='job_title' id='job_title' placeholder='Job Title' onChange={this.onChange} className='form-box1'></Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for='mobile' sm={2}>MobileNo</Label>
                                    <Col>
                                        <Input type='number' name='mobileno' id='mobileno' placeholder='MobileNo' onChange={this.onChange} className='form-box1'></Input>
                                    </Col>
                                </FormGroup>
                                <Button color='primary' type='submit'>Add</Button>
                            </Container>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
const mapStateToProps=state=>({
    emp:state.emp,
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{addEmp})(EmpAdd);
