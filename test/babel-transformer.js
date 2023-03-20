const config = require('../babel.config');

const { createTransformer } = require('babel-jest');

module.exports = require('babel-jest').default.createTransformer({
  ...config,
});
