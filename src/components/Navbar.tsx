import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useSelection } from '../context/SelectionContext';

/**
 * Navbar — Fixed top navigation with brand identity and route links.
 * Shows a selection badge when items are selected, persisting
 * the count visually across all routes.
 */
export default function Navbar() {
  const location = useLocation();
  const { selectionCount } = useSelection();

  return (
    <Nav>
      <NavInner>
        <Brand to="/">
          <BrandIcon>🐾</BrandIcon>
          <BrandText>Pawfolio</BrandText>
        </Brand>

        <NavLinks>
          <NavLink to="/" $active={location.pathname === '/'}>
            Gallery
          </NavLink>
          <NavLink to="/about" $active={location.pathname === '/about'}>
            About
          </NavLink>
          {selectionCount > 0 && (
            <SelectionBadge>
              <BadgeCount>{selectionCount}</BadgeCount>
              <span>selected</span>
            </SelectionBadge>
          )}
        </NavLinks>
      </NavInner>
    </Nav>
  );
}

/* ── Styled Components ── */

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  background: rgba(250, 247, 242, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-border);
  z-index: 100;
`;

const NavInner = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-lg);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  text-decoration: none;
  transition: opacity var(--duration-fast) var(--ease-out);

  &:hover {
    opacity: 0.8;
  }
`;

const BrandIcon = styled.span`
  font-size: 1.5rem;
`;

const BrandText = styled.span`
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.02em;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-lg);
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ $active }) =>
    $active ? 'var(--color-accent)' : 'var(--color-text-secondary)'};
  position: relative;
  padding: var(--space-xs) 0;
  transition: color var(--duration-fast) var(--ease-out);

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--color-accent);
    border-radius: 1px;
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: left;
    transition: transform var(--duration-normal) var(--ease-out);
  }

  &:hover {
    color: var(--color-accent);
  }
`;

const SelectionBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: var(--color-accent-light);
  border: 1px solid var(--color-accent);
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-accent);
  animation: scaleIn var(--duration-normal) var(--ease-spring);
`;

const BadgeCount = styled.span`
  font-weight: 700;
  font-family: var(--font-mono);
`;
