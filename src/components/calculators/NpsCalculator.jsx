import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { calculateNPS } from '../../utils/formulas';
import { formatINR } from '../../utils/format';

export default function NpsCalculator({ setResultText }) {
  const [monthlyContrib, setMonthlyContrib] = useState(10000);
  const [rate, setRate] = useState(10); // average equity+debt return
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [annuityPct, setAnnuityPct] = useState(40); // minimum mandatory is 40%
  const [annuityRate, setAnnuityRate] = useState(6); // standard annuity return rate

  const results = calculateNPS(monthlyContrib, rate, currentAge, retirementAge, annuityPct, annuityRate);

  useEffect(() => {
    setResultText(
      `Monthly Contrib: ${formatINR(monthlyContrib)}\nAge: ${currentAge} -> ${retirementAge}\nExpected Return: ${rate}%\nAnnuity Share: ${annuityPct}%\nAnnuity Return Rate: ${annuityRate}%\nTotal Corpus: ${formatINR(results.maturityAmount)}\nLump Sum Out: ${formatINR(results.lumpSum)}\nAnnuity Bought: ${formatINR(results.annuityCorpus)}\nMonthly Pension: ${formatINR(results.monthlyPension)}`
    );
  }, [monthlyContrib, rate, currentAge, retirementAge, annuityPct, annuityRate, results.maturityAmount]);

  const chartData = {
    labels: ['Lump Sum Amount (60%)', 'Annuity Corpus (40%)', 'Invested Principal'],
    datasets: [
      {
        // Highlight ratios clearly
        data: [results.lumpSum, results.annuityCorpus, results.totalInvested],
        backgroundColor: ['#10b981', '#3b82f6', '#1e3a8a'],
        hoverBackgroundColor: ['#059669', '#2563eb', '#1d4ed8'],
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
          font: { family: 'Inter', size: 11 },
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
          {/* Monthly Contribution */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Monthly NPS Contribution</span>
              <span className="slider-value-display">{formatINR(monthlyContrib)}</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="500"
                max="100000"
                step="500"
                value={monthlyContrib}
                onChange={(e) => setMonthlyContrib(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>₹500</span>
              <span>1 Lakh</span>
            </div>
            <div className="quick-options-row no-print">
              <button className="quick-option-btn" onClick={() => setMonthlyContrib(1000)}>1K</button>
              <button className="quick-option-btn" onClick={() => setMonthlyContrib(5000)}>5K</button>
              <button className="quick-option-btn" onClick={() => setMonthlyContrib(10000)}>10K</button>
              <button className="quick-option-btn" onClick={() => setMonthlyContrib(25000)}>25K</button>
            </div>
          </div>

          {/* Current Age */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Current Age</span>
              <span className="slider-value-display">{currentAge} Years</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="18"
                max="60"
                step="1"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>18 Years (Min)</span>
              <span>60 Years</span>
            </div>
          </div>

          {/* Retirement Age */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Retirement Age</span>
              <span className="slider-value-display">{retirementAge} Years</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="60"
                max="70"
                step="1"
                value={retirementAge}
                onChange={(e) => setRetirementAge(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>60 Years (Std)</span>
              <span>70 Years</span>
            </div>
          </div>

          {/* Expected ROI */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Expected Return Rate (% p.a.)</span>
              <span className="slider-value-display">{rate}%</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="5"
                max="18"
                step="0.5"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>5%</span>
              <span>18%</span>
            </div>
          </div>

          {/* Annuity Purchase Pct */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Annuity Purchase Share (%)</span>
              <span className="slider-value-display">{annuityPct}%</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="40"
                max="100"
                step="5"
                value={annuityPct}
                onChange={(e) => setAnnuityPct(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>40% (Min required)</span>
              <span>100%</span>
            </div>
          </div>

          {/* Annuity Rate */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Expected Annuity Interest Rate</span>
              <span className="slider-value-display">{annuityRate}%</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="3"
                max="12"
                step="0.5"
                value={annuityRate}
                onChange={(e) => setAnnuityRate(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>3%</span>
              <span>12%</span>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="results-panel">
          <div className="output-summary-card" style={{ background: 'linear-gradient(135deg, #1e3b8a 0%, #1e40af 100%)' }}>
            <div className="summary-card-title">Expected Monthly Pension</div>
            <div className="summary-card-value">{formatINR(results.monthlyPension)}</div>
            
            <div className="summary-card-grid">
              <div className="summary-card-item">
                <span className="summary-card-item-label">Total NPS Corpus</span>
                <span className="summary-card-item-value">{formatINR(results.maturityAmount)}</span>
              </div>
              <div className="summary-card-item">
                <span className="summary-card-item-label">Tax-Free Lump Sum (Max 60%)</span>
                <span className="summary-card-item-value">{formatINR(results.lumpSum)}</span>
              </div>
            </div>

            <div className="summary-card-grid" style={{ marginTop: '12px', borderTop: '1px dashed rgba(255,255,255,0.2)' }}>
              <div className="summary-card-item">
                <span className="summary-card-item-label">Total Investment</span>
                <span className="summary-card-item-value">{formatINR(results.totalInvested)}</span>
              </div>
              <div className="summary-card-item">
                <span className="summary-card-item-label">Annuity Reinvested (Min 40%)</span>
                <span className="summary-card-item-value">{formatINR(results.annuityCorpus)}</span>
              </div>
            </div>
          </div>

          <div className="output-chart-card">
            <span className="chart-title">Maturity Corpus Distribution</span>
            <div className="chart-wrapper">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* SEO Rich Text Section */}
      <section className="seo-rich-content-section" id="faq-section">
        <h2>About National Pension Scheme (NPS)</h2>
        <p>
          The National Pension System (NPS) is a voluntary, long-term retirement savings scheme designed to provide social security to citizens in India. Backed by the Central Government and regulated by the **Pension Fund Regulatory and Development Authority (PFRDA)**, NPS encourages people to invest in equity and debt funds during their employment, accumulating pension wealth.
        </p>

        <h3>Important NPS Rules (Tier I Account)</h3>
        <p>
          - **Lock-in**: Matures at age 60. You can stay invested up to age 70.
          - **Lump Sum Withdrawal**: Upon reaching age 60, you can withdraw up to **60%** of the accumulated corpus tax-free.
          - **Mandatory Annuity**: You must purchase a monthly annuity plan from an IRDAI-approved life insurance company with the remaining **40%** of the corpus. The annuity provides a regular monthly pension for life.
          - **Tax Benefits**: 
            - Deductions up to ₹1.5 Lakhs under **Section 80CCD(1)** (combined with 80C).
            - An exclusive additional deduction of **₹50,000** under **Section 80CCD(1B)**.
        </p>

        <h3>Frequently Asked Questions (FAQs)</h3>
        <div className="faq-list">
          <div className="faq-item">
            <h4 className="faq-question">1. What is the difference between NPS Tier I and Tier II accounts?</h4>
            <p className="faq-answer">
              Tier I is a mandatory retirement account with tax benefits and strict lock-in rules. Tier II is a voluntary savings account that allows quick withdrawals at any time without any lock-in. However, Tier II accounts do not qualify for any tax deductions.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">2. How are NPS funds invested?</h4>
            <p className="faq-answer">
              NPS funds are invested in four asset classes: Equity (E), Corporate Bonds (C), Government Securities (G), and Alternative Assets (A). You can choose to manage your allocation manually (Active Choice) or let it adjust automatically based on your age (Auto Choice).
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">3. Is annuity income taxable?</h4>
            <p className="faq-answer">
              While the 60% lump sum withdrawn at retirement is 100% tax-free, the monthly annuity pension you receive is treated as salary income and is taxed according to your income tax slabs in the year of receipt.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
