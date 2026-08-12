import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { calculateEMI } from '../../utils/formulas';
import { formatINR } from '../../utils/format';

export default function EmiCalculator({ setResultText }) {
  const [amount, setAmount] = useState(5000000); // 50 Lakhs
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20); // 20 years

  const results = calculateEMI(amount, rate, tenure);

  // Set parent result text for PDF/sharing
  useEffect(() => {
    setResultText(
      `Loan Amount: ${formatINR(amount)}\nInterest Rate: ${rate}%\nTenure: ${tenure} years\nMonthly EMI: ${formatINR(results.emi)}\nTotal Interest: ${formatINR(results.totalInterest)}\nTotal Repayment: ${formatINR(results.totalPayment)}`
    );
  }, [amount, rate, tenure, results.emi]);

  const chartData = {
    labels: ['Principal Amount', 'Interest Amount'],
    datasets: [
      {
        data: [amount, results.totalInterest],
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
          {/* Loan Amount */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Loan Amount</span>
              <span className="slider-value-display">{formatINR(amount)}</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="100000"
                max="20000000"
                step="50000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>1 Lakh</span>
              <span>2 Crore</span>
            </div>
            <div className="quick-options-row no-print">
              <button className="quick-option-btn" onClick={() => setAmount(1000000)}>10L</button>
              <button className="quick-option-btn" onClick={() => setAmount(2500000)}>25L</button>
              <button className="quick-option-btn" onClick={() => setAmount(5000000)}>50L</button>
              <button className="quick-option-btn" onClick={() => setAmount(10000000)}>1 Cr</button>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Interest Rate (p.a.)</span>
              <span className="slider-value-display">{rate}%</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="5"
                max="20"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>5%</span>
              <span>20%</span>
            </div>
            <div className="quick-options-row no-print">
              <button className="quick-option-btn" onClick={() => setRate(7.5)}>7.5%</button>
              <button className="quick-option-btn" onClick={() => setRate(8.5)}>8.5%</button>
              <button className="quick-option-btn" onClick={() => setRate(10.5)}>10.5%</button>
              <button className="quick-option-btn" onClick={() => setRate(12.0)}>12%</button>
            </div>
          </div>

          {/* Loan Tenure */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Tenure (Years)</span>
              <span className="slider-value-display">{tenure} Yr</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>1 Year</span>
              <span>30 Years</span>
            </div>
            <div className="quick-options-row no-print">
              <button className="quick-option-btn" onClick={() => setTenure(5)}>5 Yr</button>
              <button className="quick-option-btn" onClick={() => setTenure(10)}>10 Yr</button>
              <button className="quick-option-btn" onClick={() => setTenure(15)}>15 Yr</button>
              <button className="quick-option-btn" onClick={() => setTenure(20)}>20 Yr</button>
              <button className="quick-option-btn" onClick={() => setTenure(30)}>30 Yr</button>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="results-panel">
          <div className="output-summary-card">
            <div className="summary-card-title">Monthly Home Loan EMI</div>
            <div className="summary-card-value">{formatINR(results.emi)}</div>
            
            <div className="summary-card-grid">
              <div className="summary-card-item">
                <span className="summary-card-item-label">Principal Amount</span>
                <span className="summary-card-item-value">{formatINR(amount)}</span>
              </div>
              <div className="summary-card-item">
                <span className="summary-card-item-label">Total Interest</span>
                <span className="summary-card-item-value">{formatINR(results.totalInterest)}</span>
              </div>
            </div>

            <div className="summary-card-grid" style={{ marginTop: '12px', borderTop: '1px dashed rgba(255,255,255,0.2)' }}>
              <div className="summary-card-item" style={{ gridColumn: 'span 2' }}>
                <span className="summary-card-item-label">Total Amount Payable</span>
                <span className="summary-card-item-value">{formatINR(results.totalPayment)}</span>
              </div>
            </div>
          </div>

          <div className="output-chart-card">
            <span className="chart-title">Breakup of Total Payment</span>
            <div className="chart-wrapper">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* SEO Rich Text Section */}
      <section className="seo-rich-content-section" id="faq-section">
        <h2>About EMI Calculator</h2>
        <p>
          Equated Monthly Installment (EMI) is the monthly amount payable to the bank or any other financial institution until the loan amount is fully paid off. It consists of the interest on loan as well as part of the principal amount to be repaid. The interest component constitutes the major portion of the EMI in the initial years, but gradually, the principal component increases.
        </p>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px', marginBottom: '20px' }}>
          *Note: To verify your estimates, you can compare results with the official <a href="https://sbi.co.in/web/personal-banking/investments-deposits/govt-schemes/calculators/emi-calculator" target="_blank" rel="noopener noreferrer">SBI EMI Calculator</a> or check direct rates on the <a href="https://www.hdfcbank.com/personal/tools-and-calculators/home-loan-emi-calculator" target="_blank" rel="noopener noreferrer">HDFC Home Loan Calculator</a> and <a href="https://www.hdfcbank.com/personal/tools-and-calculators/personal-loan-emi-calculator" target="_blank" rel="noopener noreferrer">HDFC Personal Loan Calculator</a>.
        </p>

        <h3>Mathematical Formula for EMI Calculation</h3>
        <p>The standard mathematical formula to calculate EMI is:</p>
        <div className="formula-block">
          EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
        </div>
        <p>Where:</p>
        <ul style={{ paddingLeft: '20px', fontSize: '14px', color: 'var(--text-main)' }}>
          <li><strong>P</strong> represents the Principal Loan Amount.</li>
          <li><strong>R</strong> represents the monthly interest rate (Annual Rate / 12 / 100).</li>
          <li><strong>N</strong> represents the number of monthly installments (Tenure in Years x 12).</li>
        </ul>

        <h3>Frequently Asked Questions (FAQs)</h3>
        <div className="faq-list">
          <div className="faq-item">
            <h4 className="faq-question">1. How does tenure impact EMI and total interest?</h4>
            <p className="faq-answer">
              A longer tenure decreases your monthly EMI, making it easier to manage on a monthly basis. However, a longer tenure increases the interest accrued, significantly driving up the overall cost of the loan.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">2. Can I prepay my loan to reduce interest?</h4>
            <p className="faq-answer">
              Yes, in India, most floating-rate home loans do not charge prepayment penalties. Making partial prepayments directly reduces the principal balance, which reduces the loan tenure or monthly EMI, saving you substantial interest.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">3. What is the difference between flat interest rate and reducing balance rate?</h4>
            <p className="faq-answer">
              A flat rate calculates interest on the initial loan amount for the entire tenure. A reducing balance rate calculates interest on the outstanding principal balance, which decreases monthly as you pay off the principal. The reducing balance method is standard in Indian retail loans.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
