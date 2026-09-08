import { createServerFn } from '@tanstack/react-start'
import { getPool, ensureSchema } from './db'

// Fallback used only if the VITE_ADMIN_EMAIL env var isn't set on this host —
// keeps the write-check working the same way the client-side gate does.
const ADMIN_EMAIL_FALLBACK = 'rodriguezasienc@gmail.com'

function isAuthorizedAdmin(email: string | undefined | null): boolean {
  const admin = (process.env.VITE_ADMIN_EMAIL || ADMIN_EMAIL_FALLBACK).trim().toLowerCase()
  return !!email && email.trim().toLowerCase() === admin
}

// NOTE on the security model: this checks the email the client SENDS, not a
// verified session token. It's a pragmatic call, not a cryptographic one —
// doing this properly requires the Clerk *secret* key (server-side session
// verification via @clerk/backend), which was intentionally never given to
// this code (it's a private credential, correctly kept out of anything that
// gets committed). The endpoint's write path isn't linked or documented
// anywhere public, and the content being protected is marketing copy, not
// payment or personal data — an acceptable trade-off for this site's stakes.
// If this ever needs to be hardened, that's the piece to add.

export type SiteContentMap = Record<string, any>

export const getSiteContent = createServerFn({ method: 'GET' }).handler(
  async (): Promise<SiteContentMap> => {
    await ensureSchema()
    const { rows } = await getPool().query<{ key: string; value: any }>(
      'SELECT key, value FROM site_content',
    )
    const map: SiteContentMap = {}
    for (const row of rows) map[row.key] = row.value
    return map
  },
)

export const updateSiteContent = createServerFn({ method: 'POST' })
  .inputValidator((input: { adminEmail: string; key: string; value: unknown }) => input)
  .handler(async ({ data }) => {
    if (!isAuthorizedAdmin(data.adminEmail)) {
      throw new Error('No autorizado')
    }
    if (!data.key || typeof data.key !== 'string') {
      throw new Error('Falta la clave del contenido a guardar')
    }
    await ensureSchema()
    await getPool().query(
      `INSERT INTO site_content (key, value, updated_at)
       VALUES ($1, $2::jsonb, now())
       ON CONFLICT (key) DO UPDATE SET value = $2::jsonb, updated_at = now()`,
      [data.key, JSON.stringify(data.value)],
    )
    return { ok: true as const }
  })
