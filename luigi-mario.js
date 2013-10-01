module.exports = {
	server: null,
	port: null,
	debug: null,
	parsePosts: function (posts) {
		for (var p in posts) {
			if (this.debug) {
				console.log('http://localhost:'+this.port+p+' -> '+posts[p]);
			}
			this.server.post(p,posts[p]);
		}
	},
	parseGets: function (gets) {
		for (var g in gets) {
			if (this.debug) {
				console.log('http://localhost:'+this.port+g+' -> '+gets[g]);
			}
			this.server.get(g,gets[g]);
		}
	},
	parseRoutes: function(routes) {
		if (routes.http) {
			if (routes.http.get) {
				this.parseGets(routes.http.get);
			}
			if (routes.http.post) {
				this.parsePosts(routes.http.post);
			}
		}
	},
	plumbing: function (routes) {
		if (routes.port) {
			this.port = routes.port;
		} else {
			this.port = 10000;
		}
		if (routes.debug) {
			this.debug = routes.debug;
		} else {
			this.debug = false;
		}
		this.server = require('express.io')();
		this.server.http();
		this.server.listen(this.port);
		this.parseRoutes(routes);
		return this;
	}
}

/*

	Usage:

	var luigi = module.exports;//require('luigi-mario');
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
	
*/