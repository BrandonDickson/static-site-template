import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import Helmet from 'react-helmet'

const Home = () =>
  <div>
    <Helmet title="Home Page" />
    <h1>Welcome to home page</h1>
  </div>

const Hello = () =>
  <div>
    <Helmet title="Hello Page" />
    <h1>Welcome to hello page</h1>
  </div>

const World = () =>
  <div>
    <Helmet title="World Page" />
    <h1>Welcome to world page</h1>
  </div>

export default (
  <Router history={ browserHistory }>
    <Route path="/" component={ Home } />
    <Route path="/hello/" component={ Hello } />
    <Route path="/world/" component={ World } />
  </Router>
)
