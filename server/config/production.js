module.exports = {
  allowedOrigins: [
    'http://template-generator.azurewebsites.net',
    'https://template-generator.azurewebsites.net',
    'http://' + process.env.MY_IP
  ]
}