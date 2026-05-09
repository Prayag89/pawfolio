import styled from 'styled-components';
import { SortOption } from '../types';

interface SortControlsProps {
  value: SortOption;
  onChange: (option: SortOption) => void;
}

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'name-asc', label: 'A → Z' },
  { value: 'name-desc', label: 'Z → A' },
  { value: 'date-newest', label: 'Newest' },
  { value: 'date-oldest', label: 'Oldest' },
];

/**
 * SortControls — Pill-style sort toggle.
 * Renders as a segmented button group for quick access.
 */
export default function SortControls({ value, onChange }: SortControlsProps) {
  return (
    <Wrapper>
      <Label>Sort</Label>
      <PillGroup>
        {OPTIONS.map((opt) => (
          <Pill
            key={opt.value}
            $active={value === opt.value}
            onClick={() => onChange(opt.value)}
            aria-pressed={value === opt.value}
          >
            {opt.label}
          </Pill>
        ))}
      </PillGroup>
    </Wrapper>
  );
}

/* ── Styled Components ── */

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-md);
`;

const Label = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;

  @media (max-width: 640px) {
    display: none;
  }
`;

const PillGroup = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px;
  background: var(--color-bg-alt);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
`;

const Pill = styled.button<{ $active: boolean }>`
  padding: 7px 14px;
  font-size: 0.8rem;
  font-weight: 500;
  border-radius: calc(var(--radius-md) - 3px);
  color: ${({ $active }) =>
    $active ? 'var(--color-bg-card)' : 'var(--color-text-secondary)'};
  background: ${({ $active }) =>
    $active ? 'var(--color-accent)' : 'transparent'};
  transition: all var(--duration-fast) var(--ease-out);
  white-space: nowrap;

  &:hover {
    color: ${({ $active }) =>
      $active ? 'var(--color-bg-card)' : 'var(--color-text)'};
    background: ${({ $active }) =>
      $active ? 'var(--color-accent-hover)' : 'rgba(0,0,0,0.04)'};
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 0.75rem;
  }
`;
