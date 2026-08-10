import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { calculateRetirement } from '../../utils/formulas';
import { formatINR } from '../../utils/format';

export default function RetirementCalculator({ setResultText }) {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [expectancy, setExpectancy] = useState(80);
  const [currentExpenses, setCurrentExpenses] = useState(30000); // 30K monthly expenses
  const [inflation, setInflation] = useState(6); // 6% Indian inflation average
  const [returnPre, setReturnPre] = useState(12); // pre-retirement equity returns
  const [returnPost, setReturnPost] = useState(7); // post-retirement conservative returns

  // Ensure logical consistency in inputs
  const effectiveExpectancy = Math.max(expectancy, retirementAge + 5);
  const effectiveRetirementAge = Math.max(retirementAge, currentAge + 1);

  const results = calculateRetirement(
    currentAge, 
    effectiveRetirementAge, 
    currentExpenses, 
    effectiveExpectancy, 
    inflation, 
    returnPre, 
    returnPost
  );

  useEffect(() => {
    setResultText(
      `Current Age: ${currentAge}\nRetirement Age: ${effectiveRetirementAge}\nLife Expectancy: ${effectiveExpectancy}\nCurrent Expenses: ${formatINR(currentExpenses)}/mo\nInflation: ${inflation}%\nPre-Retirement ROI: ${returnPre}%\nPost-Retirement ROI: ${returnPost}%\nTarget Corpus: ${formatINR(results.targetCorpus)}\nMonthly Savings Needed: ${formatINR(results.monthlySavingsRequired)}\nFuture Monthly Expense: ${formatINR(results.futureMonthlyExpenses)}/mo`
    );
  }, [currentAge, effectiveRetirementAge, effectiveExpectancy, currentExpenses, inflation, returnPre, returnPost, results.targetCorpus]);

  const chartData = {
    labels: ['Current Monthly Expense', 'Future Monthly Expense (Inflation Adjusted)', 'Required Monthly Savings Today'],
    datasets: [
      {
        label: 'Monthly Amount (₹)',
        data: [currentExpenses, results.futureMonthlyExpenses, results.monthlySavingsRequired],
        backgroundColor: ['#3b82f6', '#ef4444', '#10b981'],
        borderRadius: 6,
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
          font: { family: 'Inter', size: 9 },
        },
      },
    },
  };

  return (
    <div className="calculator-container">
      <div className="calculator-wrapper-grid">
        {/* Input Panel */}
        <div className="calculator-panel">
          {/* Ages */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="slider-group">
              <div className="slider-header">
                <span className="slider-label">Current Age</span>
                <span className="slider-value-display">{currentAge} Yr</span>
              </div>
              <div className="slider-control-row">
                <input
                  type="range"
                  min="18"
                  max="55"
                  step="1"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Number(e.target.value))}
                  className="slider-input"
                />
              </div>
            </div>

            <div className="slider-group">
              <div className="slider-header">
                <span className="slider-label">Retirement Age</span>
                <span className="slider-value-display">{retirementAge} Yr</span>
              </div>
              <div className="slider-control-row">
                <input
                  type="range"
                  min="40"
                  max="65"
                  step="1"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(Number(e.target.value))}
                  className="slider-input"
                />
              </div>
            </div>
          </div>

          {/* Life Expectancy */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Life Expectancy</span>
              <span className="slider-value-display">{expectancy} Yr</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="70"
                max="100"
                step="1"
                value={expectancy}
                onChange={(e) => setExpectancy(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>70 Years</span>
              <span>100 Years</span>
            </div>
          </div>

          {/* Current Expenses */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Current Monthly Expenses</span>
              <span className="slider-value-display">{formatINR(currentExpenses)}</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="5000"
                max="300000"
                step="5000"
                value={currentExpenses}
                onChange={(e) => setCurrentExpenses(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>₹5,000</span>
              <span>3 Lakhs</span>
            </div>
            <div className="quick-options-row no-print">
              <button className="quick-option-btn" onClick={() => setCurrentExpenses(20000)}>20K</button>
              <button className="quick-option-btn" onClick={() => setCurrentExpenses(40000)}>40K</button>
              <button className="quick-option-btn" onClick={() => setCurrentExpenses(60000)}>60K</button>
              <button className="quick-option-btn" onClick={() => setCurrentExpenses(100000)}>1L</button>
            </div>
          </div>

          {/* Inflation */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Expected Annual Inflation</span>
              <span className="slider-value-display">{inflation}%</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="2"
                max="12"
                step="0.5"
                value={inflation}
                onChange={(e) => setInflation(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>2%</span>
              <span>6% (India Avg)</span>
              <span>12%</span>
            </div>
          </div>

          {/* Return pre-retirement */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Pre-Retirement Investment Return</span>
              <span className="slider-value-display">{returnPre}%</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="5"
                max="20"
                step="0.5"
                value={returnPre}
                onChange={(e) => setReturnPre(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>5%</span>
              <span>20%</span>
            </div>
          </div>

          {/* Return post-retirement */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Post-Retirement Investment Return</span>
              <span className="slider-value-display">{returnPost}%</span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="4"
                max="12"
                step="0.5"
                value={returnPost}
                onChange={(e) => setReturnPost(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>4% (Conservative)</span>
              <span>12%</span>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="results-panel">
          <div className="output-summary-card" style={{ background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)' }}>
            <div className="summary-card-title">Required Retirement Corpus</div>
            <div className="summary-card-value">{formatINR(results.targetCorpus)}</div>
            
            <div className="summary-card-grid">
              <div className="summary-card-item">
                <span className="summary-card-item-label">Monthly Savings Required</span>
                <span className="summary-card-item-value">{formatINR(results.monthlySavingsRequired)}</span>
              </div>
              <div className="summary-card-item">
                <span className="summary-card-item-label">Inflation-Adjusted Monthly Cost</span>
                <span className="summary-card-item-value">{formatINR(results.futureMonthlyExpenses)}</span>
              </div>
            </div>
          </div>

          <div className="output-chart-card">
            <span className="chart-title">Expense & Savings Analysis</span>
            <div className="chart-wrapper" style={{ maxWidth: '100%', height: '220px' }}>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* SEO Rich Text Section */}
      <section className="seo-rich-content-section" id="faq-section">
        <h2>About Retirement Calculator</h2>
        <p>
          Retirement planning is the process of setting financial goals for your retirement years and determining the corpus required to sustain those goals. A Retirement Calculator assists you in calculating your future monthly expenses adjusted for inflation, determining the total retirement corpus you need, and finding the amount you need to save monthly starting today.
        </p>

        <h3>Why Inflation is Critical for Retirement Planning</h3>
        <p>
          Inflation eats away purchasing power over time. In India, a monthly household expense of **₹30,000** today will cost **₹1,72,000** in 30 years at a modest **6% annual inflation**. Failing to account for inflation is the single biggest mistake in retirement planning, as it leads to running out of money prematurely.
        </p>

        <h3>Frequently Asked Questions (FAQs)</h3>
        <div className="faq-list">
          <div className="faq-item">
            <h4 className="faq-question">1. What is the Safe Withdrawal Rate (SWR)?</h4>
            <p className="faq-answer">
              The Safe Withdrawal Rate is the percentage of your retirement corpus you can withdraw annually without running out of money. Standard worldwide guidelines suggest a SWR of **4%**. However, due to higher inflation rates in India, financial planners recommend a conservative SWR of **3% to 3.5%**.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">2. How should I allocate my investments pre and post retirement?</h4>
            <p className="faq-answer">
              Pre-retirement (growth phase), you can afford a higher equity allocation (e.g. 60-70% in mutual funds/stocks) to beat inflation and grow corpus. Post-retirement (preservation phase), you should shift to debt assets like Senior Citizen Savings Scheme (SCSS), RBI bonds, or high-rated debt mutual funds, keeping equity limited to 15-25% to generate capital appreciation.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">3. What is the real rate of return?</h4>
            <p className="faq-answer">
              The real rate of return is your nominal investment return minus the inflation rate. If your portfolio generates a 12% return and inflation is 6%, your real return is approximately 6%. When planning for retirement, your focus must always be on achieving a positive real rate of return.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
