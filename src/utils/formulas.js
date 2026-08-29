/**
 * Pure mathematical utility functions for financial calculators (Indian market context).
 */

// 1. EMI Calculator (Home, Car, Personal Loan)
export function calculateEMI(principal, annualRate, tenureYears) {
  const r = annualRate / 12 / 100;
  const n = tenureYears * 12;
  
  if (r === 0) {
    const emi = principal / n;
    return {
      emi: Math.round(emi),
      totalPayment: Math.round(principal),
      totalInterest: 0,
      principalPct: 100,
      interestPct: 0
    };
  }

  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - principal;

  return {
    emi: Math.round(emi),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    principalPct: Math.round((principal / totalPayment) * 100),
    interestPct: Math.round((totalInterest / totalPayment) * 100)
  };
}

// 2. Loan Eligibility Calculator
export function calculateLoanEligibility(monthlyIncome, existingEmi, annualRate, tenureYears, foirPct = 50) {
  const maxEmi = (monthlyIncome * (foirPct / 100)) - existingEmi;
  const r = annualRate / 12 / 100;
  const n = tenureYears * 12;

  if (maxEmi <= 0) {
    return {
      eligibleLoan: 0,
      eligibleEmi: 0
    };
  }

  if (r === 0) {
    return {
      eligibleLoan: Math.round(maxEmi * n),
      eligibleEmi: Math.round(maxEmi)
    };
  }

  const eligibleLoan = (maxEmi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
  return {
    eligibleLoan: Math.round(eligibleLoan),
    eligibleEmi: Math.round(maxEmi)
  };
}

// 3. PPF Calculator
export function calculatePPF(yearlyContribution, tenureYears, rate = 7.1) {
  const r = rate / 100;
  let balance = 0;
  let totalInvested = 0;

  // Yearly compounding assuming contribution at the start of year
  for (let year = 1; year <= tenureYears; year++) {
    totalInvested += yearlyContribution;
    balance = (balance + yearlyContribution) * (1 + r);
  }

  const interestEarned = balance - totalInvested;

  return {
    totalInvested: Math.round(totalInvested),
    interestEarned: Math.round(interestEarned),
    maturityAmount: Math.round(balance)
  };
}

// 4. EPF (Employee Provident Fund) Calculator
export function calculateEPF(monthlyBasicSalary, employeeContribPct = 12, employerContribPct = 3.67, annualRate = 8.25, salaryGrowthPct = 5, tenureYears = 30) {
  let balance = 0;
  let totalEmployeeContrib = 0;
  let totalEmployerContrib = 0;
  let totalInterest = 0;
  let currentSalary = monthlyBasicSalary;
  const monthlyRate = annualRate / 12 / 100;

  for (let month = 1; month <= tenureYears * 12; month++) {
    // Annual Salary Hike
    if (month > 1 && (month - 1) % 12 === 0) {
      currentSalary = currentSalary * (1 + salaryGrowthPct / 100);
    }

    const empContrib = currentSalary * (employeeContribPct / 100);
    // Employer EPF contribution capped at 3.67% (rem remainder goes to pension EPS)
    const emrContrib = currentSalary * (employerContribPct / 100);
    const monthlyContrib = empContrib + emrContrib;

    // Interest is calculated on opening balance
    const interestThisMonth = balance * monthlyRate;
    
    balance += monthlyContrib + interestThisMonth;
    totalEmployeeContrib += empContrib;
    totalEmployerContrib += emrContrib;
    totalInterest += interestThisMonth;
  }

  return {
    totalEmployeeContrib: Math.round(totalEmployeeContrib),
    totalEmployerContrib: Math.round(totalEmployerContrib),
    totalInterest: Math.round(totalInterest),
    maturityAmount: Math.round(balance)
  };
}

// 5. SIP Calculator
export function calculateSIP(monthlyInvestment, expectedReturnRate, tenureYears) {
  const i = expectedReturnRate / 12 / 100;
  const n = tenureYears * 12;

  if (i === 0) {
    const totalInvested = monthlyInvestment * n;
    return {
      totalInvested: Math.round(totalInvested),
      interestEarned: 0,
      maturityAmount: Math.round(totalInvested)
    };
  }

  const maturityAmount = monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const totalInvested = monthlyInvestment * n;
  const interestEarned = maturityAmount - totalInvested;

  return {
    totalInvested: Math.round(totalInvested),
    interestEarned: Math.round(interestEarned),
    maturityAmount: Math.round(maturityAmount)
  };
}

// 6. FD Calculator
export function calculateFD(principal, rate, tenureYears, compoundingFrequency = 4) {
  const r = rate / 100;
  const n = compoundingFrequency; // 4 = Quarterly, 12 = Monthly, 1 = Yearly
  const maturityAmount = principal * Math.pow(1 + r / n, n * tenureYears);
  const interestEarned = maturityAmount - principal;

  return {
    totalInvested: Math.round(principal),
    interestEarned: Math.round(interestEarned),
    maturityAmount: Math.round(maturityAmount)
  };
}

// 7. RD Calculator
export function calculateRD(monthlyInvestment, rate, tenureMonths) {
  const N = tenureMonths;
  let maturityAmount = 0;
  const totalInvested = monthlyInvestment * N;

  // Formula for quarterly compounding RD
  // Compounding for each installment based on its duration (months remaining)
  for (let k = 1; k <= N; k++) {
    const monthsRemaining = N - k + 1;
    // Compounded quarterly: (1 + R/400) ^ (months / 3)
    const compoundFactor = Math.pow(1 + rate / 400, monthsRemaining / 3);
    maturityAmount += monthlyInvestment * compoundFactor;
  }

  const interestEarned = maturityAmount - totalInvested;

  return {
    totalInvested: Math.round(totalInvested),
    interestEarned: Math.round(interestEarned),
    maturityAmount: Math.round(maturityAmount)
  };
}

// 8. NPS (National Pension Scheme) Calculator
export function calculateNPS(monthlyContrib, expectedRate, currentAge, retirementAge = 60, annuityPct = 40, annuityRate = 6) {
  const tenureYears = retirementAge - currentAge;
  if (tenureYears <= 0) {
    return {
      totalInvested: 0,
      interestEarned: 0,
      maturityAmount: 0,
      annuityCorpus: 0,
      lumpSum: 0,
      monthlyPension: 0
    };
  }

  const result = calculateSIP(monthlyContrib, expectedRate, tenureYears);
  const annuityCorpus = result.maturityAmount * (annuityPct / 100);
  const lumpSum = result.maturityAmount - annuityCorpus;
  const monthlyPension = annuityCorpus * (annuityRate / 100 / 12);

  return {
    totalInvested: result.totalInvested,
    interestEarned: result.interestEarned,
    maturityAmount: result.maturityAmount,
    annuityCorpus: Math.round(annuityCorpus),
    lumpSum: Math.round(lumpSum),
    monthlyPension: Math.round(monthlyPension)
  };
}

// 9. Retirement Calculator
export function calculateRetirement(currentAge, retirementAge, currentExpenses, expectancy, inflation, returnPre, returnPost) {
  const yearsToRetire = retirementAge - currentAge;
  const yearsInRetirement = expectancy - retirementAge;

  if (yearsToRetire <= 0 || yearsInRetirement <= 0) {
    return {
      targetCorpus: 0,
      monthlySavingsRequired: 0,
      futureMonthlyExpenses: 0
    };
  }

  // Future monthly expenses adjusted for inflation
  const futureMonthlyExpenses = currentExpenses * Math.pow(1 + inflation / 100, yearsToRetire);
  const annualExpensesAtRetirement = futureMonthlyExpenses * 12;

  // Real Rate of Return post-retirement (inflation-adjusted)
  const rPostReal = ((1 + returnPost / 100) / (1 + inflation / 100)) - 1;

  let targetCorpus = 0;
  if (rPostReal === 0) {
    targetCorpus = annualExpensesAtRetirement * yearsInRetirement;
  } else {
    // Present Value of Annuity Due (payments at the beginning of each year)
    targetCorpus = annualExpensesAtRetirement * ((1 - Math.pow(1 + rPostReal, -yearsInRetirement)) / rPostReal) * (1 + rPostReal);
  }

  // Monthly savings required to reach target corpus
  const rPre = returnPre / 12 / 100;
  const totalPreMonths = yearsToRetire * 12;

  let monthlySavingsRequired = 0;
  if (rPre === 0) {
    monthlySavingsRequired = targetCorpus / totalPreMonths;
  } else {
    // SIP formula in reverse
    monthlySavingsRequired = targetCorpus / (((Math.pow(1 + rPre, totalPreMonths) - 1) / rPre) * (1 + rPre));
  }

  return {
    targetCorpus: Math.round(targetCorpus),
    monthlySavingsRequired: Math.round(monthlySavingsRequired),
    futureMonthlyExpenses: Math.round(futureMonthlyExpenses)
  };
}

// 10. Income Tax Calculator (FY 2026-27 / AY 2027-28 - Indian Slabs)
export function calculateTax(annualIncome, deductions = 0) {
  // New Regime slabs (FY 2025-26 & FY 2026-27 Budget 2025 Updates)
  // Standard Deduction: ₹75,000 for salaried
  const standardDeductionNew = 75000;
  const taxableIncomeNew = Math.max(0, annualIncome - standardDeductionNew);
  let taxNew = 0;

  if (taxableIncomeNew > 0) {
    // Up to 4L: Nil
    // 4L - 8L: 5% (max 20k)
    // 8L - 12L: 10% (max 40k)
    // 12L - 16L: 15% (max 60k)
    // 16L - 20L: 20% (max 80k)
    // 20L - 24L: 25% (max 1L)
    // Above 24L: 30%
    if (taxableIncomeNew > 400000) {
      taxNew += Math.min(taxableIncomeNew - 400000, 400000) * 0.05;
    }
    if (taxableIncomeNew > 800000) {
      taxNew += Math.min(taxableIncomeNew - 800000, 400000) * 0.10;
    }
    if (taxableIncomeNew > 1200000) {
      taxNew += Math.min(taxableIncomeNew - 1200000, 400000) * 0.15;
    }
    if (taxableIncomeNew > 1600000) {
      taxNew += Math.min(taxableIncomeNew - 1600000, 400000) * 0.20;
    }
    if (taxableIncomeNew > 2000000) {
      taxNew += Math.min(taxableIncomeNew - 2000000, 400000) * 0.25;
    }
    if (taxableIncomeNew > 2400000) {
      taxNew += (taxableIncomeNew - 2400000) * 0.30;
    }

    // Rebate u/s 87A: Nil tax if taxable income <= 12,00,000 (New Regime)
    if (taxableIncomeNew <= 1200000) {
      taxNew = 0;
    } else {
      // Marginal Relief: Tax cannot exceed income exceeding 12,00,000
      const excessIncome = taxableIncomeNew - 1200000;
      if (taxNew > excessIncome) {
        taxNew = excessIncome;
      }
    }
  }

  // Old Regime slabs
  // Standard Deduction: ₹50,000
  const standardDeductionOld = 50000;
  const taxableIncomeOld = Math.max(0, annualIncome - deductions - standardDeductionOld);
  let taxOld = 0;

  if (taxableIncomeOld > 0) {
    // Up to 2.5L: Nil
    // 2.5L - 5L: 5% (max 12.5k)
    // 5L - 10L: 20% (max 1L)
    // Above 10L: 30%
    if (taxableIncomeOld > 250000) {
      taxOld += Math.min(taxableIncomeOld - 250000, 250000) * 0.05;
    }
    if (taxableIncomeOld > 500000) {
      taxOld += Math.min(taxableIncomeOld - 500000, 500000) * 0.20;
    }
    if (taxableIncomeOld > 1000000) {
      taxOld += (taxableIncomeOld - 1000000) * 0.30;
    }

    // Rebate u/s 87A: Nil tax if taxable income <= 5,00,000
    if (taxableIncomeOld <= 500000) {
      taxOld = 0;
    } else {
      // Marginal Relief for Old Regime
      const excessIncome = taxableIncomeOld - 500000;
      if (taxOld > excessIncome) {
        taxOld = excessIncome;
      }
    }
  }

  // Determine Tax Brackets
  let bracketNew = "0%";
  if (taxableIncomeNew > 2400000) {
    bracketNew = "30%";
  } else if (taxableIncomeNew > 2000000) {
    bracketNew = "25%";
  } else if (taxableIncomeNew > 1600000) {
    bracketNew = "20%";
  } else if (taxableIncomeNew > 1200000) {
    bracketNew = "15%";
  } else if (taxableIncomeNew > 800000) {
    bracketNew = taxableIncomeNew <= 1200000 ? "10% (Rebate Applied)" : "10%";
  } else if (taxableIncomeNew > 400000) {
    bracketNew = taxableIncomeNew <= 1200000 ? "5% (Rebate Applied)" : "5%";
  }

  let bracketOld = "0%";
  if (taxableIncomeOld > 1000000) {
    bracketOld = "30%";
  } else if (taxableIncomeOld > 500000) {
    bracketOld = "20%";
  } else if (taxableIncomeOld > 250000) {
    bracketOld = taxableIncomeOld <= 500000 ? "5% (Rebate Applied)" : "5%";
  }

  // Health and Education Cess: 4%
  const cessNew = taxNew * 0.04;
  const cessOld = taxOld * 0.04;

  const finalTaxNew = taxNew + cessNew;
  const finalTaxOld = taxOld + cessOld;

  return {
    newRegime: {
      taxableIncome: Math.round(taxableIncomeNew),
      baseTax: Math.round(taxNew),
      cess: Math.round(cessNew),
      totalTax: Math.round(finalTaxNew),
      taxBracket: bracketNew
    },
    oldRegime: {
      taxableIncome: Math.round(taxableIncomeOld),
      baseTax: Math.round(taxOld),
      cess: Math.round(cessOld),
      totalTax: Math.round(finalTaxOld),
      taxBracket: bracketOld
    },
    recommendation: finalTaxNew <= finalTaxOld ? 'New Regime' : 'Old Regime',
    savings: Math.abs(Math.round(finalTaxOld - finalTaxNew))
  };
}

// 11. Mutual Fund Returns Calculator
export function calculateMutualFund(amount, expectedReturnRate, tenureYears, investmentType = 'sip') {
  if (investmentType === 'sip') {
    return calculateSIP(amount, expectedReturnRate, tenureYears);
  } else {
    // Lump sum
    const r = expectedReturnRate / 100;
    const maturityAmount = amount * Math.pow(1 + r, tenureYears);
    const interestEarned = maturityAmount - amount;
    return {
      totalInvested: Math.round(amount),
      interestEarned: Math.round(interestEarned),
      maturityAmount: Math.round(maturityAmount)
    };
  }
}

// 12. Compound Interest Calculator
export function calculateCompoundInterest(principal, rate, compoundingFrequency, tenureYears) {
  const r = rate / 100;
  const n = compoundingFrequency; // 1 = Annual, 2 = Half-yearly, 4 = Quarterly, 12 = Monthly, 365 = Daily
  const maturityAmount = principal * Math.pow(1 + r / n, n * tenureYears);
  const interestEarned = maturityAmount - principal;

  return {
    totalInvested: Math.round(principal),
    interestEarned: Math.round(interestEarned),
    maturityAmount: Math.round(maturityAmount)
  };
}

// 13. Construction Linked Plan (CLP) Real Estate Milestones & Calculator
export const CLP_PRESETS = {
  GALAXY_HEIGHTS: [
    { name: 'Booking Amount of said Apartment', pct: 10.0 },
    { name: 'Execution of Agreement of said Apartment', pct: 20.0 },
    { name: 'Completion of Plinth of said Wing', pct: 5.0 },
    { name: 'Completion of Raft / Podium of said Wing', pct: 8.0 },
    { name: 'Completion of Stilt / Podium of said Wing', pct: 2.0 },
    { name: 'Completion of 2nd Floor Slab', pct: 1.7 },
    { name: 'Completion of 5th Floor Slab', pct: 1.7 },
    { name: 'Completion of 8th Floor Slab', pct: 1.7 },
    { name: 'Completion of 11th Floor Slab', pct: 1.7 },
    { name: 'Completion of 14th Floor Slab', pct: 1.7 },
    { name: 'Completion of 17th Floor Slab', pct: 1.7 },
    { name: 'Completion of 20th Floor Slab', pct: 1.7 },
    { name: 'Completion of 23rd Floor Slab', pct: 1.7 },
    { name: 'Completion of 26th Floor Slab', pct: 1.7 },
    { name: 'Completion of 29th Floor Slab', pct: 1.7 },
    { name: 'Completion of 32nd Floor Slab', pct: 1.7 },
    { name: 'Completion of 35th Floor Slab', pct: 1.7 },
    { name: 'Completion of 38th Floor Slab', pct: 1.7 },
    { name: 'Completion of Terrace Slab', pct: 1.7 },
    { name: 'Completion of Brickwork of said Wing', pct: 0.6 },
    { name: 'Completion of Internal Plaster of said Wing', pct: 0.6 },
    { name: 'Completion of Flooring / Wall Tiles & Overall Work', pct: 4.0 },
    { name: 'Completion of Carpentry Work / Door Frames', pct: 1.0 },
    { name: 'Completion of Carpentry Work / Windows', pct: 2.0 },
    { name: 'Completion of Sanitary Work', pct: 3.0 },
    { name: 'Completion of Electrical Work', pct: 3.0 },
    { name: 'Completion of Lobby / Staircase & Passage Work', pct: 2.0 },
    { name: 'Completion of Plumbing upto Floor Level', pct: 3.0 },
    { name: 'Completion of Terrace Waterproofing', pct: 2.0 },
    { name: 'Completion of External Painting', pct: 2.0 },
    { name: 'Completion of Lift Well upto Floor Level', pct: 1.0 },
    { name: 'Finishing of Parking Work', pct: 1.0 },
    { name: 'Finishing of Entrance Lobby / Paving Area', pct: 1.0 },
    { name: 'Initiation of Possession of Apartment', pct: 5.0 }
  ],
  MAHARERA_10_STAGE: [
    { name: 'Booking Amount / Application (RERA Max 10%)', pct: 10.0 },
    { name: 'Execution & Registration of Agreement of Sale', pct: 20.0 },
    { name: 'Completion of Plinth / Foundation Stage', pct: 15.0 },
    { name: 'Completion of Slabs (Spread across all floors)', pct: 25.0 },
    { name: 'Completion of Brickwork, Walls & Internal Plaster', pct: 5.0 },
    { name: 'Completion of Sanitary, Plumbing & Door Frames', pct: 5.0 },
    { name: 'Completion of External Plaster, Elevation & Terraces', pct: 5.0 },
    { name: 'Completion of Lifts, Water Pumps, Electrical & MEP', pct: 5.0 },
    { name: 'Finishing of Lobbies, Paving & Common Amenities', pct: 5.0 },
    { name: 'On Intimation of Possession / Occupancy Certificate', pct: 5.0 }
  ]
};

// Dynamically generate slab-wise milestones for any custom building with N floors
export function generateBuildingMilestones(totalFloors = 20) {
  const floors = Math.max(1, Math.min(100, Math.round(totalFloors)));
  const milestones = [
    { name: 'Booking Amount / Application Fee', pct: 10.0 },
    { name: 'Execution & Registration of Agreement of Sale', pct: 20.0 },
    { name: 'Completion of Plinth / Foundation & Basement', pct: 10.0 }
  ];

  // Distribute 35% across all floor slabs
  const slabTotalPct = 35.0;
  const pctPerSlab = Number((slabTotalPct / floors).toFixed(2));
  let allocatedSlabPct = 0;

  for (let f = 1; f <= floors; f++) {
    const isLast = f === floors;
    const currentPct = isLast ? Number((slabTotalPct - allocatedSlabPct).toFixed(2)) : pctPerSlab;
    allocatedSlabPct += currentPct;
    milestones.push({
      name: `Completion of ${f}${getOrdinal(f)} Floor Slab`,
      pct: Math.max(0.1, currentPct)
    });
  }

  milestones.push(
    { name: 'Completion of Brickwork & Internal Plaster', pct: 5.0 },
    { name: 'Completion of Flooring, Tiles & Sanitary Fittings', pct: 5.0 },
    { name: 'Completion of Electrical, Plumbing & Lift Works', pct: 5.0 },
    { name: 'Completion of External Plaster & Painting', pct: 5.0 },
    { name: 'On Intimation of Possession & Handover (OC)', pct: 5.0 }
  );

  return milestones;
}

function getOrdinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

export function calculateCLP(
  flatCost = 7500000,
  currentStageIndex = 0,
  milestones = CLP_PRESETS.GALAXY_HEIGHTS,
  hasLoan = true,
  loanPct = 80,
  annualInterestRate = 8.5,
  loanTenureYears = 20,
  stampDutyPct = 6.0,
  regFee = 30000,
  gstPct = 5.0
) {
  const totalFlatCost = Number(flatCost) || 0;
  const buyerMarginPct = Math.max(0, 100 - loanPct);
  const totalLoanSanctioned = hasLoan ? (totalFlatCost * loanPct) / 100 : 0;
  const totalBuyerMargin = hasLoan ? (totalFlatCost * buyerMarginPct) / 100 : totalFlatCost;

  let cumulativePct = 0;
  let cumulativeCost = 0;
  let cumulativeLoanDisbursed = 0;
  let cumulativeBuyerPaid = 0;

  const milestoneRows = milestones.map((m, index) => {
    const stagePct = Number(m.pct) || 0;
    cumulativePct += stagePct;
    const stageCost = Math.round((stagePct / 100) * totalFlatCost);
    cumulativeCost += stageCost;

    // Disbursement split:
    // In India, buyer pays margin money first until satisfied, or proportionally.
    let buyerShare = 0;
    let bankDisbursal = 0;

    if (hasLoan) {
      if (cumulativeBuyerPaid < totalBuyerMargin) {
        const neededBuyer = totalBuyerMargin - cumulativeBuyerPaid;
        if (stageCost <= neededBuyer) {
          buyerShare = stageCost;
          bankDisbursal = 0;
        } else {
          buyerShare = neededBuyer;
          bankDisbursal = stageCost - neededBuyer;
        }
      } else {
        buyerShare = 0;
        bankDisbursal = stageCost;
      }
    } else {
      buyerShare = stageCost;
      bankDisbursal = 0;
    }

    cumulativeBuyerPaid += buyerShare;
    cumulativeLoanDisbursed += bankDisbursal;

    // Monthly Pre-EMI interest on cumulative loan disbursed so far
    const monthlyPreEmi = hasLoan && cumulativeLoanDisbursed > 0
      ? Math.round((cumulativeLoanDisbursed * (annualInterestRate / 100)) / 12)
      : 0;

    const fullEmi = hasLoan && cumulativeLoanDisbursed > 0
      ? calculateEMI(cumulativeLoanDisbursed, annualInterestRate, loanTenureYears).emi
      : 0;

    let status = 'upcoming';
    if (index < currentStageIndex) status = 'completed';
    else if (index === currentStageIndex) status = 'current';

    return {
      index: index + 1,
      name: m.name,
      stagePct: Number(stagePct.toFixed(2)),
      stageCost,
      cumulativePct: Number(Math.min(100, cumulativePct).toFixed(2)),
      cumulativeCost,
      buyerShare,
      bankDisbursal,
      cumulativeLoanDisbursed,
      monthlyPreEmi,
      fullEmi,
      status
    };
  });

  const validIndex = Math.min(Math.max(0, currentStageIndex), milestoneRows.length - 1);
  const currentStage = milestoneRows[validIndex] || milestoneRows[0];

  const paidTillNow = currentStage ? currentStage.cumulativeCost : 0;
  const pendingBalance = Math.max(0, totalFlatCost - paidTillNow);
  const bankDisbursedTillNow = currentStage ? currentStage.cumulativeLoanDisbursed : 0;
  const buyerPaidTillNow = currentStage ? (paidTillNow - bankDisbursedTillNow) : 0;
  const currentPreEmi = currentStage ? currentStage.monthlyPreEmi : 0;

  // Taxes
  const stampDutyAmount = Math.round((stampDutyPct / 100) * totalFlatCost);
  const registrationAmount = Math.round(regFee);
  const gstAmount = Math.round((gstPct / 100) * totalFlatCost);
  const totalTaxes = stampDutyAmount + registrationAmount + gstAmount;
  const totalAllInclusiveCost = totalFlatCost + totalTaxes;

  return {
    totalFlatCost,
    totalBuyerMargin,
    totalLoanSanctioned,
    paidTillNow,
    pendingBalance,
    cumPctTillNow: currentStage ? currentStage.cumulativePct : 0,
    currentStageName: currentStage ? currentStage.name : '',
    currentStageIndex: validIndex,
    bankDisbursedTillNow,
    buyerPaidTillNow,
    currentPreEmi,
    milestoneRows,
    taxes: {
      stampDutyPct,
      stampDutyAmount,
      registrationAmount,
      gstPct,
      gstAmount,
      totalTaxes,
      totalAllInclusiveCost
    }
  };
}

