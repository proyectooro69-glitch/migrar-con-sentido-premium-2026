/**
 * Flatten the TanStack Start build into a static `dist/` that Blink hosting serves.
 *
 * TanStack Start's `vite build` (configured with `build.outDir: '.vite-out'`)
 * emits:
 *   .vite-out/client/   ← prerendered HTML + assets (what we want, STATIC)
 *   .vite-out/server/   ← SSR Nitro server (NOT used by Blink's static S3 hosting)
 *
 * Blink uploads `dist/` and serves `dist/index.html` (see src/constants/publish.ts
 * BUILD_PATHS['vite-react'] = 'dist'). So we copy `.vite-out/client/*` up into a
 * flat `dist/` and drop the server.
 *
 * Why build into `.vite-out` instead of `dist/` directly: sandboxes created before the
 * platform stopped injecting `_redirects` still carry a read-only copy owned by another
 * user, and Start's client build tries to EMPTY its out dir first → `EACCES: unlink
 * _redirects`. Building into a clean temp dir avoids that entirely.
 *
 * IMPORTANT: we now WIPE `dist/` before copying the fresh build in. Vite hashes every
 * asset filename by content, so a changed file gets a brand-new filename and the OLD
 * one is never overwritten — only ADDED alongside it. Without this cleanup step, every
 * previous build's JS/CSS/media stays in `dist/` forever. That's harmless on its own,
 * but if a browser or CDN edge ever serves a STALE cached `index.html` (which still
 * references those old, still-present files), the old version of the site loads
 * perfectly fine instead of erroring — producing exactly the "flash of the new site,
 * then reverts to the old one" bug. Wiping dist/ first means old builds can no longer
 * silently keep working once index.html moves on.
 */
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const SRC = '.vite-out/client'
const DEST = 'dist'

if (!existsSync(SRC)) {
  console.error(`[finalize] build output missing: ${SRC} — did "vite build" run?`)
  process.exit(1)
}

// Clean dist/ before copying the fresh build in, so old hashed assets from previous
// builds never linger. Tolerate a legacy read-only `_redirects` some old sandboxes
// carry — everything else must be removable, or we abort rather than deploy a build
// that mixes old and new assets.
if (existsSync(DEST)) {
  for (const entry of readdirSync(DEST)) {
    try {
      rmSync(join(DEST, entry), { recursive: true, force: true })
    } catch (e) {
      if (entry === '_redirects') {
        console.warn(`[finalize] skip removing ${entry}: ${e.code || e.message} (legacy read-only copy; harmless, not executed)`)
      } else {
        console.error(`[finalize] FAILED clearing old ${entry} from dist/: ${e.code || e.message} — aborting (can't guarantee a clean deploy)`)
        process.exit(1)
      }
    }
  }
}

mkdirSync(DEST, { recursive: true })

for (const entry of readdirSync(SRC)) {
  try {
    cpSync(join(SRC, entry), join(DEST, entry), { recursive: true, force: true })
  } catch (e) {
    // ONLY `_redirects` may be skipped, and only because sandboxes created before the platform
    // stopped injecting it still carry a read-only copy owned by another user that cannot be
    // overwritten. The file is inert either way — nothing executes it. ANY other failed entry
    // (assets/, index.html, route html) would leave dist/index.html pointing at missing or stale
    // hashed assets — a silently broken deployment. Fail the build instead.
    // Remove this branch once no live sandbox predates the injector's removal.
    if (entry === '_redirects') {
      console.warn(`[finalize] skip ${entry}: ${e.code || e.message} (legacy read-only copy; the file is not executed)`)
    } else {
      console.error(`[finalize] FAILED copying ${entry} into dist/: ${e.code || e.message} — aborting (a partial dist/ deploys broken)`)
      process.exit(1)
    }
  }
}

rmSync('.vite-out', { recursive: true, force: true })

if (!existsSync(join(DEST, 'index.html'))) {
  console.error('[finalize] dist/index.html missing after flatten — build is not publishable')
  process.exit(1)
}

console.log('[finalize] ✓ static build flattened to dist/ (dist/index.html ready)')