const serverless = require('serverless-http');

import app from "./app";

// We need to define our function name for koa routes to set the correct base path
const functionName = 'serverless-http'

// Initialize koa app
const KoaApp = app(functionName)

// Export lambda handler
exports.handler = serverless(KoaApp)