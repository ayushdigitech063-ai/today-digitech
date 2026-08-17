'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { WebsiteSettingsDTO } from '@today-digitech/shared';
import { defaultSettings, fetchPublicSettings } from '../../lib/api';

export interface FooterProps {
  settings?: WebsiteSettingsDTO;
}

export const Footer: React.FC<FooterProps> = ({ settings: initialSettings }) => {
  const [settings, setSettings] = useState<WebsiteSettingsDTO>(initialSettings || defaultSettings);

  useEffect(() => {
    fetchPublicSettings().then((s) => {
      if (s) setSettings(s);
    });
  }, []);

  const social = settings.socialLinks || {};

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-dark-navy)',
        color: '#94A3B8',
        paddingTop: '4rem',
        paddingBottom: '2rem',
        borderTop: '4px solid var(--color-orange)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Company Info Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {settings.footerLogoUrl && !settings.footerLogoUrl.endsWith('.svg') ? (
                <img src={settings.footerLogoUrl} alt={settings.businessName || 'Today Digitech Logo'} style={{ height: '36px', width: 'auto', display: 'block' }} />
              ) : (
                <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="10" fill="url(#footer_logo_grad)" />
                  <path d="M12 14L20 9L28 14V26L20 31L12 26V14Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" />
                  <circle cx="20" cy="20" r="4" fill="#FF6A00" />
                  <defs>
                    <linearGradient id="footer_logo_grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#062B63" />
                      <stop offset="1" stopColor="#07448D" />
                    </linearGradient>
                  </defs>
                </svg>
              )}
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                {settings.businessName.split(' ')[0]}<span style={{ color: 'var(--color-orange)' }}>{settings.businessName.split(' ')[1] || ''}</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#94A3B8' }}>
              {settings.footerDescription}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {social.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                  <Facebook size={18} />
                </a>
              )}
              {social.twitter && (
                <a href={social.twitter} target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                  <Twitter size={18} />
                </a>
              )}
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                  <Linkedin size={18} />
                </a>
              )}
              {social.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                  <Instagram size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#FFFFFF' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Services', href: '/services' },
                { name: 'Portfolio', href: '/portfolio' },
                { name: 'Insights & Blog', href: '/blog' },
                { name: 'Contact Us', href: '/contact' },
              ].map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} style={{ fontSize: '0.875rem', color: '#94A3B8', display: 'inline-flex', alignItems: 'center', gap: '0.375rem', textDecoration: 'none' }}>
                    <ArrowRight size={14} color="var(--color-orange)" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#FFFFFF' }}>Core Services</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { name: 'Next.js & React Web Apps', href: '/services/web-application-engineering' },
                { name: 'Android & iOS Mobile Apps', href: '/services/mobile-app-development' },
                { name: 'Cloud Architecture & DevOps', href: '/services/cloud-devops-automation' },
                { name: 'Digital Growth & SEO', href: '/services/digital-growth-seo' },
              ].map((service, idx) => (
                <li key={idx}>
                  <a href={service.href} style={{ fontSize: '0.875rem', color: '#94A3B8', display: 'inline-flex', alignItems: 'center', gap: '0.375rem', textDecoration: 'none' }}>
                    <ArrowRight size={14} color="var(--color-orange)" />
                    <span>{service.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#FFFFFF' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                <MapPin size={18} color="var(--color-orange)" style={{ marginTop: '0.2rem' }} />
                <span>{settings.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <Phone size={18} color="var(--color-orange)" />
                <a href={`tel:${(settings.phone || '').replace(/\s+/g, '')}`} style={{ color: '#E2E8F0', textDecoration: 'none' }}>
                  {settings.phone}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <Mail size={18} color="var(--color-orange)" />
                <a href={`mailto:${settings.email}`} style={{ color: '#E2E8F0', textDecoration: 'none' }}>
                  {settings.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8125rem',
          }}
        >
          <span>{settings.copyrightText}</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="/privacy-policy" style={{ color: '#94A3B8', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="/terms-and-conditions" style={{ color: '#94A3B8', textDecoration: 'none' }}>Terms & Conditions</a>
            <a href="/refund-policy" style={{ color: '#94A3B8', textDecoration: 'none' }}>Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
