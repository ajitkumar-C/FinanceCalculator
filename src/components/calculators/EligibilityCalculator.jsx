import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { calculateLoanEligibility } from '../../utils/formulas';
import { formatINR } from '../../utils/format';
import NumericInput from '../common/NumericInput';

export default function EligibilityCalculator({ setResultText }) {
  const [monthlyIncome, setMonthlyIncome] = useState(75000);
  const [existingEmi, setExistingEmi] = useState(10000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [foir, setFoir] = useState(50); // Default 50% FOIR cap

  const results = calculateLoanEligibility(monthlyIncome, existingEmi, rate, tenure, foir);
  const maxEmiBudget = Math.round(monthlyIncome * (foir / 100));

  useEffect(() => {
    setResultText(
      `Gross Salary: ${formatINR(monthlyIncome)}\nExisting EMIs: ${formatINR(existingEmi)}\nFOIR Cap: ${foir}%\nEligible EMI: ${formatINR(results.eligibleEmi)}\nEligible Loan: ${formatINR(results.eligibleLoan)}`
    );
  }, [monthlyIncome, existingEmi, rate, tenure, foir, results.eligibleLoan]);

  const chartData = {
    labels: ['Monthly Allocation'],
    datasets: [
      {
        label: 'Existing EMIs',
        data: [existingEmi],
        backgroundColor: '#ef4444',
      },
      {
        label: 'New Eligible EMI',
        data: [results.eligibleEmi],
        backgroundColor: '#10b981',
      },
      {
        label: 'Disposable / Uncommitted Income',
        data: [Math.max(0, monthlyIncome - (existingEmi + results.eligibleEmi))],
        backgroundColor: '#cbd5e1',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
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
          label: (context) => ` ${context.dataset.label}: ${formatINR(context.raw)}`,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          callback: (value) => formatINR(value),
          font: { family: 'Inter', size: 10 },
        },
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div className="calculator-container">
      <div className="calculator-wrapper-grid">
        {/* Input Panel */}
        <div className="calculator-panel">
          {/* Monthly Income */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Gross Monthly Income</span>
              <NumericInput
                value={monthlyIncome}
                onChange={setMonthlyIncome}
                min={5000}
                max={5000000}
                step={5000}
                prefix="₹"
                ariaLabel="Gross Monthly Income"
              />
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="10000"
                max="500000"
                step="5000"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>10,000</span>
              <span>5 Lakhs</span>
            </div>
            <div className="quick-options-row no-print">
              <button className="quick-option-btn" onClick={() => setMonthlyIncome(30000)}>30K</button>
              <button className="quick-option-btn" onClick={() => setMonthlyIncome(50000)}>50K</button>
              <button className="quick-option-btn" onClick={() => setMonthlyIncome(100000)}>1L</button>
              <button className="quick-option-btn" onClick={() => setMonthlyIncome(200000)}>2L</button>
            </div>
          </div>

          {/* Existing EMIs */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Existing Monthly EMIs / Obligations</span>
              <NumericInput
                value={existingEmi}
                onChange={setExistingEmi}
                min={0}
                max={2000000}
                step={1000}
                prefix="₹"
                ariaLabel="Existing Monthly EMIs"
              />
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="0"
                max="200000"
                step="2000"
                value={existingEmi}
                onChange={(e) => setExistingEmi(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>₹0</span>
              <span>2 Lakhs</span>
            </div>
            <div className="quick-options-row no-print">
              <button className="quick-option-btn" onClick={() => setExistingEmi(0)}>₹0</button>
              <button className="quick-option-btn" onClick={() => setExistingEmi(10000)}>10K</button>
              <button className="quick-option-btn" onClick={() => setExistingEmi(25000)}>25K</button>
              <button className="quick-option-btn" onClick={() => setExistingEmi(50000)}>50K</button>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Expected Loan Interest Rate</span>
              <NumericInput
                value={rate}
                onChange={setRate}
                min={1}
                max={30}
                step={0.1}
                suffix="%"
                ariaLabel="Expected Loan Interest Rate"
              />
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
          </div>

          {/* Tenure */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Tenure (Years)</span>
              <NumericInput
                value={tenure}
                onChange={setTenure}
                min={1}
                max={40}
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

          {/* FOIR */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">FOIR Limit (%)</span>
              <NumericInput
                value={foir}
                onChange={setFoir}
                min={10}
                max={90}
                step={1}
                suffix="%"
                ariaLabel="FOIR Limit Percentage"
              />
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="30"
                max="80"
                step="5"
                value={foir}
                onChange={(e) => setFoir(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>30% (Conservative)</span>
              <span>80% (Aggressive)</span>
            </div>
            <div className="quick-options-row no-print">
              <button className="quick-option-btn" onClick={() => setFoir(40)}>40%</button>
              <button className="quick-option-btn" onClick={() => setFoir(50)}>50% (Std)</button>
              <button className="quick-option-btn" onClick={() => setFoir(60)}>60%</button>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="results-panel">
          <div className="output-summary-card" style={{ background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)' }}>
            <div className="summary-card-title">Eligible Loan Amount</div>
            <div className="summary-card-value">{formatINR(results.eligibleLoan)}</div>
            
            <div className="summary-card-grid">
              <div className="summary-card-item">
                <span className="summary-card-item-label">Eligible Monthly EMI</span>
                <span className="summary-card-item-value">{formatINR(results.eligibleEmi)}</span>
              </div>
              <div className="summary-card-item">
                <span className="summary-card-item-label">FOIR Limit Cap</span>
                <span className="summary-card-item-value">{formatINR(maxEmiBudget)}</span>
              </div>
            </div>
          </div>

          <div className="output-chart-card">
            <span className="chart-title">Income & EMI Allocation Analysis</span>
            <div className="chart-wrapper" style={{ maxWidth: '100%', height: '220px' }}>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* SEO Rich Text Section */}
      <section className="seo-rich-content-section" id="faq-section">
        <h2>Loan Eligibility & FOIR Calculator India</h2>
        <p>
          Need an accurate <strong>foir calculator</strong> to calculate your maximum home loan or personal loan borrowing power? Our free online Loan Eligibility and FOIR calculator computes your maximum eligible loan amount, monthly EMI capacity, and safe borrowing limits based on standard Indian banking guidelines.
        </p>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px', marginBottom: '20px' }}>
          *Note: To check official home loan interest rates, schemes, and eligibility parameters, visit the official <a href="https://homeloans.sbi/" target="_blank" rel="noopener noreferrer">SBI Home Loans portal</a> or check direct products on the <a href="https://www.hdfcbank.com" target="_blank" rel="noopener noreferrer">HDFC Loans portal</a>.
        </p>

        <h3>FOIR Calculator: Understanding Fixed Obligation to Income Ratio</h3>
        <p>
          A <strong>FOIR calculator</strong> computes the primary metric financial institutions (like SBI, HDFC, and ICICI Bank) use to gauge your credit borrowing capacity. FOIR represents the percentage of your gross monthly in-hand salary that is already committed to existing fixed obligations (such as existing personal loans, credit card EMIs, and auto loans).
        </p>
        <p>
          Typically, top Indian lenders restrict FOIR to <strong>40% to 50%</strong> for conservative risk profiles, and up to <strong>60%</strong> for high-income earners. For instance, if your net monthly salary is ₹1,00,000 with a 50% FOIR cap, your total allowable EMI across all loans is ₹50,000. If you already service ₹10,000 in existing car loan EMI, you have an eligible EMI capacity of ₹40,000 for a new loan.
        </p>

        <h3>Frequently Asked Questions (FAQs)</h3>
        <div className="faq-list">
          <div className="faq-item">
            <h4 className="faq-question">1. What is a FOIR calculator and how does it determine loan approval?</h4>
            <p className="faq-answer">
              A FOIR (Fixed Obligation to Income Ratio) calculator calculates what portion of your income is safe to allocate towards new EMIs without defaulting. Lenders reject loan applications if your FOIR exceeds 50%–60%, as it indicates financial overleveraging.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">2. How can I increase my loan eligibility on a FOIR calculator?</h4>
            <p className="faq-answer">
              You can increase loan eligibility by adding an earning co-applicant (spouse or parent) to combine household incomes, selecting a longer tenure (e.g. 20–30 years) to reduce the monthly EMI, pre-closing existing short-term personal loans, or maintaining a high CIBIL score (750+).
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">3. Does a low credit score impact my eligibility?</h4>
            <p className="faq-answer">
              Yes. Even if your income is high on the FOIR calculator, a CIBIL score below 650 will lead to loan rejection or higher risk-adjusted interest rates. A score of 750+ qualifies you for the lowest floating interest rates and faster sanction.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
