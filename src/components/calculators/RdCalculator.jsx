import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { calculateRD } from '../../utils/formulas';
import { formatINR } from '../../utils/format';

export default function RdCalculator({ setResultText }) {
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [rate, setRate] = useState(6.8); // standard bank RD rate
  const [tenureMonths, setTenureMonths] = useState(60); // 5 Years (60 Months)

  const results = calculateRD(monthlyDeposit, rate, tenureMonths);

  useEffect(() => {
    setResultText(
      `Monthly Deposit: ${formatINR(monthlyDeposit)}\nInterest Rate: ${rate}%\nTenure: ${tenureMonths} months\nTotal Invested: ${formatINR(results.totalInvested)}\nInterest Earned: ${formatINR(results.interestEarned)}\nMaturity Amount: ${formatINR(results.maturityAmount)}`
    );
  }, [monthlyDeposit, rate, tenureMonths, results.maturityAmount]);

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
          {/* Monthly Deposit */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Monthly Deposit Amount</span>
              <span className="slider-value-display">{formatINR(monthlyDeposit)}</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="500"
                max="100000"
                step="500"
                value={monthlyDeposit}
                onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>₹500</span>
              <span>1 Lakh</span>
            </div>
            <div className="quick-options-row no-print">
              <button className="quick-option-btn" onClick={() => setMonthlyDeposit(1000)}>1K</button>
              <button className="quick-option-btn" onClick={() => setMonthlyDeposit(5000)}>5K</button>
              <button className="quick-option-btn" onClick={() => setMonthlyDeposit(10000)}>10K</button>
              <button className="quick-option-btn" onClick={() => setMonthlyDeposit(25000)}>25K</button>
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
          </div>

          {/* Tenure in Months */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Tenure (Months)</span>
              <span className="slider-value-display">{tenureMonths} Months ({Math.round(tenureMonths/12 * 10)/10} Yr)</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="6"
                max="120"
                step="6"
                value={tenureMonths}
                onChange={(e) => setTenureMonths(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>6 Months</span>
              <span>120 Months (10 Yr)</span>
            </div>
            <div className="quick-options-row no-print">
              <button className="quick-option-btn" onClick={() => setTenureMonths(12)}>12 Mo (1 Yr)</button>
              <button className="quick-option-btn" onClick={() => setTenureMonths(36)}>36 Mo (3 Yr)</button>
              <button className="quick-option-btn" onClick={() => setTenureMonths(60)}>60 Mo (5 Yr)</button>
              <button className="quick-option-btn" onClick={() => setTenureMonths(120)}>120 Mo (10 Yr)</button>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="results-panel">
          <div className="output-summary-card" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)' }}>
            <div className="summary-card-title">RD Maturity Value</div>
            <div className="summary-card-value">{formatINR(results.maturityAmount)}</div>
            
            <div className="summary-card-grid">
              <div className="summary-card-item">
                <span className="summary-card-item-label">Total Invested</span>
                <span className="summary-card-item-value">{formatINR(results.totalInvested)}</span>
              </div>
              <div className="summary-card-item">
                <span className="summary-card-item-label">Interest Earned</span>
                <span className="summary-card-item-value">{formatINR(results.interestEarned)}</span>
              </div>
            </div>
          </div>

          <div className="output-chart-card">
            <span className="chart-title">Principal vs Interest Breakup</span>
            <div className="chart-wrapper">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* SEO Rich Text Section */}
      <section className="seo-rich-content-section" id="faq-section">
        <h2>About Recurring Deposit (RD) Calculator</h2>
        <p>
          A Recurring Deposit (RD) is a savings service offered by post offices and commercial banks in India. It is ideal for individuals who want to invest a fixed sum regularly every month to build a lumpsum corpus. It is safer than mutual funds because returns are completely guaranteed based on the interest rate locked in at the time of opening the RD.
        </p>

        <h3>RD Compounding Rules in Indian Banking</h3>
        <p>
          Similar to Fixed Deposits, RD interest is compounded **quarterly** by Indian banks. Each monthly installment is treated as a miniature fixed deposit compounding for the remainder of the tenure. Post office RDs, however, compound interest on a **monthly** basis. This calculator uses the standard quarterly compounding formula used by major Indian banks like SBI, HDFC, and ICICI.
        </p>

        <h3>Frequently Asked Questions (FAQs)</h3>
        <div className="faq-list">
          <div className="faq-item">
            <h4 className="faq-question">1. Is TDS applicable on Recurring Deposit interest?</h4>
            <p className="faq-answer">
              Yes, TDS is applicable on RDs just like Fixed Deposits. If the interest earned across all your RDs and FDs in a bank exceeds **₹40,000** in a financial year (₹50,000 for senior citizens), the bank will deduct TDS at 10% (or 20% if PAN card is not provided).
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">2. What happens if I miss a monthly RD payment?</h4>
            <p className="faq-answer">
              Banks generally allow a grace period of a few days. If you delay your deposit beyond that, a nominal penalty (usually around **₹1 to ₹2 per ₹100** per month) is charged. If you miss contributions for several consecutive months, the bank may close the account prematurely.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">3. Can I extend the tenure of an existing RD?</h4>
            <p className="faq-answer">
              No. Once an RD account is opened, the tenure and monthly deposit amount cannot be changed. If you wish to invest more, you will need to open a new Recurring Deposit account.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
