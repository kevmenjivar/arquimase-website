const base = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const headers = { apikey: key, Authorization: `Bearer ${key}` };
const read = req => new Promise((resolve, reject) => { const chunks = []; req.on('data', chunk => chunks.push(chunk)); req.on('end', () => resolve(Buffer.concat(chunks))); req.on('error', reject); });
module.exports = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const response = await fetch(`${base}/rest/v1/arquimase_site_settings?select=key,value`, { headers });
      if (!response.ok) return res.status(200).json({ settings: {} });
      const rows = await response.json();
      return res.status(200).json({ settings: Object.fromEntries(rows.map(row => [row.key, row.value])) });
    }
    if (req.method !== 'PUT') return res.status(405).json({ error: 'Método no permitido' });
    const body = req.body && !Buffer.isBuffer(req.body) ? req.body : JSON.parse((await read(req)).toString() || '{}');
    const rows = Object.entries(body.settings || {}).map(([key, value]) => ({ key, value }));
    const response = await fetch(`${base}/rest/v1/arquimase_site_settings`, { method: 'POST', headers: { ...headers, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates' }, body: JSON.stringify(rows) });
    if (!response.ok) throw Error('Primero ejecuta el archivo supabase-site-settings.sql en el SQL Editor de Supabase.');
    return res.status(200).json({ ok: true });
  } catch (error) { return res.status(400).json({ error: error.message }); }
};
module.exports.config = { api: { bodyParser: false } };
