import { useState, useEffect, useRef, useCallback } from 'react'

// ─── Data ────────────────────────────────────────────────────────
const NAV_LINKS = ['About', 'Gallery', 'Reel', 'Resume', 'Contact']

const STATS = [
  { label: 'Age', value: '12' },
  { label: 'Height', value: "4'10\"" },
  { label: 'Weight', value: '86 lbs' },
  { label: 'Hair', value: 'Brown' },
  { label: 'Eyes', value: 'Brown' },
  { label: 'Vocal Range', value: 'B3 – D5' },
  { label: 'Location', value: 'Orlando, FL' },
]

const GALLERY_IMAGES = [
  { src: '/images/gallery-1.jpg', alt: 'Remi Jo Russell dramatic headshot in gold top' },
  { src: '/images/gallery-4.jpg', alt: 'Remi Jo Russell full-body modeling shot with sunglasses' },
  { src: '/images/gallery-3.jpg', alt: 'Remi Jo Russell headshot in denim overalls' },
  { src: '/images/gallery-2.jpg', alt: 'Remi Jo Russell dramatic headshot with dark background' },
  { src: '/images/gallery-5.jpg', alt: 'Remi Jo Russell standing modeling pose with heart sunglasses' },
  { src: '/images/gallery-7.jpg', alt: 'Remi Jo Russell close-up headshot' },
  { src: '/images/gallery-6.jpg', alt: 'Remi Jo Russell seated modeling pose on chair' },
  { src: '/images/gallery-8.jpg', alt: 'Remi Jo Russell full-body casual modeling shot' },
]

const EXPERIENCE = [
  { production: 'Competition Dance Team', role: 'Dancer / Soloist', venue: 'Celebration Arts Academy, FL', director: 'Dixon Van Hoozer-Bowles' },
  { production: 'Mary Poppins Jr.', role: 'Ensemble', venue: 'Creation Village World School, FL', director: 'Janie Rutherford' },
  { production: 'Take It From the Top', role: 'Participant', venue: 'Dr. Phillips Performance Arts Center, FL', director: 'Paul Canaan' },
  { production: 'Talent Show / Monologue', role: 'Ensemble / Sara', venue: 'Creation Village World School, FL', director: 'Lori Rucker' },
  { production: 'Little Foxes (Monologue)', role: 'Alexandra', venue: 'Celebration Arts Academy, FL', director: 'Malik Van Hoozer-Bowles' },
  { production: 'A Little Princess (Monologue)', role: 'Sara', venue: 'Celebration Arts Academy, FL', director: 'Malik Van Hoozer-Bowles' },
  { production: 'A Midsummer Night\'s Dream (Monologue)', role: 'Puck', venue: 'Celebration Arts Academy, FL', director: 'Malik Van Hoozer-Bowles' },
]

const TRAINING = [
  { discipline: 'Contemporary, Jazz, Lyrical', instructor: 'Dixon Van Hoozer-Bowles' },
  { discipline: 'Ballet and Heels', instructor: 'Christina Gerrity' },
  { discipline: 'Tap', instructor: 'Madi Del Rio-Sprague' },
  { discipline: 'Hip Hop', instructor: 'Percy Nelson' },
  { discipline: 'Acro/Tumbling', instructor: 'Tracie Evans' },
  { discipline: 'Musical Theater and Acting', instructor: 'Malik Van Hoozer-Bowles' },
  { discipline: 'Private Voice', instructor: 'Nadya Borno' },
]

const INTENSIVES = [
  { area: 'Commercial Acting', instructor: 'Aaron Marcus' },
  { area: 'Modeling', instructor: 'Amanda Stewart / John Carlin' },
  { area: 'Dance', instructor: 'Ryan Starr' },
  { area: 'Voice', instructor: 'Jordan Williams' },
]

const AWARDS = [
  '"I\'m Not Madonna" — Musical Theater/Jazz/Character Solo — Dixon Van Hoozer-Bowles',
  'Photogenic / Discovery Spotlight Scholarship — Groove Dance Competition',
  'Character Commitment Judges Choice — Groove Dance Competition',
  'First In Category — Showstoppers Dance Competition',
]

