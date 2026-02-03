import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FlaskConical, GraduationCap, Dumbbell, ClipboardCheck, Rocket, Code2, Smartphone, Cpu, Settings, Headphones, Store } from 'lucide-react';

const Home: React.FC = () => {
  const scrollToSolutions = () => {
    const element = document.getElementById('solutions');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const coreServices = [
    { icon: Code2, title: "Custom Software", desc: "Tailored applications built from the ground up to match your unique business processes." },
    { icon: Smartphone, title: "Web Apps", desc: "Modern, responsive web applications using the latest frameworks for speed and reliability." },
    { icon: Cpu, title: "Business Automation", desc: "End-to-end automation of manual workflows to reduce errors and save operational costs." },
    { icon: Settings, title: "Compliance Systems", desc: "Systems designed specifically for audit trails, validation, and regulatory compliance (Pharma focus)." },
    { icon: Headphones, title: "Maintenance", desc: "Ongoing 24/7 technical support and maintenance to keep your operations running smooth." }
  ];

  const industryVerticals = [
    { icon: FlaskConical, name: "Pharma & Biotech", color: "teal", desc: "Specialized in 21 CFR Part 11 compliance systems." },
    { icon: GraduationCap, name: "Edu-Tech Systems", color: "skyblue", desc: "Comprehensive management for modern campuses." },
    { icon: Dumbbell, name: "Fitness & Wellness", color: "teal", desc: "Membership and biometric sync solutions." },
    { icon: Store, name: "Retail & SME", color: "skyblue", desc: "Billing and inventory with automated GST compliance." }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 px-6 bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-skyblue/5 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal/5 blur-[120px] rounded-full -z-10"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-skyblue/10 border border-skyblue/20 text-skyblue font-bold text-xs uppercase tracking-widest mb-10 animate-in fade-in slide-in-from-bottom-4">
            <Rocket className="w-4 h-4" />
            <span>Scale with Engineering Excellence</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 text-navy animate-in fade-in slide-in-from-bottom-8 duration-700">
            Smart Software. <br /> <span className="text-teal">Real Results.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
            Reliable, advanced systems engineered for Pharmaceutical, Education, and growing SME sectors. We automate the complex so you can grow faster.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-in fade-in slide-in-from-bottom-16 duration-700 delay-300">
            <button 
              onClick={scrollToSolutions}
              className="group bg-teal hover:bg-teal-hover text-white px-10 py-5 rounded-full font-bold flex items-center transition-all shadow-xl shadow-teal/20 cursor-pointer"
            >
              Explore Solutions
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link to="/contact" className="px-10 py-5 rounded-full font-bold border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="py-16 bg-navy text-white px-6">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-black text-skyblue mb-2">99%</div>
            <div className="text-sm font-bold uppercase tracking-widest opacity-60">Uptime</div>
          </div>
          <div>
            <div className="text-4xl font-black text-teal mb-2">15+</div>
            <div className="text-sm font-bold uppercase tracking-widest opacity-60">Industries</div>
          </div>
          <div>
            <div className="text-4xl font-black text-skyblue mb-2">24/7</div>
            <div className="text-sm font-bold uppercase tracking-widest opacity-60">Support</div>
          </div>
          <div>
            <div className="text-4xl font-black text-teal mb-2">Secure</div>
            <div className="text-sm font-bold uppercase tracking-widest opacity-60">Compliance</div>
          </div>
        </div>
      </section>

      {/* Engineering Capabilities (Services Section) */}
      <section id="services" className="py-32 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-6">
            <div className="max-w-2xl">
              <span className="text-teal font-bold tracking-widest uppercase text-sm">Our Expertise</span>
              <h2 className="text-4xl md:text-5xl font-black text-navy mt-4 leading-tight">Comprehensive Software Engineering.</h2>
            </div>
            <p className="text-slate-500 text-lg max-w-sm mb-2">We combine deep domain expertise with cutting-edge software architecture to solve real-world industry bottlenecks.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {coreServices.map((s, idx) => (
              <div key={idx} className="bg-white p-12 rounded-[2.5rem] border border-slate-200 hover:shadow-2xl hover:shadow-navy/5 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-skyblue/5 rounded-full translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform"></div>
                <div className="p-4 bg-lightgray rounded-2xl w-fit mb-8 group-hover:bg-teal group-hover:text-white transition-colors">
                  <s.icon className="w-8 h-8 text-teal group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-black text-navy mb-4">{s.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{s.desc}</p>
              </div>
            ))}
            
            <div className="bg-navy p-12 rounded-[2.5rem] flex flex-col justify-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal/20 blur-3xl rounded-full"></div>
              <h3 className="text-2xl font-black mb-4 relative z-10">Custom Project?</h3>
              <p className="mb-8 text-slate-300 font-medium relative z-10">We specialize in solving unique logic challenges that standard software can't handle.</p>
              <Link to="/contact" className="bg-teal hover:bg-teal-hover text-white px-8 py-4 rounded-full font-black text-center relative z-10 shadow-lg shadow-teal/30 transition-all active:scale-95">
                Start Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Verticals Section */}
      <section className="bg-white py-32 px-6 border-y border-slate-100">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <span className="text-skyblue font-bold tracking-widest uppercase text-xs mb-3 block">Verticals</span>
            <h2 className="text-4xl font-black text-navy mb-4">Core Industry Specialization</h2>
            <p className="text-slate-500 font-medium text-lg">Deep domain knowledge for specialized software needs.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {industryVerticals.map((ind, idx) => (
              <div key={idx} className="flex flex-col items-center p-12 bg-lightgray rounded-[2.5rem] border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-xl transition-all group">
                <ind.icon className={`w-14 h-14 text-${ind.color} mb-8 group-hover:scale-110 transition-transform`} />
                <span className="font-black text-navy text-xl text-center uppercase tracking-tight mb-4">{ind.name}</span>
                <p className="text-slate-500 text-sm text-center font-medium leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Portfolio Section */}
      <section id="solutions" className="py-32 px-6 bg-lightgray relative">
        <div className="container mx-auto">
          <div className="text-center mb-24">
            <span className="text-skyblue font-bold tracking-widest uppercase text-sm">Portfolio</span>
            <h2 className="text-4xl md:text-6xl font-black text-navy mt-4">Industry-Ready Platforms.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { 
                icon: FlaskConical, 
                title: "Pharma eLogBook", 
                color: "skyblue",
                desc: "Validated digital logging system for pharmaceutical production. 21 CFR Part 11 compliant and audit-ready out of the box.",
                features: ["Compliance Validated", "Full Audit Trail", "E-Signatures"]
              },
              { 
                icon: ClipboardCheck, 
                title: "GST Billing & Inventory", 
                color: "teal",
                desc: "Real-time stock tracking and automated GST compliance for distributors and retailers. Lightning fast and secure.",
                features: ["Auto GST Filing", "Stock Thresholds", "Cloud Backup"]
              },
              { 
                icon: GraduationCap, 
                title: "EduCore School CMS", 
                color: "skyblue",
                desc: "A total campus management system connecting students, parents, and administrative staff seamlessly.",
                features: ["Student Portals", "Fee Automation", "Virtual Classrooms"]
              },
              { 
                icon: Dumbbell, 
                title: "FlexGym Management", 
                color: "teal",
                desc: "Streamline memberships, trainer schedules, and biometric entries for high-traffic fitness centers.",
                features: ["Biometric Sync", "Recurring Billing", "Member App"]
              }
            ].map((p, idx) => (
              <div key={idx} className="group bg-white p-10 md:p-14 rounded-[3rem] border border-slate-200 hover:border-teal/30 transition-all flex flex-col h-full shadow-sm hover:shadow-xl">
                <div className="flex items-center space-x-5 mb-8">
                  <div className={`p-5 rounded-3xl bg-lightgray shadow-sm text-${p.color}`}>
                    <p.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-black text-navy">{p.title}</h3>
                </div>
                <p className="text-slate-600 text-lg mb-10 leading-relaxed font-medium flex-grow">{p.desc}</p>
                <div className="space-y-4">
                  {p.features.map(f => (
                    <div key={f} className="flex items-center space-x-3 text-navy font-bold">
                      <CheckCircle2 className={`w-6 h-6 text-${p.color}`} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto">
          <div className="bg-navy rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-navy/20">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/10 blur-[100px] rounded-full translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-skyblue/10 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4"></div>
            
            <h2 className="text-4xl md:text-6xl font-black mb-8 text-white relative z-10 leading-tight">Ready to build your <br className="hidden md:block" /> future system?</h2>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-medium relative z-10">
              Get in touch with our engineering team today for a comprehensive consultation and project roadmap.
            </p>
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/contact" className="bg-teal hover:bg-teal-hover text-white px-12 py-6 rounded-full font-black text-xl transition-all shadow-xl shadow-teal/20 active:scale-95">
                Start Consultation
              </Link>
              <Link to="/about" className="text-white hover:text-skyblue transition-colors font-bold text-lg underline underline-offset-8">
                More About Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;