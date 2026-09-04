import { ClientOnly, createFileRoute } from '@tanstack/react-router'
import { ClerkAuthProvider, SignUpScreen } from '@/components/ClerkAuth'

export const Route = createFileRoute('/sign-up')({
  head: () => ({ meta: [{ title: 'Crear cuenta · Migrar con Sentido' }] }),
  component: () => (
    <ClientOnly fallback={<div className="flex min-h-[100dvh] items-center justify-center bg-secondary text-sm text-muted-foreground">Cargando…</div>}>
      <ClerkAuthProvider>
        <SignUpScreen />
      </ClerkAuthProvider>
    </ClientOnly>
  ),
})