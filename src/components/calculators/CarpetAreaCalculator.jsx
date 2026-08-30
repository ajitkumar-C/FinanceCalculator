import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { calculateAreaConversion, calculateCarpetAreaLoading, AREA_CONVERSION_FACTORS } from '../../utils/formulas';
import NumericInput from '../common/NumericInput';
import { 
  Building2, Layers, Share2, Copy, Check, Printer, 
  ArrowRightLeft, Sparkles, ChevronDown, Scale 
} from 'lucide-react';

export default function CarpetAreaCalculator({ setResultText }) {
  // Mode: 'CARPET_LOADING' | 'LAND_CONVERTER'
  const [activeTab, setActiveTab] = useState('CARPET_LOADING');
  
  // Carpet Loading States
  const [superArea, setSuperArea] = useState(1200);
  const [loadingPct, setLoadingPct] = useState(25);
  const [isReverse, setIsReverse] = useState(false); // false = Super to Carpet, true = Carpet to Super
  
  // Land Converter States
  const [converterValue, setConverterValue] = useState(1000);
  const [fromUnit, setFromUnit] = useState('SQFT');
  
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const carpetResults = calculateCarpetAreaLoading(superArea, loadingPct, isReverse);
  const conversionResults = calculateAreaConversion(converterValue, fromUnit);

  useEffect(() => {
    if (activeTab === 'CARPET_LOADING') {
      setResultText(
        `Super Built-Up Area: ${carpetResults.superArea} sq.ft\nRERA Carpet Area: ${carpetResults.carpetArea} sq.ft (${(carpetResults.carpetArea / 10.7639).toFixed(2)} sq.m)\nCommon Area: ${carpetResults.commonArea} sq.ft\nLoading: ${carpetResults.loadingPct}%`
      );
    } else {
      setResultText(
        `${converterValue} ${fromUnit} = ${conversionResults.sqFt} Sq.Ft | ${conversionResults.sqMtr} Sq.M | ${conversionResults.gaj} Gaj | ${conversionResults.guntha} Guntha | ${conversionResults.acre} Acres`
      );
    }
  }, [activeTab, superArea, loadingPct, isReverse, converterValue, fromUnit, carpetResults, conversionResults]);

  const handleWhatsAppShare = () => {
    let text = ``;
    if (activeTab === 'CARPET_LOADING') {
      text += `*RERA Carpet Area & Loading Calculation*\n`;
      text += `• *Super Built-Up Area:* ${carpetResults.superArea} sq.ft\n`;
      text += `• *RERA Net Carpet Area:* ${carpetResults.carpetArea} sq.ft (${(carpetResults.carpetArea / 10.7639).toFixed(2)} sq.m)\n`;
      text += `• *Common Area / Passages:* ${carpetResults.commonArea} sq.ft\n`;
      text += `• *Builder Loading:* ${carpetResults.loadingPct}%\n\n`;
    } else {
      text += `*Indian Land Area Conversion (${converterValue} ${fromUnit})*\n`;
      text += `• Square Feet: ${conversionResults.sqFt} sq.ft\n`;
      text += `• Square Meters: ${conversionResults.sqMtr} sq.m\n`;
      text += `• Gaj / Sq.Yards: ${conversionResults.gaj} Gaj\n`;
      text += `• Guntha: ${conversionResults.guntha} Guntha\n`;
      text += `• Bigha (Pucca): ${conversionResults.bigha} Bigha\n`;
      text += `• Acre: ${conversionResults.acre} Acres\n\n`;
    }
    text += `Calculate property carpet area and land conversion: https://rupeebuddy.in/?calc=carpetarea`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopySummary = () => {
    let text = activeTab === 'CARPET_LOADING'
      ? `Super Built-Up: ${carpetResults.superArea} sq.ft\nRERA Carpet: ${carpetResults.carpetArea} sq.ft\nCommon Area: ${carpetResults.commonArea} sq.ft\nLoading: ${carpetResults.loadingPct}%`
      : `${converterValue} ${fromUnit} = ${conversionResults.sqFt} Sq.Ft (${conversionResults.gaj} Gaj / ${conversionResults.sqMtr} Sq.M)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const chartData = {
    labels: ['RERA Carpet Area (Net Usable)', 'Common / Corridor Loading'],
    datasets: [
      {
        data: [carpetResults.carpetArea, carpetResults.commonArea],
        backgroundColor: ['#10b981', '#cbd5e1'],
        hoverBackgroundColor: ['#059669', '#94a3b8'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { font: { family: 'Inter', size: 11 }, color: '#1e293b' } },
      tooltip: { callbacks: { label: (context) => ` ${context.label}: ${context.raw} sq.ft` } },
    },
  };

  const faqs = [
    {
      q: 'What is RERA Carpet Area?',
      a: 'Under the Real Estate (Regulation and Development) Act 2016 (RERA), Carpet Area means the net usable floor area of an apartment, excluding the area covered by external walls, areas under service shafts, exclusive balcony/verandah area, and exclusive open terrace area, but includes the area covered by internal partition walls.'
    },
    {
      q: 'What is Loading Percentage in Indian Real Estate?',
      a: 'Loading percentage is the extra common area (lift lobby, staircase, clubhouse, security cabin, utility duct) added by the builder to your net carpet area to arrive at the Super Built-Up Area. Typical loading ranges from 20% to 35% in high-rise towers.'
    },
    {
      q: 'Can builders sell property based on Super Built-Up Area in India?',
      a: 'No! Under strict RERA rules, builders and developers across India are legally mandated to quote and sell flats strictly on the basis of RERA Carpet Area.'
    },
    {
      q: 'How many square feet are there in 1 Gaj / Square Yard?',
      a: '1 Gaj (also known as 1 Square Yard) is exactly equal to 9 Square Feet (0.836 Square Meters).'
    }
  ];

  return (
    <div className="calculator-container">
      {/* Tab Switcher */}
      <div className="no-print" style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button
          type="button"
          className={`quick-option-btn ${activeTab === 'CARPET_LOADING' ? 'active-filter' : ''}`}
          onClick={() => setActiveTab('CARPET_LOADING')}
          style={{
            flex: 1,
            padding: '10px 16px',
            backgroundColor: activeTab === 'CARPET_LOADING' ? 'var(--brand-navy)' : '#ffffff',
            color: activeTab === 'CARPET_LOADING' ? '#ffffff' : 'var(--text-main)',
            fontWeight: '700',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            fontSize: '14px'
          }}
        >
          📐 RERA Carpet Area & Loading %
        </button>
        <button
          type="button"
          className={`quick-option-btn ${activeTab === 'LAND_CONVERTER' ? 'active-filter' : ''}`}
          onClick={() => setActiveTab('LAND_CONVERTER')}
          style={{
            flex: 1,
            padding: '10px 16px',
            backgroundColor: activeTab === 'LAND_CONVERTER' ? 'var(--brand-navy)' : '#ffffff',
            color: activeTab === 'LAND_CONVERTER' ? '#ffffff' : 'var(--text-main)',
            fontWeight: '700',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            fontSize: '14px'
          }}
        >
          🔄 Indian Land Area Unit Converter
        </button>
      </div>

      {activeTab === 'CARPET_LOADING' ? (
        <div className="calculator-wrapper-grid">
          {/* Input Panel */}
          <div className="calculator-panel">
            {/* Mode Switcher (Super to Carpet vs Carpet to Super) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span className="slider-label">Calculation Direction</span>
              <button
                type="button"
                onClick={() => setIsReverse(!isReverse)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'var(--brand-navy)',
                  cursor: 'pointer'
                }}
              >
                <ArrowRightLeft size={14} /> {isReverse ? 'Carpet Area ➔ Super Built-Up' : 'Super Built-Up ➔ Carpet Area'}
              </button>
            </div>

            {/* Area Input */}
            <div className="slider-group">
              <div className="slider-header">
                <span className="slider-label">{isReverse ? 'RERA Net Carpet Area' : 'Super Built-Up Area'}</span>
                <NumericInput
                  value={superArea}
                  onChange={setSuperArea}
                  min={100}
                  max={20000}
                  step={10}
                  suffix=" sq.ft"
                  ariaLabel="Area Input"
                />
              </div>
              <div className="slider-control-row">
                <input
                  type="range"
                  min="300"
                  max="5000"
                  step="25"
                  value={superArea}
                  onChange={(e) => setSuperArea(Number(e.target.value))}
                  className="slider-input"
                />
              </div>
              <div className="quick-options-row no-print">
                <button type="button" className="quick-option-btn" onClick={() => setSuperArea(650)}>650 sq.ft (1 BHK)</button>
                <button type="button" className="quick-option-btn" onClick={() => setSuperArea(1050)}>1050 sq.ft (2 BHK)</button>
                <button type="button" className="quick-option-btn" onClick={() => setSuperArea(1500)}>1500 sq.ft (3 BHK)</button>
                <button type="button" className="quick-option-btn" onClick={() => setSuperArea(2200)}>2200 sq.ft (4 BHK)</button>
              </div>
            </div>

            {/* Loading Percentage Slider */}
            <div className="slider-group">
              <div className="slider-header">
                <span className="slider-label">Builder Loading Percentage</span>
                <NumericInput
                  value={loadingPct}
                  onChange={setLoadingPct}
                  min={0}
                  max={60}
                  step={1}
                  suffix="%"
                  ariaLabel="Loading Percentage"
                />
              </div>
              <div className="slider-control-row">
                <input
                  type="range"
                  min="10"
                  max="45"
                  step="1"
                  value={loadingPct}
                  onChange={(e) => setLoadingPct(Number(e.target.value))}
                  className="slider-input"
                />
              </div>
              <div className="quick-options-row no-print">
                <button type="button" className="quick-option-btn" onClick={() => setLoadingPct(18)}>18% (Low)</button>
                <button type="button" className="quick-option-btn" onClick={() => setLoadingPct(25)}>25% (Standard)</button>
                <button type="button" className="quick-option-btn" onClick={() => setLoadingPct(32)}>32% (High-Rise)</button>
                <button type="button" className="quick-option-btn" onClick={() => setLoadingPct(38)}>38% (Luxury)</button>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="results-panel">
            <div className="results-header">
              <h3 className="results-title">Carpet vs Super Built-Up Breakdown</h3>
              <span className="results-subtitle">
                Usable Ratio: <strong>{(100 / (1 + loadingPct / 100)).toFixed(1)}% Net Usable</strong>
              </span>
            </div>

            <div className="output-cards-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '16px' }}>
              <div className="output-summary-card" style={{ padding: '14px', background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                <span className="summary-card-label" style={{ color: '#166534' }}>RERA Net Carpet Area</span>
                <span className="summary-card-value" style={{ color: '#15803d', fontSize: '22px' }}>
                  {carpetResults.carpetArea} sq.ft
                </span>
                <span style={{ fontSize: '11px', color: '#166534' }}>
                  ≈ {(carpetResults.carpetArea / 10.7639).toFixed(2)} sq. meters
                </span>
              </div>

              <div className="output-summary-card" style={{ padding: '14px', background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                <span className="summary-card-label" style={{ color: '#1e40af' }}>Super Built-Up Area</span>
                <span className="summary-card-value" style={{ color: '#1d4ed8', fontSize: '22px' }}>
                  {carpetResults.superArea} sq.ft
                </span>
                <span style={{ fontSize: '11px', color: '#1e40af' }}>
                  Total saleable area
                </span>
              </div>

              <div className="output-summary-card" style={{ padding: '14px', background: '#f8fafc' }}>
                <span className="summary-card-label">Common Passage / Amenities</span>
                <span className="summary-card-value" style={{ color: 'var(--brand-navy)', fontSize: '20px' }}>
                  {carpetResults.commonArea} sq.ft
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Corridor, lobby, ducts ({loadingPct}% loading)
                </span>
              </div>

              <div className="output-summary-card" style={{ padding: '14px', background: '#f8fafc' }}>
                <span className="summary-card-label">Area in Gaj (Sq.Yards)</span>
                <span className="summary-card-value" style={{ color: 'var(--brand-navy)', fontSize: '20px' }}>
                  {(carpetResults.carpetArea / 9).toFixed(1)} Gaj
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Carpet area in North India units
                </span>
              </div>
            </div>

            {/* Share / Copy */}
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
            </div>

            {/* Doughnut Chart */}
            <div className="chart-container-wrapper" style={{ marginTop: '20px' }}>
              <div className="chart-wrapper">
                <Doughnut data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Land Unit Converter Grid */
        <div>
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <span className="slider-label">Enter Area Value</span>
                <NumericInput
                  value={converterValue}
                  onChange={setConverterValue}
                  min={0.01}
                  max={10000000}
                  step={1}
                  ariaLabel="Area Value"
                />
              </div>
              <div>
                <span className="slider-label">Select Source Unit</span>
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-card)',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--brand-navy)'
                  }}
                >
                  <option value="SQFT">Square Feet (Sq.Ft)</option>
                  <option value="SQMTR">Square Meters (Sq.M)</option>
                  <option value="SQYD_GAJ">Gaj / Square Yards (Gaj)</option>
                  <option value="GUNTHA">Guntha (Maharashtra, Karnataka, Gujarat)</option>
                  <option value="BIGHA_PUCCA">Bigha Pucca (North India)</option>
                  <option value="MARLA">Marla (Punjab, Haryana)</option>
                  <option value="KANAL">Kanal (Punjab, Haryana)</option>
                  <option value="CENT">Cent (Kerala, Tamil Nadu)</option>
                  <option value="GROUND">Ground (Tamil Nadu)</option>
                  <option value="ACRE">Acre</option>
                  <option value="HECTARE">Hectare</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grid of Converted Units */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div style={{ padding: '16px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Square Feet</span>
              <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--brand-navy)' }}>{conversionResults.sqFt.toLocaleString('en-IN')} sq.ft</div>
            </div>
            <div style={{ padding: '16px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Square Meters</span>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#2563eb' }}>{conversionResults.sqMtr.toLocaleString('en-IN')} sq.m</div>
            </div>
            <div style={{ padding: '16px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Gaj / Square Yards</span>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#166534' }}>{conversionResults.gaj.toLocaleString('en-IN')} Gaj</div>
            </div>
            <div style={{ padding: '16px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Guntha</span>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#d97706' }}>{conversionResults.guntha} Guntha</div>
            </div>
            <div style={{ padding: '16px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Bigha (Standard Pucca)</span>
              <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--brand-navy)' }}>{conversionResults.bigha} Bigha</div>
            </div>
            <div style={{ padding: '16px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Acre</span>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#7c3aed' }}>{conversionResults.acre} Acres</div>
            </div>
            <div style={{ padding: '16px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Cent (South India)</span>
              <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--brand-navy)' }}>{conversionResults.cent} Cents</div>
            </div>
            <div style={{ padding: '16px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Marla / Kanal</span>
              <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--brand-navy)' }}>{conversionResults.marla} Marla ({conversionResults.kanal} Kanal)</div>
            </div>
          </div>
        </div>
      )}

      {/* SEO & FAQs Guide */}
      <div className="calculator-guide-section no-print" style={{ marginTop: '40px' }}>
        <h3 style={{ fontSize: '20px', color: 'var(--brand-navy)', marginBottom: '16px', fontWeight: '700' }}>
          Frequently Asked Questions (FAQs) on Carpet Area & Land Conversion
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
