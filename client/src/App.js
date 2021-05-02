import './App.css';
import React, {Fragment} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Donate }  from './components/layout/Donate';
import { Footer } from './components/layout/Footer';
import { Home } from './components/layout/Home';
import { Navbar } from './components/layout/Navbar';

const App = () => 
<Router>
  <Fragment>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/donate" component={Donate}/>
    </Switch>
    <Footer />
  </Fragment>
</Router>

export default App;
