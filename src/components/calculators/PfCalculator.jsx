import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { calculateEPF } from '../../utils/formulas';
import { formatINR } from '../../utils/format';

export default function PfCalculator({ setResultText }) {
  const [basicSalary, setBasicSalary] = useState(30000);
  const [empContrib, setEmpContrib] = useState(12);
  const [emrContrib, setEmrContrib] = useState(3.67);
  const [rate, setRate] = useState(8.25);
  const [growth, setGrowth] = useState(6);
  const [currentAge, setCurrentAge] = useState(35);
  const tenure = 60 - currentAge;

  const results = calculateEPF(basicSalary, empContrib, emrContrib, rate, growth, tenure);

  useEffect(() => {
    setResultText(
      `Basic Salary: ${formatINR(basicSalary)}\nCurrent Age: ${currentAge} years\nRetirement Age: 60 years\nYears to Retire: ${tenure} years\nEmployee Contrib: ${empContrib}%\nEmployer Contrib: ${emrContrib}%\nInterest Rate: ${rate}%\nSalary Growth: ${growth}%\nTotal Employee Contrib: ${formatINR(results.totalEmployeeContrib)}\nTotal Employer Contrib: ${formatINR(results.totalEmployerContrib)}\nInterest Accrued: ${formatINR(results.totalInterest)}\nMaturity Amount: ${formatINR(results.maturityAmount)}`
    );
  }, [basicSalary, empContrib, emrContrib, rate, growth, tenure, currentAge, results.maturityAmount]);

  const chartData = {
    labels: ['Employee Contribution', 'Employer Contribution', 'Interest Earned'],
    datasets: [
      {
        data: [results.totalEmployeeContrib, results.totalEmployerContrib, results.totalInterest],
        backgroundColor: ['#1e3a8a', '#3b82f6', '#10b981'],
        hoverBackgroundColor: ['#1d4ed8', '#60a5fa', '#059669'],
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
          {/* Basic Monthly Salary */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Monthly Basic Salary + DA</span>
              <span className="slider-value-display">{formatINR(basicSalary)}</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="5000"
                max="200000"
                step="2000"
                value={basicSalary}
                onChange={(e) => setBasicSalary(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>5,000</span>
              <span>2 Lakhs</span>
            </div>
            <div className="quick-options-row no-print">
              <button className="quick-option-btn" onClick={() => setBasicSalary(15000)}>15K</button>
              <button className="quick-option-btn" onClick={() => setBasicSalary(30000)}>30K</button>
              <button className="quick-option-btn" onClick={() => setBasicSalary(50000)}>50K</button>
              <button className="quick-option-btn" onClick={() => setBasicSalary(100000)}>1L</button>
            </div>
          </div>

          {/* Salary Growth */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Expected Annual Salary Hike</span>
              <span className="slider-value-display">{growth}%</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={growth}
                onChange={(e) => setGrowth(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>0% (No hike)</span>
              <span>20%</span>
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
                max="58"
                step="1"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>18 Years</span>
              <span>58 Years</span>
            </div>
            <p className="slider-note no-print" style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
              *Retirement is assumed at 60. Accumulated compounding period: <strong>{tenure} Years</strong>.
            </p>
          </div>

          {/* EPF Interest Rate */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">EPF Interest Rate (% p.a.)</span>
              <span className="slider-value-display">{rate}%</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="5"
                max="12"
                step="0.05"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>5%</span>
              <span>12%</span>
            </div>
          </div>

          {/* Advanced split options */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Employee EPF Share (%)</span>
              <span className="slider-value-display">{empContrib}%</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="8"
                max="15"
                step="1"
                value={empContrib}
                onChange={(e) => setEmpContrib(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>8%</span>
              <span>12% (Standard)</span>
              <span>15%</span>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="results-panel">
          <div className="output-summary-card">
            <div className="summary-card-title">Accumulated EPF Corpus</div>
            <div className="summary-card-value">{formatINR(results.maturityAmount)}</div>
            
            <div className="summary-card-grid">
              <div className="summary-card-item">
                <span className="summary-card-item-label">Employee Contrib</span>
                <span className="summary-card-item-value">{formatINR(results.totalEmployeeContrib)}</span>
              </div>
              <div className="summary-card-item">
                <span className="summary-card-item-label">Employer Contrib</span>
                <span className="summary-card-item-value">{formatINR(results.totalEmployerContrib)}</span>
              </div>
            </div>

            <div className="summary-card-grid" style={{ marginTop: '12px', borderTop: '1px dashed rgba(255,255,255,0.2)' }}>
              <div className="summary-card-item" style={{ gridColumn: 'span 2' }}>
                <span className="summary-card-item-label">Total Interest Gained</span>
                <span className="summary-card-item-value">{formatINR(results.totalInterest)}</span>
              </div>
            </div>
          </div>

          <div className="output-chart-card">
            <span className="chart-title">EPF Corpus Breakdown</span>
            <div className="chart-wrapper">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* SEO Rich Text Section */}
      <section className="seo-rich-content-section" id="faq-section">
        <h2>Online PF Calculator: Free PF Balance & Interest Calculator Online</h2>
        <p>
          Looking for a reliable <strong>online pf calculator</strong> or <strong>pf balance calculator</strong>? Our free <strong>pf online calculator</strong> helps you calculate your complete Employee Provident Fund (EPF) accumulation, monthly compounding returns, and final retirement wealth. Managed by the <strong>Employees' Provident Fund Organisation (EPFO)</strong>, EPF is a government-backed retirement scheme mandatory for salaried employees in India.
        </p>

        <h3>How This PF Interest Calculator Online Works</h3>
        <p>
          Our <strong>pf interest calculator online</strong> accurately splits and compounds your monthly contributions:
        </p>
        <ul style={{ paddingLeft: '20px', marginBottom: '16px', fontSize: '14px', color: 'var(--text-main)' }}>
          <li><strong>Employee Share (12%)</strong>: 12% of your Basic Salary + DA is deposited directly into your EPF account, earning the declared annual interest (currently 8.25% p.a.).</li>
          <li><strong>Employer Share (12%)</strong>: 3.67% goes to your EPF account and 8.33% goes to the Employee Pension Scheme (EPS), capped at ₹15,000 basic salary (max EPS ₹1,250/mo, with the excess credited to EPF).</li>
          <li><strong>Monthly Compounding</strong>: Interest is calculated on the closing monthly balance and officially credited at the end of each financial year.</li>
        </ul>

        <h3>Frequently Asked Questions (FAQs)</h3>
        <div className="faq-list">
          <div className="faq-item">
            <h4 className="faq-question">1. How does this online PF calculator determine my retirement balance?</h4>
            <p className="faq-answer">
              This online PF calculator adds the employee 12% contribution and employer 3.67% contribution to your previous balance every month, applies the EPFO annual interest rate (e.g. 8.25%), and factors in your annual salary increments until your chosen retirement age.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">2. Is interest calculated by this PF balance calculator tax-free?</h4>
            <p className="faq-answer">
              Yes, interest on EPF is completely tax-free under Section 10(11)/(12) as long as the employee's total annual contribution does not exceed <strong>₹2.5 Lakhs</strong> (or ₹5 Lakhs where there is no employer contribution). Any interest on contributions exceeding ₹2.5L is taxable as per your income slab.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">3. What is VPF (Voluntary Provident Fund) in an online PF calculator?</h4>
            <p className="faq-answer">
              Voluntary Provident Fund (VPF) allows you to voluntarily contribute up to 100% of your Basic Salary + DA beyond the mandatory 12%. It earns the exact same 8.25% interest rate and sovereign tax-free benefits as standard EPF.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
