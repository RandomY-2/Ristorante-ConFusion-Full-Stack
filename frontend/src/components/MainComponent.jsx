import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withRouter, Switch, Route } from 'react-router';

import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import AboutUs from "./AboutComponent";
import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";
import ContactUs from "./ContactComponent";
import Footer from "./FooterComponent";
import { Redirect } from 'react-router-dom';

const MainComponent = (props) => {
  return (
    <div>
      <Header />
      <TransitionGroup>
        <CSSTransition key={props.location.key} classNames="page" timeout={300}>
          <Switch>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/aboutus">
              <AboutUs />
            </Route>
            <Route exact path="/menu">
              <Menu />
            </Route>
            <Route exact path="/menu/:dishId">
              <DishDetail />
            </Route>
            <Route exact path="/contactus">
              <ContactUs />
            </Route>
            <Redirect to="/home" />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </div>
  )
}

export default withRouter(MainComponent);
