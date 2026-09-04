import { ClerkProvider, SignIn, SignUp, useClerk, useUser } from '@clerk/react'
import { publishableKeyFromHost } from '@clerk/react/internal'
import { shadcn } from '@clerk/themes'
import { CheckCircle2 } from 'lucide-react'
import type { ReactNode } from 'react'

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')

export function ClerkAuthProvider({ children }: { children: ReactNode }) {
  const publishableKey = publishableKeyFromHost(
    window.location.hostname,
    import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  )
  const appearance = {
    theme: shadcn,
    cssLayerName: 'clerk',
    options: {
      logoPlacement: 'inside' as const,
      logoLinkUrl: `${basePath || ''}/`,
      logoImageUrl: `${window.location.origin}${basePath}/favicon.svg`,
    },
    variables: {
      colorPrimary: '#D62839',
      colorForeground: '#062B5C',
      colorMutedForeground: '#5A6B82',
      colorBackground: '#FFFFFF',
      colorInput: '#F5F7FA',
      colorInputForeground: '#062B5C',
      colorNeutral: '#E2E8F0',
      colorDanger: '#D62839',
      fontFamily: 'Inter, sans-serif',
      borderRadius: '0.75rem',
    },
    elements: {
      rootBox: 'w-full flex justify-center',
      cardBox: 'bg-white rounded-2xl w-[440px] max-w-full overflow-hidden shadow-xl',
      card: '!shadow-none !border-0 !bg-transparent !rounded-none',
      footer: '!shadow-none !border-0 !bg-transparent !rounded-none',
      headerTitle: 'text-primary font-serif',
      headerSubtitle: 'text-muted-foreground',
      formFieldLabel: 'text-primary',
      formFieldInput: 'border-border bg-secondary',
      formButtonPrimary: 'bg-accent hover:bg-accent/90',
      socialButtonsBlockButton: 'border-border',
      footerActionLink: 'text-accent',
      footerActionText: 'text-muted-foreground',
      dividerText: 'text-muted-foreground',
      dividerLine: 'bg-border',
    },
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      proxyUrl={import.meta.env.VITE_CLERK_PROXY_URL}
      appearance={appearance}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
    >
      {children}
    </ClerkProvider>
  )
}

export function SignInScreen() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-secondary px-4 py-12">
      <SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} />
    </div>
  )
}

export function SignUpScreen() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-secondary px-4 py-12">
      <SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} />
    </div>
  )
}

export function AdminAccessGate() {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL?.trim().toLowerCase()
  const userEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase()

  if (!isLoaded) {
    return <div className="flex min-h-[100dvh] items-center justify-center bg-secondary text-sm text-muted-foreground">Cargando acceso seguro…</div>
  }

  if (!user) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-secondary px-5">
        <div className="max-w-md rounded-2xl border border-border bg-white p-8 text-center shadow-lg">
          <p className="eyebrow text-accent">Área privada</p>
          <h1 className="mt-4 font-serif text-3xl font-bold text-primary">Acceso de administración</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Inicia sesión con la cuenta autorizada para gestionar Migrar con Sentido.
          </p>
          <a href={`${basePath}/sign-in`} className="cta-red mt-7 inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold">
            Iniciar sesión
          </a>
        </div>
      </div>
    )
  }

  if (!adminEmail || userEmail !== adminEmail) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-secondary px-5">
        <div className="max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-lg">
          <p className="eyebrow text-accent">Acceso denegado</p>
          <h1 className="mt-4 font-serif text-3xl font-bold text-primary">Esta cuenta no está autorizada</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            El panel solo está disponible para la cuenta administradora configurada.
          </p>
          <button type="button" onClick={() => signOut({ redirectUrl: `${basePath}/` })} className="cta-outline mt-7 inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold">
            Cerrar sesión
          </button>
        </div>
      </div>
    )
  }

  return <AdminConsole onSignOut={() => signOut({ redirectUrl: `${basePath}/` })} />
}

