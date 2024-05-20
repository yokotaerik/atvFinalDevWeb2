import express from 'express'

import { Request, Response } from 'express';
import { routes } from './routes';
import cors from 'cors'

const app = express();


app.use(express.json())
app.use(cors())
app.set("view engine", "ejs");


app.use(routes)


app.listen(3333, () => 'backend rodando na 3333')