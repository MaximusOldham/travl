var _ = require('lodash');

var localEnvVars = {
  TITLE:      'travl',
  SAFE_TITLE: 'travl'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
