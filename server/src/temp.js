(async () => {
  const templateHelper = require('./helpers/template-helper')
  const templates = await templateHelper.getTemplates()
  console.log(JSON.stringify(templates))
  for(const temp of templates){
    console.log(await templateHelper.getTemplate(temp))
  }
})()