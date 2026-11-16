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
import { 
  parseRouteFromUrl, 
  getCleanPath, 
  CALCULATOR_ROUTES, 
  STATIC_ROUTES 
} from './utils/routes';

// Dashboard is kept synchronous for fast FCP/LCP home rendering
import Dashboard from './components/pages/Dashboard';

// Lazy load calculators
const EmiCalculator = React.lazy(() => import('./components/calculators/EmiCalculator'));
const EligibilityCalculator = React.lazy(() => import('./components/calculators/EligibilityCalculator'));
const ClpCalculator = React.lazy(() => import('./components/calculators/ClpCalculator'));
const PpfCalculator = React.lazy(() => import('./components/calculators/PpfCalculator'));
const PfCalculator = React.lazy(() => import('./components/calculators/PfCalculator'));
const SipCalculator = React.lazy(() => import('./components/calculators/SipCalculator'));
const FdCalculator = React.lazy(() => import('./components/calculators/FdCalculator'));
const RdCalculator = React.lazy(() => import('./components/calculators/RdCalculator'));
const NpsCalculator = React.lazy(() => import('./components/calculators/NpsCalculator'));
const RetirementCalculator = React.lazy(() => import('./components/calculators/RetirementCalculator'));
const TaxCalculator = React.lazy(() => import('./components/calculators/TaxCalculator'));
const MutualFundCalculator = React.lazy(() => import('./components/calculators/MutualFundCalculator'));
const CompoundCalculator = React.lazy(() => import('./components/calculators/CompoundCalculator'));

// Lazy load Real Estate & Property calculators
const StampDutyCalculator = React.lazy(() => import('./components/calculators/StampDutyCalculator'));
const CapitalGainsCalculator = React.lazy(() => import('./components/calculators/CapitalGainsCalculator'));
const CarpetAreaCalculator = React.lazy(() => import('./components/calculators/CarpetAreaCalculator'));
const PropertyTaxCalculator = React.lazy(() => import('./components/calculators/PropertyTaxCalculator'));
const BrokerageCalculator = React.lazy(() => import('./components/calculators/BrokerageCalculator'));
const RentalYieldCalculator = React.lazy(() => import('./components/calculators/RentalYieldCalculator'));
const ReraLookupTool = React.lazy(() => import('./components/calculators/ReraLookupTool'));
const RentalAgreementGenerator = React.lazy(() => import('./components/calculators/RentalAgreementGenerator'));

// Lazy load static & compliance pages
const AboutUs = React.lazy(() => import('./components/pages/AboutUs'));
const PrivacyPolicy = React.lazy(() => import('./components/pages/PrivacyPolicy'));
const ContactUs = React.lazy(() => import('./components/pages/ContactUs'));
const EditorialPolicy = React.lazy(() => import('./components/pages/EditorialPolicy'));
const Blogs = React.lazy(() => import('./components/pages/Blogs'));

const validRoutes = [
  ...calculatorsList.map(c => c.id), 
  'home', 'about', 'privacy', 'contact', 'editorial', 'blogs',
  'blogs-investment', 'blogs-loans', 'blogs-realestate', 'blogs-retirement', 'blogs-tax'
];

const categoryTitles = {
  all: 'Finance Guides & Insights',
  investment: 'Investment Guides & Strategies',
  loans: 'Loan & Debt Management Guides',
  realestate: 'Real Estate & Property Guides',
  retirement: 'Retirement & Pension Guides',
  tax: 'Tax Slabs & Exemption Guides'
};

const staticPages = {
  home: { name: 'Home / Dashboard' },
  about: { name: 'About Us' },
  privacy: { name: 'Privacy Policy' },
  contact: { name: 'Contact Us' },
  editorial: { name: 'Editorial Policy & Standards' },
  blogs: { name: 'Finance Guides' }
};

