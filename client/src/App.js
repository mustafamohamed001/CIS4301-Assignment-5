import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Login from "./views/Login/Login"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import ViewFlowers from "./components/ViewFlowers"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/">
          <Redirect to="/viewflowers" />
        </Route>
        <Route exact path="/viewflowers" component={ViewFlowers} />
        <Route component={NotFound}/>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
