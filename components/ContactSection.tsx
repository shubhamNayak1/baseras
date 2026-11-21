import React, { useState } from 'react';
import { Mail, Clock, Send, ShieldCheck, MessageCircle, ArrowUpRight } from 'lucide-react';
import { Reveal, SpotlightCard } from './fx';

const fieldClass = "w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:bg-white/[0.07] focus:border-teal focus:shadow-[0_0_0_4px_rgba(31,182,166,.15)] rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none transition-all placeholder:text-slate-500";
const labelClass = "text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1";

const ContactSection: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const targetEmail = "info@baserastech.com";

  const handleManualEmail = () => {
    const subject = encodeURIComponent("Business Inquiry: BASERAS TECH PRIVATE LIMITED");
    const body = encodeURIComponent("Hello BASERAS TECH Team,\n\nI would like a demo of your pharma software. [Please add your details here].\n\nRegards,");
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-deep/60 border-t border-white/5 py-14 md:py-8 px-6">
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none"></div>
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-teal/15 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 -right-40 w-[600px] h-[600px] bg-skyblue/10 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 lg:items-center">
          {/* Sidebar */}
          <div className="lg:w-5/12 min-w-0">
            <Reveal>
              <span className="text-teal font-bold tracking-[0.3em] uppercase text-xs mb-3 block">Book a Demo</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 leading-[1.05]">
                See it working <span className="text-gradient">for your plant.</span>
              </h2>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Tell us about your site and which product interests you. We will set up a live demo of our QMS, eLogbook or Field Pharma software, tailored to your processes.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              <Reveal delay={100}>
                <button type="button" onClick={handleManualEmail} className="w-full text-left cursor-pointer">
                  <SpotlightCard className="group px-5 py-3.5 rounded-[1.25rem] flex items-center gap-4">
                    <div className="p-2.5 bg-teal/10 border border-teal/20 rounded-2xl group-hover:bg-teal transition-colors">
                      <Mail className="w-5 h-5 text-teal group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-display font-bold">Direct Email</h4>
                      <p className="text-slate-400 text-sm truncate">{targetEmail}</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-teal transition-colors shrink-0" />
                  </SpotlightCard>
                </button>
              </Reveal>

              <Reveal delay={200}>
                <a href="https://baserastech.com/whatsapp" target="_blank" rel="noopener noreferrer" className="block">
                  <SpotlightCard className="group px-5 py-3.5 rounded-[1.25rem] flex items-center gap-4">
                    <div className="p-2.5 bg-emerald-400/10 border border-emerald-400/20 rounded-2xl group-hover:bg-emerald-500 transition-colors">
                      <MessageCircle className="w-5 h-5 text-emerald-400 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-display font-bold">Chat on WhatsApp</h4>
                      <p className="text-slate-400 text-sm">We’re just a message away. Let’s talk.</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0" />
                  </SpotlightCard>
                </a>
              </Reveal>

              <Reveal delay={300} className="sm:col-span-2 lg:col-span-1">
                <SpotlightCard className="px-5 py-3.5 rounded-[1.25rem] flex items-center gap-4">
                  <div className="p-2.5 bg-skyblue/10 border border-skyblue/20 rounded-2xl">
                    <Clock className="w-5 h-5 text-skyblue" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold">Operating Hours</h4>
                    <p className="text-slate-400 text-sm">Mon - Sat: 9 AM - 7 PM IST</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            </div>

            <Reveal delay={400}>
              <div className="mt-3 px-5 py-4 rounded-[1.25rem] border border-teal/20 bg-teal/[0.06] relative overflow-hidden">
                <div className="flex items-center space-x-3 text-teal mb-1.5">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-[0.2em] text-xs">Security First</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Your business data is handled with strict confidentiality. Our systems use enterprise-grade encryption for all inquiries.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Form Card */}
          <div className="lg:w-7/12 min-w-0">
            <Reveal delay={150}>
              <div className="conic-border rounded-[2.5rem] p-[2px] shadow-[0_0_80px_-20px_rgba(31,182,166,.6)]">
              <div className="conic-inner bg-ink rounded-[calc(2.5rem-2px)] p-7 md:px-8 md:py-7 relative overflow-hidden">
                <div className="mb-5">
                  <h2 className="font-display text-2xl md:text-3xl font-bold mb-1.5">Demo Request</h2>
                  <p className="text-slate-400 text-sm">Fill this out and our team will contact you to schedule a demo.</p>
                </div>

                <form
                  action={`https://formspree.io/f/mnjzkywg`}
                  method="POST"
                  className="space-y-3.5"
                  onSubmit={() => setLoading(true)}
                >
                  <input type="hidden" name="_subject" value="New Demo Request - BASERAS TECH" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <label className={labelClass}>Full Name</label>
                      <input required name="Full Name" type="text" placeholder="Jane Doe" className={fieldClass} />
                    </div>
                    <div className="space-y-1.5">
                      <label className={labelClass}>Organization</label>
                      <input name="Organization" type="text" placeholder="Your Company" className={fieldClass} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <label className={labelClass}>Work Email</label>
                      <input required name="email" type="email" placeholder="jane@company.com" className={fieldClass} />
                    </div>
                    <div className="space-y-1.5">
                      <label className={labelClass}>Phone Number</label>
                      <input name="Phone" type="tel" placeholder="+91" className={fieldClass} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className={labelClass}>Product of Interest</label>
                    <select
                      name="Product"
                      defaultValue="Enterprise QMS + LMS + DMS"
                      className={`${fieldClass} [&>option]:bg-deep [&>option]:text-white`}
                    >
                      <option>Enterprise QMS + LMS + DMS</option>
                      <option>Pharma eLogbook</option>
                      <option>Field Pharma</option>
                      <option>Custom Pharma Software</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className={labelClass}>Tell us about your requirements</label>
                    <textarea
                      required
                      name="message"
                      rows={3}
                      placeholder="Site type, number of users, current process (paper / other software)..."
                      className={`${fieldClass} resize-none`}
                    ></textarea>
                  </div>

                  <input type="text" name="_gotcha" className="hidden" />

                  <div className="pt-1">
                    <button
                      disabled={loading}
                      type="submit"
                      className={`group w-full bg-teal hover:bg-teal-hover text-white font-bold py-3.5 rounded-xl flex items-center justify-center space-x-3 transition-all shadow-[0_0_40px_-8px_rgba(31,182,166,.8)] hover:shadow-[0_0_60px_-8px_rgba(31,182,166,1)] active:scale-[.98] ${loading ? 'opacity-70' : ''}`}
                    >
                      {loading ? (
                        <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>Request Demo</span>
                          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
