import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { calculateCompoundInterest } from '../../utils/formulas';
import { formatINR } from '../../utils/format';

export default function CompoundCalculator({ setResultText }) {
  const [principal, setPrincipal] = useState(100000); // 1 Lakh
  const [rate, setRate] = useState(10); // 10% interest rate
  const [tenure, setTenure] = useState(10); // 10 years
  const [frequency, setFrequency] = useState(1); // 1 = Annually

  const results = calculateCompoundInterest(principal, rate, frequency, tenure);

  // Calculate year-by-year compounding balance for growth line chart
  const growthBalances = [];
  const chartLabels = [];
  
  for (let year = 1; year <= tenure; year++) {
    const yrResult = calculateCompoundInterest(principal, rate, frequency, year);
    growthBalances.push(yrResult.maturityAmount);
    chartLabels.push(`Yr ${year}`);
  }

  useEffect(() => {
    const freqNames = { 365: 'Daily', 12: 'Monthly', 4: 'Quarterly', 2: 'Half-Yearly', 1: 'Yearly' };
    setResultText(
      `Compound Principal: ${formatINR(principal)}\nInterest Rate: ${rate}%\nTenure: ${tenure} years\nFrequency: ${freqNames[frequency]}\nTotal Invested: ${formatINR(principal)}\nInterest Earned: ${formatINR(results.interestEarned)}\nAccumulated Amount: ${formatINR(results.maturityAmount)}`
    );
  }, [principal, rate, tenure, frequency, results.maturityAmount]);

  const chartData = {
    labels: ['Start', ...chartLabels],
    datasets: [
      {
        label: 'Balance Growth (₹)',
        data: [principal, ...growthBalances],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#10b981',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => ` Balance: ${formatINR(context.raw)}`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => formatINR(value),
          font: { family: 'Inter', size: 9 },
        },
      },
      x: {
        ticks: {
          font: { family: 'Inter', size: 10 },
        },
      },
    },
  };

  return (
    <div className="calculator-container">
      <div className="calculator-wrapper-grid">
        {/* Input Panel */}
        <div className="calculator-panel">
          {/* Principal Amount */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Principal Amount</span>
              <span className="slider-value-display">{formatINR(principal)}</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="1000"
                max="2000000"
                step="5000"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>₹1,000</span>
              <span>20 Lakhs</span>
            </div>
            <div className="quick-options-row no-print">
              <button className="quick-option-btn" onClick={() => setPrincipal(10000)}>10K</button>
              <button className="quick-option-btn" onClick={() => setPrincipal(50000)}>50K</button>
              <button className="quick-option-btn" onClick={() => setPrincipal(100000)}>1L</button>
              <button className="quick-option-btn" onClick={() => setPrincipal(500000)}>5L</button>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Interest Rate (% p.a.)</span>
              <span className="slider-value-display">{rate}%</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="1"
                max="30"
                step="0.5"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>1%</span>
              <span>30%</span>
            </div>
          </div>

          {/* Tenure */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Tenure (Years)</span>
              <span className="slider-value-display">{tenure} Yr</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>1 Year</span>
              <span>40 Years</span>
            </div>
          </div>

          {/* Compounding Frequency Selection */}
          <div className="slider-group">
            <span className="slider-label">Compounding Frequency</span>
            <div className="custom-select-block no-print">
              <button
                className={`custom-select-option ${frequency === 1 ? 'selected' : ''}`}
                onClick={() => setFrequency(1)}
              >
                Yearly
              </button>
              <button
                className={`custom-select-option ${frequency === 2 ? 'selected' : ''}`}
                onClick={() => setFrequency(2)}
              >
                Half-Yearly
              </button>
              <button
                className={`custom-select-option ${frequency === 4 ? 'selected' : ''}`}
                onClick={() => setFrequency(4)}
              >
                Quarterly
              </button>
              <button
                className={`custom-select-option ${frequency === 12 ? 'selected' : ''}`}
                onClick={() => setFrequency(12)}
              >
                Monthly
              </button>
              <button
                className={`custom-select-option ${frequency === 365 ? 'selected' : ''}`}
                onClick={() => setFrequency(365)}
              >
                Daily
              </button>
            </div>
            <span className="print-only">
              Compounding: {frequency === 1 ? 'Yearly' : frequency === 2 ? 'Half-Yearly' : frequency === 4 ? 'Quarterly' : frequency === 12 ? 'Monthly' : 'Daily'}
            </span>
          </div>
        </div>

        {/* Output Panel */}
        <div className="results-panel">
          <div className="output-summary-card" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
            <div className="summary-card-title">Accumulated Future Balance</div>
            <div className="summary-card-value">{formatINR(results.maturityAmount)}</div>
            
            <div className="summary-card-grid">
              <div className="summary-card-item">
                <span className="summary-card-item-label">Principal Amount</span>
                <span className="summary-card-item-value">{formatINR(principal)}</span>
              </div>
              <div className="summary-card-item">
                <span className="summary-card-item-label">Total Compound Interest</span>
                <span className="summary-card-item-value">{formatINR(results.interestEarned)}</span>
              </div>
            </div>
          </div>

          <div className="output-chart-card">
            <span className="chart-title">Compounding Growth Curve</span>
            <div className="chart-wrapper" style={{ maxWidth: '100%', height: '220px' }}>
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* SEO Rich Text Section */}
      <section className="seo-rich-content-section" id="faq-section">
        <h2>Best Compound Interest & Cumulative Calculator India</h2>
        <p>
          Need a precise <strong>cumulative calculator</strong> or <strong>daily compound interest calculator India</strong>? Compound interest is interest earned on your initial principal plus the accumulated interest of previous cycles. Whether you are using this tool as a cumulative deposit calculator or a standard <strong>compounding calculator India</strong>, it reveals how daily, monthly, quarterly, or yearly compounding accelerates exponential wealth creation.
        </p>

        <h3>The Cumulative Compound Interest Equation</h3>
        <p>The standard mathematical formula used by this cumulative calculator is:</p>
        <div className="formula-block">
          A = P(1 + r/n)^(nt)
        </div>
        <p>Where:</p>
        <ul style={{ paddingLeft: '20px', fontSize: '14px', color: 'var(--text-main)' }}>
          <li><strong>A</strong> represents the Future Cumulative Accumulated Value (Maturity Amount).</li>
          <li><strong>P</strong> represents the Principal Investment Amount.</li>
          <li><strong>r</strong> represents the annual interest rate (in decimal format, e.g. 10% = 0.10).</li>
          <li><strong>n</strong> represents the compounding frequency per year (Daily = 365, Monthly = 12, Quarterly = 4, Yearly = 1).</li>
          <li><strong>t</strong> represents the tenure in years.</li>
        </ul>

        <h3>Frequently Asked Questions (FAQs)</h3>
        <div className="faq-list">
          <div className="faq-item">
            <h4 className="faq-question">1. How does a cumulative calculator differ from a simple interest calculator?</h4>
            <p className="faq-answer">
              A simple interest calculator computes returns purely on the base principal throughout the tenure. A cumulative calculator factors in compounding, where the interest earned in each period is added to the principal balance for all subsequent calculations, creating exponential "interest on interest" growth.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">2. What is the Rule of 72 in cumulative calculations?</h4>
            <p className="faq-answer">
              The Rule of 72 is a quick shortcut to estimate how many years it will take to double your investment at a fixed interest rate. Divide 72 by the annual return rate. At 12% CAGR, your money doubles in approximately <strong>6 years</strong> (72 / 12).
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">3. How does compounding frequency affect final cumulative returns?</h4>
            <p className="faq-answer">
              Higher compounding frequencies yield higher cumulative wealth. For example, ₹1,00,000 invested at 10% for 10 years yields:
              - **₹2,59,374** under Annual compounding.
              - **₹2,68,506** under Quarterly compounding.
              - **₹2,70,704** under Monthly compounding.
              - **₹2,71,791** under Daily compounding.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
