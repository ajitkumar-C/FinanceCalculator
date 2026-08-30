import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { CII_TABLE, calculatePropertyCapitalGains } from '../../utils/formulas';
import { formatINR } from '../../utils/format';
import NumericInput from '../common/NumericInput';
import { 
  Building2, ShieldCheck, Share2, Copy, Check, Printer, 
  TrendingUp, Sparkles, AlertCircle, ChevronDown, Scale 
} from 'lucide-react';

export default function CapitalGainsCalculator({ setResultText }) {
  const [salePrice, setSalePrice] = useState(12000000); // 1.2 Crore
  const [purchasePrice, setPurchasePrice] = useState(5000000); // 50 Lakhs
  const [buyYear, setBuyYear] = useState('2014-15');
  const [sellYear, setSellYear] = useState('2024-25');
  const [transferExpenses, setTransferExpenses] = useState(100000);
  const [improvementCost, setImprovementCost] = useState(200000);
  const [exemptionSection54, setExemptionSection54] = useState(0);
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const results = calculatePropertyCapitalGains(
    salePrice,
    purchasePrice,
    buyYear,
    sellYear,
    transferExpenses,
    improvementCost,
    exemptionSection54
  );

  useEffect(() => {
    setResultText(
      `Property Sale: ${formatINR(salePrice)}\nPurchase Cost: ${formatINR(purchasePrice)} (${buyYear})\nIndexed Cost: ${formatINR(results.totalIndexedCost)}\nOld Regime Tax (20% with CII): ${formatINR(results.totalTaxOld)}\nNew Regime Tax (12.5% flat): ${formatINR(results.totalTaxNew)}\nRecommended: ${results.recommendedRegime === 'OLD_WITH_INDEXATION' ? 'Old Regime (with Indexation)' : 'New Regime (12.5%)'}\nTax Savings: ${formatINR(results.taxSavings)}`
    );
  }, [salePrice, purchasePrice, buyYear, sellYear, transferExpenses, improvementCost, exemptionSection54, results]);

  const handleWhatsAppShare = () => {
    let text = `*Property Capital Gains Tax Calculation (Budget 2024 Comparison)*\n`;
    text += `*Sale Price:* ${formatINR(salePrice)}\n`;
    text += `*Purchase Price:* ${formatINR(purchasePrice)} (${buyYear})\n`;
    text += `*Holding Period:* ${results.holdingYears} Years (${results.isLTCG ? 'Long-Term LTCG' : 'Short-Term STCG'})\n\n`;
    text += `*OLD REGIME (20% with Indexation):*\n`;
    text += `• Indexed Cost: ${formatINR(results.totalIndexedCost)}\n`;
    text += `• Taxable Capital Gain: ${formatINR(results.taxableGainOld)}\n`;
    text += `• Total Tax Payable: ${formatINR(results.totalTaxOld)}\n\n`;
    text += `*NEW REGIME (12.5% without Indexation):*\n`;
    text += `• Taxable Capital Gain: ${formatINR(results.taxableGainNew)}\n`;
    text += `• Total Tax Payable: ${formatINR(results.totalTaxNew)}\n\n`;
    text += `🏆 *Recommended Option:* ${results.recommendedRegime === 'OLD_WITH_INDEXATION' ? 'Old Regime (Saves ' + formatINR(results.taxSavings) + ')' : 'New Regime (Saves ' + formatINR(results.taxSavings) + ')'}\n\n`;
    text += `Calculate property capital gains tax online: https://rupeebuddy.in/?calc=capitalgains`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopySummary = () => {
    let text = `Property Capital Gains Tax Summary\nSale: ${formatINR(salePrice)}\nPurchase: ${formatINR(purchasePrice)}\nOld Regime (20% with Indexation): ${formatINR(results.totalTaxOld)}\nNew Regime (12.5% flat): ${formatINR(results.totalTaxNew)}\nRecommended: ${results.recommendedRegime === 'OLD_WITH_INDEXATION' ? 'Old Regime' : 'New Regime'} (Saves ${formatINR(results.taxSavings)})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ciiYears = Object.keys(CII_TABLE);

  const chartData = {
    labels: ['Indexed Purchase Cost', 'Exemption / Reinvestment', 'Taxable Gain', 'Estimated Tax'],
    datasets: [
      {
        data: [
          results.totalIndexedCost,
          Number(exemptionSection54) || 0,
          Math.max(0, results.taxableGainOld - results.totalTaxOld),
          results.totalTaxOld
        ],
        backgroundColor: ['#1e3a8a', '#10b981', '#cbd5e1', '#dc2626'],
        hoverBackgroundColor: ['#1d4ed8', '#059669', '#94a3b8', '#b91c1c'],
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
      q: 'What is the holding period for Long-Term Capital Gains (LTCG) on property?',
      a: 'In India, immovable property (land, residential house, or commercial building) held for more than 24 months (2 years) qualifies as a Long-Term Capital Asset. If sold within 24 months, gains are treated as Short-Term Capital Gains (STCG) and added to your income slab.'
    },
    {
      q: 'What is the Budget 2024 amendment on Property Capital Gains Tax?',
      a: 'Union Budget 2024 reduced the LTCG rate from 20% to 12.5% while removing indexation benefits. However, through a subsequent parliamentary amendment, individual resident taxpayers who acquired property before July 23, 2024 have the choice to compute tax under either: 1) 20% with indexation, or 2) 12.5% without indexation, and pay whichever amount is lower!'
    },
    {
      q: 'How does Section 54 save capital gains tax on house property?',
      a: 'Under Section 54 of the Income Tax Act, you can claim 100% tax exemption on long-term capital gains by reinvesting the gain amount into buying a new residential house (within 1 year before or 2 years after sale) or constructing a new house within 3 years.'
    },
    {
      q: 'Can I invest in 54EC Capital Gains Bonds to save tax?',
      a: 'Yes. Under Section 54EC, you can invest up to ₹50 Lakhs within 6 months of property sale into government-notified bonds (REC, PFC, NHAI, IRFC) with a 5-year lock-in period at ~5.25% p.a. interest to exempt capital gains tax.'
    }
  ];

  return (
    <div className="calculator-container">
      <div className="calculator-wrapper-grid">
        {/* Input Panel */}
        <div className="calculator-panel">
          
          {/* Sale Price */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Property Sale Price / Full Consideration</span>
              <NumericInput
                value={salePrice}
                onChange={setSalePrice}
                min={500000}
                max={1000000000}
                step={50000}
                prefix="₹"
                ariaLabel="Sale Price"
              />
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="2000000"
                max="50000000"
                step="100000"
                value={salePrice}
                onChange={(e) => setSalePrice(Number(e.target.value))}
                className="slider-input"
              />
            </div>
          </div>

          {/* Purchase Price */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Original Purchase Price</span>
              <NumericInput
                value={purchasePrice}
                onChange={setPurchasePrice}
                min={100000}
                max={salePrice}
                step={50000}
                prefix="₹"
                ariaLabel="Purchase Price"
              />
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="500000"
                max="30000000"
                step="100000"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                className="slider-input"
              />
            </div>
          </div>

          {/* Buy Year & Sell Year Selectors */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <span className="slider-label" style={{ fontSize: '13px' }}>Financial Year of Purchase</span>
              <select
                value={buyYear}
                onChange={(e) => setBuyYear(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-card)',
                  fontFamily: 'inherit',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--brand-navy)',
                  marginTop: '4px'
                }}
              >
                {ciiYears.map((y) => (
                  <option key={y} value={y}>{y} (CII: {CII_TABLE[y]})</option>
                ))}
              </select>
            </div>
            <div>
              <span className="slider-label" style={{ fontSize: '13px' }}>Financial Year of Sale</span>
              <select
                value={sellYear}
                onChange={(e) => setSellYear(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-card)',
                  fontFamily: 'inherit',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--brand-navy)',
                  marginTop: '4px'
                }}
              >
                {ciiYears.map((y) => (
                  <option key={y} value={y}>{y} (CII: {CII_TABLE[y]})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Improvement Cost & Transfer Expenses */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <span className="slider-label" style={{ fontSize: '12px' }}>Home Improvement / Renovation</span>
              <div style={{ marginTop: '4px' }}>
                <NumericInput
                  value={improvementCost}
                  onChange={setImprovementCost}
                  min={0}
                  max={50000000}
                  step={10000}
                  prefix="₹"
                  ariaLabel="Improvement Cost"
                />
              </div>
            </div>
            <div>
              <span className="slider-label" style={{ fontSize: '12px' }}>Transfer Brokerage / Legal Exp.</span>
              <div style={{ marginTop: '4px' }}>
                <NumericInput
                  value={transferExpenses}
                  onChange={setTransferExpenses}
                  min={0}
                  max={5000000}
                  step={5000}
                  prefix="₹"
                  ariaLabel="Transfer Expenses"
                />
              </div>
            </div>
          </div>

          {/* Section 54 / 54EC Exemption Reinvestment */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Section 54 / 54EC Tax Exemption Reinvestment</span>
              <NumericInput
                value={exemptionSection54}
                onChange={setExemptionSection54}
                min={0}
                max={salePrice}
                step={50000}
                prefix="₹"
                ariaLabel="Section 54 Exemption"
              />
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
              Reinvestment in new residential house (Sec 54) or Capital Gain Bonds (Sec 54EC up to ₹50L).
            </p>
          </div>

        </div>

        {/* Results Panel */}
        <div className="results-panel">
          <div className="results-header">
            <h3 className="results-title">Budget 2024 Capital Gains Tax Comparison</h3>
            <span className="results-subtitle">
              Holding Period: <strong>{results.holdingYears} Years ({results.isLTCG ? 'Long-Term LTCG' : 'Short-Term STCG'})</strong>
            </span>
          </div>

          {/* Recommendation Banner */}
          <div style={{
            margin: '16px 0',
            padding: '14px 18px',
            borderRadius: '8px',
            backgroundColor: results.recommendedRegime === 'OLD_WITH_INDEXATION' ? '#f0fdf4' : '#eff6ff',
            border: `1px solid ${results.recommendedRegime === 'OLD_WITH_INDEXATION' ? '#bbf7d0' : '#bfdbfe'}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} style={{ color: results.recommendedRegime === 'OLD_WITH_INDEXATION' ? '#166534' : '#1e40af' }} />
              <span style={{ fontSize: '14px', fontWeight: '700', color: results.recommendedRegime === 'OLD_WITH_INDEXATION' ? '#166534' : '#1e40af' }}>
                {results.recommendedRegime === 'OLD_WITH_INDEXATION' ? 'Old Regime (with Indexation) is Recommended' : 'New Regime (12.5% Flat) is Recommended'}
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-main)', margin: '4px 0 0 0' }}>
              Opting for this regime saves you <strong>{formatINR(results.taxSavings)}</strong> in income tax! (Allowed for properties bought before July 23, 2024).
            </p>
          </div>

          {/* 2 Comparison Cards (Old vs New Regime) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{
              padding: '14px',
              borderRadius: '8px',
              backgroundColor: results.recommendedRegime === 'OLD_WITH_INDEXATION' ? '#ffffff' : '#f8fafc',
              border: results.recommendedRegime === 'OLD_WITH_INDEXATION' ? '2px solid #10b981' : '1px solid #e2e8f0',
              boxShadow: results.recommendedRegime === 'OLD_WITH_INDEXATION' ? 'var(--shadow-sm)' : 'none'
            }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>Old Regime (20% + CII Indexation)</span>
              <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--brand-navy)', margin: '4px 0' }}>
                {formatINR(results.totalTaxOld)}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Indexed Cost: {formatINR(results.totalIndexedCost)}<br />
                Taxable Gain: {formatINR(results.taxableGainOld)}
              </div>
            </div>

            <div style={{
              padding: '14px',
              borderRadius: '8px',
              backgroundColor: results.recommendedRegime === 'NEW_WITHOUT_INDEXATION' ? '#ffffff' : '#f8fafc',
              border: results.recommendedRegime === 'NEW_WITHOUT_INDEXATION' ? '2px solid #2563eb' : '1px solid #e2e8f0',
              boxShadow: results.recommendedRegime === 'NEW_WITHOUT_INDEXATION' ? 'var(--shadow-sm)' : 'none'
            }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>New Regime (12.5% Flat No Indexation)</span>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#2563eb', margin: '4px 0' }}>
                {formatINR(results.totalTaxNew)}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Actual Cost: {formatINR(results.purchasePrice)}<br />
                Taxable Gain: {formatINR(results.taxableGainNew)}
              </div>
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
          Frequently Asked Questions (FAQs) on Property Capital Gains Tax
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
