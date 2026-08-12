import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Search, Clock, ArrowRight, BookOpen } from 'lucide-react';

export default function Blogs({ setActiveCalculator }) {
  const [selectedArticleId, setSelectedArticleId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('article') || null;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const articles = [
    {
      id: 'tax-guide',
      title: 'Old vs New Tax Regime: FY 2026-27 Tax Saving Strategy Guide',
      category: 'tax',
      readTime: '8 min read',
      date: 'Aug 10, 2026',
      snippet: 'Unpack the latest Union Budget tax slabs, standard deductions, Section 87A rebates, and learn exactly which regime saves you more money.',
      targetCalc: 'tax',
      ctaText: 'Compare Your Tax Regimes Now',
      content: (
        <div>
          <p>
            Choosing between the <strong>Old Tax Regime</strong> and the <strong>New Tax Regime</strong> is one of the most critical financial decisions for Indian taxpayers. With the recent amendments introduced in the Union Budget, the New Tax Regime has been made substantially more attractive through revised slabs, an increased standard deduction, and enhanced rebate limits.
          </p>
          <p>
            However, the Old Tax Regime remains highly beneficial for individuals with substantial tax deductions under Section 80C, 80D, and Section 24(b) for home loan interest. This guide breaks down the math, slabs, and break-even points to help you select the optimal tax regime.
          </p>

          <h2>Understanding the Tax Slabs (FY 2026-27 / AY 2027-28)</h2>
          <p>
            The New Tax Regime operates with simplified tax brackets and lower tax rates, but it forces you to forego almost all exemptions. The table below outlines the current tax rates under both regimes:
          </p>

          <table>
            <thead>
              <tr>
                <th>Income Slab (New Regime)</th>
                <th>New Tax Rate</th>
                <th>Income Slab (Old Regime)</th>
                <th>Old Tax Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Up to ₹3,00,000</td>
                <td>Nil</td>
                <td>Up to ₹2,50,000</td>
                <td>Nil</td>
              </tr>
              <tr>
                <td>₹3,00,001 - ₹7,00,000</td>
                <td>5%</td>
                <td>₹2,50,001 - ₹5,00,000</td>
                <td>5%</td>
              </tr>
              <tr>
                <td>₹7,00,001 - ₹10,00,000</td>
                <td>10%</td>
                <td>₹5,00,001 - ₹10,00,000</td>
                <td>20%</td>
              </tr>
              <tr>
                <td>₹10,00,001 - ₹12,00,000</td>
                <td>15%</td>
                <td>Above ₹10,00,000</td>
                <td>30%</td>
              </tr>
              <tr>
                <td>₹12,00,001 - ₹15,00,000</td>
                <td>20%</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Above ₹15,00,000</td>
                <td>30%</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>

          <blockquote>
            <p><strong>Note on Surcharges:</strong> In addition to the rates above, a 4% Health and Education Cess is levied on the total tax liability. Surcharges apply to high-income individuals with taxable income exceeding ₹50 Lakhs.</p>
          </blockquote>

          <h2>Key Allowable Deductions: Old vs New</h2>
          <p>
            The fundamental difference between the two systems is your ability to claim deductions:
          </p>
          <ul>
            <li>
              <strong>New Tax Regime:</strong> You get a <strong>Standard Deduction of ₹75,000</strong> (for salaried employees) and employer contributions to NPS under Section 80CCD(2). All other deductions like 80C (PPF, ELSS, Life Insurance), 80D (Health Insurance), and HRA are completely blocked.
            </li>
            <li>
              <strong>Old Tax Regime:</strong> You can claim a <strong>Standard Deduction of ₹50,000</strong> plus HRA exemption, Section 80C (up to ₹1.5 Lakhs), Section 80D (up to ₹25,000 for self, ₹50,000 for senior parents), and Section 24(b) Home Loan Interest (up to ₹2 Lakhs).
            </li>
          </ul>

          <h2>The Break-Even Analysis: Which Regime Wins?</h2>
          <p>
            To decide which regime is better, you need to calculate your <strong>Break-Even Point</strong>. This is the minimum amount of deductions you must claim under the Old Regime to make your tax liability equal to the New Regime.
          </p>
          <p>
            For example, if your annual gross income is <strong>₹12 Lakhs</strong>:
          </p>
          <ol>
            <li>Under the New Regime, your taxable income is ₹11.25 Lakhs (after ₹75,000 standard deduction). Your total tax is ₹82,500 + cess.</li>
            <li>To pay the same tax under the Old Regime, you would need at least <strong>₹3.25 Lakhs</strong> in total deductions (e.g., ₹1.5L u/s 80C, ₹50k u/s 80D, and ₹1.25L HRA).</li>
            <li>If your deductions are higher than ₹3.25 Lakhs, the Old Regime saves you money. If they are lower, the New Regime is the clear winner.</li>
          </ol>

          <h3>Section 87A Tax Rebate Rules</h3>
          <p>
            Under the New Tax Regime, if your taxable income does not exceed <strong>₹7,00,000</strong>, you receive a full tax rebate under Section 87A, making your tax liability <strong>zero</strong>. Under the Old Regime, this rebate is capped at taxable incomes up to <strong>₹5,00,000</strong>.
          </p>
        </div>
      )
    },
    {
      id: 'sip-guide',
      title: 'SIP Mutual Funds Compounding Guide: How to Accumulate ₹1 Crore',
      category: 'investment',
      readTime: '7 min read',
      date: 'Aug 08, 2026',
      snippet: 'Learn how compounding works in Systematic Investment Plans (SIPs), the impact of CAGR, and how stepping up your SIP annually speeds up your path to ₹1 Crore.',
      targetCalc: 'sip',
      ctaText: 'Calculate Your SIP Compounding',
      content: (
        <div>
          <p>
            A <strong>Systematic Investment Plan (SIP)</strong> is one of the most effective wealth-creation tools for retail investors in India. Instead of timing the stock market, a SIP allows you to invest a fixed amount regularly (monthly or quarterly) in equity mutual funds, benefiting from rupee-cost averaging and the power of compounding.
          </p>
          <p>
            This guide details the math behind SIP compounding and demonstrates how minor increases in your monthly investments can cut your time to reach ₹1 Crore in half.
          </p>

          <h2>The Power of Compounding Explained</h2>
          <p>
            Compounding is the process where your investment earns returns, and those returns are reinvested to earn even more returns over time. In a SIP, compounding acts like a snowball: slow at first, but exponentially large in the later years.
          </p>
          <p>
            The mathematical formula for future value of a SIP is:
          </p>
          {"\\[M = P \\times \\frac{(1 + i)^n - 1}{i} \\times (1 + i)\\]"}
          <p>
            Where:
            <ul>
              <li><strong>M:</strong> Maturity Amount</li>
              <li><strong>P:</strong> Monthly SIP amount</li>
              <li><strong>i:</strong> Monthly interest rate (Annual Return % / 12 / 100)</li>
              <li><strong>n:</strong> Total number of months (Years &times; 12)</li>
            </ul>
          </p>

          <h2>How Long to Reach ₹1 Crore? (At 12% CAGR)</h2>
          <p>
            Let's assume an average equity mutual fund return (CAGR) of <strong>12% per annum</strong>. The table below displays how your monthly investment amount dictates the time required to cross the ₹1 Crore mark:
          </p>

          <table>
            <thead>
              <tr>
                <th>Monthly SIP Amount</th>
                <th>Total Principal Invested</th>
                <th>Estimated Interest Earned</th>
                <th>Time Required</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>₹5,000</td>
                <td>₹15.6 Lakhs</td>
                <td>₹84.4 Lakhs</td>
                <td><strong>26 Years</strong></td>
              </tr>
              <tr>
                <td>₹10,000</td>
                <td>₹24.0 Lakhs</td>
                <td>₹76.0 Lakhs</td>
                <td><strong>20 Years</strong></td>
              </tr>
              <tr>
                <td>₹20,000</td>
                <td>₹36.0 Lakhs</td>
                <td>₹64.0 Lakhs</td>
                <td><strong>15 Years</strong></td>
              </tr>
              <tr>
                <td>₹50,000</td>
                <td>₹60.0 Lakhs</td>
                <td>₹40.0 Lakhs</td>
                <td><strong>10 Years</strong></td>
              </tr>
            </tbody>
          </table>

          <h2>The Magic of "Step-Up SIP"</h2>
          <p>
            As your salary grows, your investments should grow too. A <strong>Step-Up SIP</strong> means increasing your SIP contribution by a fixed percentage (e.g., 10%) every year.
          </p>
          <p>
            If you start a SIP of <strong>₹10,000 per month</strong>:
            <ul>
              <li><strong>Standard SIP (No Step-up):</strong> It takes <strong>20 years</strong> to reach ₹1 Crore.</li>
              <li><strong>10% Annual Step-up SIP:</strong> You reach ₹1 Crore in just <strong>15 years</strong>! By stepping up, you save 5 full years of waiting and build a far larger final corpus.</li>
            </ul>
          </p>
        </div>
      )
    },
    {
      id: 'retirement-guide',
      title: 'Retirement Planning India: Balancing EPF, NPS, and PPF',
      category: 'retirement',
      readTime: '7 min read',
      date: 'Aug 05, 2026',
      snippet: 'Discover the ultimate retirement combination for Indian employees. Compare tax treatments, interest rates, lock-in periods, and annuity options.',
      targetCalc: 'retirement',
      ctaText: 'Plan Your Retirement Goal',
      content: (
        <div>
          <p>
            Planning for retirement in India requires a balanced approach. Unlike western countries, India lacks a universal state-funded social security pension. Therefore, building a self-sustaining corpus during your working years is essential.
          </p>
          <p>
            The three pillars of government-backed retirement planning are the <strong>Employee Provident Fund (EPF)</strong>, the <strong>National Pension Scheme (NPS)</strong>, and the <strong>Public Provident Fund (PPF)</strong>.
          </p>

          <h2>EPF vs NPS vs PPF: Comparison at a Glance</h2>
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>EPF (Provident Fund)</th>
                <th>NPS (Pension Scheme)</th>
                <th>PPF (Provident Fund)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Target Audience</strong></td>
                <td>Salaried Employees</td>
                <td>All Citizens (Voluntary)</td>
                <td>All Citizens (Voluntary)</td>
              </tr>
              <tr>
                <td><strong>Current Returns</strong></td>
                <td>8.25% (Fixed by Govt)</td>
                <td>9% - 12% (Market Linked)</td>
                <td>7.1% (Fixed by Govt)</td>
              </tr>
              <tr>
                <td><strong>Tax Treatment</strong></td>
                <td>EEE (Exempt-Exempt-Exempt)</td>
                <td>EET (Tax on 40% Annuity)</td>
                <td>EEE (Exempt-Exempt-Exempt)</td>
              </tr>
              <tr>
                <td><strong>Lock-in Period</strong></td>
                <td>Until Retirement (or unemployment)</td>
                <td>Until Age 60</td>
                <td>15 Years</td>
              </tr>
              <tr>
                <td><strong>Max Contribution</strong></td>
                <td>No limit (Tax-free up to 2.5L/yr)</td>
                <td>No Limit</td>
                <td>₹1.5 Lakhs per fiscal year</td>
              </tr>
            </tbody>
          </table>

          <h2>The Ideal Retirement Asset Allocation</h2>
          <p>
            To maximize wealth and minimize tax liabilities at retirement, personal finance experts suggest a 3-way allocation strategy:
          </p>
          <ol>
            <li>
              <strong>Pillar 1 (Debt - EPF):</strong> Treat EPF as your debt-allocation foundation. It offers high, guaranteed tax-free interest (8.25% u/s 80C) and accumulates automatically through payroll.
            </li>
            <li>
              <strong>Pillar 2 (Equity - NPS):</strong> NPS allows you to invest up to 75% in equity (Active choice). This market exposure helps beat long-term inflation. Plus, you get an extra tax deduction of ₹50,000 under Section 80CCD(1B) over and above the ₹1.5 Lakhs limit.
            </li>
            <li>
              <strong>Pillar 3 (Safety Net - PPF):</strong> Use PPF to build a tax-free safety pool. It has a 15-year lock-in (extendable in blocks of 5 years), making it ideal for target goals like children's higher education.
            </li>
          </ol>

          <h3>Maturity Rules: Can You Withdraw Everything?</h3>
          <ul>
            <li><strong>EPF & PPF:</strong> 100% of the maturity amount is tax-free and withdrawable as a lump sum.</li>
            <li><strong>NPS:</strong> At age 60, you can withdraw a maximum of <strong>60% tax-free</strong>. The remaining <strong>40% must be used to purchase an Annuity</strong> (pension plan) to provide a monthly pension, which is taxable as salary income.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'loan-prepayment-guide',
      title: 'Reduce Home Loan Interest: Prepayments vs Long Tenure',
      category: 'loans',
      readTime: '6 min read',
      date: 'Aug 02, 2026',
      snippet: 'Home loans are expensive due to long tenures. Learn how making small, regular prepayments can save you lakhs of rupees in interest and reduce tenure.',
      targetCalc: 'emi',
      ctaText: 'Calculate Your Loan EMIs',
      content: (
        <div>
          <p>
            Home loans are long-term commitments, typically stretching from 15 to 30 years. Because the tenure is long, the total interest paid to the bank often exceeds the principal amount borrowed.
          </p>
          <p>
            This guide demonstrates how home loan EMIs work on a reducing-balance basis and highlights how making prepayments can save you lakhs of rupees.
          </p>

          <h2>The Cost of a 20-Year Home Loan</h2>
          <p>
            When you borrow <strong>₹50 Lakhs</strong> at an interest rate of <strong>8.5% p.a.</strong> for <strong>20 Years</strong>:
            <ul>
              <li>Your Monthly EMI is: <strong>₹43,391</strong></li>
              <li>Total Principal repaid: <strong>₹50,00,000</strong></li>
              <li>Total Interest paid to bank: <strong>₹54,13,879</strong></li>
              <li><strong>Total Repayment: ₹1.04 Crores</strong> (You pay the bank double what you borrowed!)</li>
            </ul>
          </p>

          <h2>How Home Loan Prepayments Save Money</h2>
          <p>
            A prepayment is any extra amount paid to the bank above your monthly EMI. This extra payment goes <strong>directly towards reducing your principal amount</strong>, which immediately shrinks the interest accumulated in subsequent months.
          </p>
          <p>
            Here are three effective prepayment strategies:
          </p>
          <ol>
            <li>
              <strong>The 1 Extra EMI Strategy:</strong> Make one additional EMI payment every year. For a 20-year loan, this single action reduces your loan tenure to approximately <strong>17 years</strong>, saving you over ₹7 Lakhs in interest.
            </li>
            <li>
              <strong>The 10% Annual Increase:</strong> Increase your monthly EMI by 10% every year as your salary increases. This will clear a 20-year loan in just <strong>10 years</strong>, saving over ₹25 Lakhs in interest!
            </li>
            <li>
              <strong>Lump-Sum Prepayment:</strong> Whenever you receive an annual bonus or maturity from other investments, pay it as a lump sum towards the home loan. Choosing to **reduce tenure** (instead of reducing EMI) yields the highest interest savings.
            </li>
          </ol>
        </div>
      )
    },
    // OUTLINE GUIDES (5-18)
    {
      id: 'nps-vs-ppf',
      title: 'NPS vs PPF vs EPF: Which is Better for Long-Term Tax Savings?',
      category: 'retirement',
      readTime: '7 min read',
      date: 'Jul 30, 2026',
      snippet: 'Stuck between NPS, PPF, and EPF? Compare their tax benefits under Section 80C, equity compounding exposure, lock-in periods, and retirement pension payouts.',
      targetCalc: 'nps',
      ctaText: 'Calculate NPS Returns',
      content: (
        <div>
          <p>
            When it comes to building a retirement nest egg in India, three government-backed schemes stand out: the <strong>National Pension Scheme (NPS)</strong>, the <strong>Public Provident Fund (PPF)</strong>, and the <strong>Employee Provident Fund (EPF)</strong>. 
          </p>
          <p>
            Each scheme offers attractive tax benefits, but they serve completely different asset allocations. Choosing the right one—or finding the perfect balance among all three—can significantly boost your long-term wealth compounding.
          </p>

          <h2>NPS vs PPF vs EPF: Comparison Table</h2>
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>PPF (Public Provident Fund)</th>
                <th>NPS (National Pension Scheme)</th>
                <th>EPF (Employee Provident Fund)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Interest Rate / Yield</strong></td>
                <td>7.1% (Fixed, reviewed quarterly)</td>
                <td>9% - 12% (Market-linked returns)</td>
                <td>8.25% (Fixed by Govt annually)</td>
              </tr>
              <tr>
                <td><strong>Asset Class</strong></td>
                <td>Fixed Income / Debt</td>
                <td>Equity, Corporate Debt, Govt Bonds</td>
                <td>Fixed Income / Debt</td>
              </tr>
              <tr>
                <td><strong>Tax Status</strong></td>
                <td>EEE (Exempt-Exempt-Exempt)</td>
                <td>EET (Exempt-Exempt-Taxable on Annuity)</td>
                <td>EEE (Up to ₹2.5 Lakhs contribution/yr)</td>
              </tr>
              <tr>
                <td><strong>Lock-in Period</strong></td>
                <td>15 Years (Extendable in blocks of 5)</td>
                <td>Locked in until age 60</td>
                <td>Until retirement or job switch</td>
              </tr>
              <tr>
                <td><strong>Additional Deductions</strong></td>
                <td>Max ₹1.5 Lakhs u/s 80C</td>
                <td>Extra ₹50,000 u/s 80CCD(1B)</td>
                <td>Part of ₹1.5 Lakhs u/s 80C</td>
              </tr>
            </tbody>
          </table>

          <h2>Asset Allocation: Debt vs Equity Compounding</h2>
          <p>
            The biggest difference lies in how your money is invested:
          </p>
          <ul>
            <li>
              <strong>PPF & EPF (Fixed Income Debt):</strong> These are safe, fixed-interest instruments backed by the sovereign government. There is zero risk of principal loss. If you are a conservative investor, these provide a reliable foundation.
            </li>
            <li>
              <strong>NPS (Market-Linked Equity):</strong> NPS allows you to invest up to 75% of your corpus in equities (Active Choice). Over a 20-30 year career, equity exposure helps beat inflation. Historical returns for NPS equity funds (Scheme E) have ranged between 10% and 13% CAGR.
            </li>
          </ul>

          <h2>The Triple-Tax Benefit (EEE vs EET)</h2>
          <p>
            Both PPF and EPF enjoy **EEE (Exempt-Exempt-Exempt)** status. This means your contributions, interest accrued, and final maturity lump-sums are completely tax-free.
          </p>
          <p>
            NPS operates on an **EET (Exempt-Exempt-Taxable)** basis. At age 60, you can withdraw up to 60% of your accumulated corpus tax-free. The remaining 40% must be used to purchase an **Annuity plan** (monthly pension), which is taxed under your salary tax slab in the year of payout.
          </p>
        </div>
      )
    },
    {
      id: 'foir-guide',
      title: 'Understanding FOIR: How Banks Calculate Your Eligible Loan Slabs',
      category: 'loans',
      readTime: '6 min read',
      date: 'Jul 28, 2026',
      snippet: 'Before applying for a loan, banks calculate your Fixed Obligation to Income Ratio (FOIR). Learn how to check your eligible borrowing capacity based on salary.',
      targetCalc: 'eligibility',
      ctaText: 'Calculate Loan Eligibility',
      content: (
        <div>
          <p>
            When applying for a home loan, car loan, or personal loan, banks don't just look at your credit score. They assess your repayment capacity using a metric called <strong>FOIR (Fixed Obligation to Income Ratio)</strong>.
          </p>
          <p>
            FOIR is the primary mathematical indicator banks use to decide your eligible loan amount. If your existing EMIs consume too much of your salary, your FOIR will be high, and banks will reject your application—even with a credit score of 800+.
          </p>

          <h2>What is the FOIR Formula?</h2>
          <p>
            FOIR measures your fixed monthly obligations (existing loan EMIs, rent, and the proposed new loan EMI) as a percentage of your net monthly take-home salary. It ignores basic household expenses like food, fuel, and utility bills.
          </p>
          {"\\[\\text{FOIR (\\%)} = \\frac{\\text{Total Existing EMIs} + \\text{Proposed New EMI} + \\text{Fixed Rental Payments}}{\\text{Net Monthly Take-home Salary}} \\times 100\\]"}

          <h2>Acceptable FOIR Slabs across Indian Banks</h2>
          <p>
            Most leading financial institutions (like SBI, HDFC, and ICICI Bank) cap the acceptable FOIR between <strong>40% and 55%</strong>.
          </p>
          <ul>
            <li><strong>Salaried Income under ₹50,000:</strong> Acceptable FOIR is capped at <strong>40% - 45%</strong>.</li>
            <li><strong>Salaried Income between ₹50,000 - ₹1.5 Lakhs:</strong> Acceptable FOIR is capped at <strong>50%</strong>.</li>
            <li><strong>High Net Worth Individuals (Above ₹1.5 Lakhs):</strong> FOIR can go up to <strong>55% - 60%</strong>.</li>
          </ul>

          <h2>A Real-World Example</h2>
          <p>
            Suppose your net monthly take-home salary is <strong>₹1,00,000</strong>.
          </p>
          <ol>
            <li>If the bank's maximum allowable FOIR is <strong>50%</strong>, your total monthly EMI capacity is capped at <strong>₹50,000</strong>.</li>
            <li>If you are already paying a car loan EMI of <strong>₹15,000</strong>, your remaining EMI budget for a new home loan is <strong>₹35,000</strong> (₹50,000 - ₹15,000).</li>
            <li>If the proposed EMI for the home loan you requested is ₹40,000, your FOIR would rise to 55% (₹55,000/₹1,00,000). The bank will reduce your loan eligibility to bring the EMI down to ₹35,000.</li>
          </ol>
        </div>
      )
    },
    {
      id: 'ppf-wealth-guide',
      title: 'PPF Interest Rate & Benefits: Secure ₹40 Lakhs Tax-Free',
      category: 'investment',
      readTime: '5 min read',
      date: 'Jul 25, 2026',
      snippet: 'Explore how the Public Provident Fund (PPF) compounding works, how to earn maximum interest by depositing before the 5th of every month, and maturity extensions.',
      targetCalc: 'ppf',
      ctaText: 'Calculate PPF Growth',
      content: (
        <div>
          <p>The Public Provident Fund (PPF) remains a favorite savings option for Indian households due to its sovereign guarantee and EEE (Exempt-Exempt-Exempt) tax status.</p>
          <h2>The 5th of the Month Rule</h2>
          <p>PPF interest is calculated on the minimum balance in your account between the 5th and the end of the month. To maximize your interest earnings, always deposit your monthly contributions on or before the <strong>5th of the month</strong>.</p>
          <h3>Extending Beyond 15 Years</h3>
          <p>You can extend your PPF account after the 15-year maturity in blocks of 5 years indefinitely. During these extensions, you can choose to continue making contributions or let the existing balance compound tax-free without fresh deposits.</p>
        </div>
      )
    },
    {
      id: 'fd-compounding-guide',
      title: 'FD Interest Compounding: HDFC Bank Rates vs Post Office Yields',
      category: 'investment',
      readTime: '6 min read',
      date: 'Jul 22, 2026',
      snippet: 'Fixed Deposits (FDs) are the go-to safe choice in India. Learn how HDFC FD rates compare to SBI and Post Office yields, and how quarterly compounding works.',
      targetCalc: 'fd',
      ctaText: 'Calculate FD Returns',
      content: (
        <div>
          <p>
            Fixed Deposits (FDs) are the cornerstone of capital preservation for Indian households. While they offer guaranteed returns, the yield you receive depends on the interest rate, the tenure, and the interest compounding frequency.
          </p>
          <p>
            Most commercial banks in India (such as HDFC Bank, ICICI Bank, and SBI) calculate interest using **quarterly compounding**. However, depositors often choose non-cumulative FDs with monthly or quarterly payouts, which reduces their overall compound yield.
          </p>

          <h2>HDFC Bank FD Rates vs Post Office FD Yields</h2>
          <p>
            Different financial institutions offer varying interest rates. The table below illustrates typical interest slabs and maturity payouts for a lump-sum deposit of <strong>₹5,00,000</strong> for a <strong>5-Year Tenure</strong> (assuming typical senior parent vs general public rates):
          </p>

          <table>
            <thead>
              <tr>
                <th>Bank/Institution</th>
                <th>Interest Rate (p.a.)</th>
                <th>Compounding Frequency</th>
                <th>Maturity Value</th>
                <th>Total Interest Earned</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>HDFC Bank (General)</strong></td>
                <td>7.00%</td>
                <td>Quarterly</td>
                <td>₹7,07,389</td>
                <td>₹2,07,389</td>
              </tr>
              <tr>
                <td><strong>HDFC Bank (Senior Citizen)</strong></td>
                <td>7.50%</td>
                <td>Quarterly</td>
                <td>₹7,24,974</td>
                <td>₹2,24,974</td>
              </tr>
              <tr>
                <td><strong>SBI Bank (General)</strong></td>
                <td>6.80%</td>
                <td>Quarterly</td>
                <td>₹7,00,490</td>
                <td>₹2,00,490</td>
              </tr>
              <tr>
                <td><strong>Post Office (5-Year Time Deposit)</strong></td>
                <td>7.50%</td>
                <td>Yearly Compounding</td>
                <td>₹7,17,814</td>
                <td>₹2,17,814</td>
              </tr>
            </tbody>
          </table>

          <blockquote>
            <p><strong>Critical Math Catch:</strong> Note that Post Office 5-Year FDs offer a 7.50% rate, but compound **annually**. An HDFC Senior Citizen FD at 7.50% compounds **quarterly**. Because of quarterly compounding, HDFC yields ₹7,24,974 while the Post Office yields ₹7,17,814. More frequent compounding builds higher wealth!</p>
          </blockquote>

          <h2>Cumulative vs Non-Cumulative Interest Payouts</h2>
          <ul>
            <li>
              <strong>Cumulative FD:</strong> The interest you earn is reinvested quarterly into your principal. You receive the total interest and principal only upon maturity. This maximizes compounding.
            </li>
            <li>
              <strong>Non-Cumulative FD:</strong> The interest earned is paid out to you monthly or quarterly. This is ideal for senior citizens seeking regular pension income, but it stops the power of compounding on the interest.
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'rd-saving-guide',
      title: 'Save Monthly: How RD Maturity is Calculated in Banks',
      category: 'investment',
      readTime: '4 min read',
      date: 'Jul 20, 2026',
      snippet: 'Don\'t have a lump sum for an FD? Recurring Deposits (RDs) let you save monthly while earning the same fixed interest rates. Learn the compounding rules.',
      targetCalc: 'rd',
      ctaText: 'Calculate RD Maturity',
      content: (
        <div>
          <p>A Recurring Deposit (RD) is a disciplined saving tool that allows you to deposit a fixed amount monthly, earning interest rates comparable to Fixed Deposits.</p>
          <h2>RD Compounding Standards</h2>
          <p>Unlike regular monthly compound equations, Indian banks calculate RD interest using <strong>quarterly compounding</strong>. The interest is computed on each monthly installment based on the remaining months until maturity.</p>
          <h3>Taxability of RD Interest</h3>
          <p>Interest earned on RDs is fully taxable under your income slabs as "Income from Other Sources". Banks deduct TDS (Tax Deducted at Source) at 10% if the total interest across FDs and RDs in a bank exceeds ₹40,000 (₹50,000 for senior citizens) in a fiscal year.</p>
        </div>
      )
    },
    {
      id: 'epf-withdrawal-guide',
      title: 'EPF Withdrawal Rules: Interest Rates & Retirement Corpus',
      category: 'retirement',
      readTime: '5 min read',
      date: 'Jul 17, 2026',
      snippet: 'Understanding Employee Provident Fund (EPF) withdrawal clauses, interest rate calculations, and the tax implications of withdrawing before 5 years.',
      targetCalc: 'pf',
      ctaText: 'Calculate EPF Balances',
      content: (
        <div>
          <p>Your Employee Provident Fund (EPF) is your core retirement pool. Understanding when and how you can withdraw your balance is crucial.</p>
          <h2>Withdrawal Conditions</h2>
          <ul>
            <li><strong>Full Withdrawal:</strong> Allowed only upon retirement (at age 58) or if you remain unemployed for more than 2 consecutive months.</li>
            <li><strong>Partial Withdrawals:</strong> Allowed for specific purposes like house construction, medical emergencies, or children's weddings under strict terms.</li>
          </ul>
          <h3>Tax on Early Withdrawals</h3>
          <p>If you withdraw your EPF balance before completing 5 years of continuous service, the withdrawn amount attracts TDS and is added to your taxable income for that fiscal year.</p>
        </div>
      )
    },
    {
      id: 'nps-tier-guide',
      title: 'NPS Tier 1 vs Tier 2: Slabs, Annuity, and Tax Calculation Slabs',
      category: 'retirement',
      readTime: '6 min read',
      date: 'Jul 15, 2026',
      snippet: 'What is the difference between NPS Tier 1 and Tier 2 accounts? Compare tax deductions, withdrawal lock-ins, and auto vs active equity choices.',
      targetCalc: 'nps',
      ctaText: 'Compare NPS Tiers',
      content: (
        <div>
          <p>
            The <strong>National Pension Scheme (NPS)</strong> is a powerful voluntary retirement plan designed to help citizens build a structured pension corpus. However, many subscribers are confused by the two distinct accounts offered: <strong>NPS Tier 1</strong> and <strong>NPS Tier 2</strong>.
          </p>
          <p>
            Understanding the rules, slabs, and equity options of each tier is essential to maximizing your retirement returns and tax relief.
          </p>

          <h2>NPS Tier 1 vs NPS Tier 2: The Major Differences</h2>
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>NPS Tier 1 (Pension Account)</th>
                <th>NPS Tier 2 (Savings Account)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Status</strong></td>
                <td>Mandatory (to open NPS)</td>
                <td>Voluntary (requires active Tier 1)</td>
              </tr>
              <tr>
                <td><strong>Lock-in / Withdrawals</strong></td>
                <td>Locked in until age 60 (limited partial withdrawals)</td>
                <td>No lock-in period. Unlimited withdrawals.</td>
              </tr>
              <tr>
                <td><strong>Tax Deduction (Sec 80C)</strong></td>
                <td>Eligible up to ₹1.5 Lakhs u/s 80C</td>
                <td>No tax benefits (except for Central Govt staff with 3-yr lock-in)</td>
              </tr>
              <tr>
                <td><strong>Additional Deduction (80CCD)</strong></td>
                <td>Extra ₹50,000 u/s 80CCD(1B)</td>
                <td>Not applicable</td>
              </tr>
              <tr>
                <td><strong>Annuity Purchase</strong></td>
                <td>Mandatory to buy annuity with min 40% corpus at 60</td>
                <td>No annuity requirement. Can withdraw 100% anytime.</td>
              </tr>
            </tbody>
          </table>

          <h2>Asset Allocation Choices: Active vs Auto</h2>
          <p>
            NPS allows you to choose how your money is divided across four asset classes: Equity (E), Corporate Bonds (C), Government Securities (G), and Alternative Assets (A). You can select between two investment styles:
          </p>
          <ol>
            <li>
              <strong>Active Choice:</strong> You decide the percentage allocation yourself. You can allocate a maximum of <strong>75% in Equity (Scheme E)</strong> up to age 50, which gradually tapers down as you grow older.
            </li>
            <li>
              <strong>Auto Choice (Lifecycle Funds):</strong> Your money is automatically allocated based on your age. You can choose from three lifecycle profiles: **Aggressive** (starts at 75% equity), **Moderate** (starts at 50% equity), and **Conservative** (starts at 25% equity).
            </li>
          </ol>
        </div>
      )
    },
    {
      id: 'retirement-inflation-guide',
      title: 'Retirement Goal: Calculate Your Inflation-Adjusted Target',
      category: 'retirement',
      readTime: '5 min read',
      date: 'Jul 12, 2026',
      snippet: 'Inflation erodes purchasing power. Learn why a ₹1 Crore corpus today will not be enough in 20 years, and how to calculate your true retirement target.',
      targetCalc: 'retirement',
      ctaText: 'Plan Inflation Savings',
      content: (
        <div>
          <p>When planning for a retirement that is 20 or 30 years away, ignoring inflation is the biggest mistake you can make.</p>
          <h2>The Impact of Inflation</h2>
          <p>At an average inflation rate of 6% per annum, your expenses will double every 12 years. If your monthly household expense is ₹50,000 today, you will need approximately ₹1.6 Lakhs per month in 20 years to maintain the same standard of living.</p>
          <h3>Compounding Your Savings</h3>
          <p>Use our Retirement Goal Planner to input your current age, inflation expectations, and expected post-retirement yields to calculate the actual inflation-adjusted target corpus required.</p>
        </div>
      )
    },
    {
      id: 'lumpsum-returns-guide',
      title: 'Lumpsum Investing: CAGR vs Absolute Returns',
      category: 'investment',
      readTime: '4 min read',
      date: 'Jul 08, 2026',
      snippet: 'Investing a lump sum in mutual funds? Learn the difference between absolute returns and CAGR, and how to measure mutual fund portfolio growth.',
      targetCalc: 'mutualfund',
      ctaText: 'Calculate Mutual Fund returns',
      content: (
        <div>
          <p>When reviewing mutual fund performance, investors are often confused by different terms like Absolute Returns and CAGR.</p>
          <h2>Absolute Returns</h2>
          <p>Simple growth rate from the investment date to current date. Formula: `((Current Value - Invested Value) / Invested Value) * 100`. Best for short-term investments (&lt; 1 year).</p>
          <h2>CAGR (Compounded Annual Growth Rate)</h2>
          <p>The annual growth rate of your investment over time, assuming returns are compounded. Best for measuring long-term equity growth (&gt; 1 year).</p>
        </div>
      )
    },
    {
      id: 'rule-72-guide',
      title: 'Compound vs Simple Interest: Rule of 72 Explained',
      category: 'investment',
      readTime: '4 min read',
      date: 'Jul 05, 2026',
      snippet: 'Simple interest grows linearly, but compound interest grows exponentially. Learn how the Rule of 72 estimates how fast your money doubles.',
      targetCalc: 'compound',
      ctaText: 'Calculate Compound Interest',
      content: (
        <div>
          <p>Albert Einstein famously called compound interest the eighth wonder of the world. Understanding its math is crucial for wealth building.</p>
          <h2>The Rule of 72</h2>
          <p>A quick mental math shortcut to find out how long it takes to double your money at a fixed compound interest rate. Divide 72 by the annual interest rate.</p>
          <ul>
            <li>At 8% interest: `72 / 8 = 9 Years` to double your money.</li>
            <li>At 12% interest: `72 / 12 = 6 Years` to double your money.</li>
          </ul>
          <p>Use our Compound Interest Calculator to test daily, monthly, and quarterly compounding frequencies.</p>
        </div>
      )
    },
    {
      id: 'car-loan-guide',
      title: 'Car Loan EMI Calculation: Zero Down Payment vs Fixed Rates',
      category: 'loans',
      readTime: '4 min read',
      date: 'Jul 02, 2026',
      snippet: 'Buying a car? Learn how to calculate car loan EMIs, the impact of zero down payment offers, and why fixed interest rates are expensive.',
      targetCalc: 'emi',
      ctaText: 'Calculate Car EMIs',
      content: (
        <div>
          <p>Car loans are typically fixed-rate or reducing-rate loans extending from 3 to 7 years.</p>
          <h2>Zero Down Payment Traps</h2>
          <p>Dealers often advertise "Zero Down Payment" schemes. While tempting, borrowing 100% of the car value increases your principal loan size, resulting in significantly higher total interest paid over the tenure.</p>
          <h3>Tenure Strategy</h3>
          <p>Since a car is a depreciating asset, try to pay at least a 20% down payment and limit the loan tenure to 5 years or less to avoid paying excessive interest on a depreciating vehicle.</p>
        </div>
      )
    },
    {
      id: 'reducing-emi-guide',
      title: 'Personal Loan Rates: Flat vs Reducing Balance EMI',
      category: 'loans',
      readTime: '4 min read',
      date: 'Jun 28, 2026',
      snippet: 'Banks offer personal loans on flat or reducing balance interest rates. Learn how to identify the true cost of borrowing and avoid expensive loans.',
      targetCalc: 'emi',
      ctaText: 'Calculate Personal Loan EMIs',
      content: (
        <div>
          <p>Personal loans are unsecured credits that carry high interest rates (11% to 24% p.a.). Identifying the calculation method is critical before signing the loan agreement.</p>
          <h2>Flat Interest Rates</h2>
          <p>Interest is calculated on the full principal amount throughout the tenure, ignoring monthly repayments. This means the effective interest rate is almost double the advertised flat rate.</p>
          <h2>Reducing Balance Rates</h2>
          <p>Interest is calculated only on the remaining unpaid principal each month. This is the fair, standard method used by transparent banking institutions.</p>
        </div>
      )
    },
    {
      id: 'stepup-sip-guide',
      title: 'Step-Up SIP: The Fast Track to Wealth Creation',
      category: 'investment',
      readTime: '5 min read',
      date: 'Jun 25, 2026',
      snippet: 'Small increases in your SIP make a massive difference. Learn how a 10% annual step-up increases your final mutual fund portfolio value.',
      targetCalc: 'sip',
      ctaText: 'Calculate Step-up SIP',
      content: (
        <div>
          <p>A Step-Up SIP is a powerful tool to match your investments with salary raises.</p>
          <h2>The Cumulative Difference</h2>
          <p>If you start with a SIP of ₹10,000 monthly for 20 years at 12% CAGR:
            <ul>
              <li><strong>Regular SIP:</strong> You invest ₹24.0 Lakhs, and the final value is ₹99.9 Lakhs.</li>
              <li><strong>10% Step-Up SIP:</strong> You increase the monthly investment by 10% yearly. You invest ₹68.7 Lakhs, and the final value is <strong>₹2.06 Crores</strong>!</li>
            </ul>
            By stepping up, you more than double your wealth output over the same investment period.
          </p>
        </div>
      )
    },
    {
      id: 'section-80c-guide',
      title: 'Maximizing Section 80C: PPF, ELSS, EPF, and Life Insurance',
      category: 'tax',
      readTime: '5 min read',
      date: 'Jun 22, 2026',
      snippet: 'Section 80C allows deductions up to ₹1.5 Lakhs under the Old Regime. Explore the lock-ins, tax treatments, and yield comparisons of major 80C products.',
      targetCalc: 'tax',
      ctaText: 'Compare Tax Deductions',
      content: (
        <div>
          <p>Section 80C remains the most popular tax-saving provision in India for those opting for the Old Tax Regime.</p>
          <h2>Major 80C Options</h2>
          <ul>
            <li><strong>ELSS (Mutual Funds):</strong> Equity exposure, highest historical yields, shortest lock-in (3 years). Returns are taxed under Long-Term Capital Gains (LTCG).</li>
            <li><strong>PPF (Public Provident Fund):</strong> Sovereign guarantee, tax-free interest, 15-year lock-in. EEE status.</li>
            <li><strong>EPF (Employee Provident Fund):</strong> Automatic payroll deductions. Offers 8.25% fixed interest. EEE status.</li>
            <li><strong>Tax-Saver FDs:</strong> 5-year lock-in. Interest is fully taxable under your income tax slab.</li>
          </ul>
        </div>
      )
    }
  ];

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            article.snippet.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const activeArticle = useMemo(() => {
    if (!selectedArticleId) return null;
    return articles.find(art => art.id === selectedArticleId);
  }, [selectedArticleId]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // Helper to safely set meta tags
    function setMetaTag(attribute, value, isProperty = false) {
      const selector = isProperty ? `meta[property="${attribute}"]` : `meta[name="${attribute}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', attribute);
        } else {
          element.name = attribute;
        }
        document.head.appendChild(element);
      }
      element.content = value;
    }

    // Remove existing breadcrumb script if any
    const existingBreadcrumb = document.getElementById("breadcrumb-schema");
    if (existingBreadcrumb) {
      existingBreadcrumb.remove();
    }

    if (selectedArticleId) {
      if (params.get('article') !== selectedArticleId) {
        params.set('article', selectedArticleId);
        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
      }
      const article = articles.find(a => a.id === selectedArticleId);
      if (article) {
        // Page Title & Meta Desc
        document.title = `${article.title} | RupeeBuddy.in`;
        
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
          metaDesc = document.createElement('meta');
          metaDesc.name = "description";
          document.head.appendChild(metaDesc);
        }
        metaDesc.content = article.snippet;

        // Meta Keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
          metaKeywords = document.createElement('meta');
          metaKeywords.name = "keywords";
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.content = `${article.category}, finance guide, ${article.title.toLowerCase()}`;

        // Canonical URL
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
          canonical = document.createElement('link');
          canonical.rel = "canonical";
          document.head.appendChild(canonical);
        }
        canonical.href = `https://rupeebuddy.in/?calc=blogs&article=${article.id}`;

        // Open Graph Meta
        setMetaTag('og:title', `${article.title} | RupeeBuddy.in`, true);
        setMetaTag('og:description', article.snippet, true);
        setMetaTag('og:url', `https://rupeebuddy.in/?calc=blogs&article=${article.id}`, true);
        setMetaTag('og:image', 'https://rupeebuddy.in/favicon.svg', true);

        // Inject Article BreadcrumbList Schema
        const breadcrumbData = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://rupeebuddy.in/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Financial Guides",
              "item": "https://rupeebuddy.in/?calc=blogs"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": article.title,
              "item": `https://rupeebuddy.in/?calc=blogs&article=${article.id}`
            }
          ]
        };
        const breadcrumbScript = document.createElement("script");
        breadcrumbScript.type = "application/ld+json";
        breadcrumbScript.id = "breadcrumb-schema";
        breadcrumbScript.text = JSON.stringify(breadcrumbData, null, 2);
        document.head.appendChild(breadcrumbScript);
      }
    } else {
      if (params.has('article')) {
        params.delete('article');
        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
      }
      
      // Page Title & Meta Desc
      document.title = "Financial Guides & Investment Strategies | RupeeBuddy.in";
      
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = "Explore 18 expert financial guides and articles on income tax planning, mutual fund compound interest growth, retirement corpus accumulation, and debt reduction strategies in India.";

      // Meta Keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = "keywords";
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = "finance guides, investment articles, wealth strategies india, personal finance blogs, saving tips";

      // Canonical URL
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = "https://rupeebuddy.in/?calc=blogs";

      // Open Graph Meta
      setMetaTag('og:title', "Financial Guides & Investment Strategies | RupeeBuddy.in", true);
      setMetaTag('og:description', "Explore 18 expert financial guides and articles on income tax planning, mutual fund compound interest growth, retirement corpus accumulation, and debt reduction strategies in India.", true);
      setMetaTag('og:url', "https://rupeebuddy.in/?calc=blogs", true);
      setMetaTag('og:image', 'https://rupeebuddy.in/favicon.svg', true);

      // Inject Blogs Landing BreadcrumbList Schema
      const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://rupeebuddy.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Financial Guides",
            "item": "https://rupeebuddy.in/?calc=blogs"
          }
        ]
      };
      const breadcrumbScript = document.createElement("script");
      breadcrumbScript.type = "application/ld+json";
      breadcrumbScript.id = "breadcrumb-schema";
      breadcrumbScript.text = JSON.stringify(breadcrumbData, null, 2);
      document.head.appendChild(breadcrumbScript);
    }
  }, [selectedArticleId]);

  return (
    <div className="blogs-wrapper">
      {activeArticle ? (
        /* Detailed Article Reader */
        <div className="article-reader-container">
          <button className="article-back-btn" onClick={() => setSelectedArticleId(null)}>
            <ArrowLeft size={16} /> Back to Guides
          </button>
          
          <div className="article-meta-header">
            <span className={`guide-category-badge ${activeArticle.category}`}>
              {activeArticle.category}
            </span>
            <h1 className="article-title">{activeArticle.title}</h1>
            <div className="article-reading-info">
              <span>📅 {activeArticle.date}</span>
              <span><Clock size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> {activeArticle.readTime}</span>
              <span className="article-author-info">✍️ Written by the RupeeBuddy Editorial Team</span>
              <span className="article-verification-info">✓ Reviewed by Chartered Accountants & Financial Advisors</span>
            </div>
          </div>

          <div className="article-content">
            {activeArticle.content}
          </div>

          {/* Action CTA Block */}
          <div className="article-cta-box">
            <div className="article-cta-text">
              <h4>Ready to put this math to work?</h4>
              <p>Launch the corresponding calculator and run your own personalized simulations instantly.</p>
            </div>
            <button 
              className="article-cta-btn"
              onClick={() => setActiveCalculator(activeArticle.targetCalc)}
            >
              {activeArticle.ctaText} <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} />
            </button>
          </div>
        </div>
      ) : (
        /* Guides Dashboard */
        <div className="guides-container">
          <div className="guides-header-row">
            <h2>RupeeBuddy Finance Guides</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '-8px' }}>
              Deep dives, comparisons, and wealth strategies to help you make sound financial calculations.
            </p>
            
            <div className="guides-search-filters">
              {/* Search input */}
              <div className="search-input-wrapper" style={{ flexGrow: 1, maxWidth: '400px' }}>
                <Search size={18} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-field"
                />
              </div>

              {/* Category Filters */}
              <div className="guides-filter-tags">
                {['all', 'tax', 'investment', 'loans', 'retirement'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`filter-tag-btn ${selectedCategory === cat ? 'active' : ''}`}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Guides Cards Grid */}
          <div className="guides-grid">
            {filteredArticles.map((article) => (
              <a 
                key={article.id} 
                href={`?calc=blogs&article=${article.id}`}
                className="guide-summary-card"
                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedArticleId(article.id);
                }}
              >
                <span className={`guide-category-badge ${article.category}`}>
                  {article.category}
                </span>
                <h3 className="guide-card-title">{article.title}</h3>
                <p className="guide-card-snippet">{article.snippet}</p>
                <div className="guide-card-footer">
                  <span>📅 {article.date}</span>
                  <span className="guide-read-more">
                    Read Article →
                  </span>
                </div>
              </a>
            ))}

            {filteredArticles.length === 0 && (
              <div style={{ 
                textAlign: 'center', 
                gridColumn: '1 / -1', 
                padding: '40px', 
                color: 'var(--text-muted)',
                backgroundColor: 'white',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)'
              }}>
                <BookOpen size={40} style={{ opacity: 0.3, marginBottom: '12px' }} />
                <p>No guides found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