const SKILLS = [
  'Rt Aerial', 'Head Cartwheel', 'Leg Holds', 'Scorpion', 'Sissone', 'Splits',
  'Round Off', 'Firebird', 'Bridge Variations', 'Triple Pirouette', 'Fouette Turns',
  'Dance Improvisation', 'Acting Improvisation', 'Fast Memorization', 'Animal Care',
  'Good with Kids', 'Bicycling', 'Basic Spanish', 'Hula-Hoop', 'Pogo Stick',
]

// ─── Sparkle SVG ─────────────────────────────────────────────────
function Sparkle({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z" />
    </svg>
  )
}

// ─── useScrollReveal hook ────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function FadeUp({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`fade-up ${className}`}>{children}</div>
}

// ─── Navigation ──────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = useCallback((id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-blur bg-white/85 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <button
          onClick={() => handleClick('hero')}
          className="font-display font-bold text-lg text-charcoal hover:text-coral transition-colors cursor-pointer"
        >
          Remi Jo
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => handleClick(link.toLowerCase())}
              className="font-body text-sm font-semibold text-warm-gray hover:text-coral transition-colors tracking-wide uppercase cursor-pointer"
            >
              {link}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-charcoal transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-charcoal transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-charcoal transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-80' : 'max-h-0'}`}>
        <div className="bg-white/95 nav-blur border-t border-gray-100 px-5 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => handleClick(link.toLowerCase())}
              className="font-body text-base font-semibold text-charcoal hover:text-coral transition-colors text-left py-2 cursor-pointer"
            >
              {link}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

// ─── Hero ────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-lavender via-sky/40 to-warm-pink" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #1E1E2E 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />

      {/* Sparkles */}
      <Sparkle className="absolute top-[15%] left-[12%] text-gold/60 animate-twinkle w-5 h-5" />
      <Sparkle className="absolute top-[25%] right-[15%] text-gold/40 animate-twinkle w-4 h-4" style={{ animationDelay: '1s' }} />
      <Sparkle className="absolute bottom-[30%] left-[20%] text-gold/50 animate-twinkle w-3 h-3" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 text-center px-5 pt-20 pb-12 flex flex-col items-center">
        {/* Headshot */}
        <div className="animate-slide-up mb-8">
          <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white/80 shadow-2xl mx-auto">
            <img
              src="/images/hero-headshot.jpg"
              alt="Remi Jo Russell smiling headshot"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Name */}
        <h1 className="animate-slide-up font-display font-bold text-5xl md:text-7xl lg:text-8xl text-charcoal tracking-tight leading-none mb-4" style={{ animationDelay: '0.15s' }}>
          REMI JO<br />RUSSELL
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in font-body text-lg md:text-xl text-charcoal/70 tracking-[0.25em] uppercase font-medium" style={{ animationDelay: '0.5s' }}>
          Dancer &middot; Actress &middot; Model
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-gentle opacity-50">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M7 10L12 15L17 10" />
          </svg>
        </div>
      </div>
    </section>
  )
}

