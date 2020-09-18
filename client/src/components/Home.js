import React, { Component  } from 'react';
import {ListGroupItem,ListGroup, ListGroupItemHeading, ListGroupItemText, Container, Card, CardBody, CardTitle, Alert, CardText, Table} from 'reactstrap';
import {connect} from 'react-redux';
import {getEmps} from '../actions/empActions';
import PropTypes from 'prop-types';
import { CSSTransition , TransitionGroup} from 'react-transition-group';

class Home extends Component {
    static propTypes = {
        getEmps:PropTypes.func.isRequired,
        emp:PropTypes.object.isRequired,
        isAuthenticated:PropTypes.bool
    }
    componentDidMount=()=>{
        this.props.getEmps();
    }
    render(){
        const{isAuthenticated, user} = this.props.auth;
        const {emps} = this.props.emp
        return (
            <>
                <Container>
                    <div className='home'>
                
                        <h2 style={{width:'300px', marginLeft:'260px',marginBottom:'30px'}}>List Of Emps</h2>
                        <Table center>
                            {emps.map(({_id,name,address,city,salary,job_title,mobile})=>(
                                <React.Fragment key={_id}>
                                    <CSSTransition key={_id} timeout={500} classNames='fade'>
                                    <tr>
                                        <td><h4>{name}</h4></td>
                                        <td><h6>{address}, {city}</h6></td>
                                        <td><h6>M: {mobile}</h6></td>
                                        <td><h6>Job Title : {job_title}</h6></td>
                                        <td><h6>Salary : Rs{salary}</h6></td>
                                    </tr>
                                </CSSTransition>
                                </React.Fragment>
                            ))}
                        </Table>
                    </div>
                </Container>
                <div>
                    <hr></hr>
                    <h5>Copyright @ 2019</h5>
                </div>
            </>
        )
    }
}

const mapStateToProps = state =>({
    emp:state.emp,
    auth:state.auth    
})

export default connect(mapStateToProps,{getEmps})(Home);
