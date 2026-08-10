import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { calculatePPF } from '../../utils/formulas';
import { formatINR } from '../../utils/format';

export default function PpfCalculator({ setResultText }) {
  const [yearlyContrib, setYearlyContrib] = useState(150000); // 1.5 Lakhs (max tax benefit)
  const [tenure, setTenure] = useState(15); // standard lock-in
  const [rate, setRate] = useState(7.1); // current standard

  const results = calculatePPF(yearlyContrib, tenure, rate);

  useEffect(() => {
    setResultText(
      `Yearly Investment: ${formatINR(yearlyContrib)}\nTenure: ${tenure} years\nInterest Rate: ${rate}%\nTotal Invested: ${formatINR(results.totalInvested)}\nInterest Earned: ${formatINR(results.interestEarned)}\nMaturity Amount: ${formatINR(results.maturityAmount)}`
    );
  }, [yearlyContrib, tenure, rate, results.maturityAmount]);

  const chartData = {
    labels: ['Total Invested Amount', 'Total Interest Earned'],
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
          {/* Yearly Contribution */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Yearly Investment</span>
              <span className="slider-value-display">{formatINR(yearlyContrib)}</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="500"
                max="150000"
                step="500"
                value={yearlyContrib}
                onChange={(e) => setYearlyContrib(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>₹500 (Min)</span>
              <span>1.5 Lakhs (Max)</span>
            </div>
            <div className="quick-options-row no-print">
              <button className="quick-option-btn" onClick={() => setYearlyContrib(10000)}>10K</button>
              <button className="quick-option-btn" onClick={() => setYearlyContrib(50000)}>50K</button>
              <button className="quick-option-btn" onClick={() => setYearlyContrib(100000)}>1L</button>
              <button className="quick-option-btn" onClick={() => setYearlyContrib(150000)}>1.5L</button>
            </div>
          </div>

          {/* Tenure */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Tenure (Years)</span>
              <span className="slider-value-display">{tenure} Years</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="15"
                max="50"
                step="5"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>15 Years (Min lock-in)</span>
              <span>50 Years</span>
            </div>
            <div className="quick-options-row no-print">
              <button className="quick-option-btn" onClick={() => setTenure(15)}>15 Yr</button>
              <button className="quick-option-btn" onClick={() => setTenure(20)}>20 Yr</button>
              <button className="quick-option-btn" onClick={() => setTenure(25)}>25 Yr</button>
              <button className="quick-option-btn" onClick={() => setTenure(30)}>30 Yr</button>
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
                min="5"
                max="12"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>5%</span>
              <span>12%</span>
            </div>
            <p className="slider-note no-print" style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
              *Govt of India reviews PPF rates quarterly. Current rate is 7.1%.
            </p>
          </div>
        </div>

        {/* Output Panel */}
        <div className="results-panel">
          <div className="output-summary-card">
            <div className="summary-card-title">PPF Maturity Amount</div>
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
            <span className="chart-title">Wealth Growth Breakup</span>
            <div className="chart-wrapper">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* SEO Rich Text Section */}
      <section className="seo-rich-content-section" id="faq-section">
        <h2>About PPF (Public Provident Fund) Calculator</h2>
        <p>
          The Public Provident Fund (PPF) is a popular long-term savings-cum-investment scheme backed by the Government of India. Introduced in 1968, it aims to mobilize small savings by offering reasonable returns combined with high tax safety. PPF enjoys the coveted **Exempt-Exempt-Exempt (EEE)** tax status, meaning contributions, interest earned, and maturity proceeds are all completely tax-free.
        </p>

        <h3>Key Features of PPF Scheme</h3>
        <p>
          - **Lock-in Period**: 15 years. You can extend it in blocks of 5 years indefinitely.
          - **Contribution limits**: Minimum ₹500 and Maximum ₹1,50,000 per financial year.
          - **Tax Benefit**: Eligible for deduction up to ₹1.5 Lakhs under Section 80C of the Income Tax Act.
          - **Compounding Frequency**: Interest is compounded annually and credited on March 31st of every year.
        </p>

        <h3>Frequently Asked Questions (FAQs)</h3>
        <div className="faq-list">
          <div className="faq-item">
            <h4 className="faq-question">1. How is interest calculated in PPF?</h4>
            <p className="faq-answer">
              Though interest is credited at the end of the financial year, it is calculated monthly on the minimum balance in your PPF account between the **5th and the last day of the month**. Therefore, to maximize returns, you should deposit your PPF contribution before the 5th of the month or at the very start of the financial year (April 1 to 5).
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">2. Can I withdraw money from PPF before 15 years?</h4>
            <p className="faq-answer">
              Partial withdrawals are permitted from the 7th financial year onwards (i.e., after completion of 6 years). The maximum withdrawal limit is 50% of the account balance at the end of the 4th year preceding the withdrawal year, or the preceding year, whichever is lower.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">3. Can I take a loan against my PPF account?</h4>
            <p className="faq-answer">
              Yes, you can take a loan against your PPF balance between the 3rd and 6th financial year of opening the account. The loan amount is capped at 25% of the balance at the end of the second year preceding the loan application year.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
