/**
 * Centralized Route & URL Management for RupeeBuddy.in
 * Supports Clean URL Hierarchy, Static Prerendering, and 100% Backward Compatibility
 * with legacy query strings (?calc=... & ?calc=blogs&article=...).
 */

export const CALCULATOR_ROUTES = {
  tax: {
    id: 'tax',
    slug: 'income-tax-calculator',
    path: '/calculators/income-tax-calculator',
    aliases: ['tax', 'income-tax', 'income-tax-calculator']
  },
  emi: {
    id: 'emi',
    slug: 'home-loan-emi-calculator',
    path: '/calculators/home-loan-emi-calculator',
    aliases: ['emi', 'home-loan-emi', 'home-loan-emi-calculator']
  },
  eligibility: {
    id: 'eligibility',
    slug: 'loan-eligibility-calculator',
    path: '/calculators/loan-eligibility-calculator',
    aliases: ['eligibility', 'loan-eligibility', 'foir-calculator']
  },
  clp: {
    id: 'clp',
    slug: 'construction-linked-plan-calculator',
    path: '/calculators/construction-linked-plan-calculator',
    aliases: ['clp', 'construction-linked-plan', 'pre-emi-calculator']
  },
  ppf: {
    id: 'ppf',
    slug: 'ppf-calculator',
    path: '/calculators/ppf-calculator',
    aliases: ['ppf', 'public-provident-fund']
  },
  pf: {
    id: 'pf',
    slug: 'epf-calculator',
    path: '/calculators/epf-calculator',
    aliases: ['pf', 'epf', 'provident-fund']
  },
  sip: {
    id: 'sip',
    slug: 'sip-calculator',
    path: '/calculators/sip-calculator',
    aliases: ['sip', 'mutual-fund-sip']
  },
  fd: {
    id: 'fd',
    slug: 'fd-calculator',
    path: '/calculators/fd-calculator',
    aliases: ['fd', 'fixed-deposit']
  },
  rd: {
    id: 'rd',
    slug: 'rd-calculator',
    path: '/calculators/rd-calculator',
    aliases: ['rd', 'recurring-deposit']
  },
  nps: {
    id: 'nps',
    slug: 'nps-calculator',
    path: '/calculators/nps-calculator',
    aliases: ['nps', 'national-pension-scheme']
  },
  retirement: {
    id: 'retirement',
    slug: 'retirement-planner',
    path: '/calculators/retirement-planner',
    aliases: ['retirement', 'retirement-calculator', 'pension-planner']
  },
  mutualfund: {
    id: 'mutualfund',
    slug: 'mutual-fund-calculator',
    path: '/calculators/mutual-fund-calculator',
    aliases: ['mutualfund', 'mutual-fund', 'lumpsum-calculator']
  },
  compound: {
    id: 'compound',
    slug: 'compound-interest-calculator',
    path: '/calculators/compound-interest-calculator',
    aliases: ['compound', 'compound-interest', 'cumulative-calculator']
  },
  stampduty: {
    id: 'stampduty',
    slug: 'stamp-duty-calculator',
    path: '/calculators/stamp-duty-calculator',
    aliases: ['stampduty', 'stamp-duty', 'property-registration']
  },
  capitalgains: {
    id: 'capitalgains',
    slug: 'capital-gains-tax-calculator',
    path: '/calculators/capital-gains-tax-calculator',
    aliases: ['capitalgains', 'capital-gains', 'property-capital-gains']
  },
  carpetarea: {
    id: 'carpetarea',
    slug: 'carpet-area-calculator',
    path: '/calculators/carpet-area-calculator',
    aliases: ['carpetarea', 'carpet-area', 'rera-carpet-area']
  },
  propertytax: {
    id: 'propertytax',
    slug: 'property-tax-calculator',
    path: '/calculators/property-tax-calculator',
    aliases: ['propertytax', 'property-tax', 'municipal-property-tax']
  },
  brokerage: {
    id: 'brokerage',
    slug: 'brokerage-calculator',
    path: '/calculators/brokerage-calculator',
    aliases: ['brokerage', 'brokerage-commission', 'real-estate-brokerage']
  },
  rentalyield: {
    id: 'rentalyield',
    slug: 'rental-yield-calculator',
    path: '/calculators/rental-yield-calculator',
    aliases: ['rentalyield', 'rental-yield', 'property-roi']
  },
  reralookup: {
    id: 'reralookup',
    slug: 'rera-project-lookup',
    path: '/calculators/rera-project-lookup',
    aliases: ['reralookup', 'rera-lookup', 'rera-directory']
  },
  rentalagreement: {
    id: 'rentalagreement',
    slug: 'rental-agreement-generator',
    path: '/calculators/rental-agreement-generator',
    aliases: ['rentalagreement', 'rental-agreement', 'leave-and-license']
  }
};