const relatedMap = {
  tax: ['sip', 'ppf', 'capitalgains'],
  emi: ['clp', 'eligibility', 'stampduty'],
  eligibility: ['clp', 'emi', 'rentalyield'],
  clp: ['emi', 'stampduty', 'reralookup'],
  stampduty: ['clp', 'emi', 'propertytax'],
  capitalgains: ['tax', 'rentalyield', 'stampduty'],
  carpetarea: ['clp', 'propertytax', 'reralookup'],
  propertytax: ['stampduty', 'carpetarea', 'rentalyield'],
  brokerage: ['stampduty', 'rentalagreement', 'rentalyield'],
  rentalyield: ['brokerage', 'propertytax', 'rentalagreement'],
  reralookup: ['clp', 'carpetarea', 'stampduty'],
  rentalagreement: ['brokerage', 'rentalyield', 'stampduty'],
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
  // Parse route on initial mount (supports both clean paths & legacy query params)
  const initialRoute = parseRouteFromUrl(window.location.pathname, window.location.search);

  const [activeCalc, setActiveCalc] = useState(initialRoute.activeCalc);
  const [activeCategory, setActiveCategory] = useState(initialRoute.activeCategory);
  const [articleParam, setArticleParam] = useState(initialRoute.articleParam);
  const [resultText, setResultText] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Synchronize SEO tags, schema markup, and URL pushState
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const mainLayout = document.querySelector('.main-content-layout');
    if (mainLayout) {
      mainLayout.scrollTop = 0;
    }

    // Inject JSON-LD Schema
    injectCalculatorSchema(activeCalc, activeCategory, articleParam);

    // Compute canonical clean path
    const targetCleanPath = getCleanPath({ 
      calc: activeCalc, 
      category: activeCategory, 
      article: articleParam 
    });

    const currentUrl = window.location.pathname + window.location.search;

    if (currentUrl !== targetCleanPath) {
      // If landing via legacy query (?calc=...), upgrade with replaceState
      if (window.location.search && !window.location.pathname.startsWith('/calculators') && !window.location.pathname.startsWith('/guides')) {
        window.history.replaceState({}, '', targetCleanPath);
      } else {
        window.history.pushState({}, '', targetCleanPath);
      }
    }
  }, [activeCalc, activeCategory, articleParam]);

  // Listen to browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      const route = parseRouteFromUrl(window.location.pathname, window.location.search);
      setActiveCalc(route.activeCalc);
      setActiveCategory(route.activeCategory);
      setArticleParam(route.articleParam);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (calcId, category = 'all', article = null) => {
    setActiveCalc(calcId);
    setActiveCategory(category);
    setArticleParam(article);
  };

  const activeDetails = activeCalc === 'blogs' 
    ? { name: categoryTitles[activeCategory] || 'Finance Guides' }
    : (calculatorsList.find(calc => calc.id === activeCalc) || staticPages[activeCalc] || staticPages['home']);

  const renderActiveCalculator = () => {
    switch (activeCalc) {
      case 'home':
        return <Dashboard setActiveCalculator={(id) => navigateTo(id)} />;
      case 'about':
        return <AboutUs setActiveCalculator={(id) => navigateTo(id)} />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'contact':
        return <ContactUs />;
      case 'editorial':
        return <EditorialPolicy />;
      case 'emi':
        return <EmiCalculator setResultText={setResultText} />;
      case 'eligibility':
        return <EligibilityCalculator setResultText={setResultText} />;
      case 'clp':
        return <ClpCalculator setResultText={setResultText} />;
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
      case 'stampduty':
        return <StampDutyCalculator setResultText={setResultText} />;
      case 'capitalgains':
        return <CapitalGainsCalculator setResultText={setResultText} />;
      case 'carpetarea':
        return <CarpetAreaCalculator setResultText={setResultText} />;
      case 'propertytax':
        return <PropertyTaxCalculator setResultText={setResultText} />;
      case 'brokerage':
        return <BrokerageCalculator setResultText={setResultText} />;
      case 'rentalyield':
        return <RentalYieldCalculator setResultText={setResultText} />;
      case 'reralookup':
        return <ReraLookupTool />;
      case 'rentalagreement':
        return <RentalAgreementGenerator />;
      case 'blogs':
        return (
          <Blogs 
            setActiveCalculator={(id) => navigateTo(id)} 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory}
            articleParam={articleParam}
            setArticleParam={setArticleParam}
          />
        );
      default:
        return <Dashboard setActiveCalculator={(id) => navigateTo(id)} />;
    }
  };

  return (
    <div className="app-container-layout">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeCalculator={activeCalc} 
        setActiveCalculator={(id) => navigateTo(id)} 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
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
          setActiveCalculator={(id) => navigateTo(id)}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Dynamic Calculator Component */}
        <React.Suspense fallback={
          <div className="calculator-loading-skeleton" style={{ 
            padding: '60px 40px', 
            textAlign: 'center', 
            color: 'var(--text-muted)',
            background: 'var(--card-bg)',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            margin: '24px 0',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            <style>{`
              @keyframes loader-spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
            <div style={{
              width: '24px',
              height: '24px',
              border: '3px solid var(--border-color)',
              borderTopColor: 'var(--primary-color)',
              borderRadius: '50%',
              margin: '0 auto 12px auto',
              animation: 'loader-spin 0.8s linear infinite'
            }}></div>
            Loading calculator view...
          </div>
        }>
          {renderActiveCalculator()}
        </React.Suspense>

        {/* Dynamic Related Tools Panel (Only visible on Calculator pages) */}
        {calculatorsList.some(c => c.id === activeCalc) && relatedMap[activeCalc] && (
          <div className="related-tools-container no-print">
            <h3 className="related-tools-title">Explore Related Tools</h3>
            <div className="related-tools-grid">
              {calculatorsList
                .filter(c => relatedMap[activeCalc].includes(c.id))
                .map(calc => {
                  const Icon = calc.icon;
                  const cleanPath = CALCULATOR_ROUTES[calc.id]?.path || `/?calc=${calc.id}`;
                  return (
                    <a 
                      key={calc.id} 
                      href={cleanPath}
                      className="related-tool-card"
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo(calc.id);
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
                    </a>
                  );
                })}
            </div>
          </div>
        )}
        
        {/* Footer */}
        <footer className="app-footer-credits no-print" style={{ 
          marginTop: 'auto', 
          padding: '28px 16px', 
          borderTop: '1px solid var(--border-color)', 
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--text-muted)',
          lineHeight: '1.6'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '14px', fontWeight: '500' }}>
            <a href="/" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} style={{ color: 'var(--brand-blue)', textDecoration: 'none' }}>Home</a>
            <span>•</span>
            <a href="/about-us" onClick={(e) => { e.preventDefault(); navigateTo('about'); }} style={{ color: 'var(--brand-blue)', textDecoration: 'none' }}>About Us</a>
            <span>•</span>
            <a href="/editorial-policy" onClick={(e) => { e.preventDefault(); navigateTo('editorial'); }} style={{ color: 'var(--brand-blue)', textDecoration: 'none', fontWeight: '600' }}>Editorial Policy & Review Standards</a>
            <span>•</span>
            <a href="/guides" onClick={(e) => { e.preventDefault(); navigateTo('blogs'); }} style={{ color: 'var(--brand-blue)', textDecoration: 'none' }}>Financial Guides</a>
            <span>•</span>
            <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); navigateTo('privacy'); }} style={{ color: 'var(--brand-blue)', textDecoration: 'none' }}>Privacy Policy</a>
            <span>•</span>
            <a href="/contact-us" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }} style={{ color: 'var(--brand-blue)', textDecoration: 'none' }}>Contact Us</a>
          </div>
          <p style={{ fontWeight: '600', marginBottom: '6px', fontSize: '13px', color: 'var(--text-main)' }}>
            © 2026 RupeeBuddy.in. All Rights Reserved. Built for Indian Taxpayers & Investors 🇮🇳
          </p>
          <p style={{ maxWidth: '840px', margin: '0 auto', fontSize: '11px' }}>
            <strong>YMYL Financial & Legal Disclaimer:</strong> RupeeBuddy.in is a free educational resources portal. 
            All financial calculators, algorithms, estimations, and tax comparisons are for illustrative purposes, strictly based on standard mathematical formulas, published Union Budget tax slabs (FY 2026-27), and regulatory directives (RBI, EPFO, RERA). 
            Computations are indicative and do not constitute certified tax advisory or financial planning. Please consult a Chartered Accountant (CA) or SEBI-Registered Investment Advisor before committing to commercial transactions.
          </p>
        </footer>
      </main>
    </div>
  );
}
