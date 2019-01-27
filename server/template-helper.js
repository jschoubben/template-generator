const { readdir, stat, readFile } = require("fs").promises
const { join } = require("path")

async function getTemplateDirectories(path) {
  let dirs = []
  for (const file of await readdir(path)) {
    console.log(file)
    if ((await stat(join(path, file))).isDirectory()) {
      dirs = [...dirs, file]
    }
  }
  return dirs
}

async function processTemplateDirectories(path, templateDirectories) {
  const results = []
  for(const dir of templateDirectories) {
    for (const file of await readdir(path + dir)) {
      console.log(file)
      results.push(dir + '/' + file)
    }
  }
  return results
}

async function getTemplates(path) {
  const templateDirectories = await getTemplateDirectories(path)
  return await processTemplateDirectories(path, templateDirectories)
}

async function getTemplate(template) {
  return await readFile(template, 'utf-8')
}

module.exports = {
  getTemplates: getTemplates,
  getTemplate: getTemplate
}