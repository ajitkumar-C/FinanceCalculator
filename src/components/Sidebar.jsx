import React, { useState } from 'react';
import { 
  Percent, UserCheck, Shield, Briefcase, TrendingUp, Lock, 
  CalendarClock, HeartHandshake, Sunset, FileText, Coins, Sparkles,
  Building2, Search, X, Menu, Calculator, Home, Info, Mail, BookOpen
} from 'lucide-react';

export const calculatorsList = [
  { id: 'tax', name: 'Income Tax Calculator', desc: 'Compare Old vs New Slab Regime', icon: FileText },
  { id: 'emi', name: 'EMI Calculator (Home/Car/Personal)', desc: 'Estimate loan payments instantly', icon: Percent },
  { id: 'eligibility', name: 'Loan Eligibility Calculator', desc: 'FOIR-based eligible loan checker', icon: UserCheck },
  { id: 'clp', name: 'Construction Linked Plan Calculator', desc: 'Slab-wise payment & Pre-EMI schedule', icon: Building2 },
  { id: 'ppf', name: 'PPF Calculator (Public Provident Fund)', desc: 'Calculate PPF tax-free interest', icon: Shield },
  { id: 'pf', name: 'EPF / PF Calculator (Provident Fund)', desc: 'Estimate EPF balance & interest online', icon: Briefcase },
  { id: 'sip', name: 'SIP Investment Plan Calculator', desc: 'Calculate Systematic Investment returns', icon: TrendingUp },
  { id: 'fd', name: 'FD Calculator (Fixed Deposit Interest)', desc: 'Calculate FD compounding returns', icon: Lock },
  { id: 'rd', name: 'RD Calculator (Recurring Deposit)', desc: 'Calculate monthly savings maturity', icon: CalendarClock },
  { id: 'nps', name: 'NPS Calculator (National Pension Scheme)', desc: 'Estimate retirement pension corpus', icon: HeartHandshake },
  { id: 'retirement', name: 'Retirement Planner & Pension Calculator', desc: 'Inflation-adjusted savings target', icon: Sunset },
  { id: 'mutualfund', name: 'Mutual Fund Lumpsum Calculator', desc: 'SIP & Lumpsum returns compounding', icon: Coins },
  { id: 'compound', name: 'Compound Interest Calculator', desc: 'Daily/monthly compounding calculator', icon: Sparkles }
];

export default function Sidebar({ activeCalculator, setActiveCalculator, isMobileOpen, setIsMobileOpen }) {
  const [searchTerm, setSearchTerm] = useState('');

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
      {/* Sidebar Container */}
      <aside className={`app-sidebar no-print ${isMobileOpen ? 'mobile-open' : ''}`}>
        <a 
          href="?calc=home" 
          onClick={(e) => {
            e.preventDefault();
            selectCalculator('home');
          }}
          className="sidebar-brand"
          style={{ textDecoration: 'none', cursor: 'pointer' }}
        >
          <div className="brand-logo">
            <Calculator size={28} className="brand-icon" />
          </div>
          <div>
            <span className="brand-name">RupeeBuddy</span>
            <span className="brand-subtitle">Indian Financial Suite</span>
          </div>
        </a>

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
          <div className="mobile-only-menu-group">
            <ul className="menu-list">
              <li className="menu-item-wrapper">
                <a 
                  href="?calc=home"
                  onClick={(e) => {
                    e.preventDefault();
                    selectCalculator('home');
                  }}
                  className={`menu-item-btn ${activeCalculator === 'home' ? 'active' : ''}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className={`menu-icon-container ${activeCalculator === 'home' ? 'active' : ''}`}>
                    <Home size={18} />
                  </div>
                  <div className="menu-text-container">
                    <span className="menu-item-name">Home / Dashboard</span>
                    <span className="menu-item-desc">All financial calculators grid</span>
                  </div>
                </a>
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
                    <a 
                      href={`?calc=${calc.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        selectCalculator(calc.id);
                      }}
                      className={`menu-item-btn ${isActive ? 'active' : ''}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div className={`menu-icon-container ${isActive ? 'active' : ''}`}>
                        <IconComponent size={18} />
                      </div>
                      <div className="menu-text-container">
                        <span className="menu-item-name">{calc.name}</span>
                        <span className="menu-item-desc">{calc.desc}</span>
                      </div>
                    </a>
                  </li>
                );
              })}
              {filteredCalculators.length === 0 && (
                <li className="no-results-msg">No calculators found</li>
              )}
            </ul>
          </div>

          {/* Guides & Articles Group */}
          <div className="mobile-only-menu-group">
            <span className="menu-group-title">GUIDES & ARTICLES</span>
            <ul className="menu-list">
              <li className="menu-item-wrapper">
                <a 
                  href="?calc=blogs"
                  onClick={(e) => {
                    e.preventDefault();
                    selectCalculator('blogs');
                  }}
                  className={`menu-item-btn ${activeCalculator === 'blogs' ? 'active' : ''}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className={`menu-icon-container ${activeCalculator === 'blogs' ? 'active' : ''}`}>
                    <BookOpen size={18} />
                  </div>
                  <div className="menu-text-container">
                    <span className="menu-item-name">Finance Guides</span>
                    <span className="menu-item-desc">Wealth & tax saving articles</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Support / Info Pages Group */}
          <div className="mobile-only-menu-group">
            <span className="menu-group-title">INFORMATION</span>
            <ul className="menu-list">
              <li className="menu-item-wrapper">
                <a 
                  href="?calc=about"
                  onClick={(e) => {
                    e.preventDefault();
                    selectCalculator('about');
                  }}
                  className={`menu-item-btn ${activeCalculator === 'about' ? 'active' : ''}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className={`menu-icon-container ${activeCalculator === 'about' ? 'active' : ''}`}>
                    <Info size={18} />
                  </div>
                  <div className="menu-text-container">
                    <span className="menu-item-name">About Us</span>
                    <span className="menu-item-desc">Who we are & our mission</span>
                  </div>
                </a>
              </li>
              <li className="menu-item-wrapper">
                <a 
                  href="?calc=privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    selectCalculator('privacy');
                  }}
                  className={`menu-item-btn ${activeCalculator === 'privacy' ? 'active' : ''}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className={`menu-icon-container ${activeCalculator === 'privacy' ? 'active' : ''}`}>
                    <Lock size={18} />
                  </div>
                  <div className="menu-text-container">
                    <span className="menu-item-name">Privacy Policy</span>
                    <span className="menu-item-desc">Data protection disclosure</span>
                  </div>
                </a>
              </li>
              <li className="menu-item-wrapper">
                <a 
                  href="?calc=contact"
                  onClick={(e) => {
                    e.preventDefault();
                    selectCalculator('contact');
                  }}
                  className={`menu-item-btn ${activeCalculator === 'contact' ? 'active' : ''}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className={`menu-icon-container ${activeCalculator === 'contact' ? 'active' : ''}`}>
                    <Mail size={18} />
                  </div>
                  <div className="menu-text-container">
                    <span className="menu-item-name">Contact Us</span>
                    <span className="menu-item-desc">Get in touch with support</span>
                  </div>
                </a>
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
