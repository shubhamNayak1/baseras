import React from 'react';
import { Target, Eye, ShieldCheck, Heart, Zap, Search } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-24">
      {/* Intro */}
      <section className="container mx-auto px-6 mb-32">
        <div className="max-w-4xl">
          <span className="text-teal font-black tracking-widest uppercase text-xs mb-4 block">About the LLP</span>
          <h1 className="text-5xl md:text-7xl font-black text-navy mt-4 mb-10 leading-tight">Engineering Growth via Automation.</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-600 text-xl font-medium leading-relaxed">
            <p>
              BASERAS TECH LLP is an IT services powerhouse focused on building automation-driven, reliable software for critical industries. 
            </p>
            <p>
              Our name represents our DNA: <span className="text-teal font-bold italic">Business Automation & Software Engineering – Reliable Advanced System TECH.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-32 mb-32 border-y border-slate-100 relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-teal/5 blur-[100px] rounded-full"></div>
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="p-6 bg-teal/10 rounded-[2rem] mb-8">
              <Target className="w-12 h-12 text-teal" />
            </div>
            <h2 className="text-4xl font-black text-navy mb-6">Our Mission</h2>
            <p className="text-slate-600 text-lg font-medium leading-relaxed">
              To dismantle operational inefficiency using high-speed engineering and intelligent automation tools.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="p-6 bg-skyblue/10 rounded-[2rem] mb-8">
              <Eye className="w-12 h-12 text-skyblue" />
            </div>
            <h2 className="text-4xl font-black text-navy mb-6">Our Vision</h2>
            <p className="text-slate-600 text-lg font-medium leading-relaxed">
              To be the globally recognized standard for software systems in regulated and mission-critical service sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-navy mb-4">Core Principles</h2>
          <p className="text-slate-500 font-medium">What drives us to build better software every day.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: "Reliability", desc: "Software that never stops working, ensuring your business stays active 24/7." },
            { icon: Heart, title: "Simplicity", desc: "Complex problems solved with incredibly simple and clean user experiences." },
            { icon: Zap, title: "Innovation", desc: "We stay at the edge of the stack to give your business an engineering advantage." },
            { icon: Search, title: "Security", desc: "Enterprise-level protection for your most sensitive operational data." }
          ].map((value, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-teal/5 transition-all text-center group">
              <div className="p-4 bg-lightgray rounded-2xl w-fit mx-auto mb-8 group-hover:bg-navy group-hover:text-white transition-colors">
                <value.icon className="w-8 h-8 text-teal group-hover:text-skyblue" />
              </div>
              <h3 className="text-2xl font-black text-navy mb-4">{value.title}</h3>
              <p className="text-slate-500 font-medium">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;