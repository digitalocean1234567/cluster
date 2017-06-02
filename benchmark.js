
var siege = require('siege');
siege()
  .on(3000)
  .concurrent(10000)
  .get('/')
  .attack()