import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import routes from './routes';

require('dotenv').config();

const app = express();
app.use(cors());

const swaggerDefinition = {
  info: {
    title: process.env.swaggerTitle,
    version: process.env.swaggerVersion,
    description: process.env.swaggerDescription,
    contact: {
      name: process.env.swaggerName,
      url: process.env.swaggerUrl,
      email: process.env.swaggerEmail
    },
  },
  host: process.env.swaggerHost,
  basePath: '/',
};

const options = {
  swaggerDefinition,
  apis: ['Server/dist/doc.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use(express.static('Client/dist/app'));
app.use(express.static('Client/src'));
app.use(express.static('Server/public'));

app.use('/api/v1/', routes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../Client/dist/index.html'));
});

const port = +process.env.PORT || 5000;
app.set('port', port);

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});

export default app;
