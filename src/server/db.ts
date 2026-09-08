import { Pool } from 'pg'

// Single shared connection pool for the whole server. Reused across server-fn
// invocations within the same serverless instance (cheaper than opening a new
// connection per request).
let pool: Pool | null = null

export function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL
    if (!connectionString) {
      throw new Error(
        'DATABASE_URL no está configurada en este entorno. Añádela en las variables ' +
          'de entorno del hosting (Replit Secrets y también en Stormkit, por separado) ' +
          'para que el panel de administración pueda leer y guardar contenido.',
      )
    }
    pool = new Pool({
      connectionString,
      // Most managed Postgres providers (Neon, Supabase, Replit's own DB) require
      // TLS but use a self-signed/short chain that Node rejects by default.
      ssl: connectionString.includes('sslmode=disable') ? false : { rejectUnauthorized: false },
      max: 3,
    })
  }
  return pool
}

let schemaReady: Promise<void> | null = null

// Idempotent — safe to call on every request. Only actually hits the DB the
// first time per serverless instance (cached in schemaReady).
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = getPool()
      .query(
        `CREATE TABLE IF NOT EXISTS site_content (
           key TEXT PRIMARY KEY,
           value JSONB NOT NULL,
           updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
         )`,
      )
      .then(() => undefined)
      .catch((err) => {
        // Don't cache a failed attempt — let the next request retry.
        schemaReady = null
        throw err
      })
  }
  return schemaReady
}
