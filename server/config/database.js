var mongoose = require('mongoose');

var dbUri = process.env.MONGOLAB_URI;

mongoose.connect(dbUri);

mongoose.connection.on('connected', function() {
  console.log('Mongodb connected to ' + dbUri);
});

module.exports = mongoose;
