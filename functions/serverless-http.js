import serverless from 'serverless-http'
import koaApp from '../src/app'

// We need to define our function name for koa routes to set the correct base path
const functionName = 'serverless-http'

// Initialize koa app
const app = koaApp(functionName)

// Export lambda handler
exports.handler = serverless(app)