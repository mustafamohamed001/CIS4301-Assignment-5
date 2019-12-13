import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from "./views/Login/Login"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import ViewFlowers from "./components/ViewFlowers"
import ViewEdit from "./components/ViewEdit"
import signout from "./components/signout"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/">
          <Redirect to="/listflowers" />
        </Route>
        <Route exact path="/listflowers" component={ViewFlowers} />
        <Route exact path="/viewedit/:id" component={ViewEdit} />
        <Route exact path="/signout" component={signout} />
        <Route component={NotFound}/>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
