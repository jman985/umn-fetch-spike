const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const widgetRouter = require('./routes/widget.router')
const ReactDOMServer = require('react-dom/server');
const HtmlToReactParser = require('html-to-react').Parser;
 
const htmlInput = '<div><h1>Title</h1><p>A paragraph</p></div>';
const htmlToReactParser = new HtmlToReactParser();
const reactElement = htmlToReactParser.parse(htmlInput);
const reactHtml = ReactDOMServer.renderToStaticMarkup(reactElement);


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// ROUTES
app.use('/api/tweets', widgetRouter)

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
  console.log('this is react elements', reactElement);

});
