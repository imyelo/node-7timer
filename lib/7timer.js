var addressGPS = require('address-gps');
var request = require('request');

var PRODUCTS = ['astro', 'civil', 'civillight', 'meteo', 'two'];

var base = function (lon, lat, product, callback) {
  if (typeof callback === 'undefined') {
    callback = product;
    product = '';
  }
  product = (product = PRODUCTS.indexOf(product.toLowerCase())) > -1 ? PRODUCTS[product] : 'astro';
  var url = 'http://www.7timer.com/v4/bin/api.pl?' + [
    'lon=' + lon, 'lat=' + lat, 'product=' + product, 'output=' + 'json'
    ].join('&');
  request.get(url, callback);
};

var byAddress = function (address, product, callback) {
  addressGPS.getGPS(address, function (location) {
    console.log('Address:' + location.prettyAddress);
    base(location.longitude, location.latitude, product, callback);
  });
};


byAddress('shenzhen', function (err, res, body) {
  if (err) {
    return console.error(err);
  }
  console.log(body);
});