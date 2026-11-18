// Jana kunci jawapan untuk pelayan (netlify/functions/kunci.json) daripada fail data dalam src/.
// Pelayan menggunakan kunci ini untuk menyemak jawapan dan mengira mata sendiri.
import { readFileSync, writeFileSync } from 'node:fs';
import vm from 'node:vm';

const src = new URL('../src/', import.meta.url);
const ctx = { BAB: [], SIMS: {} };
vm.createContext(ctx);
vm.runInContext('var BAB = this.BAB, SIMS = this.SIMS;', ctx);
for (const f of ['data-t4.js', 'data-t5.js', 'spm-t4.js', 'spm-t5.js']) {
  vm.runInContext(readFileSync(new URL(f, src), 'utf8').replace("'use strict';", ''), ctx, { filename: f });
}
const kunci = {};
for (const b of ctx.BAB) {
  const qs = (b.kuizTambah || []).concat(b.kuiz);
  kunci[b.id] = {
    ting: b.ting,
    q: qs.map(q => q.a),
    reka: b.reka ? { ok: b.reka.aspek.map(x => x.ok), jawapan: b.reka.jawapan, n: b.reka.opsyen.length } : null
  };
}
writeFileSync(new URL('../netlify/functions/kunci.json', import.meta.url), JSON.stringify(kunci));
console.log('kunci.json:', Object.keys(kunci).length, 'bab,', Object.values(kunci).reduce((n, k) => n + k.q.length, 0), 'soalan');
