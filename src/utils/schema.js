/**
 * Utility to dynamically inject JSON-LD Schema markup into the head element.
 * This is crucial for rich search snippets and high organic Google search ranking.
 */

const schemas = {
  emi: {
    name: "EMI Calculator: Home Loan, Car Loan & Personal Loan EMI Calculator",
    description: "Use our free online EMI calculator to estimate Equated Monthly Installments (EMIs) for SBI, HDFC, and Axis home loans, car loans, and personal loans in India instantly. View total interest payable and repayment schedules.",
    keywords: "emi calculator, home loan emi, car loan emi, personal loan emi, emi cal, sbi home loan emi calculator, vehicle loan emi, auto emi",
    category: "FinancialCalculator",
  },
  eligibility: {
    name: "Loan Eligibility Calculator: Home Loan & Personal Loan Eligibility Checker",
    description: "Check your loan eligibility online. Calculate home loan and personal loan eligibility based on basic salary, existing EMIs, FOIR, and bank lending terms.",
    keywords: "loan eligibility, loan eligibility calculator, home loan eligibility, personal loan eligibility, foir calculator, check loan eligibility, sbi home loan eligibility based on salary",
    category: "FinancialCalculator",
  },
  ppf: {
    name: "PPF Calculator: Public Provident Fund Calculator Online",
    description: "Calculate your PPF interest returns and maturity corpus using this online Public Provident Fund calculator. Plan your tax-free savings with the latest PPF interest rates of 7.1%.",
    keywords: "ppf calculator, public provident fund calculator, ppf calculation, ppf interest rate, ppf online, ppf return calculator",
    category: "InvestmentCalculator",
  },
  pf: {
    name: "EPF Calculator: Online PF Calculator & Provident Fund Calculator",
    description: "Estimate your Employee Provident Fund (EPF) balance and voluntary retirement corpus. Check accumulated interest and employer contribution using this free online PF calculator.",
    keywords: "pf calculator, epf calculator, online pf calculator, provident fund calculator, epf interest rate, pf balance checker, voluntary provident fund",
    category: "RetirementCalculator",
  },
  sip: {
    name: "SIP Calculator: Systematic Investment Plan Return Calculator Online",
    description: "Calculate maturity wealth and compounding returns on mutual fund Systematic Investment Plans (SIP) and Step-up SIP investments with our free online calculator.",
    keywords: "sip calculator, step up sip, systematic investment plan, sip return calculator, systematic investment calculator, sip plan calculator, groww sip calculator",
    category: "InvestmentCalculator",
  },
  fd: {
    name: "FD Calculator: Fixed Deposit Interest Calculator Online",
    description: "Calculate SBI, HDFC, and Post Office Fixed Deposit (FD) interest and maturity amount using our online fixed deposit return calculator with quarterly or monthly compounding.",
    keywords: "fd calculator, fixed deposit calculator, fd interest rates hdfc, fd rates in hdfc bank, sbi fd calculator, post office fd interest rate, fd compounding calculator",
    category: "SavingsCalculator",
  },
  rd: {
    name: "RD Calculator: Recurring Deposit Calculator Online",
    description: "Calculate Recurring Deposit (RD) interest earnings and maturity values using our online RD calculator according to quarterly compounding banking standards.",
    keywords: "rd calculator, recurring deposit calculator, rd account calculator, rd interest rate, post office rd calculator, sbi rd interest calculator",
    category: "SavingsCalculator",
  },
  nps: {
    name: "NPS Calculator: National Pension Scheme Online Calculator",
    description: "Calculate your National Pension Scheme (NPS) Tier 1 & Tier 2 maturity corpus, lump-sum tax-free withdrawals, and monthly annuity payouts with the best NPS calculator.",
    keywords: "nps calculator, nps calculator online, nps calculation formula, national pension scheme, nps tier 1, nps tier 2, best nps calculator, pension calculator",
    category: "RetirementCalculator",
  },
  retirement: {
    name: "Retirement Planner: Pension Planner & Retirement Planning Tools",
    description: "Plan your financial independence with this free retirement planner. Estimate your required pension corpus and monthly savings adjusted for inflation.",
    keywords: "retirement planner, pension planner, retirement planning tools, retirement corpus, financial independence retirement, early retirement calculator",
    category: "RetirementCalculator",
  },
  tax: {
    name: "Income Tax Calculator: Old vs New Tax Regime Slabs & Savings",
    description: "Compare your tax liabilities under the Old vs New Tax Regime for FY 2026-27 (AY 2027-28). Estimate standard deductions and tax rebates under Section 87A instantly.",
    keywords: "income tax calculator, old vs new tax regime, tax slabs FY 2026-27, section 87A rebate, tax slabs India, income tax calculator FY 2026-27",
    category: "TaxCalculator",
  },
  mutualfund: {
    name: "Mutual Fund Calculator: Lumpsum & SIP Growth Calculator",
    description: "Estimate your mutual fund returns online. Calculate lumpsum investments and Systematic Investment Plan (SIP) growth based on historical CAGR returns.",
    keywords: "mutual fund calculator, lumpsum mutual fund calculator, mf calculator, mutual fund return calculator, mutual fund cagr, mutual fund growth calculator",
    category: "InvestmentCalculator",
  },
  compound: {
    name: "Compound Interest Calculator: Daily, Monthly & Yearly Compounding",
    description: "Calculate compound interest online with daily, monthly, quarterly, or yearly compounding frequencies using our free investment compounding calculator.",
    keywords: "compound interest calculator, daily compound interest, compound interest formula, compound savings calculator, interest on interest calculator, accumulated interest",
    category: "SavingsCalculator",
  },
  home: {
    name: "RupeeBuddy.in: Indian Financial Calculators & Wealth Dashboard",
    description: "Calculate Home/Car Loan EMI, compare Income Tax regimes, plan Retirement corpus, calculate SIP growth, EPF savings, and check PPF interest rates with our free online tools.",
    keywords: "finance calculator, emi calculator, sip calculator, income tax calculator, old vs new tax regime, ppf calculator, epf calculator, nps calculator, india finance, rupeebuddy",
    category: "FinancialSuite",
  },
  about: {
    name: "About Us | RupeeBuddy.in",
    description: "Learn more about RupeeBuddy.in. Our mission is to provide clean, interactive, math-driven personal finance calculators with 100% data privacy.",
    keywords: "about rupeebuddy, personal finance india, zero data collection, about us rupeebuddy",
    category: "AboutPage",
  },
  privacy: {
    name: "Privacy Policy | RupeeBuddy.in",
    description: "Read our privacy policy. We commit to a zero-data-collection policy for all our financial calculator tools. Your data remains on your local browser.",
    keywords: "privacy policy rupeebuddy, zero tracking, ad free finance, gdpr compliance, cookie policy",
    category: "PrivacyPage",
  },
  contact: {
    name: "Contact Us | RupeeBuddy.in",
    description: "Have questions, feedback, or suggestion about our calculators? Contact the RupeeBuddy.in support team directly.",
    keywords: "contact rupeebuddy, support team, email rupeebuddy, support page",
    category: "ContactPage",
  },
  blogs: {
    name: "Financial Guides & Investment Strategies",
    description: "Explore 18 expert financial guides and articles on income tax planning, mutual fund compound interest growth, retirement corpus accumulation, and debt reduction strategies in India.",
    keywords: "finance guides, investment articles, wealth strategies india, personal finance blogs, saving tips",
    category: "FinanceGuides",
  }
};

export function injectCalculatorSchema(calculatorId) {
  // 1. Remove existing schema if any
  const existingScript = document.getElementById("calculator-schema");
  if (existingScript) {
    existingScript.remove();
  }

  const details = schemas[calculatorId];
  if (!details) return;

  // 2. Create schema object
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `${details.name} - RupeeBuddy.in`,
    "description": details.description,
    "url": window.location.href,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "featureList": [
      "Real-time calculations as sliders move",
      "Interactive pie charts and bar graphs",
      "Printable PDF reports",
      "Optimized for Indian financial terms and schemes"
    ],
    "about": {
      "@type": "Thing",
      "name": details.name,
      "description": details.description
    }
  };

  // 3. Inject into head
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = "calculator-schema";
  script.text = JSON.stringify(schemaData, null, 2);
  document.head.appendChild(script);

  // 4. Update Meta Page Title and Meta Description for SEO
  document.title = `${details.name} | Indian Financial Calculator`;
  
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = "description";
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = details.description;

  // 5. Update Meta Keywords for SEO
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.name = "keywords";
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.content = details.keywords;
}
