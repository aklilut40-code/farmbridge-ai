import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader.jsx';
import { useI18n } from '../i18n/index.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import styles from './Auth.module.css';

export default function Register() {
  const { t, lang } = useI18n();
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('farmer');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim() || !phone.trim() || !password) {
      setError(t('auth.errorMissing') || 'Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError(t('auth.errorPasswordShort') || 'Password must be at least 6 characters long.');
      return;
    }

    try {
      await register({
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        role,
        password,
        preferredLanguage: lang,
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <SiteHeader />
      <main id="main" className={`container ${styles.wrap}`}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>{t('auth.registerTitle') || 'Create Account'}</h1>
            <p className={styles.subtitle}>{t('auth.registerSubtitle') || 'Join FarmBridge to connect with advice and experts'}</p>
          </div>

          {error && (
            <div className={styles.errorAlert} role="alert">
              {error}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label htmlFor="fullName" className={styles.label}>
                {t('auth.fullName') || 'Full Name'} *
              </label>
              <input
                id="fullName"
                type="text"
                className={styles.input}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Abebe Bikila"
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="phone" className={styles.label}>
                {t('auth.phone') || 'Phone Number'} *
              </label>
              <input
                id="phone"
                type="tel"
                className={styles.input}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+251911223344"
                autoComplete="tel"
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                {t('auth.email') || 'Email (Optional)'}
              </label>
              <input
                id="email"
                type="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@farmbridge.ai"
                autoComplete="email"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="role" className={styles.label}>
                {t('auth.iAmA') || 'I am a'}
              </label>
              <select
                id="role"
                className={styles.select}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="farmer">{t('roles.farmer.title') || 'Farmer'}</option>
                <option value="expert">{t('roles.expert.title') || 'Agricultural Expert'}</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>
                {t('auth.password') || 'Password'} *
              </label>
              <input
                id="password"
                type="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                required
              />
            </div>

            <button
              type="submit"
              className={`btn btn-primary ${styles.submitBtn}`}
              disabled={loading}
            >
              {loading ? (t('common.loading') || 'Creating account...') : (t('auth.signup') || 'Sign up')}
            </button>
          </form>

          <p className={styles.footerText}>
            {t('auth.alreadyHaveAccount') || 'Already have an account?'}
            <Link to="/login" className={styles.footerLink}>
              {t('auth.login') || 'Log in'}
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
