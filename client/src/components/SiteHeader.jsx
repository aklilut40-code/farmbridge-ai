import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import { useI18n } from '../i18n/index.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import styles from './SiteHeader.module.css';

export default function SiteHeader() {
  const { t } = useI18n();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className={styles.header}>
      <a className={styles.skip} href="#main">{t('common.skip')}</a>
      <div className={`container ${styles.bar}`}>
        <Link to="/" aria-label={t('common.brand')} className={styles.brand}>
          <Logo size={38} />
        </Link>
        <nav className={styles.nav} aria-label={t('common.mainNav')}>
          <a href="/#features">{t('nav.features')}</a>
          <a href="/#how">{t('nav.how')}</a>
          <a href="/#roles">{t('nav.roles')}</a>
          <a href="/#contact">{t('nav.contact')}</a>
        </nav>
        <div className={styles.actions}>
          <LanguageSwitcher variant="select" />
          {isAuthenticated && user ? (
            <>
              <Link className="btn btn-primary" to="/dashboard">
                {t('nav.dashboard') || 'Dashboard'}
              </Link>
              <button
                type="button"
                className={`btn btn-ghost ${styles.login}`}
                onClick={logout}
              >
                {t('auth.logout') || 'Log out'}
              </button>
            </>
          ) : (
            <>
              <Link className={`btn btn-ghost ${styles.login}`} to="/login">{t('auth.login')}</Link>
              <Link className="btn btn-primary" to="/register">{t('auth.signup')}</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

