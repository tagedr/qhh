import _ from 'lodash';
import dotenv from 'dotenv';
import Knex from 'knex';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import promiseRouter from 'express-promise-router';
import knexConfig from '../knexfile';
import registerGet from './routes/apiGet';
import registerPost from './routes/apiPost';
import fs from 'fs';
import cors from 'cors';
import { Model } from 'objection';
import https from 'https';
import session from 'express-session';

dotenv.config();

const SERVER_PORT = process.env.BACK_PORT || 3102;
const knex = Knex(knexConfig.production);

Model.knex(knex); 

var corsOptions = {
    origin: true,
    credentials: true
}

const router = promiseRouter();
const app = express()
    .use(cors(corsOptions))
    .use(function (req, res, next) {
        console.log(req.headers.origin);
        next();
    })
    .set('trust proxy', 1)
    .use(express.static(__dirname + '/public/'))
    .use(morgan('dev'))
    .use(bodyParser.json())
    .use(session({
        secret: 'asdasvcxz',
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: false, // key
            secure: true,
            maxAge: 600000
        }
    }))
    .use(function (req, res, next) {

        req.session.views = (req.session.views || 0) + 1;
        console.log("session.id: " + req.session.id);
        console.log("session.views: " + req.session.views);
        console.log("session.login: " + req.session.login);
        const url = req.originalUrl.toString().trim();
        console.log("session.url: " + url);

        next();
        // if (url === '/' || url === '/login' || url === '/logout') {
        //     next();
        //     return;
        // }
        // if (!req.session || !req.session.login) {
        //     res.sendStatus(401);
        //     return;
        // }
    })
    .use(router)
    .set('json spaces', 2);

registerPost(router);
registerGet(router);


app.use((err, req, res, next) => {
    if (err) {
        res.status(err.statusCode || err.status || 500).send(err.data || err.message || {});
    } else {
        next();
    }
});

const server = https.createServer({
    key: fs.readFileSync(process.env.CERT_KEY_FILE),
    cert: fs.readFileSync(process.env.CERT_FILE)
}, app).listen(SERVER_PORT, () => {
    console.log('qhh-back listening at port %s', server.address().port);
});

// const server = app.listen(SERVER_PORT, () => {
//     console.log('qhh-back listening at port %s', server.address().port);
// });
