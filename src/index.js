import React from 'react'
import { RouterContext, match } from 'react-router'
import { render } from 'react-dom'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import Helmet from 'react-helmet'
import routes from './routes'

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
    else if (props) {
      const head = Helmet.rewind()
      const html = `
          <html>
            <head>
              ${ head.title.toString() }
            </head>
            <body>
              <div id="root">
                ${ renderToString(<RouterContext {...props} />) }
              </div>
              <script type="text/javascript" src="index.js" />
            </body>
          </html>
        `
      next(null, html)
    }
    else next(new Error(`Unable to resolve route ${ locals.path }`))
  })
