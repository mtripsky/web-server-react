import express from 'express'; 
import apiRouter from './server/routes';
import bodyParser from 'body-parser';

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(apiRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
