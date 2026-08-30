import React, { useState } from 'react';
import { formatINR } from '../../utils/format';
import NumericInput from '../common/NumericInput';
import { 
  FileText, Printer, Copy, Check, Share2, 
  Building2, UserCheck, ShieldCheck, ChevronDown 
} from 'lucide-react';

export default function RentalAgreementGenerator() {
  const [landlordName, setLandlordName] = useState('Rajesh Sharma');
  const [tenantName, setTenantName] = useState('Amit Verma');
  const [propertyAddress, setPropertyAddress] = useState('Flat 402, Building B, Sunshine Heights, Mumbai - 400053');
  const [monthlyRent, setMonthlyRent] = useState(28000);
  const [securityDeposit, setSecurityDeposit] = useState(100000);
  const [leaseMonths, setLeaseMonths] = useState(11);
  const [noticePeriodDays, setNoticePeriodDays] = useState(30);
  const [lockInMonths, setLockInMonths] = useState(6);
  const [maintenancePaidBy, setMaintenancePaidBy] = useState('landlord'); // 'landlord' | 'tenant'
  const [startDate, setStartDate] = useState('2026-09-01');
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const agreementText = `RESIDENTIAL LEAVE AND LICENSE AGREEMENT

This Leave and License Agreement is made and executed on this date at ${propertyAddress.split(',')[propertyAddress.split(',').length - 1] || 'India'}:

BETWEEN:
${landlordName.toUpperCase()}, residing at (Landlord Address), hereinafter referred to as the "LICENSOR / LANDLORD" (which expression shall unless repugnant to the context include their legal heirs and assigns) of the ONE PART;

AND:
${tenantName.toUpperCase()}, residing at (Tenant Permanent Address), hereinafter referred to as the "LICENSEE / TENANT" (which expression shall unless repugnant to the context include their legal heirs and assigns) of the OTHER PART.

WHEREAS the Licensor is the lawful owner of the residential property situated at:
${propertyAddress} (hereinafter referred to as the "SCHEDULED PREMISES").

NOW THIS AGREEMENT WITNESSETH AND IT IS HEREBY MUTUALLY AGREED AS FOLLOWS:

1. DURATION:
The Licensor hereby grants leave and license to the Licensee to occupy the Scheduled Premises for a period of ${leaseMonths} months commencing from ${startDate}.

2. MONTHLY LICENSE FEE / RENT:
The Licensee shall pay a monthly license fee of ${formatINR(monthlyRent)} (Rupees Only) payable in advance on or before the 5th day of each calendar month.

3. INTEREST-FREE SECURITY DEPOSIT:
The Licensee has paid an interest-free refundable security deposit of ${formatINR(securityDeposit)} to the Licensor. The said deposit shall be refunded upon vacating the premises, subject to deductions for damages or unpaid utility bills.

4. MAINTENANCE & UTILITY CHARGES:
The society maintenance charges shall be borne by the ${maintenancePaidBy.toUpperCase()}. Electricity, water, cooking gas, and internet consumption charges shall be paid directly by the Licensee according to meter readings.

5. LOCK-IN PERIOD & TERMINATION NOTICE:
Both parties agree to a minimum Lock-in Period of ${lockInMonths} months. After the lock-in period, either party may terminate this agreement by giving a written Notice Period of ${noticePeriodDays} days.

6. USE OF PREMISES:
The Scheduled Premises shall be used strictly for peaceful residential purposes only and shall not be sub-let, assigned, or transferred to any third party.

IN WITNESS WHEREOF the parties hereto have signed this agreement on the day and year first above written.


_____________________________                _____________________________
LICENSOR (LANDLORD)                           LICENSEE (TENANT)
${landlordName}                               ${tenantName}


WITNESS 1:                                    WITNESS 2:
Name: ______________________                 Name: ______________________
Sign: ______________________                 Sign: ______________________`;

  const handleCopy = () => {
    navigator.clipboard.writeText(agreementText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      q: 'Why are rental agreements in India typically made for 11 months?',
      a: 'Under the Registration Act 1908, lease agreements exceeding 11 months (12+ months) must be compulsorily registered with the sub-registrar office, incurring substantial stamp duty and registration fees. An 11-month agreement avoids mandatory registration while remaining legally enforceable on non-judicial stamp paper.'
    },
    {
      q: 'What stamp paper value is required for an 11-month rent agreement?',
      a: 'Most states require an 11-month Leave & License agreement to be printed on a ₹100 or ₹500 non-judicial e-stamp paper with notary attestation.'
    },
    {
      q: 'Can a landlord deduct money from the security deposit?',
      a: 'A landlord can legally deduct expenses only for actual physical damages beyond normal wear and tear, or for pending utility/maintenance arrears explicitly agreed in the agreement.'
    }
  ];

  return (
    <div className="calculator-container">
      <div className="calculator-wrapper-grid">
        {/* Input Panel */}
        <div className="calculator-panel no-print">
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--brand-navy)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={20} className="text-primary" /> Rental Agreement Form Details
          </h3>

          {/* Landlord & Tenant Names */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
            <div>
              <span className="slider-label" style={{ fontSize: '12px' }}>Landlord / Owner Name</span>
              <input
                type="text"
                value={landlordName}
                onChange={(e) => setLandlordName(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-color)', marginTop: '4px', fontSize: '13px' }}
              />
            </div>
            <div>
              <span className="slider-label" style={{ fontSize: '12px' }}>Tenant / Lessee Name</span>
              <input
                type="text"
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-color)', marginTop: '4px', fontSize: '13px' }}
              />
            </div>
          </div>

          {/* Property Address */}
          <div className="slider-group">
            <span className="slider-label">Rented Property Full Address</span>
            <input
              type="text"
              value={propertyAddress}
              onChange={(e) => setPropertyAddress(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-color)', marginTop: '4px', fontSize: '13px' }}
            />
          </div>

          {/* Monthly Rent & Security Deposit */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
            <div>
              <span className="slider-label" style={{ fontSize: '12px' }}>Monthly Rent</span>
              <div style={{ marginTop: '4px' }}>
                <NumericInput
                  value={monthlyRent}
                  onChange={setMonthlyRent}
                  min={1000}
                  max={1000000}
                  step={1000}
                  prefix="₹"
                  ariaLabel="Monthly Rent"
                />
              </div>
            </div>
            <div>
              <span className="slider-label" style={{ fontSize: '12px' }}>Security Deposit</span>
              <div style={{ marginTop: '4px' }}>
                <NumericInput
                  value={securityDeposit}
                  onChange={setSecurityDeposit}
                  min={0}
                  max={5000000}
                  step={5000}
                  prefix="₹"
                  ariaLabel="Security Deposit"
                />
              </div>
            </div>
          </div>

          {/* Lease Months & Start Date */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
            <div>
              <span className="slider-label" style={{ fontSize: '12px' }}>Lease Duration</span>
              <select
                value={leaseMonths}
                onChange={(e) => setLeaseMonths(Number(e.target.value))}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-color)', marginTop: '4px', fontSize: '13px' }}
              >
                <option value={11}>11 Months (Standard)</option>
                <option value={22}>22 Months</option>
                <option value={33}>33 Months</option>
                <option value={36}>36 Months (3 Years)</option>
              </select>
            </div>
            <div>
              <span className="slider-label" style={{ fontSize: '12px' }}>Agreement Start Date</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-color)', marginTop: '4px', fontSize: '13px' }}
              />
            </div>
          </div>

          {/* Lock-in & Notice Period */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
            <div>
              <span className="slider-label" style={{ fontSize: '12px' }}>Lock-in Period (Months)</span>
              <input
                type="number"
                value={lockInMonths}
                onChange={(e) => setLockInMonths(Number(e.target.value))}
                min={0}
                max={24}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-color)', marginTop: '4px', fontSize: '13px' }}
              />
            </div>
            <div>
              <span className="slider-label" style={{ fontSize: '12px' }}>Notice Period (Days)</span>
              <input
                type="number"
                value={noticePeriodDays}
                onChange={(e) => setNoticePeriodDays(Number(e.target.value))}
                min={15}
                max={90}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-color)', marginTop: '4px', fontSize: '13px' }}
              />
            </div>
          </div>

          {/* Maintenance Responsibility */}
          <div className="slider-group">
            <span className="slider-label">Society Maintenance Charges</span>
            <div className="custom-select-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '4px' }}>
              <button
                type="button"
                className={`custom-select-option ${maintenancePaidBy === 'landlord' ? 'selected' : ''}`}
                onClick={() => setMaintenancePaidBy('landlord')}
                style={{ padding: '8px 10px', fontSize: '12px' }}
              >
                Included (Paid by Landlord)
              </button>
              <button
                type="button"
                className={`custom-select-option ${maintenancePaidBy === 'tenant' ? 'selected' : ''}`}
                onClick={() => setMaintenancePaidBy('tenant')}
                style={{ padding: '8px 10px', fontSize: '12px' }}
              >
                Separate (Paid by Tenant)
              </button>
            </div>
          </div>
        </div>

        {/* Live Agreement Document Preview Panel */}
        <div className="results-panel" style={{ backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--brand-navy)', margin: 0 }}>
              📄 Legal Draft Preview ({leaseMonths} Months)
            </h3>
            <div className="no-print" style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={handleCopy}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'var(--brand-navy)',
                  cursor: 'pointer'
                }}
              >
                {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy Text'}
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  backgroundColor: '#1e3a8a',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <Printer size={14} /> Print / Save PDF
              </button>
            </div>
          </div>

          <div
            style={{
              padding: '16px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              fontFamily: 'monospace',
              fontSize: '12px',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap',
              maxHeight: '520px',
              overflowY: 'auto',
              color: '#1e293b'
            }}
          >
            {agreementText}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="calculator-guide-section no-print" style={{ marginTop: '40px' }}>
        <h3 style={{ fontSize: '20px', color: 'var(--brand-navy)', marginBottom: '16px', fontWeight: '700' }}>
          Frequently Asked Questions (FAQs) on Rent Agreements
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
