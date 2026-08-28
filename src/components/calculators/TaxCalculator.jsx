import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { calculateTax } from '../../utils/formulas';
import { formatINR } from '../../utils/format';
import NumericInput from '../common/NumericInput';

export default function TaxCalculator({ setResultText }) {
  const [income, setIncome] = useState(1000000); // 10 Lakhs gross
  const [deductions, setDeductions] = useState(150000); // standard 80C deductions

  const results = calculateTax(income, deductions);

  useEffect(() => {
    setResultText(
      `Gross Annual Income: ${formatINR(income)}\nDeductions (Old Regime): ${formatINR(deductions)}\nNew Regime Tax: ${formatINR(results.newRegime.totalTax)}\nOld Regime Tax: ${formatINR(results.oldRegime.totalTax)}\nRecommended: ${results.recommendation}\nTax Savings: ${formatINR(results.savings)}`
    );
  }, [income, deductions, results.newRegime.totalTax, results.oldRegime.totalTax]);

  const chartData = {
    labels: ['New Tax Regime', 'Old Tax Regime'],
    datasets: [
      {
        label: 'Total Tax Payable (₹)',
        data: [results.newRegime.totalTax, results.oldRegime.totalTax],
        backgroundColor: [
          results.recommendation === 'New Regime' ? '#10b981' : '#3b82f6',
          results.recommendation === 'Old Regime' ? '#10b981' : '#3b82f6'
        ],
        borderRadius: 6,
        borderWidth: 1,
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
          label: (context) => ` ${context.label || ''}: ${formatINR(context.raw)}`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => formatINR(value),
          font: { family: 'Inter', size: 10 },
        },
      },
      x: {
        ticks: {
          font: { family: 'Inter', size: 11 },
        },
      },
    },
  };

  return (
    <div className="calculator-container">
      <div className="calculator-wrapper-grid">
        {/* Input Panel */}
        <div className="calculator-panel">
          {/* Gross Annual Income */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Gross Annual Income</span>
              <NumericInput
                value={income}
                onChange={setIncome}
                min={0}
                max={50000000}
                step={10000}
                prefix="₹"
                ariaLabel="Gross Annual Income"
              />
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="200000"
                max="5000000"
                step="50000"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>2 Lakhs</span>
              <span>50 Lakhs</span>
            </div>
            <div className="quick-options-row no-print">
              <button className="quick-option-btn" onClick={() => setIncome(500000)}>5L</button>
              <button className="quick-option-btn" onClick={() => setIncome(750000)}>7.5L</button>
              <button className="quick-option-btn" onClick={() => setIncome(1000000)}>10L</button>
              <button className="quick-option-btn" onClick={() => setIncome(1500000)}>15L</button>
              <button className="quick-option-btn" onClick={() => setIncome(2500000)}>25L</button>
            </div>
          </div>

          {/* Deductions (Old Regime) */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Deductions (Old Regime Only)</span>
              <NumericInput
                value={deductions}
                onChange={setDeductions}
                min={0}
                max={5000000}
                step={5000}
                prefix="₹"
                ariaLabel="Deductions Old Regime"
              />
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="0"
                max="500000"
                step="10000"
                value={deductions}
                onChange={(e) => setDeductions(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>₹0</span>
              <span>5 Lakhs</span>
            </div>
            <div className="quick-options-row no-print">
              <button className="quick-option-btn" onClick={() => setDeductions(0)}>₹0</button>
              <button className="quick-option-btn" onClick={() => setDeductions(150000)}>1.5L (80C)</button>
              <button className="quick-option-btn" onClick={() => setDeductions(200000)}>2L (80C+80D)</button>
              <button className="quick-option-btn" onClick={() => setDeductions(300000)}>3L (With HRA)</button>
            </div>
            <p className="slider-note no-print" style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
              *Deductions include Sec 80C (EPF, PPF, ELSS), Sec 80D (Health Insurance), HRA, Home Loan Interest (Sec 24b).
            </p>
          </div>
        </div>

        {/* Output Panel */}
        <div className="results-panel">
          <div className="regime-comparison-grid">
            {/* New Regime Card */}
            <div className={`regime-card ${results.recommendation === 'New Regime' ? 'recommended' : ''}`}>
              <div className="regime-card-title">
                <span>NEW REGIME</span>
                {results.recommendation === 'New Regime' && <span className="recommend-badge">RECOMMENDED</span>}
              </div>
              <div className="regime-value">{formatINR(results.newRegime.totalTax)}</div>
              
              <div className="regime-details-list">
                <div className="regime-detail-row">
                  <span>Gross Income:</span>
                  <span>{formatINR(income)}</span>
                </div>
                <div className="regime-detail-row">
                  <span>Standard Ded:</span>
                  <span>- {formatINR(75000)}</span>
                </div>
                <div className="regime-detail-row">
                  <span>Taxable Income:</span>
                  <span>{formatINR(results.newRegime.taxableIncome)}</span>
                </div>
                <div className="regime-detail-row">
                  <span>Tax Bracket / Slab:</span>
                  <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{results.newRegime.taxBracket}</span>
                </div>
                <div className="regime-detail-row">
                  <span>Base Tax:</span>
                  <span>{formatINR(results.newRegime.baseTax)}</span>
                </div>
                <div className="regime-detail-row">
                  <span>Education Cess (4%):</span>
                  <span>{formatINR(results.newRegime.cess)}</span>
                </div>
              </div>
            </div>

            {/* Old Regime Card */}
            <div className={`regime-card ${results.recommendation === 'Old Regime' ? 'recommended' : ''}`}>
              <div className="regime-card-title">
                <span>OLD REGIME</span>
                {results.recommendation === 'Old Regime' && <span className="recommend-badge">RECOMMENDED</span>}
              </div>
              <div className="regime-value">{formatINR(results.oldRegime.totalTax)}</div>

              <div className="regime-details-list">
                <div className="regime-detail-row">
                  <span>Gross Income:</span>
                  <span>{formatINR(income)}</span>
                </div>
                <div className="regime-detail-row">
                  <span>Standard Ded:</span>
                  <span>- {formatINR(50000)}</span>
                </div>
                <div className="regime-detail-row">
                  <span>Deductions:</span>
                  <span>- {formatINR(deductions)}</span>
                </div>
                <div className="regime-detail-row">
                  <span>Taxable Income:</span>
                  <span>{formatINR(results.oldRegime.taxableIncome)}</span>
                </div>
                <div className="regime-detail-row">
                  <span>Tax Bracket / Slab:</span>
                  <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{results.oldRegime.taxBracket}</span>
                </div>
                <div className="regime-detail-row">
                  <span>Base Tax:</span>
                  <span>{formatINR(results.oldRegime.baseTax)}</span>
                </div>
                <div className="regime-detail-row">
                  <span>Education Cess (4%):</span>
                  <span>{formatINR(results.oldRegime.cess)}</span>
                </div>
              </div>
            </div>
          </div>

          {results.savings > 0 && (
            <div className="tax-savings-banner">
              🎉 You save <strong>{formatINR(results.savings)}</strong> by opting for <strong>{results.recommendation}</strong>!
            </div>
          )}

          <div className="output-chart-card">
            <span className="chart-title">Tax Comparison (Old vs New Regime)</span>
            <div className="chart-wrapper" style={{ maxWidth: '100%', height: '200px' }}>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* SEO Rich Text Section */}
      <section className="seo-rich-content-section" id="faq-section">
        <h2>About Income Tax Calculator</h2>
        <p>
          The Income Tax Calculator helps you compare tax liability under the **Old Tax Regime** and the **New Tax Regime** in India. The New Tax Regime is the default regime and has been updated with the latest **Union Budget 2025** slabs (for FY 2025-26 & FY 2026-27). It offers lower slab rates and a high tax rebate, but does not allow major tax exemptions like Section 80C, 80D, HRA, or Home Loan interest deductions. The Old Regime allows all exemptions but has higher tax rates.
        </p>

        <h3>Latest Tax Slab Rates (FY 2025-26 / FY 2026-27 / AY 2026-27 & 2027-28)</h3>
        <div className="custom-table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Taxable Income Range (₹)</th>
                <th>New Tax Rate (%)</th>
                <th>Old Tax Rate (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Up to 2,50,000</td>
                <td>Nil</td>
                <td>Nil</td>
              </tr>
              <tr>
                <td>2,50,001 to 4,00,000</td>
                <td>Nil</td>
                <td>5%</td>
              </tr>
              <tr>
                <td>4,00,001 to 5,00,000</td>
                <td>5%</td>
                <td>5%</td>
              </tr>
              <tr>
                <td>5,00,001 to 8,00,000</td>
                <td>5%</td>
                <td>20%</td>
              </tr>
              <tr>
                <td>8,00,001 to 10,00,000</td>
                <td>10%</td>
                <td>20%</td>
              </tr>
              <tr>
                <td>10,00,001 to 12,00,000</td>
                <td>10%</td>
                <td>30%</td>
              </tr>
              <tr>
                <td>12,00,001 to 16,00,000</td>
                <td>15%</td>
                <td>30%</td>
              </tr>
              <tr>
                <td>16,00,001 to 20,00,000</td>
                <td>20%</td>
                <td>30%</td>
              </tr>
              <tr>
                <td>20,00,001 to 24,00,000</td>
                <td>25%</td>
                <td>30%</td>
              </tr>
              <tr>
                <td>Above 24,00,000</td>
                <td>30%</td>
                <td>30%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
          *Note: Standard deduction is ₹75,000 under the New Regime and ₹50,000 under the Old Regime for salaried employees. Tax rebate under Section 87A is available for income up to **₹12,00,000** in the New Regime (making net tax zero) and ₹5,00,000 in the Old Regime.
        </p>

        <h3>Frequently Asked Questions (FAQs)</h3>
        <div className="faq-list">
          <div className="faq-item">
            <h4 className="faq-question">1. Which tax regime is better for me?</h4>
            <p className="faq-answer">
              It depends on your deductions. If you pay rent (HRA), have a home loan, invest in PPF/ELSS, and buy health insurance (amounting to total deductions above ₹3.75 Lakhs), the Old Regime might save more tax. If your investments/deductions are minimal (below ₹2.5 Lakhs), the New Regime is highly likely to be more beneficial due to lower slab rates.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">2. What is Section 87A tax rebate?</h4>
            <p className="faq-answer">
              Section 87A rebate provides relief to individual taxpayers. If your net taxable income (after standard deduction and exemptions) is less than or equal to ₹7 Lakhs under the New Regime, your calculated tax is rebated to ₹0. Under the Old Regime, this rebate limit is capped at ₹5 Lakhs.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">3. Can I switch between Old and New regimes every year?</h4>
            <p className="faq-answer">
              Salaried individuals who do not have business income can choose/switch between the Old and New regimes every financial year at the time of filing their Income Tax Return (ITR). However, individuals with business or professional income get a one-time choice to opt out of the default New Regime and cannot switch back and forth.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">4. How do you find out your tax rate?</h4>
            <p className="faq-answer">
              If you are wondering 'how to <strong>find out my tax rate</strong>', simply enter your Gross Annual Income and deductions above. Our calculator automatically determines your marginal tax slab and shows your effective tax rate under both the Old and New Regimes instantly.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">5. Is there a filing taxes jointly vs separately calculator for India?</h4>
            <p className="faq-answer">
              While users often search for a <strong>filing taxes jointly vs separately calculator</strong>, in India, the Income Tax Department requires every individual to file taxes separately. There is no joint tax return filing for married couples under Indian tax law, so each individual must use the calculator based on their own separate income.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">6. Are there any fees to calculate taxes here (compared to Tax Buddy charges)?</h4>
            <p className="faq-answer">
              No. Unlike assisted tax filing platforms that carry mandatory subscription or assisted filing fees (like <strong>tax buddy charges</strong>), RupeeBuddy is 100% free with zero registration, zero ads, and zero hidden costs. You can simulate unlimited tax regimes and deductions completely private in your browser.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
