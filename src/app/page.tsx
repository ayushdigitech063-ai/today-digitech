import React from 'react';
import { TopInfoBar } from '../components/layout/TopInfoBar';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { FloatingActions } from '../components/layout/FloatingActions';
import { MobileConversionBar } from '../components/layout/MobileConversionBar';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Accordion } from '../components/ui/Accordion';
import { FreeAuditForm } from '../components/forms/FreeAuditForm';
import { HeroSlider } from '../components/home/HeroSlider';
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Star,
  Sparkles,
} from 'lucide-react';
import { fetchPublicData } from '../lib/publicApi';
import { fetchPublicSettings, defaultSettings } from '../lib/api';

interface HomepagePayload {
  featuredServices?: Array<{ title: string; summary?: string; description?: string; slug: string }>;
  caseStudies?: Array<{ title: string; summary?: string; slug: string; clientName?: string; industry?: string }>;
  testimonials?: Array<{ clientName: string; clientRole?: string; content: string; rating?: number }>;
  clients?: Array<{ name: string; logoUrl?: string }>;
  latestBlogPosts?: Array<{ title: string; slug: string; category?: string; publishDate?: string }>;
}

const defaultHomepage: HomepagePayload = {
  featuredServices: [
    { title: 'Web Application Engineering', summary: 'Custom Next.js & React micro-frontends built for scale and high conversion.', slug: 'web-application-engineering' },
    { title: 'Native & Hybrid Mobile Apps', summary: 'iOS & Android applications with seamless offline-first experience.', slug: 'mobile-app-development' },
    { title: 'Cloud Infrastructure & DevOps', summary: 'Kubernetes, AWS, and CI/CD pipelines engineered for 99.99% uptime.', slug: 'cloud-devops-automation' },
    { title: 'Digital Growth & SEO Acceleration', summary: 'Data-driven SEO, technical optimization, and performance growth engine.', slug: 'digital-growth-seo' },
  ],
  caseStudies: [
    { title: 'Fintech Platform Scaling', summary: 'Architected high-throughput payment platform handling 1M+ transactions daily.', slug: 'axis-fintech-scaling', clientName: 'Axis Fintech' },
    { title: 'HealthTech Portal Transformation', summary: 'Migrated legacy healthcare portal to microservices architecture.', slug: 'medpulse-digital-health', clientName: 'MedPulse' },
  ],
  testimonials: [
    { clientName: 'Rajesh Sharma', clientRole: 'CTO, Axis Fintech', content: 'Today Digitech delivered our platform on budget with unmatched technical precision. Our transaction latency dropped by 45%.', rating: 5 },
    { clientName: 'Dr. Ananya Verma', clientRole: 'VP Product, MedPulse', content: 'Their engineering team is top-tier. They transformed our legacy portal into a high-speed web application.', rating: 5 },
  ],
  clients: [
    { name: 'Axis Fintech' }, { name: 'MedPulse Tech' }, { name: 'OmniLogistics' }, { name: 'EduVision' }, { name: 'RealEstate Prime' }, { name: 'CloudScale Global' }
  ],
  latestBlogPosts: [
    { title: 'How We Achieved Sub-Second Load Times with Next.js App Router & Edge Caching', slug: 'sub-second-load-times-nextjs', category: 'Engineering' }
  ],
};

interface PackageItem {
  name: string;
  price: string;
  period?: string;
  desc?: string;
  description?: string;
  features?: string[];
  isPopular?: boolean;
  isRecommended?: boolean;
}

const defaultPackages: PackageItem[] = [
  { name: 'Growth Starter', price: '₹49,999', period: '/ project', desc: 'Ideal for growing startups needing a high-performance web platform.', features: ['Custom Next.js Application', 'Responsive Mobile Design', 'Basic SEO Setup', '1 Month Cloud Support'], isPopular: false },
  { name: 'Enterprise Scale', price: '₹1,49,999', period: '/ project', desc: 'Full-stack engineering with API backend, database, & admin portal.', features: ['Full Next.js + Express Stack', 'MongoDB Database Architecture', 'Admin Portal & Role RBAC', 'Cloudinary Media Management', '3 Months Dedicated Maintenance'], isPopular: true },
  { name: 'Custom Architecture', price: 'Custom Quote', period: '', desc: 'Tailored microservices & dedicated engineering pod for enterprise.', features: ['Multi-tenant Architecture', 'DevOps & Kubernetes Setup', '24/7 SLA Monitoring', 'Dedicated Tech Lead & Squad'], isPopular: false },
];

