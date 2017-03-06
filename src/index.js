import React from 'react'
import { RouterContext, match } from 'react-router'
import { render } from 'react-dom'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { AppContainer } from 'react-hot-loader'
import Helmet from 'react-helmet'
import App from './components/App'
import routes from './routes'

if (typeof document !== "undefined") {

  const renderApp = (Component) =>
    render(
      <AppContainer>
        <Component />
      </AppContainer>
      , document.getElementById('root')
    )

  // do client side mounting
  renderApp(App);

  // Hot Module Replacement API
  if (module.hot) {
    module.hot.accept('./components/App', () => renderApp(App))
  }

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
    else if (props) {
      const head = Helmet.rewind()
      const html = `
          <html>
            <head>
              ${ head.title.toString() }
            </head>
            <body>
              <div id="root">${ renderToString(<RouterContext {...props} />) }</div>
              <script type="text/javascript" src="hmr.js"></script>
              <script type="text/javascript" src="main.js"></script>
            </body>
          </html>
        `
      next(null, html)
    }
    else next(new Error(`Unable to resolve route ${ locals.path }`))
  })
