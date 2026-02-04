import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, ExternalLink, ShieldCheck } from 'lucide-react';

const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const targetEmail = "ceo@baserastech.com";

  const handleManualEmail = () => {
    const subject = encodeURIComponent("Business Inquiry: BASERAS TECH LLP");
    const body = encodeURIComponent("Hello BASERAS TECH Team,\n\nI am interested in your automation services. [Please add your details here].\n\nRegards,");
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="pt-32 pb-24">
      <section className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <span className="text-teal font-black tracking-widest uppercase text-xs mb-4 block">Contact Us</span>
            <h1 className="text-5xl font-black text-navy mt-4 mb-8 leading-tight">Let's solve your bottlenecks.</h1>
            
            <p className="text-slate-600 text-lg mb-12 font-medium leading-relaxed">
              Contact our executive team for a direct consultation on how BASERAS TECH can transform your operational efficiency.
            </p>

            <div className="space-y-6">
              <div 
                className="group p-8 bg-white border border-slate-100 rounded-[2rem] hover:border-teal/30 hover:shadow-xl hover:shadow-teal/5 cursor-pointer transition-all"
                onClick={handleManualEmail}
              >
                <div className="flex items-center space-x-5">
                  <div className="p-4 bg-lightgray rounded-2xl group-hover:bg-teal group-hover:text-white transition-colors">
                    <Mail className="w-8 h-8 text-teal group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-navy text-lg">Direct Email</h4>
                    <p className="text-slate-500 font-medium">{targetEmail}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-white border border-slate-100 rounded-[2rem]">
                <div className="flex items-center space-x-5">
                  <div className="p-4 bg-lightgray rounded-2xl">
                    <Phone className="w-8 h-8 text-skyblue" />
                  </div>
                  <div>
                    <h4 className="font-black text-navy text-lg">Operating Hours</h4>
                    <p className="text-slate-500 font-medium">Mon - Sat: 9 AM - 7 PM IST</p>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-white border border-slate-100 rounded-[2rem]">
                <div className="flex items-center space-x-5">
                  <div className="p-4 bg-lightgray rounded-2xl">
                    <MapPin className="w-8 h-8 text-teal" />
                  </div>
                  <div>
                    <h4 className="font-black text-navy text-lg">HQ Location</h4>
                    <p className="text-slate-500 font-medium">Registered Office, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-navy text-white rounded-[2rem] relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal/10 blur-2xl rounded-full"></div>
              <div className="flex items-center space-x-3 text-skyblue mb-4">
                <ShieldCheck className="w-6 h-6" />
                <span className="font-black uppercase tracking-widest text-xs">Security First</span>
              </div>
              <p className="text-sm text-slate-300 font-medium leading-relaxed">
                Your business data is handled with strict confidentiality. Our systems use enterprise-grade encryption for all inquiries.
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:w-2/3">
            <div className="bg-white border border-slate-100 rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-navy/5 relative">
              <div className="mb-12">
                <h2 className="text-4xl font-black text-navy mb-4">Inquiry Form</h2>
                <p className="text-slate-500 font-medium text-lg">Fill this out and an engineer will contact you shortly.</p>
              </div>

              <form 
                action={`https://formspree.io/f/mnjzkywg`} 
                method="POST" 
                className="space-y-8"
                onSubmit={() => setLoading(true)}
              >
                <input type="hidden" name="_subject" value="New Business Inquiry - BASERAS TECH" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-navy uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      required 
                      name="Full Name" 
                      type="text" 
                      placeholder="Jane Doe" 
                      className="w-full bg-lightgray border-2 border-transparent focus:bg-white focus:border-teal rounded-2xl px-6 py-5 text-navy font-bold focus:outline-none transition-all placeholder:text-slate-400" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-navy uppercase tracking-widest ml-1">Organization</label>
                    <input 
                      name="Organization" 
                      type="text" 
                      placeholder="Your Company" 
                      className="w-full bg-lightgray border-2 border-transparent focus:bg-white focus:border-teal rounded-2xl px-6 py-5 text-navy font-bold focus:outline-none transition-all placeholder:text-slate-400" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-navy uppercase tracking-widest ml-1">Work Email</label>
                    <input 
                      required 
                      name="email" 
                      type="email" 
                      placeholder="jane@company.com" 
                      className="w-full bg-lightgray border-2 border-transparent focus:bg-white focus:border-teal rounded-2xl px-6 py-5 text-navy font-bold focus:outline-none transition-all placeholder:text-slate-400" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-navy uppercase tracking-widest ml-1">Phone Number</label>
                    <input 
                      name="Phone" 
                      type="tel" 
                      placeholder="+91" 
                      className="w-full bg-lightgray border-2 border-transparent focus:bg-white focus:border-teal rounded-2xl px-6 py-5 text-navy font-bold focus:outline-none transition-all placeholder:text-slate-400" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-navy uppercase tracking-widest ml-1">How can we automate your business?</label>
                  <textarea 
                    required 
                    name="message" 
                    rows={4} 
                    placeholder="Describe your technical requirements..." 
                    className="w-full bg-lightgray border-2 border-transparent focus:bg-white focus:border-teal rounded-2xl px-6 py-5 text-navy font-bold focus:outline-none transition-all resize-none placeholder:text-slate-400"
                  ></textarea>
                </div>

                <input type="text" name="_gotcha" className="hidden" />

                <div className="flex flex-col space-y-6 pt-4">
                  <button 
                    disabled={loading}
                    type="submit" 
                    className={`w-full bg-teal hover:bg-teal-hover text-white font-black py-6 rounded-2xl flex items-center justify-center space-x-3 transition-all shadow-xl shadow-teal/30 active:scale-95 text-lg ${loading ? 'opacity-70' : ''}`}
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;