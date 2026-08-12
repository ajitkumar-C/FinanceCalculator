import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { calculateSIP } from '../../utils/formulas';
import { formatINR } from '../../utils/format';

export default function SipCalculator({ setResultText }) {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [rate, setRate] = useState(12); // standard equity return expectation
  const [tenure, setTenure] = useState(10);

  const results = calculateSIP(monthlyInvestment, rate, tenure);

  useEffect(() => {
    setResultText(
      `Monthly Investment: ${formatINR(monthlyInvestment)}\nExpected Return: ${rate}%\nTenure: ${tenure} years\nTotal Invested: ${formatINR(results.totalInvested)}\nEstimated Returns: ${formatINR(results.interestEarned)}\nFuture Value: ${formatINR(results.maturityAmount)}`
    );
  }, [monthlyInvestment, rate, tenure, results.maturityAmount]);

  const chartData = {
    labels: ['Invested Amount', 'Est. Returns'],
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
          {/* Monthly Investment */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Monthly Investment</span>
              <span className="slider-value-display">{formatINR(monthlyInvestment)}</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="500"
                max="100000"
                step="500"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>₹500</span>
              <span>1 Lakh</span>
            </div>
            <div className="quick-options-row no-print">
              <button className="quick-option-btn" onClick={() => setMonthlyInvestment(1000)}>1K</button>
              <button className="quick-option-btn" onClick={() => setMonthlyInvestment(5000)}>5K</button>
              <button className="quick-option-btn" onClick={() => setMonthlyInvestment(10000)}>10K</button>
              <button className="quick-option-btn" onClick={() => setMonthlyInvestment(25000)}>25K</button>
            </div>
          </div>

          {/* Expected Return Rate */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Expected Return Rate (% p.a.)</span>
              <span className="slider-value-display">{rate}%</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="5"
                max="30"
                step="0.5"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>5%</span>
              <span>30%</span>
            </div>
            <div className="quick-options-row no-print">
              <button className="quick-option-btn" onClick={() => setRate(8)}>8% (Debt)</button>
              <button className="quick-option-btn" onClick={() => setRate(12)}>12% (Equity)</button>
              <button className="quick-option-btn" onClick={() => setRate(15)}>15% (Aggressive)</button>
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
            <div className="quick-options-row no-print">
              <button className="quick-option-btn" onClick={() => setTenure(5)}>5 Yr</button>
              <button className="quick-option-btn" onClick={() => setTenure(10)}>10 Yr</button>
              <button className="quick-option-btn" onClick={() => setTenure(15)}>15 Yr</button>
              <button className="quick-option-btn" onClick={() => setTenure(25)}>25 Yr</button>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="results-panel">
          <div className="output-summary-card" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}>
            <div className="summary-card-title">Future Wealth Value</div>
            <div className="summary-card-value">{formatINR(results.maturityAmount)}</div>
            
            <div className="summary-card-grid">
              <div className="summary-card-item">
                <span className="summary-card-item-label">Invested Amount</span>
                <span className="summary-card-item-value">{formatINR(results.totalInvested)}</span>
              </div>
              <div className="summary-card-item">
                <span className="summary-card-item-label">Estimated Returns</span>
                <span className="summary-card-item-value">{formatINR(results.interestEarned)}</span>
              </div>
            </div>
          </div>

          <div className="output-chart-card">
            <span className="chart-title">Investment vs Wealth Growth</span>
            <div className="chart-wrapper">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* SEO Rich Text Section */}
      <section className="seo-rich-content-section" id="faq-section">
        <h2>About SIP (Systematic Investment Plan) Calculator</h2>
        <p>
          A Systematic Investment Plan (SIP) is a method offered by mutual funds in India to invest a fixed amount regularly (weekly, monthly, or quarterly) into a chosen mutual fund scheme. Instead of trying to time the market with a lump sum, a SIP allows you to buy units on a regular basis, leveraging **Rupee Cost Averaging** and the power of **Compounding**.
        </p>

        <h3>Benefits of SIP Investments</h3>
        <p>
          - **Financial Discipline**: Automates savings monthly directly from your bank.
          - **Rupee Cost Averaging**: When markets are high, your SIP buys fewer units. When markets drop, it buys more units, lowering your average cost per unit over time.
          - **Compounding Power**: Reinvested earnings generate their own earnings, creating exponential wealth growth over long tenures.
        </p>

        <h3>Frequently Asked Questions (FAQs)</h3>
        <div className="faq-list">
          <div className="faq-item">
            <h4 className="faq-question">1. Can I pause or stop my SIP at any time?</h4>
            <p className="faq-answer">
              Yes. SIP is extremely flexible. You can pause or stop your SIP without any penalties. The accumulated amount will remain invested in the fund, continuing to gain compounding interest until you redeem it.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">2. Are mutual fund SIP returns guaranteed?</h4>
            <p className="faq-answer">
              No. Mutual funds are subject to market risks, and returns are not guaranteed. However, historically, equity mutual funds in India have delivered **12% to 15% annual returns** over long-term periods (7+ years), outperforming traditional options like FD or PPF.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">3. What is the difference between Direct and Regular mutual funds?</h4>
            <p className="faq-answer">
              Direct mutual funds have no distributor commissions, resulting in a lower expense ratio, meaning you get higher returns. Regular mutual funds include broker/agent commissions, which reduces your annual compounding growth rate by 0.5% to 1.5% over time.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">4. Where can I invest in zero-commission Direct Mutual Funds?</h4>
            <p className="faq-answer" style={{ marginBottom: '8px' }}>
              To avoid broker commissions and maximize your compound yield, you can invest directly on official Asset Management Company (AMC) websites:
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
