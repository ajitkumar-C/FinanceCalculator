import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { 
  CLP_PRESETS, 
  generateBuildingMilestones, 
  calculateCLP 
} from '../../utils/formulas';
import { formatINR } from '../../utils/format';
import NumericInput from '../common/NumericInput';
import { Building2, CheckCircle2, Clock, AlertCircle, Sparkles, HelpCircle, Layers } from 'lucide-react';

export default function ClpCalculator({ setResultText }) {
  // Preset type: 'GALAXY_HEIGHTS' | 'MAHARERA_10_STAGE' | 'DYNAMIC_BUILDING'
  const [presetType, setPresetType] = useState('GALAXY_HEIGHTS');
  const [customFloors, setCustomFloors] = useState(25);
  const [flatCost, setFlatCost] = useState(7500000); // 75 Lakhs
  const [currentStageIndex, setCurrentStageIndex] = useState(9); // Default around 14th floor slab
  const [hasLoan, setHasLoan] = useState(true);
  const [loanPct, setLoanPct] = useState(80); // 80% loan, 20% own funds
  const [interestRate, setInterestRate] = useState(8.5); // 8.5% p.a.
  const [tenureYears, setTenureYears] = useState(20);
  const [includeTaxes, setIncludeTaxes] = useState(true);
  const [stampDutyPct, setStampDutyPct] = useState(6.0); // 6% Maharashtra stamp duty
  const [regFee, setRegFee] = useState(30000);
  const [gstPct, setGstPct] = useState(5.0); // 5% GST on under-construction

  // Get active milestones list
  let activeMilestones = CLP_PRESETS.GALAXY_HEIGHTS;
  if (presetType === 'MAHARERA_10_STAGE') {
    activeMilestones = CLP_PRESETS.MAHARERA_10_STAGE;
  } else if (presetType === 'DYNAMIC_BUILDING') {
    activeMilestones = generateBuildingMilestones(customFloors);
  }

  // Ensure currentStageIndex is within bounds
  const clampedStageIndex = Math.min(currentStageIndex, activeMilestones.length - 1);

  const results = calculateCLP(
    flatCost,
    clampedStageIndex,
    activeMilestones,
    hasLoan,
    loanPct,
    interestRate,
    tenureYears,
    stampDutyPct,
    regFee,
    gstPct
  );

  useEffect(() => {
    setResultText(
      `Flat Cost: ${formatINR(flatCost)}\nCurrent Stage: ${results.currentStageName} (${results.cumPctTillNow}%)\nTotal Paid Till Now: ${formatINR(results.paidTillNow)}\nPending Balance: ${formatINR(results.pendingBalance)}\nBank Disbursed: ${formatINR(results.bankDisbursedTillNow)}\nMonthly Pre-EMI Interest: ${formatINR(results.currentPreEmi)}`
    );
  }, [flatCost, results.currentStageName, results.cumPctTillNow, results.paidTillNow, results.pendingBalance, results.bankDisbursedTillNow, results.currentPreEmi]);

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

  return (
    <div className="calculator-container">
      <div className="calculator-wrapper-grid">
        {/* Input Panel */}
        <div className="calculator-panel">
          
          {/* Preset Selector */}
          <div className="slider-group no-print" style={{ marginBottom: '16px' }}>
            <span className="slider-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={16} className="text-primary" /> Construction Milestone Schedule Model
            </span>
            <div className="custom-select-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
              <button
                type="button"
                className={`custom-select-option ${presetType === 'GALAXY_HEIGHTS' ? 'selected' : ''}`}
                onClick={() => {
                  setPresetType('GALAXY_HEIGHTS');
                  setCurrentStageIndex(Math.min(9, CLP_PRESETS.GALAXY_HEIGHTS.length - 1));
                }}
                style={{ padding: '8px 10px', fontSize: '12px' }}
              >
                Galaxy Heights (34 Stages)
              </button>
              <button
                type="button"
                className={`custom-select-option ${presetType === 'MAHARERA_10_STAGE' ? 'selected' : ''}`}
                onClick={() => {
                  setPresetType('MAHARERA_10_STAGE');
                  setCurrentStageIndex(Math.min(3, CLP_PRESETS.MAHARERA_10_STAGE.length - 1));
                }}
                style={{ padding: '8px 10px', fontSize: '12px' }}
              >
                MahaRERA (10 Milestones)
              </button>
              <button
                type="button"
                className={`custom-select-option ${presetType === 'DYNAMIC_BUILDING' ? 'selected' : ''}`}
                onClick={() => {
                  setPresetType('DYNAMIC_BUILDING');
                  setCurrentStageIndex(Math.min(5, generateBuildingMilestones(customFloors).length - 1));
                }}
                style={{ padding: '8px 10px', fontSize: '12px' }}
              >
                Custom High-Rise Floors
              </button>
            </div>
          </div>

          {/* If Dynamic Floors selected */}
          {presetType === 'DYNAMIC_BUILDING' && (
            <div className="slider-group no-print" style={{ marginBottom: '16px', background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div className="slider-header">
                <span className="slider-label">Total Number of Floors in Building</span>
                <NumericInput
                  value={customFloors}
                  onChange={(v) => {
                    const floors = Math.max(1, Math.min(60, v));
                    setCustomFloors(floors);
                  }}
                  min={1}
                  max={60}
                  step={1}
                  suffix=" Floors"
                  ariaLabel="Building Floors"
                />
              </div>
              <div className="slider-control-row">
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={customFloors}
                  onChange={(e) => setCustomFloors(Number(e.target.value))}
                  className="slider-input"
                />
              </div>
              <div className="quick-options-row no-print" style={{ marginTop: '8px' }}>
                <button type="button" className="quick-option-btn" onClick={() => setCustomFloors(7)}>7 Floors (G+7)</button>
                <button type="button" className="quick-option-btn" onClick={() => setCustomFloors(15)}>15 Floors</button>
                <button type="button" className="quick-option-btn" onClick={() => setCustomFloors(25)}>25 Floors</button>
                <button type="button" className="quick-option-btn" onClick={() => setCustomFloors(38)}>38 Floors</button>
              </div>
            </div>
          )}

          {/* Agreement / Flat Cost */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Total Flat Agreement Value / Base Cost</span>
              <NumericInput
                value={flatCost}
                onChange={setFlatCost}
                min={500000}
                max={500000000}
                step={50000}
                prefix="₹"
                ariaLabel="Flat Agreement Value"
              />
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="1000000"
                max="30000000"
                step="100000"
                value={flatCost}
                onChange={(e) => setFlatCost(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>₹10 Lakhs</span>
              <span>₹3 Crore</span>
            </div>
            <div className="quick-options-row no-print">
              <button type="button" className="quick-option-btn" onClick={() => setFlatCost(4500000)}>45L</button>
              <button type="button" className="quick-option-btn" onClick={() => setFlatCost(7500000)}>75L</button>
              <button type="button" className="quick-option-btn" onClick={() => setFlatCost(10000000)}>1 Cr</button>
              <button type="button" className="quick-option-btn" onClick={() => setFlatCost(15000000)}>1.5 Cr</button>
              <button type="button" className="quick-option-btn" onClick={() => setFlatCost(25000000)}>2.5 Cr</button>
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
              <span className="slider-label">Funding Mode</span>
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
                  Bank Home Loan
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
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="slider-header">
                <span className="slider-label" style={{ fontSize: '13px' }}>Bank Loan Percentage</span>
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

              {/* Interest Rate & Tenure Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '4px' }}>
                <div>
                  <span className="slider-label" style={{ fontSize: '12px' }}>Interest Rate (p.a.)</span>
                  <div style={{ marginTop: '4px' }}>
                    <NumericInput
                      value={interestRate}
                      onChange={setInterestRate}
                      min={6}
                      max={18}
                      step={0.1}
                      suffix="%"
                      ariaLabel="Interest Rate"
                    />
                  </div>
                </div>
                <div>
                  <span className="slider-label" style={{ fontSize: '12px' }}>Tenure (Years)</span>
                  <div style={{ marginTop: '4px' }}>
                    <NumericInput
                      value={tenureYears}
                      onChange={setTenureYears}
                      min={1}
                      max={30}
                      step={1}
                      suffix=" Yr"
                      ariaLabel="Tenure in Years"
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
                  <span>Stamp Duty: <strong>{stampDutyPct}% ({formatINR(results.taxes.stampDutyAmount)})</strong></span>
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
              Milestone Progress: <strong>{results.cumPctTillNow}% Completed</strong>
            </span>
          </div>

          {/* Construction Visual Progress Bar */}
          <div style={{ margin: '16px 0 20px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', marginBottom: '6px' }}>
              <span style={{ color: 'var(--brand-navy)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Building2 size={15} /> Stage {results.currentStageIndex + 1} of {activeMilestones.length}
              </span>
              <span style={{ color: 'var(--finance-green)' }}>{results.cumPctTillNow}% Demanded</span>
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

          {/* Output Cards */}
          <div className="output-cards-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <div className="output-summary-card" style={{ padding: '14px' }}>
              <span className="summary-card-label">Total Paid Till Current Stage</span>
              <span className="summary-card-value" style={{ color: 'var(--finance-green)', fontSize: '20px' }}>
                {formatINR(results.paidTillNow)}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {results.cumPctTillNow}% of Base Flat Cost
              </span>
            </div>

            <div className="output-summary-card" style={{ padding: '14px' }}>
              <span className="summary-card-label">Pending Future Demands</span>
              <span className="summary-card-value" style={{ color: '#d97706', fontSize: '20px' }}>
                {formatINR(results.pendingBalance)}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {(100 - results.cumPctTillNow).toFixed(1)}% payable until possession
              </span>
            </div>

            {hasLoan && (
              <>
                <div className="output-summary-card" style={{ padding: '14px', background: '#f8fafc' }}>
                  <span className="summary-card-label">Bank Loan Disbursed So Far</span>
                  <span className="summary-card-value" style={{ color: '#2563eb', fontSize: '18px' }}>
                    {formatINR(results.bankDisbursedTillNow)}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Buyer Paid: {formatINR(results.buyerPaidTillNow)}
                  </span>
                </div>

                <div className="output-summary-card" style={{ padding: '14px', background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                  <span className="summary-card-label">Current Monthly Pre-EMI Interest</span>
                  <span className="summary-card-value" style={{ color: '#166534', fontSize: '18px' }}>
                    {formatINR(results.currentPreEmi)} / mo
                  </span>
                  <span style={{ fontSize: '11px', color: '#15803d' }}>
                    Simple interest on ₹{formatINR(results.bankDisbursedTillNow)}
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
              Milestone-by-Milestone CLP Schedule Breakdown
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
              Click any stage row to simulate payments and Pre-EMI interest up to that construction milestone.
            </p>
          </div>
          <span className="no-print" style={{ fontSize: '12px', background: 'var(--brand-navy-light)', color: 'var(--brand-navy)', padding: '4px 10px', borderRadius: '4px', fontWeight: '600' }}>
            {activeMilestones.length} Total Milestones
          </span>
        </div>

        <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: '#ffffff', boxShadow: 'var(--shadow-sm)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--brand-navy)', color: '#ffffff' }}>
                <th style={{ padding: '10px 12px' }}>#</th>
                <th style={{ padding: '10px 12px' }}>Construction Milestone</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Stage %</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Demand Amount (₹)</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Cum. %</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Cumulative Total (₹)</th>
                {hasLoan && <th style={{ padding: '10px 12px', textAlign: 'right' }}>Bank Disbursal (₹)</th>}
                {hasLoan && <th style={{ padding: '10px 12px', textAlign: 'right' }}>Monthly Pre-EMI (₹)</th>}
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
                      <td style={{ padding: '10px 12px', textAlign: 'right', color: row.bankDisbursal > 0 ? '#2563eb' : '#64748b' }}>
                        {formatINR(row.bankDisbursal)}
                      </td>
                    )}
                    {hasLoan && (
                      <td style={{ padding: '10px 12px', textAlign: 'right', color: '#166534', fontWeight: isSelected ? '700' : '500' }}>
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
      </div>

      {/* SEO & Knowledge Guide Section */}
      <div className="calculator-guide-section no-print" style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '22px', color: 'var(--brand-navy)', marginBottom: '16px', fontWeight: '700' }}>
          Understanding Construction Linked Plans (CLP) in India & Maharashtra (MahaRERA)
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          <div className="guide-card" style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ color: 'var(--brand-navy)', fontSize: '16px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Building2 size={18} className="text-primary" /> What is a Construction Linked Payment Plan (CLP)?
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: '1.6', margin: 0 }}>
              A <strong>Construction Linked Plan (CLP)</strong> is the standard, legally regulated payment structure in Indian real estate. Instead of paying upfront or on arbitrary calendar dates, the buyer and lending bank release payments in <strong>staged tranches linked strictly to verified on-site construction milestones</strong> (e.g. Plinth, 5th Floor Slab, Brickwork, Plaster, Possession).
            </p>
          </div>

          <div className="guide-card" style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ color: 'var(--brand-navy)', fontSize: '16px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={18} className="text-primary" /> MahaRERA Section 13 (10% Advance Cap)
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: '1.6', margin: 0 }}>
              Under <strong>Section 13 of the RERA Act 2016</strong> and MahaRERA rules, a builder or promoter <strong>cannot accept more than 10%</strong> of the flat cost as an advance or booking amount without executing and registering a written <strong>Agreement for Sale</strong>. Demanding more than 10% prior to registration is illegal.
            </p>
          </div>
        </div>

        {/* Pre-EMI vs Full-EMI comparison */}
        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', color: 'var(--brand-navy)', marginBottom: '12px' }}>
            Pre-EMI Interest vs Full-EMI: Which is Best for Under-Construction Flats?
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginTop: '12px' }}>
            <div style={{ background: '#f0fdf4', padding: '16px', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
              <h5 style={{ color: '#166534', margin: '0 0 6px 0', fontSize: '14px' }}>Pre-EMI Interest Only</h5>
              <p style={{ fontSize: '12px', color: 'var(--text-main)', lineHeight: '1.5', margin: 0 }}>
                • You pay simple interest only on the actual loan amount disbursed by the bank so far.<br />
                • Lower initial monthly cash outgo while you may still be paying house rent.<br />
                • <em>Note:</em> Principal loan balance remains unchanged until full possession.
              </p>
            </div>
            <div style={{ background: '#eff6ff', padding: '16px', borderRadius: '6px', border: '1px solid #bfdbfe' }}>
              <h5 style={{ color: '#1e40af', margin: '0 0 6px 0', fontSize: '14px' }}>Full Tranche EMI (Principal + Interest)</h5>
              <p style={{ fontSize: '12px', color: 'var(--text-main)', lineHeight: '1.5', margin: 0 }}>
                • You start repaying both principal and interest from the day the first tranche is released.<br />
                • Significantly reduces total interest paid over the 20-year loan tenure.<br />
                • Recommended if you have surplus monthly disposable income.
              </p>
            </div>
          </div>
        </div>

        {/* Homebuyer Checklist */}
        <div style={{ background: '#fffbeb', padding: '20px', borderRadius: '8px', border: '1px solid #fde68a', marginBottom: '24px' }}>
          <h4 style={{ color: '#92400e', fontSize: '16px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertCircle size={18} /> Homebuyer Checklist: Before Paying a Builder Demand Letter
          </h4>
          <ul style={{ fontSize: '13px', color: '#78350f', lineHeight: '1.6', paddingLeft: '20px', margin: 0 }}>
            <li><strong>Architect Certificate:</strong> Verify that the demand letter is accompanied by a certified Architect Stage Completion Certificate.</li>
            <li><strong>MahaRERA Project Progress:</strong> Check the quarterly progress report (QPR) on the official MahaRERA portal (`maharera.maharashtra.gov.in`).</li>
            <li><strong>Bank Verification:</strong> When taking a home loan, your bank will dispatch a technical valuer to verify physical slab completion before releasing funds.</li>
            <li><strong>70% Escrow Account:</strong> Ensure payments are made strictly to the RERA Designated Bank Escrow Account mentioned in your registered Agreement for Sale.</li>
          </ul>
        </div>

        {/* FAQs */}
        <h3 style={{ fontSize: '18px', color: 'var(--brand-navy)', marginBottom: '12px' }}>
          Frequently Asked Questions (FAQs) on CLP Calculators
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <details style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '6px', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
            <summary style={{ fontWeight: '600', color: 'var(--brand-navy)', fontSize: '14px' }}>
              How is the slab-by-slab percentage calculated in high-rise buildings?
            </summary>
            <p style={{ fontSize: '13px', color: 'var(--text-main)', marginTop: '8px', lineHeight: '1.5', margin: 0 }}>
              In multi-storey towers (e.g. 15 to 40 floors), the RCC structural slab casting stage represents approximately 25% to 35% of the total flat cost. This percentage is distributed equally or in batches across floor slabs (e.g., ~1.70% per slab or every 3 floors like in the Galaxy Heights schedule).
            </p>
          </details>

          <details style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '6px', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
            <summary style={{ fontWeight: '600', color: 'var(--brand-navy)', fontSize: '14px' }}>
              Can the builder demand 100% payment before receiving the Occupancy Certificate (OC)?
            </summary>
            <p style={{ fontSize: '13px', color: 'var(--text-main)', marginTop: '8px', lineHeight: '1.5', margin: 0 }}>
              No. Under standard RERA norms, the final 5% (and sometimes the finishing 5%) is payable only upon the receipt of the Occupancy Certificate (OC) or Completion Certificate (CC) and intimation of possession.
            </p>
          </details>

          <details style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '6px', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
            <summary style={{ fontWeight: '600', color: 'var(--brand-navy)', fontSize: '14px' }}>
              What happens if construction is delayed? Do I still pay Pre-EMI?
            </summary>
            <p style={{ fontSize: '13px', color: 'var(--text-main)', marginTop: '8px', lineHeight: '1.5', margin: 0 }}>
              If construction is halted, the bank does not release further milestone tranches. However, you must continue paying the monthly Pre-EMI interest on the amount already disbursed to date. Under MahaRERA, if possession is delayed beyond the agreed date, the promoter is liable to pay you monthly interest at SBI MCLR + 2% for every month of delay.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
