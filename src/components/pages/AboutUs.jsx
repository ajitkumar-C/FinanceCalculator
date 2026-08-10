import React from 'react';

export default function AboutUs() {
  return (
    <div className="seo-rich-content-section" style={{ border: 'none', boxShadow: 'none', padding: 0 }}>
      <h2>About Us - RupeeBuddy.in</h2>
      <p>
        Welcome to <strong>RupeeBuddy.in</strong>, your premier destination for clear, interactive, and completely free personal finance utilities. Our mission is simple: to empower Indian citizens to take control of their financial destinies through math-driven, easy-to-use calculator tools.
      </p>

      <h3>Why We Built RupeeBuddy</h3>
      <p>
        Personal finance in India can be complicated. With shifting income tax structures (Old vs New regimes), multi-faceted government schemes (like PPF, EPF, and NPS), and a booming mutual fund market (SIPs and lumpsum deposits), make commercial decisions is overwhelming. 
      </p>
      <p>
        We noticed that many online calculators are cluttered with ads, require manual typing of large numbers, or push users towards purchasing third-party financial products. We created RupeeBuddy.in to provide a clean, visual-first platform where you can drag sliders, watch wealth grow, and export reports instantly without sales pitches.
      </p>

      <h3>Our Core Pillars</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', margin: '20px 0' }}>
        <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          <h4 style={{ color: 'var(--brand-navy)', marginBottom: '8px' }}>🔐 100% Privacy</h4>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            We process all financial calculations directly inside your browser. We never collect, transmit, or store your salary or investment inputs.
          </p>
        </div>
        <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          <h4 style={{ color: 'var(--brand-navy)', marginBottom: '8px' }}>📊 Interactive Insights</h4>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Rather than showing flat numbers, we render responsive charts and cumulative summaries to help you visualize compounding growth curves.
          </p>
        </div>
        <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          <h4 style={{ color: 'var(--brand-navy)', marginBottom: '8px' }}>🇮🇳 Tailored for India</h4>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Every tool is aligned with Indian banking practices, quarterly compounding standards, and the latest Union Budget tax slabs.
          </p>
        </div>
      </div>

      <h3>General Disclaimer</h3>
      <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
        RupeeBuddy.in provides mathematical estimates based on user inputs. While we make every effort to maintain the accuracy of our formulas according to prevailing tax slabs and compound methodologies, these figures are for educational and illustrative purposes. Please consult with a qualified financial advisor before making commercial commitments.
      </p>
    </div>
  );
}
