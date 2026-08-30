import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { calculateBrokerage } from '../../utils/formulas';
import { formatINR } from '../../utils/format';
import NumericInput from '../common/NumericInput';
import { 
  Building2, DollarSign, Share2, Copy, Check, Printer, 
  Percent, ShieldCheck, ChevronDown, UserCheck 
} from 'lucide-react';

export default function BrokerageCalculator({ setResultText }) {
  const [isRental, setIsRental] = useState(false);
  const [propertyPrice, setPropertyPrice] = useState(8500000); // 85 Lakhs for sale
  const [monthlyRent, setMonthlyRent] = useState(35000); // 35k for rent
  const [commissionRatePct, setCommissionRatePct] = useState(2.0); // 2% for sale
  const [rentMonths, setRentMonths] = useState(1); // 1 month rent for rental
  const [includeGst, setIncludeGst] = useState(true);
  const [deductTds, setDeductTds] = useState(true);
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const valueToPass = isRental ? monthlyRent : propertyPrice;
  const results = calculateBrokerage(
    valueToPass,
    commissionRatePct,
    isRental,
    rentMonths,
    includeGst,
    deductTds
  );

  useEffect(() => {
    setResultText(
      `Deal Type: ${isRental ? 'Rental Lease' : 'Property Sale'}\nDeal Value: ${formatINR(valueToPass)}\nBase Commission: ${formatINR(results.baseCommission)}\n18% GST: ${formatINR(results.gstAmount)}\n5% TDS (Sec 194H): ${formatINR(results.tdsAmount)}\nNet In-Hand Payable: ${formatINR(results.netPayableToBroker)}`
    );
  }, [isRental, valueToPass, commissionRatePct, rentMonths, includeGst, deductTds, results]);

  const handleWhatsAppShare = () => {
    let text = `*Real Estate Brokerage Commission Invoice Calculation*\n`;
    text += `*Deal Type:* ${isRental ? 'Rental Lease' : 'Property Sale / Resale'}\n`;
    text += `*Deal Value:* ${formatINR(valueToPass)}\n\n`;
    text += `• Base Commission: ${formatINR(results.baseCommission)}\n`;
    if (includeGst) {
      text += `• GST (18%): ${formatINR(results.gstAmount)}\n`;
      text += `• Total Invoice Amount: ${formatINR(results.invoiceTotal)}\n`;
    }
    if (deductTds) {
      text += `• TDS Deduction (5% u/s 194H): -${formatINR(results.tdsAmount)}\n`;
    }
    text += `• *Net In-Hand Payable to Broker:* ${formatINR(results.netPayableToBroker)}\n\n`;
    text += `Calculate real estate commission, GST & TDS online: https://rupeebuddy.in/?calc=brokerage`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopySummary = () => {
    let text = `Brokerage Summary\nDeal Value: ${formatINR(valueToPass)}\nBase Commission: ${formatINR(results.baseCommission)}\nGST (18%): ${formatINR(results.gstAmount)}\nTDS (5%): ${formatINR(results.tdsAmount)}\nNet Payout: ${formatINR(results.netPayableToBroker)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const chartData = {
    labels: ['Base Commission', '18% GST', '5% TDS (Section 194H)'],
    datasets: [
      {
        data: [results.baseCommission, results.gstAmount, results.tdsAmount],
        backgroundColor: ['#1e3a8a', '#d97706', '#dc2626'],
        hoverBackgroundColor: ['#1d4ed8', '#b45309', '#b91c1c'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { font: { family: 'Inter', size: 11 }, color: '#1e293b' } },
      tooltip: { callbacks: { label: (context) => ` ${context.label}: ${formatINR(context.raw)}` } },
    },
  };

  const faqs = [
    {
      q: 'What is the standard real estate brokerage rate in India?',
      a: 'For property sale / resale transactions, standard brokerage is 1% to 2% of the total property agreement value from both buyer and seller. For rental leases, the standard commission is typically 1 month\'s rent for an 11-month lease agreement.'
    },
    {
      q: 'Is GST applicable on real estate brokerage in India?',
      a: 'Yes. Real estate agency and brokerage services attract 18% GST (9% CGST + 9% SGST, or 18% IGST) if the broker or agency is GST-registered with annual turnover above ₹20 Lakhs.'
    },
    {
      q: 'What is Section 194H TDS on Brokerage Commission?',
      a: 'Under Section 194H of the Income Tax Act, any person or company paying commission or brokerage exceeding ₹15,000 in a financial year must deduct 5% TDS at the time of payment and issue Form 16A to the broker.'
    }
  ];

  return (
    <div className="calculator-container">
      <div className="calculator-wrapper-grid">
        {/* Input Panel */}
        <div className="calculator-panel">
          
          {/* Deal Type Switcher */}
          <div className="slider-group no-print">
            <span className="slider-label">Transaction Deal Type</span>
            <div className="custom-select-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '6px' }}>
              <button
                type="button"
                className={`custom-select-option ${!isRental ? 'selected' : ''}`}
                onClick={() => setIsRental(false)}
                style={{ padding: '10px 12px', fontSize: '13px' }}
              >
                🏡 Property Sale / Purchase
              </button>
              <button
                type="button"
                className={`custom-select-option ${isRental ? 'selected' : ''}`}
                onClick={() => setIsRental(true)}
                style={{ padding: '10px 12px', fontSize: '13px' }}
              >
                🔑 Rental / Lease Agreement
              </button>
            </div>
          </div>

          {!isRental ? (
            <>
              {/* Sale Property Price */}
              <div className="slider-group">
                <div className="slider-header">
                  <span className="slider-label">Property Sale Agreement Price</span>
                  <NumericInput
                    value={propertyPrice}
                    onChange={setPropertyPrice}
                    min={500000}
                    max={500000000}
                    step={50000}
                    prefix="₹"
                    ariaLabel="Property Price"
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
                <div className="quick-options-row no-print">
                  <button type="button" className="quick-option-btn" onClick={() => setPropertyPrice(4500000)}>₹45L</button>
                  <button type="button" className="quick-option-btn" onClick={() => setPropertyPrice(7500000)}>₹75L</button>
                  <button type="button" className="quick-option-btn" onClick={() => setPropertyPrice(10000000)}>₹1 Cr</button>
                  <button type="button" className="quick-option-btn" onClick={() => setPropertyPrice(15000000)}>₹1.5 Cr</button>
                </div>
              </div>

              {/* Commission Percentage */}
              <div className="slider-group">
                <div className="slider-header">
                  <span className="slider-label">Commission Rate</span>
                  <NumericInput
                    value={commissionRatePct}
                    onChange={setCommissionRatePct}
                    min={0.5}
                    max={5}
                    step={0.25}
                    suffix="%"
                    ariaLabel="Commission Percentage"
                  />
                </div>
                <div className="slider-control-row">
                  <input
                    type="range"
                    min="0.5"
                    max="4"
                    step="0.25"
                    value={commissionRatePct}
                    onChange={(e) => setCommissionRatePct(Number(e.target.value))}
                    className="slider-input"
                  />
                </div>
                <div className="quick-options-row no-print">
                  <button type="button" className="quick-option-btn" onClick={() => setCommissionRatePct(1.0)}>1.0%</button>
                  <button type="button" className="quick-option-btn" onClick={() => setCommissionRatePct(1.5)}>1.5%</button>
                  <button type="button" className="quick-option-btn" onClick={() => setCommissionRatePct(2.0)}>2.0% (Standard)</button>
                  <button type="button" className="quick-option-btn" onClick={() => setCommissionRatePct(3.0)}>3.0%</button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Rental Monthly Rent */}
              <div className="slider-group">
                <div className="slider-header">
                  <span className="slider-label">Monthly Rent Amount</span>
                  <NumericInput
                    value={monthlyRent}
                    onChange={setMonthlyRent}
                    min={5000}
                    max={1000000}
                    step={1000}
                    prefix="₹"
                    ariaLabel="Monthly Rent"
                  />
                </div>
                <div className="slider-control-row">
                  <input
                    type="range"
                    min="10000"
                    max="200000"
                    step="1000"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(Number(e.target.value))}
                    className="slider-input"
                  />
                </div>
              </div>

              {/* Rental Commission Multiplier */}
              <div className="slider-group">
                <span className="slider-label">Rental Brokerage Tenure</span>
                <div className="custom-select-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '6px' }}>
                  <button
                    type="button"
                    className={`custom-select-option ${rentMonths === 0.5 ? 'selected' : ''}`}
                    onClick={() => setRentMonths(0.5)}
                    style={{ padding: '8px 10px', fontSize: '12px' }}
                  >
                    15 Days Rent
                  </button>
                  <button
                    type="button"
                    className={`custom-select-option ${rentMonths === 1 ? 'selected' : ''}`}
                    onClick={() => setRentMonths(1)}
                    style={{ padding: '8px 10px', fontSize: '12px' }}
                  >
                    1 Month Rent
                  </button>
                  <button
                    type="button"
                    className={`custom-select-option ${rentMonths === 2 ? 'selected' : ''}`}
                    onClick={() => setRentMonths(2)}
                    style={{ padding: '8px 10px', fontSize: '12px' }}
                  >
                    2 Months Rent
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Tax Toggles (GST & TDS) */}
          <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: 'var(--brand-navy)' }}>
              <input
                type="checkbox"
                checked={includeGst}
                onChange={(e) => setIncludeGst(e.target.checked)}
                style={{ width: '16px', height: '16px' }}
              />
              Add 18% GST to Agency Invoice
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: 'var(--brand-navy)' }}>
              <input
                type="checkbox"
                checked={deductTds}
                onChange={(e) => setDeductTds(e.target.checked)}
                style={{ width: '16px', height: '16px' }}
              />
              Deduct 5% TDS under Section 194H
            </label>
          </div>

        </div>

        {/* Results Panel */}
        <div className="results-panel">
          <div className="results-header">
            <h3 className="results-title">Brokerage Invoice & Payout Summary</h3>
            <span className="results-subtitle">
              Deal Value: <strong>{formatINR(valueToPass)}</strong>
            </span>
          </div>

          <div className="output-cards-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '16px' }}>
            <div className="output-summary-card" style={{ padding: '14px', background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
              <span className="summary-card-label" style={{ color: '#166534' }}>Net In-Hand Payable</span>
              <span className="summary-card-value" style={{ color: '#15803d', fontSize: '22px' }}>
                {formatINR(results.netPayableToBroker)}
              </span>
              <span style={{ fontSize: '11px', color: '#166534' }}>
                Total cash received by broker
              </span>
            </div>

            <div className="output-summary-card" style={{ padding: '14px', background: '#eff6ff', border: '1px solid #bfdbfe' }}>
              <span className="summary-card-label" style={{ color: '#1e40af' }}>Base Commission Fee</span>
              <span className="summary-card-value" style={{ color: '#1d4ed8', fontSize: '22px' }}>
                {formatINR(results.baseCommission)}
              </span>
              <span style={{ fontSize: '11px', color: '#1e40af' }}>
                {isRental ? `${rentMonths} month(s) rent` : `${commissionRatePct}% on agreement`}
              </span>
            </div>

            <div className="output-summary-card" style={{ padding: '14px', background: '#f8fafc' }}>
              <span className="summary-card-label">18% GST Charged</span>
              <span className="summary-card-value" style={{ color: '#d97706', fontSize: '18px' }}>
                {formatINR(results.gstAmount)}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Invoice Total: {formatINR(results.invoiceTotal)}
              </span>
            </div>

            <div className="output-summary-card" style={{ padding: '14px', background: '#f8fafc' }}>
              <span className="summary-card-label">5% TDS Deducted (194H)</span>
              <span className="summary-card-value" style={{ color: '#dc2626', fontSize: '18px' }}>
                {formatINR(results.tdsAmount)}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                TDS credit via Form 16A / 26AS
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

      {/* SEO & FAQs Guide */}
      <div className="calculator-guide-section no-print" style={{ marginTop: '40px' }}>
        <h3 style={{ fontSize: '20px', color: 'var(--brand-navy)', marginBottom: '16px', fontWeight: '700' }}>
          Frequently Asked Questions (FAQs) on Real Estate Brokerage Commission
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
