var addressGPS = require('address-gps');
var request = require('request');
var artTemplate = require('art-template');
var template = require('template-cache');
var path = require('path');

var PRODUCTS = ['astro', 'civil', 'civillight', 'meteo', 'two'];

template.load(path.join(__dirname, './tpl'), {
  engine: artTemplate.compile
});

var base = function (lon, lat, product, callback) {
  if (typeof callback === 'undefined') {
    callback = product;
    product = '';
  }
  product = (product = PRODUCTS.indexOf(product.toLowerCase())) > -1 ? PRODUCTS[product] : 'astro';
  var url = 'http://www.7timer.com/v4/bin/api.pl?' + [
    'lon=' + lon, 'lat=' + lat, 'product=' + product, 'output=' + 'json'
    ].join('&');
  request.get(url, function (err, res, body) {
    callback(err, JSON.parse(body));
  });
};

var byAddress = function (address, product, callback) {
  addressGPS.getGPS(address, function (location) {
    console.log('Address: ' + location.prettyAddress);
    base(location.longitude, location.latitude, product, callback);
  });
};

var byMyIP = function (product, callback) {
  var url = 'http://ip-api.com/json';
  request.get(url, function (err, res, body) {
    var result;
    if (err) {
      return callback(err);
    }
    if (!body || !(result = JSON.parse(body))) {
      return callback(new Error('cannot get my ip'));
    }
    console.log('Address: ' + result.city + ', ' + result.regionName + ', ' + result.country);
    base(result.lon, result.lat, product, callback);
  });
};

// byAddress('shenzhen', function (err, data) {
//   if (err) {
//     return console.error(err);
//   }
//   console.log(template.require('astro')(data.dataseries[0]));
// });

console.time('by my ip');
byMyIP(function (err, data) {
  if (err) {
    return console.error(err);
  }
  console.log(template.require('astro')(data.dataseries[0]));
  console.timeEnd('by my ip');
});