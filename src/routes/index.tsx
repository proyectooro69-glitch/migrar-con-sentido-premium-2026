import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight, BriefcaseBusiness, CalendarClock, FileCheck2, GraduationCap, House, Landmark,
  Menu, Plane, Scale, ShieldCheck, Sparkles, Stethoscope, TrainFront, Users, X, MessageCircle, Globe2,
} from 'lucide-react'

const heroImage = '/assets/migrar-con-sentido-hero.png'
const heroVideo = '/assets/migrar-con-sentido-hero.mp4'
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
  ['¿Puedo contratar solo un servicio suelto?', 'Sí. Puedes elegir un solo servicio o pedir acompañamiento completo desde antes de venir hasta tu instalación final.'],
  ['¿La asesoría jurídica va incluida?', 'La asesoría jurídica la ofrece Beatriz Lora de forma independiente. Nosotros te ponemos en contacto directo con ella.'],
]

function WhatsAppButton({ children = 'Escribir por WhatsApp', className = '' }: { children?: React.ReactNode; className?: string }) {
  return <a href={whatsappUrl} target="_blank" rel="noreferrer" className={`inline-flex min-h-12 items-center justify-center gap-2 bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1EBE5A] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] ${className}`}><MessageCircle className="h-4 w-4" />{children}</a>
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

  return <div className="min-w-0 overflow-hidden bg-background">
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 shadow-sm backdrop-blur-md' : 'bg-background/75 backdrop-blur-sm'}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-10">
        <a href="#inicio" className="flex items-center gap-3" aria-label="Migrar con Sentido, inicio">
          <div className="flex h-10 w-10 items-center justify-center border border-primary text-primary"><span className="font-serif text-2xl">M</span></div>
          <span className="max-w-[150px] text-[11px] font-bold uppercase leading-[1.05] tracking-[0.18em] text-primary">Migrar<br />con sentido</span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegación principal">
          {['Quiénes somos', 'Servicios', 'Emprendedores', 'Asesoría jurídica', 'Actualidad', 'Contacto'].map((label) => <a key={label} href={`#${label.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/ /g, '-')}`} className="nav-link text-xs font-semibold tracking-wide text-foreground/80">{label}</a>)}
        </nav>
        <div className="hidden lg:block"><WhatsAppButton className="min-h-10 px-4 py-2 text-xs" /></div>
        <button className="flex h-11 w-11 items-center justify-center text-primary lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
      {menuOpen && <div className="border-t border-border bg-background px-5 py-6 shadow-lg lg:hidden"><nav className="flex flex-col gap-1" aria-label="Menú móvil">{['Quiénes somos', 'Servicios', 'Emprendedores', 'Asesoría jurídica', 'Actualidad', 'Contacto'].map((label) => <a key={label} href={`#${label.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/ /g, '-')}`} onClick={closeMenu} className="border-b border-border py-4 text-sm font-semibold">{label}</a>)}</nav><WhatsAppButton className="mt-5 w-full" /></div>}
    </header>

    <main>
      <section id="inicio" className="relative flex min-h-[720px] items-end overflow-hidden bg-primary pb-16 pt-28 lg:min-h-[820px] lg:items-center lg:pb-0">
        <div className="absolute inset-0" aria-label="Ruta visual de Cuba a España">
          <video
            ref={heroVideoRef}
            className="h-full w-full object-cover object-[62%_center] lg:object-center"
            src={heroVideo}
            poster={heroImage}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <img src={heroImage} alt="Ruta de viaje entre Cuba y España con avión y puntos de llegada" className="h-full w-full object-cover object-[62%_center] lg:object-center" />
          </video>
          <div className="hero-vignette" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 lg:px-10"><div className="max-w-xl text-primary"><span className="eyebrow border-l-2 border-accent pl-3 text-xs font-bold uppercase tracking-[0.18em]">Acompañamiento a la llegada · España</span><h1 className="mt-6 max-w-lg font-serif text-5xl leading-[0.98] tracking-tight lg:text-7xl">Migrar a España<br /><em className="font-normal text-accent">sin perderte</em></h1><p className="mt-7 max-w-lg text-base leading-7 text-primary/80 lg:text-lg">Ayudamos a quienes llegan a España a insertarse con orden, con información real y con respeto por las leyes y la sociedad que los recibe. No se trata solo de resolver papeles: se trata de llegar bien, entender el país que te abre las puertas, y construir aquí una vida con sentido.</p><div className="mt-8 flex flex-wrap gap-3"><WhatsAppButton>Hablar por WhatsApp</WhatsAppButton><a href={instagramUrl} className="inline-flex min-h-12 items-center gap-2 border border-primary/30 px-6 py-3 text-sm font-semibold text-primary transition hover:border-accent hover:text-accent"><span aria-hidden="true" className="text-base leading-none">◎</span> Ver en Instagram</a></div><p className="mt-8 font-serif text-xl italic text-accent">Aquí se llega acompañado.</p></div></div>
        <div className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-primary/70 lg:flex"><span className="h-px w-10 bg-accent" /> Cuba <Plane className="h-3 w-3" /> España <span className="h-px w-10 bg-accent" /></div>
      </section>

      <section id="quienes-somos" className="bg-primary py-24 text-primary-foreground lg:py-32"><div className="mx-auto max-w-7xl px-5 lg:px-10"><Reveal><div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24"><div><p className="eyebrow text-accent">01 / La razón de estar aquí</p><h2 className="mt-5 font-serif text-4xl leading-tight lg:text-6xl">Un puente de acompañamiento,<br /><em className="font-normal text-accent">no una gestoría fría</em></h2></div><div className="pt-2"><p className="max-w-2xl text-lg leading-8 text-primary-foreground/75">Trabajamos mayormente con personas cubanas que tramitan la nacionalidad española por la Ley de Memoria Democrática, como descendientes de españoles, y con cualquier extranjero que quiera instalarse en España haciendo las cosas bien. Creemos que quien llega, llega para quedarse bien: agradeciendo y respetando el país que lo acoge.</p></div></div></Reveal><div className="mt-20 grid border-t border-primary-foreground/20 md:grid-cols-3">{[['01', 'Respeto', 'Por las leyes, los tiempos y la sociedad que recibe a cada persona que llega.'], ['02', 'Acompañamiento', 'No entregamos un trámite resuelto: caminamos contigo cada paso del proceso.'], ['03', 'Gratitud', 'Llegar bien es también un compromiso con el lugar que te abre las puertas.']].map(([number, title, text], index) => <Reveal key={title} className={`delay-${index + 1}`}><article className="border-b border-primary-foreground/20 py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"><span className="font-mono text-xs text-accent">{number}</span><h3 className="mt-8 font-serif text-3xl capitalize">{title}</h3><span className="my-5 block h-px w-10 bg-accent" /><p className="max-w-xs text-sm leading-6 text-primary-foreground/65">{text}</p></article></Reveal>)}</div></div></section>

      <section id="como-te-acompanamos" className="bg-background py-24 lg:py-32"><div className="mx-auto max-w-7xl px-5 lg:px-10"><Reveal><div className="max-w-2xl"><p className="eyebrow text-accent-foreground">02 / El proceso</p><h2 className="mt-5 font-serif text-4xl text-primary lg:text-6xl">Tres momentos,<br /><em className="font-normal text-accent-foreground">un mismo acompañamiento</em></h2></div></Reveal><div className="mt-16 grid gap-10 lg:grid-cols-3 lg:gap-0">{[['01', 'Antes de venir', 'Búsqueda de alojamiento, orientación general y planificación de tu llegada desde donde estés.'], ['02', 'Primeros días', 'Recogida en el aeropuerto, seguridad social, tarjeta sanitaria y los primeros trámites urgentes.'], ['03', 'Instalación completa', 'Colegios, currículum, transporte, certificado digital, citas previas e inserción cultural.']].map(([number, title, text], index) => <Reveal key={title} className={`process-step delay-${index + 1}`}><article className="relative border-l border-accent px-6 pb-8 lg:border-l-0 lg:border-t lg:px-8 lg:pb-0 lg:pt-8 lg:first:pl-0"><span className="absolute -left-[5px] top-0 h-2 w-2 bg-accent lg:-top-[5px] lg:left-0" /><span className="font-mono text-xs text-accent-foreground">{number}</span><h3 className="mt-6 font-serif text-3xl text-primary">{title}</h3><p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">{text}</p></article></Reveal>)}</div></div></section>

      <section id="servicios" className="bg-secondary py-24 lg:py-32"><div className="mx-auto max-w-7xl px-5 lg:px-10"><Reveal><div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end"><div><p className="eyebrow text-accent-foreground">03 / Servicios de inserción</p><h2 className="mt-5 max-w-2xl font-serif text-4xl leading-tight text-primary lg:text-6xl">Todo lo que necesitas para instalarte, <em className="font-normal">sin sorpresas</em></h2></div><p className="max-w-sm text-sm leading-6 text-muted-foreground">Cada servicio se conversa por WhatsApp: te explicamos cómo trabajamos y acordamos los detalles contigo, en persona.</p></div></Reveal><div className="mt-16 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">{services.map(([title, text, Icon], index) => <Reveal key={title} className={`delay-${(index % 3) + 1}`}><article className="service-card group bg-background p-7"><Icon className="h-6 w-6 text-accent-foreground transition-transform duration-300 group-hover:-translate-y-1" strokeWidth={1.4} /><h3 className="mt-8 font-serif text-2xl text-primary">{title}</h3><p className="mt-3 min-h-[72px] text-sm leading-6 text-muted-foreground">{text}</p><a href={whatsappUrl} className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-foreground">Consultar <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" /></a></article></Reveal>)}</div></div></section>

      <section id="emprendedores" className="bg-background py-24 lg:py-32"><div className="mx-auto max-w-7xl px-5 lg:px-10"><Reveal><div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24"><div><p className="eyebrow text-accent-foreground">04 / Para emprender</p><h2 className="mt-5 font-serif text-4xl text-primary lg:text-5xl">Si llegas con un proyecto, también te acompañamos a construirlo</h2></div><div className="grid gap-px bg-border sm:grid-cols-2">{[['Páginas web para tu negocio', 'Diseño de sitios web profesionales para negocios que arrancan en España, hechos a medida y pensados para atraer clientes desde el primer día.'], ['Estudios de mercado para inversión', 'Información real sobre el terreno antes de invertir: dónde, cómo y con qué expectativas conviene emprender en España.']].map(([title, text]) => <article key={title} className="bg-secondary p-7"><Sparkles className="h-5 w-5 text-accent-foreground" /><h3 className="mt-10 font-serif text-2xl text-primary">{title}</h3><p className="mt-4 text-sm leading-6 text-muted-foreground">{text}</p><a href={whatsappUrl} className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-foreground">Consultar <ArrowRight className="h-3 w-3" /></a></article>)}</div></div></Reveal></div></section>

      <section id="asesoria-juridica" className="bg-primary py-24 text-primary-foreground lg:py-32"><div className="mx-auto max-w-7xl px-5 lg:px-10"><Reveal><div className="grid items-center gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-24"><div><p className="eyebrow text-accent">05 / Respaldo legal</p><h2 className="mt-5 font-serif text-4xl lg:text-6xl">Respaldo legal<br /><em className="font-normal text-accent">de confianza</em></h2><p className="mt-8 max-w-xl text-lg leading-8 text-primary-foreground/70">La asesoría jurídica la ofrece una profesional independiente, para los procesos que requieren una mirada especializada y directa contigo.</p></div><article className="border-t border-accent/50 pt-7"><Scale className="h-8 w-8 text-accent" strokeWidth={1.2} /><h3 className="mt-8 font-serif text-3xl">Beatriz Lora</h3><p className="mt-2 text-sm text-accent">Abogada — Extranjería · Derecho Penal · Derecho Penitenciario</p><p className="mt-6 text-sm leading-6 text-primary-foreground/65">Colaboradora de Migrar con Sentido para los procesos que requieren asesoría jurídica especializada en extranjería. Trabaja de forma independiente y directa contigo.</p><div className="mt-7 flex flex-wrap gap-3"><WhatsAppButton>Contactar por WhatsApp</WhatsAppButton><a href="#" className="inline-flex min-h-12 items-center border border-primary-foreground/30 px-5 text-sm hover:border-accent">Ver su web</a></div></article></div></Reveal></div></section>

      <section id="actualidad" className="bg-background py-24 lg:py-32"><div className="mx-auto max-w-7xl px-5 lg:px-10"><Reveal><div className="max-w-2xl"><p className="eyebrow text-accent-foreground">06 / Actualidad migratoria</p><h2 className="mt-5 font-serif text-4xl text-primary lg:text-6xl">Para que llegues informado,<br /><em className="font-normal">no a ciegas</em></h2><p className="mt-7 text-base leading-7 text-muted-foreground">España cambia con frecuencia sus normas de extranjería. Aquí iremos publicando avisos claros sobre lo que de verdad afecta a quien está tramitando su instalación.</p></div></Reveal><div className="mt-16 grid gap-px bg-border lg:grid-cols-3">{['Espacio para tu primer aviso', 'Espacio para tu segundo aviso', 'Espacio para tu tercer aviso'].map((title, index) => <Reveal key={title} className={`delay-${index + 1}`}><article className="min-h-64 bg-secondary p-7"><CalendarClock className="h-6 w-6 text-accent-foreground" /><p className="mt-12 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Próximamente</p><h3 className="mt-3 font-serif text-2xl text-primary">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{index === 0 ? 'Título del cambio o novedad. Resume aquí, en un par de líneas, qué cambió y a quién afecta.' : index === 1 ? 'Este bloque está listo para que publiques noticias reales apenas las tengas confirmadas.' : 'Tres avisos visibles a la vez mantienen la sección fresca sin sobrecargar la página.'}</p></article></Reveal>)}</div></div></section>

      <section id="testimonios" className="border-y border-border bg-secondary py-24 lg:py-32"><div className="mx-auto max-w-4xl px-5 text-center lg:px-10"><Reveal><Users className="mx-auto h-7 w-7 text-accent-foreground" strokeWidth={1.3} /><h2 className="mt-7 font-serif text-4xl text-primary lg:text-5xl">Testimonios reales,<br /><em className="font-normal">en construcción</em></h2><p className="mx-auto mt-7 max-w-xl text-base leading-7 text-muted-foreground">Este espacio está reservado para tus primeros testimonios. Cuando tengas dos o tres clientes satisfechos, pide su permiso para publicar una frase corta con su nombre o iniciales. Nada genera más confianza que la voz de alguien que ya pasó por esto.</p></Reveal></div></section>

      <section id="preguntas-frecuentes" className="bg-background py-24 lg:py-32"><div className="mx-auto max-w-4xl px-5 lg:px-10"><Reveal><p className="eyebrow text-accent-foreground">07 / Preguntas frecuentes</p><h2 className="mt-5 font-serif text-4xl text-primary lg:text-6xl">Antes de escribirnos</h2></Reveal><div className="mt-12 border-t border-border">{faq.map(([question, answer], index) => { const open = activeFaq === index; return <div key={question} className="border-b border-border"><button className="flex w-full items-center justify-between gap-5 py-6 text-left text-base font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" onClick={() => setActiveFaq(open ? null : index)} aria-expanded={open} aria-controls={`faq-${index}`}><span>{question}</span><span className="flex h-7 w-7 shrink-0 items-center justify-center border border-accent text-xl font-normal text-accent-foreground">{open ? '×' : '+'}</span></button><div id={`faq-${index}`} className={`faq-answer grid transition-all duration-300 ${open ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><p className="min-h-0 overflow-hidden pr-12 text-sm leading-7 text-muted-foreground">{answer}</p></div></div> })}</div></div></section>

      <section id="contacto" className="relative overflow-hidden bg-primary py-24 text-primary-foreground lg:py-32"><div className="absolute right-0 top-0 h-full w-1/3 opacity-20"><div className="h-full border-l border-accent/50" /></div><div className="relative mx-auto max-w-7xl px-5 lg:px-10"><Reveal><div className="max-w-3xl"><p className="eyebrow text-accent">08 / El siguiente paso</p><h2 className="mt-5 font-serif text-5xl leading-tight lg:text-7xl">Empieza tu instalación con una conversación,<br /><em className="font-normal text-accent">no con un formulario</em></h2><p className="mt-8 max-w-xl text-lg leading-8 text-primary-foreground/70">Escríbenos por WhatsApp y cuéntanos tu situación. Te respondemos nosotros mismos, sin intermediarios.</p><div className="mt-9 flex flex-wrap gap-3"><WhatsAppButton>Escribir por WhatsApp</WhatsAppButton><a href={instagramUrl} className="inline-flex min-h-12 items-center gap-2 border border-primary-foreground/30 px-6 text-sm hover:border-accent"><span aria-hidden="true" className="text-base leading-none">◎</span> Seguir en Instagram</a></div></div></Reveal></div></section>
    </main>

    <footer className="bg-primary px-5 pb-8 text-primary-foreground lg:px-10"><div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-primary-foreground/20 pt-7 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Migrar con Sentido. Todos los precios y condiciones se acuerdan directamente por WhatsApp.</p><div className="flex gap-5"><a href={instagramUrl} className="hover:text-accent">Instagram</a><a href={whatsappUrl} className="hover:text-accent">WhatsApp</a></div></div></footer>
    <a href={whatsappUrl} target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="Escribir por WhatsApp"><MessageCircle className="h-6 w-6" /></a>
  </div>
}