interface FaqItem {
  id?: string;
  title: string;
  content: string;
}

const defaultFaqs: FaqItem[] = [
  { id: 'f-1', title: 'How long does a typical custom web application project take?', content: 'Most enterprise web projects take between 4 to 8 weeks depending on backend complexity and API integrations.' },
  { id: 'f-2', title: 'Do you provide post-launch support and SLA maintenance?', content: 'Yes, we provide 24/7 cloud monitoring, security patching, and dedicated SLA maintenance plans.' },
  { id: 'f-3', title: 'Will I have full access to source code and database assets?', content: 'Absolutly. Upon project delivery, you own 100% of the repository, IP rights, and database assets.' },
];

export default async function HomePage() {
  const [hpData, settingsData, packagesList, faqsList] = await Promise.all([
    fetchPublicData<HomepagePayload>('/homepage', defaultHomepage),
    fetchPublicSettings(),
    fetchPublicData<PackageItem[]>('/packages', defaultPackages),
    fetchPublicData<FaqItem[]>('/faqs', defaultFaqs),
  ]);

  const hero = settingsData.heroSection || defaultSettings.heroSection;

  const servicesList = hpData.featuredServices || defaultHomepage.featuredServices!;
  const caseStudies = hpData.caseStudies || defaultHomepage.caseStudies!;
  const testimonialsList = hpData.testimonials || defaultHomepage.testimonials!;
  const clientLogos = hpData.clients || defaultHomepage.clients!;

  const processSteps = [
    { num: '01', title: 'Discovery & Architecture', desc: 'In-depth domain audit, technical roadmap, and system boundary design.' },
    { num: '02', title: 'Agile Engineering', desc: 'Sprint-based development with clean TypeScript code and rigorous CI testing.' },
    { num: '03', title: 'Quality & Security Audit', desc: 'Penetration testing, accessibility check, and performance optimization.' },
    { num: '04', title: 'Deployment & Scaling', desc: 'Zero-downtime deployment, cloud monitoring, and post-launch support.' },
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Top Bar */}
      <TopInfoBar />

      {/* 2. Header */}
      <Header />

      {/* 3. Interactive Multi-Slide Hero Banner Slider */}
      <HeroSlider initialHeroData={hero} />

      {/* 4. Trusted Partners & Brands Section (Exact Match to Reference Image) */}
      <section
        style={{
          backgroundColor: '#F8FAFC',
          padding: '4.5rem 0',
          borderBottom: '1px solid var(--color-border)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle Decorative Background Pattern Dots on Sides */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '120px',
            height: '100%',
            backgroundImage: 'radial-gradient(#CBD5E1 1.5px, transparent 1.5px)',
            backgroundSize: '16px 16px',
            opacity: 0.5,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '120px',
            height: '100%',
            backgroundImage: 'radial-gradient(#CBD5E1 1.5px, transparent 1.5px)',
            backgroundSize: '16px 16px',
            opacity: 0.5,
            pointerEvents: 'none',
          }}
        />

        <Container style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
            <span
              style={{
                fontSize: '0.8125rem',
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#2563EB',
              }}
            >
              {settingsData.partnersSection?.topCaption || 'TRUSTED BY BUSINESSES & GROWING TEAMS'}
            </span>

            {/* Small Orange Accent Bar */}
            <div style={{ width: '32px', height: '3px', backgroundColor: 'var(--color-orange)', borderRadius: '2px', margin: '0.2rem 0' }} />

            <h2
              style={{
                fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                fontWeight: 800,
                color: '#0F172A',
                letterSpacing: '-0.02em',
                maxWidth: '720px',
                lineHeight: 1.25,
              }}
            >
              {settingsData.partnersSection?.headlineText || 'We’re proud to partner with ambitious companies across industries.'}
            </h2>
          </div>

          {/* Brand Logos with Vertical Dividers (Fully Responsive Grid/Flex) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            {(clientLogos && clientLogos.length > 0
              ? clientLogos.map((c) => ({ name: c.name, logoUrl: c.logoUrl, color: '#00539B', symbol: '' }))
              : [
                  { name: 'TATA', color: '#00539B', symbol: '🔷' },
                  { name: 'PhonePe', color: '#5F259F', symbol: 'पे' },
                  { name: 'ACKO', color: '#7B2CBF', symbol: '🟣' },
                  { name: 'DREAM11', color: '#E10600', symbol: '🏆' },
                  { name: 'zepto', color: '#FF0055', symbol: '' },
                  { name: 'lenskart', color: '#000042', symbol: '👓' },
                ]
            ).map((brand, idx, arr) => (
              <React.Fragment key={idx}>
                <div
                  style={{
                    padding: '0.5rem 1.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  {'logoUrl' in brand && brand.logoUrl ? (
                    <img src={brand.logoUrl} alt={brand.name} style={{ maxHeight: '32px', maxWidth: '120px', objectFit: 'contain' }} />
                  ) : (
                    <>
                      {brand.symbol && (
                        <span style={{ fontSize: '1.2rem', fontWeight: 800, color: brand.color }}>
                          {brand.symbol}
                        </span>
                      )}
                      <span
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 900,
                          color: brand.color,
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {brand.name}
                      </span>
                    </>
                  )}
                </div>
                {idx < arr.length - 1 && (
                  <div
                    className="partner-divider"
                    style={{
                      width: '1px',
                      height: '24px',
                      backgroundColor: '#CBD5E1',
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Services Grid */}
      <section style={{ padding: '5rem 0' }}>
        <Container>
          <SectionHeading
            badge="Core Offerings"
            title="Full-Spectrum Digital & Technology Services"
            description="Built by senior full-stack architects using modern TypeScript & cloud infrastructure standards."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {servicesList.map((srv, idx) => (
              <Card key={idx} hoverable style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div><Code2 size={24} color="#FF6A00" /></div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-heading)' }}>{srv.title}</h3>
                <p style={{ color: 'var(--color-body)', lineHeight: 1.6, flex: 1 }}>{srv.summary || srv.description}</p>
                <a href={`/services/${srv.slug}`}>
                  <Button variant="outline" size="sm" icon={<ArrowRight size={14} />}>View Capability</Button>
                </a>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Case Studies */}
      <section style={{ backgroundColor: '#F8FAFC', padding: '5rem 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <Container>
          <SectionHeading
            badge="Proven Results"
            title="Enterprise Client Case Studies"
            description="Real outcomes delivered across Fintech, Healthcare, E-Commerce, and Supply Chain."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {caseStudies.map((cs, idx) => (
              <Card key={idx} style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Badge variant="accent" size="sm">{cs.industry || 'Enterprise'}</Badge>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#64748B' }}>{cs.clientName}</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-heading)' }}>{cs.title}</h3>
                <p style={{ color: 'var(--color-body)', lineHeight: 1.6, flex: 1 }}>{cs.summary}</p>
                <a href={`/case-studies/${cs.slug}`}>
                  <Button variant="primary" size="sm" icon={<ArrowRight size={14} />}>Read Case Study</Button>
                </a>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. Process Section */}
      <section style={{ padding: '5rem 0' }}>
        <Container>
          <SectionHeading
            badge="Engineering Methodology"
            title="How We Architect & Deliver Solutions"
            description="A systematic 4-step delivery pipeline ensuring zero technical debt and sub-second performance."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {processSteps.map((step, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-orange)' }}>{step.num}</span>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-heading)' }}>{step.title}</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-body)', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 8. Pricing Packages */}
      <section style={{ backgroundColor: '#F8FAFC', padding: '5rem 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <Container>
          <SectionHeading
            badge="Transparent Pricing"
            title="Investment Plans & Packages"
            description="Clear project scopes backed by enterprise SLA guarantees and source code ownership."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {packagesList.map((pkg, idx) => (
              <Card key={idx} style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', border: pkg.isPopular || pkg.isRecommended ? '2px solid var(--color-orange)' : '1px solid var(--color-border)', position: 'relative' }}>
                {(pkg.isPopular || pkg.isRecommended) && (
                  <span style={{ position: 'absolute', top: '-12px', right: '20px', backgroundColor: 'var(--color-orange)', color: '#FFFFFF', padding: '0.2rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
                    Most Popular
                  </span>
                )}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-heading)' }}>{pkg.name}</h3>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary-navy)' }}>
                  {pkg.price} <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-body)' }}>{pkg.period}</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-body)', lineHeight: 1.6 }}>{pkg.desc || pkg.description}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, margin: '1rem 0' }}>
                  {(pkg.features || []).map((feat, fIdx) => (
                    <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-heading)' }}>
                      <CheckCircle2 size={16} color="var(--color-orange)" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
                <a href="/contact">
                  <Button variant={pkg.isPopular || pkg.isRecommended ? 'accent' : 'primary'} size="md" style={{ width: '100%' }} icon={<ArrowRight size={16} />}>
                    Select Plan
                  </Button>
                </a>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 9. Testimonials */}
      <section style={{ padding: '5rem 0' }}>
        <Container>
          <SectionHeading
            badge="Client Feedback"
            title="What Technology Executives Say"
            description="Verified testimonials from CTOs, VPs, and Product Leads."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {testimonialsList.map((item, idx) => (
              <Card key={idx} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--color-orange)" color="var(--color-orange)" />
                  ))}
                </div>
                <p style={{ color: 'var(--color-body)', lineHeight: 1.6, fontStyle: 'italic', flex: 1 }}>"{item.content}"</p>
                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem' }}>
                  <div style={{ fontWeight: 800, color: 'var(--color-heading)' }}>{item.clientName}</div>
                  <div style={{ fontSize: '0.8125rem', color: '#64748B' }}>{item.clientRole}</div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 10. Instant Tech Audit CTA (Modern Glassmorphism Design) */}
      <section
        style={{
          background: 'radial-gradient(100% 100% at 50% 0%, #082E66 0%, #031735 60%, #010B1B 100%)',
          padding: '5.5rem 0',
          color: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Ambient Radial Glow */}
        <div style={{ position: 'absolute', top: '-10%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255, 106, 0, 0.2) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />

        <Container style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <span style={{ backgroundColor: 'rgba(255, 106, 0, 0.15)', color: '#FF8A33', border: '1px solid rgba(255, 106, 0, 0.3)', padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.8125rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  ⚡ Free Technical Audit
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                Get a Free Technical & SEO Audit of Your Website
              </h2>
              <p style={{ color: '#94A3B8', fontSize: '1.125rem', lineHeight: 1.65 }}>
                Our senior software architects will inspect your site performance, security headers, Core Web Vitals, and keyword ranking potential with an actionable report.
              </p>

              {/* Audit Highlights */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#CBD5E1', fontSize: '0.9375rem', fontWeight: 600 }}>
                  <span style={{ color: '#10B981', fontWeight: 800 }}>✓</span> Core Web Vitals & Speed Performance Analysis
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#CBD5E1', fontSize: '0.9375rem', fontWeight: 600 }}>
                  <span style={{ color: '#10B981', fontWeight: 800 }}>✓</span> Security Vulnerability & OWASP Inspection
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#CBD5E1', fontSize: '0.9375rem', fontWeight: 600 }}>
                  <span style={{ color: '#10B981', fontWeight: 800 }}>✓</span> Competitor SEO & Organic Keyword Opportunity
                </div>
              </div>
            </div>

            <div>
              <FreeAuditForm />
            </div>
          </div>
        </Container>
      </section>

      {/* 11. FAQs */}
      <section style={{ padding: '5rem 0' }}>
        <Container>
          <SectionHeading
            badge="Got Questions?"
            title="Frequently Asked Questions"
            description="Clear answers regarding project timelines, tech stacks, SLAs, and deliverables."
          />
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Accordion items={faqsList.map((f, idx) => ({ id: f.id || `faq-${idx}`, title: f.title, content: f.content }))} />
          </div>
        </Container>
      </section>

      {/* Floating CTA & Footer */}
      <FloatingActions />
      <MobileConversionBar />
      <Footer />
    </div>
  );
}
