import React from 'react';
import { Code2, Smartphone, Cpu, Settings, Headphones, FlaskConical, GraduationCap, Dumbbell, Store, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const services = [
    { icon: Code2, title: "Custom Software", desc: "Tailored applications built from the ground up to match your unique business processes." },
    { icon: Smartphone, title: "Web Apps", desc: "Modern, responsive web applications using the latest frameworks for speed and reliability." },
    { icon: Cpu, title: "Business Automation", desc: "End-to-end automation of manual workflows to reduce errors and save operational costs." },
    { icon: Settings, title: "Compliance Systems", desc: "Systems designed specifically for audit trails, validation, and regulatory compliance (Pharma focus)." },
    { icon: Headphones, title: "Maintenance", desc: "Ongoing 24/7 technical support and maintenance to keep your operations running smooth." }
  ];

  return (
    <div className="pt-32 pb-24">
      {/* Header */}
      <section className="container mx-auto px-6 mb-24">
        <div className="text-center max-w-4xl mx-auto">
          <span className="text-skyblue font-black tracking-widest uppercase text-xs mb-4 block">Expertise</span>
          <h1 className="text-5xl md:text-7xl font-black text-navy mt-4 mb-8">Engineering Excellence.</h1>
          <p className="text-slate-600 text-xl font-medium leading-relaxed">
            We deliver end-to-end software solutions that solve real-world industry bottlenecks through superior architecture and design.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((s, idx) => (
            <div key={idx} className="bg-white p-12 rounded-[3rem] border border-slate-100 hover:shadow-2xl transition-all group">
              <div className="p-5 bg-lightgray rounded-[2rem] w-fit mb-10 group-hover:bg-teal transition-colors">
                <s.icon className="w-10 h-10 text-teal group-hover:text-white" />
              </div>
              <h3 className="text-3xl font-black text-navy mb-6">{s.title}</h3>
              <p className="text-slate-500 text-lg font-medium leading-relaxed mb-8">{s.desc}</p>
              <Link to="/contact" className="inline-flex items-center text-teal font-black uppercase text-sm tracking-widest group-hover:underline underline-offset-4">
                Inquire <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          ))}
          
          <div className="bg-navy p-12 rounded-[3rem] flex flex-col justify-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal/20 blur-3xl rounded-full"></div>
            <h3 className="text-3xl font-black mb-6 relative z-10">Custom Project?</h3>
            <p className="mb-10 text-slate-300 text-lg font-medium relative z-10">We specialize in solving unique logic challenges that standard software can't handle.</p>
            <Link to="/contact" className="bg-teal hover:bg-teal-hover text-white px-8 py-4 rounded-full font-black text-center relative z-10 shadow-lg shadow-teal/30 active:scale-95 transition-all">
              Start Project Inquiry
            </Link>
          </div>
        </div>
      </section>

      {/* Verticals */}
      <section className="bg-white py-32 border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-navy mb-4">Core Industry Verticals</h2>
            <p className="text-slate-500 font-medium text-lg">Deep domain knowledge for specialized software needs.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FlaskConical, name: "Pharma & Biotech", color: "teal" },
              { icon: GraduationCap, name: "Edu-Tech Systems", color: "skyblue" },
              { icon: Dumbbell, name: "Fitness & Wellness", color: "teal" },
              { icon: Store, name: "Retail & SME", color: "skyblue" }
            ].map((ind, idx) => (
              <div key={idx} className="flex flex-col items-center p-12 bg-lightgray rounded-[2.5rem] border border-transparent hover:border-slate-200 hover:bg-white transition-all">
                <ind.icon className={`w-14 h-14 text-${ind.color} mb-8`} />
                <span className="font-black text-navy text-xl text-center uppercase tracking-tight">{ind.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;