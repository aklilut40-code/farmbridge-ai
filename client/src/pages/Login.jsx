import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader.jsx';
import { useI18n } from '../i18n/index.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import styles from './Auth.module.css';

export default function Login() {
  const { t } = useI18n();
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim() || !password) {
      setError(t('auth.errorMissing') || 'Please enter both phone/email and password.');
      return;
    }

    try {
      await login(identifier.trim(), password);
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
            <h1 className={styles.title}>{t('auth.loginTitle') || 'Welcome Back'}</h1>
            <p className={styles.subtitle}>{t('auth.loginSubtitle') || 'Log in to access your farm advisor and records'}</p>
          </div>

          {error && (
            <div className={styles.errorAlert} role="alert">
              {error}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label htmlFor="identifier" className={styles.label}>
                {t('auth.phoneOrEmail') || 'Phone Number or Email'}
              </label>
              <input
                id="identifier"
                type="text"
                className={styles.input}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="+251911223344"
                autoComplete="username"
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>
                {t('auth.password') || 'Password'}
              </label>
              <input
                id="password"
                type="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              className={`btn btn-primary ${styles.submitBtn}`}
              disabled={loading}
            >
              {loading ? (t('common.loading') || 'Logging in...') : (t('auth.login') || 'Log in')}
            </button>
          </form>

          <p className={styles.footerText}>
            {t('auth.noAccount') || "Don't have an account?"}
            <Link to="/register" className={styles.footerLink}>
              {t('auth.signup') || 'Sign up'}
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
