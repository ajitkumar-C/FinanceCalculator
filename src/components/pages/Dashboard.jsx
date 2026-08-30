import React, { useState } from 'react';
import { calculatorsList } from '../Sidebar';
import { TrendingUp, Building2, Shield, Percent, Sparkles, Layers } from 'lucide-react';

const buttonLabels = {
  tax: 'Compare Tax Savings',
  emi: 'Calculate Loan EMI',
  eligibility: 'Check Loan Eligibility',
  sip: 'Calculate SIP Growth',
  ppf: 'Calculate PPF Returns',
  pf: 'Estimate EPF Pension',
  mutualfund: 'Estimate MF Returns',
  nps: 'Estimate NPS Pension',
  retirement: 'Plan Retirement',
  fd: 'Calculate FD Interest',
  rd: 'Calculate RD Interest',
  compound: 'Calculate Compound Growth',
  clp: 'Calculate Construction Linked Plan',
  stampduty: 'Calculate Stamp Duty',
  capitalgains: 'Calculate Capital Gains Tax',
  carpetarea: 'Convert Carpet & Land Area',
  propertytax: 'Estimate Property Tax',
  rentalyield: 'Calculate Rental Yield & ROI',
  brokerage: 'Calculate Brokerage & GST',
  reralookup: 'Search State RERA Portals',
  rentalagreement: 'Draft Rental Agreement'
};