// ─── About ───────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-20 md:py-28 px-5 bg-white">
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Photo */}
            <div className="w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden shadow-lg shrink-0">
              <img
                src="/images/about-photo.jpg"
                alt="Remi Jo Russell wearing a headband and green jumper"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Text */}
            <div className="text-center md:text-left">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-charcoal mb-6">
                Meet Remi Jo
              </h2>
              <p className="font-body text-lg text-warm-gray leading-relaxed mb-8 max-w-lg">
                Hi! I'm Remi Jo — a 12-year-old dancer, actress, and model based in Orlando, Florida. I've been performing since I was little, and I love everything from contemporary and jazz to musical theater and acting. When I'm not in the studio or on stage, you can find me riding my bike, practicing hula hoop tricks, or hanging out with animals. I'm currently training and auditioning, and I can't wait to see where this journey takes me!
              </p>

              {/* Agency */}
              <div className="mb-6 px-4 py-3 bg-lavender/10 rounded-lg border border-lavender/20 inline-block">
                <span className="font-detail text-xs uppercase tracking-widest text-warm-gray/70">Agency: </span>
                <span className="font-body font-bold text-charcoal text-sm">Known Management Group</span>
                <span className="font-detail text-warm-gray text-sm mx-2">|</span>
                <span className="font-detail text-xs uppercase tracking-widest text-warm-gray/70">Agent: </span>
                <span className="font-body font-bold text-charcoal text-sm">Matthew Gonzalez</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
                {STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-detail text-xs uppercase tracking-widest text-warm-gray/70 mb-1">{stat.label}</div>
                    <div className="font-body font-bold text-charcoal text-sm">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── Gallery ─────────────────────────────────────────────────────
function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  useEffect(() => {
    if (lightbox === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox((prev) => prev !== null ? (prev + 1) % GALLERY_IMAGES.length : null)
      if (e.key === 'ArrowLeft') setLightbox((prev) => prev !== null ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox])

  return (
    <section id="gallery" className="py-20 md:py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-charcoal">In Action</h2>
        </FadeUp>

        {/* Masonry-ish grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {GALLERY_IMAGES.map((img, i) => (
            <FadeUp key={i}>
              <button
                onClick={() => setLightbox(i)}
                className="gallery-item block w-full rounded-xl overflow-hidden cursor-pointer break-inside-avoid"
              >
                <img src={img.src} alt={img.alt} className="w-full block" loading="lazy" />
              </button>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 lightbox-backdrop"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl font-light cursor-pointer z-10"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            &times;
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl cursor-pointer z-10"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length) }}
            aria-label="Previous image"
          >
            &#8249;
          </button>

          {/* Next */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl cursor-pointer z-10"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % GALLERY_IMAGES.length) }}
            aria-label="Next image"
          >
            &#8250;
          </button>

          <img
            src={GALLERY_IMAGES[lightbox].src}
            alt={GALLERY_IMAGES[lightbox].alt}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}

// ─── Reel ────────────────────────────────────────────────────────
function Reel() {
  return (
    <section id="reel" className="py-20 md:py-28 px-5 bg-white">
      <div className="max-w-4xl mx-auto">
        <FadeUp className="text-center mb-10">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-charcoal">Watch My Reel</h2>
        </FadeUp>

        <FadeUp>
          <div className="rounded-2xl overflow-hidden shadow-xl bg-charcoal">
            <video
              controls
              preload="metadata"
              poster="/images/hero-headshot.jpg"
              className="w-full block"
            >
              <source src="/video/reel.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── Resume ──────────────────────────────────────────────────────
function Resume() {
  return (
    <section id="resume" className="py-20 md:py-28 px-5">
      <div className="max-w-5xl mx-auto">
        <FadeUp className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-charcoal">Resume</h2>
        </FadeUp>

        {/* Experience */}
        <FadeUp className="mb-14">
          <h3 className="font-display font-semibold text-xl text-charcoal mb-5 flex items-center gap-2">
            <span className="w-8 h-0.5 bg-coral rounded-full" />
            Theatrical / Dance Experience
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-detail text-sm">
              <thead>
                <tr className="border-b-2 border-coral/20">
                  <th className="py-3 pr-4 font-semibold text-charcoal">Production</th>
                  <th className="py-3 pr-4 font-semibold text-charcoal">Role</th>
                  <th className="py-3 pr-4 font-semibold text-charcoal hidden md:table-cell">Venue</th>
                  <th className="py-3 font-semibold text-charcoal hidden lg:table-cell">Director</th>
                </tr>
              </thead>
              <tbody>
                {EXPERIENCE.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-coral/[0.03] transition-colors">
                    <td className="py-3 pr-4 font-medium text-charcoal">{row.production}</td>
                    <td className="py-3 pr-4 text-warm-gray">{row.role}</td>
                    <td className="py-3 pr-4 text-warm-gray hidden md:table-cell">{row.venue}</td>
                    <td className="py-3 text-warm-gray hidden lg:table-cell">{row.director}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>

        {/* Training */}
        <FadeUp className="mb-14">
          <h3 className="font-display font-semibold text-xl text-charcoal mb-5 flex items-center gap-2">
            <span className="w-8 h-0.5 bg-lavender rounded-full" />
            Training
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {TRAINING.map((row, i) => (
              <div key={i} className="flex justify-between items-baseline bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-50">
                <span className="font-detail font-medium text-charcoal text-sm">{row.discipline}</span>
                <span className="font-detail text-warm-gray text-sm ml-4 text-right shrink-0">{row.instructor}</span>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Intensives */}
        <FadeUp className="mb-14">
          <h3 className="font-display font-semibold text-xl text-charcoal mb-5 flex items-center gap-2">
            <span className="w-8 h-0.5 bg-sky rounded-full" />
            Intensive Training
            <span className="font-detail text-sm font-normal text-warm-gray ml-1">— Discover Spotlight Summer Intensives</span>
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {INTENSIVES.map((row, i) => (
              <div key={i} className="bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-50 text-center">
                <div className="font-detail font-medium text-charcoal text-sm">{row.area}</div>
                <div className="font-detail text-warm-gray text-xs mt-1">{row.instructor}</div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Awards */}
        <FadeUp className="mb-14">
          <h3 className="font-display font-semibold text-xl text-charcoal mb-5 flex items-center gap-2">
            <Sparkle className="w-5 h-5 text-gold" />
            Awards
          </h3>
          <ul className="space-y-2">
            {AWARDS.map((award, i) => (
              <li key={i} className="font-detail text-sm text-warm-gray flex items-start gap-2">
                <Sparkle className="w-3 h-3 text-gold/60 shrink-0 mt-1" />
                {award}
              </li>
            ))}
          </ul>
        </FadeUp>

        {/* Special Skills */}
        <FadeUp className="mb-14">
          <h3 className="font-display font-semibold text-xl text-charcoal mb-5 flex items-center gap-2">
            <span className="w-8 h-0.5 bg-warm-pink rounded-full" />
            Special Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill, i) => (
              <span
                key={skill}
                className={`fade-up stagger-${(i % 10) + 1} inline-block px-3.5 py-1.5 rounded-full text-sm font-medium font-detail
                  ${i % 3 === 0 ? 'bg-gradient-to-r from-lavender/30 to-sky/20 text-charcoal' :
                    i % 3 === 1 ? 'bg-coral/10 text-coral-dark' :
                    'bg-gradient-to-r from-warm-pink/20 to-lavender/20 text-charcoal'}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </FadeUp>

        {/* Download button */}
        <FadeUp className="text-center">
          <a
            href="/Remi_Jo_Russell_Resume.pdf"
            download
            className="inline-flex items-center gap-2 bg-coral hover:bg-coral-dark text-white font-body font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm tracking-wide uppercase"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download Resume (PDF)
          </a>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── Contact ─────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28 px-5 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <FadeUp>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-charcoal mb-10">Get In Touch</h2>

          <div className="space-y-6">
            {/* Email */}
            <a
              href="mailto:aleaharussell@gmail.com"
              className="block bg-coral hover:bg-coral-dark text-white font-body font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
            >
              aleaharussell@gmail.com
            </a>

            {/* Phone */}
            <a
              href="tel:6513530978"
              className="block font-body text-lg text-charcoal hover:text-coral transition-colors font-semibold"
            >
              (651) 353-0978
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/remijo_dancer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-lg text-warm-gray hover:text-coral transition-colors font-semibold"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @remijo_dancer
            </a>

            {/* Location */}
            <p className="font-body text-warm-gray text-base">Orlando, FL</p>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-8 px-5 bg-charcoal text-center">
      <p className="font-detail text-sm text-white/50 mb-3">
        &copy; 2026 Remi Jo Russell. All rights reserved.
      </p>
      <a
        href="https://instagram.com/remijo_dancer"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-white/40 hover:text-white/70 transition-colors"
        aria-label="Instagram"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </a>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────────
export default function App() {
  // Scroll reveal for skill pills (they use the fade-up class but aren't in FadeUp components)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    // Observe all standalone fade-up elements (like skill pills)
    document.querySelectorAll('.fade-up:not(.visible)').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Gallery />
      <Reel />
      <Resume />
      <Contact />
      <Footer />
    </>
  )
}
