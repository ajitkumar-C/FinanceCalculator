import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { 
  CLP_PRESETS, 
  generateBuildingMilestones, 
  calculateCLP 
} from '../../utils/formulas';
import { formatINR } from '../../utils/format';
import NumericInput from '../common/NumericInput';
import { 
  Building2, CheckCircle2, Clock, AlertCircle, Sparkles, Layers, 
  Share2, Copy, Check, Printer, HelpCircle, ChevronDown, 
  ArrowRight, ShieldCheck, Scale, DollarSign, Calendar
} from 'lucide-react';

export default function ClpCalculator({ setResultText }) {
  // Mode: 'STANDARD_10_STAGE' (Default) | 'COMPRESSED_18_MONTH' | 'DYNAMIC_BUILDING'
  const [scheduleMode, setScheduleMode] = useState('STANDARD_10_STAGE');
  const [totalFloors, setTotalFloors] = useState(20);
  const [slabInterval, setSlabInterval] = useState(1); // 1 = Every floor, 2 = Every 2 floors, 3 = Every 3 floors
  const [flatCost, setFlatCost] = useState(8000000); // 80 Lakhs
  const [currentStageIndex, setCurrentStageIndex] = useState(3); // Default on Plinth / Foundation
  const [hasLoan, setHasLoan] = useState(true);
  const [loanPct, setLoanPct] = useState(80); // 80% loan, 20% own funds
  const [interestRate, setInterestRate] = useState(8.5); // 8.5% p.a.
  const [tenureYears, setTenureYears] = useState(20);
  const [monthsPerStage, setMonthsPerStage] = useState(3); // Avg 3 months between stages
  const [includeTaxes, setIncludeTaxes] = useState(true);
  const [stampDutyPct, setStampDutyPct] = useState(6.0); // 6% Maharashtra stamp duty
  const [regFee, setRegFee] = useState(30000);
  const [gstPct, setGstPct] = useState(5.0); // 5% GST on under-construction
  
  // UI states
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Generate dynamic milestones or use standard presets
  let activeMilestones = [];
  if (scheduleMode === 'STANDARD_10_STAGE') {
    activeMilestones = CLP_PRESETS.STANDARD_10_STAGE;
  } else if (scheduleMode === 'COMPRESSED_18_MONTH') {
    activeMilestones = CLP_PRESETS.COMPRESSED_18_MONTH;
  } else {
    activeMilestones = generateBuildingMilestones(totalFloors, slabInterval);
  }

  // Ensure currentStageIndex is within bounds
  const clampedStageIndex = Math.min(currentStageIndex, Math.max(0, activeMilestones.length - 1));

  const results = calculateCLP(
    flatCost,
    clampedStageIndex,
    activeMilestones,
    hasLoan,
    loanPct,
    interestRate,
    tenureYears,
    monthsPerStage,
    stampDutyPct,
    regFee,
    gstPct
  );

  const scheduleName = scheduleMode === 'STANDARD_10_STAGE' 
    ? 'Standard Construction Linked Plan (10 Stages)' 
    : scheduleMode === 'COMPRESSED_18_MONTH' 
      ? '18-Month Compressed Construction Linked Plan (7 Stages)' 
      : `Dynamic Multi-Storey Building (${totalFloors} Floors)`;

  useEffect(() => {
    setResultText(
      `Property Cost: ${formatINR(flatCost)}\nSchedule: ${scheduleName}\nCurrent Stage: ${results.currentStageName} (${results.cumPctTillNow}%)\nTotal Paid Till Now: ${formatINR(results.paidTillNow)}\nPending Balance: ${formatINR(results.pendingBalance)}\nBank Disbursed: ${formatINR(results.bankDisbursedTillNow)}\nTotal Pre-EMI Interest: ${formatINR(results.totalPreEmiInterestDuringConstruction)}\nFull EMI After Possession: ${formatINR(results.postPossessionFullEmi)}/mo`
    );
  }, [flatCost, scheduleName, results.currentStageName, results.cumPctTillNow, results.paidTillNow, results.pendingBalance, results.bankDisbursedTillNow, results.totalPreEmiInterestDuringConstruction, results.postPossessionFullEmi]);

  // Handle WhatsApp Share
  const handleWhatsAppShare = () => {
    let text = `*Construction Linked Plan Payment Schedule*\n`;
    text += `*Property Price:* ${formatINR(flatCost)}\n`;
    text += `*Schedule Model:* ${scheduleName}\n\n`;
    text += `*STAGE-WISE PAYMENT BREAKDOWN:*\n`;
    
    results.milestoneRows.forEach((r) => {
      text += `• ${r.index}. ${r.name} (${r.stagePct}%): ${formatINR(r.stageCost)}`;
      if (hasLoan && r.monthlyPreEmi > 0) {
        text += ` | Pre-EMI: ${formatINR(r.monthlyPreEmi)}/mo`;
      }
      text += `\n`;
    });

    if (hasLoan) {
      text += `\n*FINANCING SUMMARY:*\n`;
      text += `• Buyer Margin (Down Payment): ${formatINR(results.totalBuyerMargin)} (${100 - loanPct}%)\n`;
      text += `• Bank Loan Sanctioned: ${formatINR(results.totalLoanSanctioned)} (${loanPct}%)\n`;
      text += `• Estimated Total Pre-EMI Interest (during construction): ${formatINR(results.totalPreEmiInterestDuringConstruction)}\n`;
      text += `• Full EMI After Possession: ${formatINR(results.postPossessionFullEmi)}/mo for ${tenureYears} Years\n`;
    }

    if (includeTaxes) {
      text += `\n*STATUTORY TAXES & CHARGES:*\n`;
      text += `• Stamp Duty + Registration + GST: ${formatINR(results.taxes.totalTaxes)}\n`;
      text += `• Total All-Inclusive Outgo: ${formatINR(results.taxes.totalAllInclusiveCost)}\n`;
    }

    text += `\nCalculate your Construction Linked Plan schedule online at: https://rupeebuddy.in/?calc=clp`;
    
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Handle Copy to Clipboard
  const handleCopySummary = () => {
    let text = `Construction Linked Plan Payment Schedule\n`;
    text += `Property Price: ${formatINR(flatCost)}\n`;
    text += `Schedule: ${scheduleName}\n\n`;
    results.milestoneRows.forEach((r) => {
      text += `${r.index}. ${r.name} (${r.stagePct}%): ${formatINR(r.stageCost)}\n`;
    });
    if (hasLoan) {
      text += `\nLoan Sanctioned: ${formatINR(results.totalLoanSanctioned)}\n`;
      text += `Total Pre-EMI Interest: ${formatINR(results.totalPreEmiInterestDuringConstruction)}\n`;
      text += `Full EMI After Possession: ${formatINR(results.postPossessionFullEmi)}/mo\n`;
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Chart data: Buyer Paid vs Bank Disbursed vs Pending
  const chartData = {
    labels: ['Buyer Margin Paid', 'Bank Loan Disbursed', 'Remaining Pending Demands'],
    datasets: [
      {
        data: [
          results.buyerPaidTillNow,
          results.bankDisbursedTillNow,
          results.pendingBalance
        ],
        backgroundColor: ['#1e3a8a', '#10b981', '#cbd5e1'],
        hoverBackgroundColor: ['#1d4ed8', '#059669', '#94a3b8'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { family: 'Inter', size: 11 },
          color: '#1e293b',
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.label}: ${formatINR(context.raw)}`,
        },
      },
    },
  };

  const faqs = [
    {
      q: 'What is a Construction Linked Plan?',
      a: 'A Construction Linked Plan is a property payment schedule where you pay the builder in instalments tied strictly to physical construction milestones — booking, foundation, plinth, slab, brickwork, finishing, and possession — instead of paying the full price upfront or in a flat down payment. Each instalment is legally due only after that specific stage is certified complete.'
    },
    {
      q: 'How is the Construction Linked Plan payment schedule calculated?',
      a: 'The total property price is divided into percentage instalments against fixed construction stages. In standard Indian real estate, 10% is paid on booking, 10% on agreement/allotment, 10% on foundation, 10% on plinth, 10% on 1st slab, 15% on superstructure, 10% on brickwork, 10% on plaster/flooring, 10% on external finishing, and the remaining 5% on possession.'
    },
    {
      q: 'What is Pre-EMI in a Construction Linked Plan?',
      a: 'Pre-EMI is the interest-only payment you make to your lending bank during the construction period, calculated strictly on the loan amount disbursed so far — not the full sanctioned loan amount. Once the builder completes construction and hands over possession, the bank disburses the final loan tranche and your loan transitions to a full regular EMI (principal + interest).'
    },
    {
      q: 'How much total Pre-EMI interest will I pay during construction?',
      a: 'Total Pre-EMI interest depends on your loan interest rate and the construction duration between milestone tranches. For example, on an ₹80 Lakh property with an ₹64 Lakh loan at 8.5% interest across a 30-month construction timeline, the total accumulated Pre-EMI interest is approximately ₹5,10,000 before full possession EMIs begin.'
    },
    {
      q: 'Is GST charged on Construction Linked Plan instalments?',
      a: 'Yes. For under-construction properties, each Construction Linked Plan instalment attracts 5% GST for standard residential units (or 1% GST for affordable housing priced under ₹45 Lakhs with carpet area up to 60 sq.m in metros or 90 sq.m in non-metros). No GST applies if you buy a ready-to-move-in property after the Occupancy Certificate (OC) or Completion Certificate (CC) has been issued.'
    },
    {
      q: 'What is the RERA Section 13 10% Advance Cap?',
      a: 'Under Section 13(1) of the Real Estate (Regulation and Development) Act 2016 (RERA), a builder or promoter cannot accept more than 10% of the flat cost as an advance or application booking fee without first executing and registering a written Agreement for Sale.'
    },
    {
      q: 'Is a Construction Linked Plan better than a Down Payment Plan?',
      a: 'A Construction Linked Plan spreads your financial risk across the construction timeline — you pay only as physical work is completed on-site. A Down Payment Plan requires paying 80% to 95% upfront within 30-60 days; while it usually offers a 5% to 8% price discount, it puts your capital at high risk if the project is delayed. For most homebuyers, a Construction Linked Plan offers the safest cash-flow protection.'
    },
    {
      q: 'What documents should I verify before releasing a Construction Linked Plan milestone payment?',
      a: 'Before releasing funds or asking your bank to disburse a loan tranche, demand: 1) Certified Architect Milestone Completion Certificate, 2) Structural Engineer inspection report, 3) Updated site photographs, and 4) Confirmation that payments are routed into the project\'s RERA Designated 70% Bank Escrow Account.'
    }
  ];

  return (
    <div className="calculator-container">
      <div className="calculator-wrapper-grid">
        {/* Input Panel */}
        <div className="calculator-panel">
          
          {/* Schedule Model Selector */}
          <div className="slider-group no-print" style={{ marginBottom: '16px' }}>
            <span className="slider-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={16} className="text-primary" /> Construction Milestone Schedule Type
            </span>
            <div className="custom-select-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
              <button
                type="button"
                className={`custom-select-option ${scheduleMode === 'STANDARD_10_STAGE' ? 'selected' : ''}`}
                onClick={() => {
                  setScheduleMode('STANDARD_10_STAGE');
                  setCurrentStageIndex(3);
                }}
                style={{ padding: '8px 10px', fontSize: '12px' }}
              >
                Standard (10 Stages)
              </button>
              <button
                type="button"
                className={`custom-select-option ${scheduleMode === 'COMPRESSED_18_MONTH' ? 'selected' : ''}`}
                onClick={() => {
                  setScheduleMode('COMPRESSED_18_MONTH');
                  setCurrentStageIndex(2);
                }}
                style={{ padding: '8px 10px', fontSize: '12px' }}
              >
                18-Month Plan (7 Stages)
              </button>
              <button
                type="button"
                className={`custom-select-option ${scheduleMode === 'DYNAMIC_BUILDING' ? 'selected' : ''}`}
                onClick={() => {
                  setScheduleMode('DYNAMIC_BUILDING');
                  setCurrentStageIndex(6);
                }}
                style={{ padding: '8px 10px', fontSize: '12px' }}
              >
                Dynamic High-Rise ({totalFloors} Floors)
              </button>
            </div>
          </div>

          {/* Dynamic Floors Controls */}
          {scheduleMode === 'DYNAMIC_BUILDING' && (
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="slider-group">
                <div className="slider-header">
                  <span className="slider-label" style={{ fontWeight: '600', color: 'var(--brand-navy)' }}>
                    Total Number of Floors in Building
                  </span>
                  <NumericInput
                    value={totalFloors}
                    onChange={(v) => {
                      const floors = Math.max(1, Math.min(80, Number(v) || 1));
                      setTotalFloors(floors);
                    }}
                    min={1}
                    max={80}
                    step={1}
                    suffix=" Floors"
                    ariaLabel="Total Floors in Building"
                  />
                </div>
                <div className="slider-control-row">
                  <input
                    type="range"
                    min="1"
                    max="60"
                    step="1"
                    value={totalFloors}
                    onChange={(e) => setTotalFloors(Number(e.target.value))}
                    className="slider-input"
                  />
                </div>
                <div className="slider-limits">
                  <span>1 Floor (G+1)</span>
                  <span>60 Floors (High-Rise)</span>
                </div>
                <div className="quick-options-row no-print" style={{ marginTop: '4px' }}>
                  <button type="button" className="quick-option-btn" onClick={() => setTotalFloors(4)}>G+4</button>
                  <button type="button" className="quick-option-btn" onClick={() => setTotalFloors(7)}>G+7</button>
                  <button type="button" className="quick-option-btn" onClick={() => setTotalFloors(15)}>15 Floors</button>
                  <button type="button" className="quick-option-btn" onClick={() => setTotalFloors(25)}>25 Floors</button>
                  <button type="button" className="quick-option-btn" onClick={() => setTotalFloors(38)}>38 Floors</button>
                </div>
              </div>

              {/* Slab Milestone Interval */}
              <div style={{ borderTop: '1px dotted #cbd5e1', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-main)', fontWeight: '500' }}>
                  Slab Demand Frequency:
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    type="button"
                    className={`quick-option-btn ${slabInterval === 1 ? 'active-filter' : ''}`}
                    onClick={() => setSlabInterval(1)}
                    style={{
                      fontSize: '11px',
                      padding: '4px 10px',
                      backgroundColor: slabInterval === 1 ? 'var(--brand-navy)' : '#ffffff',
                      color: slabInterval === 1 ? '#ffffff' : 'var(--text-main)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    Every Floor
                  </button>
                  {totalFloors >= 10 && (
                    <button
                      type="button"
                      className={`quick-option-btn ${slabInterval === 2 ? 'active-filter' : ''}`}
                      onClick={() => setSlabInterval(2)}
                      style={{
                        fontSize: '11px',
                        padding: '4px 10px',
                        backgroundColor: slabInterval === 2 ? 'var(--brand-navy)' : '#ffffff',
                        color: slabInterval === 2 ? '#ffffff' : 'var(--text-main)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      Every 2 Floors
                    </button>
                  )}
                  {totalFloors >= 15 && (
                    <button
                      type="button"
                      className={`quick-option-btn ${slabInterval === 3 ? 'active-filter' : ''}`}
                      onClick={() => setSlabInterval(3)}
                      style={{
                        fontSize: '11px',
                        padding: '4px 10px',
                        backgroundColor: slabInterval === 3 ? 'var(--brand-navy)' : '#ffffff',
                        color: slabInterval === 3 ? '#ffffff' : 'var(--text-main)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      Every 3 Floors
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Agreement / Flat Cost */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Property Price / Agreement Value</span>
              <NumericInput
                value={flatCost}
                onChange={setFlatCost}
                min={500000}
                max={500000000}
                step={50000}
                prefix="₹"
                ariaLabel="Property Agreement Value"
              />
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="2000000"
                max="50000000"
                step="100000"
                value={flatCost}
                onChange={(e) => setFlatCost(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>₹20 Lakhs</span>
              <span>₹5 Crore</span>
            </div>
            <div className="quick-options-row no-print">
              <button type="button" className="quick-option-btn" onClick={() => setFlatCost(4500000)}>₹45L</button>
              <button type="button" className="quick-option-btn" onClick={() => setFlatCost(6000000)}>₹60L</button>
              <button type="button" className="quick-option-btn" onClick={() => setFlatCost(8000000)}>₹80L</button>
              <button type="button" className="quick-option-btn" onClick={() => setFlatCost(10000000)}>₹1 Cr</button>
              <button type="button" className="quick-option-btn" onClick={() => setFlatCost(15000000)}>₹1.5 Cr</button>
              <button type="button" className="quick-option-btn" onClick={() => setFlatCost(25000000)}>₹2.5 Cr</button>
            </div>
          </div>

          {/* Current Construction Stage Selector */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Current Construction Stage Reached</span>
              <span className="slider-value-display" style={{ fontSize: '13px', maxWidth: '200px', textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Stage {clampedStageIndex + 1}: {results.cumPctTillNow}%
              </span>
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="0"
                max={activeMilestones.length - 1}
                step="1"
                value={clampedStageIndex}
                onChange={(e) => setCurrentStageIndex(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div style={{ marginTop: '6px' }}>
              <select
                value={clampedStageIndex}
                onChange={(e) => setCurrentStageIndex(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-card)',
                  fontFamily: 'inherit',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--brand-navy)'
                }}
              >
                {activeMilestones.map((m, idx) => (
                  <option key={idx} value={idx}>
                    Stage {idx + 1}: {m.name} ({m.pct}%)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Home Loan Funding Toggle */}
          <div className="slider-group no-print" style={{ marginTop: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="slider-label">Funded by Home Loan?</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className={`quick-option-btn ${hasLoan ? 'active-filter' : ''}`}
                  onClick={() => setHasLoan(true)}
                  style={{
                    backgroundColor: hasLoan ? 'var(--brand-navy)' : 'var(--bg-light)',
                    color: hasLoan ? '#ffffff' : 'var(--text-main)',
                    fontWeight: '600',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  Yes (Bank Loan)
                </button>
                <button
                  type="button"
                  className={`quick-option-btn ${!hasLoan ? 'active-filter' : ''}`}
                  onClick={() => setHasLoan(false)}
                  style={{
                    backgroundColor: !hasLoan ? 'var(--brand-navy)' : 'var(--bg-light)',
                    color: !hasLoan ? '#ffffff' : 'var(--text-main)',
                    fontWeight: '600',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  100% Self-Funded
                </button>
              </div>
            </div>
          </div>

          {/* Home Loan Parameters if loan enabled */}
          {hasLoan && (
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="slider-header">
                <span className="slider-label" style={{ fontSize: '13px' }}>Loan Funding (% of Price)</span>
                <NumericInput
                  value={loanPct}
                  onChange={(v) => setLoanPct(Math.min(90, Math.max(10, v)))}
                  min={10}
                  max={90}
                  step={5}
                  suffix="%"
                  ariaLabel="Loan Percentage"
                />
              </div>
              <div className="slider-control-row">
                <input
                  type="range"
                  min="50"
                  max="90"
                  step="5"
                  value={loanPct}
                  onChange={(e) => setLoanPct(Number(e.target.value))}
                  className="slider-input"
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                <span>Buyer Margin: <strong>{100 - loanPct}% ({formatINR(results.totalBuyerMargin)})</strong></span>
                <span>Bank Loan: <strong>{loanPct}% ({formatINR(results.totalLoanSanctioned)})</strong></span>
              </div>

              {/* Interest Rate, Tenure & Construction Speed */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '4px' }}>
                <div>
                  <span className="slider-label" style={{ fontSize: '11px' }}>Interest Rate (p.a.)</span>
                  <div style={{ marginTop: '4px' }}>
                    <NumericInput
                      value={interestRate}
                      onChange={setInterestRate}
                      min={5}
                      max={15}
                      step={0.1}
                      suffix="%"
                      ariaLabel="Interest Rate"
                    />
                  </div>
                </div>
                <div>
                  <span className="slider-label" style={{ fontSize: '11px' }}>Tenure (Post-Possession)</span>
                  <div style={{ marginTop: '4px' }}>
                    <NumericInput
                      value={tenureYears}
                      onChange={setTenureYears}
                      min={5}
                      max={30}
                      step={1}
                      suffix=" Yr"
                      ariaLabel="Tenure in Years"
                    />
                  </div>
                </div>
                <div>
                  <span className="slider-label" style={{ fontSize: '11px' }}>Avg Months / Stage</span>
                  <div style={{ marginTop: '4px' }}>
                    <NumericInput
                      value={monthsPerStage}
                      onChange={setMonthsPerStage}
                      min={1}
                      max={6}
                      step={1}
                      suffix=" Mo"
                      ariaLabel="Months Per Stage"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Government Taxes Toggle */}
          <div className="slider-group no-print" style={{ marginTop: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: 'var(--brand-navy)' }}>
              <input
                type="checkbox"
                checked={includeTaxes}
                onChange={(e) => setIncludeTaxes(e.target.checked)}
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
              Include Statutory Taxes & Govt Charges (Stamp Duty, GST, Registration)
            </label>
            {includeTaxes && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '8px', fontSize: '11px', background: '#f1f5f9', padding: '10px', borderRadius: '6px' }}>
                <div>
                  <span>Stamp Duty (6%): <strong>{formatINR(results.taxes.stampDutyAmount)}</strong></span>
                </div>
                <div>
                  <span>Registration: <strong>{formatINR(results.taxes.registrationAmount)}</strong></span>
                </div>
                <div>
                  <span>GST (5%): <strong>{formatINR(results.taxes.gstAmount)}</strong></span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Results & Progress Panel */}
        <div className="results-panel">
          <div className="results-header">
            <h3 className="results-title">Construction Payment Summary</h3>
            <span className="results-subtitle">
              Milestone Progress: <strong>{results.cumPctTillNow}% Demanded</strong>
            </span>
          </div>

          {/* Construction Visual Progress Bar */}
          <div style={{ margin: '16px 0 20px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', marginBottom: '6px' }}>
              <span style={{ color: 'var(--brand-navy)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Building2 size={15} /> Stage {results.currentStageIndex + 1} of {activeMilestones.length}
              </span>
              <span style={{ color: 'var(--finance-green)' }}>{results.cumPctTillNow}% Completed</span>
            </div>
            <div style={{ width: '100%', height: '12px', backgroundColor: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${results.cumPctTillNow}%`, 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #1e3a8a 0%, #10b981 100%)', 
                  borderRadius: '10px',
                  transition: 'width 0.4s ease'
                }} 
              />
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Current Milestone: <strong>{results.currentStageName}</strong>
            </div>
          </div>

          {/* 4 Main Output Cards (Matching Top Tier Design) */}
          <div className="output-cards-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <div className="output-summary-card" style={{ padding: '14px', background: '#f8fafc' }}>
              <span className="summary-card-label">Total Property Price</span>
              <span className="summary-card-value" style={{ color: 'var(--brand-navy)', fontSize: '20px' }}>
                {formatINR(flatCost)}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Paid till now: <strong>{formatINR(results.paidTillNow)}</strong>
              </span>
            </div>

            <div className="output-summary-card" style={{ padding: '14px', background: '#f8fafc' }}>
              <span className="summary-card-label">Bank Loan Amount</span>
              <span className="summary-card-value" style={{ color: '#2563eb', fontSize: '20px' }}>
                {formatINR(results.totalLoanSanctioned)}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {loanPct}% of property price
              </span>
            </div>

            {hasLoan && (
              <>
                <div className="output-summary-card" style={{ padding: '14px', background: '#fffbeb', border: '1px solid #fde68a' }}>
                  <span className="summary-card-label" style={{ color: '#92400e' }}>Pre-EMI Interest (Construction)</span>
                  <span className="summary-card-value" style={{ color: '#b45309', fontSize: '19px' }}>
                    {formatINR(results.totalPreEmiInterestDuringConstruction)}
                  </span>
                  <span style={{ fontSize: '11px', color: '#92400e' }}>
                    Current stage: <strong>{formatINR(results.currentPreEmi)}/mo</strong>
                  </span>
                </div>

                <div className="output-summary-card" style={{ padding: '14px', background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                  <span className="summary-card-label" style={{ color: '#1e40af' }}>EMI After Possession</span>
                  <span className="summary-card-value" style={{ color: '#1d4ed8', fontSize: '19px' }}>
                    {formatINR(results.postPossessionFullEmi)} / mo
                  </span>
                  <span style={{ fontSize: '11px', color: '#1e40af' }}>
                    Full amortized EMI for {tenureYears} yrs
                  </span>
                </div>
              </>
            )}
          </div>

          {/* All-Inclusive Total (with Taxes) */}
          {includeTaxes && (
            <div style={{ marginTop: '16px', background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--brand-navy)' }}>
                    Total All-Inclusive Cost (Flat + Taxes)
                  </span>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                    Base: {formatINR(flatCost)} + Stamp Duty/Reg/GST: {formatINR(results.taxes.totalTaxes)}
                  </p>
                </div>
                <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--brand-navy)' }}>
                  {formatINR(results.taxes.totalAllInclusiveCost)}
                </span>
              </div>
            </div>
          )}

          {/* Action / Share Bar */}
          <div className="no-print" style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <button
              type="button"
              onClick={handleWhatsAppShare}
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 14px',
                backgroundColor: '#25D366',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
            >
              <Share2 size={16} /> Share on WhatsApp
            </button>
            <button
              type="button"
              onClick={handleCopySummary}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 14px',
                backgroundColor: '#ffffff',
                color: 'var(--brand-navy)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 14px',
                backgroundColor: '#ffffff',
                color: 'var(--brand-navy)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <Printer size={16} /> Print
            </button>
          </div>

          {/* Doughnut Chart */}
          <div className="chart-container-wrapper" style={{ marginTop: '20px' }}>
            <div className="chart-wrapper">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          </div>

        </div>
      </div>

      {/* Comprehensive Milestone Breakdown Table */}
      <div style={{ marginTop: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--brand-navy)', margin: 0 }}>
              Stage-Wise Construction Linked Payment & Pre-EMI Schedule ({activeMilestones.length} Stages)
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
              Click any stage row to set the current active construction milestone and simulate cash flows.
            </p>
          </div>
          <span className="no-print" style={{ fontSize: '12px', background: 'var(--brand-navy-light)', color: 'var(--brand-navy)', padding: '4px 10px', borderRadius: '4px', fontWeight: '600' }}>
            {scheduleName}
          </span>
        </div>

        <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: '#ffffff', boxShadow: 'var(--shadow-sm)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--brand-navy)', color: '#ffffff' }}>
                <th style={{ padding: '10px 12px' }}>Stage</th>
                <th style={{ padding: '10px 12px' }}>Construction Milestone</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>%</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Amount Due (₹)</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Cum. %</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Cumulative (₹)</th>
                {hasLoan && <th style={{ padding: '10px 12px', textAlign: 'right' }}>Pre-EMI / mo (₹)</th>}
                <th style={{ padding: '10px 12px', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {results.milestoneRows.map((row, idx) => {
                const isSelected = idx === clampedStageIndex;
                const isCompleted = idx < clampedStageIndex;
                return (
                  <tr
                    key={idx}
                    onClick={() => setCurrentStageIndex(idx)}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      backgroundColor: isSelected 
                        ? '#eff6ff' 
                        : isCompleted 
                          ? '#f8fafc' 
                          : '#ffffff',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease',
                      fontWeight: isSelected ? '700' : 'normal'
                    }}
                  >
                    <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{row.index}</td>
                    <td style={{ padding: '10px 12px', color: isSelected ? 'var(--primary)' : 'inherit' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {isCompleted && <CheckCircle2 size={14} style={{ color: 'var(--finance-green)', flexShrink: 0 }} />}
                        {isSelected && <Building2 size={14} style={{ color: 'var(--primary)', flexShrink: 0 }} />}
                        {!isCompleted && !isSelected && <Clock size={14} style={{ color: '#94a3b8', flexShrink: 0 }} />}
                        <span>{row.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '600' }}>{row.stagePct}%</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '600', color: 'var(--brand-navy)' }}>
                      {formatINR(row.stageCost)}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right' }}>{row.cumulativePct}%</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right' }}>{formatINR(row.cumulativeCost)}</td>
                    {hasLoan && (
                      <td style={{ padding: '10px 12px', textAlign: 'right', color: '#b45309', fontWeight: isSelected ? '700' : '500' }}>
                        {row.monthlyPreEmi > 0 ? `${formatINR(row.monthlyPreEmi)}/mo` : '₹0'}
                      </td>
                    )}
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                      {isCompleted && (
                        <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600' }}>
                          Paid
                        </span>
                      )}
                      {isSelected && (
                        <span style={{ backgroundColor: '#dbeafe', color: '#1e40af', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '700' }}>
                          Current
                        </span>
                      )}
                      {!isCompleted && !isSelected && (
                        <span style={{ backgroundColor: '#f1f5f9', color: '#64748b', padding: '2px 8px', borderRadius: '12px', fontSize: '11px' }}>
                          Upcoming
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
          * Estimates only. Assumes the bank disburses your loan tranche stage-wise once your own contribution is exhausted, with approximately {monthsPerStage} months between stages. Actual disbursement and GST treatment depend on your builder's registered agreement and your lender's sanction letter.
        </p>
      </div>

      {/* Comprehensive SEO & Knowledge Guide Section */}
      <div className="calculator-guide-section no-print" style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '24px', color: 'var(--brand-navy)', marginBottom: '16px', fontWeight: '800' }}>
          Complete Guide to Construction Linked Plans in Indian Real Estate
        </h2>

        {/* Section 1: What is a Construction Linked Plan */}
        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', color: 'var(--brand-navy)', marginBottom: '12px', fontWeight: '700' }}>
            What Is a Construction Linked Plan?
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: '1.7', margin: '0 0 12px 0' }}>
            A <strong>Construction Linked Plan</strong> is the most widely used and legally protected payment structure for under-construction property in India. Instead of paying the full price at booking or within a fixed 30-to-60 day window, you pay in instalments that are released <strong>only when the builder finishes a defined physical construction stage</strong> — foundation, plinth, individual floor slabs, brickwork, plaster, finishing, and finally possession.
          </p>
          <p style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: '1.7', margin: 0 }}>
            This linkage directly protects the homebuyer against developer default. If the builder stalls after the plinth stage, your financial exposure is strictly limited to what you have paid up to the plinth stage, rather than the entire property cost. That is why <strong>RERA (Real Estate Regulatory Authority)</strong> mandates that every registered project disclose its detailed Construction Linked Plan schedule in Annexure-A of the registered Agreement for Sale.
          </p>
        </div>

        {/* Section 2: How Home Loan Tranche Disbursals Work */}
        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', color: 'var(--brand-navy)', marginBottom: '12px', fontWeight: '700' }}>
            How Home Loan Disbursement & Pre-EMI Works Under a Construction Linked Plan
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: '1.7', margin: '0 0 12px 0' }}>
            When a property purchase is funded by a home loan, leading banks (SBI, HDFC Bank, ICICI Bank, Axis Bank, Bank of Baroda) do <strong>not</strong> disburse the entire loan upfront. Instead, the process works as follows:
          </p>
          <ol style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: '1.7', paddingLeft: '20px', margin: '0 0 14px 0' }}>
            <li><strong>Own Contribution (Margin Money) First:</strong> The buyer pays the initial 10% to 20% down payment from personal funds across the booking, agreement, and initial foundation stages.</li>
            <li><strong>Stage-Wise Bank Disbursals:</strong> Once your margin money is fully paid, the bank sends an independent technical valuer to verify physical on-site slab completion before releasing each loan tranche.</li>
            <li><strong>Pre-EMI (Simple Interest Only):</strong> During construction, you pay simple interest <em>only</em> on the actual loan amount disbursed to date, rather than the full sanctioned loan amount.</li>
            <li><strong>Conversion to Full EMI:</strong> Upon receipt of the Occupancy Certificate (OC) and handover of keys, the bank disburses the final loan tranche and your regular amortized EMI (Principal + Interest) begins.</li>
          </ol>
        </div>

        {/* Section 3: Comparison Table - CLP vs DPP vs PLP vs Flexi */}
        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', color: 'var(--brand-navy)', marginBottom: '16px', fontWeight: '700' }}>
            Real Estate Payment Plans Comparison: Construction Linked vs Down Payment vs Possession Linked vs Flexi
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '700' }}>Payment Plan</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '700' }}>Payment Schedule</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '700' }}>Risk Level</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '700' }}>Builder Discount</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '700' }}>Best Suited For</th>
                </tr>
              </thead>
              <tbody style={{ divideY: '1px solid #e2e8f0' }}>
                <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#f0fdf4' }}>
                  <td style={{ padding: '10px 12px', fontWeight: '700', color: 'var(--brand-navy)' }}>Construction Linked Plan</td>
                  <td style={{ padding: '10px 12px' }}>Spread across 7 to 35 verified stages</td>
                  <td style={{ padding: '10px 12px', color: '#166534', fontWeight: '600' }}>Lowest Risk</td>
                  <td style={{ padding: '10px 12px' }}>Standard Price</td>
                  <td style={{ padding: '10px 12px' }}>End-use homebuyers & salaried buyers</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px 12px', fontWeight: '700', color: 'var(--brand-navy)' }}>Down Payment Plan (DPP)</td>
                  <td style={{ padding: '10px 12px' }}>10% booking, 80-90% within 30-60 days</td>
                  <td style={{ padding: '10px 12px', color: '#dc2626', fontWeight: '600' }}>High Risk</td>
                  <td style={{ padding: '10px 12px', color: '#166534', fontWeight: '600' }}>5% to 8% Discount</td>
                  <td style={{ padding: '10px 12px' }}>High-liquidity investors with Tier-1 builders</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px 12px', fontWeight: '700', color: 'var(--brand-navy)' }}>Possession Linked Plan (PLP)</td>
                  <td style={{ padding: '10px 12px' }}>20% booking, 80% on possession</td>
                  <td style={{ padding: '10px 12px', color: '#166534', fontWeight: '600' }}>Low Risk</td>
                  <td style={{ padding: '10px 12px' }}>Premium Price (2-5% higher)</td>
                  <td style={{ padding: '10px 12px' }}>Buyers currently paying heavy house rent</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px 12px', fontWeight: '700', color: 'var(--brand-navy)' }}>Flexi Plan (e.g. 10:80:10)</td>
                  <td style={{ padding: '10px 12px' }}>10% booking, bank subvention, 10% possession</td>
                  <td style={{ padding: '10px 12px', color: '#d97706', fontWeight: '600' }}>Moderate Risk</td>
                  <td style={{ padding: '10px 12px' }}>Moderate Price</td>
                  <td style={{ padding: '10px 12px' }}>Buyers seeking low initial cash outflows</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 4: GST & RERA Regulations */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ color: 'var(--brand-navy)', fontSize: '16px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={18} className="text-primary" /> RERA Section 13 (10% Advance Cap)
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: '1.6', margin: 0 }}>
              Under <strong>Section 13 of the RERA Act 2016</strong>, no promoter or builder can demand or accept more than <strong>10% of the flat value</strong> as an advance payment or application fee without first executing and registering a written <strong>Agreement for Sale</strong>. Demanding higher sums before registration is a statutory violation.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ color: 'var(--brand-navy)', fontSize: '16px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <DollarSign size={18} className="text-primary" /> GST Rates on Under-Construction Property
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: '1.6', margin: 0 }}>
              • <strong>Standard Residential:</strong> 5% GST without Input Tax Credit (ITC).<br />
              • <strong>Affordable Housing:</strong> 1% GST without ITC (properties up to ₹45 Lakhs with carpet area ≤60 sq.m in metros or ≤90 sq.m in non-metros).<br />
              • <strong>Ready-to-Move Properties:</strong> 0% GST (Zero GST applies once the Occupancy Certificate is issued).
            </p>
          </div>
        </div>

        {/* Section 5: Pre-EMI vs Full EMI comparison */}
        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', color: 'var(--brand-navy)', marginBottom: '12px', fontWeight: '700' }}>
            Pre-EMI vs Full-EMI: Which Loan Repayment Method Should You Choose?
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginTop: '12px' }}>
            <div style={{ background: '#f0fdf4', padding: '16px', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
              <h5 style={{ color: '#166534', margin: '0 0 6px 0', fontSize: '14px', fontWeight: '700' }}>Option A: Pre-EMI Interest Only</h5>
              <p style={{ fontSize: '12px', color: 'var(--text-main)', lineHeight: '1.6', margin: 0 }}>
                • <strong>How it works:</strong> You pay simple interest only on the loan amount disbursed to date.<br />
                • <strong>Advantage:</strong> Much lower monthly cash outflow while paying rent for your existing home.<br />
                • <strong>Drawback:</strong> Loan principal remains unchanged during construction, meaning total interest paid over 20 years is higher.
              </p>
            </div>
            <div style={{ background: '#eff6ff', padding: '16px', borderRadius: '6px', border: '1px solid #bfdbfe' }}>
              <h5 style={{ color: '#1e40af', margin: '0 0 6px 0', fontSize: '14px', fontWeight: '700' }}>Option B: Full Tranche EMI</h5>
              <p style={{ fontSize: '12px', color: 'var(--text-main)', lineHeight: '1.6', margin: 0 }}>
                • <strong>How it works:</strong> You start paying full EMI (principal + interest) on each disbursed tranche immediately.<br />
                • <strong>Advantage:</strong> Saves substantial interest cost over the loan lifecycle and reduces total tenure.<br />
                • <strong>Drawback:</strong> Higher monthly cash outflow while the property is still under construction.
              </p>
            </div>
          </div>
        </div>

        {/* Section 6: Interactive FAQs Accordion */}
        <div style={{ marginTop: '32px' }}>
          <h3 style={{ fontSize: '20px', color: 'var(--brand-navy)', marginBottom: '16px', fontWeight: '700' }}>
            Frequently Asked Questions (FAQs) on Construction Linked Plans
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  style={{
                    background: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: 'var(--brand-navy)'
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        color: 'var(--text-muted)',
                        flexShrink: 0
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 18px 16px 18px', fontSize: '13px', color: 'var(--text-main)', lineHeight: '1.6' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
