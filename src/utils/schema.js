/**
 * Utility to dynamically inject JSON-LD Schema markup into the head element.
 * This is crucial for rich search snippets and high organic Google search ranking.
 */

const schemas = {
  emi: {
    name: "EMI Calculator: Home Loan, Car Loan & Personal Loan EMI Calculator",
    description: "Use our free online EMI calculator to estimate Equated Monthly Installments (EMIs) for SBI, HDFC, and Axis home loans, car loans, and personal loans in India instantly. View total interest payable and repayment schedules.",
    category: "FinancialCalculator",
  },
  eligibility: {
    name: "Loan Eligibility Calculator: Home Loan & Personal Loan Eligibility Checker",
    description: "Check your loan eligibility online. Calculate home loan and personal loan eligibility based on basic salary, existing EMIs, FOIR, and bank lending terms.",
    category: "FinancialCalculator",
  },
  ppf: {
    name: "PPF Calculator: Public Provident Fund Calculator Online",
    description: "Calculate your PPF interest returns and maturity corpus using this online Public Provident Fund calculator. Plan your tax-free savings with the latest PPF interest rates of 7.1%.",
    category: "InvestmentCalculator",
  },
  pf: {
    name: "EPF Calculator: Online PF Calculator & Provident Fund Calculator",
    description: "Estimate your Employee Provident Fund (EPF) balance and voluntary retirement corpus. Check accumulated interest and employer contribution using this free online PF calculator.",
    category: "RetirementCalculator",
  },
  sip: {
    name: "SIP Calculator: Systematic Investment Plan Return Calculator Online",
    description: "Calculate maturity wealth and compounding returns on mutual fund Systematic Investment Plans (SIP) and Step-up SIP investments with our free online calculator.",
    category: "InvestmentCalculator",
  },
  fd: {
    name: "FD Calculator: Fixed Deposit Interest Calculator Online",
    description: "Calculate SBI, HDFC, and Post Office Fixed Deposit (FD) interest and maturity amount using our online fixed deposit return calculator with quarterly or monthly compounding.",
    category: "SavingsCalculator",
  },
  rd: {
    name: "RD Calculator: Recurring Deposit Calculator Online",
    description: "Calculate Recurring Deposit (RD) interest earnings and maturity values using our online RD calculator according to quarterly compounding banking standards.",
    category: "SavingsCalculator",
  },
  nps: {
    name: "NPS Calculator: National Pension Scheme Online Calculator",
    description: "Calculate your National Pension Scheme (NPS) Tier 1 & Tier 2 maturity corpus, lump-sum tax-free withdrawals, and monthly annuity payouts with the best NPS calculator.",
    category: "RetirementCalculator",
  },
  retirement: {
    name: "Retirement Planner: Pension Planner & Retirement Planning Tools",
    description: "Plan your financial independence with this free retirement planner. Estimate your required pension corpus and monthly savings adjusted for inflation.",
    category: "RetirementCalculator",
  },
  tax: {
    name: "Income Tax Calculator: Old vs New Tax Regime Slabs & Savings",
    description: "Compare your tax liabilities under the Old vs New Tax Regime for FY 2026-27 (AY 2027-28). Estimate standard deductions and tax rebates under Section 87A instantly.",
    category: "TaxCalculator",
  },
  mutualfund: {
    name: "Mutual Fund Calculator: Lumpsum & SIP Growth Calculator",
    description: "Estimate your mutual fund returns online. Calculate lumpsum investments and Systematic Investment Plan (SIP) growth based on historical CAGR returns.",
    category: "InvestmentCalculator",
  },
  compound: {
    name: "Compound Interest Calculator: Daily, Monthly & Yearly Compounding",
    description: "Calculate compound interest online with daily, monthly, quarterly, or yearly compounding frequencies using our free investment compounding calculator.",
    category: "SavingsCalculator",
  },
  home: {
    name: "RupeeBuddy.in: Indian Financial Calculators & Wealth Dashboard",
    description: "Calculate Home/Car Loan EMI, compare Income Tax regimes, plan Retirement corpus, calculate SIP growth, EPF savings, and check PPF interest rates with our free online tools.",
    category: "FinancialSuite",
  },
  about: {
    name: "About Us | RupeeBuddy.in",
    description: "Learn more about RupeeBuddy.in. Our mission is to provide clean, interactive, math-driven personal finance calculators with 100% data privacy.",
    category: "AboutPage",
  },
  privacy: {
    name: "Privacy Policy | RupeeBuddy.in",
    description: "Read our privacy policy. We commit to a zero-data-collection policy for all our financial calculator tools. Your data remains on your local browser.",
    category: "PrivacyPage",
  },
  contact: {
    name: "Contact Us | RupeeBuddy.in",
    description: "Have questions, feedback, or suggestion about our calculators? Contact the RupeeBuddy.in support team directly.",
    category: "ContactPage",
  },
  blogs: {
    name: "Financial Guides & Investment Strategies",
    description: "Explore 18 expert financial guides and articles on income tax planning, mutual fund compound interest growth, retirement corpus accumulation, and debt reduction strategies in India.",
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
}