export const STATIC_ROUTES = {
  about: {
    id: 'about',
    path: '/about-us',
    aliases: ['about', 'about-us']
  },
  privacy: {
    id: 'privacy',
    path: '/privacy-policy',
    aliases: ['privacy', 'privacy-policy']
  },
  contact: {
    id: 'contact',
    path: '/contact-us',
    aliases: ['contact', 'contact-us']
  },
  editorial: {
    id: 'editorial',
    path: '/editorial-policy',
    aliases: ['editorial', 'editorial-policy', 'editorial-standards']
  }
};

export const GUIDE_CATEGORIES = ['investment', 'loans', 'realestate', 'retirement', 'tax'];

// Fast reverse lookup maps
const slugToCalcId = new Map();
Object.values(CALCULATOR_ROUTES).forEach(c => {
  slugToCalcId.set(c.id, c.id);
  slugToCalcId.set(c.slug, c.id);
  c.aliases.forEach(a => slugToCalcId.set(a, c.id));
});

const slugToStaticId = new Map();
Object.values(STATIC_ROUTES).forEach(s => {
  slugToStaticId.set(s.id, s.id);
  s.aliases.forEach(a => slugToStaticId.set(a, s.id));
});

/**
 * Returns canonical clean path for any calculator, guide, or static page
 */
export function getCleanPath({ calc = 'home', category = 'all', article = null } = {}) {
  if (calc === 'home' || !calc) {
    return '/';
  }

  if (calc === 'blogs' || calc.startsWith('blogs-')) {
    if (article) {
      return `/guides/${article}`;
    }
    const cat = calc.startsWith('blogs-') ? calc.replace('blogs-', '') : category;
    if (cat && cat !== 'all' && GUIDE_CATEGORIES.includes(cat)) {
      return `/guides/${cat}`;
    }
    return '/guides';
  }

  if (CALCULATOR_ROUTES[calc]) {
    return CALCULATOR_ROUTES[calc].path;
  }

  if (STATIC_ROUTES[calc]) {
    return STATIC_ROUTES[calc].path;
  }

  return `/?calc=${encodeURIComponent(calc)}`;
}

/**
 * Returns full canonical URL
 */
export function getCanonicalUrl({ calc = 'home', category = 'all', article = null } = {}) {
  const path = getCleanPath({ calc, category, article });
  return `https://rupeebuddy.in${path === '/' ? '/' : path}`;
}

/**
 * Parses the current browser location (both clean pathname and legacy query parameters)
 */
