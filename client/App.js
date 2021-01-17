import React from "react"
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import {BrowserRouter, Route, Switch} from "react-router-dom"

import './App.css'
import Navbar from "./components/Navbar.js"
import Footer from "./components/Footer.js"
import Home from "./components/paths/Home.path.js"
import Login from "./components/paths/Login.path.js"
import Register from "./components/paths/Register.path.js"
import Post from "./components/paths/Post.path.js"
import {AuthProvider} from "./context/auth.context.js"
import AuthRoute from "./components/util/AuthRoute.js"


export default function App() {
    return(
        <div className="app">
            <AuthProvider >
                <Container >
                    <BrowserRouter>
                        <Navbar />
                        <Switch >
                            <Route exact path="/" component={Home} />
                            <AuthRoute exact path="/login" component={Login} />
                            <AuthRoute exact path="/register" component={Register} />
                            <AuthRoute exact path="/posts/:postId" component={Post} /> 
                            <Route path="*" component={()=><h1>404 error, page not found</h1>} />
                        </Switch> 
                        <Footer /> 
                    </BrowserRouter>
                </Container>
            </AuthProvider>
        </div>
    )
}