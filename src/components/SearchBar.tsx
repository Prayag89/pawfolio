import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  totalCount: number;
}

/**
 * SearchBar — Filters pets by title or description.
 * Includes a 300ms debounce to avoid excessive re-renders
 * while the user is typing. Shows live result count.
 */
export default function SearchBar({
  value,
  onChange,
  resultCount,
  totalCount,
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  const debounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);

    // Debounce the parent callback
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange(val);
    }, 300);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <Wrapper>
      <SearchIcon viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </SearchIcon>

      <Input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder="Search by name or description..."
        aria-label="Search pets"
      />

      {localValue && (
        <ClearButton onClick={handleClear} aria-label="Clear search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16">
            <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </ClearButton>
      )}

      {localValue.trim() && (
        <ResultCount>
          {resultCount} of {totalCount}
        </ResultCount>
      )}
    </Wrapper>
  );
}

/* ── Styled Components ── */

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 480px;
`;

const SearchIcon = styled.svg`
  position: absolute;
  left: 16px;
  width: 18px;
  height: 18px;
  stroke-width: 2;
  color: var(--color-text-muted);
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px 12px 44px;
  font-size: 0.9rem;
  color: var(--color-text);
  background: var(--color-bg-card);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  outline: none;
  transition: all var(--duration-fast) var(--ease-out);

  &::placeholder {
    color: var(--color-text-muted);
  }

  &:focus {
    border-color: var(--color-accent);
    box-shadow: var(--shadow-glow);
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: var(--color-text-muted);
  transition: all var(--duration-fast) var(--ease-out);

  &:hover {
    background: var(--color-bg-alt);
    color: var(--color-text);
  }
`;

const ResultCount = styled.span`
  position: absolute;
  right: 44px;
  font-size: 0.75rem;
  font-family: var(--font-mono);
  color: var(--color-text-muted);
  white-space: nowrap;
`;