export function parseRouteFromUrl(pathname = '/', search = '') {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const params = new URLSearchParams(search);
  const queryCalc = params.get('calc');
  const queryArticle = params.get('article');
  const queryCategory = params.get('category');

  // 1. Check legacy query parameters first for instant backward compatibility
  if (queryCalc) {
    if (queryCalc === 'blogs' || queryCalc.startsWith('blogs-')) {
      const cat = queryCalc.startsWith('blogs-') 
        ? queryCalc.replace('blogs-', '') 
        : (queryCategory || 'all');
      return {
        activeCalc: 'blogs',
        activeCategory: cat,
        articleParam: queryArticle || null,
        isLegacy: true,
        canonicalPath: getCleanPath({ calc: 'blogs', category: cat, article: queryArticle })
      };
    }

    if (slugToCalcId.has(queryCalc)) {
      const calcId = slugToCalcId.get(queryCalc);
      return {
        activeCalc: calcId,
        activeCategory: 'all',
        articleParam: null,
        isLegacy: true,
        canonicalPath: CALCULATOR_ROUTES[calcId].path
      };
    }

    if (slugToStaticId.has(queryCalc)) {
      const staticId = slugToStaticId.get(queryCalc);
      return {
        activeCalc: staticId,
        activeCategory: 'all',
        articleParam: null,
        isLegacy: true,
        canonicalPath: STATIC_ROUTES[staticId].path
      };
    }

    if (queryCalc === 'home') {
      return {
        activeCalc: 'home',
        activeCategory: 'all',
        articleParam: null,
        isLegacy: true,
        canonicalPath: '/'
      };
    }
  }

  // 2. Parse Clean Paths
  if (cleanPath === '/' || cleanPath === '/index.html') {
    return {
      activeCalc: 'home',
      activeCategory: 'all',
      articleParam: null,
      isLegacy: false,
      canonicalPath: '/'
    };
  }

  // Check Calculators: /calculators/:slug or direct /:calcId
  if (cleanPath.startsWith('/calculators/')) {
    const slug = cleanPath.replace('/calculators/', '').toLowerCase();
    if (slugToCalcId.has(slug)) {
      const calcId = slugToCalcId.get(slug);
      return {
        activeCalc: calcId,
        activeCategory: 'all',
        articleParam: null,
        isLegacy: false,
        canonicalPath: CALCULATOR_ROUTES[calcId].path
      };
    }
  }

  // Direct calculator slug (e.g. /tax or /income-tax-calculator)
  const singleSlug = cleanPath.replace(/^\//, '').toLowerCase();
  if (slugToCalcId.has(singleSlug)) {
    const calcId = slugToCalcId.get(singleSlug);
    return {
      activeCalc: calcId,
      activeCategory: 'all',
      articleParam: null,
      isLegacy: false,
      canonicalPath: CALCULATOR_ROUTES[calcId].path
    };
  }

  // Check Static Pages (/about-us, /privacy-policy, /contact-us, /editorial-policy)
  if (slugToStaticId.has(singleSlug)) {
    const staticId = slugToStaticId.get(singleSlug);
    return {
      activeCalc: staticId,
      activeCategory: 'all',
      articleParam: null,
      isLegacy: false,
      canonicalPath: STATIC_ROUTES[staticId].path
    };
  }

  // Check Guides: /guides/:articleOrCategory or /blogs/:articleOrCategory
  if (cleanPath.startsWith('/guides/') || cleanPath.startsWith('/blogs/')) {
    const rest = cleanPath.replace(/^\/(guides|blogs)\//, '').toLowerCase();
    if (GUIDE_CATEGORIES.includes(rest)) {
      return {
        activeCalc: 'blogs',
        activeCategory: rest,
        articleParam: null,
        isLegacy: false,
        canonicalPath: `/guides/${rest}`
      };
    }
    // Assume it is an article slug
    return {
      activeCalc: 'blogs',
      activeCategory: 'all',
      articleParam: rest,
      isLegacy: false,
      canonicalPath: `/guides/${rest}`
    };
  }

  // Guides hub /guides or /blogs
  if (cleanPath === '/guides' || cleanPath === '/blogs') {
    return {
      activeCalc: 'blogs',
      activeCategory: 'all',
      articleParam: null,
      isLegacy: false,
      canonicalPath: '/guides'
    };
  }

  // Fallback to Home
  return {
    activeCalc: 'home',
    activeCategory: 'all',
    articleParam: null,
    isLegacy: false,
    canonicalPath: '/'
  };
}

/**
 * Checks if a pathname is a legitimate RupeeBuddy route or asset
 */
export function isKnownRoute(pathname = '/') {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/' || clean === '/index.html' || clean.startsWith('/assets/') || clean.startsWith('/images/')) {
    return true;
  }
  if (clean === '/guides' || clean === '/blogs' || clean.startsWith('/guides/') || clean.startsWith('/blogs/')) {
    return true;
  }
  if (clean.startsWith('/calculators/')) {
    return true;
  }
  const single = clean.replace(/^\//, '').toLowerCase();
  if (slugToCalcId.has(single) || slugToStaticId.has(single)) {
    return true;
  }
  return false;
}

