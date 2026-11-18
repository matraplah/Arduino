CREATE TABLE "pelajar" (
	"id" text PRIMARY KEY,
	"ic" text NOT NULL,
	"nama" text NOT NULL,
	"kelas" text NOT NULL,
	"didaftar" bigint NOT NULL,
	"jaw" jsonb DEFAULT '{}' NOT NULL,
	"streak" jsonb DEFAULT '{"now":0,"best":0}' NOT NULL,
	"lencana" jsonb DEFAULT '[]' NOT NULL,
	"jumlah" integer DEFAULT 0 NOT NULL,
	"peratus_markah" integer DEFAULT 0 NOT NULL,
	"kemajuan" integer DEFAULT 0 NOT NULL,
	"bab_tamat" integer DEFAULT 0 NOT NULL,
	"kemaskini" bigint
);
--> statement-breakpoint
CREATE TABLE "sesi" (
	"token" text PRIMARY KEY,
	"jenis" text NOT NULL,
	"pelajar_id" text,
	"tamat" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tetapan" (
	"kunci" text PRIMARY KEY,
	"nilai" jsonb NOT NULL
);
--> statement-breakpoint
CREATE INDEX "pelajar_kelas_idx" ON "pelajar" ("kelas");