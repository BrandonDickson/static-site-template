import React from 'react'
import ReactDOMServer from 'react-dom/server'

const App = ({ greet, path }) =>
  <div>
    <h1>{ `${greet} from ${path}` }</h1>
  </div>


export default locals =>
  `
  <html>
    <head>
    </head>
    <body>
      ${ ReactDOMServer.renderToString(<App {...locals} />) }
    </body>
  </html>
  `
