import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { MUNICIPAL_TAX_CONFIG, calculatePropertyTax } from '../../utils/formulas';
import { formatINR } from '../../utils/format';
import NumericInput from '../common/NumericInput';
import { 
  Building2, MapPin, Share2, Copy, Check, Printer, 
  Calendar, ChevronDown, DollarSign, Scale 
} from 'lucide-react';

export default function PropertyTaxCalculator({ setResultText }) {
  const [selectedCity, setSelectedCity] = useState('MUMBAI_BMC');
  const [builtUpSqFt, setBuiltUpSqFt] = useState(1000);
  const [ageYears, setAgeYears] = useState(5);
  const [isCommercial, setIsCommercial] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const results = calculatePropertyTax(selectedCity, builtUpSqFt, ageYears, isCommercial);

  useEffect(() => {
    setResultText(
      `Municipal Corporation: ${results.cityName}\nArea: ${builtUpSqFt} sq.ft (${isCommercial ? 'Commercial' : 'Residential'})\nProperty Age: ${ageYears} Years (Depreciation: ${results.depreciationPct}%)\nAnnual Property Tax: ${formatINR(results.totalAnnualTax)}/year\nMonthly Tax Outgo: ${formatINR(results.monthlyTax)}/mo`
    );
  }, [selectedCity, builtUpSqFt, ageYears, isCommercial, results]);

  const handleWhatsAppShare = () => {
    let text = `*Municipal Property Tax Estimation*\n`;
    text += `*City / Authority:* ${results.cityName}\n`;
    text += `*Built-Up Area:* ${builtUpSqFt} sq.ft (${isCommercial ? 'Commercial' : 'Residential'})\n`;
    text += `*Property Age:* ${ageYears} Years\n\n`;
    text += `• Base Property Tax: ${formatINR(results.propertyTax)}\n`;
    text += `• Sewerage / Water Cess: ${formatINR(results.sewerageCess)}\n`;
    text += `• Education & State Cess: ${formatINR(results.educationCess)}\n`;
    text += `• *Total Annual Property Tax:* ${formatINR(results.totalAnnualTax)}/year\n`;
    text += `• *Monthly Equivalent:* ${formatINR(results.monthlyTax)}/month\n\n`;
    text += `Estimate municipal property tax online: https://rupeebuddy.in/?calc=propertytax`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopySummary = () => {
    let text = `Property Tax Summary\nCity: ${results.cityName}\nArea: ${builtUpSqFt} sq.ft\nAnnual Tax: ${formatINR(results.totalAnnualTax)}/year (${formatINR(results.monthlyTax)}/mo)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const chartData = {
    labels: ['General Property Tax', 'Sewerage / Water Cess', 'Education Cess'],
    datasets: [
      {
        data: [results.propertyTax, results.sewerageCess, results.educationCess],
        backgroundColor: ['#1e3a8a', '#10b981', '#d97706'],
        hoverBackgroundColor: ['#1d4ed8', '#059669', '#b45309'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { font: { family: 'Inter', size: 11 }, color: '#1e293b' } },
      tooltip: { callbacks: { label: (context) => ` ${context.label}: ${formatINR(context.raw)}` } },
    },
  };

  const faqs = [
    {
      q: 'How is Property Tax calculated by Indian Municipal Corporations?',
      a: 'Most Indian municipalities (like BMC Mumbai, BBMP Bangalore, MCD Delhi) use either the Capital Value System (CVS) or Unit Area Value (UAV) method based on built-up area, usage (residential vs commercial), construction age, and locality ready reckoner rates.'
    },
    {
      q: 'What happens if I delay paying my annual Property Tax?',
      a: 'Municipal corporations charge late payment penalties typically ranging between 1% and 2% per month (12% to 24% p.a.) on unpaid dues.'
    },
    {
      q: 'Can Property Tax be paid online?',
      a: 'Yes, all major municipal corporations in India offer instant online property tax payment portals using your Property Identification Number (PID / SAS / Assessment No).'
    }
  ];

  return (
    <div className="calculator-container">
      <div className="calculator-wrapper-grid">
        {/* Input Panel */}
        <div className="calculator-panel">
          
          {/* City Selector */}
          <div className="slider-group">
            <span className="slider-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={16} className="text-primary" /> Select Municipal Corporation / City
            </span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-card)',
                fontFamily: 'inherit',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--brand-navy)',
                marginTop: '6px'
              }}
            >
              {Object.keys(MUNICIPAL_TAX_CONFIG).map((key) => (
                <option key={key} value={key}>{MUNICIPAL_TAX_CONFIG[key].name}</option>
              ))}
            </select>
          </div>

          {/* Built-Up Area */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Built-Up / Carpet Area</span>
              <NumericInput
                value={builtUpSqFt}
                onChange={setBuiltUpSqFt}
                min={100}
                max={20000}
                step={25}
                suffix=" sq.ft"
                ariaLabel="Built-up Area"
              />
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="300"
                max="5000"
                step="50"
                value={builtUpSqFt}
                onChange={(e) => setBuiltUpSqFt(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="quick-options-row no-print">
              <button type="button" className="quick-option-btn" onClick={() => setBuiltUpSqFt(650)}>650 sq.ft</button>
              <button type="button" className="quick-option-btn" onClick={() => setBuiltUpSqFt(1000)}>1000 sq.ft</button>
              <button type="button" className="quick-option-btn" onClick={() => setBuiltUpSqFt(1500)}>1500 sq.ft</button>
              <button type="button" className="quick-option-btn" onClick={() => setBuiltUpSqFt(2500)}>2500 sq.ft</button>
            </div>
          </div>

          {/* Property Age Slider */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Property Age (for Depreciation)</span>
              <NumericInput
                value={ageYears}
                onChange={setAgeYears}
                min={0}
                max={50}
                step={1}
                suffix=" Years"
                ariaLabel="Property Age"
              />
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="0"
                max="40"
                step="1"
                value={ageYears}
                onChange={(e) => setAgeYears(Number(e.target.value))}
                className="slider-input"
              />
            </div>
          </div>

          {/* Usage Type Toggle */}
          <div className="slider-group no-print">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="slider-label">Property Usage</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className={`quick-option-btn ${!isCommercial ? 'active-filter' : ''}`}
                  onClick={() => setIsCommercial(false)}
                  style={{
                    backgroundColor: !isCommercial ? 'var(--brand-navy)' : 'var(--bg-light)',
                    color: !isCommercial ? '#ffffff' : 'var(--text-main)',
                    fontWeight: '600',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  🏡 Residential
                </button>
                <button
                  type="button"
                  className={`quick-option-btn ${isCommercial ? 'active-filter' : ''}`}
                  onClick={() => setIsCommercial(true)}
                  style={{
                    backgroundColor: isCommercial ? 'var(--brand-navy)' : 'var(--bg-light)',
                    color: isCommercial ? '#ffffff' : 'var(--text-main)',
                    fontWeight: '600',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  🏢 Commercial
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Results Panel */}
        <div className="results-panel">
          <div className="results-header">
            <h3 className="results-title">Annual Property Tax Estimate</h3>
            <span className="results-subtitle">
              {results.cityName} &bull; Age Depreciation: <strong>{results.depreciationPct}%</strong>
            </span>
          </div>

          <div className="output-cards-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '16px' }}>
            <div className="output-summary-card" style={{ padding: '14px', background: '#eff6ff', border: '1px solid #bfdbfe' }}>
              <span className="summary-card-label" style={{ color: '#1e40af' }}>Total Annual Tax</span>
              <span className="summary-card-value" style={{ color: '#1d4ed8', fontSize: '22px' }}>
                {formatINR(results.totalAnnualTax)}
              </span>
              <span style={{ fontSize: '11px', color: '#1e40af' }}>
                Payable annually to municipality
              </span>
            </div>

            <div className="output-summary-card" style={{ padding: '14px', background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
              <span className="summary-card-label" style={{ color: '#166534' }}>Monthly Equivalent</span>
              <span className="summary-card-value" style={{ color: '#15803d', fontSize: '22px' }}>
                {formatINR(results.monthlyTax)} / mo
              </span>
              <span style={{ fontSize: '11px', color: '#166534' }}>
                Monthly escrow / holding cost
              </span>
            </div>

            <div className="output-summary-card" style={{ padding: '14px', background: '#f8fafc' }}>
              <span className="summary-card-label">General Property Tax</span>
              <span className="summary-card-value" style={{ color: 'var(--brand-navy)', fontSize: '18px' }}>
                {formatINR(results.propertyTax)}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Base municipal levy
              </span>
            </div>

            <div className="output-summary-card" style={{ padding: '14px', background: '#f8fafc' }}>
              <span className="summary-card-label">Sewerage & Education Cess</span>
              <span className="summary-card-value" style={{ color: 'var(--brand-navy)', fontSize: '18px' }}>
                {formatINR(results.sewerageCess + results.educationCess)}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Civic infrastructure surcharges
              </span>
            </div>
          </div>

          {/* Action / Share Bar */}
          <div className="no-print" style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <button
              type="button"
              onClick={handleWhatsAppShare}
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 14px',
                backgroundColor: '#25D366',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <Share2 size={16} /> Share on WhatsApp
            </button>
            <button
              type="button"
              onClick={handleCopySummary}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 14px',
                backgroundColor: '#ffffff',
                color: 'var(--brand-navy)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 14px',
                backgroundColor: '#ffffff',
                color: 'var(--brand-navy)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <Printer size={16} /> Print
            </button>
          </div>

          {/* Doughnut Chart */}
          <div className="chart-container-wrapper" style={{ marginTop: '20px' }}>
            <div className="chart-wrapper">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          </div>

        </div>
      </div>

      {/* SEO & FAQs Guide */}
      <div className="calculator-guide-section no-print" style={{ marginTop: '40px' }}>
        <h3 style={{ fontSize: '20px', color: 'var(--brand-navy)', marginBottom: '16px', fontWeight: '700' }}>
          Frequently Asked Questions (FAQs) on Municipal Property Tax
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
