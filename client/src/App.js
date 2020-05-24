import React from 'react';
import './App.css';
import Nav from './components/nav_bar';
import Login from './components/login';
import Register from './components/register';
import ProductList from './components/list_products';
import product_view from './components/view_product';
import myCart from './components/shopping_cart';
import Payment from './components/payment';
import Order from './components/my_orders';
import Product from './components/all_product';
import Users from './components/all_users';
import Category from './components/all_category';
import { BrowserRouter as Router , Switch , Route } from 'react-router-dom';

class App extends React.Component {

  componentDidMount() {
    document.body.style = 'background-color: #92a8d1';
  }

  render (){
    if(localStorage.getItem('email')){
      if(localStorage.getItem('type')==="admin"){
        return (
          <Router>
            <div className="App">
              <Nav />
              <Switch>
                <Route path="/usersList" component={ Users }></Route>
                <Route path="/category" component={ Category }></Route>
                <Route path="/product" component={ Product }></Route>
                <Route path="/productList" component={ ProductList }></Route>
                <Route path="/viewProduct" component={ product_view }></Route>
                <Route path="/" component={ ProductList }></Route>
              </Switch>
            </div>
          </Router>
        );
      }else if(localStorage.getItem('type')==="sm"){
        return (
          <Router>
            <div className="App">
              <Nav />
              <Switch>
                <Route path="/product" component={ Product }></Route>
                <Route path="/productList" component={ ProductList }></Route>
                <Route path="/viewProduct" component={ product_view }></Route>
                <Route path="/" component={ ProductList }></Route>
              </Switch>
            </div>
          </Router>
        );
      }else{
        return (
          <Router>
            <div className="App">
              <Nav />
              <Switch> 
                <Route path="/order" component={ Order }></Route>
                <Route path="/productList" component={ ProductList }></Route>
                <Route path="/viewProduct" component={ product_view }></Route>
                <Route path="/cart" component={ myCart }></Route>
                <Route path="/payment" component={ Payment }></Route>
                <Route path="/" component={ ProductList }></Route>
              </Switch>
            </div>
          </Router>
        );
      }
    }else{
      return (
        <Router>
          <div className="App">
            <Nav />
            <Switch>
              <Route path="/login" component={ Login }></Route>
              <Route path="/register" component={ Register }></Route>
              <Route path="/productList" component={ ProductList }></Route>
              <Route path="/viewProduct" component={ product_view }></Route>
              <Route path="/" component={ ProductList }></Route>
            </Switch>
          </div>
        </Router>
      );
    }
  }
}

export default App;
