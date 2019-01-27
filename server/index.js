const tg = require('./template-generator')
const bodyParser = require('body-parser')
const sqlGenerator = require('./sql-generator')
const templateHelper = require('./template-helper')
const express = require('express')
const app = express()
const port = 3000

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