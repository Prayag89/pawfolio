import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Pet } from '../types';
import { useSelection } from '../context/SelectionContext';

/**
 * PetDetail — Full-page detail view for a single pet.
 *
 * Accessed via /pets/:id. Fetches all pets and finds the matching one
 * (the API doesn't support fetching by ID directly). Selection state
 * persists — toggling here is reflected back in the gallery.
 */
export default function PetDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isSelected, toggleSelection } = useSelection();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await fetch('https://eulerity-hackathon.appspot.com/pets');
        const data = await res.json();
        const petsWithIds: Pet[] = data.map((p: any, index: number) => ({
          ...p,
          id: p.id || btoa(p.url).slice(0, 12) + index,
        }));
        const found = petsWithIds.find((p) => p.id === id);
        setPet(found || null);
      } catch {
        setPet(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

  if (loading) {
    return (
      <Page>
        <LoadingWrapper>
          <Spinner />
          <span>Loading pet details...</span>
        </LoadingWrapper>
      </Page>
    );
  }

  if (!pet) {
    return (
      <Page>
        <NotFound>
          <span>🐾</span>
          <h2>Pet not found</h2>
          <p>The pet you're looking for doesn't exist or has been removed.</p>
          <BackLink to="/">← Back to Gallery</BackLink>
        </NotFound>
      </Page>
    );
  }

  const selected = isSelected(pet.id);
  const formattedDate = new Date(pet.created).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Page>
      <Breadcrumb>
        <BreadcrumbLink to="/">Gallery</BreadcrumbLink>
        <BreadcrumbSep>/</BreadcrumbSep>
        <BreadcrumbCurrent>{pet.title}</BreadcrumbCurrent>
      </Breadcrumb>

      <DetailLayout>
        <ImageSection>
          <ImageWrapper>
            {!imageLoaded && <ImageSkeleton />}
            <DetailImage
              src={pet.url}
              alt={pet.title}
              $loaded={imageLoaded}
              onLoad={() => setImageLoaded(true)}
            />
          </ImageWrapper>
        </ImageSection>

        <InfoSection>
          <PetTitle>{pet.title}</PetTitle>
          <PetDate>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="14" height="14" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" />
              <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Added {formattedDate}
          </PetDate>

          <Divider />

          <SectionLabel>About</SectionLabel>
          <PetDescription>{pet.description}</PetDescription>

          <Divider />

          <ActionGroup>
            <SelectButton
              $selected={selected}
              onClick={() => toggleSelection(pet.id)}
            >
              {selected ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Selected
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                  </svg>
                  Add to Selection
                </>
              )}
            </SelectButton>

            <OpenImageLink href={pet.url} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" strokeLinecap="round" />
                <polyline points="15 3 21 3 21 9" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="10" y1="14" x2="21" y2="3" strokeLinecap="round" />
              </svg>
              Open Original
            </OpenImageLink>
          </ActionGroup>

          <BackButton onClick={() => navigate(-1)}>
            ← Back to Gallery
          </BackButton>
        </InfoSection>
      </DetailLayout>
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
  animation: fadeIn var(--duration-slow) var(--ease-out);
`;

const Breadcrumb = styled.nav`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-xl);
  font-size: 0.85rem;
`;

const BreadcrumbLink = styled(Link)`
  color: var(--color-text-muted);
  transition: color var(--duration-fast);

  &:hover {
    color: var(--color-accent);
  }
`;

const BreadcrumbSep = styled.span`
  color: var(--color-border-hover);
`;

const BreadcrumbCurrent = styled.span`
  color: var(--color-text);
  font-weight: 500;
`;

const DetailLayout = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: var(--space-3xl);
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }
`;

const ImageSection = styled.div`
  position: sticky;
  top: calc(var(--nav-height) + var(--space-lg));

  @media (max-width: 900px) {
    position: static;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--color-bg-alt);
  box-shadow: var(--shadow-lg);
`;

const ImageSkeleton = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    var(--color-bg-alt) 25%,
    var(--color-border) 50%,
    var(--color-bg-alt) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
`;

const DetailImage = styled.img<{ $loaded: boolean }>`
  width: 100%;
  display: block;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity var(--duration-slow) var(--ease-out);
`;

const InfoSection = styled.div`
  padding: var(--space-md) 0;
`;

const PetTitle = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin-bottom: var(--space-md);
`;

const PetDate = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: var(--color-text-muted);
  font-family: var(--font-mono);
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: var(--color-border);
  margin: var(--space-xl) 0;
`;

const SectionLabel = styled.span`
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-accent);
  margin-bottom: var(--space-sm);
`;

const PetDescription = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
`;

const ActionGroup = styled.div`
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
`;

const SelectButton = styled.button<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: var(--radius-md);
  transition: all var(--duration-fast) var(--ease-out);

  ${({ $selected }) =>
    $selected
      ? `
    background: var(--color-accent);
    color: #fff;
    &:hover { background: var(--color-accent-hover); }
  `
      : `
    background: var(--color-bg-card);
    color: var(--color-text);
    border: 1.5px solid var(--color-border);
    &:hover {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }
  `}
`;

const OpenImageLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: all var(--duration-fast) var(--ease-out);

  &:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }
`;

const BackButton = styled.button`
  margin-top: var(--space-2xl);
  font-size: 0.85rem;
  color: var(--color-text-muted);
  transition: color var(--duration-fast);

  &:hover {
    color: var(--color-accent);
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: var(--space-md);
  color: var(--color-text-muted);
`;

const Spinner = styled.div`
  width: 36px;
  height: 36px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const NotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: var(--space-md);
  text-align: center;
  animation: fadeInUp var(--duration-slow) var(--ease-out);

  span {
    font-size: 3rem;
  }

  p {
    color: var(--color-text-secondary);
    max-width: 400px;
  }
`;

const BackLink = styled(Link)`
  margin-top: var(--space-md);
  color: var(--color-accent);
  font-weight: 600;
  transition: opacity var(--duration-fast);

  &:hover {
    opacity: 0.8;
  }
`;
