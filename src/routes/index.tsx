import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown, ArrowRight, BriefcaseBusiness, FileCheck2, GraduationCap, House, Landmark,
  Menu, Plane, Scale, ShieldCheck, Sparkles, Stethoscope, TrainFront, X, MessageCircle, Globe2,
  Heart, Plus, CheckCircle2, CalendarClock, Users, Quote, MapPin,
} from 'lucide-react'

const heroImage = '/assets/migrar-con-sentido-hero.png'
const heroVideo = '/assets/migrar-con-sentido-hero.mp4'
const heroFallback = heroImage
const whatsappUrl = 'https://wa.me/'
const instagramUrl = '#'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Migrar con Sentido — Acompañamiento para instalarte en España' },
      { name: 'description', content: 'Acompañamiento cercano para quienes llegan a España a instalarse: alojamiento, seguridad social, tarjeta sanitaria, colegios y asesoría jurídica de confianza.' },
      { property: 'og:title', content: 'Migrar con Sentido — Acompañamiento para instalarte en España' },
      { property: 'og:description', content: 'Acompañamiento cercano para quienes llegan a España a instalarse bien.' },
      { property: 'og:image', content: heroImage },
    ],
  }),
  component: Home,
})

const services = [
  ['Búsqueda de alojamiento', 'Antes de venir, para que llegues con un lugar seguro donde instalarte.', House],
  ['Recogida en el aeropuerto', 'Que tu primer paso en España sea acompañado, no en soledad.', Plane],
  ['Número de la Seguridad Social', 'Gestión del trámite que abre la puerta a trabajar y acceder a servicios.', ShieldCheck],
  ['Tarjeta sanitaria', 'Orientación completa para tramitar tu acceso a la sanidad pública.', Stethoscope],
  ['Orientación sobre colegios', 'Para las familias que llegan con hijos y necesitan elegir bien y a tiempo.', GraduationCap],
  ['Confección de currículum', 'Un CV pensado para el mercado laboral español, listo para enviar.', BriefcaseBusiness],
  ['Tarjeta de transporte', 'Reserva de tu tarjeta para moverte por la ciudad desde el primer día.', TrainFront],
  ['Certificado digital y citas previas', 'Orientación para tramitar tu identidad digital y agendar citas oficiales.', FileCheck2],
  ['Inserción cultural', 'Orientación general para entender costumbres, ritmos y formas de vida en España.', Globe2],
] as const

const faq = [
  ['¿Cuánto cuestan los servicios?', 'No mostramos precios en la web porque cada caso es distinto. Escríbenos por WhatsApp, te explicamos cómo trabajamos y acordamos los detalles contigo, en persona.'],
  ['¿Trabajan solo con personas cubanas?', 'No. Trabajamos mayormente con personas que tramitan la nacionalidad por la Ley de Memoria Democrática, pero acompañamos a cualquier extranjero que quiera instalarse en España haciendo las cosas bien.'],
  ['¿Puedo contratar un solo servicio?', 'Sí. Puedes elegir un solo servicio o pedir acompañamiento completo desde antes de venir hasta tu instalación final.'],
  ['¿Ofrecen acompañamiento completo?', 'Sí. Diseñamos contigo un recorrido que puede empezar antes del viaje y continuar durante tus primeros días y tu instalación.'],
  ['¿Qué ocurre antes de viajar?', 'Conversamos sobre tu situación, tus fechas y tus prioridades. Con esa información te explicamos qué podemos preparar antes de que salgas de tu país.'],
  ['¿Pueden ayudarme a buscar alojamiento?', 'Sí. Te orientamos en la búsqueda y en los aspectos que conviene revisar para llegar con una opción de vivienda más segura.'],
  ['¿Me pueden recoger en el aeropuerto?', 'Sí. La recogida en el aeropuerto se puede contratar como servicio independiente o dentro de un acompañamiento más completo.'],
  ['¿Qué documentos necesito para comenzar?', 'Depende de tu caso y del servicio que necesites. Escríbenos y te indicaremos la información inicial que conviene tener a mano.'],
  ['¿Cuándo debo contactarlos?', 'Cuanto antes puedas planificar, mejor. Así podremos hablar de alojamiento, fechas, documentación y primeros pasos con tiempo.'],
  ['¿Trabajan en toda España o solo en una ciudad?', 'Acompañamos procesos con llegada a distintos puntos de España. La disponibilidad concreta depende del servicio y de la ciudad.'],
  ['¿La asesoría jurídica va incluida?', 'La asesoría jurídica la ofrece Beatriz Lora de forma independiente. Nosotros te ponemos en contacto directo con ella.'],
  ['¿Cómo funciona el acompañamiento?', 'Primero conocemos tu situación; después acordamos contigo el alcance y la forma de trabajo. La comunicación se mantiene directa y clara durante el proceso.'],
  ['¿Puedo contratar los servicios desde otro país?', 'Sí. Puedes escribirnos y organizar la primera conversación desde donde estés, antes de viajar a España.'],
  ['¿Cómo puedo solicitar información?', 'Puedes escribirnos por WhatsApp. Cuéntanos brevemente tu situación y te responderemos con los siguientes pasos.'],
]