export default function Dashboard({ setActiveCalculator }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredList = selectedCategory === 'all'
    ? calculatorsList
    : calculatorsList.filter(c => c.category === selectedCategory);

  return (
    <div className="dashboard-container" style={{ padding: '4px 0' }}>
      {/* Hero Welcome banner */}
      <section className="dashboard-hero" style={{
        background: 'linear-gradient(135deg, var(--brand-navy) 0%, #1e40af 100%)',
        color: 'white',
        borderRadius: 'var(--radius-lg)',
        padding: '40px',
        marginBottom: '32px',
        boxShadow: 'var(--shadow-premium)',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '640px' }}>
          <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.5px' }}>
            Smart Financial & Real Estate Tools for India
          </h1>
          <p style={{ fontSize: '15px', opacity: 0.85, lineHeight: '1.6', marginBottom: '24px' }}>
            Calculate home loans, compare tax regimes, estimate mutual fund returns, compute state stamp duty, and draft rental agreements instantly with 100% free browser-based tools.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a 
              href="?calc=tax"
              className="ad-btn" 
              style={{ display: 'inline-block', textDecoration: 'none', backgroundColor: 'var(--finance-green)', padding: '12px 22px', fontSize: '13px', fontWeight: '600', borderRadius: 'var(--radius-sm)', transition: 'var(--transition-smooth)', color: 'white' }}
              onClick={(e) => {
                e.preventDefault();
                setActiveCalculator('tax');
              }}
            >
              Compare Income Tax
            </a>
            <a 
              href="?calc=stampduty"
              className="ad-btn" 
              style={{ display: 'inline-block', textDecoration: 'none', backgroundColor: '#d97706', padding: '12px 22px', fontSize: '13px', fontWeight: '600', borderRadius: 'var(--radius-sm)', transition: 'var(--transition-smooth)', color: 'white' }}
              onClick={(e) => {
                e.preventDefault();
                setActiveCalculator('stampduty');
              }}
            >
              Calculate Stamp Duty
            </a>
            <a 
              href="?calc=sip"
              className="ad-btn" 
              style={{ display: 'inline-block', textDecoration: 'none', backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.4)', padding: '12px 22px', fontSize: '13px', fontWeight: '600', borderRadius: 'var(--radius-sm)', transition: 'var(--transition-smooth)', color: 'white' }}
              onClick={(e) => {
                e.preventDefault();
                setActiveCalculator('sip');
              }}
            >
              Calculate SIP Growth
            </a>
          </div>
        </div>
        
        {/* Vector Background Graphic */}
        <div className="hero-graphic" style={{
          position: 'absolute',
          right: '5%',
          bottom: '-10%',
          opacity: 0.08,
          color: 'white',
          transform: 'rotate(-10deg)',
          pointerEvents: 'none',
          userSelect: 'none'
        }}>
          <TrendingUp size={220} strokeWidth={1.5} />
        </div>
      </section>

      {/* Category Filter Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--primary-color)', margin: 0 }}>
          Explore Calculators & Tools ({filteredList.length})
        </h3>
        <div className="no-print" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`quick-option-btn ${selectedCategory === 'all' ? 'active-filter' : ''}`}
            onClick={() => setSelectedCategory('all')}
            style={{
              backgroundColor: selectedCategory === 'all' ? 'var(--brand-navy)' : '#ffffff',
              color: selectedCategory === 'all' ? '#ffffff' : 'var(--text-main)',
              fontWeight: '600',
              border: '1px solid var(--border-color)',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '12px'
            }}
          >
            All ({calculatorsList.length})
          </button>
          <button
            type="button"
            className={`quick-option-btn ${selectedCategory === 'realestate' ? 'active-filter' : ''}`}
            onClick={() => setSelectedCategory('realestate')}
            style={{
              backgroundColor: selectedCategory === 'realestate' ? 'var(--brand-navy)' : '#ffffff',
              color: selectedCategory === 'realestate' ? '#ffffff' : 'var(--text-main)',
              fontWeight: '600',
              border: '1px solid var(--border-color)',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '12px'
            }}
          >
            🏡 Real Estate & Property (9)
          </button>
          <button
            type="button"
            className={`quick-option-btn ${selectedCategory === 'investment' ? 'active-filter' : ''}`}
            onClick={() => setSelectedCategory('investment')}
            style={{
              backgroundColor: selectedCategory === 'investment' ? 'var(--brand-navy)' : '#ffffff',
              color: selectedCategory === 'investment' ? '#ffffff' : 'var(--text-main)',
              fontWeight: '600',
              border: '1px solid var(--border-color)',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '12px'
            }}
          >
            📈 Investments & Wealth
          </button>
          <button
            type="button"
            className={`quick-option-btn ${selectedCategory === 'loan' ? 'active-filter' : ''}`}
            onClick={() => setSelectedCategory('loan')}
            style={{
              backgroundColor: selectedCategory === 'loan' ? 'var(--brand-navy)' : '#ffffff',
              color: selectedCategory === 'loan' ? '#ffffff' : 'var(--text-main)',
              fontWeight: '600',
              border: '1px solid var(--border-color)',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '12px'
            }}
          >
            💳 Loans & Eligibility
          </button>
        </div>
      </div>
      
      <div className="calculators-grid">
        {filteredList.map((calc) => {
          const Icon = calc.icon;
          return (
            <a 
              key={calc.id} 
              href={`?calc=${calc.id}`}
              className="calc-card"
              style={{ textDecoration: 'none', color: 'inherit' }}
              onClick={(e) => {
                e.preventDefault();
                setActiveCalculator(calc.id);
              }}
            >
              <div className="card-icon-wrapper">
                <Icon size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary-color)' }}>{calc.name}</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>{calc.desc}</p>
              </div>
              <span className="launch-link">
                {buttonLabels[calc.id] || 'Calculate Now'} →
              </span>
            </a>
          );
        })}
      </div>

      {/* Rich SEO Content Section to prevent "Thin Content" and add high-value keywords */}
      <section className="seo-rich-content-section" style={{
        marginTop: '48px',
        padding: '32px',
        background: 'var(--card-bg)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        lineHeight: '1.8',
        color: 'var(--text-main)'
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary-color)', marginBottom: '16px' }}>
          Maximize Your Wealth with RupeeBuddy's Financial Planning Suite
        </h2>
        <p style={{ fontSize: '14px', marginBottom: '20px', color: 'var(--text-muted)' }}>
          Welcome to <strong>RupeeBuddy.in</strong>, your secure, private, and expert portal for Indian personal finance calculations. Managing income tax regimes, calculating interest yields, and projecting compound growth are crucial steps in building long-term financial security. Our online calculators are designed specifically for the Indian market, incorporating the latest Union Budget tax slabs, interest rates, and regulatory guidelines.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '28px' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '10px' }}>
              ⚖️ Income Tax Planning (Old vs New Regime)
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Deciding between the Old Tax Regime and the New Tax Regime can save you thousands of rupees annually. Salaried individuals with high investments in Section 80C (PPF, ELSS, EPF), Section 80D (health insurance), and Home Loan Interest (Section 24b) often benefit from the Old Regime. However, with the revised Budget tax slabs, the New Tax Regime offers lower rates and higher rebates u/s 87A, making tax zero for taxable incomes up to ₹12 Lakhs. Use our <strong>Income Tax Calculator</strong> to compare both instantly.
            </p>
          </div>
          
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '10px' }}>
              📈 Mutual Funds & Systematic Investment Plans (SIP)
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Compounding is the eighth wonder of the world. Investing via mutual fund SIPs helps you benefit from rupee cost averaging and power-of-compounding growth over long horizons. By investing a fixed amount monthly, you build substantial retirement or child education corpora. Use our <strong>SIP Return Calculator</strong> to project your estimated gains based on expected annual compound rates of return.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '10px' }}>
              🛡️ Low-Risk Government Savings (PPF, EPF & NPS)
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              For risk-averse investors seeking guaranteed tax-free returns, the Public Provident Fund (PPF) and Employee Provident Fund (EPF) are ideal debt vehicles. Additionally, the National Pension Scheme (NPS) helps build a retirement corpus while qualifying for extra tax deductions under Sec 80CCD(1B). Our specialized calculators help you plan monthly contributions and track accumulated retirement pensions.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '10px' }}>
              🏠 Smart Borrowing: EMI & Eligibility Checkers
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Before taking out a Home Loan, Car Loan, or Personal Loan, it is critical to calculate your Equated Monthly Installment (EMI) and borrowing limits. Banks assess your eligibility using the FOIR (Fixed Obligation to Income Ratio) calculation. Our loan tools help you map your salary to eligible borrow limits, keeping your debt-to-income ratio healthy.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid var(--border-color)', fontSize: '12px', color: 'var(--text-muted)' }}>
          <p>
            <strong>Note on Privacy:</strong> RupeeBuddy does not store your salary, loan, or investment parameters on any server. All calculations are executed securely on your browser. Enjoy completely private financial planning.
          </p>
        </div>
      </section>
    </div>
  );
}
