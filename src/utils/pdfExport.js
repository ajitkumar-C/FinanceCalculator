/**
 * Print and PDF share helper utility.
 * Triggers native browser print with styled adjustments for clean report layouts.
 */

export function exportToPDF() {
  window.print();
}

/**
 * Share calculation result via Web Share API if supported.
 * If not, copies a share link to the clipboard.
 */
export function shareCalculation(calculatorName, textSummary) {
  const shareText = `Check out this calculation for ${calculatorName}:\n\n${textSummary}\n\nCalculate yours here:`;
  const shareUrl = window.location.href;

  if (navigator.share) {
    navigator.share({
      title: `${calculatorName} - Indian Financial Calculator`,
      text: shareText,
      url: shareUrl,
    })
    .catch((error) => console.log('Error sharing:', error));
  } else {
    // Fallback: Copy to clipboard
    const fullShareText = `${shareText} ${shareUrl}`;
    navigator.clipboard.writeText(fullShareText)
      .then(() => {
        alert("Calculation summary and link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text:", err);
      });
  }
}
