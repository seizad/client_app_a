var jsonServer = require('json-server')
var server = jsonServer.create()
var router = jsonServer.router('api/db.json')
var middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/api/echo', function (req, res) {
  res.jsonp(req.query)
})

server.get('/api/tasks', function (req, res, next) {
	console.log("/jobs was called...")
	console.log(req.route.path)
	if(req.query['interval']) {
		req.url = '/api/tasksSliced'
	}
	next()
})

server.use(function (req, res, next) {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// Use default router
// var rewriter = jsonServer.rewriter('api/routes.json')
// server.use(rewriter)
server.use('/api', router)
server.listen(5000, function () {
  console.log('JSON Server is running')
})