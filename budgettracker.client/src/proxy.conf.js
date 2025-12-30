require('dotenv').config();
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7168';
// const target = 'https://money-api.mzndm.top';

const PROXY_CONFIG = [
  {
    context: ['/auth'],
    target,
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
    headers: {
      "CF-Access-Client-Id": env.CLOUDFLARE_CLIENT_ID || process.env.CLOUDFLARE_CLIENT_ID,
      "CF-Access-Client-Secret": env.CLOUDFLARE_CLIENT_SECRET || process.env.CLOUDFLARE_CLIENT_SECRET,
    },
    pathRewrite: {
      "^/auth": "",
    },
    onError: (err, req, res) => {
      console.error('Proxy error:', err.message);
      console.error('Make sure the backend server is running at:', target);
    },
  },
  {
    context: ['/api'],
    target,
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
    onError: (err, req, res) => {
      console.error('Proxy error:', err.message);
      console.error('Make sure the backend server is running at:', target);
    },
  }
]

module.exports = PROXY_CONFIG;
