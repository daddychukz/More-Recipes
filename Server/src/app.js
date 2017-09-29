// bringing in dependencies
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes/index';


const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// connect all routes to application
app.use('/', routes);

const port = +process.env.PORT || 5000;
app.set('port', port);

// Turn on the server

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});

export default app;
