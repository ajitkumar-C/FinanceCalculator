import React from 'react';
import { Printer, Share2, HelpCircle } from 'lucide-react';
import { exportToPDF, shareCalculation } from '../utils/pdfExport';

export default function Header({ activeCalculatorName, activeCalculatorId, calculatorResultText }) {
  const handlePrint = () => {
    exportToPDF();
  };

  const handleShare = () => {
    shareCalculation(activeCalculatorName, calculatorResultText || "Calculate loans, mutual funds, SIP, EPF, and tax slabs instantly.");
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo-section">
          <span className="logo-emoji">📈</span>
          <div className="logo-text">
            <span className="logo-brand">FinanceCalc</span>
            <span className="logo-country">INDIA 🇮🇳</span>
          </div>
        </div>
        <div className="header-separator"></div>
        <h1 className="header-active-title">{activeCalculatorName}</h1>
      </div>

      <div className="header-right no-print">
        <button 
          className="header-action-btn share-btn" 
          onClick={handleShare}
          title="Share calculation details"
        >
          <Share2 size={18} />
          <span>Share</span>
        </button>

        <button 
          className="header-action-btn print-btn" 
          onClick={handlePrint}
          title="Download PDF report"
        >
          <Printer size={18} />
          <span>Download Report</span>
        </button>

        <a 
          href="#faq-section" 
          className="header-action-btn faq-btn-nav"
          title="Help & FAQs"
        >
          <HelpCircle size={18} />
          <span>Help</span>
        </a>
      </div>
    </header>
  );
}
