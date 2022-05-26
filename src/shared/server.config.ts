const SERVER_ENV = {
    production: {
      SERVER_PORT: process.env.PORT || 9000,
    },
    preproduction: {
      SERVER_PORT: 9000,
    },
    development: {
      SERVER_PORT: 9000,
    },
  };
  
  export default SERVER_ENV;