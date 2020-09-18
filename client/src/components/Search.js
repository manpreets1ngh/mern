import React, { Component } from 'react';
import {Container, ListGroup, ListGroupItem,FormGroup,Card,Col,Input,CardBody,Table} from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { CSSTransition , TransitionGroup} from 'react-transition-group';
import {getEmps} from '../actions/empActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {array} from 'prop-types';
import {Checkbox} from 'antd';
import CheckedBox from './CheckedBox';
import filterHandler from './CheckedBox';

 class Search extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             filter:[],
             searchValue:null,
             toggle:false,
             dropdownOpen:false
            }
    }
    
    static defaultProps = { 
        employees: []       
    }
    static propTypes = {
        emp:array,
        getEmps:PropTypes.func.isRequired,
        emp:PropTypes.object.isRequired,
        isAuthenticated:PropTypes.bool
    }
    //  toggle=()=>{
    //      this.setState({
    //          dropdownOpen:!this.state.dropdownOpen
    //      })
    //  }
     componentDidMount = skip =>{
    //       const onLoadMore=()=>{
    //           const { limit} = this.state
    //           let skip = skip + limit;
    //           const variables = {
    //               skip:skip,
    //               limit:limit
    //           }
    //           this.props.getEmps(variables);
    //       }
    //    this.setState({skip})
    this.setState({filtered:this.props.emps})
    this.props.getEmps();
     }
    onChangeSearch = e =>{
        this.setState({[e.target.name]:e.target.value});
    }
    componentWillReceiveProps =(nextProps)=>{
        this.setState({
            filtered:nextProps.emps
        })
    }
   
    // handleChange=(e)=>{
    //     let currentList = []
    //     let newList = []

    //     if(e.target.value !== ""){
    //         currentList = this.props.emps;
    //         newList = currentList.filter(emp =>{
    //             const lc = emp.toLowerCase();
    //             const filter = e.target.value.toLowerCase();
    //             return lc.includes(filter);
    //         });
    //     }else{
    //         newList = this.props.emps;
    //     }
    //     this.setState({
    //         filtered:newList
    //     })
    // }
    _updateSearchValue (value) {
        this.setState({
            searchValue: value
        });
    }
    handleChange(event, index, value) {
        console.log("handle change (value) ", value);
        console.log("handle change (event) ", event);
        console.log("handle change (index) ", index);
        //Set States
    }
    toggle=()=>{
        this.setState({
            toggle:!this.state.toggle
        })
    }
     render() { 
         const{emps} = this.props.emp;
         const {isAuthenticated} = this.props.auth;
         let filterEmps = emps.filter(emp=>{
             return emp.job_title.indexOf(this.state.searchValue) !== -1;
         })
        // const{limit} = this.state
        //  const showFilterResults = filters =>{
        //       const variable ={
        //           skip:0,
        //           limit:limit,
        //           filters:filters 
        //       }
        //       this.setState(variable)
        //   }
        //  const handleFilters=(filters, category)=>{
        //       console.log(filters)
        //       const newFilters = {...filters}
        //       newFilters[category] = filters
        //       if(category === 'salary'){
        //           showFilterResults(newFilters)
        //           this.setState(newFilters)
        //       }
        //   }
        return (
             <Container>
                     <div className='home'>
                         <Card className='card2'>
                             <CardBody>
                                         
                                    <Input type='search' name='search' id='search' value={this.state.searchValue} placeholder='Search' onChange={(e)=>this._updateSearchValue(e.target.value)} style={{width:'300px'}}></Input>
                                    <hr></hr>
                                    <select value={this.state.value} onChange={this.handleChange}>
                                    <option value=''>City</option>
                                        <option value='chandigarh'>Chandigarh</option>
                                        <option value='delhi'>Delhi</option>
                                        <option value='noida'>Noida</option>
                                        <option value='bangalore'>Bangalore</option>
                                        <option value='mumbai'>Mumbai</option>
                                    </select>
                                    <hr></hr>
                                    <select value={this.state.value} onChange={this.handleChange}>
                                    <option value=''>Job Title</option>
                                        <option value='administrator'>Administrator</option>
                                        <option value='manager'>Manager</option>
                                        <option value='developer'>Developer</option>
                                        <option value='juniordeveloper'>Junior Developer</option>
                                        <option value='seniordeveloper'>Senior Developer</option>
                                        <option value='projectmanager'>Project manager</option>
                                    </select> 
                                    <hr></hr>                                       
                                    
                            </CardBody>
                         </Card>
                         {/* <div>
                             <CheckedBox handleFilters={filters => handleFilters(filters, "cities")}/>
                         </div> */}
                         {filterEmps.length === 0 ?
                         <React.Fragment>
                             <div style={{display:'flex', height:'300px', justifyContent:'center', alignItems:'center'}}>
                                 <h3>No Emps</h3>
                             </div>
                         </React.Fragment>
                         :
                         <React.Fragment>
                             <h2 style={{width:'100px', marginLeft:'350px',marginBottom:'30px'}}>Emps</h2>
                             <Table center>
                                 {filterEmps.map(({_id,name,address,city,salary,job_title,mobile})=>(
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
                        </React.Fragment>
                         }
                         {/* <div>
                         <Col>
                                    <Input type='checkbox' name='checkbox' id='checkbox' onClick={filterHandler} style={{width:'300px'}}>Chandigarh</Input>
                                    <Input type='checkbox' name='checkbox' id='checkbox' onClick={filterHandler} style={{width:'300px'}}>Delhi</Input>
                                    <Input type='checkbox' name='checkbox' id='checkbox' onClick={filterHandler} style={{width:'300px'}}>Noida</Input>
                                    <Input type='checkbox' name='checkbox' id='checkbox' onClick={filterHandler} style={{width:'300px'}}>Bangalore</Input>
                                    <Input type='checkbox' name='checkbox' id='checkbox' onClick={filterHandler} style={{width:'300px'}}>Mumbai</Input>
                                </Col>
                         </div> */}
                     </div>
                 </Container>
         )
     }
 }
const mapStateToProps = state =>({
     emp:state.emp,
     auth:state.auth    
 })
 export default connect(mapStateToProps,{getEmps})(Search);


