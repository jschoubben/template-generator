const appInsights = require("applicationinsights");
const tg = require('./template-generator')
const bodyParser = require('body-parser')
const sqlGenerator = require('./sql-generator')
const templateHelper = require('./template-helper')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

if(typeof APPINSIGHTS_INSTRUMENTATIONKEY !== 'undefined'){
    appInsights.setup(APPINSIGHTS_INSTRUMENTATIONKEY)
} else {
    appInsights.setup('65e1bad5-98a5-482d-b620-fd48bbc15674')
}
appInsights.start()

app.use('/', express.static('./client/public'));

app.use(bodyParser.json())
app.post('/api/parse', async (req, res) => {
    const result = await sqlGenerator.generateSQLTemplate(req.body.template, req.body.model, req.body.customValues)
    res.send({data: result})
})
app.get('/api/templates', async (req, res) => {
    const result = await templateHelper.getTemplates('./server/templates/')
    res.send({data: result})
})

app.get('/api/template', async (req, res) => {
    const result = await templateHelper.getTemplate('./server/templates/' + req.query.template)
    res.send({data: result})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))