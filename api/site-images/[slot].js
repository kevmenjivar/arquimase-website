const handler = require('../[...path].js');
module.exports = (req, res) => { req.query = { ...(req.query || {}), path: ['site-images', req.query.slot] }; return handler(req, res); };
module.exports.config = { api: { bodyParser: false } };
