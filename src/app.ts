import {db} from "./dbloaders/dbConnect";
import routes from "./api";
import {Request, Response} from "express";
import config from "./config/config";
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

async function startServer() {
    const app = express();
    const port = config.port;

    app.get('/', (req: Request, res: Response) => {
        res.send('Express + TypeScript Server');
    });
    // app.use( (req, res, next) => {
    //     res.header('Access-Control-Allow-Origin', '*');
    //     res.header(
    //         'Access-Control-Allow-Headers',
    //         'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    //     );
    //
    //     if ( req.method === 'OPTIONS' ) {
    //         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    //         return res.status(200).json({});
    //     }
    //
    //     next();
    // });


    await db();

    app.use(bodyParser.json())
    app.use(routes());

    return app.listen(config.port, () => {
        console.info(`
       Starting fq-banenportaal-api
      
       Server listening on port: ${config.port}
      
    `);
    }).on('error', (err: Error) => {
        console.error(err.message, { metadata: err });
        process.exit(1);
    });
}

startServer()
    .then(() => {
        console.info("Server start complete");
    })
    .catch((err) => {
        console.error(`Server start failed because ${err.stack}`);
    });
