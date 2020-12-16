import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "semantic-ui-css/semantic.min.css"
import { Container } from "semantic-ui-react"

import './App.css'
import Navbar from "./components/Navbar"
import Home from "./components/pages/Home.page"
import Login from "./components/pages/Login.page"
import Register from "./components/pages/Register.page"


export default function App() {
    return (
        <div>
            <Container >
                <Router>
                    <Navbar />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/register' component={Register} />
                        <Route render={() => <h1>404: page not found</h1>} />
                    </Switch>
                </Router>
            </Container>
        </div>
    )
}