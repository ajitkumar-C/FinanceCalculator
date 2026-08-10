import React from 'react';
import { calculatorsList } from '../Sidebar';
import { formatINR } from '../../utils/format';

export default function Dashboard({ setActiveCalculator }) {
  return (
    <div className="dashboard-container">
      {/* Hero Welcome banner */}
      <section className="dashboard-hero" style={{
        background: 'linear-gradient(135deg, var(--brand-navy) 0%, #1e40af 100%)',
        color: 'white',
        borderRadius: 'var(--radius-lg)',
        padding: '36px',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-md)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }}>
          <h2 style={{ color: 'white', fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>
            Simplify Your Personal Finance 🇮🇳
          </h2>
          <p style={{ fontSize: '15px', opacity: 0.9, lineHeight: '1.6', marginBottom: '20px' }}>
            Calculate home loans, compare tax regimes, estimate mutual fund returns, plan retirement, and track government schemes instantly with our free tools.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              className="ad-btn" 
              style={{ backgroundColor: 'var(--finance-green)', padding: '10px 18px', fontSize: '13px' }}
              onClick={() => setActiveCalculator('tax')}
            >
              Compare Income Tax
            </button>
            <button 
              className="ad-btn" 
              style={{ backgroundColor: 'transparent', border: '1px solid white', padding: '10px 18px', fontSize: '13px' }}
              onClick={() => setActiveCalculator('sip')}
            >
              Calculate SIP Growth
            </button>
          </div>
        </div>
        <span className="hero-emoji" style={{
          position: 'absolute',
          right: '40px',
          bottom: '20px',
          fontSize: '120px',
          opacity: 0.15,
          userSelect: 'none',
          pointerEvents: 'none'
        }}>📈</span>
      </section>

      {/* Grid of calculators */}
      <h3 style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--primary-color)' }}>
        Explore Financial Calculators
      </h3>
      
      <div className="calculators-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '24px'
      }}>
        {calculatorsList.map((calc) => {
          const Icon = calc.icon;
          return (
            <div 
              key={calc.id} 
              className="calc-card"
              onClick={() => setActiveCalculator(calc.id)}
              style={{
                backgroundColor: 'white',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--brand-navy)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--brand-navy-light)',
                color: 'var(--brand-navy)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Icon size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary-color)' }}>{calc.name}</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>{calc.desc}</p>
              </div>
              <span style={{
                marginTop: 'auto',
                fontSize: '12px',
                color: 'var(--brand-navy)',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                Launch Tool →
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
