import styled from 'styled-components';
import { Link } from 'react-router-dom';

/**
 * About — Project information and developer profile page.
 * Showcases the tech stack and architecture decisions.
 */
export default function About() {
  const techStack = [
    {
      icon: '⚛️',
      name: 'React 18',
      detail: 'Functional components with hooks',
    },
    {
      icon: '🔷',
      name: 'TypeScript',
      detail: 'Strict mode, full type coverage',
    },
    {
      icon: '💅',
      name: 'Styled Components',
      detail: 'CSS-in-JS with theming via CSS vars',
    },
    {
      icon: '🧭',
      name: 'React Router v6',
      detail: 'Dynamic routing with detail views',
    },
    {
      icon: '🗂️',
      name: 'Context API',
      detail: 'Global selection state across routes',
    },
    {
      icon: '📦',
      name: 'JSZip + FileSaver',
      detail: 'Client-side batch image downloads',
    },
  ];

  const features = [
    'Responsive grid layout (1 / 2 / 4 columns)',
    'Custom usePets hook with loading, error, and empty states',
    'Debounced search filtering by title and description',
    'Multi-criteria sorting (name A-Z/Z-A, date newest/oldest)',
    'Persistent selection across route navigation',
    'Batch download with estimated file size',
    'Paginated gallery with smart page numbers',
    'Lazy-loaded images with skeleton shimmer',
    'Keyboard-accessible selection checkboxes',
    'Detail view with sticky image layout',
  ];

  return (
    <Page>
      <Content>
        <Tag>About</Tag>
        <Title>
          Built with care,
          <br />
          <Accent>pixel by pixel</Accent>
        </Title>

        <Intro>
          Pawfolio is a front-end application that fetches pet data from the
          Eulerity API, presenting it in an interactive gallery. Users can
          search, sort, select, and batch-download images — all wrapped in a
          warm, editorial-inspired interface.
        </Intro>

        <Section>
          <SectionTitle>Tech Stack</SectionTitle>
          <TechGrid>
            {techStack.map((tech) => (
              <TechCard key={tech.name}>
                <TechIcon>{tech.icon}</TechIcon>
                <TechName>{tech.name}</TechName>
                <TechDetail>{tech.detail}</TechDetail>
              </TechCard>
            ))}
          </TechGrid>
        </Section>

        <Section>
          <SectionTitle>Features</SectionTitle>
          <FeatureList>
            {features.map((feature, i) => (
              <FeatureItem key={i}>
                <FeatureDot />
                {feature}
              </FeatureItem>
            ))}
          </FeatureList>
        </Section>

        <Section>
          <SectionTitle>Architecture Decisions</SectionTitle>
          <ArchCard>
            <ArchTitle>Why Context over Redux?</ArchTitle>
            <ArchText>
              The selection state is a simple Set of IDs consumed by a handful
              of components. Context avoids Redux boilerplate while naturally
              persisting state across route navigation since the Provider wraps
              the entire Router.
            </ArchText>
          </ArchCard>
          <ArchCard>
            <ArchTitle>Why a custom hook?</ArchTitle>
            <ArchText>
              usePets encapsulates all data-fetching logic, derived state
              (search + sort), and explicit loading/error handling in one
              reusable unit — keeping page components focused on layout.
            </ArchText>
          </ArchCard>
          <ArchCard>
            <ArchTitle>Why CSS variables + styled-components?</ArchTitle>
            <ArchText>
              CSS custom properties provide a single source of truth for
              theming, while styled-components enable co-located,
              prop-driven styles with full TypeScript support.
            </ArchText>
          </ArchCard>
        </Section>

        <CTASection>
          <CTAText>Ready to explore?</CTAText>
          <CTALink to="/">Browse the Gallery →</CTALink>
        </CTASection>
      </Content>
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

const Content = styled.div`
  max-width: 800px;
  animation: fadeInUp var(--duration-slow) var(--ease-out);
`;

const Tag = styled.span`
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

const Title = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: var(--space-xl);
`;

const Accent = styled.span`
  color: var(--color-accent);
  font-style: italic;
`;

const Intro = styled.p`
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: var(--space-3xl);
  border-left: 3px solid var(--color-accent);
  padding-left: var(--space-lg);
`;

const Section = styled.section`
  margin-bottom: var(--space-3xl);
`;

const SectionTitle = styled.h2`
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: var(--space-xl);
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--color-border);
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--space-md);
`;

const TechCard = styled.div`
  padding: var(--space-lg);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all var(--duration-fast) var(--ease-out);

  &:hover {
    border-color: var(--color-accent);
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
`;

const TechIcon = styled.span`
  display: block;
  font-size: 1.5rem;
  margin-bottom: var(--space-sm);
`;

const TechName = styled.h3`
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 4px;
`;

const TechDetail = styled.p`
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.4;
`;

const FeatureList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-sm) var(--space-xl);
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  padding: var(--space-sm) 0;
`;

const FeatureDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
  flex-shrink: 0;
`;

const ArchCard = styled.div`
  padding: var(--space-lg);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-md);
`;

const ArchTitle = styled.h3`
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: var(--space-sm);
  color: var(--color-accent);
`;

const ArchText = styled.p`
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
`;

const CTASection = styled.div`
  text-align: center;
  padding: var(--space-3xl) 0;
  border-top: 1px solid var(--color-border);
`;

const CTAText = styled.p`
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: var(--space-md);
`;

const CTALink = styled(Link)`
  display: inline-block;
  padding: 14px 32px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
  background: var(--color-accent);
  border-radius: var(--radius-md);
  transition: all var(--duration-fast) var(--ease-out);

  &:hover {
    background: var(--color-accent-hover);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;
