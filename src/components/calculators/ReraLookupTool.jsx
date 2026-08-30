import React, { useState } from 'react';
import { 
  Building2, ShieldCheck, ExternalLink, Search, CheckCircle2, 
  AlertTriangle, Share2, Printer, ChevronDown, MapPin 
} from 'lucide-react';

const STATE_RERA_DIRECTORY = [
  { state: 'Maharashtra', authority: 'MahaRERA', url: 'https://maharera.mahaonline.gov.in/', desc: 'Search 45,000+ registered residential & commercial projects across Mumbai, Pune, Nagpur.' },
  { state: 'Uttar Pradesh', authority: 'UP RERA', url: 'https://www.up-rera.in/', desc: 'Search Noida, Greater Noida, Ghaziabad, Lucknow builder project filings and complaint orders.' },
  { state: 'Karnataka', authority: 'K-RERA', url: 'https://rera.karnataka.gov.in/', desc: 'Verify Bangalore, Mysore RERA registrations, quarterly progress updates, and completion timelines.' },
  { state: 'Delhi', authority: 'Delhi RERA', url: 'https://rera.delhi.gov.in/', desc: 'Official portal for national capital territory builder registrations and agent licenses.' },
  { state: 'Haryana (Gurugram & Panchkula)', authority: 'HARERA', url: 'https://haryanarera.gov.in/', desc: 'Check Gurugram, Faridabad, Panchkula affordable housing & luxury high-rise RERA certificates.' },
  { state: 'Gujarat', authority: 'GujRERA', url: 'https://gujrera.gujarat.gov.in/', desc: 'Official portal for Ahmedabad, Surat, Vadodara real estate project lookup.' },
  { state: 'Tamil Nadu', authority: 'TNRERA', url: 'https://www.rera.tn.gov.in/', desc: 'Search Chennai, Coimbatore, Madurai residential layouts and promoter approvals.' },
  { state: 'Telangana', authority: 'TG RERA', url: 'https://rera.telangana.gov.in/', desc: 'Search Hyderabad IT corridor and Telangana layout promoter filings and bank accounts.' },
  { state: 'Rajasthan', authority: 'Raj RERA', url: 'https://rera.rajasthan.gov.in/', desc: 'Verify Jaipur, Jodhpur, Udaipur builder compliance certificates.' },
  { state: 'West Bengal', authority: 'WB RERA', url: 'https://rera.wb.gov.in/', desc: 'Search Kolkata, Howrah real estate registrations and legal disclosures.' },
  { state: 'Kerala', authority: 'K-RERA (Kerala)', url: 'https://rera.kerala.gov.in/', desc: 'Search Kochi, Thiruvananthapuram apartment project registrations.' },
  { state: 'Madhya Pradesh', authority: 'MP RERA', url: 'https://rera.mp.gov.in/', desc: 'Verify Bhopal, Indore builder registrations and quarterly progress reports.' }
];

const COMPLIANCE_CHECKLIST = [
  { title: '1. RERA Registration Number Validation', desc: 'Ensure the project has a valid state RERA registration certificate displayed on all marketing banners and brochures.' },
  { title: '2. 70% Designated Escrow Bank Account', desc: 'Confirm that all payments are deposited strictly into the RERA Designated 70% Bank Escrow account for project construction.' },
  { title: '3. Sanctioned Floor & Superstructure Plans', desc: 'Verify that the floor you are purchasing is part of the approved municipal sanctioned plans uploaded on RERA.' },
  { title: '4. Clear Title & Encumbrance Certificate', desc: 'Check that the land title is marketable and free of undisclosed bank mortgages or litigations.' },
  { title: '5. Promised Possession Date in Agreement', desc: 'Ensure the possession date in your Agreement for Sale matches the date registered on the RERA portal.' },
  { title: '6. Net RERA Carpet Area Quotation', desc: 'Make sure your price cost sheet is calculated based on RERA Net Carpet Area, not vague Super Built-up area.' }
];

