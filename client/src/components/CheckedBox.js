import React, { Component } from 'react';
import {Container, ListGroup, ListGroupItem,FormGroup,Label,Col,Input,Row} from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { CSSTransition , TransitionGroup} from 'react-transition-group';
import {Checkbox} from 'antd';
import {connect} from 'react-redux';
import {getEmps} from '../actions/empActions';


// const cities = [
//     {
//         "id": 1,
//         "name":"chandigarh"
//     },
//     {
//         "id": 2,
//         "name":"delhi"
//     },
//     {
//         "id": 3,
//         "name":"noida"
//     },
//     {
//         "id": 4,
//         "name":"bangalore"
//     },
//     {
//         "id": 5,
//         "name":"mumbai"
//     }
// ]

// const handleToggle=(value,props)=>{
//     const {checked} = this.state
//     const currentIndex = checked.indexOf(value)
//     const newChecked = [...checked];

//     if(currentIndex === -1){
//         newChecked.push(value)
//     }else{
//         newChecked.splice(currentIndex,1)
//     }
//     this.setState(newChecked)
//     props.handleFilters(newChecked)
// }

class CheckBox extends Component {
    state={
        cities:[
            {
                name:"chandigarh",
                useful: true
            },
            {
                name:"delhi",
                useful: true
            },
            {
                name:"noida",
                useful: true
            },
            {
                name:"bangalore",
                useful: true
            },
            {
                name:"mumbai",
                useful: true
            }
        ],
        filteredCities: []
    }
    componentDidMount =()=>{
        this.props.getEmps();
    }

    filterHandler = (e) =>{
        let checked = e.target.checked;
        let name = e.target.name;

        let filteredCities = this.state.cities.filter(city=>{
            return city[name] === checked;
        });
        this.setState({filteredCities})
    }
    render() {

        const {filters} = this.state;
        // const renderCheckboxList = () => 
        //     cities.map((value, index,checked)=>(
        //         <React.Fragment key={index}>
        //             <Checkbox onChange={this.handleToggle(value._id)} type='checkbox' checked={checked.indexOf(value._id) === -1 ? false : true}/>
        //             <span>{value.name}</span>
        //         </React.Fragment>
        //     ));  
        return (
            <div>
                <Container style={{marginRight:'100px'}}>
                        <FormGroup>
                            <Row>
                                {/* <Col>
                                    <Input type='checkbox' name='checkbox' id='checkbox' onClick={filterHandler} style={{width:'300px'}}>Chandigarh</Input>
                                    <Input type='checkbox' name='checkbox' id='checkbox' onClick={filterHandler} style={{width:'300px'}}>Delhi</Input>
                                    <Input type='checkbox' name='checkbox' id='checkbox' onClick={filterHandler} style={{width:'300px'}}>Noida</Input>
                                    <Input type='checkbox' name='checkbox' id='checkbox' onClick={filterHandler} style={{width:'300px'}}>Bangalore</Input>
                                    <Input type='checkbox' name='checkbox' id='checkbox' onClick={filterHandler} style={{width:'300px'}}>Mumbai</Input>
                                </Col> */}
                                {/* <Col>
                                    {renderCheckboxList}
                                </Col> */}
                            </Row>
                        </FormGroup>
                </Container>
            </div>
        )
    }
}
const mapStateToProps = state =>({
    emp:state.emp,
    auth:state.auth    
})
export default connect(mapStateToProps,{getEmps})(CheckBox);