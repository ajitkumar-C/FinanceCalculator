import React from 'react';

export default function AboutUs({ setActiveCalculator }) {
  return (
    <div className="seo-rich-content-section" style={{ border: 'none', boxShadow: 'none', padding: 0 }}>
      <h2>About Us - RupeeBuddy.in</h2>
      <p>
        Welcome to <strong>RupeeBuddy.in</strong>, your premier destination for clear, interactive, and completely free personal finance and real estate utilities. Our mission is simple: to empower Indian citizens, taxpayers, and homebuyers to take control of their financial destinies through math-driven, easy-to-use calculator tools.
      </p>

      <h3>Why We Built RupeeBuddy</h3>
      <p>
        Personal finance in India can be complicated. With shifting income tax structures (Old vs New regimes), multi-faceted statutory schemes (like PPF, EPF, and NPS), and a booming mutual fund market (SIPs and lumpsum deposits), making commercial decisions is overwhelming. 
      </p>
      <p>
        We noticed that many online calculators are cluttered with ads, require entering personal mobile numbers that lead to aggressive telemarketing calls, or push users towards purchasing third-party financial products. We created RupeeBuddy.in to provide a clean, visual-first platform where you can drag sliders, watch wealth grow, and export reports instantly with <strong>100% privacy</strong>.
      </p>

      <h3>Our Core Pillars</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', margin: '20px 0' }}>
        <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          <h4 style={{ color: 'var(--brand-navy)', marginBottom: '8px' }}>🔐 100% Client-Side Privacy</h4>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            We process all financial calculations directly inside your browser. We never collect, transmit, or store your salary or investment inputs.
          </p>
        </div>
        <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          <h4 style={{ color: 'var(--brand-navy)', marginBottom: '8px' }}>📊 Interactive Insights</h4>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Rather than showing flat numbers, we render responsive charts, amortization tables, and cumulative summaries to help you visualize compounding growth curves.
          </p>
        </div>
        <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          <h4 style={{ color: 'var(--brand-navy)', marginBottom: '8px' }}>🇮🇳 Tailored for India</h4>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Every tool is strictly aligned with Indian banking practices, quarterly compounding standards, and the latest Union Budget tax slabs (FY 2026-27).
          </p>
        </div>
        <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          <h4 style={{ color: 'var(--brand-navy)', marginBottom: '8px' }}>🛡️ E-E-A-T Verified Standards</h4>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Formulas are reviewed by our panel of Chartered Accountants (FCA/ACA) and SEBI Registered Investment Advisors. Read our detailed{' '}
            <a 
              href="/editorial-policy" 
              onClick={(e) => {
                if (setActiveCalculator) {
                  e.preventDefault();
                  setActiveCalculator('editorial');
                }
              }}
              style={{ color: 'var(--brand-blue)', fontWeight: '600' }}
            >
              Editorial Policy
            </a>.
          </p>
        </div>
      </div>

      <h3>General Disclaimer</h3>
      <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
        RupeeBuddy.in provides mathematical estimates based on user inputs. While we make every effort to maintain the accuracy of our formulas according to prevailing tax slabs, RBI guidelines, and compound methodologies, these figures are for educational and illustrative purposes. Please consult with a qualified financial advisor or tax consultant before making commercial commitments.
      </p>
    </div>
  );
}
