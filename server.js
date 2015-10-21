
/*=================================
=            server.js            =
=================================*/

var redis  = require('redis');
var client = redis.createClient(6379, "127.0.0.1");

client.on('connect', function() {
	console.log('connected to redis');

	// set a simple key-value pair
	client.set('framework', 'AngularJS', function (err, reply) {
		if(err) {
			console.log(err);
			return;
		}

		console.log(reply);
	});

	// retrieve the value for the key we just stored
	client.get('framework', function(err, reply) {
		if(err) {
			console.log(err);
			return;
		}

		console.log(reply);
	});

	// store hash
	client.hmset('frameworks', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express');

	// retrieve the object for the hash we just stored
	client.hgetall('frameworks', function (err, object) {
		if(err) {
			console.log(err);
			return;
		}

		console.log(object);
	});

	// and another way to store hash
	client.hmset('songs', {
		'bridge over troubled water': 'simon and garfunkel',
		'stairway to heaven': 'led zeppelin'
	});

	// retrieve the object for the hash we just stored
	client.hgetall('songs', function (err, object) {
		if(err) {
			console.log(err);
			return;
		}

		console.log(object);
	});

	// storing lists

});
