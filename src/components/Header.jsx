import React from 'react';
import { Printer, Share2, Menu, X, Calculator } from 'lucide-react';
import { exportToPDF, shareCalculation } from '../utils/pdfExport';

export default function Header({ 
  activeCalculatorName, 
  activeCalculatorId, 
  calculatorResultText,
  activeCalculator,
  setActiveCalculator,
  isMobileOpen,
  setIsMobileOpen
}) {
  const handlePrint = () => {
    exportToPDF();
  };

  const handleShare = () => {
    shareCalculation(activeCalculatorName, calculatorResultText || "Calculate loans, mutual funds, SIP, EPF, and tax slabs instantly.");
  };

  return (
    <header className="app-header">
      {/* Mobile Branding Bar (Visible only on mobile) */}
      <div className="mobile-header-brand no-print">
        <a 
          href="?calc=home"
          onClick={(e) => {
            e.preventDefault();
            setActiveCalculator('home');
            setIsMobileOpen(false);
          }}
          className="mobile-brand-logo-section"
          style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
        >
          <div className="brand-logo-icon">
            <Calculator size={22} />
          </div>
          <div className="brand-logo-text">
            <span className="brand-logo-name">RupeeBuddy</span>
            <span className="brand-logo-sub">Indian Financial Suite</span>
          </div>
        </a>
        
        <button 
          className="mobile-hamburger-btn" 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Main Header Content (Restructured for Top Navigation) */}
      <div className="header-main-content">
        <div className="header-left">
          {activeCalculatorId !== 'home' && (
            <h1 className="header-active-title">{activeCalculatorName}</h1>
          )}
        </div>

        {/* Top Navigation Menu (Hidden on mobile) */}
        <nav className="header-top-nav no-print">
          <a 
            href="?calc=home"
            onClick={(e) => {
              e.preventDefault();
              setActiveCalculator('home');
            }}
            className={`nav-link-btn ${activeCalculator === 'home' ? 'active' : ''}`}
          >
            Home
          </a>
          <a 
            href="?calc=blogs"
            onClick={(e) => {
              e.preventDefault();
              setActiveCalculator('blogs');
            }}
            className={`nav-link-btn ${activeCalculator === 'blogs' ? 'active' : ''}`}
          >
            Financial Guides
          </a>
          <a 
            href="?calc=about"
            onClick={(e) => {
              e.preventDefault();
              setActiveCalculator('about');
            }}
            className={`nav-link-btn ${activeCalculator === 'about' ? 'active' : ''}`}
          >
            About Us
          </a>
          <a 
            href="?calc=privacy"
            onClick={(e) => {
              e.preventDefault();
              setActiveCalculator('privacy');
            }}
            className={`nav-link-btn ${activeCalculator === 'privacy' ? 'active' : ''}`}
          >
            Privacy Policy
          </a>
          <a 
            href="?calc=contact"
            onClick={(e) => {
              e.preventDefault();
              setActiveCalculator('contact');
            }}
            className={`nav-link-btn ${activeCalculator === 'contact' ? 'active' : ''}`}
          >
            Contact Us
          </a>
        </nav>

        {/* Action Buttons (Hidden on Home page, Help button removed) */}
        {activeCalculatorId !== 'home' && (
          <div className="header-right no-print">
            <button 
              className="header-action-btn share-btn" 
              onClick={handleShare}
              title="Share details"
            >
              <Share2 size={18} />
              <span>Share</span>
            </button>

            <button 
              className="header-action-btn print-btn" 
              onClick={handlePrint}
              title="Download PDF report"
            >
              <Printer size={18} />
              <span>Download Report</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
