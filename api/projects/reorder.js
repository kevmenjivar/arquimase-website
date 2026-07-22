const base = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const headers = { apikey: key, Authorization: `Bearer ${key}` };
const read = req => new Promise((resolve, reject) => { const chunks = []; req.on('data', chunk => chunks.push(chunk)); req.on('end', () => resolve(Buffer.concat(chunks))); req.on('error', reject); });

module.exports = async (req, res) => {
  try {
    if (req.method !== 'PUT') return res.status(405).json({ error: 'Método no permitido' });
    const body = req.body && !Buffer.isBuffer(req.body) ? req.body : JSON.parse((await read(req)).toString() || '{}');
    if (!Array.isArray(body.ids) || !body.ids.length) return res.status(400).json({ error: 'Orden de proyectos inválido' });
    for (let index = 0; index < body.ids.length; index++) {
      const response = await fetch(`${base}/rest/v1/arquimase_projects?id=eq.${body.ids[index]}`, {
        method: 'PATCH',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ created_at: new Date(Date.now() - index * 1000).toISOString() })
      });
      if (!response.ok) throw Error(await response.text());
    }
    return res.status(200).json({ ok: true });
  } catch (error) { return res.status(400).json({ error: error.message }); }
};
module.exports.config = { api: { bodyParser: false } };