const moments = [
  {
    number: '01',
    title: 'Antes de venir',
    subtitle: 'Planificamos tu llegada',
    text: 'Búsqueda de alojamiento, orientación general y planificación de tu llegada desde donde estés.',
    image: 'https://images.pexels.com/photos/7203849/pexels-photo-7203849.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    Icon: House,
  },
  {
    number: '02',
    title: 'Primeros días',
    subtitle: 'No llegas solo',
    text: 'Recogida en el aeropuerto, seguridad social, tarjeta sanitaria y los primeros trámites urgentes.',
    image: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    Icon: Plane,
  },
  {
    number: '03',
    title: 'Tu instalación',
    subtitle: 'Empieza tu nueva vida',
    text: 'Colegios, currículum, transporte, certificado digital, citas previas e inserción cultural.',
    image: 'https://images.pexels.com/photos/13069726/pexels-photo-13069726.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    Icon: GraduationCap,
  },
]

const values = [
  ['01', 'Respeto', 'Por las leyes, los tiempos y la sociedad que recibe a cada persona que llega.'],
  ['02', 'Acompañamiento', 'No entregamos un trámite resuelto: caminamos contigo cada paso del proceso.'],
  ['03', 'Gratitud', 'Llegar bien es también un compromiso con el lugar que te abre las puertas.'],
]

const news: never[] = []
const testimonials: never[] = []

