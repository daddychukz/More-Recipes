// bringing in dependencies
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import routes from './routes/index';


const app = express();

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Chuks Recipes',
    version: '1.0.0',
    description: 'An Online Recipe management platform API Documentation',
    contact: {
      name: 'Durugo Chukwukadibia',
      url: 'https://chuks-recipes.herokuapp.com/api/v1',
      email: 'durugo_chuks@yahoo.com'
    },
  },
  host: 'localhost:5000',
  basePath: '/',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['Server/dist/doc.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve swagger
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use(express.static('Server/public'));

// connect all routes to application
app.use('/api/v1/', routes);

const port = +process.env.PORT || 5000;
app.set('port', port);

// Turn on the server

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});

export default app;
