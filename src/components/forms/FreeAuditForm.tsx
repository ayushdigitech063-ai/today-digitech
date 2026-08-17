'use client';

import React, { useEffect, useRef, useState } from 'react';
import { LeadSubmissionPayload } from '@today-digitech/shared';
import { Button } from '../ui/Button';
import { Toast } from '../ui/Toast';
import { CheckCircle2, Send } from 'lucide-react';
import { PublicApiError, submitPublicLead } from '../../lib/publicApi';

interface AuditFormData {
  fullName: string;
  email: string;
  url: string;
  serviceInterest: string;
}

const initialFormData: AuditFormData = {
  fullName: '',
  email: '',
  url: '',
  serviceInterest: '',
};

const validate = (data: AuditFormData): Record<string, string> => {
  const errors: Record<string, string> = {};
  if (data.fullName.trim().length < 2) errors.fullName = 'Please enter your full name.';
  if (!/^\S+@\S+\.\S+$/.test(data.email)) errors.email = 'Please enter a valid email address.';
  try {
    new URL(data.url);
  } catch {
    errors.url = 'Please enter a valid website URL.';
  }
  return errors;
};

export const FreeAuditForm: React.FC = () => {
  const [formData, setFormData] = useState<AuditFormData>(initialFormData);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');
  const [isRetryable, setIsRetryable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [toast, setToast] = useState<{ id: string; message: string } | null>(null);
  const requestRef = useRef<AbortController | null>(null);

  useEffect(() => () => requestRef.current?.abort(), []);

  const updateField = (field: keyof AuditFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: '' }));
    setFormError('');
    setIsRetryable(false);
  };

  const submitAudit = async (): Promise<void> => {
    if (requestRef.current || loading) return;

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    const controller = new AbortController();
    requestRef.current = controller;
    setLoading(true);
    setFormError('');
    setIsRetryable(false);

    const payload: LeadSubmissionPayload = {
      name: formData.fullName.trim(),
      email: formData.email.trim(),
      website: formData.url.trim(),
      interestedService: formData.serviceInterest.trim() || undefined,
      message: `Website audit request for ${formData.url.trim()}`,
      formType: 'FREE_AUDIT',
    };

    try {
      await submitPublicLead(payload, { signal: controller.signal });
      setSubmittedEmail(formData.email.trim());
      setFormData(initialFormData);
      setToast({ id: 'free-audit-success', message: 'Your audit request has been submitted successfully.' });
    } catch (error) {
      if (error instanceof PublicApiError) {
        setFieldErrors(error.fieldErrors);
        setFormError(error.message);
        setIsRetryable(error.retryable);
      } else {
        setFormError('Unable to submit your audit request. Please try again.');
        setIsRetryable(true);
      }
    } finally {
      requestRef.current = null;
      setLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitAudit();
  };

  if (submittedEmail) {
    return (
      <>
        {toast && (
          <div style={{ position: 'fixed', right: '1rem', top: '1rem', zIndex: 1200 }}>
            <Toast {...toast} type="success" onDismiss={() => setToast(null)} />
          </div>
        )}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: 'var(--radius-md)', textAlign: 'center', color: '#FFFFFF' }}>
          <CheckCircle2 size={32} style={{ color: 'var(--color-orange)', margin: '0 auto 0.5rem' }} />
          <h4 style={{ fontSize: '1.125rem', fontWeight: 800 }}>Audit Request Received</h4>
          <p style={{ fontSize: '0.875rem', opacity: 0.9, marginTop: '0.25rem' }}>We will follow up at {submittedEmail} with the next steps.</p>
        </div>
      </>
    );
  }

  const getInputStyle = (field: keyof AuditFormData): React.CSSProperties => ({
    height: '50px',
    padding: '0 1rem 0 2.75rem',
    borderRadius: '10px',
    border: fieldErrors[field] ? '1.5px solid #EF4444' : '1px solid rgba(255, 255, 255, 0.25)',
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    color: '#FFFFFF',
    fontSize: '0.9375rem',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'all 0.2s ease',
  });

  return (
    <>
      {toast && (
        <div style={{ position: 'fixed', right: '1rem', top: '1rem', zIndex: 1200 }}>
          <Toast {...toast} type="success" onDismiss={() => setToast(null)} />
        </div>
      )}
      <div
        style={{
          backgroundColor: 'rgba(6, 25, 54, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          padding: '1.75rem 2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
        }}
      >
        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#CBD5E1', marginBottom: '0.35rem' }}>
              Full Name *
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <span style={{ position: 'absolute', left: '0.9rem', color: '#94A3B8', fontSize: '1rem', pointerEvents: 'none' }}>👤</span>
              <input
                type="text"
                required
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(event) => updateField('fullName', event.target.value)}
                aria-invalid={Boolean(fieldErrors.fullName)}
                aria-describedby={fieldErrors.fullName ? 'audit-name-error' : undefined}
                style={getInputStyle('fullName')}
              />
            </div>
            {fieldErrors.fullName && <p id="audit-name-error" style={{ color: '#FCA5A5', fontSize: '0.75rem', marginTop: '0.35rem' }}>{fieldErrors.fullName}</p>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#CBD5E1', marginBottom: '0.35rem' }}>
              Website URL *
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <span style={{ position: 'absolute', left: '0.9rem', color: '#94A3B8', fontSize: '1rem', pointerEvents: 'none' }}>🌐</span>
              <input
                type="url"
                required
                placeholder="https://yourcompany.com"
                value={formData.url}
                onChange={(event) => updateField('url', event.target.value)}
                aria-invalid={Boolean(fieldErrors.url)}
                aria-describedby={fieldErrors.url ? 'audit-url-error' : undefined}
                style={getInputStyle('url')}
              />
            </div>
            {fieldErrors.url && <p id="audit-url-error" style={{ color: '#FCA5A5', fontSize: '0.75rem', marginTop: '0.35rem' }}>{fieldErrors.url}</p>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#CBD5E1', marginBottom: '0.35rem' }}>
              Work Email *
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <span style={{ position: 'absolute', left: '0.9rem', color: '#94A3B8', fontSize: '1rem', pointerEvents: 'none' }}>✉️</span>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={formData.email}
                onChange={(event) => updateField('email', event.target.value)}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? 'audit-email-error' : undefined}
                style={getInputStyle('email')}
              />
            </div>
            {fieldErrors.email && <p id="audit-email-error" style={{ color: '#FCA5A5', fontSize: '0.75rem', marginTop: '0.35rem' }}>{fieldErrors.email}</p>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#CBD5E1', marginBottom: '0.35rem' }}>
              Service Interest <span style={{ opacity: 0.6 }}>(Optional)</span>
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <span style={{ position: 'absolute', left: '0.9rem', color: '#94A3B8', fontSize: '1rem', pointerEvents: 'none' }}>⚡</span>
              <input
                type="text"
                placeholder="e.g. Next.js App, Mobile App"
                value={formData.serviceInterest}
                onChange={(event) => updateField('serviceInterest', event.target.value)}
                style={getInputStyle('serviceInterest')}
              />
            </div>
          </div>

          {formError && <p role="alert" style={{ color: '#FCA5A5', fontSize: '0.875rem', margin: 0 }}>{formError}</p>}

          <Button
            type="submit"
            variant="accent"
            size="lg"
            isFullWidth
            isLoading={loading}
            disabled={loading}
            icon={<Send size={18} />}
            style={{
              marginTop: '0.35rem',
              height: '50px',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '1rem',
              boxShadow: '0 10px 25px -5px rgba(255, 106, 0, 0.4)',
            }}
          >
            {loading ? 'Submitting Request...' : 'Request Instant Tech Audit'}
          </Button>

          {isRetryable && <Button type="button" variant="outline" size="sm" isFullWidth onClick={() => void submitAudit()}>Retry submission</Button>}
        </form>
      </div>
    </>
  );
};