function CTAButton({
  children,
  href = whatsappUrl,
  variant = 'red',
  className = '',
}: {
  children: React.ReactNode
  href?: string
  variant?: 'red' | 'outline' | 'white-outline'
  className?: string
}) {
  const base = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2'
  const styles = {
    red: 'cta-red',
    outline: 'cta-outline',
    'white-outline': 'cta-white-outline',
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </a>
  )
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const heroVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const video = heroVideoRef.current
    if (!video) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const applyMotionPreference = () => {
      if (reduceMotion.matches) video.pause()
      else video.play().catch(() => {})
    }
    applyMotionPreference()
    reduceMotion.addEventListener('change', applyMotionPreference)
    return () => reduceMotion.removeEventListener('change', applyMotionPreference)
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const navLinks = [
    'Quiénes somos',
    'Servicios',
    'Emprendedores',
    'Asesoría jurídica',
    ...(news.length > 0 ? ['Actualidad'] : []),
    'Contacto',
  ]
  const slug = (label: string) => `#${label.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/ /g, '-')}`

  return (
    <div className="min-w-0 overflow-hidden bg-background">
      {/* ═══════════════════════════════════════════════════════════
          HEADER — sticky, minimalist, red CTA
          ═══════════════════════════════════════════════════════════ */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary/95 shadow-lg backdrop-blur-md' : 'bg-primary/15 backdrop-blur-[2px]'
      }`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:h-20 lg:px-10">
          <a href="#inicio" className="flex items-center gap-3" aria-label="Migrar con Sentido, inicio">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white shadow-lg shadow-black/10">
              <span className="font-serif text-xl font-bold">M</span>
            </div>
            <span className="max-w-[150px] text-[11px] font-bold uppercase leading-[1.1] tracking-[0.16em] text-white">
              Migrar
              <br />
              con sentido
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegación principal">
            {navLinks.map((label) => (
              <a key={label} href={slug(label)} className="nav-link text-sm font-medium text-white/85">
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <CTAButton variant="red" className="min-h-10 px-5 py-2 text-xs">
              <MessageCircle className="h-4 w-4" />
              Comenzar mi camino
            </CTAButton>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-border bg-white px-5 py-6 shadow-lg lg:hidden">
            <nav className="flex flex-col gap-1" aria-label="Menú móvil">
              {navLinks.map((label) => (
                <a
                  key={label}
                  href={slug(label)}
                  onClick={closeMenu}
                  className="border-b border-border py-4 text-sm font-semibold"
                >
                  {label}
                </a>
              ))}
            </nav>
            <CTAButton variant="red" className="mt-5 w-full">
              <MessageCircle className="h-4 w-4" />
              Comenzar mi camino
            </CTAButton>
          </div>
        )}
      </header>

      <main>
        {/* ═══════════════════════════════════════════════════════════
            HERO — immersive full-screen video
            ═══════════════════════════════════════════════════════════ */}
        <section id="inicio" className="hero-fullscreen relative isolate flex min-h-[100svh] items-end overflow-hidden bg-primary">
          <img
            src={heroFallback}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <video
            ref={heroVideoRef}
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            src={heroVideo}
            poster={heroFallback}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Ruta de viaje entre Cuba y España"
          />
          <div className="hero-video-wash absolute inset-0 -z-10" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-primary via-primary/55 to-transparent" />

          <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-36 lg:px-10 lg:pb-24">
            <Reveal>
              <div className="max-w-3xl">
                <div className="mb-6 flex items-center gap-3 text-white/80">
                  <span className="h-px w-12 bg-accent" />
                  <span className="eyebrow">Acompañamiento migratorio</span>
                </div>
                <h1 className="max-w-3xl font-serif text-5xl font-bold leading-[0.98] tracking-tight text-white sm:text-7xl lg:text-[6.8rem]">
                  Migrar con
                  <br />
                  <span className="text-accent">sentido.</span>
                </h1>
                <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
                  Migrar a España sin perderte. Te acompañamos antes de venir, en tus primeros días y
                  durante tu instalación.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <CTAButton variant="red" className="px-7">
                    Comenzar mi camino
                    <ArrowRight className="h-4 w-4" />
                  </CTAButton>
                  <a
                    href="#como-te-acompanamos"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
                  >
                    Descubrir cómo te acompañamos
                    <ArrowDown className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>

            <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/70">
              {['Antes de venir', 'Primeros días', 'Instalación completa'].map((item, index) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="font-serif text-lg font-bold text-accent">0{index + 1}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <a
            href="#quienes-somos"
            className="absolute bottom-7 right-6 hidden items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 lg:flex [writing-mode:vertical-rl]"
          >
            Desplázate para conocernos
            <span className="h-12 w-px bg-accent" />
          </a>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            QUIÉNES SOMOS — editorial, human, white background
            ═══════════════════════════════════════════════════════════ */}
        <section id="quienes-somos" className="bg-secondary py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <Reveal>
              <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
                <div>
                  <p className="eyebrow text-accent">01 / La razón de estar aquí</p>
                  <h2 className="mt-5 font-serif text-4xl font-bold leading-tight text-primary lg:text-5xl">
                    No somos una gestoría fría.
                  </h2>
                  <h3 className="mt-3 font-serif text-2xl font-normal italic text-primary/70 lg:text-3xl">
                    Somos el puente entre donde estás hoy y la vida que quieres construir en España.
                  </h3>
                </div>
                <div className="pt-2">
                  <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                    Trabajamos mayormente con personas cubanas que tramitan la nacionalidad española
                    por la Ley de Memoria Democrática, como descendientes de españoles, y con cualquier
                    extranjero que quiera instalarse en España haciendo las cosas bien. Creemos que quien
                    llega, llega para quedarse bien: agradeciendo y respetando el país que lo acoge.
                  </p>
                  <div className="mt-8 flex items-center gap-4 rounded-xl border border-border bg-white p-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/5">
                      <Heart className="h-5 w-5 text-accent" />
                    </div>
                    <p className="font-serif text-lg italic text-primary">
                      "Migrar es difícil. Sentirte acompañado puede cambiarlo todo."
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Values */}
            <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
              {values.map(([number, title, text], index) => (
                <Reveal key={title} className={`delay-${index + 1}`}>
                  <article className="bg-white p-8 lg:p-10">
                    <span className="font-serif text-4xl font-bold text-accent/20">{number}</span>
                    <h3 className="mt-4 font-serif text-2xl font-semibold capitalize text-primary">{title}</h3>
                    <div className="my-4 h-px w-12 bg-accent" />
                    <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            TRES MOMENTOS — visual journey with photos + progress line
            ═══════════════════════════════════════════════════════════ */}
        <section id="como-te-acompanamos" className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <Reveal>
              <div className="max-w-2xl">
                <p className="eyebrow text-accent">02 / El proceso</p>
                <h2 className="mt-5 font-serif text-4xl font-bold leading-tight text-primary lg:text-5xl">
                  Tres momentos,
                  <br />
                  <span className="font-normal italic text-primary/60">un mismo acompañamiento</span>
                </h2>
              </div>
            </Reveal>

            {/* Progress line */}
            <div className="mt-16 hidden items-center gap-2 lg:flex">
              {moments.map((m, i) => (
                <div key={m.number} className="flex flex-1 items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {m.number}
                    </span>
                  </div>
                  {i < moments.length - 1 && <div className="h-0.5 flex-1 bg-border" />}
                </div>
              ))}
              <span className="ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>

            {/* Cards */}
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {moments.map(({ number, title, subtitle, text, image, Icon }, index) => (
                <Reveal key={title} className={`delay-${index + 1}`}>
                  <article className="moment-card group overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={image}
                        alt={subtitle}
                        className="moment-img h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                      <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm">
                        <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                      </div>
                      <span className="absolute bottom-5 left-5 font-serif text-5xl font-bold text-white/90">
                        {number}
                      </span>
                    </div>
                    {/* Content */}
                    <div className="p-7">
                      <p className="eyebrow text-accent">{subtitle}</p>
                      <h3 className="mt-2 font-serif text-2xl font-semibold text-primary">{title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
                      <div className="mt-5 flex items-center gap-2">
                        <span className="h-px flex-1 border-t border-dashed border-border" />
                        <span className="text-sm text-accent">♥</span>
                        <span className="h-px flex-1 border-t border-dashed border-border" />
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <p className="mt-16 text-center font-serif text-xl italic text-primary">
                <span className="text-accent">♥ </span>
                No es solo venir, es empezar tu <span className="font-semibold text-accent">nueva vida</span> con tranquilidad.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SERVICIOS — modern grid with cards
            ═══════════════════════════════════════════════════════════ */}
        <section id="servicios" className="section-pattern bg-secondary py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <Reveal>
              <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
                <div>
                  <p className="eyebrow text-accent">03 / Servicios de inserción</p>
                  <h2 className="mt-5 max-w-2xl font-serif text-4xl font-bold leading-tight text-primary lg:text-5xl">
                    Todo lo que necesitas para instalarte,
                    <br />
                    <span className="font-normal italic text-primary/60">sin sorpresas</span>
                  </h2>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Cada servicio se conversa por WhatsApp: te explicamos cómo trabajamos y acordamos
                  los detalles contigo, en persona.
                </p>
              </div>
            </Reveal>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map(([title, text, Icon], index) => (
                <Reveal key={title} className={`delay-${(index % 3) + 1}`}>
                  <article className="service-card group flex h-full flex-col rounded-2xl border border-border bg-white p-7">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 transition-colors duration-300 group-hover:bg-accent/10">
                      <Icon
                        className="h-6 w-6 text-primary transition-colors duration-300 group-hover:text-accent"
                        strokeWidth={1.4}
                      />
                    </div>
                    <h3 className="mt-6 font-serif text-xl font-semibold text-primary">{title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent"
                    >
                      Consultar por WhatsApp
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECCIÓN EMOCIONAL — panoramic image with overlay
            ═══════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/31718531/pexels-photo-31718531.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Vista panorámica de España al atardecer"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="hero-overlay" />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-5 py-24 text-center lg:py-36 lg:px-10">
            <Reveal>
              <h2 className="font-serif text-4xl font-bold leading-tight text-white lg:text-5xl">
                No se trata solamente de llegar a España.
              </h2>
              <h3 className="mt-4 font-serif text-2xl font-normal italic text-white/80 lg:text-3xl">
                Se trata de sentir que sabes qué hacer cuando llegues.
              </h3>
              <div className="mt-10 flex justify-center">
                <CTAButton variant="red" className="px-8">
                  Quiero empezar mi camino
                  <ArrowRight className="h-4 w-4" />
                </CTAButton>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            EMPRENDIMIENTO — with photo
            ═══════════════════════════════════════════════════════════ */}
        <section id="emprendedores" className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <Reveal>
              <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
                <div>
                  <p className="eyebrow text-accent">04 / Para emprender</p>
                  <h2 className="mt-5 font-serif text-4xl font-bold leading-tight text-primary lg:text-5xl">
                    ¿Llegas con una idea de negocio?
                  </h2>
                  <h3 className="mt-3 font-serif text-2xl font-normal italic text-primary/60">
                    También podemos ayudarte a construirla.
                  </h3>
                  <div className="mt-8 overflow-hidden rounded-2xl shadow-md">
                    <img
                      src="https://images.pexels.com/photos/6773673/pexels-photo-6773673.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                      alt="Profesionales trabajando en espacio de coworking"
                      className="w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {[
                    {
                      title: 'Presencia digital',
                      text: 'Creamos tu presencia digital y tu web profesional para negocios que arrancan en España, hechos a medida y pensados para atraer clientes desde el primer día.',
                      Icon: Sparkles,
                    },
                    {
                      title: 'Decisiones antes de invertir',
                      text: 'Estudios y análisis de mercado para tomar mejores decisiones antes de invertir: información real sobre el terreno antes de emprender en España.',
                      Icon: Landmark,
                    },
                  ].map(({ title, text, Icon }, i) => (
                    <Reveal key={title} className={`delay-${i + 1}`}>
                      <article className="card-hover-lift flex h-full flex-col rounded-2xl border border-border bg-secondary p-7">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5">
                          <Icon className="h-5 w-5 text-primary" strokeWidth={1.4} />
                        </div>
                        <h3 className="mt-6 font-serif text-xl font-semibold text-primary">{title}</h3>
                        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent"
                        >
                          Consultar
                          <ArrowRight className="h-3 w-3" />
                        </a>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            ABOGADA — horizontal card with photo
            ═══════════════════════════════════════════════════════════ */}
        <section id="asesoria-juridica" className="bg-primary py-24 text-white lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <Reveal>
              <div className="max-w-2xl">
                <p className="eyebrow text-accent">05 / Respaldo legal</p>
                <h2 className="mt-5 font-serif text-4xl font-bold leading-tight lg:text-5xl">
                  Respaldo legal de confianza
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
                  La asesoría jurídica la ofrece una profesional independiente, para los procesos
                  que requieren una mirada especializada y directa contigo.
                </p>
              </div>
            </Reveal>

            <Reveal className="delay-1">
              <article className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="grid gap-0 md:grid-cols-[0.8fr_1.2fr]">
                  {/* Photo */}
                  <div className="relative aspect-[4/5] overflow-hidden md:aspect-auto">
                    <img
                      src="https://images.pexels.com/photos/8111814/pexels-photo-8111814.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                      alt="Beatriz Lora, abogada"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                  </div>
                  {/* Content */}
                  <div className="p-8 lg:p-10">
                    <div className="flex items-center gap-3">
                      <Scale className="h-7 w-7 text-accent" strokeWidth={1.2} />
                      <span className="eyebrow text-accent">Colaboradora independiente</span>
                    </div>
                    <h3 className="mt-6 font-serif text-3xl font-bold">Beatriz Lora</h3>
                    <p className="mt-2 text-sm font-medium text-accent">Abogada especializada</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {['EXTRANJERÍA', 'DERECHO PENAL', 'DERECHO PENITENCIARIO'].map((tag) => (
                        <span key={tag} className="tag-chip border border-white/20 bg-white/5 text-white/80">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="mt-6 text-sm leading-relaxed text-white/65">
                      Colaboradora de Migrar con Sentido para los procesos que requieren asesoría
                      jurídica especializada en extranjería. Trabaja de forma independiente y directa
                      contigo.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <CTAButton variant="red">
                        Contactar
                      </CTAButton>
                      <a
                        href="#"
                        className="cta-white-outline inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all"
                      >
                        Conocer su despacho
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            ACTUALIDAD — news section
            ═══════════════════════════════════════════════════════════ */}
         {news.length > 0 && <section id="actualidad" className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <Reveal>
              <div className="max-w-2xl">
                <p className="eyebrow text-accent">06 / Actualidad migratoria</p>
                <h2 className="mt-5 font-serif text-4xl font-bold leading-tight text-primary lg:text-5xl">
                  Para que llegues informado,
                  <br />
                  <span className="font-normal italic text-primary/60">no a ciegas</span>
                </h2>
                <p className="mt-7 text-base leading-relaxed text-muted-foreground">
                  España cambia con frecuencia sus normas de extranjería. Aquí iremos publicando
                  avisos claros sobre lo que de verdad afecta a quien está tramitando su instalación.
                </p>
              </div>
            </Reveal>

            <div className="mt-16 grid gap-6 lg:grid-cols-3">
              {['Espacio para tu primer aviso', 'Espacio para tu segundo aviso', 'Espacio para tu tercer aviso'].map(
                (title, index) => (
                  <Reveal key={title} className={`delay-${index + 1}`}>
                    <article className="card-hover-lift flex h-full min-h-64 flex-col rounded-2xl border border-border bg-secondary p-7">
                      <div className="flex items-center justify-between">
                        <CalendarClock className="h-6 w-6 text-primary" strokeWidth={1.3} />
                        <span className="tag-chip bg-primary/5 text-primary/60">Próximamente</span>
                      </div>
                      <h3 className="mt-8 font-serif text-xl font-semibold text-primary">{title}</h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {index === 0
                          ? 'Título del cambio o novedad. Resume aquí, en un par de líneas, qué cambió y a quién afecta.'
                          : index === 1
                            ? 'Este bloque está listo para que publiques noticias reales apenas las tengas confirmadas.'
                            : 'Tres avisos visibles a la vez mantienen la sección fresca sin sobrecargar la página.'}
                      </p>
                    </article>
                  </Reveal>
                )
              )}
            </div>
          </div>
         </section>}

        {/* ═══════════════════════════════════════════════════════════
            TESTIMONIOS — honest, no fake testimonials
            ═══════════════════════════════════════════════════════════ */}
         {testimonials.length > 0 && <section id="testimonios" className="border-y border-border bg-secondary py-24 lg:py-32">
          <div className="mx-auto max-w-4xl px-5 text-center lg:px-10">
            <Reveal>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/5">
                <Users className="h-6 w-6 text-primary" strokeWidth={1.3} />
              </div>
              <h2 className="mt-7 font-serif text-4xl font-bold text-primary lg:text-5xl">
                Testimonios reales,
                <br />
                <span className="font-normal italic text-primary/60">en construcción</span>
              </h2>
              <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted-foreground">
                Este espacio está reservado para tus primeros testimonios. Cuando tengas dos o tres
                clientes satisfechos, pide su permiso para publicar una frase corta con su nombre o
                iniciales. Nada genera más confianza que la voz de alguien que ya pasó por esto.
              </p>

              {/* Placeholder cards showing the format */}
              <div className="mt-12 grid gap-6 sm:grid-cols-3">
                {[
                  { initials: 'MC', origin: 'Cuba', dest: 'Madrid' },
                  { initials: 'AR', origin: 'Venezuela', dest: 'Valencia' },
                  { initials: 'JP', origin: 'Colombia', dest: 'Sevilla' },
                ].map((t, i) => (
                  <Reveal key={i} className={`delay-${i + 1}`}>
                    <div className="rounded-2xl border border-dashed border-border bg-white/60 p-6">
                      <Quote className="mx-auto h-5 w-5 text-accent/30" />
                      <div className="mt-4 flex justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/5">
                          <span className="font-serif text-sm font-bold text-primary">{t.initials}</span>
                        </div>
                      </div>
                      <p className="mt-3 text-xs text-muted-foreground">
                        <MapPin className="mr-1 inline h-3 w-3" />
                        {t.origin} → {t.dest}
                      </p>
                      <p className="mt-2 text-[11px] italic text-muted-foreground/60">Próximamente</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
         </section>}

        {/* ═══════════════════════════════════════════════════════════
            FAQ
            ═══════════════════════════════════════════════════════════ */}
        <section id="preguntas-frecuentes" className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-4xl px-5 lg:px-10">
            <Reveal>
              <p className="eyebrow text-accent">07 / Preguntas frecuentes</p>
              <h2 className="mt-5 font-serif text-4xl font-bold text-primary lg:text-5xl">
                Antes de escribirnos
              </h2>
            </Reveal>
            <div className="mt-12 border-t border-border">
              {faq.map(([question, answer], index) => {
                const open = activeFaq === index
                return (
                  <div key={question} className="border-b border-border">
                    <button
                      className="flex w-full items-center justify-between gap-5 py-6 text-left text-base font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      onClick={() => setActiveFaq(open ? null : index)}
                      aria-expanded={open}
                      aria-controls={`faq-${index}`}
                    >
                      <span>{question}</span>
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-lg transition-colors ${
                          open ? 'border-accent bg-accent text-white' : 'border-border text-accent'
                        }`}
                      >
                        {open ? '×' : '+'}
                      </span>
                    </button>
                    <div className={open ? 'faq-grid-open pb-6' : 'faq-grid-closed'}>
                      <p className="min-h-0 overflow-hidden pr-12 text-sm leading-relaxed text-muted-foreground">
                        {answer}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CONTACTO — final CTA
            ═══════════════════════════════════════════════════════════ */}
        <section id="contacto" className="relative overflow-hidden bg-primary py-24 text-white lg:py-32">
          <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
            <div className="h-full border-l border-accent" />
          </div>
          <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
            <Reveal>
              <div className="max-w-3xl">
                <p className="eyebrow text-accent">08 / El siguiente paso</p>
                <h2 className="mt-5 font-serif text-5xl font-bold leading-tight lg:text-6xl">
                  Empieza tu instalación con una conversación,
                  <br />
                  <span className="font-normal italic text-accent">no con un formulario</span>
                </h2>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70">
                  Escríbenos por WhatsApp y cuéntanos tu situación. Te respondemos nosotros mismos,
                  sin intermediarios.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <CTAButton variant="red" className="px-8">
                    <MessageCircle className="h-4 w-4" />
                    Escribir por WhatsApp
                  </CTAButton>
                  <a
                    href={instagramUrl}
                    className="cta-white-outline inline-flex min-h-12 items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold"
                  >
                    Seguir en Instagram
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════════════
          FOOTER — navy background, red accents
          ═══════════════════════════════════════════════════════════ */}
      <footer className="bg-primary px-5 pb-8 text-white lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Top section */}
          <div className="grid gap-10 border-t border-white/10 pt-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            {/* Brand */}
            <div className="max-w-xs">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-white">
                  <span className="font-serif text-xl font-bold">M</span>
                </div>
                <span className="text-sm font-bold uppercase tracking-[0.16em]">Migrar con Sentido</span>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-white/60">
                Acompañamiento cercano para quienes llegan a España a instalarse bien. No somos una
                gestoría fría: somos el puente entre donde estás y la vida que quieres construir.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-accent">Navegación</h4>
              <ul className="mt-4 space-y-3 text-sm text-white/60">
                {navLinks.map((label) => (
                  <li key={label}>
                    <a href={slug(label)} className="transition-colors hover:text-white">{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-accent">Servicios</h4>
              <ul className="mt-4 space-y-3 text-sm text-white/60">
                {services.slice(0, 5).map(([title]) => (
                  <li key={title}>
                    <a href="#servicios" className="transition-colors hover:text-white">{title}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-accent">Contacto</h4>
              <ul className="mt-4 space-y-3 text-sm text-white/60">
                <li>
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-white">
                    <MessageCircle className="h-4 w-4 text-accent" />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href={instagramUrl} className="flex items-center gap-2 transition-colors hover:text-white">
                    <span className="h-4 w-4 text-accent">◎</span>
                    Instagram
                  </a>
                </li>
                <li className="pt-2">
                  <CTAButton variant="red" className="min-h-10 w-full px-4 py-2 text-xs">
                    Comenzar mi camino
                  </CTAButton>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Migrar con Sentido. Todos los precios y condiciones se acuerdan directamente por WhatsApp.</p>
            <div className="flex gap-5">
              <a href={instagramUrl} className="transition-colors hover:text-accent">Instagram</a>
              <a href={whatsappUrl} className="transition-colors hover:text-accent">WhatsApp</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float"
        aria-label="Escribir por WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  )
}
