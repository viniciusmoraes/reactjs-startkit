import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Component } from "react";

// Components
import Account from "../pages/account";
import Home from "../pages/home";
import JobDetails from "../pages/job-details";
import Payment from "../pages/payment";
import Perfil from "../pages/perfil";
import Search from "../pages/search";

// Auth
import ForgotPassword from "../pages/auth/forgot-password";
import SignIn from "../pages/auth/sign-in";
import SignUp from "../pages/auth/sign-up";

//import { createBrowserHistory } from "history";
//import RouteAuth from "./authenticatedRoute";
//const hashHistory = createBrowserHistory();

class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/conta" component={Account}  />
                    <Route path="/home" component={Home}  />
                    <Route path="/job" component={JobDetails}  />
                    <Route path="/pagamento" component={Payment}  />
                    <Route path="/perfil" component={Perfil}  />
                    <Route path="/busca" component={Search}  />

                    <Route path="/esqueceu-sua-senha" component={ForgotPassword}  />
                    <Route path="/login" component={SignIn}  />
                    <Route path="/registrar" component={SignUp}  />
                    <Route path="/" component={SignIn}  />
                </Switch>
            </Router>
        );
    }
}

export default Routes;


