import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, Clock, ArrowRight, BookOpen } from 'lucide-react';

export default function Blogs({ setActiveCalculator }) {
  const [selectedArticleId, setSelectedArticleId] = useState(null);
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
          \[M = P \times \frac{(1 + i)^n - 1}{i} \times (1 + i)\]
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
      title: 'NPS vs PPF: Which is Better for Long-Term Tax Savings?',
      category: 'retirement',
      readTime: '5 min read',
      date: 'Jul 30, 2026',
      snippet: 'Stuck between NPS and PPF? Compare their tax benefits under Section 80C, equity exposure, maturity withdrawal rules, and pension payouts.',
      targetCalc: 'nps',
      ctaText: 'Calculate NPS Returns',
      content: (
        <div>
          <p>Both the National Pension Scheme (NPS) and Public Provident Fund (PPF) are voluntary retirement schemes offering tax deductions. However, they serve very different asset allocations.</p>
          <h2>Key Differences</h2>
          <ul>
            <li><strong>PPF:</strong> Fixed tax-free interest (7.1% EEE), 15-year lock-in. Best for conservative safety-net savings.</li>
            <li><strong>NPS:</strong> Market-linked returns, locked in until age 60. Up to 75% equity exposure makes it best for high wealth compounding.</li>
          </ul>
          <h3>Tax Deductions u/s 80C and 80CCD</h3>
          <p>PPF contributions fall under the standard ₹1.5 Lakh limit. NPS contributions also count under this limit, but NPS offers an additional tax deduction of ₹50,000 under Section 80CCD(1B) for Tier 1 accounts.</p>
        </div>
      )
    },
    {
      id: 'foir-guide',
      title: 'Understanding FOIR: How Banks Calculate Your Eligible Loan',
      category: 'loans',
      readTime: '4 min read',
      date: 'Jul 28, 2026',
      snippet: 'Before applying for a loan, banks calculate your Fixed Obligation to Income Ratio (FOIR). Learn how to check your eligible borrowing capacity.',
      targetCalc: 'eligibility',
      ctaText: 'Calculate Loan Eligibility',
      content: (
        <div>
          <p>When you apply for a home or personal loan, banks assess your repaying capacity using a metric called <strong>FOIR (Fixed Obligation to Income Ratio)</strong>.</p>
          <h2>What is FOIR?</h2>
          <p>FOIR represents the percentage of your monthly net take-home salary that goes toward paying EMIs (including existing loans and the proposed new loan). Most banks cap FOIR between <strong>45% and 55%</strong> to ensure you have enough money left for personal expenses.</p>
          <h3>How to improve loan eligibility</h3>
          <ul>
            <li>Pay off existing credit card debts or short-term personal loans before applying.</li>
            <li>Apply with a co-applicant (like a spouse) to pool incomes and increase eligibility.</li>
            <li>Opt for a longer tenure to reduce the monthly EMI, which lowers your FOIR.</li>
          </ul>
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
      title: 'FD Interest Compounding: Monthly vs Quarterly Payouts',
      category: 'investment',
      readTime: '4 min read',
      date: 'Jul 22, 2026',
      snippet: 'Fixed Deposits (FDs) are the go-to safety choice. Learn how compounding frequency (monthly, quarterly, or yearly) impacts your final maturity yield.',
      targetCalc: 'fd',
      ctaText: 'Calculate FD Returns',
      content: (
        <div>
          <p>Fixed Deposits (FDs) offer guaranteed returns over a chosen tenure. However, many depositors do not understand the difference between cumulative and non-cumulative interest payouts.</p>
          <h2>Cumulative vs Non-Cumulative</h2>
          <ul>
            <li><strong>Cumulative FDs:</strong> Interest is compounded quarterly and paid upon maturity. This gives you the highest final maturity corpus due to reinvested interest.</li>
            <li><strong>Non-Cumulative FDs:</strong> Interest is paid out regularly (monthly, quarterly, or half-yearly) to provide steady income. Best for retirees.</li>
          </ul>
          <h3>Compounding Power</h3>
          <p>Because Indian banks compound FDs quarterly, the effective annual yield is always slightly higher than the advertised interest rate. Use our calculator to check the exact quarterly compounding output.</p>
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
      title: 'NPS Tier 1 vs Tier 2: Slabs, Annuity, and Tax Rules',
      category: 'retirement',
      readTime: '5 min read',
      date: 'Jul 15, 2026',
      snippet: 'What is the difference between NPS Tier 1 and Tier 2 accounts? Compare tax deductions, withdrawal lock-ins, and voluntary savings features.',
      targetCalc: 'nps',
      ctaText: 'Compare NPS Tiers',
      content: (
        <div>
          <p>The National Pension Scheme offers two types of accounts to accommodate different saving needs.</p>
          <h2>NPS Tier 1 (Pension Account)</h2>
          <p>The primary retirement account. Locked in until age 60. Qualifies for tax deductions of up to ₹1.5 Lakhs (Sec 80CCD(1)) and an additional ₹50,000 (Sec 80CCD(1B)). Withdrawals are restricted.</p>
          <h2>NPS Tier 2 (Investment Account)</h2>
          <p>A voluntary savings account. Only open if you have an active Tier 1 account. It has no lock-in period and allows unlimited withdrawals, but contributions do not qualify for tax deductions.</p>
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
              <div 
                key={article.id} 
                className="guide-summary-card"
                onClick={() => setSelectedArticleId(article.id)}
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
              </div>
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
