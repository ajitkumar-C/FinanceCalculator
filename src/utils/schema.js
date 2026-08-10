/**
 * Utility to dynamically inject JSON-LD Schema markup into the head element.
 * This is crucial for rich search snippets and high organic Google search ranking.
 */

const schemas = {
  emi: {
    name: "Home/Car/Personal Loan EMI Calculator",
    description: "Calculate monthly Equated Monthly Installments (EMIs) for home loans, car loans, and personal loans in India. View total interest payable and repayment schedules.",
    category: "FinancialCalculator",
  },
  eligibility: {
    name: "Loan Eligibility Calculator",
    description: "Check your home loan and personal loan eligibility based on monthly income, existing EMIs, interest rate, and tenure.",
    category: "FinancialCalculator",
  },
  ppf: {
    name: "Public Provident Fund (PPF) Calculator",
    description: "Calculate PPF interest earnings and maturity amount. Plan your tax-free savings with the latest PPF interest rate of 7.1%.",
    category: "InvestmentCalculator",
  },
  pf: {
    name: "Employee Provident Fund (EPF) Calculator",
    description: "Calculate your EPF corpus at retirement based on basic monthly salary, employee & employer contributions, annual salary growth, and EPF interest rates.",
    category: "RetirementCalculator",
  },
  sip: {
    name: "SIP (Systematic Investment Plan) Calculator",
    description: "Calculate maturity wealth and estimated returns of your mutual fund SIP investments online based on monthly investment, rate of return, and tenure.",
    category: "InvestmentCalculator",
  },
  fd: {
    name: "Fixed Deposit (FD) Calculator",
    description: "Calculate Fixed Deposit (FD) interest and maturity amount with monthly, quarterly, half-yearly, or yearly compounding options in India.",
    category: "SavingsCalculator",
  },
  rd: {
    name: "Recurring Deposit (RD) Calculator",
    description: "Calculate Recurring Deposit (RD) maturity amount and interest earned using Indian quarterly compounding banking standards.",
    category: "SavingsCalculator",
  },
  nps: {
    name: "National Pension Scheme (NPS) Calculator",
    description: "Calculate NPS maturity corpus, tax-free lump sum amount, and estimated monthly pension based on contributions, age, and equity/debt returns.",
    category: "RetirementCalculator",
  },
  retirement: {
    name: "Retirement Goal Planning Calculator",
    description: "Calculate your target retirement corpus adjusted for inflation. Find out how much you need to save monthly to achieve financial independence.",
    category: "RetirementCalculator",
  },
  tax: {
    name: "Income Tax Calculator (FY 2026-27 / AY 2027-28)",
    description: "Compare tax liability under the Old Tax Regime vs New Tax Regime with latest budget slabs, standard deductions, and tax rebate under Section 87A.",
    category: "TaxCalculator",
  },
  mutualfund: {
    name: "Mutual Fund Returns Calculator",
    description: "Calculate mutual fund returns for SIP and lump sum investments. Estimate future portfolio value based on expected annual return rate.",
    category: "InvestmentCalculator",
  },
  compound: {
    name: "Compound Interest Calculator",
    description: "Calculate compound interest for various compounding frequencies (daily, monthly, quarterly, half-yearly, or annually) with growth visualization.",
    category: "SavingsCalculator",
  },
  home: {
    name: "Indian Financial Calculators Dashboard",
    description: "Calculate Home/Car Loan EMI, compare Income Tax regimes, plan Retirement corpus, calculate SIP growth, EPF savings, and check PPF interest rates with our free tools.",
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
