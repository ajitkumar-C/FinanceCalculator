import React, { useState, useEffect } from 'react';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement 
} from 'chart.js';

// Register Chart.js elements globally
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement
);

// Utilities & Components
import Sidebar, { calculatorsList } from './components/Sidebar';
import Header from './components/Header';
import { injectCalculatorSchema } from './utils/schema';

// Calculators
import EmiCalculator from './components/calculators/EmiCalculator';
import EligibilityCalculator from './components/calculators/EligibilityCalculator';
import PpfCalculator from './components/calculators/PpfCalculator';
import PfCalculator from './components/calculators/PfCalculator';
import SipCalculator from './components/calculators/SipCalculator';
import FdCalculator from './components/calculators/FdCalculator';
import RdCalculator from './components/calculators/RdCalculator';
import NpsCalculator from './components/calculators/NpsCalculator';
import RetirementCalculator from './components/calculators/RetirementCalculator';
import TaxCalculator from './components/calculators/TaxCalculator';
import MutualFundCalculator from './components/calculators/MutualFundCalculator';
import CompoundCalculator from './components/calculators/CompoundCalculator';

export default function App() {
  const [activeCalc, setActiveCalc] = useState('emi');
  const [resultText, setResultText] = useState('');

  // Dynamically update SEO tags and structured data Schema when active calculator changes
  useEffect(() => {
    injectCalculatorSchema(activeCalc);
  }, [activeCalc]);

  const activeDetails = calculatorsList.find(calc => calc.id === activeCalc) || calculatorsList[0];

  const renderActiveCalculator = () => {
    switch (activeCalc) {
      case 'emi':
        return <EmiCalculator setResultText={setResultText} />;
      case 'eligibility':
        return <EligibilityCalculator setResultText={setResultText} />;
      case 'ppf':
        return <PpfCalculator setResultText={setResultText} />;
      case 'pf':
        return <PfCalculator setResultText={setResultText} />;
      case 'sip':
        return <SipCalculator setResultText={setResultText} />;
      case 'fd':
        return <FdCalculator setResultText={setResultText} />;
      case 'rd':
        return <RdCalculator setResultText={setResultText} />;
      case 'nps':
        return <NpsCalculator setResultText={setResultText} />;
      case 'retirement':
        return <RetirementCalculator setResultText={setResultText} />;
      case 'tax':
        return <TaxCalculator setResultText={setResultText} />;
      case 'mutualfund':
        return <MutualFundCalculator setResultText={setResultText} />;
      case 'compound':
        return <CompoundCalculator setResultText={setResultText} />;
      default:
        return <EmiCalculator setResultText={setResultText} />;
    }
  };

  return (
    <div className="app-container-layout">
      {/* Sidebar Navigation */}
      <Sidebar activeCalculator={activeCalc} setActiveCalculator={setActiveCalc} />

      {/* Main Content Layout */}
      <main className="main-content-layout">
        {/* Header Section */}
        <Header 
          activeCalculatorName={activeDetails.name} 
          activeCalculatorId={activeCalc} 
          calculatorResultText={resultText} 
        />

        {/* Dynamic Calculator Component */}
        {renderActiveCalculator()}


        
        {/* Footer */}
        <footer className="app-footer-credits no-print" style={{ 
          marginTop: 'auto', 
          padding: '20px 0', 
          borderTop: '1px solid var(--border-color)', 
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--text-muted)'
        }}>
          <p>© 2026 FinanceCalc India. All calculations are indicative and based on prevailing tax laws and market standards. Please consult a certified financial planner for commercial decisions.</p>
        </footer>
      </main>
    </div>
  );
}
