import { hot } from 'react-hot-loader'
import React from 'react'
import MainRouter from './MainRouter'
import Home from './core/Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Home} />
            </Switch>
        </Router>
    )
}

export default hot(module)(App)