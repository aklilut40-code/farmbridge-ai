import Logo from './Logo.jsx';
import { useI18n } from '../i18n/index.jsx';
import styles from './SiteFooter.module.css';

// Public project contact details, as chosen by the founder for public-facing pages.
const EMAIL = 'aklilut40@gmail.com';
const TELEGRAM = 'Akesoftware';

export default function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer id="contact" className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <Logo size={44} inverted />
          <p className={styles.tagline}>{t('common.tagline')}</p>
          <p className={styles.line}>{t('footer.line')}</p>
        </div>
        <div>
          <h2 className={styles.heading}>{t('footer.contact')}</h2>
          <ul className={styles.list}>
            <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li><a href={`https://t.me/${TELEGRAM}`} rel="noopener noreferrer">Telegram @{TELEGRAM}</a></li>
            <li>{t('footer.founder')}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
