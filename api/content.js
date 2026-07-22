// Ruta explícita para Vercel: evita cualquier ambigüedad del catch-all dinámico.
const handler = require('./[...path].js');

module.exports = (req, res) => {
  req.query = { ...(req.query || {}), path: ['content'] };
  return handler(req, res);
};

module.exports.config = { api: { bodyParser: false } };
