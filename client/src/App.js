
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar'; //import navbar
//placed the Router and Switch components that were imported into the App div.
const App = () =>{
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Switch>

        </Switch>
      </Router>
  </div>
  );
};

export default App;
