import React, { useState, useEffect } from 'react';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement 
} from 'chart.js';

// Register Chart.js elements globally
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement
);

// Utilities & Components
import Sidebar, { calculatorsList } from './components/Sidebar';
import Header from './components/Header';
import { injectCalculatorSchema } from './utils/schema';

// Calculators
import EmiCalculator from './components/calculators/EmiCalculator';
import EligibilityCalculator from './components/calculators/EligibilityCalculator';
import PpfCalculator from './components/calculators/PpfCalculator';
import PfCalculator from './components/calculators/PfCalculator';
import SipCalculator from './components/calculators/SipCalculator';
import FdCalculator from './components/calculators/FdCalculator';
import RdCalculator from './components/calculators/RdCalculator';
import NpsCalculator from './components/calculators/NpsCalculator';
import RetirementCalculator from './components/calculators/RetirementCalculator';
import TaxCalculator from './components/calculators/TaxCalculator';
import MutualFundCalculator from './components/calculators/MutualFundCalculator';
import CompoundCalculator from './components/calculators/CompoundCalculator';

// Static Info Pages
import Dashboard from './components/pages/Dashboard';
import AboutUs from './components/pages/AboutUs';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import ContactUs from './components/pages/ContactUs';
import Blogs from './components/pages/Blogs';

const validRoutes = [...calculatorsList.map(c => c.id), 'home', 'about', 'privacy', 'contact', 'blogs'];

const staticPages = {
  home: { name: 'Home / Dashboard' },
  about: { name: 'About Us' },
  privacy: { name: 'Privacy Policy' },
  contact: { name: 'Contact Us' },
  blogs: { name: 'Finance Guides' }
};

const relatedMap = {
  tax: ['sip', 'ppf', 'retirement'],
  emi: ['eligibility', 'compound', 'tax'],
  eligibility: ['emi', 'compound', 'fd'],
  ppf: ['pf', 'nps', 'sip'],
  pf: ['ppf', 'nps', 'retirement'],
  sip: ['mutualfund', 'compound', 'ppf'],
  fd: ['rd', 'ppf', 'compound'],
  rd: ['fd', 'ppf', 'compound'],
  nps: ['retirement', 'pf', 'sip'],
  retirement: ['nps', 'pf', 'ppf'],
  mutualfund: ['sip', 'compound', 'ppf'],
  compound: ['sip', 'fd', 'rd']
};

export default function App() {
  // Read initial calculator from URL query parameter, fallback to 'home' (Dashboard)
  const [activeCalc, setActiveCalc] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const urlCalc = params.get('calc');
    return (urlCalc && validRoutes.includes(urlCalc)) ? urlCalc : 'home';
  });
  const [resultText, setResultText] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Dynamically update SEO tags, schema, and URL query params when active calculator changes
  useEffect(() => {
    injectCalculatorSchema(activeCalc);
    
    // Update URL query parameters without page reload
    const params = new URLSearchParams(window.location.search);
    if (params.get('calc') !== activeCalc) {
      params.set('calc', activeCalc);
      window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    }
  }, [activeCalc]);

  // Listen to browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const urlCalc = params.get('calc');
      if (urlCalc && validRoutes.includes(urlCalc)) {
        setActiveCalc(urlCalc);
      } else {
        setActiveCalc('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const activeDetails = calculatorsList.find(calc => calc.id === activeCalc) || staticPages[activeCalc] || staticPages['home'];

  const renderActiveCalculator = () => {
    switch (activeCalc) {
      case 'home':
        return <Dashboard setActiveCalculator={setActiveCalc} />;
      case 'about':
        return <AboutUs />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'contact':
        return <ContactUs />;
      case 'emi':
        return <EmiCalculator setResultText={setResultText} />;
      case 'eligibility':
        return <EligibilityCalculator setResultText={setResultText} />;
      case 'ppf':
        return <PpfCalculator setResultText={setResultText} />;
      case 'pf':
        return <PfCalculator setResultText={setResultText} />;
      case 'sip':
        return <SipCalculator setResultText={setResultText} />;
      case 'fd':
        return <FdCalculator setResultText={setResultText} />;
      case 'rd':
        return <RdCalculator setResultText={setResultText} />;
      case 'nps':
        return <NpsCalculator setResultText={setResultText} />;
      case 'retirement':
        return <RetirementCalculator setResultText={setResultText} />;
      case 'tax':
        return <TaxCalculator setResultText={setResultText} />;
      case 'mutualfund':
        return <MutualFundCalculator setResultText={setResultText} />;
      case 'compound':
        return <CompoundCalculator setResultText={setResultText} />;
      case 'blogs':
        return <Blogs setActiveCalculator={setActiveCalc} />;
      default:
        return <Dashboard setActiveCalculator={setActiveCalc} />;
    }
  };

  return (
    <div className="app-container-layout">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeCalculator={activeCalc} 
        setActiveCalculator={setActiveCalc} 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Layout */}
      <main className="main-content-layout">
        {/* Header Section */}
        <Header 
          activeCalculatorName={activeDetails.name} 
          activeCalculatorId={activeCalc} 
          calculatorResultText={resultText} 
          activeCalculator={activeCalc}
          setActiveCalculator={setActiveCalc}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Dynamic Calculator Component */}
        {renderActiveCalculator()}

        {/* Dynamic Related Tools Panel (Only visible on Calculator pages) */}
        {calculatorsList.some(c => c.id === activeCalc) && relatedMap[activeCalc] && (
          <div className="related-tools-container no-print">
            <h3 className="related-tools-title">Explore Related Tools</h3>
            <div className="related-tools-grid">
              {calculatorsList
                .filter(c => relatedMap[activeCalc].includes(c.id))
                .map(calc => {
                  const Icon = calc.icon;
                  return (
                    <div 
                      key={calc.id} 
                      className="related-tool-card"
                      onClick={() => {
                        setActiveCalc(calc.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <div className="related-tool-icon">
                        <Icon size={18} />
                      </div>
                      <div className="related-tool-info">
                        <span className="related-tool-name">{calc.name}</span>
                        <span className="related-tool-desc">{calc.desc}</span>
                      </div>
                      <span className="related-tool-arrow">→</span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        
        {/* Footer */}
        <footer className="app-footer-credits no-print" style={{ 
          marginTop: 'auto', 
          padding: '24px 16px', 
          borderTop: '1px solid var(--border-color)', 
          textAlign: 'center',
          fontSize: '11px',
          color: 'var(--text-muted)',
          lineHeight: '1.6'
        }}>
          <p style={{ fontWeight: '600', marginBottom: '6px', fontSize: '12px', color: 'var(--text-main)' }}>© 2026 RupeeBuddy.in. All Rights Reserved.</p>
          <p style={{ maxWidth: '800px', margin: '0 auto' }}>
            <strong>YMYL Financial Disclaimer:</strong> RupeeBuddy.in is a free online educational resources portal. 
            All financial calculators, algorithms, estimations, and guides are for illustrative and educational purposes only, based on standard mathematical formulas and prevailing Indian tax slabs. 
            The calculations are indicative and do not constitute certified tax advisory, financial planning, or fiduciary investment services. 
            Please consult a registered financial planner or Chartered Accountant before making commercial, tax, or investment decisions.
          </p>
        </footer>
      </main>
    </div>
  );
}
