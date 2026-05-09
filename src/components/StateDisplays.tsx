import styled from 'styled-components';

/** Loading skeleton grid that mimics the gallery layout */
export function LoadingState() {
  return (
    <SkeletonGrid>
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonCard key={i} style={{ animationDelay: `${i * 100}ms` }}>
          <SkeletonImage />
          <SkeletonBody>
            <SkeletonLine $width="70%" />
            <SkeletonLine $width="100%" />
            <SkeletonLine $width="40%" />
          </SkeletonBody>
        </SkeletonCard>
      ))}
    </SkeletonGrid>
  );
}

/** Error state with retry button */
export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <StateContainer>
      <StateIcon>⚠️</StateIcon>
      <StateTitle>Something went wrong</StateTitle>
      <StateText>{message}</StateText>
      <RetryButton onClick={onRetry}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
          <polyline points="23 4 23 10 17 10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Try Again
      </RetryButton>
    </StateContainer>
  );
}

/** Empty state when no pets match the search */
export function EmptyState({ query }: { query?: string }) {
  return (
    <StateContainer>
      <StateIcon>🔍</StateIcon>
      <StateTitle>
        {query ? 'No pets found' : 'No pets available'}
      </StateTitle>
      <StateText>
        {query
          ? `No results match "${query}". Try a different search term.`
          : 'Check back later for new additions to the gallery.'}
      </StateText>
    </StateContainer>
  );
}

/* ── Styled Components ── */

const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-lg);
  padding: var(--space-xl) 0;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const SkeletonCard = styled.div`
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  animation: fadeIn 0.4s ease both;
`;

const SkeletonImage = styled.div`
  aspect-ratio: 4 / 3;
  background: linear-gradient(
    90deg,
    var(--color-bg-alt) 25%,
    var(--color-border) 50%,
    var(--color-bg-alt) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
`;

const SkeletonBody = styled.div`
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
`;

const SkeletonLine = styled.div<{ $width: string }>`
  height: 12px;
  width: ${({ $width }) => $width};
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    var(--color-bg-alt) 25%,
    var(--color-border) 50%,
    var(--color-bg-alt) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
`;

const StateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-3xl) var(--space-lg);
  text-align: center;
  animation: fadeInUp var(--duration-slow) var(--ease-out);
`;

const StateIcon = styled.span`
  font-size: 3rem;
  margin-bottom: var(--space-lg);
`;

const StateTitle = styled.h2`
  font-family: var(--font-display);
  font-size: 1.5rem;
  margin-bottom: var(--space-sm);
`;

const StateText = styled.p`
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  max-width: 400px;
`;

const RetryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: var(--space-lg);
  padding: 12px 24px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  background: var(--color-accent);
  border-radius: var(--radius-md);
  transition: all var(--duration-fast) var(--ease-out);

  &:hover {
    background: var(--color-accent-hover);
    transform: translateY(-1px);
  }
`;
