import { ClientOnly, createFileRoute } from '@tanstack/react-router'
import { AdminAccessGate, ClerkAuthProvider } from '@/components/ClerkAuth'

export const Route = createFileRoute('/admin')({
  head: () => ({
    meta: [
      { title: 'Administración · Migrar con Sentido' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: AdminPage,
})

function AdminPage() {
  return (
    <ClientOnly fallback={<div className="flex min-h-[100dvh] items-center justify-center bg-secondary text-sm text-muted-foreground">Preparando acceso seguro…</div>}>
      <ClerkAuthProvider>
        <AdminAccessGate />
      </ClerkAuthProvider>
    </ClientOnly>
  )
}