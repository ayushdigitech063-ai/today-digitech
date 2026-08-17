'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { servicesData } from './ServicesMegaMenu';
import { ChevronDown, Phone, Mail } from 'lucide-react';

export interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({ isOpen, onClose }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (title: string) => {
    setExpandedCategory(expandedCategory === title ? null : title);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Today Digitech Menu" position="right">
      <nav role="navigation" aria-label="Mobile Navigation" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <Link
          href="/"
          onClick={onClose}
          style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-heading)' }}
        >
          Home
        </Link>

        {/* Services Dropdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div
            onClick={() => toggleCategory('services')}
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--color-heading)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <span>Services</span>
            <ChevronDown
              size={18}
              style={{
                transform: expandedCategory === 'services' ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 200ms',
              }}
            />
          </div>

          {expandedCategory === 'services' && (
            <div style={{ paddingLeft: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
              {servicesData.map((cat, idx) => (
                <div key={idx}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-primary-navy)' }}>
                    {cat.title}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', marginTop: '0.375rem', paddingLeft: '0.5rem' }}>
                    {cat.items.map((item, itemIdx) => (
                      <Link
                        key={itemIdx}
                        href={item.href}
                        onClick={onClose}
                        style={{ fontSize: '0.8125rem', color: 'var(--color-body)' }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Link
          href="/about"
          onClick={onClose}
          style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-heading)' }}
        >
          About Us
        </Link>
        <Link
          href="/portfolio"
          onClick={onClose}
          style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-heading)' }}
        >
          Portfolio
        </Link>
        <Link
          href="/blog"
          onClick={onClose}
          style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-heading)' }}
        >
          Insights & Blog
        </Link>
        <Link
          href="/contact"
          onClick={onClose}
          style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-heading)' }}
        >
          Contact Us
        </Link>

        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
          <Link href="/contact" onClick={onClose} style={{ textDecoration: 'none' }}>
            <Button variant="accent" isFullWidth>
              Get Free Consultation
            </Button>
          </Link>

          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a href="tel:+919876543210" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-heading)' }}>
              <Phone size={16} color="var(--color-orange)" />
              <span>+91 98765 43210</span>
            </a>
            <a href="mailto:info@todaydigitech.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-heading)' }}>
              <Mail size={16} color="var(--color-orange)" />
              <span>info@todaydigitech.com</span>
            </a>
          </div>
        </div>
      </nav>
    </Drawer>
  );
};

