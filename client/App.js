import React from "react"
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import {BrowserRouter, Route, Switch} from "react-router-dom"

import './App.css'
import Navbar from "./components/Navbar"
import Home from "./components/paths/Home.path"
import Login from "./components/paths/Login.path"
import Register from "./components/paths/Register.path"
import {AuthProvider} from "./context/auth.context"
import AuthRoute from "./components/util/AuthRoute"


export default function App() {
    return(
        <div>
            <AuthProvider >
                <Container >
                    <BrowserRouter>
                        <Navbar />
                        <Switch >
                            <Route exact path="/" component={Home} />
                            <AuthRoute exact path="/login" component={Login} />
                            <AuthRoute exact path="/register" component={Register} />
                        </Switch> 
                    </BrowserRouter>
                </Container>
            </AuthProvider>
        </div>
    )
}