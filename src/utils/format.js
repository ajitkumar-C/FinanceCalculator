/**
 * Utility functions for formatting currency and numbers in Indian Standard style (en-IN).
 */

export function formatINR(value) {
  if (value === undefined || value === null || isNaN(value)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
}

export function formatNumber(value) {
  if (value === undefined || value === null || isNaN(value)) return '0';
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2
  }).format(value);
}
