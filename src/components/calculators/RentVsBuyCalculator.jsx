import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { calculateRentVsBuy } from '../../utils/formulas';
import { formatINR } from '../../utils/format';
import NumericInput from '../common/NumericInput';
import { 
  Building2, ShieldCheck, Share2, Copy, Check, Printer, 
  TrendingUp, Sparkles, AlertCircle, ChevronDown, Scale, Home, Coins, ArrowRight 
} from 'lucide-react';
import { exportToPDF } from '../../utils/pdfExport';

export default function RentVsBuyCalculator({ setResultText }) {
  // Buying side inputs
  const [propertyPrice, setPropertyPrice] = useState(8000000); // 80 Lakhs
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [loanRate, setLoanRate] = useState(8.5);
  const [loanTenureYears, setLoanTenureYears] = useState(20);
  const [stampDutyPct, setStampDutyPct] = useState(6.5);
  const [monthlyMaintenance, setMonthlyMaintenance] = useState(4000);
  const [annualPropertyTax, setAnnualPropertyTax] = useState(12000);
  const [propertyAppreciationRate, setPropertyAppreciationRate] = useState(5.5);

  // Renting side inputs
  const [monthlyRent, setMonthlyRent] = useState(25000);
  const [rentInflationRate, setRentInflationRate] = useState(6.0);
  const [equityReturnRate, setEquityReturnRate] = useState(12.0);
  const [comparisonYears, setComparisonYears] = useState(20);

  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const results = calculateRentVsBuy({
    propertyPrice,
    downPaymentPct,
    loanRate,
    loanTenureYears,
    stampDutyPct,
    monthlyMaintenance,
    annualPropertyTax,
    propertyAppreciationRate,
    monthlyRent,
    rentInflationRate,
    equityReturnRate,
    comparisonYears
  });

  useEffect(() => {
    if (setResultText) {
      setResultText(
        `Property: ${formatINR(propertyPrice)} vs Rent: ${formatINR(monthlyRent)}/mo\nBreak-Even Year: ${results.breakEvenYear ? `Year ${results.breakEvenYear}` : 'Never (Renting Wins)'}\nAt Year ${comparisonYears}:\nBuyer Net Worth: ${formatINR(results.finalBuyerNetWorth)}\nRenter Net Worth: ${formatINR(results.finalRenterNetWorth)}\nWinner: ${results.finalWinner === 'BUY' ? 'Buying' : 'Renting'} by ${formatINR(results.finalDifference)}`
      );
    }
  }, [propertyPrice, downPaymentPct, loanRate, loanTenureYears, stampDutyPct, monthlyMaintenance, annualPropertyTax, propertyAppreciationRate, monthlyRent, rentInflationRate, equityReturnRate, comparisonYears, results, setResultText]);

  const handleWhatsAppShare = () => {
    let text = `*🏡 True Rent vs. Buy Opportunity Cost Engine (India)*\n`;
    text += `*Flat Price:* ${formatINR(propertyPrice)} | *Rent:* ${formatINR(monthlyRent)}/mo\n`;
    text += `*Inflection Break-Even:* ${results.breakEvenYear ? `Year ${results.breakEvenYear}` : 'Renting is cheaper long-term'}\n\n`;
    text += `*AFTER ${comparisonYears} YEARS:*\n`;
    text += `• Buying Net Worth (Home Equity): ${formatINR(results.finalBuyerNetWorth)}\n`;
    text += `• Renting Net Worth (Equity Portfolio): ${formatINR(results.finalRenterNetWorth)}\n`;
    text += `🏆 *Verdict:* ${results.finalWinner === 'BUY' ? 'Buying creates ' + formatINR(results.finalDifference) + ' more net worth' : 'Renting creates ' + formatINR(results.finalDifference) + ' more net worth'}\n\n`;
    text += `Calculate your rent vs buy decision: https://rupeebuddy.in/calculators/rent-vs-buy-calculator`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopySummary = () => {
    const text = `Rent vs Buy Summary:\nProperty: ${formatINR(propertyPrice)} | Monthly Rent: ${formatINR(monthlyRent)}\nBreak-Even: ${results.breakEvenYear ? `Year ${results.breakEvenYear}` : 'Renting Wins'}\nYear ${comparisonYears} Buyer Net Worth: ${formatINR(results.finalBuyerNetWorth)}\nYear ${comparisonYears} Renter Net Worth: ${formatINR(results.finalRenterNetWorth)}\nWinner: ${results.finalWinner}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Trajectory Chart Data
  const chartLabels = results.yearlyData.map(d => `Yr ${d.year}`);
  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Buyer Net Worth (Home Value - Loan)',
        data: results.yearlyData.map(d => d.buyerNetWorth),
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.15)',
        borderWidth: 3,
        fill: true,
        tension: 0.1
      },
      {
        label: `Renter Net Worth (Equity Portfolio @ ${equityReturnRate}%)`,
        data: results.yearlyData.map(d => d.renterNetWorth),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        borderWidth: 3,
        fill: true,
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { font: { family: 'Inter', size: 12, weight: '600' }, color: '#1e293b' }
      },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.dataset.label}: ${formatINR(context.raw)}`
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => formatINR(value)
        }
      }
    }
  };

  const faqs = [
    {
      q: 'Why do most Rent vs Buy calculators in India give misleading answers?',
      a: 'Most basic calculators only compare Monthly Rent vs Monthly EMI. They fail to account for the massive opportunity cost of the initial down payment and stamp duty (which could compound at 12% in an equity index fund), ongoing society maintenance charges, municipal property taxes, and realistic Indian real estate appreciation rates (typically 5% to 6% in established cities).'
    },
    {
      q: 'What is the Break-Even Year in a Rent vs Buy calculation?',
      a: 'The Break-Even Year is the point in time when the net worth built from owning real estate (property value minus remaining loan principal) finally surpasses the investment portfolio of a renter who invested the down payment and monthly savings into equity mutual funds.'
    },
    {
      q: 'When does Renting beat Buying in India?',
      a: 'Renting is generally financially superior if: 1) You plan to live in that city or apartment for less than 7 to 9 years, 2) Rental yields in your locality are under 3% while property prices are inflated, or 3) You diligently invest the down payment difference into compounding equity funds.'
    },
    {
      q: 'When does Buying beat Renting in India?',
      a: 'Buying becomes financially and emotionally superior when your holding horizon is 10 to 15+ years. Over long horizons, annual rent escalations (6% to 8% yearly) cause rents to exceed initial loan EMIs, while your fixed loan EMI remains stable and the property appreciates into an unencumbered physical asset.'
    }
  ];

  return (
    <div className="calculator-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 8px' }}>
      {/* Top Header */}
      <div className="calculator-header" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: '#eff6ff', color: 'var(--brand-blue)', borderRadius: '20px', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>
          <Scale size={16} color="var(--brand-blue)" />
          <span>Real Opportunity Cost Engine</span>
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--brand-navy)', margin: '4px 0 8px 0' }}>
          True Rent vs. Buy Calculator: Factoring Indian Opportunity Cost
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
          Does owning a flat really beat staying on rent and investing in equity? Factor in down payment opportunity cost, stamp duty sunk costs, society maintenance, and rent inflation.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {/* Left Column: Inputs */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          
          {/* Buying Side */}
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1e40af', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Home size={18} color="#2563eb" />
              1. Home Buying Parameters
            </h2>

            <NumericInput
              label="Property Agreement Cost (₹)"
              value={propertyPrice}
              onChange={setPropertyPrice}
              min={1000000}
              max={50000000}
              step={100000}
              presetOptions={[5000000, 7500000, 10000000, 15000000]}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  Down Payment (%)
                </label>
                <input
                  type="number"
                  min="10"
                  max="50"
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(parseFloat(e.target.value) || 20)}
                  className="search-field"
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  Stamp Duty & Reg. (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="3"
                  max="10"
                  value={stampDutyPct}
                  onChange={(e) => setStampDutyPct(parseFloat(e.target.value) || 6.5)}
                  className="search-field"
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  Home Loan Rate (%)
                </label>
                <input
                  type="number"
                  step="0.05"
                  value={loanRate}
                  onChange={(e) => setLoanRate(parseFloat(e.target.value) || 8.5)}
                  className="search-field"
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  Monthly Maintenance (₹)
                </label>
                <input
                  type="number"
                  step="500"
                  value={monthlyMaintenance}
                  onChange={(e) => setMonthlyMaintenance(parseInt(e.target.value) || 0)}
                  className="search-field"
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>
            </div>

            <div style={{ marginTop: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                Expected Real Estate Appreciation (% p.a.)
              </label>
              <input
                type="number"
                step="0.5"
                min="2"
                max="12"
                value={propertyAppreciationRate}
                onChange={(e) => setPropertyAppreciationRate(parseFloat(e.target.value) || 5.5)}
                className="search-field"
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
            </div>
          </div>

          {/* Renting Side */}
          <div style={{ paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#047857', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Coins size={18} color="#10b981" />
              2. Renting & Investment Opportunity Cost
            </h2>

            <NumericInput
              label="Current Monthly Rent (₹/mo)"
              value={monthlyRent}
              onChange={setMonthlyRent}
              min={5000}
              max={150000}
              step={1000}
              presetOptions={[18000, 25000, 35000, 50000]}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  Annual Rent Hike (%/yr)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="3"
                  max="12"
                  value={rentInflationRate}
                  onChange={(e) => setRentInflationRate(parseFloat(e.target.value) || 6)}
                  className="search-field"
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  Equity SIP Return (% CAGR)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="8"
                  max="18"
                  value={equityReturnRate}
                  onChange={(e) => setEquityReturnRate(parseFloat(e.target.value) || 12)}
                  className="search-field"
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>
            </div>

            <div style={{ marginTop: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                Comparison Horizon (Years)
              </label>
              <input
                type="number"
                min="5"
                max="30"
                value={comparisonYears}
                onChange={(e) => setComparisonYears(parseInt(e.target.value) || 20)}
                className="search-field"
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Comparative Battlefield Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Break-Even Inflection Banner */}
          <div style={{ background: results.finalWinner === 'BUY' ? 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)' : 'linear-gradient(135deg, #065f46 0%, #10b981 100%)', color: '#ffffff', borderRadius: '12px', padding: '20px 24px', boxShadow: '0 8px 20px -4px rgba(0,0,0,0.15)' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', opacity: 0.9 }}>
              Strategic Verdict & Break-Even Point
            </div>
            <div style={{ fontSize: '26px', fontWeight: '900', marginBottom: '6px' }}>
              {results.breakEvenYear 
                ? `Buying Wins in Year ${results.breakEvenYear}` 
                : 'Renting Wins Across Horizon'}
            </div>
            <p style={{ fontSize: '13px', opacity: 0.95, lineHeight: '1.5', margin: 0 }}>
              {results.breakEvenYear 
                ? `If you plan to reside in this property for less than ${results.breakEvenYear} years, staying on rent and investing your capital in equity creates more wealth. After Year ${results.breakEvenYear}, buying pulls ahead!`
                : `Based on your chosen rent escalation and equity CAGR, investing the upfront down payment and monthly savings in equity outperforms property ownership across the entire ${comparisonYears}-year horizon.`}
            </p>
          </div>

          {/* Comparative Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#2563eb', textTransform: 'uppercase' }}>If You Buy Flat</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--brand-navy)', margin: '6px 0 2px 0' }}>
                {formatINR(results.finalBuyerNetWorth)}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Net Home Equity at Year {comparisonYears}</div>
              <div style={{ marginTop: '8px', fontSize: '11px', color: '#64748b' }}>
                Monthly EMI: {formatINR(results.monthlyEmi)} • Sunk Upfront: {formatINR(results.upfrontCapital)}
              </div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#16a34a', textTransform: 'uppercase' }}>If You Rent & Invest</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#15803d', margin: '6px 0 2px 0' }}>
                {formatINR(results.finalRenterNetWorth)}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Equity Portfolio at Year {comparisonYears}</div>
              <div style={{ marginTop: '8px', fontSize: '11px', color: '#64748b' }}>
                Initial Lumpsum: {formatINR(results.upfrontCapital)} invested @ {equityReturnRate}%
              </div>
            </div>
          </div>

          {/* Chart Container */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', minHeight: '320px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--brand-navy)', marginBottom: '12px' }}>
              Net Worth Trajectory Over {comparisonYears} Years
            </h3>
            <div style={{ height: '260px' }}>
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="ad-btn"
              onClick={handleWhatsAppShare}
              style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#25D366', color: '#ffffff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
            >
              <Share2 size={16} />
              Share Analysis on WhatsApp
            </button>
            <button
              type="button"
              className="ad-btn"
              onClick={handleCopySummary}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ffffff', color: 'var(--brand-navy)', border: '1px solid #cbd5e1', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
            >
              {copied ? <Check size={16} color="#16a34a" /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy Summary'}
            </button>
            <button
              type="button"
              className="ad-btn"
              onClick={() => exportToPDF()}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ffffff', color: 'var(--brand-navy)', border: '1px solid #cbd5e1', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
            >
              <Printer size={16} />
              Print Report
            </button>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <section className="faq-section" style={{ marginTop: '32px', borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--brand-navy)', marginBottom: '16px' }}>
          Frequently Asked Questions on Rent vs. Buy in India
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  style={{ width: '100%', padding: '14px 18px', background: isOpen ? '#f8fafc' : '#ffffff', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', fontWeight: '700', fontSize: '14px', color: 'var(--brand-navy)' }}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={18} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
                </button>
                {isOpen && (
                  <div style={{ padding: '14px 18px', background: '#ffffff', fontSize: '14px', color: '#475569', lineHeight: '1.6', borderTop: '1px solid #e2e8f0' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
