import { useState, useMemo } from 'react';
import styled from 'styled-components';
import { usePets } from '../hooks/usePets';
import { useSelection } from '../context/SelectionContext';
import PetCard from '../components/PetCard';
import SearchBar from '../components/SearchBar';
import SortControls from '../components/SortControls';
import SelectionBar from '../components/SelectionBar';
import Pagination from '../components/Pagination';
import { LoadingState, ErrorState, EmptyState } from '../components/StateDisplays';

const ITEMS_PER_PAGE = 12;

/**
 * Home — Main gallery page.
 *
 * Orchestrates search, sort, pagination, and selection.
 * The gallery grid is responsive: 1 col mobile, 2 col tablet, 4 col desktop.
 */
export default function Home() {
  const {
    pets,
    allPets,
    state,
    error,
    searchQuery,
    sortOption,
    setSearchQuery,
    setSortOption,
    refetch,
  } = usePets();

  const [currentPage, setCurrentPage] = useState(1);
  const { selectAll, clearSelection, selectionCount } = useSelection();

  // Reset to page 1 when filters change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSortChange = (option: typeof sortOption) => {
    setSortOption(option);
    setCurrentPage(1);
  };

  // Paginate the filtered + sorted results
  const paginatedPets = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return pets.slice(start, start + ITEMS_PER_PAGE);
  }, [pets, currentPage]);

  return (
    <Page>
      {/* Hero Section */}
      <Hero>
        <HeroContent>
          <HeroTag>Gallery</HeroTag>
          <HeroTitle>
            Every Pet Has a <Accent>Story</Accent>
          </HeroTitle>
          <HeroSubtitle>
            Browse our collection, select your favorites, and download them all
            at once. Currently featuring {allPets.length} adorable companions.
          </HeroSubtitle>
        </HeroContent>
        <HeroDecoration aria-hidden="true">
          <DecoCircle $size={200} $top={-30} $right={-40} $opacity={0.08} />
          <DecoCircle $size={120} $top={60} $right={100} $opacity={0.05} />
          <DecoCircle $size={80} $top={10} $right={200} $opacity={0.06} />
        </HeroDecoration>
      </Hero>

      {/* Toolbar: Search + Sort + Bulk Actions */}
      <Toolbar>
        <ToolbarRow>
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            resultCount={pets.length}
            totalCount={allPets.length}
          />
          <SortControls value={sortOption} onChange={handleSortChange} />
        </ToolbarRow>

        <ToolbarActions>
          <BulkButton onClick={() => selectAll(pets.map((p) => p.id))}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="15" height="15" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Select All ({pets.length})
          </BulkButton>
          {selectionCount > 0 && (
            <BulkButton onClick={clearSelection} $muted>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="15" height="15" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
              Clear
            </BulkButton>
          )}
        </ToolbarActions>
      </Toolbar>

      {/* Content Area */}
      {state === 'loading' && <LoadingState />}

      {state === 'error' && (
        <ErrorState message={error || 'Unknown error'} onRetry={refetch} />
      )}

      {state === 'success' && pets.length === 0 && (
        <EmptyState query={searchQuery} />
      )}

      {state === 'success' && pets.length > 0 && (
        <>
          <Grid>
            {paginatedPets.map((pet, index) => (
              <PetCard key={pet.id} pet={pet} index={index} />
            ))}
          </Grid>

          <Pagination
            currentPage={currentPage}
            totalItems={pets.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {/* Floating selection bar */}
      <SelectionBar visiblePets={pets} allPets={allPets} />
    </Page>
  );
}

/* ── Styled Components ── */

const Page = styled.main`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: calc(var(--nav-height) + var(--space-xl)) var(--space-lg)
    var(--space-3xl);
  min-height: 100vh;
`;

const Hero = styled.section`
  position: relative;
  padding: var(--space-2xl) 0 var(--space-xl);
  overflow: hidden;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 640px;
  animation: fadeInUp var(--duration-slow) var(--ease-out);
`;

const HeroTag = styled.span`
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-accent);
  padding: 5px 12px;
  background: var(--color-accent-light);
  border-radius: 100px;
  margin-bottom: var(--space-md);
`;

const HeroTitle = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: var(--space-md);
  letter-spacing: -0.02em;
`;

const Accent = styled.span`
  color: var(--color-accent);
  font-style: italic;
`;

const HeroSubtitle = styled.p`
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  max-width: 520px;
`;

const HeroDecoration = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 40%;
  pointer-events: none;
`;

const DecoCircle = styled.div<{
  $size: number;
  $top: number;
  $right: number;
  $opacity: number;
}>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  top: ${({ $top }) => $top}px;
  right: ${({ $right }) => $right}px;
  border-radius: 50%;
  background: var(--color-accent);
  opacity: ${({ $opacity }) => $opacity};
`;

const Toolbar = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding: var(--space-lg) 0;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: var(--space-xl);
  animation: fadeIn var(--duration-slow) var(--ease-out);
`;

const ToolbarRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-lg);
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ToolbarActions = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
`;

const BulkButton = styled.button<{ $muted?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ $muted }) =>
    $muted ? 'var(--color-text-muted)' : 'var(--color-text-secondary)'};
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: all var(--duration-fast) var(--ease-out);

  &:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-lg);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }
`;
