/**
 * RupeeBuddy.in - Static Site Generation (SSG) & Prerendering Engine
 * 
 * Generates pre-rendered HTML files for all Calculators, Guides, Categories, and Legal/E-E-A-T pages.
 * Injects rich JSON-LD schemas (FAQPage, HowTo, BreadcrumbList, WebApplication, BlogPosting),
 * semantic HTML fallback content for instant Googlebot indexing (zero JS delay),
 * and builds a clean XML Sitemap for Search Console and IndexNow submission.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const HOST = 'https://rupeebuddy.in';

// 1. Calculators Master Registry
const calculators = [
  {
    id: 'tax',
    slug: 'income-tax-calculator',
    name: 'Income Tax Calculator FY 2026-27: Old vs New Regime & NPS',
    shortName: 'Income Tax Calculator',
    description: 'Compare Old vs New Tax Regime for FY 2026-27 (AY 2027-28). Features ₹75,000 standard deduction, zero tax up to ₹12L rebate (87A), and Employer NPS 80CCD(2).',
    keywords: 'income tax calculator, old vs new tax regime, budget 2025 tax slabs, tax calculator fy 2026-27, section 87a rebate, employer nps deduction 80ccd 2, tax slabs india',
    category: 'TaxCalculator',
    citation: 'Income Tax Act 1961 - Sections 115BAC, 87A, 80C, 80CCD(2) & Finance Acts',
    formula: 'Net Tax = Tax on Taxable Income - Section 87A Rebate + 4% Health & Education Cess',
    example: 'For a salary of ₹12,00,000 under the New Regime: Standard Deduction ₹75,000 reduces taxable salary to ₹11,25,000. With Section 87A rebate, tax liability is ₹0.',
    faqs: [
      {
        q: 'Which tax regime is better for FY 2026-27?',
        a: 'For salaried taxpayers earning up to ₹12 Lakhs without significant home loan interest or Chapter VI-A deductions, the New Tax Regime is virtually always better due to the ₹75,000 standard deduction and Section 87A rebate resulting in zero tax.'
      },
      {
        q: 'Is Section 87A rebate available in the New Tax Regime?',
        a: 'Yes, Section 87A rebate provides full tax relief for taxable income up to ₹12 Lakhs under the revised New Tax Regime.'
      },
      {
        q: 'Can I claim Employer NPS under Section 80CCD(2) in the New Regime?',
        a: 'Yes. Employer contributions to your NPS account up to 14% of Basic + DA (Central/State Govt) or 10% (Private Sector) are fully deductible under Section 80CCD(2) in the New Tax Regime.'
      }
    ]
  },
  {
    id: 'emi',
    slug: 'home-loan-emi-calculator',
    name: 'Home Loan EMI Calculator: Personal Loan & Car Loan EMI Calculator',
    shortName: 'Home Loan EMI Calculator',
    description: 'Calculate monthly home loan EMIs, total interest payable, and loan amortization schedules for SBI, HDFC, ICICI, and Axis banks with reducing balance formulas.',
    keywords: 'home loan emi calculator, emi calculator, car loan emi, personal loan emi, sbi home loan emi, emi calculation formula',
    category: 'FinancialCalculator',
    citation: 'Reserve Bank of India (RBI) Retail Lending Master Directions',
    formula: 'EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)',
    example: 'For a loan of ₹50,00,000 at 8.5% interest for 20 years (240 months): Monthly EMI is ₹43,391. Total interest payable is ₹54,13,879.',
    faqs: [
      {
        q: 'How is home loan EMI calculated in India?',
        a: 'Banks calculate EMI using the monthly reducing balance formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P is principal, r is monthly interest rate, and n is tenure in months.'
      },
      {
        q: 'Can I prepay my home loan without penalty in India?',
        a: 'Yes. Under RBI guidelines, commercial banks and housing finance companies cannot charge any prepayment penalty or foreclosure fee on floating-rate individual home loans.'
      },
      {
        q: 'What happens if I make one extra EMI payment every year?',
        a: 'Paying one extra EMI per year on a 20-year home loan can reduce your overall repayment tenure by 3 to 4 years and save lakhs in compound interest.'
      }
    ]
  },
  {
    id: 'sip',
    slug: 'sip-calculator',
    name: 'SIP Calculator: Calculate Mutual Fund Returns & Wealth Growth',
    shortName: 'SIP Calculator',
    description: 'Free SIP return calculator with visual charts. Calculate expected maturity wealth, compounding returns, and capital appreciation for monthly mutual fund SIPs instantly.',
    keywords: 'sip calculator, mutual fund sip calculator, sip return calculator, systematic investment plan, step up sip, mutual fund cagr',
    category: 'InvestmentCalculator',
    citation: 'Association of Mutual Funds in India (AMFI) Compounding Conventions',
    formula: 'M = P × [((1 + i)^n - 1) / i] × (1 + i)',
    example: 'Investing ₹10,000 monthly for 15 years at an expected 12% CAGR: Total investment ₹18,00,000 grows to an estimated maturity corpus of ₹50,45,760.',
    faqs: [
      {
        q: 'What is a Systematic Investment Plan (SIP)?',
        a: 'A SIP is an automated investment method where a fixed sum is invested periodically into a chosen mutual fund scheme, taking advantage of rupee cost averaging and compounding.'
      },
      {
        q: 'What return should I expect from equity SIPs in India?',
        a: 'Historical 10-year rolling returns of broad Indian market indices (like Nifty 50 and Nifty 500) have averaged between 11% and 13% CAGR.'
      }
    ]
  },
  {
    id: 'eligibility',
    slug: 'loan-eligibility-calculator',
    name: 'Loan Eligibility & FOIR Calculator: Calculate Maximum Borrowing Limit',
    shortName: 'Loan Eligibility Calculator',
    description: 'Check your home loan and personal loan eligibility based on salary, existing EMIs, and banking Fixed Obligation to Income Ratio (FOIR) standards.',
    keywords: 'loan eligibility calculator, foir calculator, home loan eligibility based on salary, maximum loan limit',
    category: 'FinancialCalculator',
    citation: 'IBA & RBI Retail Underwriting Norms',
    formula: 'Maximum Eligible EMI = (Net Monthly Salary × FOIR %) - Existing EMIs',
    example: 'On a net salary of ₹1,00,000 with a 50% bank FOIR limit and ₹10,000 existing car EMI, maximum permissible new EMI is ₹40,000, qualifying for roughly ₹46 Lakhs loan at 8.5% for 20 years.',
    faqs: [
      {
        q: 'What is FOIR in loan eligibility?',
        a: 'FOIR stands for Fixed Obligation to Income Ratio. It is the percentage of your monthly income that banks allow for total debt repayments (typically 40% to 60%).'
      }
    ]
  },
  {
    id: 'clp',
    slug: 'construction-linked-plan-calculator',
    name: 'Construction Linked Plan Calculator: Stage-Wise Payment & Pre-EMI Calculator',
    shortName: 'CLP & Pre-EMI Calculator',
    description: 'Calculate stage-wise construction linked payment demands, Pre-EMI monthly interest, and bank loan disbursals for under-construction flats and buildings in Maharashtra (MahaRERA).',
    keywords: 'construction linked plan calculator, clp calculator, pre emi calculator, slab wise payment calculator, maharera payment schedule',
    category: 'FinancialCalculator',
    citation: 'Real Estate (Regulation and Development) Act 2016, Section 2(k) & MahaRERA Milestones',
    formula: 'Stage Demand = Total Agreement Value × Stage Percentage; Pre-EMI = Cumulative Disbursed Loan × Monthly Interest Rate',
    example: 'For an agreement value of ₹80,00,000 with 80% loan: At Plinth stage (15% demand), ₹12,00,000 is demanded, of which bank disburses ₹9,60,000, incurring Pre-EMI interest of ₹6,800/month at 8.5%.',
    faqs: [
      {
        q: 'What is a Construction Linked Payment Plan (CLP)?',
        a: 'A CLP is a real estate payment plan where property buyers make payments in instalments linked directly to physical construction milestones verified under RERA regulations.'
      },
      {
        q: 'What is the difference between Pre-EMI and Full EMI?',
        a: 'Pre-EMI is interest charged only on the partial loan amount disbursed by the bank to the builder during construction. Full EMI (principal + interest) starts only after possession.'
      }
    ]
  },
  {
    id: 'ppf',
    slug: 'ppf-calculator',
    name: 'PPF Calculator: Public Provident Fund Calculator Online',
    shortName: 'PPF Calculator',
    description: 'Calculate your PPF interest returns and maturity corpus using this online Public Provident Fund calculator. Plan your tax-free savings with the latest PPF interest rates of 7.1%.',
    keywords: 'ppf calculator, public provident fund calculator, ppf interest rate, ppf calculation, ppf online',
    category: 'InvestmentCalculator',
    citation: 'Public Provident Fund Scheme 2019 & Ministry of Finance Notifications',
    formula: 'A = P × [((1 + r)^n - 1) / r] with annual compounding',
    example: 'Investing ₹1,50,000 annually for 15 years at 7.1% interest yields a total tax-free maturity corpus of ₹40,68,209.',
    faqs: [
      {
        q: 'What is the current PPF interest rate in India?',
        a: 'The current PPF interest rate is 7.1% per annum, compounded annually and backed by a sovereign government guarantee.'
      }
    ]
  },
  {
    id: 'pf',
    slug: 'epf-calculator',
    name: 'EPF / PF Calculator: Calculate PF Balance & 8.25% Interest',
    shortName: 'EPF / PF Calculator',
    description: 'Calculate your Employee Provident Fund (EPF) balance, monthly employee & employer contribution, and 8.25% annual interest. Estimate total retirement corpus online.',
    keywords: 'epf calculator, pf calculator, online pf calculator, epf balance check online, epf interest rate 8.25',
    category: 'RetirementCalculator',
    citation: 'Employees Provident Funds and Miscellaneous Provisions Act, 1952',
    formula: 'Monthly Interest Accrual = (Opening Balance + Monthly Contribution) × (8.25% / 12)',
    example: 'With Basic + DA of ₹50,000 and 12% employee contribution matched by employer, your EPF balance grows with monthly compounding at 8.25% p.a.',
    faqs: [
      {
        q: 'What is the EPF interest rate for FY 2026-27?',
        a: 'The EPFO Central Board of Trustees has set the annual EPF interest rate at 8.25%.'
      }
    ]
  },
  {
    id: 'mutualfund',
    slug: 'mutual-fund-calculator',
    name: 'Mutual Fund Calculator: Lumpsum & SIP Growth Calculator',
    shortName: 'Mutual Fund Calculator',
    description: 'Estimate your mutual fund returns online. Calculate lumpsum investments and Systematic Investment Plan (SIP) growth based on historical CAGR returns.',
    keywords: 'mutual fund calculator, lumpsum mutual fund calculator, mf calculator, mutual fund return calculator',
    category: 'InvestmentCalculator',
    citation: 'SEBI (Mutual Funds) Regulations, 1996 and AMFI Benchmark Standards',
    formula: 'A = P × (1 + r)^n for lumpsum compounding',
    example: 'A lumpsum investment of ₹5,00,000 compounded at 12% CAGR for 10 years grows to ₹15,52,924.',
    faqs: [
      {
        q: 'What is CAGR in mutual funds?',
        a: 'CAGR (Compound Annual Growth Rate) represents the annualized rate of return that an investment provides over a multi-year holding period.'
      }
    ]
  },
  {
    id: 'nps',
    slug: 'nps-calculator',
    name: 'National Pension Scheme India Calculator: How to Calculate NPS Pension',
    shortName: 'NPS Pension Calculator',
    description: 'Learn how to calculate NPS pension and maturity corpus. Use our National Pension Scheme India calculator to project tax-free lump sum and monthly annuity pension payouts.',
    keywords: 'national pension scheme india calculator, how to calculate nps pension, nps calculator online, nps tier 1',
    category: 'RetirementCalculator',
    citation: 'Pension Fund Regulatory and Development Authority (PFRDA) Guidelines',
    formula: 'Total Corpus = Monthly Contribution Compounded at Return %; Annuity = 40% of Corpus × Annuity Yield',
    example: 'Investing ₹10,000/month for 30 years at 10% expected return yields ₹2.28 Crore corpus, providing ₹1.37 Crore tax-free cash and ₹60,000+ monthly lifetime pension.',
    faqs: [
      {
        q: 'Is NPS withdrawal tax-free at age 60?',
        a: 'Yes, up to 60% of the total accumulated NPS corpus can be withdrawn as a 100% tax-free lump sum at age 60.'
      }
    ]
  },
  {
    id: 'retirement',
    slug: 'retirement-planner',
    name: 'Retirement Planner: Pension Planner & Retirement Planning Tools',
    shortName: 'Retirement Planner',
    description: 'Plan your financial independence with this free retirement planner. Estimate your required pension corpus and monthly savings adjusted for inflation.',
    keywords: 'retirement planner, pension planner, early retirement calculator, financial independence india',
    category: 'RetirementCalculator',
    citation: 'Actuarial Society of India Life Expectancy & Post-Retirement Inflation Models',
    formula: 'Target Corpus = Annual Expenses at Retirement × (1 - (1+r)^-n) / r',
    example: 'If your current monthly expenditure is ₹50,000, in 25 years with 6% inflation you will require ₹2,14,500/month, necessitating a retirement corpus of approximately ₹5.2 Crore.',
    faqs: [
      {
        q: 'How much corpus is required to retire comfortably in India?',
        a: 'As a rule of thumb, target 25 to 30 times your estimated annual living expenses at retirement age.'
      }
    ]
  },
  {
    id: 'fd',
    slug: 'fd-calculator',
    name: 'FD Calculator: Fixed Deposit Interest Calculator Online',
    shortName: 'FD Interest Calculator',
    description: 'Calculate SBI, HDFC, and Post Office Fixed Deposit (FD) interest and maturity amount using our online fixed deposit return calculator with quarterly compounding.',
    keywords: 'fd calculator, fixed deposit calculator, sbi fd calculator, post office fd interest rate',
    category: 'SavingsCalculator',
    citation: 'Indian Banks Association (IBA) Standard Quarterly Compounding Norms',
    formula: 'A = P × (1 + r/4)^(4 × n)',
    example: 'A 5-year fixed deposit of ₹10,00,000 at 7.0% interest compounded quarterly matures to ₹14,14,778.',
    faqs: [
      {
        q: 'How often is interest compounded on bank FDs in India?',
        a: 'Indian commercial banks compound FD interest on a quarterly basis (every 3 months).'
      }
    ]
  },
  {
    id: 'rd',
    slug: 'rd-calculator',
    name: 'RD Calculator: Recurring Deposit Interest & Maturity Calculator',
    shortName: 'RD Calculator',
    description: 'Calculate Post Office, SBI & bank Recurring Deposit (RD) interest earnings and maturity amount with quarterly compounding. 100% free online RD calculator.',
    keywords: 'rd calculator, recurring deposit calculator, sbi rd calculator, post office rd calculator',
    category: 'SavingsCalculator',
    citation: 'Post Office RD Rules 2019 & RBI Commercial Banking Regulations',
    formula: 'Quarterly Compounded Sum of Periodic Cash Flows',
    example: 'Depositing ₹5,000 monthly for 5 years at 6.7% interest yields total deposits of ₹3,00,000 and interest of ₹56,830 for a maturity sum of ₹3,56,830.',
    faqs: [
      {
        q: 'Can I withdraw my RD before maturity?',
        a: 'Yes, premature withdrawal is permitted subject to a penalty of typically 1% on the effective interest rate.'
      }
    ]
  },
  {
    id: 'compound',
    slug: 'compound-interest-calculator',
    name: 'Compound Interest & Cumulative Calculator India: Daily, Monthly & Yearly',
    shortName: 'Compound Interest Calculator',
    description: 'Calculate compound interest and cumulative returns online with daily, monthly, quarterly, or yearly compounding frequencies using our free cumulative calculator.',
    keywords: 'compound interest calculator, cumulative calculator, daily compound interest, compound interest formula',
    category: 'SavingsCalculator',
    citation: 'Standard Mathematical Compound Growth Models',
    formula: 'A = P × (1 + r/n)^(n × t)',
    example: 'An initial principal of ₹1,00,000 at 10% compounded annually for 20 years yields ₹6,72,750.',
    faqs: [
      {
        q: 'What is the Rule of 72 in compound interest?',
        a: 'Dividing 72 by your annual interest rate estimates how many years it takes for your investment to double. At 12%, money doubles in approximately 6 years.'
      }
    ]
  },
  {
    id: 'stampduty',
    slug: 'stamp-duty-calculator',
    name: 'Stamp Duty & Registration Calculator India: State-Wise Property Rates',
    shortName: 'Stamp Duty Calculator',
    description: 'Calculate stamp duty and registration fees across Maharashtra, Karnataka, Delhi, UP, Haryana, Tamil Nadu and all Indian states with women concession discounts.',
    keywords: 'stamp duty calculator, property registration charges, maharashtra stamp duty, stamp duty calculator bangalore',
    category: 'RealEstateCalculator',
    citation: 'Indian Stamp Act 1899 & Respective State Revenue Department Circulars',
    formula: 'Total Sunk Cost = Property Agreement Value × (Stamp Duty % + Surcharge / Metro Cess %) + Registration Fee',
    example: 'In Maharashtra for a ₹1 Crore flat: Standard Stamp Duty (5%) + Metro Cess (1%) = ₹6,00,000 + Registration Fee ₹30,000 = ₹6,30,000 total government duty.',
    faqs: [
      {
        q: 'Do women buyers get a stamp duty concession in India?',
        a: 'Yes. Several states including Maharashtra (1% rebate), Delhi (2% rebate), Uttar Pradesh (1% rebate up to ₹10L), and Haryana offer lower stamp duty rates for female property owners.'
      }
    ]
  },
  {
    id: 'capitalgains',
    slug: 'capital-gains-tax-calculator',
    name: 'Property Capital Gains Tax Calculator: Budget 2024 (20% vs 12.5%)',
    shortName: 'Capital Gains Tax Calculator',
    description: 'Calculate short-term and long-term capital gains tax on property sale. Compare Budget 2024 Old Regime (20% with CII indexation) vs New Regime (12.5% flat) and Section 54 deductions.',
    keywords: 'property capital gains tax calculator, ltcg on property, budget 2024 property tax, cii cost inflation index',
    category: 'TaxCalculator',
    citation: 'Sections 48, 54 & 112 of Income Tax Act 1961 as amended by Finance (No. 2) Act 2024',
    formula: 'Old LTCG = 20% on (Sale Price - Indexed Cost); New LTCG = 12.5% on (Sale Price - Purchase Price)',
    example: 'For a property purchased in 2010 for ₹30 Lakhs and sold in 2024 for ₹90 Lakhs, the calculator compares the 20% indexation route against the 12.5% flat rate to determine lowest tax.',
    faqs: [
      {
        q: 'What is the grandfathering clause for property capital gains in Budget 2024?',
        a: 'For properties acquired before July 23, 2024 by resident individuals and HUFs, taxpayers can compute tax under both 20% with indexation and 12.5% without indexation, and pay whichever is lower.'
      }
    ]
  },
  {
    id: 'carpetarea',
    slug: 'carpet-area-calculator',
    name: 'RERA Carpet Area Calculator & Land Unit Converter (Sq.Ft to Gaj, Guntha, Acre)',
    shortName: 'Carpet Area Converter',
    description: 'Calculate RERA Net Carpet Area from Super Built-up area with builder loading %. Convert land measurement units across Sq Ft, Sq Mtr, Gaj, Guntha, Bigha, and Acre.',
    keywords: 'carpet area calculator, rera carpet area, super built up area, loading percentage calculator, sq ft to gaj converter',
    category: 'RealEstateCalculator',
    citation: 'Section 2(k) of Real Estate (Regulation and Development) Act, 2016',
    formula: 'RERA Carpet Area = Super Built-up Area / (1 + (Loading % / 100))',
    example: 'A flat with 1,200 sq.ft super built-up area and 25% builder loading has a true RERA usable carpet area of 960 sq.ft.',
    faqs: [
      {
        q: 'What is RERA Carpet Area?',
        a: 'Under RERA, carpet area is defined as the net usable floor area of an apartment, excluding walls, common areas, and external balconies.'
      }
    ]
  },
  {
    id: 'propertytax',
    slug: 'property-tax-calculator',
    name: 'Property Tax Calculator India: Municipal Tax for Mumbai, Bangalore, Delhi, Pune',
    shortName: 'Property Tax Calculator',
    description: 'Estimate annual municipal property tax online for Mumbai (BMC), Bangalore (BBMP), Delhi (MCD), Pune (PMC), Hyderabad (GHMC), and Chennai (GCC).',
    keywords: 'property tax calculator, bmc property tax, bbmp property tax calculator, mcd property tax, pmc property tax',
    category: 'RealEstateCalculator',
    citation: 'State Municipal Corporation Acts & Capital Value / Unit Area Systems',
    formula: 'Tax = Base Capital Value / Unit Rate × Built-up Area × Age Factor × Use Factor',
    example: 'Calculates the civic property tax for residential and commercial units across India’s top metropolitan municipal corporations.',
    faqs: [
      {
        q: 'What happens if I delay municipal property tax payment?',
        a: 'Most municipal corporations (such as BMC, BBMP, and MCD) levy a 1% to 2% monthly penal interest on unpaid property taxes.'
      }
    ]
  },
  {
    id: 'brokerage',
    slug: 'brokerage-calculator',
    name: 'Real Estate Brokerage Commission Calculator: Sale & Rental with GST and TDS',
    shortName: 'Brokerage & TDS Calculator',
    description: 'Calculate real estate agent brokerage fees for property sale and rental leases with 18% GST and 5% Section 194H TDS deduction.',
    keywords: 'brokerage calculator, real estate commission calculator, property broker commission, section 194h tds',
    category: 'RealEstateCalculator',
    citation: 'Section 194H Income Tax Act 1961 & CGST Act 2017',
    formula: 'Brokerage = Transaction Value × Commission %; Total = Brokerage + 18% GST - 5% TDS (if applicable)',
    example: 'On a ₹1 Crore property sale with 1% brokerage (₹1,00,000), 18% GST adds ₹18,000, bringing total bill to ₹1,18,000.',
    faqs: [
      {
        q: 'Is GST applicable on real estate brokerage in India?',
        a: 'Yes. Brokerage services attract 18% GST in India.'
      }
    ]
  },
  {
    id: 'rentalyield',
    slug: 'rental-yield-calculator',
    name: 'Rental Yield & Real Estate ROI Calculator: Gross & Net Property Returns',
    shortName: 'Rental Yield Calculator',
    description: 'Calculate gross and net rental yield, annual cash flow, and 10-year property appreciation CAGR for residential and commercial real estate investments.',
    keywords: 'rental yield calculator, property roi calculator, rental yield india, gross vs net rental yield',
    category: 'InvestmentCalculator',
    citation: 'Real Estate Appraisal Financial Modeling Principles',
    formula: 'Gross Yield = (Annual Rent / Total Property Cost) × 100; Net Yield = (Net Annual Rent - Expenses) / Total Cost × 100',
    example: 'A ₹75 Lakh flat generating ₹25,000/month (₹3,00,000/year) produces a gross rental yield of 4.0% and net yield of ~3.2% after maintenance and property tax.',
    faqs: [
      {
        q: 'What is an average residential rental yield in Indian metro cities?',
        a: 'Average residential rental yield in Indian cities like Mumbai, Bangalore, and Delhi-NCR ranges between 2.5% and 4.0% per annum.'
      }
    ]
  },
  {
    id: 'reralookup',
    slug: 'rera-project-lookup',
    name: 'RERA Project Lookup & State Directory: Verify Builder Compliance & Approvals',
    shortName: 'RERA Project Lookup',
    description: 'Search registered real estate projects across 20+ Indian State RERA portals (MahaRERA, UP RERA, K-RERA). Verify approved floor plans, builder escrow bank accounts, and legal checklists.',
    keywords: 'rera lookup, rera project search, maharera project lookup, up rera search, verify rera registration',
    category: 'RealEstateDirectory',
    citation: 'Section 4(2)(l)(D) of Real Estate (Regulation and Development) Act 2016',
    formula: 'Verification Checklist: RERA Number + Escrow Bank Account + OC Date + Quarterly Progress Reports',
    example: 'Provides direct official links and verification checklists for all 20+ State RERA regulatory authority websites.',
    faqs: [
      {
        q: 'Why must every Indian homebuyer verify RERA registration?',
        a: 'RERA registration legally binds developers to deposit 70% of buyer funds in an escrow account, complete projects on schedule, and face statutory penalties for project delays.'
      }
    ]
  },
  {
    id: 'rentalagreement',
    slug: 'rental-agreement-generator',
    name: 'Rental Agreement Generator: Free 11-Month Leave & License Draft Online',
    shortName: 'Rental Agreement Draft',
    description: 'Generate customized, legally formatted Indian residential and commercial leave and license agreements. Includes lock-in period, maintenance, deposit, and one-click PDF print.',
    keywords: 'rental agreement generator, rent agreement draft, leave and license agreement format, 11 month rent agreement',
    category: 'LegalDocumentGenerator',
    citation: 'Indian Easements Act 1882 & Registration Act 1908',
    formula: 'Standard 11-Month Non-Lease Tenancy Clauses pursuant to Indian Registration Law',
    example: 'Generates an immediate, printable residential agreement draft with security deposit refund clauses and notice periods.',
    faqs: [
      {
        q: 'Why are rent agreements in India typically drafted for 11 months?',
        a: 'Under Section 17 of the Registration Act 1908, leases exceeding 11 months require mandatory registration and higher stamp duty fees. An 11-month agreement avoids these requirements.'
      }
    ]
  },
  {
    id: 'prepay',
    slug: 'loan-prepayment-calculator',
    name: 'Home Loan Prepayment vs SIP Calculator: Prepay vs Invest Battlefield',
    shortName: 'Loan Prepay vs SIP Battle',
    description: 'Compare home loan prepayment against investing surplus in an equity Mutual Fund SIP. Calculate interest saved, tenure cut, and the exact debt-free crossover year where SIP portfolio surpasses outstanding loan debt.',
    keywords: 'home loan prepayment calculator, prepay vs sip, loan prepayment vs mutual fund, sbi home loan prepayment calculator, extra emi calculator, prepay home loan or invest in mutual fund',
    category: 'FinancialCalculator',
    citation: 'RBI Master Directions on Floating Rate Loans DBOD.No.Dir.BC.107/13.03.00/2011-12 & AMFI Compounding Guidelines',
    formula: 'Monthly Reducing Balance: Balance_{t} = (Balance_{t-1} × (1 + r)) - EMI - ExtraPrepayment; vs SIP FV = P × [((1+i)^n - 1)/i] × (1+i)',
    example: 'On a ₹50 Lakh home loan @ 8.50% for 20 years, paying just 1 extra EMI of ₹43,391 each year slashes loan tenure by 44 months and saves ₹11.2 Lakhs in interest. Alternatively, investing ₹5,000/month into an equity SIP @ 12% CAGR yields ₹49.9 Lakhs over the same period.',
    faqs: [
      {
        q: 'Is it better to prepay a home loan or invest in a Mutual Fund SIP in India?',
        a: 'Mathematically, if your expected post-tax equity SIP returns (typically 11% to 13% CAGR) exceed your home loan effective interest rate (typically 8.0% to 9.5%), investing surplus money in a SIP generates greater net wealth. However, prepayment offers guaranteed risk-free savings on interest and psychological freedom.'
      },
      {
        q: 'Are there prepayment penalties on home loans in India?',
        a: 'No. As per Reserve Bank of India (RBI) regulations, banks and housing finance companies (HFCs) cannot charge prepayment or foreclosure penalties on floating-rate individual home loans.'
      },
      {
        q: 'What is the crossover year in Loan Prepayment vs SIP?',
        a: 'The crossover year is the exact year in your loan tenure where the accumulated corpus of your parallel SIP investment matches or exceeds the outstanding principal balance of your home loan, giving you the choice to become debt-free in a single cheque.'
      }
    ]
  },
  {
    id: 'rentvsbuy',
    slug: 'rent-vs-buy-calculator',
    name: 'True Rent vs Buy Calculator India: Real Estate Opportunity Cost Engine',
    shortName: 'True Rent vs Buy Calculator',
    description: 'Evaluate whether buying a home or renting and investing in equity mutual funds builds more wealth in India. Factors down payment opportunity cost, stamp duty, maintenance, property tax, and 20-year net worth.',
    keywords: 'rent vs buy calculator, rent or buy home calculator india, real estate opportunity cost, buy vs rent apartment bangalore mumbai, house buying vs renting mutual fund returns',
    category: 'RealEstateCalculator',
    citation: 'National Housing Bank (NHB) RESIDEX Data & SEBI Wealth Creation Benchmark Studies',
    formula: 'Net Wealth (Buy) = Appreciated Property Value - Outstanding Principal; Net Wealth (Rent) = Initial Down Payment & Stamp Duty Compounded in Equity SIP + Compounded Monthly EMI Savings',
    example: 'Comparing an ₹80 Lakh apartment purchase (₹16L down payment + ₹5.6L stamp duty @ 8.5% EMI) against renting at ₹25,000/month: Investing the ₹21.6 Lakh upfront capital into an index SIP at 12% CAGR often generates ₹2.3 Crores in 15 years, outpacing real estate appreciation in top metros.',
    faqs: [
      {
        q: 'Why does renting often build more wealth than buying a house in Indian metro cities?',
        a: 'In Indian metros like Mumbai, Bangalore, and Gurgaon, rental yield is only 2.5% to 3.5%, while home loan interest is 8.5% to 9.0%. By renting and investing the 20% down payment and 6% stamp duty into equity mutual funds compounding at 12% to 14%, your compounding returns often surpass real estate capital appreciation.'
      },
      {
        q: 'What is the break-even year in Rent vs Buy analysis?',
        a: 'The break-even year is the point in time where the total net equity of homeownership (property value minus remaining loan debt) surpasses the accumulated investment corpus of a disciplined renter.'
      },
      {
        q: 'How does tax deduction under Section 24(b) impact the decision?',
        a: 'Section 24(b) provides up to ₹2 Lakh annual deduction on home loan interest under the Old Tax Regime. However, under the New Tax Regime (which most taxpayers now choose), Section 24(b) deductions for self-occupied properties are not available, tilting the mathematical balance further towards renting and investing.'
      }
    ]
  }
];

// 2. Guide Categories
const categories = [
  {
    id: 'investment',
    title: 'Investment Guides: Stocks, Mutual Funds, Algos & Wealth Strategies',
    subtitle: 'Explore 33 expert investment guides covering AI trading bots, no-code algorithmic portfolios, SIP compounding, mutual fund vs gold comparison, and SGB strategies in India.'
  },
  {
    id: 'loans',
    title: 'Loan & Debt Guides: Home Loans, FOIR, Prepayments & CIBIL',
    subtitle: 'Explore 17 practical borrowing guides on reducing home loan interest, calculating bank FOIR ratios, debt avalanche methods, and boosting CIBIL credit score.'
  },
  {
    id: 'realestate',
    title: 'Real Estate Guides: Stamp Duty, RERA, Capital Gains & Property',
    subtitle: 'Explore 14 in-depth property guides on state-wise stamp duty, Budget 2024 property capital gains tax, Construction Linked Plans (CLP), and RERA project verification.'
  },
  {
    id: 'retirement',
    title: 'Retirement & Pension Guides: NPS, EPF, PPF & Senior Citizen Plans',
    subtitle: 'Explore 14 sovereign retirement guides comparing NPS vs PPF vs EPF, Unified Pension Scheme (UPS), Senior Citizen Savings Scheme (SCSS), and SWP pension strategies.'
  },
  {
    id: 'tax',
    title: 'Tax Slabs & Exemption Guides: Old vs New Regime & Section 80C',
    subtitle: 'Explore 11 comprehensive income tax guides breaking down Union Budget tax slabs, Standard Deduction ₹75,000, Section 80C limits, and Capital Gains exemptions.'
  }
];

// 3. Static Pages
const staticPages = [
  {
    path: 'about-us',
    title: 'About Us | RupeeBuddy.in - Free Indian Financial Tools',
    description: 'Learn about RupeeBuddy.in. Our mission is to provide clean, interactive, math-driven personal finance calculators with 100% data privacy.',
    h1: 'About Us - RupeeBuddy.in',
    content: '<p>RupeeBuddy.in provides free, private, client-side financial and real estate calculators designed specifically for Indian taxpayers, homebuyers, and retail investors.</p>'
  },
  {
    path: 'editorial-policy',
    title: 'Editorial Policy & Financial Standards | RupeeBuddy.in',
    description: 'RupeeBuddy editorial guidelines, mathematical verification protocols, and statutory citation framework vetted by Chartered Accountants and SEBI RIAs.',
    h1: 'RupeeBuddy Editorial Policy & Financial Standards',
    content: '<p>Every financial formula, tax slab computation, and real estate legal guideline on RupeeBuddy is vetted by practicing Chartered Accountants (FCA/ACA) and SEBI-Registered Investment Advisors.</p>'
  },
  {
    path: 'privacy-policy',
    title: 'Privacy Policy | RupeeBuddy.in',
    description: 'Read our privacy policy. We commit to a zero-data-collection policy for all our financial calculator tools. Your data remains on your local browser.',
    h1: 'Privacy Policy',
    content: '<p>RupeeBuddy enforces 100% client-side privacy. All calculations run strictly inside your browser. No financial data, income numbers, or loan amounts are transmitted to any server.</p>'
  },
  {
    path: 'contact-us',
    title: 'Contact Us & Support | RupeeBuddy.in',
    description: 'Get in touch with the RupeeBuddy team for inquiries, feature requests, or calculator feedback.',
    h1: 'Contact Us & Support',
    content: '<p>Reach out to the RupeeBuddy engineering and editorial team at contact@rupeebuddy.in for calculator feedback, partnership inquiries, or feature suggestions.</p>'
  }
];

/**
 * Extracts all unique articles from the suites and Blogs.jsx
 */
