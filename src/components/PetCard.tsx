import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Pet } from '../types';
import { useSelection } from '../context/SelectionContext';

interface PetCardProps {
  pet: Pet;
  index: number;
}

/**
 * PetCard — Individual pet gallery card.
 *
 * Features:
 * - Lazy-loaded image with skeleton shimmer
 * - Checkbox for selection (click stops propagation to avoid navigation)
 * - Hover overlay with "View details" CTA
 * - Staggered entrance animation based on index
 * - Accessible keyboard interactions
 */
export default function PetCard({ pet, index }: PetCardProps) {
  const { isSelected, toggleSelection } = useSelection();
  const selected = isSelected(pet.id);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleSelect = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      toggleSelection(pet.id);
    },
    [pet.id, toggleSelection]
  );

  const formattedDate = new Date(pet.created).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Card
      $selected={selected}
      style={{ animationDelay: `${Math.min(index * 60, 600)}ms` }}
    >
      {/* Selection checkbox — layered on top */}
      <Checkbox
        onClick={handleSelect}
        $selected={selected}
        role="checkbox"
        aria-checked={selected}
        aria-label={`Select ${pet.title}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleSelection(pet.id);
          }
        }}
      >
        {selected && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </Checkbox>

      <CardLink to={`/pets/${pet.id}`}>
        <ImageContainer>
          {!imageLoaded && !imageError && <Skeleton />}
          {imageError ? (
            <FallbackImage>
              <span>🐾</span>
              <small>Image unavailable</small>
            </FallbackImage>
          ) : (
            <Image
              src={pet.url}
              alt={pet.title}
              loading="lazy"
              $loaded={imageLoaded}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}
          <ImageOverlay>
            <OverlayText>View Details →</OverlayText>
          </ImageOverlay>
        </ImageContainer>

        <CardBody>
          <CardTitle>{pet.title}</CardTitle>
          <CardDescription>
            {pet.description.length > 80
              ? pet.description.slice(0, 80) + '…'
              : pet.description}
          </CardDescription>
          <CardMeta>
            <DateTag>{formattedDate}</DateTag>
          </CardMeta>
        </CardBody>
      </CardLink>
    </Card>
  );
}

/* ── Styled Components ── */

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(26, 24, 20, 0.7) 0%,
    rgba(26, 24, 20, 0) 50%
  );
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: var(--space-lg);
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-out);
`;

const OverlayText = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  padding: 8px 20px;
  border: 1.5px solid rgba(255, 255, 255, 0.5);
  border-radius: 100px;
  backdrop-filter: blur(4px);
  transform: translateY(8px);
  transition: transform var(--duration-normal) var(--ease-out);
`;

const Card = styled.article<{ $selected: boolean }>`
  position: relative;
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 2px solid
    ${({ $selected }) =>
      $selected ? 'var(--color-accent)' : 'var(--color-border)'};
  box-shadow: ${({ $selected }) =>
    $selected ? 'var(--shadow-glow), var(--shadow-md)' : 'var(--shadow-sm)'};
  transition: all var(--duration-normal) var(--ease-out);
  animation: fadeInUp var(--duration-slow) var(--ease-out) both;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ $selected }) =>
      $selected ? 'var(--shadow-glow), var(--shadow-xl)' : 'var(--shadow-lg)'};

    ${ImageOverlay} {
      opacity: 1;
    }

    ${OverlayText} {
      transform: translateY(0);
    }
  }
`;

const Checkbox = styled.div<{ $selected: boolean }>`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 10;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
  border: 2px solid
    ${({ $selected }) => ($selected ? 'var(--color-accent)' : 'rgba(255,255,255,0.7)')};
  background: ${({ $selected }) =>
    $selected ? 'var(--color-accent)' : 'rgba(255,255,255,0.3)'};
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);

  svg {
    width: 16px;
    height: 16px;
    color: #fff;
  }

  &:hover {
    transform: scale(1.1);
    border-color: var(--color-accent);
    background: ${({ $selected }) =>
      $selected ? 'var(--color-accent-hover)' : 'rgba(255,255,255,0.6)'};
  }
`;

const CardLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
`;

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--color-bg-alt);
`;

const Skeleton = styled.div`
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

const Image = styled.img<{ $loaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity var(--duration-slow) var(--ease-out);
`;

const FallbackImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: var(--space-sm);

  span {
    font-size: 2.5rem;
  }

  small {
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }
`;

const CardBody = styled.div`
  padding: var(--space-md) var(--space-md) var(--space-lg);
`;

const CardTitle = styled.h3`
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 6px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardDescription = styled.p`
  font-size: 0.82rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: var(--space-sm);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
`;

const DateTag = styled.span`
  font-size: 0.72rem;
  font-family: var(--font-mono);
  color: var(--color-text-muted);
  padding: 3px 8px;
  background: var(--color-bg-alt);
  border-radius: 4px;
`;
