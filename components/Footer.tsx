import React from 'react';
import { Cpu, Mail, Globe, ShieldCheck, MessageCircle , Notebook } from 'lucide-react';
import { scrollToSection } from './fx';

const linkClass = "text-slate-400 hover:text-skyblue transition-colors font-medium";

const otherProducts = [
  { title: "GST Billing & Inventory", link: "https://billing.baserastech.com/" },
  { title: "EduCore School CMS", link: "https://college.baserastech.com/" },
  { title: "Free Online Tools", link: "https://baserastechtools.com/" }
];


const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-ink/90 backdrop-blur-sm text-white pt-14 md:pt-20 pb-8 md:pb-10 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-8 sm:gap-10 xl:gap-12 mb-10 md:mb-16">
          <div className="col-span-2 sm:col-span-3 xl:col-span-2">
            <button onClick={() => scrollToSection('top')} className="flex items-center space-x-2 mb-6 cursor-pointer text-left">
              <div className="p-2 bg-teal rounded-lg">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight uppercase">BASERAS TECH PRIVATE LIMITED</span>
            </button>
            <p className="text-slate-300 max-w-sm mb-6 leading-relaxed">
              Pharma software for quality, production and field teams: Enterprise QMS + LMS + DMS, Pharma eLogbook and Field Pharma.
            </p>
            <div className="flex items-center space-x-3 text-skyblue">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm font-semibold">Reliable Advanced Systems</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 md:mb-8 uppercase text-sm tracking-widest">Navigation</h4>
            <ul className="space-y-3 md:space-y-4">
              <li><button onClick={() => scrollToSection('products')} className={`${linkClass} cursor-pointer`}>Products</button></li>
              <li><button onClick={() => scrollToSection('about')} className={`${linkClass} cursor-pointer`}>About Us</button></li>
              <li><button onClick={() => scrollToSection('contact')} className={`${linkClass} cursor-pointer`}>Book a Demo</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 md:mb-8 uppercase text-sm tracking-widest">Other Products</h4>
            <ul className="space-y-3 md:space-y-4">
              {otherProducts.map(o => (
                <li key={o.link}><a href={o.link} target="_blank" rel="noopener noreferrer" className={linkClass}>{o.title}</a></li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-white font-bold mb-4 md:mb-8 uppercase text-sm tracking-widest">Support</h4>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-center space-x-3 text-slate-400">
                <Mail className="w-4 h-4 text-skyblue" />
                <span className="font-medium">info@baserastech.com</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-400">
                <Globe className="w-4 h-4 text-skyblue" />
                <span className="font-medium">www.baserastech.com</span>
              </li>
              {/* WhatsApp */}
              <li>
                <a
                  href="https://baserastech.com/whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-slate-400 hover:text-green-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-green-400" />
                  <span className="font-medium">Chat on WhatsApp</span>
                </a>
              </li>
              <li>
              </li>
              <a
                href="https://www.linkedin.com/company/baserastech"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Notebook className="w-5 h-5 text-blue-500" />
                <span className="font-medium">Follow us on LinkedIn</span>
              </a>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>© {new Date().getFullYear()} BASERAS TECH PRIVATE LIMITED. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-skyblue transition-colors">Privacy</a>
            <a href="#" className="hover:text-skyblue transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;