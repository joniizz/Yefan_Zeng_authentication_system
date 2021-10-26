
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar'; //import navbar
import Login from './views/auth/Login'; // new 
import Signup from './views/auth/Signup'; // new
import Logout from './views/auth/Logout'; // New

//placed the Router and Switch components that were imported into the App div.
// Route exact: only this view should be rendered at the specific route
const App = () =>{
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/login' component={Login} exact />
          <Route path='/signup' component={Signup} exact />
          <Route path='/logout' component={Logout} exact />
        </Switch>
      </Router>
  </div>
  );
};

export default App;
