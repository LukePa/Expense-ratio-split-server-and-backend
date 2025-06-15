const path = require('path');
const express = require('express')

const app = express()
const port = 1111

app.use(express.static(path.join(__dirname, './node_modules/expense-ratio-split/dist')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./node_modules/expense-ratio-split/dist/index.html"))
})

app.listen(port, () => {
    console.log(`Expense ratio split listening on port ${port}`)
})