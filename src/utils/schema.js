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
    name: "Loan Eligibility & FOIR Calculator: Calculate Maximum Borrowing Limit",
    description: "Check your loan eligibility and compute your Fixed Obligation to Income Ratio (FOIR). Calculate home loan and personal loan eligibility based on salary, existing EMIs, and bank FOIR norms.",
    keywords: "loan eligibility, loan eligibility calculator, foir calculator, foir calculation, home loan eligibility, personal loan eligibility, check loan eligibility, sbi home loan eligibility based on salary",
    category: "FinancialCalculator",
  },
  clp: {
    name: "Construction Linked Plan Calculator: Stage-Wise Payment & Pre-EMI Calculator",
    description: "Calculate stage-wise construction linked payment demands, Pre-EMI monthly interest, and bank loan disbursals for under-construction flats and buildings in Maharashtra (MahaRERA).",
    keywords: "construction linked plan calculator, clp calculator, pre emi calculator, slab wise payment calculator, maharera payment schedule, under construction flat calculator, building construction payment plan, pre emi vs full emi calculator",
    category: "FinancialCalculator",
  },
  ppf: {
    name: "PPF Calculator: Public Provident Fund Calculator Online",
    description: "Calculate your PPF interest returns and maturity corpus using this online Public Provident Fund calculator. Plan your tax-free savings with the latest PPF interest rates of 7.1%.",
    keywords: "ppf calculator, public provident fund calculator, ppf calculation, ppf interest rate, ppf online, ppf return calculator",
    category: "InvestmentCalculator",
  },
  pf: {
    name: "EPF / PF Calculator: Calculate PF Balance & 8.25% Interest",
    description: "Calculate your Employee Provident Fund (EPF) balance, monthly employee & employer contribution, and 8.25% annual interest. Estimate total retirement corpus online.",
    keywords: "epf calculator, pf calculator, online pf calculator, pf balance calculator, epf interest rate 8.25, provident fund calculator, epf balance check online",
    category: "RetirementCalculator",
  },
  sip: {
    name: "SIP Calculator: Calculate Mutual Fund Returns & Wealth Growth",
    description: "Free SIP return calculator with visual charts. Calculate expected maturity wealth, returns, and compounding growth for monthly mutual fund SIPs instantly.",
    keywords: "sip calculator, sip return calculator, systematic investment plan, mutual fund sip calculator, sip compounding calculator, sip wealth planner, step up sip",
    category: "InvestmentCalculator",
  },
  fd: {
    name: "FD Calculator: Fixed Deposit Interest Calculator Online",
    description: "Calculate SBI, HDFC, and Post Office Fixed Deposit (FD) interest and maturity amount using our online fixed deposit return calculator with quarterly compounding.",
    keywords: "fd calculator, fixed deposit calculator, sbi fd calculator, post office fd interest rate, fd compounding calculator",
    category: "SavingsCalculator",
  },
  rd: {
    name: "RD Calculator: Recurring Deposit Interest & Maturity Calculator",
    description: "Calculate Post Office, SBI & bank Recurring Deposit (RD) interest earnings and maturity amount with quarterly compounding. 100% free online RD calculator.",
    keywords: "rd calculator, recurring deposit calculator, sbi rd calculator, post office rd calculator, rd interest rate, rd maturity calculator, recurring deposit interest calculator",
    category: "SavingsCalculator",
  },
  nps: {
    name: "National Pension Scheme India Calculator: How to Calculate NPS Pension",
    description: "Learn how to calculate NPS pension and maturity corpus. Use our National Pension Scheme India calculator to project tax-free lump sum and monthly annuity pension payouts.",
    keywords: "national pension scheme india calculator, how to calculate nps, how to calculate nps pension, nps calculator, nps calculator online, nps calculation formula, national pension scheme, nps tier 1, nps tier 2, best nps calculator, pension calculator",
    category: "RetirementCalculator",
  },
  retirement: {
    name: "Retirement Planner: Pension Planner & Retirement Planning Tools",
    description: "Plan your financial independence with this free retirement planner. Estimate your required pension corpus and monthly savings adjusted for inflation.",
    keywords: "retirement planner, pension planner, retirement planning tools, retirement corpus, financial independence retirement, early retirement calculator",
    category: "RetirementCalculator",
  },
  tax: {
    name: "Income Tax Calculator FY 2026-27: Old vs New Regime & NPS",
    description: "Compare Old vs New Tax Regime for FY 2026-27 (AY 2027-28). Features ₹75k standard deduction, zero tax up to ₹12L rebate (87A), and Employer NPS (80CCD(2)).",
    keywords: "income tax calculator, old vs new tax regime, budget 2025 tax slabs, tax calculator fy 2026-27, section 87a rebate, employer nps deduction 80ccd 2, tax slabs india",
    category: "TaxCalculator",
  },
  mutualfund: {
    name: "Mutual Fund Calculator: Lumpsum & SIP Growth Calculator",
    description: "Estimate your mutual fund returns online. Calculate lumpsum investments and Systematic Investment Plan (SIP) growth based on historical CAGR returns.",
    keywords: "mutual fund calculator, lumpsum mutual fund calculator, mf calculator, mutual fund return calculator, mutual fund cagr, mutual fund growth calculator",
    category: "InvestmentCalculator",
  },
  compound: {
    name: "Compound Interest & Cumulative Calculator India: Daily, Monthly & Yearly",
    description: "Calculate compound interest and cumulative returns online with daily, monthly, quarterly, or yearly compounding frequencies using our free cumulative calculator.",
    keywords: "cumulative calculator, cumulative interest calculator, compound interest calculator, daily compound interest, compound interest formula, compound savings calculator, interest on interest calculator",
    category: "SavingsCalculator",
  },
  stampduty: {
    name: "Stamp Duty & Registration Calculator India: State-Wise Property Rates",
    description: "Calculate stamp duty and registration fees across Maharashtra, Karnataka, Delhi, UP, Haryana, Tamil Nadu and all Indian states with women concession discounts.",
    keywords: "stamp duty calculator, property registration charges, maharashtra stamp duty, stamp duty calculator delhi, stamp duty calculator bangalore, female stamp duty concession",
    category: "RealEstateCalculator",
  },
  capitalgains: {
    name: "Property Capital Gains Tax Calculator: Budget 2024 (20% vs 12.5%)",
    description: "Calculate short-term and long-term capital gains tax on property sale. Compare Budget 2024 Old Regime (20% with CII indexation) vs New Regime (12.5% flat) and Section 54 deductions.",
    keywords: "property capital gains tax calculator, ltcg on property, budget 2024 property tax, cii cost inflation index, section 54 exemption, capital gains on flat sale",
    category: "TaxCalculator",
  },
  carpetarea: {
    name: "RERA Carpet Area Calculator & Land Unit Converter (Sq.Ft to Gaj, Guntha, Acre)",
    description: "Calculate RERA Net Carpet Area from Super Built-up area with builder loading %. Convert land measurement units across Sq Ft, Sq Mtr, Gaj, Guntha, Bigha, and Acre.",
    keywords: "carpet area calculator, rera carpet area, super built up area, loading percentage calculator, sq ft to gaj converter, guntha to sq ft, bigha to sq ft",
    category: "RealEstateCalculator",
  },
  propertytax: {
    name: "Property Tax Calculator India: Municipal Tax for Mumbai, Bangalore, Delhi, Pune",
    description: "Estimate annual municipal property tax online for Mumbai (BMC), Bangalore (BBMP), Delhi (MCD), Pune (PMC), Hyderabad (GHMC), and Chennai (GCC).",
    keywords: "property tax calculator, bmc property tax, bbmp property tax calculator, mcd property tax, pmc property tax, municipal tax calculator india",
    category: "RealEstateCalculator",
  },
  brokerage: {
    name: "Real Estate Brokerage Commission Calculator: Sale & Rental with GST and TDS",
    description: "Calculate real estate agent brokerage fees for property sale and rental leases with 18% GST and 5% Section 194H TDS deduction.",
    keywords: "brokerage calculator, real estate commission calculator, property broker commission, section 194h tds brokerage, 18 gst on brokerage",
    category: "RealEstateCalculator",
  },
  rentalyield: {
    name: "Rental Yield & Real Estate ROI Calculator: Gross & Net Property Returns",
    description: "Calculate gross and net rental yield, annual cash flow, and 10-year property appreciation CAGR for residential and commercial real estate investments.",
    keywords: "rental yield calculator, property roi calculator, rental yield india, gross vs net rental yield, cap rate calculator property, real estate return calculator",
    category: "InvestmentCalculator",
  },
  reralookup: {
    name: "RERA Project Lookup & State Directory: Verify Builder Compliance & Approvals",
    description: "Search registered real estate projects across 20+ Indian State RERA portals (MahaRERA, UP RERA, K-RERA). Verify approved floor plans, builder escrow bank accounts, and legal checklists.",
    keywords: "rera lookup, rera project search, maharera project lookup, up rera search, karnataka rera lookup, verify rera registration, rera compliance checklist",
    category: "RealEstateDirectory",
  },
  rentalagreement: {
    name: "Rental Agreement Generator: Free 11-Month Leave & License Draft Online",
    description: "Generate customized, legally formatted Indian residential and commercial leave and license agreements. Includes lock-in period, maintenance, deposit, and one-click PDF print.",
    keywords: "rental agreement generator, rent agreement draft, leave and license agreement format, 11 month rent agreement format, printable rental agreement pdf",
    category: "LegalDocumentGenerator",
  },
  home: {
    name: "RupeeBuddy: Free Indian Financial & Real Estate Calculators",
    description: "Free online financial calculators for India. Calculate Income Tax (Old vs New Regime with NPS), Home Loan EMI, Mutual Fund SIP returns, PPF, and EPF balances instantly.",
    keywords: "rupee buddy, rupeebuddy, finance calculator, emi calculator, sip calculator, income tax calculator, old vs new tax regime, ppf calculator, epf calculator, nps calculator, india finance",
    category: "FinancialSuite",
  },
  about: {
    name: "About Us | RupeeBuddy",
    description: "Learn about RupeeBuddy.in. Our mission is to provide clean, interactive, math-driven personal finance calculators with 100% data privacy.",
    keywords: "about rupeebuddy, personal finance india, zero data collection, about us rupeebuddy",
    category: "AboutPage",
  },
  privacy: {
    name: "Privacy Policy | RupeeBuddy",
    description: "Read our privacy policy. We commit to a zero-data-collection policy for all our financial calculator tools. Your data remains on your local browser.",
    keywords: "privacy policy rupeebuddy, zero tracking, ad free finance",
    category: "PrivacyPage",
  },
  contact: {
    name: "Contact Us & Support | RupeeBuddy",
    description: "Get in touch with the RupeeBuddy team for inquiries, feature requests, or calculator feedback.",
    keywords: "contact rupeebuddy, support team, email rupeebuddy, support page",
    category: "ContactPage",
  },
  blogs: {
    name: "RupeeBuddy Financial Guides & Wealth Library",
    description: "Explore 89 expert financial guides and articles on income tax planning, mutual fund compound interest growth, retirement corpus accumulation, and debt reduction strategies in India.",
    keywords: "finance guides, investment articles, wealth strategies india, personal finance blogs, saving tips",
    category: "FinanceGuides",
  },
  'blogs-investment': {
    name: "Investment Guides: Stocks, Mutual Funds, Algos & Wealth Strategies",
    description: "Explore 33 expert investment guides covering AI trading bots, no-code algorithmic portfolios, SIP compounding, mutual fund vs gold comparison, and SGB strategies in India.",
    keywords: "investment guides, stock trading bots, mutual fund compounding, sip calculator guides, sovereign gold bond, index fund investing",
    category: "FinanceGuides",
  },
  'blogs-loans': {
    name: "Loan & Debt Guides: Home Loans, FOIR, Prepayments & CIBIL",
    description: "Explore 17 practical borrowing guides on reducing home loan interest, calculating bank FOIR ratios, debt avalanche methods, and boosting CIBIL credit score.",
    keywords: "loan guides, home loan prepayment, foir ratio, cibil score boost, reduce emi, repo rate cut impact",
    category: "FinanceGuides",
  },
  'blogs-realestate': {
    name: "Real Estate Guides: Stamp Duty, RERA, Capital Gains & Property",
    description: "Explore 14 in-depth property guides on state-wise stamp duty, Budget 2024 property capital gains tax, Construction Linked Plans (CLP), and RERA project verification.",
    keywords: "real estate guides, stamp duty rates india, property capital gains 12.5%, rera project verification, 11 month rental agreement",
    category: "FinanceGuides",
  },
  'blogs-retirement': {
    name: "Retirement & Pension Guides: NPS, EPF, PPF & Senior Citizen Plans",
    description: "Explore 14 sovereign retirement guides comparing NPS vs PPF vs EPF, Unified Pension Scheme (UPS), Senior Citizen Savings Scheme (SCSS), and SWP pension strategies.",
    keywords: "retirement guides, nps vs ppf vs epf, unified pension scheme, epf withdrawal rules, scss interest rate, systematic withdrawal plan",
    category: "FinanceGuides",
  },
  'blogs-tax': {
    name: "Tax Slabs & Exemption Guides: Old vs New Regime & Section 80C",
    description: "Explore 11 comprehensive income tax guides breaking down Union Budget tax slabs, Standard Deduction ₹75,000, Section 80C limits, and Capital Gains exemptions.",
    keywords: "tax guides india, old vs new tax regime, section 80c exemptions, budget 2025 tax slabs, save income tax legally",
    category: "FinanceGuides",
  }
};

