import { ClientOnly, createFileRoute } from '@tanstack/react-router'
import { ClerkAuthProvider, SignUpScreen } from '@/components/ClerkAuth'

// Splat route: catches every sub-step Clerk needs under /sign-up/ (email
// verification, SSO callback, etc.) so the static host doesn't 404 on them —
// it just renders the same sign-up screen, and Clerk's own internal routing
// (reading window.location.pathname) picks up from there.
export const Route = createFileRoute('/sign-up/$')({
  head: () => ({ meta: [{ title: 'Crear cuenta · Migrar con Sentido' }] }),
  component: () => (
    <ClientOnly fallback={<div className="flex min-h-[100dvh] items-center justify-center bg-secondary text-sm text-muted-foreground">Cargando…</div>}>
      <ClerkAuthProvider>
        <SignUpScreen />
      </ClerkAuthProvider>
    </ClientOnly>
  ),
})
