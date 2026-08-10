import React, { useState } from 'react';
import { 
  Percent, UserCheck, Shield, Briefcase, TrendingUp, Lock, 
  CalendarClock, HeartHandshake, Sunset, FileText, Coins, Sparkles,
  Search, X, Menu, Calculator, Home, Info, Mail
} from 'lucide-react';

export const calculatorsList = [
  { id: 'tax', name: 'Income Tax Calculator', desc: 'Compare Old vs New Slab Regime', icon: FileText },
  { id: 'emi', name: 'EMI Calculator', desc: 'Home, Car & Personal Loan EMIs', icon: Percent },
  { id: 'eligibility', name: 'Loan Eligibility', desc: 'FOIR-based eligible loan amount', icon: UserCheck },
  { id: 'ppf', name: 'PPF Calculator', desc: 'Public Provident Fund earnings', icon: Shield },
  { id: 'pf', name: 'PF (EPF) Calculator', desc: 'Provident Fund corpus & interest', icon: Briefcase },
  { id: 'sip', name: 'SIP Calculator', desc: 'Mutual fund returns compounding', icon: TrendingUp },
  { id: 'fd', name: 'FD Calculator', desc: 'Fixed Deposit compound interest', icon: Lock },
  { id: 'rd', name: 'RD Calculator', desc: 'Recurring Deposit maturity value', icon: CalendarClock },
  { id: 'nps', name: 'NPS Calculator', desc: 'National Pension Scheme maturity & pension', icon: HeartHandshake },
  { id: 'retirement', name: 'Retirement Planner', desc: 'Target corpus & inflation savings', icon: Sunset },
  { id: 'mutualfund', name: 'Mutual Fund Calculator', desc: 'SIP & Lumpsum wealth estimator', icon: Coins },
  { id: 'compound', name: 'Compound Interest', desc: 'Variable compounding calculator', icon: Sparkles }
];

export default function Sidebar({ activeCalculator, setActiveCalculator }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const filteredCalculators = calculatorsList.filter(calc => 
    calc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    calc.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    calc.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectCalculator = (id) => {
    setActiveCalculator(id);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="mobile-nav-toggle no-print" 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle Menu"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <aside className={`app-sidebar no-print ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-logo">
            <Calculator size={28} className="brand-icon" />
          </div>
          <div>
            <span className="brand-name">FinanceCalc</span>
            <span className="brand-subtitle">Indian Financial Suite</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="sidebar-search">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search calculators..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-field"
            />
            {searchTerm && (
              <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Calculators List */}
        <nav className="sidebar-menu" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Dashboard / Home */}
          <div>
            <ul className="menu-list">
              <li className="menu-item-wrapper">
                <button 
                  onClick={() => selectCalculator('home')}
                  className={`menu-item-btn ${activeCalculator === 'home' ? 'active' : ''}`}
                >
                  <div className={`menu-icon-container ${activeCalculator === 'home' ? 'active' : ''}`}>
                    <Home size={18} />
                  </div>
                  <div className="menu-text-container">
                    <span className="menu-item-name">Home / Dashboard</span>
                    <span className="menu-item-desc">All financial calculators grid</span>
                  </div>
                </button>
              </li>
            </ul>
          </div>

          {/* Calculators Group */}
          <div>
            <span className="menu-group-title">CALCULATORS</span>
            <ul className="menu-list">
              {filteredCalculators.map((calc) => {
                const IconComponent = calc.icon;
                const isActive = activeCalculator === calc.id;
                return (
                  <li key={calc.id} className="menu-item-wrapper">
                    <button 
                      onClick={() => selectCalculator(calc.id)}
                      className={`menu-item-btn ${isActive ? 'active' : ''}`}
                    >
                      <div className={`menu-icon-container ${isActive ? 'active' : ''}`}>
                        <IconComponent size={18} />
                      </div>
                      <div className="menu-text-container">
                        <span className="menu-item-name">{calc.name}</span>
                        <span className="menu-item-desc">{calc.desc}</span>
                      </div>
                    </button>
                  </li>
                );
              })}
              {filteredCalculators.length === 0 && (
                <li className="no-results-msg">No calculators found</li>
              )}
            </ul>
          </div>

          {/* Support / Info Pages Group */}
          <div>
            <span className="menu-group-title">INFORMATION</span>
            <ul className="menu-list">
              <li className="menu-item-wrapper">
                <button 
                  onClick={() => selectCalculator('about')}
                  className={`menu-item-btn ${activeCalculator === 'about' ? 'active' : ''}`}
                >
                  <div className={`menu-icon-container ${activeCalculator === 'about' ? 'active' : ''}`}>
                    <Info size={18} />
                  </div>
                  <div className="menu-text-container">
                    <span className="menu-item-name">About Us</span>
                    <span className="menu-item-desc">Who we are & our mission</span>
                  </div>
                </button>
              </li>
              <li className="menu-item-wrapper">
                <button 
                  onClick={() => selectCalculator('privacy')}
                  className={`menu-item-btn ${activeCalculator === 'privacy' ? 'active' : ''}`}
                >
                  <div className={`menu-icon-container ${activeCalculator === 'privacy' ? 'active' : ''}`}>
                    <Lock size={18} />
                  </div>
                  <div className="menu-text-container">
                    <span className="menu-item-name">Privacy Policy</span>
                    <span className="menu-item-desc">Data protection disclosure</span>
                  </div>
                </button>
              </li>
              <li className="menu-item-wrapper">
                <button 
                  onClick={() => selectCalculator('contact')}
                  className={`menu-item-btn ${activeCalculator === 'contact' ? 'active' : ''}`}
                >
                  <div className={`menu-icon-container ${activeCalculator === 'contact' ? 'active' : ''}`}>
                    <Mail size={18} />
                  </div>
                  <div className="menu-text-container">
                    <span className="menu-item-name">Contact Us</span>
                    <span className="menu-item-desc">Get in touch with support</span>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <div className="sidebar-footer">
          <span className="version-tag">v2.0.0 (FY 2026-27 Slabs)</span>
          <span className="author-tag">Made for India 🇮🇳</span>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isMobileOpen && (
        <div className="sidebar-overlay no-print" onClick={() => setIsMobileOpen(false)}></div>
      )}
    </>
  );
}
