import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useSelection } from '../context/SelectionContext';
import { Pet } from '../types';
import { downloadImages, estimateFileSize, formatBytes } from '../utils/download';

interface SelectionBarProps {
  /** The currently visible (filtered) pets */
  visiblePets: Pet[];
  /** All pets from the API */
  allPets: Pet[];
}

/**
 * SelectionBar — Floating bottom bar for batch actions.
 *
 * Appears when at least one pet is selected. Shows:
 * - Selection count
 * - Estimated download size
 * - Select All / Clear / Download buttons
 *
 * Slides up with an animation on mount.
 */
export default function SelectionBar({ visiblePets, allPets }: SelectionBarProps) {
  const { selectedIds, selectAll, clearSelection, selectionCount } =
    useSelection();
  const [estimatedSize, setEstimatedSize] = useState<string>('Calculating...');
  const [downloading, setDownloading] = useState(false);

  // Estimate file size whenever selection changes
  useEffect(() => {
    if (selectionCount === 0) return;

    const selectedUrls = allPets
      .filter((p) => selectedIds.has(p.id))
      .map((p) => p.url);

    estimateFileSize(selectedUrls).then((bytes) => {
      setEstimatedSize(formatBytes(bytes));
    });
  }, [selectedIds, selectionCount, allPets]);

  const handleSelectAll = useCallback(() => {
    selectAll(visiblePets.map((p) => p.id));
  }, [visiblePets, selectAll]);

  const handleDownload = useCallback(async () => {
    const selectedPets = allPets.filter((p) => selectedIds.has(p.id));
    if (selectedPets.length === 0) return;

    setDownloading(true);
    try {
      await downloadImages(selectedPets);
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setDownloading(false);
    }
  }, [allPets, selectedIds]);

  if (selectionCount === 0) return null;

  return (
    <Bar>
      <BarInner>
        <Info>
          <Count>{selectionCount}</Count>
          <InfoText>
            <span>pet{selectionCount !== 1 ? 's' : ''} selected</span>
            <SizeEstimate>≈ {estimatedSize}</SizeEstimate>
          </InfoText>
        </Info>

        <Actions>
          <ActionButton onClick={handleSelectAll} $variant="ghost">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Select All Visible
          </ActionButton>

          <ActionButton onClick={clearSelection} $variant="ghost">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
            Clear
          </ActionButton>

          <ActionButton
            onClick={handleDownload}
            $variant="primary"
            disabled={downloading}
          >
            {downloading ? (
              <Spinner />
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeLinecap="round" />
                <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" />
              </svg>
            )}
            {downloading ? 'Downloading...' : 'Download ZIP'}
          </ActionButton>
        </Actions>
      </BarInner>
    </Bar>
  );
}

/* ── Styled Components ── */

const Bar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 90;
  padding: 0 var(--space-lg);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  background: rgba(26, 24, 20, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  animation: slideUp 0.35s var(--ease-spring);

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const BarInner = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  height: var(--selection-bar-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);

  @media (max-width: 640px) {
    flex-direction: column;
    height: auto;
    padding: var(--space-md) 0;
    gap: var(--space-sm);
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-md);
`;

const Count = styled.span`
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--color-accent);
  line-height: 1;
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.4;
`;

const SizeEstimate = styled.span`
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.4);
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);

  @media (max-width: 640px) {
    width: 100%;
    justify-content: stretch;

    > * {
      flex: 1;
      justify-content: center;
    }
  }
`;

const ActionButton = styled.button<{ $variant: 'ghost' | 'primary' }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  font-size: 0.82rem;
  font-weight: 600;
  border-radius: var(--radius-md);
  white-space: nowrap;
  transition: all var(--duration-fast) var(--ease-out);

  ${({ $variant }) =>
    $variant === 'primary'
      ? `
    background: var(--color-accent);
    color: #fff;
    &:hover:not(:disabled) { background: var(--color-accent-hover); }
    &:disabled { opacity: 0.6; cursor: not-allowed; }
  `
      : `
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.12);
    &:hover { background: rgba(255, 255, 255, 0.14); color: #fff; }
  `}
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
