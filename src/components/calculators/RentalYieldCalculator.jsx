import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { calculateRentalYield } from '../../utils/formulas';
import { formatINR } from '../../utils/format';
import NumericInput from '../common/NumericInput';
import { 
  Building2, TrendingUp, Share2, Copy, Check, Printer, 
  Percent, Sparkles, ChevronDown, DollarSign, Scale 
} from 'lucide-react';

export default function RentalYieldCalculator({ setResultText }) {
  const [propertyCost, setPropertyCost] = useState(7500000); // 75 Lakhs
  const [monthlyRent, setMonthlyRent] = useState(30000); // 30k/mo
  const [annualMaintenance, setAnnualMaintenance] = useState(36000); // 3k/mo maintenance
  const [propertyTax, setPropertyTax] = useState(12000); // 12k/yr tax
  const [vacancyWeeks, setVacancyWeeks] = useState(2); // 2 weeks
  const [expectedAppreciationRate, setExpectedAppreciationRate] = useState(6.0); // 6% p.a.
  const [holdingYears, setHoldingYears] = useState(10); // 10 years
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const results = calculateRentalYield(
    propertyCost,
    monthlyRent,
    annualMaintenance,
    propertyTax,
    vacancyWeeks,
    expectedAppreciationRate,
    holdingYears
  );

  useEffect(() => {
    setResultText(
      `Property Price: ${formatINR(propertyCost)}\nMonthly Rent: ${formatINR(monthlyRent)}\nGross Rental Yield: ${results.grossRentalYield}%\nNet Rental Yield: ${results.netRentalYield}%\n${holdingYears}-Year Future Property Value: ${formatINR(results.futurePropertyValue)}\nTotal Cumulative Gain + Rent: ${formatINR(results.totalReturnOnInvestment)}\nOverall Investment CAGR: ${results.overallCagr}%`
    );
  }, [propertyCost, monthlyRent, annualMaintenance, propertyTax, vacancyWeeks, expectedAppreciationRate, holdingYears, results]);

  const handleWhatsAppShare = () => {
    let text = `*Real Estate Rental Yield & Investment ROI Projection*\n`;
    text += `*Property Price:* ${formatINR(propertyCost)}\n`;
    text += `*Monthly Rent:* ${formatINR(monthlyRent)} (${formatINR(monthlyRent * 12)}/yr)\n\n`;
    text += `• *Gross Rental Yield:* ${results.grossRentalYield}%\n`;
    text += `• *Net Rental Yield (after exp.):* ${results.netRentalYield}%\n`;
    text += `• Net Annual Rental Cash Flow: ${formatINR(results.netAnnualRentalIncome)}/year\n\n`;
    text += `*${holdingYears}-YEAR WEALTH PROJECTION (${expectedAppreciationRate}% p.a. growth):*\n`;
    text += `• Future Property Value: ${formatINR(results.futurePropertyValue)}\n`;
    text += `• Total Capital Appreciation: ${formatINR(results.totalCapitalGain)}\n`;
    text += `• Total Net Rental Income: ${formatINR(results.totalRentalIncomeCollected)}\n`;
    text += `• *Total Overall Return:* ${formatINR(results.totalReturnOnInvestment)}\n`;
    text += `• *Overall Portfolio CAGR:* ${results.overallCagr}%\n\n`;
    text += `Calculate property ROI & rental yield online: https://rupeebuddy.in/?calc=rentalyield`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopySummary = () => {
    let text = `Rental Yield Summary\nProperty: ${formatINR(propertyCost)}\nRent: ${formatINR(monthlyRent)}/mo\nGross Yield: ${results.grossRentalYield}%\nNet Yield: ${results.netRentalYield}%\n${holdingYears}-Yr Future Value: ${formatINR(results.futurePropertyValue)}\nTotal ROI: ${formatINR(results.totalReturnOnInvestment)} (${results.overallCagr}% CAGR)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const chartData = {
    labels: ['Original Capital', 'Capital Appreciation', 'Net Rental Income Collected'],
    datasets: [
      {
        data: [results.propertyCost, results.totalCapitalGain, results.totalRentalIncomeCollected],
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
      q: 'What is a good Rental Yield in India?',
      a: 'In Indian residential real estate, average gross rental yield is typically 2.5% to 4.0% in Tier-1 cities (Mumbai, Delhi-NCR, Bangalore, Pune). Commercial real estate (office spaces, retail shops) typically yields significantly higher returns of 7.0% to 9.5%.'
    },
    {
      q: 'What is the difference between Gross Rental Yield and Net Rental Yield?',
      a: 'Gross Rental Yield is the total annual rent divided by property purchase cost. Net Rental Yield deducts annual recurring expenses like society maintenance, property tax, insurance, and expected vacancy periods, giving your real cash-in-hand return.'
    },
    {
      q: 'How does Capital Appreciation affect overall Property ROI?',
      a: 'Real estate investment return is a dual-engine wealth generator: cash flow from rental yield PLUS equity growth from long-term capital appreciation. A 3% net yield combined with 6% annual capital growth delivers an overall ~9% to 10% compounded return.'
    }
  ];

  return (
    <div className="calculator-container">
      <div className="calculator-wrapper-grid">
        {/* Input Panel */}
        <div className="calculator-panel">
          
          {/* Property Cost */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Total Property Investment / Cost</span>
              <NumericInput
                value={propertyCost}
                onChange={setPropertyCost}
                min={500000}
                max={500000000}
                step={50000}
                prefix="₹"
                ariaLabel="Property Cost"
              />
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="1000000"
                max="30000000"
                step="100000"
                value={propertyCost}
                onChange={(e) => setPropertyCost(Number(e.target.value))}
                className="slider-input"
              />
            </div>
          </div>

          {/* Expected Monthly Rent */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Expected Monthly Rental Income</span>
              <NumericInput
                value={monthlyRent}
                onChange={setMonthlyRent}
                min={5000}
                max={2000000}
                step={1000}
                prefix="₹"
                ariaLabel="Monthly Rent"
              />
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="10000"
                max="150000"
                step="1000"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(Number(e.target.value))}
                className="slider-input"
              />
            </div>
          </div>

          {/* Annual Maintenance & Property Tax */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <span className="slider-label" style={{ fontSize: '12px' }}>Annual Society Maintenance</span>
              <div style={{ marginTop: '4px' }}>
                <NumericInput
                  value={annualMaintenance}
                  onChange={setAnnualMaintenance}
                  min={0}
                  max={500000}
                  step={1000}
                  prefix="₹"
                  ariaLabel="Maintenance"
                />
              </div>
            </div>
            <div>
              <span className="slider-label" style={{ fontSize: '12px' }}>Annual Property Tax</span>
              <div style={{ marginTop: '4px' }}>
                <NumericInput
                  value={propertyTax}
                  onChange={setPropertyTax}
                  min={0}
                  max={200000}
                  step={500}
                  prefix="₹"
                  ariaLabel="Property Tax"
                />
              </div>
            </div>
          </div>

          {/* Expected Appreciation & Holding Tenure */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <span className="slider-label" style={{ fontSize: '12px' }}>Capital Growth Rate</span>
              <div style={{ marginTop: '4px' }}>
                <NumericInput
                  value={expectedAppreciationRate}
                  onChange={setExpectedAppreciationRate}
                  min={0}
                  max={25}
                  step={0.5}
                  suffix="% p.a."
                  ariaLabel="Appreciation Rate"
                />
              </div>
            </div>
            <div>
              <span className="slider-label" style={{ fontSize: '12px' }}>Investment Holding Tenure</span>
              <div style={{ marginTop: '4px' }}>
                <NumericInput
                  value={holdingYears}
                  onChange={setHoldingYears}
                  min={1}
                  max={30}
                  step={1}
                  suffix=" Years"
                  ariaLabel="Holding Years"
                />
              </div>
            </div>
          </div>

          {/* Vacancy Weeks Slider */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Expected Annual Vacancy Period</span>
              <NumericInput
                value={vacancyWeeks}
                onChange={setVacancyWeeks}
                min={0}
                max={26}
                step={1}
                suffix=" Weeks"
                ariaLabel="Vacancy Weeks"
              />
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="0"
                max="12"
                step="1"
                value={vacancyWeeks}
                onChange={(e) => setVacancyWeeks(Number(e.target.value))}
                className="slider-input"
              />
            </div>
          </div>

        </div>

        {/* Results Panel */}
        <div className="results-panel">
          <div className="results-header">
            <h3 className="results-title">Rental Yield & Long-Term ROI</h3>
            <span className="results-subtitle">
              Gross Yield: <strong>{results.grossRentalYield}%</strong> &bull; Net Yield: <strong>{results.netRentalYield}%</strong>
            </span>
          </div>

          <div className="output-cards-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '16px' }}>
            <div className="output-summary-card" style={{ padding: '14px', background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
              <span className="summary-card-label" style={{ color: '#166534' }}>Net Rental Yield</span>
              <span className="summary-card-value" style={{ color: '#15803d', fontSize: '24px' }}>
                {results.netRentalYield}%
              </span>
              <span style={{ fontSize: '11px', color: '#166534' }}>
                Gross Yield: {results.grossRentalYield}%
              </span>
            </div>

            <div className="output-summary-card" style={{ padding: '14px', background: '#eff6ff', border: '1px solid #bfdbfe' }}>
              <span className="summary-card-label" style={{ color: '#1e40af' }}>Net Annual Cash Flow</span>
              <span className="summary-card-value" style={{ color: '#1d4ed8', fontSize: '20px' }}>
                {formatINR(results.netAnnualRentalIncome)} / yr
              </span>
              <span style={{ fontSize: '11px', color: '#1e40af' }}>
                After maintenance, tax & vacancy
              </span>
            </div>

            <div className="output-summary-card" style={{ padding: '14px', background: '#f8fafc' }}>
              <span className="summary-card-label">{holdingYears}-Year Future Property Valuation</span>
              <span className="summary-card-value" style={{ color: 'var(--brand-navy)', fontSize: '20px' }}>
                {formatINR(results.futurePropertyValue)}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Capital Gain: {formatINR(results.totalCapitalGain)}
              </span>
            </div>

            <div className="output-summary-card" style={{ padding: '14px', background: '#fffbeb', border: '1px solid #fde68a' }}>
              <span className="summary-card-label" style={{ color: '#92400e' }}>Overall Portfolio CAGR</span>
              <span className="summary-card-value" style={{ color: '#b45309', fontSize: '20px' }}>
                {results.overallCagr}% p.a.
              </span>
              <span style={{ fontSize: '11px', color: '#92400e' }}>
                Total ROI: {formatINR(results.totalReturnOnInvestment)}
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
          Frequently Asked Questions (FAQs) on Real Estate Rental Yield
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