function AdminConsole({ onSignOut }: { onSignOut: () => void }) {
  const sections = [
    ['Panel general', 'Resumen'],
    ['Página principal', 'Hero, video y visibilidad'],
    ['Servicios', '9 servicios publicados'],
    ['Emprendedores', 'Contenido y propuestas'],
    ['Asesoría jurídica', 'Colaboradora independiente'],
    ['Noticias', 'Borradores y publicaciones'],
    ['Testimonios', 'Moderación'],
    ['Preguntas frecuentes', '14 preguntas publicadas'],
    ['Contacto', 'Canales de contacto'],
    ['Configuración', 'Acceso y preferencias'],
  ]

  return (
    <div className="min-h-[100dvh] bg-secondary text-primary">
      <div className="flex min-h-[100dvh] flex-col lg:flex-row">
        <aside className="w-full bg-primary text-white lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 lg:block">
            <a href={`${basePath}/`} className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent font-serif text-xl font-bold">M</span>
              <span className="text-xs font-bold uppercase tracking-[0.16em]">Migrar con<br />Sentido</span>
            </a>
            <span className="hidden pt-10 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40 lg:block">Administración privada</span>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-4 py-3 lg:block lg:px-3 lg:py-8" aria-label="Administración">
            {sections.map(([label, description], index) => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(/\s+/g, '-')}`}
                className={`group flex min-w-max items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs transition-colors lg:min-w-0 ${
                  index === 0 ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="hidden h-1.5 w-1.5 rounded-full bg-accent lg:block" />
                <span>
                  <span className="block font-semibold">{label}</span>
                  <span className="hidden text-[10px] text-white/40 lg:block">{description}</span>
                </span>
              </a>
            ))}
          </nav>
          <div className="hidden border-t border-white/10 px-6 py-5 lg:block">
            <button type="button" onClick={onSignOut} className="text-xs font-semibold text-white/60 transition-colors hover:text-white">Cerrar sesión</button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
          <div className="mx-auto max-w-6xl">
            <header className="flex flex-col justify-between gap-5 border-b border-border pb-8 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow text-accent">Panel de control</p>
                <h1 className="mt-3 font-serif text-4xl font-bold text-primary">Buenos días</h1>
                <p className="mt-2 text-sm text-muted-foreground">Gestiona el contenido que ve tu comunidad.</p>
              </div>
              <a href={`${basePath}/`} target="_blank" rel="noreferrer" className="cta-outline inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2 text-xs font-semibold">
                Ver sitio público <span aria-hidden="true">↗</span>
              </a>
            </header>

            <section id="panel-general" className="grid gap-4 py-8 sm:grid-cols-2 xl:grid-cols-4">
              {[
                ['9', 'Servicios activos', 'Todos visibles'],
                ['14', 'Preguntas frecuentes', 'Publicadas'],
                ['0', 'Noticias', 'Sin contenido publicado'],
                ['0', 'Testimonios', 'Pendientes de moderar'],
              ].map(([value, label, status]) => (
                <article key={label} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <p className="font-serif text-4xl font-bold text-primary">{value}</p>
                  <p className="mt-2 text-sm font-semibold text-primary">{label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{status}</p>
                </article>
              ))}
            </section>

            <section id="página-principal" className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col justify-between gap-3 border-b border-border pb-5 sm:flex-row sm:items-start">
                <div>
                  <p className="eyebrow text-accent">Página principal</p>
                  <h2 className="mt-2 font-serif text-2xl font-bold text-primary">Contenido del hero</h2>
                </div>
                <span className="tag-chip bg-green-50 text-green-700">Publicado</span>
              </div>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {[
                  ['Título principal', 'Migrar con sentido.'],
                  ['Subtítulo', 'Migrar a España sin perderte.'],
                  ['Texto del hero', 'Te acompañamos antes de venir, en tus primeros días y durante tu instalación.'],
                  ['URL del video', 'Pendiente de cargar el archivo original'],
                ].map(([label, value]) => (
                  <label key={label} className="block">
                    <span className="mb-2 block text-xs font-semibold text-primary">{label}</span>
                    <input defaultValue={value} className="h-11 w-full rounded-lg border border-input bg-secondary px-3 text-sm text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15" />
                  </label>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">Los cambios se guardarán en la base de datos en la siguiente fase.</p>
                <button type="button" className="cta-red inline-flex min-h-11 items-center gap-2 rounded-lg px-5 py-2 text-xs font-semibold">Guardar cambios <CheckCircle2 className="h-4 w-4" /></button>
              </div>
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-2">
              <article id="servicios" className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
                <p className="eyebrow text-accent">Servicios</p>
                <h2 className="mt-2 font-serif text-2xl font-bold text-primary">Contenido preparado</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Los nueve servicios actuales están listos para editarse, ocultarse y reordenarse.</p>
                <button type="button" className="cta-outline mt-6 inline-flex min-h-11 items-center rounded-lg px-5 py-2 text-xs font-semibold">Gestionar servicios</button>
              </article>
              <article id="preguntas-frecuentes" className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
                <p className="eyebrow text-accent">Preguntas frecuentes</p>
                <h2 className="mt-2 font-serif text-2xl font-bold text-primary">14 respuestas publicadas</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Edita, añade, oculta o reordena las preguntas sin tocar el código.</p>
                <button type="button" className="cta-outline mt-6 inline-flex min-h-11 items-center rounded-lg px-5 py-2 text-xs font-semibold">Gestionar FAQ</button>
              </article>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}