import { useMemo } from 'react';
import styled from 'styled-components';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

/**
 * Pagination — Page navigation with smart ellipsis.
 *
 * Shows first/last pages, current page neighborhood,
 * and ellipsis for gaps. Scrolls to top on page change.
 */
export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = useMemo(() => {
    const items: (number | 'ellipsis')[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) items.push(i);
      return items;
    }

    // Always show first page
    items.push(1);

    if (currentPage > 3) {
      items.push('ellipsis');
    }

    // Window around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) items.push(i);

    if (currentPage < totalPages - 2) {
      items.push('ellipsis');
    }

    // Always show last page
    if (totalPages > 1) items.push(totalPages);

    return items;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  const handleChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Wrapper>
      <NavButton
        onClick={() => handleChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
          <polyline points="15 18 9 12 15 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </NavButton>

      <PageList>
        {pages.map((page, i) =>
          page === 'ellipsis' ? (
            <Ellipsis key={`e-${i}`}>…</Ellipsis>
          ) : (
            <PageButton
              key={page}
              $active={page === currentPage}
              onClick={() => handleChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </PageButton>
          )
        )}
      </PageList>

      <NavButton
        onClick={() => handleChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
          <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </NavButton>

      <PageInfo>
        Page {currentPage} of {totalPages}
      </PageInfo>
    </Wrapper>
  );
}

/* ── Styled Components ── */

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-2xl) 0;
  flex-wrap: wrap;
`;

const PageList = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const PageButton = styled.button<{ $active: boolean }>`
  min-width: 40px;
  height: 40px;
  font-size: 0.85rem;
  font-weight: ${({ $active }) => ($active ? '700' : '500')};
  font-family: var(--font-mono);
  color: ${({ $active }) =>
    $active ? '#fff' : 'var(--color-text-secondary)'};
  background: ${({ $active }) =>
    $active ? 'var(--color-accent)' : 'transparent'};
  border: 1.5px solid
    ${({ $active }) =>
      $active ? 'var(--color-accent)' : 'var(--color-border)'};
  border-radius: var(--radius-sm);
  transition: all var(--duration-fast) var(--ease-out);

  &:hover {
    border-color: var(--color-accent);
    color: ${({ $active }) =>
      $active ? '#fff' : 'var(--color-accent)'};
  }
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  border: 1.5px solid var(--color-border);
  color: var(--color-text-secondary);
  transition: all var(--duration-fast) var(--ease-out);

  &:hover:not(:disabled) {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const Ellipsis = styled.span`
  width: 32px;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.9rem;
`;

const PageInfo = styled.span`
  width: 100%;
  text-align: center;
  font-size: 0.75rem;
  font-family: var(--font-mono);
  color: var(--color-text-muted);
  margin-top: var(--space-xs);
`;
