import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterInner>
        <FooterBrand>
          <span>🐾</span>
          <BrandName>Pawfolio</BrandName>
          <Tagline>Discover. Collect. Adore.</Tagline>
        </FooterBrand>

        <FooterLinks>
          <FooterLink to="/">Gallery</FooterLink>
          <FooterLink to="/about">About</FooterLink>
        </FooterLinks>

        <Copyright>
          © {new Date().getFullYear()} Pawfolio · Built with React & TypeScript
        </Copyright>
      </FooterInner>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
  margin-top: auto;
`;

const FooterInner = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--space-2xl) var(--space-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
  text-align: center;
`;

const FooterBrand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  font-size: 1.2rem;
`;

const BrandName = styled.span`
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.25rem;
`;

const Tagline = styled.span`
  font-size: 0.82rem;
  font-style: italic;
  color: var(--color-text-muted);
  font-family: var(--font-display);
`;

const FooterLinks = styled.div`
  display: flex;
  gap: var(--space-lg);
`;

const FooterLink = styled(Link)`
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  transition: color var(--duration-fast);

  &:hover {
    color: var(--color-accent);
  }
`;

const Copyright = styled.p`
  font-size: 0.75rem;
  color: var(--color-text-muted);
`;
