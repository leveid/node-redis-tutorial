
/*=================================
=            server.js            =
=================================*/

var redis  = require('redis');
var client = redis.createClient(6379, "127.0.0.1");

client.on('connect', function() {
	console.log('connected to redis');


	/*========================================
	=            redis data types            =
	========================================*/

	// store a simple key-value pair
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

	// store a list called 'languages'
	client.rpush(['languages', 'english', 'french', 'hindi'], function (err, reply) {
		if(err) {
			console.log(err);
			return;
		}

		console.log(reply);
	});

	// retrieve the list we just stored
	// pass -1 as the 3rd argument if you want to print the full list
	client.lrange('languages', 0, 3, function (err, reply) {
		if(err) {
			console.log(err);
			return;
		}

		console.log(reply);
	});

	// store a set (a list without duplicates)
	client.sadd(['tags', 'angularjs', 'backbone', 'ember'], function (err, reply) {
		if(err) {
			console.log(err);
			return;
		}

		console.log(reply);
	});

	// retrieve th set we just stored
	client.smembers('tags', function (err, reply) {
	    if(err) {
			console.log(err);
			return;
		}

		console.log(reply);
	});

	/*=====  End of redis data types  ======*/


	/*=========================================
	=            redis opeerations            =
	=========================================*/

	// check if a key exists
	client.exists('framework', function (err, reply) {
	    if(err) {
			console.log(err);
			return;
		}

		if (reply === 1) console.log('key exists');
		else console.log('key does not exist');
	});

	// delete a key
	client.del('zoot', function (err, reply) {
	    if(err) {
			console.log(err);
			return;
		}

		console.log(reply);
	});

	// expire a key after 30sec
	client.set('framework', 30);

	// increment a key
	client.set('key1', 10, function (err, reply) {
		if(err) {
			console.log(err);
			return;
		}

		console.log(reply);

		// increment by 1
		client.incr('key1', function (err, reply) {
			if(err) {
				console.log(err);
				return;
			}

			console.log(reply);
		});

		// increment by whatever you want
		client.incrby('key1', 10,  function (err, reply) {
			if(err) {
				console.log(err);
				return;
			}

			console.log(reply);
		});

		// similalry there is decr() and decrby()
	});


	/*=====  End of redis opeerations  ======*/



});
