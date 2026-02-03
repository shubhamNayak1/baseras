import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Mail, Globe, ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="p-2 bg-teal rounded-lg">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight uppercase">BASERAS TECH LLP</span>
            </Link>
            <p className="text-slate-300 max-w-sm mb-6 leading-relaxed">
              Reliable software engineering and business automation solutions. Specialized systems for Pharma, Education, and growing SMEs.
            </p>
            <div className="flex items-center space-x-3 text-skyblue">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm font-semibold">Reliable Advanced Systems</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase text-sm tracking-widest">Navigation</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-slate-400 hover:text-skyblue transition-colors font-medium">Home</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-skyblue transition-colors font-medium">About Us</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-skyblue transition-colors font-medium">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase text-sm tracking-widest">Support</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-slate-400">
                <Mail className="w-4 h-4 text-skyblue" />
                <span className="font-medium">ceo@baserastech.com</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-400">
                <Globe className="w-4 h-4 text-skyblue" />
                <span className="font-medium">www.baserastech.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>© {new Date().getFullYear()} BASERAS TECH LLP. All rights reserved.</p>
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