export default function ReraLookupTool() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const filteredStates = STATE_RERA_DIRECTORY.filter(
    (item) =>
      item.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.authority.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const faqs = [
    {
      q: 'Why must every homebuyer verify RERA registration before booking?',
      a: 'Section 3 of the RERA Act 2016 makes it illegal for any builder to advertise, market, book, or sell an apartment in a project without RERA registration. Verifying registration protects you against unapproved layouts and delayed possession.'
    },
    {
      q: 'What is the compensation if a builder delays possession under RERA?',
      a: 'Under Section 18 of RERA, if a promoter fails to deliver possession on the registered date, the buyer has the right to withdraw and claim 100% refund with interest (SBI MCLR + 2%). If the buyer stays in the project, the builder must pay monthly delay interest until physical handover.'
    },
    {
      q: 'How to check if a builder has diverted funds?',
      a: 'RERA mandates that 70% of all customer collections must be deposited in a designated escrow account and withdrawn only upon certification by an architect, structural engineer, and chartered accountant. These certificates are publicly viewable on state RERA portals.'
    }
  ];

  return (
    <div className="calculator-container">
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)', color: '#ffffff', padding: '28px', borderRadius: '12px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <ShieldCheck size={32} style={{ color: '#60a5fa' }} />
          <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0, color: '#ffffff' }}>
            All-India State RERA Project Lookup & Verification Directory
          </h2>
        </div>
        <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6', margin: 0, maxWidth: '800px' }}>
          Direct portal access to all 20+ State Real Estate Regulatory Authorities (RERAs). Verify project approvals, sanctioned floor plans, builder escrow bank accounts, and quarterly construction timelines before paying any booking token.
        </p>
      </div>

      {/* Search Input */}
      <div style={{ background: '#ffffff', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by state or authority (e.g., Maharashtra, MahaRERA, Karnataka, UP RERA)..."
            style={{
              width: '100%',
              padding: '10px 14px 10px 42px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              fontSize: '14px',
              fontFamily: 'inherit'
            }}
          />
        </div>
      </div>

      {/* State Portals Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '36px' }}>
        {filteredStates.map((item, index) => (
          <div
            key={index}
            style={{
              background: '#ffffff',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)', background: '#eff6ff', padding: '2px 8px', borderRadius: '4px' }}>
                  {item.authority}
                </span>
                <span style={{ fontSize: '11px', color: '#166534', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={12} /> Official Portal
                </span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--brand-navy)', margin: '4px 0 8px 0' }}>
                {item.state}
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                {item.desc}
              </p>
            </div>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: '16px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '8px 14px',
                backgroundColor: '#1e3a8a',
                color: '#ffffff',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none'
              }}
            >
              Open {item.authority} Search <ExternalLink size={14} />
            </a>
          </div>
        ))}
      </div>

      {/* 6-Point Due Diligence Checklist */}
      <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '36px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--brand-navy)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={20} className="text-primary" /> 6-Point RERA Due Diligence Checklist for Homebuyers
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {COMPLIANCE_CHECKLIST.map((c, i) => (
            <div key={i} style={{ background: '#ffffff', padding: '14px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--brand-navy)', marginBottom: '4px' }}>
                {c.title}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-main)', lineHeight: '1.6' }}>
                {c.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="calculator-guide-section no-print">
        <h3 style={{ fontSize: '20px', color: 'var(--brand-navy)', marginBottom: '16px', fontWeight: '700' }}>
          Frequently Asked Questions (FAQs) on RERA Verification
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} style={{ background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--brand-navy)'
                  }}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      color: 'var(--text-muted)',
                      flexShrink: 0
                    }}
                  />
                </button>
                {isOpen && (
                  <div style={{ padding: '0 18px 16px 18px', fontSize: '13px', color: 'var(--text-main)', lineHeight: '1.6' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
