const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@': 'src',
    '@img': 'src/assets/images'
  })(config);

  return config;
};