export function injectCalculatorSchema(calculatorId, category = 'all', articleId = null) {
  // If an article is specified, set article canonical immediately and let Blogs.jsx handle article-specific schema & metadata
  if (calculatorId === 'blogs' && articleId) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `https://rupeebuddy.in/?calc=blogs&article=${encodeURIComponent(articleId)}`;
    return;
  }

  // 1. Remove existing schema scripts if any
  const existingScript = document.getElementById("calculator-schema");
  if (existingScript) {
    existingScript.remove();
  }
  const existingBreadcrumb = document.getElementById("breadcrumb-schema");
  if (existingBreadcrumb) {
    existingBreadcrumb.remove();
  }

  const lookupKey = (calculatorId === 'blogs' && category && category !== 'all') 
    ? `blogs-${category}` 
    : calculatorId;
  const details = schemas[lookupKey] || schemas[calculatorId];
  if (!details) return;

  // 2. Determine and create main schema object
  let schemaData;
  if (calculatorId === 'home') {
    schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://rupeebuddy.in/#website",
          "url": "https://rupeebuddy.in/",
          "name": "RupeeBuddy",
          "alternateName": ["Rupee Buddy", "RupeeBuddy.in", "rupeebuddy"],
          "description": "Free online financial calculators for India - Income Tax, EMI, SIP, PPF, EPF, and Stamp Duty.",
          "publisher": {
            "@id": "https://rupeebuddy.in/#organization"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://rupeebuddy.in/?calc={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "Organization",
          "@id": "https://rupeebuddy.in/#organization",
          "name": "RupeeBuddy",
          "alternateName": ["Rupee Buddy"],
          "url": "https://rupeebuddy.in/",
          "logo": {
            "@type": "ImageObject",
            "@id": "https://rupeebuddy.in/#logo",
            "url": "https://rupeebuddy.in/favicon.svg",
            "caption": "RupeeBuddy Logo"
          },
          "image": {
            "@id": "https://rupeebuddy.in/#logo"
          },
          "description": "RupeeBuddy is a free Indian personal finance portal providing private client-side calculators for income tax, SIP, loans, and real estate.",
          "sameAs": [
            "https://twitter.com/RupeeBuddy"
          ]
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Income Tax Calculator",
          "url": "https://rupeebuddy.in/?calc=tax",
          "description": "Compare Old vs New Tax Regime with NPS and Section 87A rebate"
        },
        {
          "@type": "SiteNavigationElement",
          "name": "SIP Calculator",
          "url": "https://rupeebuddy.in/?calc=sip",
          "description": "Calculate Mutual Fund Systematic Investment Plan returns"
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Home Loan EMI Calculator",
          "url": "https://rupeebuddy.in/?calc=emi",
          "description": "Calculate monthly loan EMIs and interest amortization"
        },
        {
          "@type": "SiteNavigationElement",
          "name": "EPF / PF Calculator",
          "url": "https://rupeebuddy.in/?calc=pf",
          "description": "Calculate EPF balance and 8.25% interest growth"
        },
        {
          "@type": "SiteNavigationElement",
          "name": "RD Calculator",
          "url": "https://rupeebuddy.in/?calc=rd",
          "description": "Calculate Recurring Deposit maturity and quarterly interest"
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Stamp Duty & Registration Calculator",
          "url": "https://rupeebuddy.in/?calc=stampduty",
          "description": "State-wise property registration and stamp duty calculator"
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Financial Guides & Articles",
          "url": "https://rupeebuddy.in/?calc=blogs",
          "description": "Explore personal finance guides and market strategies"
        },
        {
          "@type": "SiteNavigationElement",
          "name": "About Us",
          "url": "https://rupeebuddy.in/?calc=about",
          "description": "About the RupeeBuddy team and mission"
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Contact Us",
          "url": "https://rupeebuddy.in/?calc=contact",
          "description": "Contact RupeeBuddy support team"
        }
      ]
    };
  } else {
    // Map correct Schema Type based on category
    let type = "WebApplication";
    if (details.category === "AboutPage") type = "AboutPage";
    else if (details.category === "PrivacyPage") type = "WebPage";
    else if (details.category === "ContactPage") type = "ContactPage";
    else if (details.category === "FinanceGuides") type = "CollectionPage";

    schemaData = {
      "@context": "https://schema.org",
      "@type": type,
      "name": `${details.name} - RupeeBuddy.in`,
      "description": details.description,
      "url": window.location.href
    };

    // Add WebApplication details only if it is a calculator application
    if (type === "WebApplication") {
      schemaData.applicationCategory = "BusinessApplication";
      schemaData.operatingSystem = "All";
      schemaData.browserRequirements = "Requires JavaScript. Requires HTML5.";
      schemaData.offers = {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      };
      schemaData.featureList = [
        "Real-time calculations as sliders move",
        "Interactive pie charts and bar graphs",
        "Printable PDF reports",
        "Optimized for Indian financial terms and schemes"
      ];
      schemaData.about = {
        "@type": "Thing",
        "name": details.name,
        "description": details.description
      };
    }
  }

  // 3. Create BreadcrumbList schema object for inner pages
  let breadcrumbData = null;
  if (calculatorId !== 'home') {
    breadcrumbData = {
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
          "name": details.name,
          "item": `https://rupeebuddy.in/?calc=${calculatorId}`
        }
      ]
    };
  }

  // 4. Clean up any previous extra schema scripts
  const oldFaq = document.getElementById("faq-schema");
  if (oldFaq) oldFaq.remove();
  const oldHowTo = document.getElementById("howto-schema");
  if (oldHowTo) oldHowTo.remove();

  // 5. Inject main schema script into head
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = "calculator-schema";
  script.text = JSON.stringify(schemaData, null, 2);
  document.head.appendChild(script);

  // 6. Inject breadcrumb schema script if applicable
  if (breadcrumbData) {
    const breadcrumbScript = document.createElement("script");
    breadcrumbScript.type = "application/ld+json";
    breadcrumbScript.id = "breadcrumb-schema";
    breadcrumbScript.text = JSON.stringify(breadcrumbData, null, 2);
    document.head.appendChild(breadcrumbScript);
  }

  // 7. Inject FAQPage and HowTo Schema for Construction Linked Plan
  if (calculatorId === 'clp') {
    const clpHowToData = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Calculate a Construction Linked Plan Payment Schedule",
      "description": "Calculate your Construction Linked Plan instalments stage-wise, including Pre-EMI interest during construction and full EMI after possession.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Enter Property Agreement Price",
          "text": "Enter the total agreement value of the under-construction flat or commercial property."
        },
        {
          "@type": "HowToStep",
          "name": "Choose Construction Milestone Schedule",
          "text": "Select the Standard 10-Stage Plan, 18-Month Compressed Plan, or Custom Multi-Storey Building Floors."
        },
        {
          "@type": "HowToStep",
          "name": "Configure Home Loan & Interest Rate",
          "text": "Enter your loan funding percentage (e.g. 80%), bank interest rate (e.g. 8.5%), and tenure to compute Pre-EMI interest during construction."
        },
        {
          "@type": "HowToStep",
          "name": "Review Stage-Wise Schedule & Taxes",
          "text": "Inspect the stage-by-stage demand amounts, bank loan disbursals, Pre-EMI per month, and post-possession EMI."
        }
      ]
    };

    const clpHowToScript = document.createElement("script");
    clpHowToScript.type = "application/ld+json";
    clpHowToScript.id = "howto-schema";
    clpHowToScript.text = JSON.stringify(clpHowToData, null, 2);
    document.head.appendChild(clpHowToScript);

    const clpFaqData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a Construction Linked Plan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Construction Linked Plan is a property payment schedule where you pay the builder in instalments tied strictly to physical construction milestones — booking, foundation, plinth, slab, brickwork, finishing, and possession — instead of paying the full price upfront or in a flat down payment."
          }
        },
        {
          "@type": "Question",
          "name": "How is the Construction Linked Plan payment schedule calculated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The total property price is split into percentages against fixed construction stages: 10% on booking, 10% on agreement, 10% on foundation, 10% on plinth, 10% on 1st slab, 15% on superstructure, 10% on brickwork, 10% on internal plaster, 10% on external finishing, and 5% on possession."
          }
        },
        {
          "@type": "Question",
          "name": "What is Pre-EMI in a Construction Linked Plan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pre-EMI is the interest-only payment you make to the lending bank during construction, calculated on the loan amount disbursed so far — not the full sanctioned loan amount. Once the builder completes construction and hands over possession, your loan transitions to a full regular EMI."
          }
        },
        {
          "@type": "Question",
          "name": "Is GST charged on Construction Linked Plan instalments?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. For under-construction properties, each Construction Linked Plan instalment attracts 5% GST for standard residential units (or 1% GST for affordable housing under ₹45 Lakhs). Ready-to-move-in properties sold after the Occupancy Certificate (OC) are GST-free."
          }
        },
        {
          "@type": "Question",
          "name": "Is a Construction Linked Plan better than a Down Payment Plan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Construction Linked Plan spreads your financial risk across the construction timeline — you pay only as physical work is completed on-site. A Down Payment Plan requires paying 80% to 95% upfront; while it offers a 5% to 8% discount, it puts your capital at high risk if the project is delayed."
          }
        }
      ]
    };

    const clpFaqScript = document.createElement("script");
    clpFaqScript.type = "application/ld+json";
    clpFaqScript.id = "faq-schema";
    clpFaqScript.text = JSON.stringify(clpFaqData, null, 2);
    document.head.appendChild(clpFaqScript);
  }

  // 6. Update Meta Page Title and Meta Description for SEO
  document.title = details.name.includes("RupeeBuddy") ? details.name : `${details.name} | RupeeBuddy`;
  
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = "description";
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = details.description;

  // 7. Update Meta Keywords for SEO
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.name = "keywords";
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.content = details.keywords;

  // 8. Update Canonical Link
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const articleParam = urlParams.get('article');
  const pageUrl = calculatorId === 'home' 
    ? 'https://rupeebuddy.in/' 
    : (calculatorId === 'blogs' && articleParam)
      ? `https://rupeebuddy.in/?calc=blogs&article=${articleParam}`
      : (calculatorId === 'blogs' && category && category !== 'all')
        ? `https://rupeebuddy.in/?calc=blogs&category=${category}`
        : `https://rupeebuddy.in/?calc=${calculatorId}`;
  canonical.href = pageUrl;

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

  // 9. Sync Open Graph Meta tags dynamically
  setMetaTag('og:title', details.name.includes("RupeeBuddy") ? details.name : `${details.name} | RupeeBuddy`, true);
  setMetaTag('og:description', details.description, true);
  setMetaTag('og:type', 'website', true);
  setMetaTag('og:url', pageUrl, true);
  setMetaTag('og:image', 'https://rupeebuddy.in/favicon.svg', true);
}