function extractAllArticles() {
  const files = [
    'src/components/pages/Blogs.jsx',
    'src/components/pages/newTrendingArticles.jsx',
    'src/components/pages/latestTrendingPosts.jsx',
    'src/components/pages/featuredFinanceArticles.jsx',
    'src/components/pages/topTrendingPostsPart1.jsx',
    'src/components/pages/topTrendingPostsPart2.jsx',
    'src/components/pages/strategicFinancePosts.jsx',
    'src/components/pages/trendingPostsSuitePart1.jsx',
    'src/components/pages/trendingPostsSuitePart2.jsx'
  ];

  const articlesMap = new Map();

  files.forEach(relPath => {
    const fullPath = path.join(rootDir, relPath);
    if (!fs.existsSync(fullPath)) return;

    const content = fs.readFileSync(fullPath, 'utf8');
    const blocks = content.split(/\{\s*id:\s*['"]/);

    blocks.slice(1).forEach(block => {
      const idMatch = block.match(/^([a-zA-Z0-9\-_]+)['"]/);
      if (!idMatch) return;
      const id = idMatch[1];
      if (['all', 'investment', 'loans', 'realestate', 'retirement', 'tax'].includes(id)) return;

      const titleMatch = block.match(/title:\s*['"](.*?)['"]/);
      const catMatch = block.match(/category:\s*['"](.*?)['"]/);
      const snipMatch = block.match(/snippet:\s*['"]([\s\S]*?)['"]/);

      if (titleMatch && !articlesMap.has(id)) {
        articlesMap.set(id, {
          id,
          title: titleMatch[1].replace(/\\'/g, "'"),
          category: catMatch ? catMatch[1] : 'all',
          snippet: snipMatch ? snipMatch[1].replace(/\\n/g, ' ').replace(/\\'/g, "'").trim() : ''
        });
      }
    });
  });

  return Array.from(articlesMap.values());
}

/**
 * Main Prerender Routine
 */
async function prerender() {
  console.log('🚀 Starting RupeeBuddy Static Site Prerendering & SSG Engine...');

  const indexPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('❌ dist/index.html not found! Run "vite build" first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexPath, 'utf8');
  const sitemapUrls = [];

  // Helper to write file in nested directory
  function writeHtmlFile(subPath, htmlContent) {
    const fullDir = path.join(distDir, subPath);
    if (!fs.existsSync(fullDir)) {
      fs.mkdirSync(fullDir, { recursive: true });
    }
    fs.writeFileSync(path.join(fullDir, 'index.html'), htmlContent, 'utf8');
  }

  // 1. Home Page
  sitemapUrls.push({
    loc: `${HOST}/`,
    priority: '1.0',
    changefreq: 'weekly'
  });

  // 2. Prerender All 21 Calculators
  console.log(`📦 Prerendering ${calculators.length} Calculators with rich SEO & schemas...`);
  calculators.forEach(calc => {
    const canonicalUrl = `${HOST}/calculators/${calc.slug}`;
    sitemapUrls.push({
      loc: canonicalUrl,
      priority: '0.9',
      changefreq: 'monthly'
    });

    const webAppSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": `${calc.name} | RupeeBuddy`,
      "description": calc.description,
      "url": canonicalUrl,
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "All",
      "inLanguage": "en-IN",
      "isAccessibleForFree": true,
      "author": {
        "@type": "Organization",
        "name": "RupeeBuddy Research Team",
        "url": `${HOST}/about-us`
      },
      "reviewedBy": {
        "@type": "Person",
        "name": "RupeeBuddy Financial Review Panel",
        "jobTitle": "Chartered Accountants & Financial Advisors",
        "sameAs": `${HOST}/editorial-policy`
      },
      "publisher": {
        "@type": "Organization",
        "name": "RupeeBuddy",
        "url": HOST,
        "logo": {
          "@type": "ImageObject",
          "url": `${HOST}/favicon.svg`
        }
      }
    };

    if (calc.citation) {
      webAppSchema.citation = calc.citation;
    }

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${HOST}/` },
        { "@type": "ListItem", "position": 2, "name": "Calculators", "item": `${HOST}/` },
        { "@type": "ListItem", "position": 3, "name": calc.shortName, "item": canonicalUrl }
      ]
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": calc.faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    };

    // Semantic HTML injected into <div id="root">
    const semanticFallbackHtml = `
      <div class="prerender-fallback-content" style="max-width: 1200px; margin: 0 auto; padding: 24px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <header style="margin-bottom: 24px;">
          <h1 style="font-size: 26px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">${calc.name}</h1>
          <p style="font-size: 15px; color: #475569; line-height: 1.6;">${calc.description}</p>
        </header>

        <section style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <h2 style="font-size: 18px; font-weight: 700; color: #1e3a8a; margin-bottom: 8px;">Direct Answer & Calculation Formula</h2>
          <p style="font-size: 14px; font-weight: 600; color: #0f172a; margin-bottom: 8px;"><strong>Formula:</strong> <code>${calc.formula}</code></p>
          <p style="font-size: 14px; color: #334155; line-height: 1.6;"><strong>Worked Example:</strong> ${calc.example}</p>
          <p style="font-size: 12px; color: #64748b; margin-top: 8px;"><em>Statutory / Regulatory Citation:</em> ${calc.citation || 'Governed by Indian Financial & Banking Standards'}</p>
        </section>

        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">Frequently Asked Questions</h2>
          <div style="display: flex; flex-direction: column; gap: 14px;">
            ${calc.faqs.map(f => `
              <div style="border-left: 3px solid #2563eb; padding-left: 14px;">
                <h3 style="font-size: 15px; font-weight: 700; color: #1e293b; margin-bottom: 4px;">${f.q}</h3>
                <p style="font-size: 14px; color: #475569; line-height: 1.5; margin: 0;">${f.a}</p>
              </div>
            `).join('')}
          </div>
        </section>

        <footer style="padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
          <p>Reviewed by RupeeBuddy Financial Review Panel (FCA / CFP). 100% Client-Side Private Computation.</p>
        </footer>
      </div>
    `;

    // Construct full HTML
    let pageHtml = baseHtml;
    pageHtml = pageHtml.replace(/<title>.*?<\/title>/i, `<title>${calc.name} | RupeeBuddy</title>`);
    pageHtml = pageHtml.replace(/<meta name="description" content=".*?"/i, `<meta name="description" content="${calc.description}"`);
    pageHtml = pageHtml.replace(/<meta name="keywords" content=".*?"/i, `<meta name="keywords" content="${calc.keywords}"`);
    pageHtml = pageHtml.replace(/<link rel="canonical" href=".*?"/i, `<link rel="canonical" href="${canonicalUrl}"`);

    // Inject Schemas
    const schemasTag = `
      <script type="application/ld+json">${JSON.stringify(webAppSchema)}</script>
      <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
      <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
    `;
    pageHtml = pageHtml.replace('</head>', `${schemasTag}\n</head>`);

    // Inject Semantic Fallback into root
    pageHtml = pageHtml.replace('<div id="root">', `<div id="root">${semanticFallbackHtml}`);

    // Write Primary Path: dist/calculators/:slug/index.html
    writeHtmlFile(`calculators/${calc.slug}`, pageHtml);
    // Write Alias Path: dist/calculators/:id/index.html
    writeHtmlFile(`calculators/${calc.id}`, pageHtml);
    // Write Root Alias Path: dist/:id/index.html (e.g. /tax or /emi)
    writeHtmlFile(calc.id, pageHtml);
  });

  // 3. Prerender Static Pages
  console.log(`📄 Prerendering ${staticPages.length} Static & Legal/E-E-A-T pages...`);
  staticPages.forEach(p => {
    const canonicalUrl = `${HOST}/${p.path}`;
    sitemapUrls.push({
      loc: canonicalUrl,
      priority: '0.6',
      changefreq: 'monthly'
    });

    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": p.title,
      "description": p.description,
      "url": canonicalUrl,
      "inLanguage": "en-IN"
    };

    let pageHtml = baseHtml;
    pageHtml = pageHtml.replace(/<title>.*?<\/title>/i, `<title>${p.title}</title>`);
    pageHtml = pageHtml.replace(/<meta name="description" content=".*?"/i, `<meta name="description" content="${p.description}"`);
    pageHtml = pageHtml.replace(/<link rel="canonical" href=".*?"/i, `<link rel="canonical" href="${canonicalUrl}"`);
    pageHtml = pageHtml.replace('</head>', `<script type="application/ld+json">${JSON.stringify(webPageSchema)}</script>\n</head>`);
    pageHtml = pageHtml.replace('<div id="root">', `<div id="root"><main style="max-width: 1000px; margin: 0 auto; padding: 24px 16px;"><h1>${p.h1}</h1>${p.content}</main>`);

    writeHtmlFile(p.path, pageHtml);
  });

  // 4. Prerender Guide Hub & Categories
  console.log(`📚 Prerendering Guide Hub & ${categories.length} Categories...`);
  sitemapUrls.push({
    loc: `${HOST}/guides`,
    priority: '0.8',
    changefreq: 'weekly'
  });

  let hubHtml = baseHtml;
  hubHtml = hubHtml.replace(/<title>.*?<\/title>/i, `<title>Financial Guides & Wealth Library | RupeeBuddy.in</title>`);
  hubHtml = hubHtml.replace(/<meta name="description" content=".*?"/i, `<meta name="description" content="Explore comprehensive personal finance guides covering income tax planning, mutual fund compounding, home loans, and real estate laws in India."`);
  hubHtml = hubHtml.replace(/<link rel="canonical" href=".*?"/i, `<link rel="canonical" href="${HOST}/guides"`);
  writeHtmlFile('guides', hubHtml);

  categories.forEach(cat => {
    const canonicalUrl = `${HOST}/guides/${cat.id}`;
    sitemapUrls.push({
      loc: canonicalUrl,
      priority: '0.8',
      changefreq: 'weekly'
    });

    let catHtml = baseHtml;
    catHtml = catHtml.replace(/<title>.*?<\/title>/i, `<title>${cat.title} | RupeeBuddy.in</title>`);
    catHtml = catHtml.replace(/<meta name="description" content=".*?"/i, `<meta name="description" content="${cat.subtitle}"`);
    catHtml = catHtml.replace(/<link rel="canonical" href=".*?"/i, `<link rel="canonical" href="${canonicalUrl}"`);
    writeHtmlFile(`guides/${cat.id}`, catHtml);
  });

  // 5. Extract & Prerender All 159+ Articles
  const articles = extractAllArticles();
  console.log(`✍️ Prerendering ${articles.length} Individual Financial Articles...`);

  articles.forEach(art => {
    const canonicalUrl = `${HOST}/guides/${art.id}`;
    sitemapUrls.push({
      loc: canonicalUrl,
      priority: '0.8',
      changefreq: 'monthly'
    });

    const blogPostingSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": art.title,
      "description": art.snippet,
      "image": [`${HOST}/favicon.svg`],
      "datePublished": "2026-08-14T00:00:00Z",
      "inLanguage": "en-IN",
      "author": {
        "@type": "Organization",
        "name": "RupeeBuddy Financial Review Panel",
        "url": `${HOST}/editorial-policy`
      },
      "publisher": {
        "@type": "Organization",
        "name": "RupeeBuddy",
        "logo": {
          "@type": "ImageObject",
          "url": `${HOST}/favicon.svg`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      }
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${HOST}/` },
        { "@type": "ListItem", "position": 2, "name": "Financial Guides", "item": `${HOST}/guides` },
        { "@type": "ListItem", "position": 3, "name": art.category, "item": `${HOST}/guides/${art.category}` },
        { "@type": "ListItem", "position": 4, "name": art.title, "item": canonicalUrl }
      ]
    };

    let artHtml = baseHtml;
    artHtml = artHtml.replace(/<title>.*?<\/title>/i, `<title>${art.title} | RupeeBuddy Financial Guides</title>`);
    artHtml = artHtml.replace(/<meta name="description" content=".*?"/i, `<meta name="description" content="${art.snippet.replace(/"/g, '&quot;')}"`);
    artHtml = artHtml.replace(/<link rel="canonical" href=".*?"/i, `<link rel="canonical" href="${canonicalUrl}"`);

    const schemasTag = `
      <script type="application/ld+json">${JSON.stringify(blogPostingSchema)}</script>
      <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
    `;
    artHtml = artHtml.replace('</head>', `${schemasTag}\n</head>`);

    const fallbackArticleHtml = `
      <article style="max-width: 900px; margin: 0 auto; padding: 24px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <header style="margin-bottom: 20px;">
          <div style="font-size: 13px; color: #2563eb; font-weight: 700; text-transform: uppercase;">${art.category} Guide</div>
          <h1 style="font-size: 28px; font-weight: 800; color: #0f172a; margin: 8px 0 12px 0;">${art.title}</h1>
          <p style="font-size: 16px; color: #475569; line-height: 1.6;">${art.snippet}</p>
        </header>
        <footer style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #64748b;">
          <p>Reviewed by RupeeBuddy Editorial Review Board. For informational purposes only.</p>
        </footer>
      </article>
    `;
    artHtml = artHtml.replace('<div id="root">', `<div id="root">${fallbackArticleHtml}`);

    writeHtmlFile(`guides/${art.id}`, artHtml);
  });

  // 6. Build Clean XML Sitemap
  console.log(`🗺️ Generating Unified XML Sitemap with ${sitemapUrls.length} clean URLs...`);
  const currentDate = new Date().toISOString().split('T')[0];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xmlContent, 'utf8');
  fs.writeFileSync(path.join(rootDir, 'public', 'sitemap.xml'), xmlContent, 'utf8');

  // Copy updated 404.html to dist
  const p404 = path.join(rootDir, 'public', '404.html');
  if (fs.existsSync(p404)) {
    fs.copyFileSync(p404, path.join(distDir, '404.html'));
  }

  console.log(`✅ Prerendering completed successfully! Generated ${sitemapUrls.length} clean static pages and updated sitemap.xml.`);
}

prerender().catch(err => {
  console.error('❌ Error during prerendering:', err);
  process.exit(1);
});

