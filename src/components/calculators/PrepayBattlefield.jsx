import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { calculatePrepayBattlefield } from '../../utils/formulas';
import { formatINR } from '../../utils/format';
import NumericInput from '../common/NumericInput';
import { 
  Percent, ShieldCheck, Share2, Copy, Check, Printer, 
  TrendingUp, Sparkles, AlertCircle, ChevronDown, Zap, Award, Flame, ArrowRight 
} from 'lucide-react';
import { exportToPDF, shareCalculation } from '../../utils/pdfExport';

export default function PrepayBattlefield({ setResultText }) {
  // Primary Loan Inputs
  const [loanAmount, setLoanAmount] = useState(5000000); // 50 Lakhs
  const [annualRate, setAnnualRate] = useState(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState(20); // 20 Years

  // Strategy Selector
  const [prepayStrategy, setPrepayStrategy] = useState('extra_emi'); // 'extra_emi' | 'monthly_extra' | 'step_up' | 'lumpsum'
  const [extraEmiCount, setExtraEmiCount] = useState(1);
  const [monthlyExtraAmount, setMonthlyExtraAmount] = useState(5000);
  const [stepUpPct, setStepUpPct] = useState(5);
  const [lumpsumAmount, setLumpsumAmount] = useState(200000);
  const [lumpsumIntervalYears, setLumpsumIntervalYears] = useState(3);
  const [sipReturnRate, setSipReturnRate] = useState(12);

  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const results = calculatePrepayBattlefield({
    loanAmount,
    annualRate,
    tenureYears,
    prepayStrategy,
    extraEmiCount,
    monthlyExtraAmount,
    stepUpPct,
    lumpsumAmount,
    lumpsumIntervalYears,
    sipReturnRate
  });

  useEffect(() => {
    if (setResultText) {
      setResultText(
        `Loan: ${formatINR(loanAmount)} at ${annualRate}% for ${tenureYears} Yrs\nStandard EMI: ${formatINR(results.baseEmi)}\nStrategy: ${prepayStrategy}\nInterest Saved: ${formatINR(results.interestSaved)}\nTenure Reduced: ${results.yearsSaved} Years (Cut to ${results.prepayTenureYears} Yrs)\nSIP Wealth Alternative: ${formatINR(results.finalSipCorpus)} (Crossover at Year ${results.crossoverYear || 'N/A'})\nNet Wealth Advantage: ${formatINR(results.netSipAdvantage)}`
      );
    }
  }, [loanAmount, annualRate, tenureYears, prepayStrategy, extraEmiCount, monthlyExtraAmount, stepUpPct, lumpsumAmount, lumpsumIntervalYears, sipReturnRate, results, setResultText]);

  const handleWhatsAppShare = () => {
    let text = `*⚔️ Home Loan Prepayment vs. Mutual Fund SIP Battlefield*\n`;
    text += `*Loan Amount:* ${formatINR(loanAmount)} @ ${annualRate}%\n`;
    text += `*Standard EMI:* ${formatINR(results.baseEmi)}/mo for ${tenureYears} Years\n\n`;
    text += `*PATH 1: AGGRESSIVE PREPAYMENT*\n`;
    text += `• Interest Slashed: ${formatINR(results.interestSaved)}\n`;
    text += `• Tenure Reduced By: ${results.yearsSaved} Years (Done in ${results.prepayTenureYears} Yrs!)\n\n`;
    text += `*PATH 2: WEALTH MULTIPLIER (SIP ROUTE @ ${sipReturnRate}% CAGR)*\n`;
    text += `• Final SIP Wealth: ${formatINR(results.finalSipCorpus)}\n`;
    text += `• Debt-Free Crossover: Year ${results.crossoverYear || 'N/A'} (SIP exceeds remaining loan!)\n`;
    text += `• Net Wealth Gain vs Prepayment: ${formatINR(results.netSipAdvantage)}\n\n`;
    text += `Simulate your loan battle here: https://rupeebuddy.in/calculators/loan-prepayment-calculator`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopySummary = () => {
    const text = `Loan Prepayment Battlefield Summary:\nLoan: ${formatINR(loanAmount)} @ ${annualRate}% (${tenureYears} Yrs)\nStandard EMI: ${formatINR(results.baseEmi)}\nInterest Saved: ${formatINR(results.interestSaved)}\nTenure Cut: ${results.yearsSaved} Years\nSIP Alternative: ${formatINR(results.finalSipCorpus)} (Crossover Year ${results.crossoverYear || 'N/A'})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Trajectory Chart Data
  const chartLabels = results.trajectory.map(t => `Yr ${t.year}`);
  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Status Quo (Default Loan Balance)',
        data: results.trajectory.map(t => t.baselineBalance),
        borderColor: '#94a3b8',
        backgroundColor: 'rgba(148, 163, 184, 0.1)',
        borderWidth: 2,
        borderDash: [5, 5],
        fill: false,
        tension: 0.1
      },
      {
        label: 'Prepayment Path (Loan Balance)',
        data: results.trajectory.map(t => t.prepayBalance),
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.15)',
        borderWidth: 3,
        fill: true,
        tension: 0.1
      },
      {
        label: `Wealth Multiplier (SIP Portfolio @ ${sipReturnRate}%)`,
        data: results.trajectory.map(t => t.sipBalance),
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
      q: 'Should I prepay my home loan or invest in an equity mutual fund SIP?',
      a: 'Mathematically, if your home loan interest rate is 8.5% and your equity mutual fund delivers 12% to 14% CAGR, investing the surplus in an SIP creates substantially more net wealth. Moreover, by Year 8 to 10 (the crossover point), your SIP portfolio becomes large enough to clear your entire outstanding loan in one stroke while preserving emergency liquidity.'
    },
    {
      q: 'How does paying 1 extra EMI per year reduce home loan tenure?',
      a: 'Making 1 extra EMI payment each year directly slashes the principal balance before compound interest can accrue. On a standard 20-year home loan at 8.5%, just 1 extra EMI annually reduces your tenure by nearly 4 years and saves several lakhs in interest.'
    },
    {
      q: 'Are there any prepayment charges on floating rate home loans in India?',
      a: 'No. As per RBI Master Directions, commercial banks, housing finance companies (HFCs), and NBFCs are strictly barred from levying any prepayment penalty or foreclosure charge on floating-rate individual home loans.'
    },
    {
      q: 'What is the Crossover Point in the SIP vs Prepayment strategy?',
      a: 'The Crossover Point is the exact year when your accumulated SIP investment balance equals or exceeds your remaining home loan balance. At this moment, you are mathematically debt-free because your liquid investments can eliminate the debt whenever you choose.'
    }
  ];

  return (
    <div className="calculator-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 8px' }}>
      {/* Top Header */}
      <div className="calculator-header" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: '#eff6ff', color: 'var(--brand-blue)', borderRadius: '20px', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>
          <Flame size={16} color="#ea580c" />
          <span>The Home Loan Battlefield Engine</span>
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--brand-navy)', margin: '4px 0 8px 0' }}>
          Home Loan Prepayment vs. SIP Investment Calculator
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
          Should you aggressively pay off your debt or invest your surplus in a compounding Mutual Fund SIP? Simulate all three paths with real-time crossover inflection points.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {/* Left Column: Inputs */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--brand-navy)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Percent size={18} color="var(--brand-blue)" />
            Loan Parameters
          </h2>

          <NumericInput
            label="Outstanding Home Loan Amount (₹)"
            value={loanAmount}
            onChange={setLoanAmount}
            min={100000}
            max={50000000}
            step={50000}
            presetOptions={[3000000, 5000000, 7500000, 10000000]}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '14px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                Interest Rate (% p.a.)
              </label>
              <input
                type="number"
                step="0.05"
                min="6"
                max="18"
                value={annualRate}
                onChange={(e) => setAnnualRate(parseFloat(e.target.value) || 0)}
                className="search-field"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                Loan Tenure (Years)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={tenureYears}
                onChange={(e) => setTenureYears(parseInt(e.target.value) || 1)}
                className="search-field"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              />
            </div>
          </div>

          <div style={{ marginTop: '16px', padding: '12px 16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Default Regular EMI:</span>
            <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--brand-navy)' }}>{formatINR(results.baseEmi)} / mo</span>
          </div>

          {/* Strategy Section */}
          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--brand-navy)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} color="#f59e0b" />
              Choose Your Battle Strategy
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
              <button
                type="button"
                className={`quick-option-btn ${prepayStrategy === 'extra_emi' ? 'active-filter' : ''}`}
                onClick={() => setPrepayStrategy('extra_emi')}
                style={{
                  padding: '10px 8px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  border: '1px solid #cbd5e1',
                  background: prepayStrategy === 'extra_emi' ? 'var(--brand-navy)' : '#ffffff',
                  color: prepayStrategy === 'extra_emi' ? '#ffffff' : 'var(--brand-navy)',
                  cursor: 'pointer'
                }}
              >
                1 Extra EMI / Year
              </button>

              <button
                type="button"
                className={`quick-option-btn ${prepayStrategy === 'monthly_extra' ? 'active-filter' : ''}`}
                onClick={() => setPrepayStrategy('monthly_extra')}
                style={{
                  padding: '10px 8px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  border: '1px solid #cbd5e1',
                  background: prepayStrategy === 'monthly_extra' ? 'var(--brand-navy)' : '#ffffff',
                  color: prepayStrategy === 'monthly_extra' ? '#ffffff' : 'var(--brand-navy)',
                  cursor: 'pointer'
                }}
              >
                Monthly Extra EMI
              </button>

              <button
                type="button"
                className={`quick-option-btn ${prepayStrategy === 'step_up' ? 'active-filter' : ''}`}
                onClick={() => setPrepayStrategy('step_up')}
                style={{
                  padding: '10px 8px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  border: '1px solid #cbd5e1',
                  background: prepayStrategy === 'step_up' ? 'var(--brand-navy)' : '#ffffff',
                  color: prepayStrategy === 'step_up' ? '#ffffff' : 'var(--brand-navy)',
                  cursor: 'pointer'
                }}
              >
                5% Step-Up Yearly
              </button>

              <button
                type="button"
                className={`quick-option-btn ${prepayStrategy === 'lumpsum' ? 'active-filter' : ''}`}
                onClick={() => setPrepayStrategy('lumpsum')}
                style={{
                  padding: '10px 8px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  border: '1px solid #cbd5e1',
                  background: prepayStrategy === 'lumpsum' ? 'var(--brand-navy)' : '#ffffff',
                  color: prepayStrategy === 'lumpsum' ? '#ffffff' : 'var(--brand-navy)',
                  cursor: 'pointer'
                }}
              >
                Periodic Lumpsum
              </button>
            </div>

            {/* Dynamic Inputs Based on Strategy */}
            {prepayStrategy === 'extra_emi' && (
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  Number of Extra EMIs Paid Annually (Bonus Season)
                </label>
                <input
                  type="number"
                  min="1"
                  max="4"
                  value={extraEmiCount}
                  onChange={(e) => setExtraEmiCount(parseInt(e.target.value) || 1)}
                  className="search-field"
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>
            )}

            {prepayStrategy === 'monthly_extra' && (
              <NumericInput
                label="Extra Monthly Payment (₹/month)"
                value={monthlyExtraAmount}
                onChange={setMonthlyExtraAmount}
                min={1000}
                max={50000}
                step={1000}
                presetOptions={[3000, 5000, 10000, 15000]}
              />
            )}

            {prepayStrategy === 'step_up' && (
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  Annual EMI Step-Up Percentage (% hike each year)
                </label>
                <input
                  type="number"
                  min="2"
                  max="20"
                  value={stepUpPct}
                  onChange={(e) => setStepUpPct(parseFloat(e.target.value) || 5)}
                  className="search-field"
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>
            )}

            {prepayStrategy === 'lumpsum' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                    Lumpsum Amount (₹)
                  </label>
                  <input
                    type="number"
                    step="50000"
                    value={lumpsumAmount}
                    onChange={(e) => setLumpsumAmount(parseInt(e.target.value) || 0)}
                    className="search-field"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                    Frequency (Every N Years)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={lumpsumIntervalYears}
                    onChange={(e) => setLumpsumIntervalYears(parseInt(e.target.value) || 1)}
                    className="search-field"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>
            )}

            {/* Expected SIP Return */}
            <div style={{ marginTop: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                Expected Mutual Fund / Equity SIP Return (% CAGR)
              </label>
              <input
                type="number"
                step="0.5"
                min="8"
                max="20"
                value={sipReturnRate}
                onChange={(e) => setSipReturnRate(parseFloat(e.target.value) || 12)}
                className="search-field"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              />
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Historical 10-Yr Nifty 50 CAGR is ~12.5%</span>
            </div>
          </div>
        </div>

        {/* Right Column: Comparative Battlefield Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Crossover Inflection Hero Banner */}
          <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #047857 100%)', color: '#ffffff', borderRadius: '12px', padding: '20px 24px', boxShadow: '0 8px 20px -4px rgba(4, 120, 87, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', color: '#a7f3d0' }}>
              <Award size={18} />
              Debt-Free Crossover Inflection Point
            </div>
            <div style={{ fontSize: '24px', fontWeight: '900', marginBottom: '6px' }}>
              {results.crossoverYear ? `Year ${results.crossoverYear} (${Math.round(results.crossoverYear * 12)} Months)` : 'Beyond Tenure'}
            </div>
            <p style={{ fontSize: '13px', opacity: 0.9, lineHeight: '1.5', margin: 0 }}>
              {results.crossoverYear 
                ? `If you invest the surplus in an SIP instead of prepaying, your investment portfolio surpasses your remaining home loan principal in Year ${results.crossoverYear}. You could wipe out your loan in 1 click and keep full liquidity!`
                : `Your prepayment reduces interest faster than your SIP accumulation based on current parameters.`}
            </p>
          </div>

          {/* 3-Way Comparative Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            {/* Card 1: Default Regular EMI */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Path 1: Default (No Prepay)</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--brand-navy)', margin: '6px 0 4px 0' }}>
                {formatINR(results.baselineTotalInterest)}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Total Interest Paid</div>
              <div style={{ marginTop: '10px', fontSize: '12px', fontWeight: '600', color: '#64748b' }}>
                Tenure: {tenureYears} Years ({results.totalMonths} EMIs)
              </div>
            </div>

            {/* Card 2: Aggressive Prepayment */}
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#2563eb', textTransform: 'uppercase' }}>Path 2: Aggressive Prepayment</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#1d4ed8', margin: '6px 0 4px 0' }}>
                {formatINR(results.interestSaved)}
              </div>
              <div style={{ fontSize: '12px', color: '#1e40af' }}>Direct Interest Slashed</div>
              <div style={{ marginTop: '10px', fontSize: '12px', fontWeight: '700', color: '#15803d' }}>
                Tenure Cut By: {results.yearsSaved} Years (Done in {results.prepayTenureYears} Yrs!)
              </div>
            </div>

            {/* Card 3: Wealth Multiplier (SIP) */}
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#16a34a', textTransform: 'uppercase' }}>Path 3: Wealth Multiplier (SIP)</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#15803d', margin: '6px 0 4px 0' }}>
                {formatINR(results.finalSipCorpus)}
              </div>
              <div style={{ fontSize: '12px', color: '#166534' }}>Accumulated Investment Wealth</div>
              <div style={{ marginTop: '10px', fontSize: '12px', fontWeight: '700', color: '#047857' }}>
                Net Gain vs Prepay: +{formatINR(results.netSipAdvantage)}
              </div>
            </div>
          </div>

          {/* Chart Container */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', minHeight: '320px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--brand-navy)', marginBottom: '12px' }}>
              Trajectory: Loan Balance Decline vs. SIP Wealth Accumulation
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
              Share Strategy on WhatsApp
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
              Print Dossier
            </button>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <section className="faq-section" style={{ marginTop: '32px', borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--brand-navy)', marginBottom: '16px' }}>
          Frequently Asked Questions on Home Loan Prepayment & SIP
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
