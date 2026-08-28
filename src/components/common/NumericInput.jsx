import React, { useState, useEffect } from 'react';

export default function NumericInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix = '',
  suffix = '',
  className = '',
  ariaLabel
}) {
  const [localVal, setLocalVal] = useState(value !== undefined && value !== null ? String(value) : '');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setLocalVal(value !== undefined && value !== null ? String(value) : '');
    }
  }, [value, isFocused]);

  const handleChange = (e) => {
    const raw = e.target.value;
    setLocalVal(raw);
    if (raw === '' || raw === '-') {
      onChange(0);
      return;
    }
    const num = Number(raw);
    if (!isNaN(num)) {
      onChange(num);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (localVal === '' || isNaN(Number(localVal))) {
      const fallback = min !== undefined ? min : 0;
      setLocalVal(String(fallback));
      onChange(fallback);
    } else {
      const num = Number(localVal);
      setLocalVal(String(num));
    }
  };

  return (
    <div className={`slider-value-input-box ${className}`}>
      {prefix && <span className="input-affix prefix">{prefix}</span>}
      <input
        type="number"
        value={isFocused ? localVal : (value !== undefined && value !== null ? value : '')}
        onChange={handleChange}
        onFocus={() => {
          setIsFocused(true);
          setLocalVal(String(value ?? ''));
        }}
        onBlur={handleBlur}
        min={min}
        max={max}
        step={step}
        aria-label={ariaLabel}
        className="slider-number-input"
      />
      {suffix && <span className="input-affix suffix">{suffix}</span>}
    </div>
  );
}
