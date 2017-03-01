import React from 'react'
import { Router, Route, RouterContext, browserHistory, match } from 'react-router'
import { render } from 'react-dom'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'

const Home = () =>
  <h1>Welcome to home page</h1>

const Hello = () =>
  <h1>Welcome to hello page</h1>

const World = () =>
  <h1>Welcome to world page</h1>

const routes =
  <Router history={ browserHistory }>
    <Route path="/" component={ Home } />
    <Route path="/hello/" component={ Hello } />
    <Route path="/world/" component={ World } />
  </Router>

if (typeof document !== "undefined") {

  // do client side mounting
  render(routes, document.getElementById('root'))

}

export default (locals, next) =>
  match({
    routes,
    location: locals.path
  }, (error, redirectLocation, props) => {
    if (error)
      next(error)
    else if (redirectLocation)
      next(new Error("Static rendering cannot handle redirects..."))
    else if (props)
      next(null, renderToStaticMarkup(
          <html>
            <head>
            </head>
            <body>
              <div id="root" dangerouslySetInnerHTML={{ __html: renderToString(<RouterContext {...props} />) }} />
              <script type="text/javascript" src="index.js" />
            </body>
          </html>
        )
      )
    else next(new Error(`Unable to resolve route ${ locals.path }`))
  })
