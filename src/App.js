import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const userContext  = createContext();

function App() {
  
  const [loggedInUser,setLoggedInUser] = useState({});//a state for logged in user - whether the user is logged in or not
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
        {/* <Header></Header>
        <Shop></Shop> */}

      
      <Router>
      <Header></Header>
        <Switch>
            <Route path="/shop">
                <Shop></Shop>
            </Route>
            <Route path="/review">
                <Review></Review>
            </Route>
            <PrivateRoute path="/inventory">
              <Inventory></Inventory>
            </PrivateRoute>
            <Route path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute path="/shipment">
              <Shipment></Shipment>
            </PrivateRoute>
            <Route exact path="/">
              {/* when there will be no path, it will take to the shop page */}
                <Shop></Shop>
            </Route>
            <Route path="/product/:productKey"> 
            {/* /:something  --> will work on the dynamic value like key */}
                <ProductDetail></ProductDetail>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
        </Switch>
      </Router>
    
    </userContext.Provider>
  );
}

export default App;
