import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import LandingPage from './pages/LandingPage.jsx';
import DetailProduct from './pages/DetailProduct.jsx';
import './supports/stylesheets/Utilities.css';
import './supports/stylesheets/Components.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route path='/detail-product/:idProduct' component={DetailProduct} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
