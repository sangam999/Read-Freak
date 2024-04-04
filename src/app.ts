import { db } from "./dbloaders/dbConnect";
import routes from "./api";
import { Request, Response } from "express";
import config from "./config/config";
import userRoutes from "./api/routes/userRoutes";
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

dotenv.config();

async function startServer() {
    const app = express();

    const port = config.port;

    app.get('/', (req: Request, res: Response) => {
        res.send('Express + TypeScript Server');
    });

    // Use cookie-parser middleware
    app.use(cookieParser());
    //app.use('/api/v1', userRoutes);


    app.get('/', (req: Request, res: Response) => {
        res.send('Hello, how are you?');
    });

// Error handling middleware
    app.use((err: Error, req: Request, res: Response, next: Function) => {
        console.error(err.stack);
        res.status(500).send('Something went wrong.');
    });




    app.get('/', (req: Request, res: Response) => {
        res.send('Hello, how are you?');
    });

// Error handling middleware
    app.use((err: Error, req: Request, res: Response, next: Function) => {
        console.error(err.stack);
        res.status(500).send('Something went wrong.');
    });

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
