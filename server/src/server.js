const appInsights = require("applicationinsights")
if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
    appInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY)
    appInsights.start()
}

const bodyParser = require('body-parser')
const sqlGenerator = require('./generators/sql-generator')
const templateHelper = require('./helpers/template-helper')
const express = require('express')
var morgan = require('morgan')
var winston = require('../config/winston')
winston.log('test')
const app = express()
const port = process.env.PORT || 3000
const config = require(`../config/${process.env.NODE_ENV}.js`)

app.use(morgan('combined', {
    stream: winston.stream
}))

app.use(bodyParser.json())

app.use(function (req, res, next) {
    const origin = req.headers.origin;
    if (config.allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    //res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post('/api/parse', async (req, res) => {
    const result = await sqlGenerator.generateSQLTemplate(req.body.template, req.body.model, req.body.customValues)
    res.send({
        data: result
    })
})
app.get('/api/templates', async (req, res) => {
    const result = await templateHelper.getTemplates('./templates/')
    res.send({
        data: result
    })
})

app.get('/api/template', async (req, res) => {
    const result = await templateHelper.getTemplate('./templates/' + req.query.template)
    res.send({
        data: result
    })
})
process.on('uncaughtException', function (error) {
    winston.error(reason)
})
process.on('unhandledRejection', function (reason, p) {
    winston.error(reason)
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))