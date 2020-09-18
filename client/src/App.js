import React ,{useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store';
import {BrowserRouter as Router,Route,Link,Switch,NavLink,Redirect} from 'react-router-dom';
import {loadUser} from './actions/authActions';
import HeaderNavbar from './components/HeaderNavbar';
import RegisterForm from './components/auth/RegisterForm';
import LoginForm from './components/auth/LoginForm';
import Logout from './components/auth/Logout';
import Search from './components/Search';
import Home from './components/Home';
import CheckedBox from './components/CheckedBox';

function App(){
    return (
      <Provider store={store}>
        <div className="App">
          <HeaderNavbar/>
          <Router>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/RegisterForm' component={RegisterForm}/>
                <Route path='/LoginForm' component={LoginForm}/> 
                <Route path='/Search' component={Search} render={()=>
                  (
                    <React.Fragment>
                      <CheckedBox/>
                    </React.Fragment>
                  )
                }/>
                <Route path='/Logout' component={Logout} />
            </Switch>
          </Router>
        </div>
      </Provider>
    );
}

export default App;
