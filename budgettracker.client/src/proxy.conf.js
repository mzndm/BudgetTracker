const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7168';

const PROXY_CONFIG = [
  {
    context: ['/auth'],
    target,
    secure: false,
    pathRewrite: {
      "^/auth": "",
    },
  },
  {
    context: ['/api'],
    target,
    secure: false
  }
]

module.exports = PROXY_CONFIG;
