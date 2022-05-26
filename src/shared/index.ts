import SERVER_ENV from './server.config';

var environment = process.env.NODE_ENV || 'development';

var serverConf = SERVER_ENV[environment];

export {
    environment,
    serverConf,
};