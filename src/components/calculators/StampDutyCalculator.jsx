import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { STAMP_DUTY_RATES, calculateStampDuty } from '../../utils/formulas';
import { formatINR } from '../../utils/format';
import NumericInput from '../common/NumericInput';
import { 
  Building2, ShieldCheck, Share2, Copy, Check, Printer, 
  MapPin, UserCheck, ChevronDown, DollarSign, Scale 
} from 'lucide-react';

export default function StampDutyCalculator({ setResultText }) {
  const [selectedState, setSelectedState] = useState('MAHARASHTRA');
  const [propertyPrice, setPropertyPrice] = useState(7500000); // 75 Lakhs
  const [gender, setGender] = useState('male'); // 'male' | 'female' | 'joint'
  const [isUrban, setIsUrban] = useState(true);
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const results = calculateStampDuty(selectedState, propertyPrice, gender, isUrban);

  useEffect(() => {
    setResultText(
      `State: ${results.stateName}\nProperty Price: ${formatINR(propertyPrice)}\nBuyer Category: ${gender.toUpperCase()}\nTotal Stamp Duty: ${formatINR(results.totalStampDuty)} (${results.appliedRate}% + ${results.cessRate}% cess)\nRegistration Fee: ${formatINR(results.registrationFee)}\nTotal Govt Outgo: ${formatINR(results.totalGovtCharges)}\nAll-Inclusive Total: ${formatINR(results.totalPropertyOutgo)}`
    );
  }, [selectedState, propertyPrice, gender, isUrban, results]);

  const handleWhatsAppShare = () => {
    let text = `*Stamp Duty & Property Registration Calculation*\n`;
    text += `*State:* ${results.stateName}\n`;
    text += `*Property Price:* ${formatINR(propertyPrice)}\n`;
    text += `*Ownership:* ${gender === 'female' ? 'Female (Concession)' : gender === 'joint' ? 'Joint (Male + Female)' : 'Male'}\n\n`;
    text += `• Stamp Duty (${results.appliedRate}%): ${formatINR(results.baseStampDuty)}\n`;
    if (results.cessAmount > 0) {
      text += `• Metro/Infra Cess (${results.cessRate}%): ${formatINR(results.cessAmount)}\n`;
    }
    text += `• Registration Fee: ${formatINR(results.registrationFee)}\n`;
    text += `• *Total Govt Charges:* ${formatINR(results.totalGovtCharges)}\n`;
    text += `• *All-Inclusive Total Outgo:* ${formatINR(results.totalPropertyOutgo)}\n\n`;
    text += `Calculate property stamp duty across all Indian states: https://rupeebuddy.in/?calc=stampduty`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopySummary = () => {
    let text = `Stamp Duty & Registration Summary\nState: ${results.stateName}\nProperty Price: ${formatINR(propertyPrice)}\nStamp Duty: ${formatINR(results.totalStampDuty)}\nRegistration Fee: ${formatINR(results.registrationFee)}\nTotal Govt Charges: ${formatINR(results.totalGovtCharges)}\nTotal Outgo: ${formatINR(results.totalPropertyOutgo)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const chartData = {
    labels: ['Base Property Cost', 'Stamp Duty & Cess', 'Registration Fee'],
    datasets: [
      {
        data: [results.propertyPrice, results.totalStampDuty, results.registrationFee],
        backgroundColor: ['#1e3a8a', '#d97706', '#10b981'],
        hoverBackgroundColor: ['#1d4ed8', '#b45309', '#059669'],
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
        labels: { font: { family: 'Inter', size: 11 }, color: '#1e293b' },
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
      q: 'What is Stamp Duty on Property in India?',
      a: 'Stamp Duty is a mandatory tax levied by state governments on the transfer and registration of property documents under the Indian Stamp Act, 1899. Paying stamp duty provides legal validity and ownership recognition in court.'
    },
    {
      q: 'Do women buyers get a concession on Stamp Duty in India?',
      a: 'Yes! Several states offer a 1% to 2% stamp duty discount to promote women property ownership. For instance, in Delhi (4% for females vs 6% for males), Haryana (5% vs 7%), Maharashtra (5% vs 6% for residential flats), Punjab, and Uttar Pradesh.'
    },
    {
      q: 'Is Registration Fee separate from Stamp Duty?',
      a: 'Yes. While Stamp Duty is typically 4% to 8% of property market value, Registration Fee is usually 1% (often capped at ₹30,000 in Maharashtra or ₹50,000 in Haryana) charged by the sub-registrar office for archiving legal ownership records.'
    },
    {
      q: 'Can Stamp Duty be claimed as a tax deduction under Section 80C?',
      a: 'Yes. Under Section 80C of the Income Tax Act, you can claim a deduction of up to ₹1.5 Lakhs for Stamp Duty and registration charges paid in the financial year the property was purchased.'
    }
  ];

  return (
    <div className="calculator-container">
      <div className="calculator-wrapper-grid">
        {/* Input Panel */}
        <div className="calculator-panel">
          
          {/* State Selector */}
          <div className="slider-group">
            <span className="slider-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={16} className="text-primary" /> Select Indian State / UT
            </span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-card)',
                fontFamily: 'inherit',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--brand-navy)',
                marginTop: '6px'
              }}
            >
              {Object.keys(STAMP_DUTY_RATES).map((key) => (
                <option key={key} value={key}>
                  {STAMP_DUTY_RATES[key].name} (Male: {STAMP_DUTY_RATES[key].male}%, Female: {STAMP_DUTY_RATES[key].female}%)
                </option>
              ))}
            </select>
          </div>

          {/* Property Market Value */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-label">Property Market / Agreement Value</span>
              <NumericInput
                value={propertyPrice}
                onChange={setPropertyPrice}
                min={100000}
                max={500000000}
                step={50000}
                prefix="₹"
                ariaLabel="Property Value"
              />
            </div>
            <div className="slider-control-row">
              <input
                type="range"
                min="1000000"
                max="30000000"
                step="100000"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="slider-input"
              />
            </div>
            <div className="slider-limits">
              <span>₹10 Lakhs</span>
              <span>₹3 Crore</span>
            </div>
            <div className="quick-options-row no-print">
              <button type="button" className="quick-option-btn" onClick={() => setPropertyPrice(3500000)}>₹35L</button>
              <button type="button" className="quick-option-btn" onClick={() => setPropertyPrice(5000000)}>₹50L</button>
              <button type="button" className="quick-option-btn" onClick={() => setPropertyPrice(7500000)}>₹75L</button>
              <button type="button" className="quick-option-btn" onClick={() => setPropertyPrice(10000000)}>₹1 Cr</button>
              <button type="button" className="quick-option-btn" onClick={() => setPropertyPrice(15000000)}>₹1.5 Cr</button>
              <button type="button" className="quick-option-btn" onClick={() => setPropertyPrice(25000000)}>₹2.5 Cr</button>
            </div>
          </div>

          {/* Ownership / Gender Concession */}
          <div className="slider-group">
            <span className="slider-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <UserCheck size={16} className="text-primary" /> Buyer Category / Gender Concession
            </span>
            <div className="custom-select-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '6px' }}>
              <button
                type="button"
                className={`custom-select-option ${gender === 'male' ? 'selected' : ''}`}
                onClick={() => setGender('male')}
                style={{ padding: '8px 10px', fontSize: '13px' }}
              >
                Male Buyer
              </button>
              <button
                type="button"
                className={`custom-select-option ${gender === 'female' ? 'selected' : ''}`}
                onClick={() => setGender('female')}
                style={{ padding: '8px 10px', fontSize: '13px' }}
              >
                👩 Female (Discount)
              </button>
              <button
                type="button"
                className={`custom-select-option ${gender === 'joint' ? 'selected' : ''}`}
                onClick={() => setGender('joint')}
                style={{ padding: '8px 10px', fontSize: '13px' }}
              >
                Joint (M+F)
              </button>
            </div>
          </div>

          {/* Locality Area Type */}
          <div className="slider-group no-print">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="slider-label">Locality / Jurisdiction</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className={`quick-option-btn ${isUrban ? 'active-filter' : ''}`}
                  onClick={() => setIsUrban(true)}
                  style={{
                    backgroundColor: isUrban ? 'var(--brand-navy)' : 'var(--bg-light)',
                    color: isUrban ? '#ffffff' : 'var(--text-main)',
                    fontWeight: '600',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  Urban (Corporation)
                </button>
                <button
                  type="button"
                  className={`quick-option-btn ${!isUrban ? 'active-filter' : ''}`}
                  onClick={() => setIsUrban(false)}
                  style={{
                    backgroundColor: !isUrban ? 'var(--brand-navy)' : 'var(--bg-light)',
                    color: !isUrban ? '#ffffff' : 'var(--text-main)',
                    fontWeight: '600',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  Rural (Panchayat)
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Results Panel */}
        <div className="results-panel">
          <div className="results-header">
            <h3 className="results-title">Stamp Duty & Registration Charges</h3>
            <span className="results-subtitle">
              {results.stateName} &bull; Effective Rate: <strong>{results.effectiveDutyPercentage}%</strong>
            </span>
          </div>

          {/* 4 Output Cards */}
          <div className="output-cards-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '16px' }}>
            <div className="output-summary-card" style={{ padding: '14px', background: '#fffbeb', border: '1px solid #fde68a' }}>
              <span className="summary-card-label" style={{ color: '#92400e' }}>Total Stamp Duty</span>
              <span className="summary-card-value" style={{ color: '#b45309', fontSize: '20px' }}>
                {formatINR(results.totalStampDuty)}
              </span>
              <span style={{ fontSize: '11px', color: '#92400e' }}>
                Rate: {results.appliedRate}% {results.cessRate > 0 ? `+ ${results.cessRate}% Cess` : ''}
              </span>
            </div>

            <div className="output-summary-card" style={{ padding: '14px', background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
              <span className="summary-card-label" style={{ color: '#166534' }}>Registration Charges</span>
              <span className="summary-card-value" style={{ color: '#15803d', fontSize: '20px' }}>
                {formatINR(results.registrationFee)}
              </span>
              <span style={{ fontSize: '11px', color: '#166534' }}>
                Sub-registrar legal archiving fee
              </span>
            </div>

            <div className="output-summary-card" style={{ padding: '14px', background: '#f8fafc' }}>
              <span className="summary-card-label">Total Govt Revenue Charges</span>
              <span className="summary-card-value" style={{ color: 'var(--brand-navy)', fontSize: '20px' }}>
                {formatINR(results.totalGovtCharges)}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Stamp duty + Registration + Cess
              </span>
            </div>

            <div className="output-summary-card" style={{ padding: '14px', background: '#eff6ff', border: '1px solid #bfdbfe' }}>
              <span className="summary-card-label" style={{ color: '#1e40af' }}>Total Property Outgo</span>
              <span className="summary-card-value" style={{ color: '#1d4ed8', fontSize: '20px' }}>
                {formatINR(results.totalPropertyOutgo)}
              </span>
              <span style={{ fontSize: '11px', color: '#1e40af' }}>
                Flat Cost + Govt Registration
              </span>
            </div>
          </div>

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
                cursor: 'pointer'
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

      {/* State-by-State Rates Comparison Table */}
      <div style={{ marginTop: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--brand-navy)', marginBottom: '12px' }}>
          Stamp Duty & Registration Rates Across Major Indian States (2026)
        </h3>
        <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: '#ffffff' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--brand-navy)', color: '#ffffff' }}>
                <th style={{ padding: '10px 12px' }}>State / Union Territory</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Male (%)</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Female (%)</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Joint (%)</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Registration Fee</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Estimated on ₹75L</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(STAMP_DUTY_RATES).map((k) => {
                const s = STAMP_DUTY_RATES[k];
                const est = calculateStampDuty(k, 7500000, 'male');
                const isCurrent = k === selectedState;
                return (
                  <tr
                    key={k}
                    onClick={() => setSelectedState(k)}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      backgroundColor: isCurrent ? '#eff6ff' : '#ffffff',
                      cursor: 'pointer',
                      fontWeight: isCurrent ? '700' : 'normal'
                    }}
                  >
                    <td style={{ padding: '10px 12px', color: isCurrent ? 'var(--primary)' : 'inherit' }}>
                      {s.name} {isCurrent && '📍'}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right' }}>{s.male}%</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', color: s.female < s.male ? '#15803d' : 'inherit' }}>
                      {s.female}% {s.female < s.male ? '🌟' : ''}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right' }}>{s.joint}%</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                      {s.regCap > 0 ? `Capped ₹${s.regCap.toLocaleString('en-IN')}` : `${s.regPct}%`}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '600', color: 'var(--brand-navy)' }}>
                      {formatINR(est.totalGovtCharges)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEO & FAQs Guide */}
      <div className="calculator-guide-section no-print" style={{ marginTop: '40px' }}>
        <h3 style={{ fontSize: '20px', color: 'var(--brand-navy)', marginBottom: '16px', fontWeight: '700' }}>
          Frequently Asked Questions (FAQs) on Stamp Duty in India
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} style={{ background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
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
  );
}
