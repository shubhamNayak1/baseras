import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Reveal, SpotlightCard, LiveConsole, ScrambleText, scrollToSection, useIntroDone } from '../components/fx';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import { ArrowRight, CheckCircle2, FileCheck, BookOpenCheck, MapPinned, ShieldCheck, LockKeyhole, History, PenLine, Factory, FlaskConical, Dna, Building2, BriefcaseBusiness, Plug, CodeXml, Headphones, Sparkles, BadgeCheck } from 'lucide-react';

const Home: React.FC = () => {
  const { pathname } = useLocation();
  const introDone = useIntroDone();

  // phones: products are a swipeable carousel with dots
  const carouselRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const carouselStep = () => {
    const el = carouselRef.current;
    const card = el?.children[0] as HTMLElement | undefined;
    return card ? card.offsetWidth + 16 : 1;
  };
  const onCarouselScroll = () => {
    const el = carouselRef.current;
    if (el) setSlide(Math.round(el.scrollLeft / carouselStep()));
  };
  const goToSlide = (i: number) => carouselRef.current?.scrollTo({ left: i * carouselStep(), behavior: 'smooth' });

  // old /about and /contact links land on the matching section
  useEffect(() => {
    const id = pathname.replace('/', '');
    if (id === 'about' || id === 'contact') {
      const t = setTimeout(() => scrollToSection(id, false), 50);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  const products = [
    {
      icon: FileCheck,
      title: "Enterprise QMS + LMS + DMS",
      color: "teal",
      desc: "One connected platform for quality events, training and controlled documents. Manage deviations, CAPA and change control, keep training records current, and control SOPs with versioning and e-signatures.",
      features: ["Deviations, CAPA & Change Control", "Training Records (LMS)", "Document Control (DMS)", "Audit Trail & Reports"],
      link: "https://qms.baserastech.com/"
    },
    {
      icon: BookOpenCheck,
      title: "Pharma eLogbook",
      color: "skyblue",
      desc: "Replace paper logbooks on the shop floor. Record equipment usage, cleaning and production activities digitally, with every entry time-stamped, attributable and reviewable.",
      features: ["Equipment & Cleaning Logs", "Full Audit Trail", "E-Signatures & Review", "ALCOA+ Data Integrity"],
      link: "https://log.baserastech.com/"
    },
    {
      icon: MapPinned,
      title: "Field Pharma",
      color: "teal",
      desc: "Sales force automation for medical representatives. Plan doctor visits, submit daily call reports, track samples and gifts, capture orders, and give managers a live view of every territory.",
      features: ["Doctor Visits & Daily Call Reports", "Sample & Gift Tracking", "Orders & Territory Management", "Manager Dashboards"],
      link: null
    }
  ];

  const compliance = [
    { icon: LockKeyhole, title: "US FDA 21 CFR Part 11", desc: "Electronic records and electronic signatures." },
    { icon: ShieldCheck, title: "EU GMP Annex 11", desc: "Computerised systems in GMP environments." },
    { icon: BriefcaseBusiness, title: "GAMP 5", desc: "Risk-based approach to GxP software." },
    { icon: Factory, title: "Schedule M", desc: "Revised GMP requirements for Indian manufacturers." },
    { icon: History, title: "ALCOA+", desc: "Attributable, legible, contemporaneous, original, accurate data." }
  ];

  const audiences = [
    { icon: Factory, name: "Formulation Manufacturers", desc: "Tablets, capsules, injectables and other finished dosage plants." },
    { icon: FlaskConical, name: "API Manufacturers", desc: "Bulk drug plants with heavy equipment and cleaning records." },
    { icon: Building2, name: "CDMOs & Contract Manufacturers", desc: "Multi-client sites that face frequent customer audits." },
    { icon: Dna, name: "Biotech & Pharma Marketing", desc: "Growing teams that need quality systems and field force tools." }
  ];

  const services = [
    { icon: CodeXml, title: "Custom Pharma Software", desc: "Modules built around your plant's own workflows and SOPs." },
    { icon: PenLine, title: "Validation Support", desc: "Help with requirement specifications and test scripts for your validation team." },
    { icon: Plug, title: "Integrations", desc: "Connect with your existing ERP, LIMS and HR systems." },
    { icon: Headphones, title: "Implementation & Support", desc: "Setup, data migration, user training and ongoing support." }
  ];

  return (
    <div className="overflow-hidden text-white">
      {/* Hero Section */}
      <section id="top" className="relative min-h-[100svh] flex items-center pt-28 pb-12 md:pb-20 md:pt-32 px-6 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-teal/20 blur-[140px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-skyblue/15 blur-[140px] rounded-full pointer-events-none"></div>
        <div className="absolute inset-x-0 bottom-0 h-[45%] overflow-hidden pointer-events-none">
          <div className="grid-floor absolute inset-x-[-50%] top-0 h-[200%]"></div>
        </div>

        <div className="container mx-auto relative z-10 grid xl:grid-cols-2 gap-14 xl:gap-16 items-center">
          <div className="text-center xl:text-left min-w-0">
            <Reveal keepDelay>
              <h1 className="font-display text-5xl md:text-7xl min-[1400px]:text-8xl font-bold tracking-tight leading-[1.02] mb-8" aria-label="Pharma Software. Built for Compliance.">
                <span className="line-mask" aria-hidden="true"><span>Pharma Software.</span></span>
                <span className="line-mask" aria-hidden="true">
                  <span style={{ transitionDelay: '250ms' }}>
                    <ScrambleText className="text-gradient" text="Built for Compliance." start={introDone} delay={400} />
                  </span>
                </span>
              </h1>
            </Reveal>
            <Reveal delay={550} keepDelay>
              <p className="text-xl text-slate-300 max-w-xl mx-auto xl:mx-0 mb-12 font-medium leading-relaxed">
                Quality, production and field force software for pharmaceutical manufacturers.
              </p>
            </Reveal>
            <Reveal delay={800} keepDelay>
              <div className="flex flex-col sm:flex-row items-center justify-center xl:justify-start gap-5">
                <button onClick={() => scrollToSection('contact')} className="group relative cursor-pointer bg-teal hover:bg-teal-hover text-white px-10 py-5 rounded-full font-bold flex items-center whitespace-nowrap transition-all shadow-[0_0_40px_-5px_rgba(31,182,166,.7)] hover:shadow-[0_0_60px_-5px_rgba(31,182,166,.9)]">
                  Request a Demo
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToSection('products')}
                  className="px-10 py-5 rounded-full font-bold whitespace-nowrap glass text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  Explore Products
                </button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={1000} keepDelay className="relative min-w-0 w-full max-w-2xl mx-auto xl:max-w-none">
            <div className="float-y">
              <LiveConsole />
            </div>
            <div className="hidden xl:flex absolute -left-8 -bottom-8 glass rounded-2xl px-4 py-3 items-center gap-3 shadow-xl float-y" style={{ animationDelay: '-2s' }}>
              <BadgeCheck className="w-5 h-5 text-teal" />
              <span className="text-sm font-semibold">e-Signature verified</span>
            </div>
            <div className="hidden xl:flex absolute -right-6 -top-6 glass rounded-2xl px-4 py-3 items-center gap-3 shadow-xl float-y" style={{ animationDelay: '-4s' }}>
              <Sparkles className="w-5 h-5 text-skyblue" />
              <span className="text-sm font-semibold">ALCOA+ data integrity</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="relative py-12 md:py-24 px-6">
        <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none"></div>
        <div className="container mx-auto relative">
          <Reveal className="text-center mb-10 md:mb-14">
            <span className="text-skyblue font-bold tracking-[0.3em] uppercase text-xs">Our Products</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold mt-4">Three Platforms. <span className="text-gradient">One Pharma Focus.</span></h2>
            <p className="text-slate-400 font-medium text-base md:text-lg mt-4 md:mt-6 max-w-2xl mx-auto">From the quality department to the production floor to the field, each product solves one core pharma workflow.</p>
          </Reveal>

          <Reveal>
          <div
            ref={carouselRef}
            onScroll={onCarouselScroll}
            className="carousel no-scrollbar flex md:grid md:grid-cols-1 xl:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0"
          >
            {products.map((p, idx) => (
              <Reveal key={idx} delay={idx * 150} className="h-full shrink-0 w-[86%] md:w-auto snap-center">
                <SpotlightCard className="group rounded-[2rem] p-6 md:p-10 flex flex-col h-full transition-transform duration-500 hover:-translate-y-2">
                  <div className="flex items-start justify-between mb-6 md:mb-8">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-${p.color} blur-2xl opacity-30 group-hover:opacity-60 transition-opacity`}></div>
                      <div className={`relative p-4 rounded-2xl bg-white/5 border border-white/10 text-${p.color}`}>
                        <p.icon className="w-9 h-9" />
                      </div>
                    </div>
                    <span className="num-outline font-display text-6xl font-bold leading-none">0{idx + 1}</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 md:mb-5">{p.title}</h3>
                  <p className="text-slate-400 text-sm md:text-base mb-6 md:mb-8 leading-relaxed">{p.desc}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-3 mb-8 md:mb-10 flex-grow content-start">
                    {p.features.map(f => (
                      <div key={f} className="flex items-start space-x-3 text-slate-200 font-semibold text-sm">
                        <CheckCircle2 className={`w-5 h-5 shrink-0 text-${p.color}`} />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  {p.link ? (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex items-center justify-center gap-2 border border-white/15 hover:border-teal hover:bg-teal/10 text-white px-8 py-4 rounded-full font-bold transition-all"
                    >
                      Try It Out
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <button onClick={() => scrollToSection('contact')} className="group/btn cursor-pointer flex items-center justify-center gap-2 bg-teal hover:bg-teal-hover text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_30px_-8px_rgba(31,182,166,.8)]">
                      Request a Demo
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  )}
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
          {/* carousel dots (phones only) */}
          <div className="flex md:hidden justify-center gap-2 mt-5">
            {products.map((p, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                aria-label={`Show ${p.title}`}
                className={`h-2 rounded-full transition-all duration-300 ${i === slide ? 'w-6 bg-teal' : 'w-2 bg-white/25'}`}
              />
            ))}
          </div>
          </Reveal>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="relative py-12 md:py-24 bg-deep/60 border-y border-white/5 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[300px] bg-teal/10 blur-[120px] rounded-full pointer-events-none"></div>
        <Reveal className="text-center mb-8 md:mb-12 px-6 relative">
          <span className="text-skyblue font-bold tracking-[0.3em] uppercase text-xs">Compliance by Design</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 max-w-4xl mx-auto">Designed to support the regulations you are audited against.</h2>
        </Reveal>

        <div className="marquee relative sm:mb-12 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
          <div className="marquee-track flex w-max gap-4">
            {[...compliance, ...compliance, ...compliance, ...compliance].map((c, idx) => (
              <div key={idx} className="flex items-center gap-3 glass rounded-full px-6 py-3 whitespace-nowrap">
                <c.icon className="w-5 h-5 text-teal" />
                <span className="font-display font-semibold">{c.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 hidden sm:grid sm:grid-cols-2 xl:grid-cols-5 gap-5 relative">
          {compliance.map((c, idx) => (
            <Reveal key={idx} delay={idx * 100} className={`h-full ${idx === compliance.length - 1 ? 'sm:col-span-2 xl:col-span-1' : ''}`}>
              <SpotlightCard className="h-full p-7 rounded-[1.5rem] text-center">
                <c.icon className="w-9 h-9 text-teal mx-auto mb-4" />
                <div className="font-display font-bold text-lg mb-2">{c.title}</div>
                <p className="text-sm text-slate-400">{c.desc}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="relative py-12 md:py-24 px-6">
        <div className="container mx-auto">
          <Reveal className="text-center mb-8 md:mb-12 max-w-2xl mx-auto">
            <span className="text-teal font-bold tracking-[0.3em] uppercase text-xs mb-3 block">Who We Serve</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Built for Pharma Teams in India and Abroad</h2>
            <p className="text-slate-400 font-medium text-base md:text-lg">For Indian manufacturers serving domestic and export markets.</p>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {audiences.map((a, idx) => (
              <Reveal key={idx} delay={idx * 100} className="h-full">
                <SpotlightCard className="group h-full flex flex-col items-center p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] transition-transform duration-500 hover:-translate-y-1">
                  <div className="p-3 sm:p-4 rounded-2xl bg-teal/10 mb-3 sm:mb-6 group-hover:scale-110 group-hover:bg-teal/20 transition-all">
                    <a.icon className="w-7 h-7 sm:w-9 sm:h-9 text-teal" />
                  </div>
                  <span className="font-display font-bold text-sm sm:text-lg text-center sm:mb-3">{a.name}</span>
                  <p className="hidden sm:block text-slate-400 text-sm text-center leading-relaxed">{a.desc}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-12 md:py-24 px-6 bg-deep/60 border-y border-white/5">
        <div className="container mx-auto">
          <Reveal className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-8 md:mb-12 gap-4 md:gap-6">
            <div className="max-w-2xl">
              <span className="text-teal font-bold tracking-[0.3em] uppercase text-xs">Services</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 leading-tight">Beyond the Software.</h2>
            </div>
            <p className="text-slate-400 text-base md:text-lg max-w-sm mb-2">We help you set up, adapt and run our products inside your regulated environment.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-6">
            {services.map((s, idx) => (
              <Reveal key={idx} delay={idx * 100} className="h-full">
                <SpotlightCard className="group h-full p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] flex md:block items-start gap-4">
                  <div className="p-3 md:p-4 bg-white/5 border border-white/10 rounded-2xl w-fit shrink-0 md:mb-7 group-hover:bg-teal group-hover:border-teal transition-colors">
                    <s.icon className="w-7 h-7 text-teal group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg md:text-2xl font-bold mb-1 md:mb-3">{s.title}</h3>
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed">{s.desc}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AboutSection />

      <ContactSection />
    </div>
  );
};

export default Home;
