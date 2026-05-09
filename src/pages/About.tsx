import styled from 'styled-components';
import { Link } from 'react-router-dom';

/**
 * About — Personal "About Me" page + project tech details.
 * The hackathon spec asks for an "About Me" page specifically.
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

  return (
    <Page>
      <Content>
        {/* ── About Me Section ── */}
        <Tag>About Me</Tag>
        <Title>
          Hi, I'm <Accent>Prayag</Accent> 👋
        </Title>

        <Intro>
          I'm a front-end developer who cares about clean architecture,
          polished interfaces, and writing code that other developers
          actually enjoy reading. I believe the best UIs feel invisible
          — they get out of the way and let users focus on what matters.
        </Intro>

        <Section>
          <SectionTitle>What I Bring to a Team</SectionTitle>
          <ValueGrid>
            <ValueCard>
              <ValueIcon>🏗️</ValueIcon>
              <ValueName>Architecture First</ValueName>
              <ValueDetail>
                I plan before I code. Types, folder structure, and data flow
                come before the first component. This project uses a custom
                hook + Context pattern that keeps pages clean and state
                predictable.
              </ValueDetail>
            </ValueCard>
            <ValueCard>
              <ValueIcon>🎨</ValueIcon>
              <ValueName>Design Sensibility</ValueName>
              <ValueDetail>
                I care about typography, spacing, and micro-interactions.
                This app uses Playfair Display + DM Sans, a warm earthy
                palette, and deliberate animations — not default Bootstrap.
              </ValueDetail>
            </ValueCard>
            <ValueCard>
              <ValueIcon>♿</ValueIcon>
              <ValueName>Accessibility</ValueName>
              <ValueDetail>
                Keyboard navigation, aria labels, semantic HTML, and
                focus states aren't afterthoughts — they're built in from
                the start. The selection checkboxes here work with Enter
                and Space keys.
              </ValueDetail>
            </ValueCard>
            <ValueCard>
              <ValueIcon>📐</ValueIcon>
              <ValueName>Attention to Detail</ValueName>
              <ValueDetail>
                Debounced search, skeleton loaders, error boundaries,
                staggered animations, responsive breakpoints at 640px
                and 1024px — the small things that separate "works" from
                "works well."
              </ValueDetail>
            </ValueCard>
          </ValueGrid>
        </Section>

        {/* ── Project Tech Section ── */}
        <Section>
          <SectionTitle>Tech Stack Used</SectionTitle>
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
              reusable unit — keeping page components focused on layout
              and interaction.
            </ArchText>
          </ArchCard>
          <ArchCard>
            <ArchTitle>Why CSS variables + styled-components?</ArchTitle>
            <ArchText>
              CSS custom properties provide a single source of truth for
              theming (easy to add dark mode later), while styled-components
              enable co-located, prop-driven styles with full TypeScript
              support and zero class name conflicts.
            </ArchText>
          </ArchCard>
        </Section>

        <CTASection>
          <CTAText>Want to see it in action?</CTAText>
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

const ValueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-md);
`;

const ValueCard = styled.div`
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

const ValueIcon = styled.span`
  display: block;
  font-size: 1.5rem;
  margin-bottom: var(--space-sm);
`;

const ValueName = styled.h3`
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 6px;
`;

const ValueDetail = styled.p`
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.55;
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
