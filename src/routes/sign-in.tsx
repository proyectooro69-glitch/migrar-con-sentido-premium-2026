import { ClientOnly, createFileRoute } from '@tanstack/react-router'
import { ClerkAuthProvider, SignInScreen } from '@/components/ClerkAuth'

export const Route = createFileRoute('/sign-in')({
  head: () => ({ meta: [{ title: 'Iniciar sesión · Migrar con Sentido' }] }),
  component: () => (
    <ClientOnly fallback={<div className="flex min-h-[100dvh] items-center justify-center bg-secondary text-sm text-muted-foreground">Cargando…</div>}>
      <ClerkAuthProvider>
        <SignInScreen />
      </ClerkAuthProvider>
    </ClientOnly>
  ),
})