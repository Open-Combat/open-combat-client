/* Test server that runs a basic express server */
const open = require('open');
const express = require('express')
const app = express()
const port = 3000

app.use(express.static('.'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
    open('http://localhost:3000')
})