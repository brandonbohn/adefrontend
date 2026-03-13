import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const planOptions = [
  { key: 'monthly-21', label: 'Monthly Starter', amount: '21', cadence: 'monthly' },
  { key: 'annual-250', label: 'Basic Support', amount: '250', cadence: 'annual' },
  { key: 'annual-500', label: 'Full Support', amount: '500', cadence: 'annual' },
  { key: 'annual-1000', label: 'Premium', amount: '1000', cadence: 'annual' }
];

const fallbackPaymentLinks: Record<string, string> = {
  paypal: 'https://www.paypal.com/donate',
  mpesa: 'https://www.safaricom.co.ke/mpesa'
};

const normalizePaymentKey = (value: string) => {
  const v = value.toLowerCase().replace(/[^a-z]/g, '');
  if (v.includes('mpesa')) return 'mpesa';
  if (v.includes('paypal')) return 'paypal';
  return v;
};

const getDefaultPaymentMethod = (country: string): 'mpesa' | 'paypal' => {
  const normalizedCountry = country.trim().toLowerCase();
  if (normalizedCountry.includes('kenya') || normalizedCountry === 'ke') return 'mpesa';
  if (normalizedCountry.includes('united states') || normalizedCountry === 'us' || normalizedCountry === 'usa') return 'paypal';
  return 'paypal';
};

const getDefaultCurrency = (country: string): 'KES' | 'USD' => {
  return getDefaultPaymentMethod(country) === 'mpesa' ? 'KES' : 'USD';
};

const SponsorshipForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const planFromQuery = searchParams.get('plan') || 'monthly-21';
  const girlFromQuery = searchParams.get('girl') || '';
  const girlIdFromQuery = searchParams.get('girlId') || '';

  const initialPlan = useMemo(() => {
    const matched = planOptions.find((p) => p.key === planFromQuery);
    return matched || planOptions[0];
  }, [planFromQuery]);

  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [backendPaymentMethods, setBackendPaymentMethods] = useState<Array<{ key: string; label?: string; link?: string }>>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    sponsorName: '',
    email: '',
    phone: '',
    country: '',
    selectedGirl: girlFromQuery,
    selectedGirlId: girlIdFromQuery,
    sponsorshipPlan: initialPlan.key,
    amount: initialPlan.amount,
    message: ''
  });

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/content/section/donateSection`)
      .then((res) => {
        const methods = Array.isArray(res.data?.paymentMethods) ? res.data.paymentMethods : [];
        setBackendPaymentMethods(methods);
      })
      .catch(() => {
        setBackendPaymentMethods([]);
      });
  }, []);

  useEffect(() => {
    // Keep currency compatible with country default payment method.
    const nextCurrency = getDefaultCurrency(form.country);
    if (selectedCurrency !== nextCurrency) {
      setSelectedCurrency(nextCurrency);
    }
  }, [form.country, selectedCurrency]);

  const onPlanChange = (planKey: string) => {
    const matched = planOptions.find((p) => p.key === planKey);
    if (!matched) return;
    setForm((prev) => ({ ...prev, sponsorshipPlan: matched.key, amount: matched.amount }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);
    setErrors({});

    const nextErrors: Record<string, string> = {};
    const sponsorName = form.sponsorName.trim();
    const email = form.email.trim();
    const amountValue = parseFloat(form.amount);

    if (!sponsorName) nextErrors.sponsorName = 'Name is required.';
    if (!email) nextErrors.email = 'Email is required.';
    else if (!/.+@.+\..+/.test(email)) nextErrors.email = 'Please enter a valid email.';
    if (!form.country.trim()) nextErrors.country = 'Country is required.';
    if (!form.selectedGirl.trim()) nextErrors.selectedGirl = 'Selected girl is required.';
    if (!form.selectedGirlId.trim()) nextErrors.selectedGirlId = 'Girl ID is required.';
    if (!form.amount.trim() || Number.isNaN(amountValue) || amountValue <= 0) nextErrors.amount = 'Please enter a valid amount.';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitting(false);
      setSubmitError('Please fix the errors below.');
      return;
    }

    try {
      const paymentMethod = getDefaultPaymentMethod(form.country);

      const response = await axios.post(`${API_BASE_URL}/api/donors`, {
        name: sponsorName,
        email,
        phone: form.phone.trim(),
        amount: amountValue,
        currency: selectedCurrency,
        paymentMethod,
        message: form.message.trim(),
        source: 'girls-sponsorship-form',
        sponsorType: 'girl',
        selectedGirl: form.selectedGirl.trim(),
        selectedGirlId: form.selectedGirlId.trim(),
        sponsorshipPlan: form.sponsorshipPlan
      });

      const paymentUrlFromResponse =
        response.data?.paymentUrl ||
        response.data?.redirectUrl ||
        response.data?.paymentLink ||
        response.data?.redirectURL;

      const backendPaymentUrl =
        backendPaymentMethods.find((m) => normalizePaymentKey(m.key || '') === paymentMethod)?.link ||
        backendPaymentMethods.find((m) => normalizePaymentKey(m.label || '') === paymentMethod)?.link;

      const paymentUrl = paymentUrlFromResponse || backendPaymentUrl || fallbackPaymentLinks[paymentMethod];

      if (!paymentUrl) {
        setSubmitting(false);
        setSubmitError('Payment routing is not configured yet. Please contact support or try again later.');
        return;
      }

      setSubmitSuccess(true);
      setSubmitting(false);
      if (paymentUrl) {
        setTimeout(() => {
          window.location.replace(paymentUrl);
        }, 300);
      }
    } catch (_err) {
      setSubmitting(false);
      setSubmitError('Failed to submit sponsorship. Please try again.');
    }
  };

  return (
    <section style={{ width: '100%', maxWidth: 980, margin: '2rem auto', padding: '1rem' }}>
      <div style={{ background: '#101010', color: '#fff', borderRadius: 12, padding: '1rem 1.2rem', marginBottom: '1rem' }}>
        <h2 style={{ margin: 0, marginBottom: '0.4rem' }}>Girls Sponsorship Form</h2>
        <div style={{ color: '#dddddd' }}>Your selected plan and girl are already loaded.</div>
      </div>

      <form onSubmit={handleSubmit} style={{ background: '#1d1d1d', color: '#fff', borderRadius: 12, padding: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Selected Girl</label>
            <input type="text" value={form.selectedGirl} readOnly style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid #444', background: '#151515', color: '#fff' }} />
            {errors.selectedGirl && <div style={{ color: '#ffb3b3', marginTop: 6 }}>{errors.selectedGirl}</div>}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Selected Plan</label>
            <select value={form.sponsorshipPlan} onChange={(e) => onPlanChange(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid #444', background: '#101010', color: '#fff' }}>
              {planOptions.map((plan) => (
                <option key={plan.key} value={plan.key}>{plan.label} - ${plan.amount} / {plan.cadence}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Sponsor Name</label>
            <input type="text" value={form.sponsorName} onChange={(e) => setForm({ ...form, sponsorName: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid #444', background: '#101010', color: '#fff' }} />
            {errors.sponsorName && <div style={{ color: '#ffb3b3', marginTop: 6 }}>{errors.sponsorName}</div>}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid #444', background: '#101010', color: '#fff' }} />
            {errors.email && <div style={{ color: '#ffb3b3', marginTop: 6 }}>{errors.email}</div>}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Country</label>
            <input type="text" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} placeholder="Kenya, USA, etc" style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid #444', background: '#101010', color: '#fff' }} />
            {errors.country && <div style={{ color: '#ffb3b3', marginTop: 6 }}>{errors.country}</div>}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Phone (optional)</label>
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid #444', background: '#101010', color: '#fff' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Amount ({selectedCurrency})</label>
            <input type="number" min="1" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid #444', background: '#101010', color: '#fff' }} />
            {errors.amount && <div style={{ color: '#ffb3b3', marginTop: 6 }}>{errors.amount}</div>}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Currency</label>
            <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid #444', background: '#101010', color: '#fff' }}>
              <option value="USD">USD</option>
              <option value="KES">KES</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Message (optional)</label>
          <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid #444', background: '#101010', color: '#fff' }} />
        </div>

        <div style={{ marginTop: '1rem', color: '#dddddd', fontSize: '0.95rem' }}>
          Payment method is selected automatically by country: Kenya uses M-Pesa, US uses PayPal.
        </div>

        {submitError && <div style={{ marginTop: '1rem', color: '#ffb3b3' }}>{submitError}</div>}
        {submitSuccess && <div style={{ marginTop: '1rem', color: '#b9ffcc' }}>Submitted. Redirecting to payment...</div>}

        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button type="submit" disabled={submitting} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 8, padding: '0.75rem 1rem', fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}>
            {submitting ? 'Submitting...' : 'Continue to Payment'}
          </button>
          <Link to="/sponsored-girls" style={{ color: '#fff', background: '#333', borderRadius: 8, padding: '0.75rem 1rem', textDecoration: 'none', fontWeight: 700 }}>
            Back to Girls List
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SponsorshipForm;
