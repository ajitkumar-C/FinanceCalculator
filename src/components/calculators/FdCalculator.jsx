import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { calculateFD } from '../../utils/formulas';
import { formatINR } from '../../utils/format';

export default function FdCalculator({ setResultText }) {
  const [principal, setPrincipal] = useState(100000); // 1 Lakh
  const [rate, setRate] = useState(7.0); // standard bank FD rate
  const [tenure, setTenure] = useState(5); // 5 years
  const [frequency, setFrequency] = useState(4); // default Quarterly compounding

  const results = calculateFD(principal, rate, tenure, frequency);

  useEffect(() => {
    const freqLabels = { 12: 'Monthly', 4: 'Quarterly', 2: 'Half-Yearly', 1: 'Yearly' };
    setResultText(
      `FD Principal: ${formatINR(principal)}\nInterest Rate: ${rate}%\nTenure: ${tenure} years\nCompounding: ${freqLabels[frequency]}\nTotal Invested: ${formatINR(results.totalInvested)}\nInterest Earned: ${formatINR(results.interestEarned)}\nMaturity Value: ${formatINR(results.maturityAmount)}`
    );
  }, [principal, rate, tenure, frequency, results.maturityAmount]);

  const chartData = {
    labels: ['Invested Principal', 'Interest Gained'],
    datasets: [
      {
        data: [results.totalInvested, results.interestEarned],
        backgroundColor: ['#1e3a8a', '#10b981'],
        hoverBackgroundColor: ['#1d4ed8', '#059669'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { family: 'Inter', size: 12 },
          color: '#1e293b',
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.label}: ${formatINR(context.raw)}`,
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
              <span className="slider-label">FD Principal Amount</span>
              <span className="slider-value-display">{formatINR(principal)}</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="5000"
                max="5000000"
                step="5000"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>₹5,000</span>
              <span>50 Lakhs</span>
            </div>
            <div className="quick-options-row no-print">
              <button className="quick-option-btn" onClick={() => setPrincipal(10000)}>10K</button>
              <button className="quick-option-btn" onClick={() => setPrincipal(50000)}>50K</button>
              <button className="quick-option-btn" onClick={() => setPrincipal(100000)}>1L</button>
              <button className="quick-option-btn" onClick={() => setPrincipal(500000)}>5L</button>
              <button className="quick-option-btn" onClick={() => setPrincipal(1000000)}>10L</button>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Rate of Interest (% p.a.)</span>
              <span className="slider-value-display">{rate}%</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="3"
                max="15"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>3%</span>
              <span>15%</span>
            </div>
            <div className="quick-options-row no-print">
              <button className="quick-option-btn" onClick={() => setRate(6.0)}>6.0%</button>
              <button className="quick-option-btn" onClick={() => setRate(7.0)}>7.0%</button>
              <button className="quick-option-btn" onClick={() => setRate(7.5)}>7.5%</button>
              <button className="quick-option-btn" onClick={() => setRate(8.0)}>8.0%</button>
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
                max="10"
                step="1"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>1 Year</span>
              <span>10 Years</span>
            </div>
          </div>

          {/* Compounding Frequency Selection */}
          <div className="slider-group">
            <span className="slider-label">Compounding Frequency</span>
            <div className="custom-select-block no-print">
              <button
                className={`custom-select-option ${frequency === 12 ? 'selected' : ''}`}
                onClick={() => setFrequency(12)}
              >
                Monthly
              </button>
              <button
                className={`custom-select-option ${frequency === 4 ? 'selected' : ''}`}
                onClick={() => setFrequency(4)}
              >
                Quarterly
              </button>
              <button
                className={`custom-select-option ${frequency === 2 ? 'selected' : ''}`}
                onClick={() => setFrequency(2)}
              >
                Half-Yearly
              </button>
              <button
                className={`custom-select-option ${frequency === 1 ? 'selected' : ''}`}
                onClick={() => setFrequency(1)}
              >
                Yearly
              </button>
            </div>
            <span className="print-only">Compounding: {frequency === 12 ? 'Monthly' : frequency === 4 ? 'Quarterly' : frequency === 2 ? 'Half-Yearly' : 'Yearly'}</span>
          </div>
        </div>

        {/* Output Panel */}
        <div className="results-panel">
          <div className="output-summary-card">
            <div className="summary-card-title">FD Maturity Value</div>
            <div className="summary-card-value">{formatINR(results.maturityAmount)}</div>
            
            <div className="summary-card-grid">
              <div className="summary-card-item">
                <span className="summary-card-item-label">Invested Principal</span>
                <span className="summary-card-item-value">{formatINR(principal)}</span>
              </div>
              <div className="summary-card-item">
                <span className="summary-card-item-label">Interest Earned</span>
                <span className="summary-card-item-value">{formatINR(results.interestEarned)}</span>
              </div>
            </div>
          </div>

          <div className="output-chart-card">
            <span className="chart-title">Principal vs Interest Gained</span>
            <div className="chart-wrapper">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* SEO Rich Text Section */}
      <section className="seo-rich-content-section" id="faq-section">
        <h2>About Fixed Deposit (FD) Calculator</h2>
        <p>
          A Fixed Deposit (FD) is a secure financial instrument offered by banks and non-banking financial companies (NBFCs) in India. It allows you to deposit a lump sum amount for a fixed tenure (ranging from 7 days to 10 years) at a predetermined interest rate. The interest rate on FD is typically higher than that of regular savings accounts and remains fixed throughout the tenure.
        </p>

        <h3>Fixed Deposit compounding frequencies</h3>
        <p>
          FD interest in India is usually compounded quarterly. This means interest accrued in the first quarter is added to the principal balance, and interest for the next quarter is calculated on this cumulative amount. You can also opt for monthly interest payouts (non-cumulative) if you need regular income, or quarterly, half-yearly, and yearly compounding frequencies.
        </p>

        <h3>Frequently Asked Questions (FAQs)</h3>
        <div className="faq-list">
          <div className="faq-item">
            <h4 className="faq-question">1. Are Fixed Deposits completely safe?</h4>
            <p className="faq-answer">
              Yes, bank FDs are considered very safe. Deposits in scheduled commercial banks are insured under the **Deposit Insurance and Credit Guarantee Corporation (DICGC)** up to a maximum of **₹5 Lakhs** per account holder (covering both principal and interest) per bank.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">2. What is TDS on Fixed Deposits and how to avoid it?</h4>
            <p className="faq-answer">
              Banks deduct Tax Deducted at Source (TDS) at 10% if your annual interest income across all FDs in a bank exceeds **₹40,000** (₹50,000 for senior citizens). If your total annual income is below the taxable limit, you can submit **Form 15G** (Form 15H for senior citizens) to prevent TDS deduction.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">3. Can I break my FD before maturity?</h4>
            <p className="faq-answer">
              Yes, premature withdrawal of Fixed Deposits is allowed, but banks usually charge a penalty (typically **0.5% to 1.0%** reduction in the effective interest rate for the period the deposit remained with the bank). Tax Saver FDs (5-year lock-in) cannot be broken prematurely.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
