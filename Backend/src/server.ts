import 'reflect-metadata';
import './controllers'
import { InversifyExpressServer } from 'inversify-express-utils';
import express from 'express';
import config from 'config';
import { connection } from './db';
import container from './inversify config/inversify.config';

const server = new InversifyExpressServer(container);

server.setConfig(app=>{
    app.use(express.json());
})

const app = server.build();
const port = config.get("PORT") || 3000;
app.listen(port, ()=>{
    console.log(`Server is connected on ${port}!!`);
    connection().then(()=>{console.log('Database is Connected!!')}).catch((err:any)=>console.log(`error while connecting to database : ${err.message}`));
})