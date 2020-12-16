import React from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"
import "semantic-ui-css/semantic.min.css"

import './App.css'
import Home from "./components/pages/Home.page"
import Login from "./components/pages/Login.page"
import Register from "./components/pages/Register.page"


export default function App(){
    return(
        <div>
            <Router>
                <Route exact path='/' component={Home}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
            </Router>
        </div>
    )
}