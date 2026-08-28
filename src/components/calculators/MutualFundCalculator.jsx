import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { calculateMutualFund } from '../../utils/formulas';
import { formatINR } from '../../utils/format';
import NumericInput from '../common/NumericInput';

export default function MutualFundCalculator({ setResultText }) {
  const [investType, setInvestType] = useState('sip'); // 'sip' or 'lumpsum'
  const [amount, setAmount] = useState(5000);
  const [rate, setRate] = useState(12); // standard mutual fund return
  const [tenure, setTenure] = useState(10); // 10 years

  // Adjust default limits if user switches to lumpsum
  useEffect(() => {
    if (investType === 'lumpsum' && amount === 5000) {
      setAmount(100000); // set default lumpsum to 1 Lakh
    } else if (investType === 'sip' && amount === 100000) {
      setAmount(5000); // set default SIP to 5K
    }
  }, [investType]);

  const results = calculateMutualFund(amount, rate, tenure, investType);

  useEffect(() => {
    setResultText(
      `MF Investment Type: ${investType.toUpperCase()}\nAmount: ${formatINR(amount)}${investType === 'sip' ? '/mo' : ' one-time'}\nExpected Return: ${rate}%\nTenure: ${tenure} years\nTotal Invested: ${formatINR(results.totalInvested)}\nEstimated Returns: ${formatINR(results.interestEarned)}\nFuture Value: ${formatINR(results.maturityAmount)}`
    );
  }, [amount, rate, tenure, investType, results.maturityAmount]);

  const chartData = {
    labels: ['Invested Principal', 'Est. Capital Gains'],
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
          {/* Investment Type Selector */}
          <div className="slider-group">
            <span className="slider-label">Investment Type</span>
            <div className="custom-select-block no-print">
              <button
                className={`custom-select-option ${investType === 'sip' ? 'selected' : ''}`}
                onClick={() => setInvestType('sip')}
              >
                SIP (Monthly)
              </button>
              <button
                className={`custom-select-option ${investType === 'lumpsum' ? 'selected' : ''}`}
                onClick={() => setInvestType('lumpsum')}
              >
                Lumpsum (One-Time)
              </button>
            </div>
            <span className="print-only">Investment Type: {investType === 'sip' ? 'Monthly SIP' : 'One-time Lumpsum'}</span>
          </div>

          {/* Investment Amount */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">
                {investType === 'sip' ? 'Monthly SIP Amount' : 'Lumpsum Principal'}
              </span>
              <NumericInput
                value={amount}
                onChange={setAmount}
                min={500}
                max={50000000}
                step={500}
                prefix="₹"
                ariaLabel="Investment Amount"
              />
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min={investType === 'sip' ? '500' : '5000'}
                max={investType === 'sip' ? '100000' : '2000000'}
                step={investType === 'sip' ? '500' : '5000'}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>{investType === 'sip' ? '₹500' : '₹5,000'}</span>
              <span>{investType === 'sip' ? '1 Lakh' : '20 Lakhs'}</span>
            </div>
            <div className="quick-options-row no-print">
              {investType === 'sip' ? (
                <>
                  <button className="quick-option-btn" onClick={() => setAmount(1000)}>1K</button>
                  <button className="quick-option-btn" onClick={() => setAmount(5000)}>5K</button>
                  <button className="quick-option-btn" onClick={() => setAmount(10000)}>10K</button>
                  <button className="quick-option-btn" onClick={() => setAmount(25000)}>25K</button>
                </>
              ) : (
                <>
                  <button className="quick-option-btn" onClick={() => setAmount(10000)}>10K</button>
                  <button className="quick-option-btn" onClick={() => setAmount(50000)}>50K</button>
                  <button className="quick-option-btn" onClick={() => setAmount(100000)}>1L</button>
                  <button className="quick-option-btn" onClick={() => setAmount(500000)}>5L</button>
                  <button className="quick-option-btn" onClick={() => setAmount(1000000)}>10L</button>
                </>
              )}
            </div>
          </div>

          {/* Expected Return Rate */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Expected Return Rate (% p.a.)</span>
              <NumericInput
                value={rate}
                onChange={setRate}
                min={1}
                max={50}
                step={0.1}
                suffix="%"
                ariaLabel="Expected Return Rate"
              />
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="5"
                max="25"
                step="0.5"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>5%</span>
              <span>25%</span>
            </div>
            <div className="quick-options-row no-print">
              <button className="quick-option-btn" onClick={() => setRate(6)}>6% (Liquid)</button>
              <button className="quick-option-btn" onClick={() => setRate(10)}>10% (Hybrid)</button>
              <button className="quick-option-btn" onClick={() => setRate(12)}>12% (Large Cap)</button>
              <button className="quick-option-btn" onClick={() => setRate(15)}>15% (Mid/Small Cap)</button>
            </div>
          </div>

          {/* Tenure */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Tenure (Years)</span>
              <NumericInput
                value={tenure}
                onChange={setTenure}
                min={1}
                max={50}
                step={1}
                suffix=" Yr"
                ariaLabel="Tenure in Years"
              />
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
          </div>
        </div>

        {/* Output Panel */}
        <div className="results-panel">
          <div className="output-summary-card" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)' }}>
            <div className="summary-card-title">Future Portfolio Value</div>
            <div className="summary-card-value">{formatINR(results.maturityAmount)}</div>
            
            <div className="summary-card-grid">
              <div className="summary-card-item">
                <span className="summary-card-item-label">Total Invested</span>
                <span className="summary-card-item-value">{formatINR(results.totalInvested)}</span>
              </div>
              <div className="summary-card-item">
                <span className="summary-card-item-label">Estimated Gains</span>
                <span className="summary-card-item-value">{formatINR(results.interestEarned)}</span>
              </div>
            </div>
          </div>

          <div className="output-chart-card">
            <span className="chart-title">Mutual Fund Wealth Breakdown</span>
            <div className="chart-wrapper">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* SEO Rich Text Section */}
      <section className="seo-rich-content-section" id="faq-section">
        <h2>About Mutual Fund Returns Calculator</h2>
        <p>
          A Mutual Fund Returns Calculator is an essential tool to estimate the future growth of your investments in equity, debt, or hybrid mutual funds in India. By choosing either a Systematic Investment Plan (SIP) or a Lumpsum approach, you can analyze how compounding returns expand your investment portfolio over time.
        </p>

        <h3>SIP vs Lumpsum Investments</h3>
        <p>
          - **SIP (Systematic Investment Plan)**: Best for salaried earners. It allows you to invest a small fixed sum monthly, lowering the risk of market volatility via Rupee Cost Averaging.
          - **Lumpsum**: Best when you have a surplus of cash (such as a bonus or asset sale). It invests the entire amount at once. This maximizes returns if the market goes up but carries higher timing risks if the market is at a peak.
        </p>

        <h3>Mutual Fund Tax Rules in India (FY 2026-27 Slabs)</h3>
        <p>
          - **Equity Mutual Funds** (holding 65%+ domestic equities):
            - **Short-Term Capital Gains (STCG)**: Charged at **20%** if units are sold within 1 year of purchase.
            - **Long-Term Capital Gains (LTCG)**: Gains up to **₹1.25 Lakhs** in a financial year are exempt from tax. Gains above ₹1.25L are taxed at **12.5%** (without indexation).
          - **Debt Mutual Funds**: Gains are taxed according to your individual income tax slab rates, regardless of the holding period.
        </p>

        <h3>Frequently Asked Questions (FAQs)</h3>
        <div className="faq-list">
          <div className="faq-item">
            <h4 className="faq-question">1. What are ELSS Mutual Funds?</h4>
            <p className="faq-answer">
              ELSS (Equity Linked Savings Scheme) is a specific category of equity mutual funds that offers tax deductions up to ₹1.5 Lakhs under Section 80C of the Income Tax Act. It has the shortest lock-in period (3 years) among all Section 80C options (like PPF: 15 years, FD: 5 years).
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">2. What is Expense Ratio in mutual funds?</h4>
            <p className="faq-answer">
              The Expense Ratio is the annual fee charged by the Asset Management Company (AMC) to manage the mutual fund, covering fund manager salaries, administrative costs, and marketing. It is deducted from your daily NAV. A lower expense ratio (common in Direct funds) yields higher net returns.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">3. What does compounding mean in Mutual Funds?</h4>
            <p className="faq-answer">
              Mutual funds compound through the reinvestment of dividends and capital gains. As your investments generate gains, those gains buy more mutual fund units which in turn generate their own gains, leading to exponential portfolio growth.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">4. Where can I invest in zero-commission Direct Mutual Funds?</h4>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-main)' }}>
              To avoid broker commission leakages and maximize your compound portfolio yield, you can invest directly through official Asset Management Company (AMC) websites:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', fontSize: '12px', marginTop: '8px' }}>
              <a href="https://www.sbimf.com/" target="_blank" rel="noopener noreferrer">SBI Mutual Fund</a>
              <a href="https://www.hdfcfund.com/" target="_blank" rel="noopener noreferrer">HDFC Mutual Fund</a>
              <a href="https://www.icicipruamc.com/" target="_blank" rel="noopener noreferrer">ICICI Prudential Mutual Fund</a>
              <a href="https://mf.nipponindiaim.com/" target="_blank" rel="noopener noreferrer">Nippon India Mutual Fund</a>
              <a href="https://www.kotakmf.com/" target="_blank" rel="noopener noreferrer">Kotak Mutual Fund</a>
              <a href="https://www.axismf.com/" target="_blank" rel="noopener noreferrer">Axis Mutual Fund</a>
              <a href="https://www.utimf.com/" target="_blank" rel="noopener noreferrer">UTI Mutual Fund</a>
              <a href="https://mutualfund.adityabirlacapital.com/" target="_blank" rel="noopener noreferrer">Aditya Birla Sun Life MF</a>
              <a href="https://amc.ppfas.com/" target="_blank" rel="noopener noreferrer">Parag Parikh Mutual Fund</a>
              <a href="https://www.miraeassetmf.co.in/" target="_blank" rel="noopener noreferrer">Mirae Asset Mutual Fund</a>
              <a href="https://www.dspim.com/" target="_blank" rel="noopener noreferrer">DSP Mutual Fund</a>
              <a href="https://www.tatamutualfund.com/" target="_blank" rel="noopener noreferrer">Tata Mutual Fund</a>
              <a href="https://quantmutual.com/" target="_blank" rel="noopener noreferrer">Quant Mutual Fund</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
