import { pgTable, text, integer, bigint, jsonb, index } from "drizzle-orm/pg-core";

/* Rekod murid. id = cincangan SHA-256 no. IC (sama seperti klien). */
export const pelajar = pgTable(
  "pelajar",
  {
    id: text().primaryKey(),
    ic: text().notNull(),
    nama: text().notNull(),
    kelas: text().notNull(),
    didaftar: bigint({ mode: "number" }).notNull(),
    jaw: jsonb().notNull().default({}),
    streak: jsonb().notNull().default({ now: 0, best: 0 }),
    lencana: jsonb().notNull().default([]),
    jumlah: integer().notNull().default(0),
    peratusMarkah: integer("peratus_markah").notNull().default(0),
    kemajuan: integer().notNull().default(0),
    babTamat: integer("bab_tamat").notNull().default(0),
    kemaskini: bigint({ mode: "number" }),
  },
  (t) => [index("pelajar_kelas_idx").on(t.kelas)]
);

/* Token sesi murid dan guru. */
export const sesi = pgTable("sesi", {
  token: text().primaryKey(),
  jenis: text().notNull(), // 'murid' | 'guru'
  pelajarId: text("pelajar_id"),
  tamat: bigint({ mode: "number" }).notNull(),
});

/* Tetapan umum, cth. cincangan kata laluan guru selepas ditukar. */
export const tetapan = pgTable("tetapan", {
  kunci: text().primaryKey(),
  nilai: jsonb().notNull(),
});
