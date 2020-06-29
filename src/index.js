import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./rootReducer";
import setAuthorizationToken from "./App/utils/setAuthorizationToken";
import jwtDecode from "jwt-decode";
import { setCurrentUser } from "./App/Auth/authActions";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./App/components/Home/home.component";
import Login from "./App/components/Login/login.component";
import Publish from "./App/components/Publish/publish.component";
import Search from "./App/components/Search/search.component";
import Product from "./App/components/Product/product.component";
import EditProduct from "./App/components/Product/edit-product.component";
import Profile from "./App/components/Profile/profile.component";
import FollowOrder from "./App/components/FollowOrder/followorder.component";
import Admin from "./App/components/Admin/admin.component";
import OrderForm from "./App/components/OrderForm/orderform.component";
import registerPage from "./App/components/Register/registerPage.component";
import "./App/styles/main.scss";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={registerPage} />
      <Route path="/publish" component={Publish} />
      <Route path="/product" component={Product} />
      <Route path="/edit-product" component={EditProduct} />
      <Route path="/search" component={Search} />
      <Route path="/profile" component={Profile} />
      <Route path="/admpanel" component={Admin} />
      <Route path="/order-form" component={OrderForm} />
      <Route path="/seguimiento" component={FollowOrder} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
