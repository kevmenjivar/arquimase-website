const handler = require('./[...path].js');
module.exports = (req, res) => { req.query = { ...(req.query || {}), path: ['clients'] }; return handler(req, res); };
module.exports.config = { api: { bodyParser: false } };
