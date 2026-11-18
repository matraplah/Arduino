// Fungsi Netlify: /api/* -> logik dalam teras.mjs, data dalam Netlify Blobs (stor "fizik-spm").
import { getStore } from '@netlify/blobs';
import { kendali } from './teras.mjs';
import KUNCI from './kunci.json' with { type: 'json' };

export default async (req, context) => {
  if (req.method !== 'POST') return Response.json({ ok: false, salah: 'Gunakan POST.' }, { status: 405 });
  const blob = getStore({ name: 'fizik-spm', consistency: 'strong' });
  const S = {
    get: k => blob.get(k, { type: 'json' }),
    set: (k, v) => blob.setJSON(k, v),
    del: k => blob.delete(k),
    keys: async prefix => { const { blobs } = await blob.list({ prefix }); return blobs.map(b => b.key); }
  };
  let body = {};
  try { body = await req.json(); } catch (e) { body = {}; }
  const laluan = new URL(req.url).pathname.replace(/^\/api\//, '').replace(/\/+$/, '');
  try {
    const r = await kendali(laluan, body, { S, KUNCI, env: { GURU_KATA_LALUAN: Netlify.env.get('GURU_KATA_LALUAN') || '' }, ip: context.ip });
    return Response.json(r.data, { status: r.status, headers: { 'cache-control': 'no-store' } });
  } catch (e) {
    console.error(e);
    return Response.json({ ok: false, salah: 'Ralat pelayan. Cuba lagi sebentar.' }, { status: 500 });
  }
};

export const config = { path: '/api/*' };
