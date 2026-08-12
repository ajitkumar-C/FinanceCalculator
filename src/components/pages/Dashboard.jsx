import React from 'react';
import { calculatorsList } from '../Sidebar';
import { formatINR } from '../../utils/format';
import { TrendingUp } from 'lucide-react';

export default function Dashboard({ setActiveCalculator }) {
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
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }}>
          <h2 style={{ color: 'white', fontSize: '32px', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.5px' }}>
            Simplify Your Personal Finance
          </h2>
          <p style={{ fontSize: '15px', opacity: 0.85, lineHeight: '1.6', marginBottom: '24px' }}>
            Calculate home loans, compare tax regimes, estimate mutual fund returns, plan retirement, and track government schemes instantly with our free tools.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a 
              href="?calc=tax"
              className="ad-btn" 
              style={{ display: 'inline-block', textDecoration: 'none', backgroundColor: 'var(--finance-green)', padding: '12px 24px', fontSize: '13px', fontWeight: '600', borderRadius: 'var(--radius-sm)', transition: 'var(--transition-smooth)', color: 'white' }}
              onClick={(e) => {
                e.preventDefault();
                setActiveCalculator('tax');
              }}
            >
              Compare Income Tax
            </a>
            <a 
              href="?calc=sip"
              className="ad-btn" 
              style={{ display: 'inline-block', textDecoration: 'none', backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.4)', padding: '12px 24px', fontSize: '13px', fontWeight: '600', borderRadius: 'var(--radius-sm)', transition: 'var(--transition-smooth)', color: 'white' }}
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

      {/* Grid of calculators */}
      <h3 style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--primary-color)' }}>
        Explore Financial Calculators
      </h3>
      
      <div className="calculators-grid">
        {calculatorsList.map((calc) => {
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
                Launch Tool →
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
