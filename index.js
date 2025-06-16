import path from 'path';
import express from "express";
import getState from "./getState.js";
import {setState, verifyState} from "./setState.js";


const app = express()
const port = 1111

app.use(express.json())

app.use(express.static(path.join(import.meta.dirname, './node_modules/expense-ratio-split/dist')))

app.post('/state', async (req, res) => {
    try {
        const isValidReq = verifyState(req.body);
        if (isValidReq) {
            await setState(req.body);
            res.status(200).send({success: true});
        } else {
            res.status(400).send({success: false, reason: "Invalid state"})
        }
    } catch (e) {
        console.error(e);
        res.status(500).send({success: false, reason: "Internal Server Error"})
    }
})

app.get('/state', (req, res) => {
    res.contentType("application/json");
    res.send(getState());
})

app.get('/', (req, res) => {
    res.sendFile(path.join(import.meta.dirname, "./node_modules/expense-ratio-split/dist/index.html"))
})


app.listen(port, () => {
    console.log(`Expense ratio split listening on port ${port}`)
})