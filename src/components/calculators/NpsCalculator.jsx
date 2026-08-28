import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { calculateNPS } from '../../utils/formulas';
import { formatINR } from '../../utils/format';
import NumericInput from '../common/NumericInput';

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
              <NumericInput
                value={monthlyContrib}
                onChange={setMonthlyContrib}
                min={500}
                max={1000000}
                step={500}
                prefix="₹"
                ariaLabel="Monthly NPS Contribution"
              />
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
              <NumericInput
                value={currentAge}
                onChange={setCurrentAge}
                min={18}
                max={70}
                step={1}
                suffix=" Yr"
                ariaLabel="Current Age"
              />
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
              <NumericInput
                value={retirementAge}
                onChange={setRetirementAge}
                min={40}
                max={75}
                step={1}
                suffix=" Yr"
                ariaLabel="Retirement Age"
              />
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
              <NumericInput
                value={rate}
                onChange={setRate}
                min={1}
                max={30}
                step={0.5}
                suffix="%"
                ariaLabel="Expected Return Rate"
              />
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
              <NumericInput
                value={annuityPct}
                onChange={setAnnuityPct}
                min={40}
                max={100}
                step={5}
                suffix="%"
                ariaLabel="Annuity Purchase Percentage"
              />
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
              <NumericInput
                value={annuityRate}
                onChange={setAnnuityRate}
                min={1}
                max={25}
                step={0.5}
                suffix="%"
                ariaLabel="Expected Annuity Interest Rate"
              />
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
        <h2>National Pension Scheme India Calculator: How to Calculate NPS Pension</h2>
        <p>
          Wondering <strong>how to calculate NPS</strong> maturity returns and pension payouts? Our <strong>National Pension Scheme India calculator</strong> helps you project your total wealth accumulation, tax-free lump sum, and guaranteed lifelong monthly pension under the regulatory framework of the <strong>Pension Fund Regulatory and Development Authority (PFRDA)</strong>.
        </p>

        <h3>How to Calculate NPS Pension & Corpus Step-by-Step</h3>
        <p>
          Understanding <strong>how to calculate NPS pension</strong> involves three simple stages:
        </p>
        <ol style={{ paddingLeft: '20px', marginBottom: '16px', fontSize: '14px', color: 'var(--text-main)' }}>
          <li><strong>Corpus Accumulation:</strong> Monthly contributions compound annually based on your chosen asset allocation (Equity, Corporate Debt, Govt Securities).</li>
          <li><strong>Tax-Free Lump Sum (Up to 60%):</strong> Upon reaching retirement age (60), you can withdraw up to 60% of the accumulated corpus completely tax-free.</li>
          <li><strong>Monthly Annuity Pension (Min 40%):</strong> The remaining minimum 40% corpus is invested in an annuity plan from an IRDAI-approved life insurer to generate your fixed monthly pension.</li>
        </ol>

        <h3>Important NPS Rules & Tax Benefits (Tier I Account)</h3>
        <p>
          - <strong>Lock-in Period</strong>: Matures at age 60 (extendable up to age 75).<br />
          - <strong>Lump Sum Withdrawal</strong>: Up to <strong>60%</strong> tax-free on superannuation.<br />
          - <strong>Mandatory Annuity</strong>: Minimum <strong>40%</strong> reinvested for monthly pension for life.<br />
          - <strong>Tax Deductions</strong>: Deductions up to ₹1.5 Lakhs under <strong>Section 80CCD(1)</strong> + exclusive extra ₹50,000 deduction under <strong>Section 80CCD(1B)</strong> under the Old Tax Regime.
        </p>

        <h3>Frequently Asked Questions (FAQs)</h3>
        <div className="faq-list">
          <div className="faq-item">
            <h4 className="faq-question">1. How to calculate NPS pension amount received each month?</h4>
            <p className="faq-answer">
              To calculate your monthly NPS pension, multiply your annuity corpus (minimum 40% of total maturity value) by your expected annuity interest rate (typically 6% to 7% p.a.), then divide by 12. For example, a ₹40 Lakh annuity corpus at 6% generates ₹20,000 per month in pension.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">2. What is the difference between NPS Tier I and Tier II accounts?</h4>
            <p className="faq-answer">
              Tier I is a mandatory retirement account with strict lock-in and exclusive tax deductions. Tier II is an optional voluntary investment account that allows instant withdrawals anytime without lock-in, but does not provide tax deductions.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">3. How are funds managed in the National Pension Scheme?</h4>
            <p className="faq-answer">
              You can choose Active Choice (you specify equity/debt ratio, up to 75% equity) or Auto Choice (lifecycle fund that automatically shifts equity to bonds as you age). PFRDA registered managers include SBI Pension Fund, HDFC Pension, and ICICI Prudential Pension.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
