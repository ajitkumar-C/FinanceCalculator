import React from 'react';
import { ShieldCheck, UserCheck, Scale, FileText, Lock, RefreshCw, Mail, Award, BookOpen } from 'lucide-react';

export default function EditorialPolicy() {
  return (
    <div className="seo-rich-content-section" style={{ border: 'none', boxShadow: 'none', padding: 0 }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: '#eff6ff', color: 'var(--brand-blue)', borderRadius: '20px', fontSize: '13px', fontWeight: '600', marginBottom: '12px' }}>
          <ShieldCheck size={16} />
          <span>E-E-A-T Verified & Transparent Financial Methodology</span>
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--brand-navy)', marginBottom: '8px' }}>
          RupeeBuddy Editorial Policy & Financial Review Standards
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6' }}>
          How we ensure mathematical precision, statutory compliance, and zero-conflict financial tools for Indian citizens.
        </p>
      </div>

      {/* Review Board Card */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--brand-navy)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <UserCheck size={22} color="var(--brand-blue)" />
          The RupeeBuddy Financial Review Panel
        </h2>
        <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-color)', marginBottom: '16px' }}>
          Every financial formula, tax slab computation, and real estate legal guideline on RupeeBuddy is vetted by our advisory network of practicing <strong>Chartered Accountants (FCA / ACA)</strong> and <strong>SEBI-Registered Investment Advisors (RIA)</strong> before publication.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          <div style={{ background: '#ffffff', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontWeight: '700', color: 'var(--brand-navy)', fontSize: '15px' }}>Tax & Statutory Compliance Desk</div>
            <div style={{ fontSize: '12px', color: 'var(--brand-blue)', marginBottom: '8px', fontWeight: '600' }}>Direct Taxes & Union Budget Advisory</div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
              Reviews Old vs New Tax Regime models, Section 87A rebate rules, Section 80CCD(2) employer NPS deductions, and Budget 2024 LTCG/STCG amendments.
            </p>
          </div>
          <div style={{ background: '#ffffff', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontWeight: '700', color: 'var(--brand-navy)', fontSize: '15px' }}>Banking & Real Estate Review Desk</div>
            <div style={{ fontSize: '12px', color: 'var(--brand-blue)', marginBottom: '8px', fontWeight: '600' }}>RBI Master Directions & RERA Compliance</div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
              Verifies home loan reducing balance compounding algorithms, bank FOIR norms, MahaRERA construction stage-linked mandates, and state stamp duty circulars.
            </p>
          </div>
        </div>
      </div>

      {/* Statutory Citations */}
      <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--brand-navy)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Scale size={22} color="var(--brand-blue)" />
        Statutory & Legal Framework Citations
      </h2>
      <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-color)', marginBottom: '14px' }}>
        RupeeBuddy does not use estimated guesswork. Our calculators are strictly aligned with published legal statutes and official regulatory circulars:
      </p>
      <ul style={{ paddingLeft: '20px', marginBottom: '24px', fontSize: '14px', lineHeight: '1.8' }}>
        <li>
          <strong>Income Tax Calculators:</strong> Built pursuant to the <em>Income Tax Act, 1961</em>, updated with the <em>Finance (No. 2) Act, 2024</em> and <em>Finance Act, 2025</em> provisions (including Section 115BAC concessional slabs, ₹75,000 standard deduction, and Section 87A marginal relief).
        </li>
        <li>
          <strong>Home Loan & Foreclosure Rules:</strong> Formulated in compliance with <em>Reserve Bank of India (RBI) Circular DBOD.No.Dir.BC.107/13.03.00/2011-12</em>, which prohibits banks and NBFCs from charging foreclosure penalties or prepayment fees on floating-rate individual home loans.
        </li>
        <li>
          <strong>EPF / PF Balance Calculation:</strong> Governed by the <em>Employees' Provident Funds and Miscellaneous Provisions Act, 1952</em>, using the official annual interest rate (8.25% for FY 2023-24 onwards) declared by the EPFO Central Board of Trustees.
        </li>
        <li>
          <strong>RERA Carpet Area & Payment Demands:</strong> Structured strictly under Section 2(k) of the <em>Real Estate (Regulation and Development) Act, 2016</em> (RERA Net Usable Floor Area definition) and MahaRERA standard milestone agreements.
        </li>
      </ul>

      {/* Core Principles */}
      <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--brand-navy)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Award size={22} color="var(--brand-blue)" />
        Our 4 Editorial Guarantees
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '28px' }}>
        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--brand-navy)', fontWeight: '700' }}>
            <Lock size={18} color="#16a34a" />
            100% Client-Side Privacy
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
            No phone numbers. No login wall. All mathematical computations execute exclusively inside your web browser. No financial data leaves your computer.
          </p>
        </div>

        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--brand-navy)', fontWeight: '700' }}>
            <FileText size={18} color="var(--brand-blue)" />
            Zero Conflict of Interest
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
            RupeeBuddy does not accept commissions from banks, lending institutions, or builders. Our calculator results are unbiased and purely mathematical.
          </p>
        </div>

        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--brand-navy)', fontWeight: '700' }}>
            <BookOpen size={18} color="#9333ea" />
            Mathematical Transparency
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
            Every tool displays the exact formula used (reducing balance EMI, quarterly compounding for FDs, and slab step-functions for income tax) with worked examples.
          </p>
        </div>

        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--brand-navy)', fontWeight: '700' }}>
            <RefreshCw size={18} color="#ea580c" />
            24-Hour Update Policy
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
            When the Finance Minister delivers a Union Budget or the RBI Monetary Policy Committee alters the Repo Rate, our engineering team updates the formulas within 24 hours.
          </p>
        </div>
      </div>

      {/* Corrections and Contact */}
      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '18px 24px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e40af', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Mail size={18} />
          Editorial Corrections & Feedback
        </h3>
        <p style={{ fontSize: '13px', color: '#1e3a8a', lineHeight: '1.6', margin: 0 }}>
          If you believe a formula or statutory interpretation requires updating or correction, please email our editorial board at{' '}
          <a href="mailto:editorial@rupeebuddy.in" style={{ color: '#1d4ed8', fontWeight: '600', textDecoration: 'underline' }}>
            editorial@rupeebuddy.in
          </a>
          . We review all practitioner feedback within 2 business days.
        </p>
      </div>

      <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic', margin: 0 }}>
        Last Verified & Re-certified by Financial Review Panel: Updated for FY 2026-27 (AY 2027-28) Provisions.
      </p>
    </div>
  );
}

