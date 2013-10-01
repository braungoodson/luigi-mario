luigi-mario
=====

Quick and easy class for defining your plumbing with express.io for HTTP.


Usage
=====

<pre>
var luigi = require('luigi');
luigi.plumbing({
	port: 10000,
	http: {
		get: {
			'/echo' : function (q,r) {
				return r.send({
					echo : 'GET /echo'
				});
			}
		},
		post: {
			'/echo' : function (q,r) {
				return r.send({
					echo : 'POST /echo'
				});
			}
		}
	}
});
</pre>
