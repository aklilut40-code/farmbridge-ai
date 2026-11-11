import { Link } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader.jsx';
import { useI18n } from '../i18n/index.jsx';
import styles from './ComingNext.module.css';

export default function ComingNext() {
  const { t } = useI18n();
  return (
    <>
      <SiteHeader />
      <main id="main" className={`container ${styles.wrap}`}>
        <h1 className={styles.title}>{t('placeholder.title')}</h1>
        <p className={styles.text}>{t('placeholder.text')}</p>
        <Link className="btn btn-primary" to="/">{t('placeholder.back')}</Link>
      </main>
    </>
  );
}
