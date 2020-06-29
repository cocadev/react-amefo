import React from "react";
import Header from "./App/components/Header/header.component";
import Footer from "./App/components/Footer/footer.component";
import Profile from "./App/components/Profile/profile.component";
import Home from "./App/components/Home/home.component";
import Login from "./App/components/Login/login.component";

import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App/styles/main.scss";

function App() {
  return (
    <div>
      <Header />
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
