import React, { useState, useEffect, useRef } from 'react';
import { 
  Printer, Share2, Menu, X, Calculator, ChevronDown, 
  Building2, TrendingUp, Percent, FileText, Sparkles, 
  MapPin, DollarSign, Layers, Scale, Key, Shield, UserCheck, 
  Coins, Lock, CalendarClock, HeartHandshake, Sunset, BookOpen 
} from 'lucide-react';
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
  const [openDropdown, setOpenDropdown] = useState(null); // 'realestate' | 'investment' | 'loans' | 'tax'
  const navRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePrint = () => {
    exportToPDF();
  };

  const handleShare = () => {
    shareCalculation(activeCalculatorName, calculatorResultText || "Calculate loans, mutual funds, SIP, EPF, and tax slabs instantly.");
  };

  const navigateTo = (calcId) => {
    setActiveCalculator(calcId);
    setOpenDropdown(null);
    setIsMobileOpen(false);
  };

  const realEstateTools = [
    { id: 'stampduty', name: 'Stamp Duty & Registration', desc: 'State-wise stamp duty & women concession', icon: MapPin },
    { id: 'clp', name: 'Construction Linked Plan', desc: 'Slab-wise payment & Pre-EMI schedule', icon: Building2 },
    { id: 'capitalgains', name: 'Property Capital Gains Tax', desc: 'Budget 2024 (20% with CII vs 12.5% flat)', icon: DollarSign },
    { id: 'carpetarea', name: 'Carpet Area & Land Converter', desc: 'RERA Carpet area, loading % & Gaj/Guntha', icon: Layers },
    { id: 'rentalyield', name: 'Rental Yield & Property ROI', desc: 'Gross/Net rental yield & 10-Yr CAGR growth', icon: TrendingUp },
    { id: 'propertytax', name: 'Municipal Property Tax', desc: 'Property tax for Mumbai, Bangalore, Delhi, Pune', icon: Scale },
    { id: 'brokerage', name: 'Brokerage Commission & TDS', desc: 'Sale/Rent broker fee with 18% GST & 5% TDS', icon: Percent },
    { id: 'reralookup', name: 'RERA Project Lookup Directory', desc: '20+ State RERAs & legal compliance check', icon: Shield },
    { id: 'rentalagreement', name: 'Rental Agreement Generator', desc: 'Instant legal 11-month rent agreement draft', icon: Key }
  ];

  const investmentTools = [
    { id: 'sip', name: 'SIP Investment Plan', desc: 'Calculate Systematic Investment returns', icon: TrendingUp },
    { id: 'mutualfund', name: 'Mutual Fund Lumpsum', desc: 'SIP & Lumpsum returns compounding', icon: Coins },
    { id: 'ppf', name: 'Public Provident Fund (PPF)', desc: 'Calculate PPF tax-free interest', icon: Shield },
    { id: 'pf', name: 'EPF / PF Balance & Interest', desc: 'Estimate EPF balance & interest online', icon: Building2 },
    { id: 'fd', name: 'Fixed Deposit (FD)', desc: 'Calculate FD compounding returns', icon: Lock },
    { id: 'rd', name: 'Recurring Deposit (RD)', desc: 'Calculate monthly savings maturity', icon: CalendarClock },
    { id: 'compound', name: 'Compound Interest', desc: 'Daily/monthly compounding calculator', icon: Sparkles }
  ];

  const loanTools = [
    { id: 'emi', name: 'EMI Calculator (Home/Car/Personal)', desc: 'Estimate loan payments instantly', icon: Percent },
    { id: 'eligibility', name: 'Loan Eligibility & FOIR', desc: 'FOIR-based eligible loan checker', icon: UserCheck }
  ];

  const taxRetirementTools = [
    { id: 'tax', name: 'Income Tax Calculator', desc: 'Compare Old vs New Slab Regime', icon: FileText },
    { id: 'nps', name: 'NPS Pension Calculator', desc: 'Estimate retirement pension corpus', icon: HeartHandshake },
    { id: 'retirement', name: 'Retirement Planner', desc: 'Inflation-adjusted savings target', icon: Sunset }
  ];

  const isRealEstateActive = realEstateTools.some(t => t.id === activeCalculator);
  const isInvestmentActive = investmentTools.some(t => t.id === activeCalculator);
  const isLoanActive = loanTools.some(t => t.id === activeCalculator);
  const isTaxActive = taxRetirementTools.some(t => t.id === activeCalculator);

  return (
    <header className="app-header" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Mobile Branding Bar (Visible only on mobile) */}
      <div className="mobile-header-brand no-print">
        <a 
          href="?calc=home"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('home');
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

      {/* Main Header Content */}
      <div className="header-main-content">
        <div className="header-left">
          {activeCalculatorId !== 'home' && (
            <h1 className="header-active-title" style={{ fontSize: '18px', fontWeight: '700', color: 'var(--brand-navy)', margin: 0 }}>
              {activeCalculatorName}
            </h1>
          )}
        </div>

        {/* Top Categorized Navigation Menu (Desktop) */}
        <nav ref={navRef} className="header-top-nav no-print" style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
          
          {/* Home Link */}
          <a 
            href="?calc=home"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('home');
            }}
            className={`nav-link-btn ${activeCalculator === 'home' ? 'active' : ''}`}
            style={{ fontSize: '13px', fontWeight: '600' }}
          >
            Home
          </a>

          {/* 1. Real Estate & Property Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              className={`nav-link-btn ${isRealEstateActive || openDropdown === 'realestate' ? 'active' : ''}`}
              onClick={() => setOpenDropdown(openDropdown === 'realestate' ? null : 'realestate')}
              onMouseEnter={() => setOpenDropdown('realestate')}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '600' }}
            >
              <span>🏡 Real Estate Tools</span>
              <ChevronDown size={14} style={{ transform: openDropdown === 'realestate' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
            </button>

            {openDropdown === 'realestate' && (
              <div 
                onMouseLeave={() => setOpenDropdown(null)}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  width: '380px',
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0',
                  padding: '10px',
                  zIndex: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  marginTop: '4px'
                }}
              >
                <div style={{ padding: '6px 10px', fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Real Estate & Property Suite
                </div>
                {realEstateTools.map((t) => {
                  const Icon = t.icon;
                  const isCur = t.id === activeCalculator;
                  return (
                    <a
                      key={t.id}
                      href={`?calc=${t.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo(t.id);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 10px',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        backgroundColor: isCur ? '#eff6ff' : 'transparent',
                        transition: 'background-color 0.15s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isCur ? '#eff6ff' : '#f8fafc'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isCur ? '#eff6ff' : 'transparent'}
                    >
                      <div style={{ color: isCur ? 'var(--primary)' : '#64748b', display: 'flex', alignItems: 'center' }}>
                        <Icon size={16} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '13px', fontWeight: isCur ? '700' : '600', color: isCur ? 'var(--primary)' : 'var(--brand-navy)' }}>
                          {t.name}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          {t.desc}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. Investments & Wealth Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              className={`nav-link-btn ${isInvestmentActive || openDropdown === 'investment' ? 'active' : ''}`}
              onClick={() => setOpenDropdown(openDropdown === 'investment' ? null : 'investment')}
              onMouseEnter={() => setOpenDropdown('investment')}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '600' }}
            >
              <span>📈 Investments</span>
              <ChevronDown size={14} style={{ transform: openDropdown === 'investment' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
            </button>

            {openDropdown === 'investment' && (
              <div 
                onMouseLeave={() => setOpenDropdown(null)}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  width: '360px',
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15)',
                  border: '1px solid #e2e8f0',
                  padding: '10px',
                  zIndex: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  marginTop: '4px'
                }}
              >
                <div style={{ padding: '6px 10px', fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Wealth & Savings Calculators
                </div>
                {investmentTools.map((t) => {
                  const Icon = t.icon;
                  const isCur = t.id === activeCalculator;
                  return (
                    <a
                      key={t.id}
                      href={`?calc=${t.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo(t.id);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 10px',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        backgroundColor: isCur ? '#eff6ff' : 'transparent',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isCur ? '#eff6ff' : '#f8fafc'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isCur ? '#eff6ff' : 'transparent'}
                    >
                      <div style={{ color: isCur ? 'var(--primary)' : '#64748b' }}><Icon size={16} /></div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '13px', fontWeight: isCur ? '700' : '600', color: isCur ? 'var(--primary)' : 'var(--brand-navy)' }}>{t.name}</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t.desc}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. Loans & Banking Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              className={`nav-link-btn ${isLoanActive || openDropdown === 'loans' ? 'active' : ''}`}
              onClick={() => setOpenDropdown(openDropdown === 'loans' ? null : 'loans')}
              onMouseEnter={() => setOpenDropdown('loans')}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '600' }}
            >
              <span>💳 Loans</span>
              <ChevronDown size={14} style={{ transform: openDropdown === 'loans' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
            </button>

            {openDropdown === 'loans' && (
              <div 
                onMouseLeave={() => setOpenDropdown(null)}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  width: '320px',
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15)',
                  border: '1px solid #e2e8f0',
                  padding: '10px',
                  zIndex: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  marginTop: '4px'
                }}
              >
                {loanTools.map((t) => {
                  const Icon = t.icon;
                  const isCur = t.id === activeCalculator;
                  return (
                    <a
                      key={t.id}
                      href={`?calc=${t.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo(t.id);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 10px',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        backgroundColor: isCur ? '#eff6ff' : 'transparent',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isCur ? '#eff6ff' : '#f8fafc'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isCur ? '#eff6ff' : 'transparent'}
                    >
                      <div style={{ color: isCur ? 'var(--primary)' : '#64748b' }}><Icon size={16} /></div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '13px', fontWeight: isCur ? '700' : '600', color: isCur ? 'var(--primary)' : 'var(--brand-navy)' }}>{t.name}</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t.desc}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* 4. Tax & Retirement Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              className={`nav-link-btn ${isTaxActive || openDropdown === 'tax' ? 'active' : ''}`}
              onClick={() => setOpenDropdown(openDropdown === 'tax' ? null : 'tax')}
              onMouseEnter={() => setOpenDropdown('tax')}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '600' }}
            >
              <span>⚖️ Tax & Retirement</span>
              <ChevronDown size={14} style={{ transform: openDropdown === 'tax' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
            </button>

            {openDropdown === 'tax' && (
              <div 
                onMouseLeave={() => setOpenDropdown(null)}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  width: '340px',
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15)',
                  border: '1px solid #e2e8f0',
                  padding: '10px',
                  zIndex: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  marginTop: '4px'
                }}
              >
                {taxRetirementTools.map((t) => {
                  const Icon = t.icon;
                  const isCur = t.id === activeCalculator;
                  return (
                    <a
                      key={t.id}
                      href={`?calc=${t.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo(t.id);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 10px',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        backgroundColor: isCur ? '#eff6ff' : 'transparent',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isCur ? '#eff6ff' : '#f8fafc'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isCur ? '#eff6ff' : 'transparent'}
                    >
                      <div style={{ color: isCur ? 'var(--primary)' : '#64748b' }}><Icon size={16} /></div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '13px', fontWeight: isCur ? '700' : '600', color: isCur ? 'var(--primary)' : 'var(--brand-navy)' }}>{t.name}</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t.desc}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Financial Guides */}
          <a 
            href="?calc=blogs"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('blogs');
            }}
            className={`nav-link-btn ${activeCalculator === 'blogs' ? 'active' : ''}`}
            style={{ fontSize: '13px', fontWeight: '600' }}
          >
            📚 Guides
          </a>
        </nav>

        {/* Action Buttons (Download & Share) */}
        {activeCalculatorId !== 'home' && (
          <div className="header-right no-print" style={{ display: 'flex', gap: '8px' }}>
            <button 
              className="header-action-btn share-btn" 
              onClick={handleShare}
              title="Share details"
              style={{ padding: '8px 14px', borderRadius: '6px', fontSize: '12px' }}
            >
              <Share2 size={16} />
              <span>Share</span>
            </button>

            <button 
              className="header-action-btn print-btn" 
              onClick={handlePrint}
              title="Download PDF report"
              style={{ padding: '8px 14px', borderRadius: '6px', fontSize: '12px' }}
            >
              <Printer size={16} />
              <span>Download Report</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

