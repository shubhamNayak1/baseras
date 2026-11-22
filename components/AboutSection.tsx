import React from 'react';
import { Target, Eye, ShieldCheck, Heart, Zap, Search } from 'lucide-react';
import { Reveal, SpotlightCard } from './fx';

const principles = [
  { icon: ShieldCheck, title: "Compliance First", desc: "Audit trails, e-signatures and data integrity are built in from the start, not added later." },
  { icon: Heart, title: "Simplicity", desc: "Screens that operators, QA staff and medical reps can use with minimal training." },
  { icon: Zap, title: "Pharma Focus", desc: "We work only in pharma, so our products follow how your teams actually work." },
  { icon: Search, title: "Data Security", desc: "Role-based access and secure handling of your quality and commercial data." }
];

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-12 md:py-24 px-6 overflow-hidden">
      <div className="absolute -left-40 top-1/4 w-[500px] h-[500px] bg-teal/10 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="container mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-8 md:mb-12">
          {/* Intro */}
          <div className="min-w-0">
            <Reveal>
              <span className="text-teal font-bold tracking-[0.3em] uppercase text-xs mb-4 block">About Us</span>
              <h2 className="font-display text-4xl md:text-6xl font-bold mt-4 mb-6 md:mb-8 leading-[1.05]">
                Software Built <span className="text-gradient">for Pharma.</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <div className="space-y-4 md:space-y-5 text-slate-300 text-base md:text-lg leading-relaxed">
                <p>
                  BASERAS TECH PRIVATE LIMITED is a pharma software company. We build quality management, eLogbook and field force software for pharmaceutical manufacturers in India and for companies serving export markets.
                </p>
                <p>
                  We focus on one industry so we can understand its workflows and regulations deeply: <span className="text-teal font-semibold">compliance-ready software for every pharma team, from the quality department to the field.</span>
                </p>
              </div>
            </Reveal>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 gap-3 md:gap-5 min-w-0">
            <Reveal delay={100}>
              <SpotlightCard className="rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 flex gap-4 md:gap-6 items-start">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-teal blur-2xl opacity-30"></div>
                  <div className="relative p-4 bg-teal/10 border border-teal/20 rounded-2xl">
                    <Target className="w-8 h-8 text-teal" />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-1 md:mb-2">Our Mission</h3>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    To help pharma companies move from paper to reliable digital systems that are simple to use and ready for audits.
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
            <Reveal delay={250}>
              <SpotlightCard className="rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 flex gap-4 md:gap-6 items-start">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-skyblue blur-2xl opacity-30"></div>
                  <div className="relative p-4 bg-skyblue/10 border border-skyblue/20 rounded-2xl">
                    <Eye className="w-8 h-8 text-skyblue" />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-1 md:mb-2">Our Vision</h3>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    To be the trusted software partner for pharmaceutical manufacturers in India and the markets they serve.
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {principles.map((value, idx) => (
            <Reveal key={idx} delay={idx * 100} className="h-full">
              <SpotlightCard className="group h-full p-4 sm:p-7 rounded-[1.25rem] sm:rounded-[1.5rem]">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl w-fit mb-3 sm:mb-5 group-hover:bg-teal group-hover:border-teal transition-colors">
                  <value.icon className="w-6 h-6 text-teal group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display text-base sm:text-xl font-bold sm:mb-2">{value.title}</h3>
                <p className="hidden sm:block text-slate-400 text-sm leading-relaxed">{value.desc}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
