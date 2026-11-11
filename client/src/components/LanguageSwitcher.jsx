import { LANGUAGES, useI18n } from '../i18n/index.jsx';
import styles from './LanguageSwitcher.module.css';

// variant "select": compact native dropdown (best on small Android screens, used in the header)
// variant "buttons": three large buttons (used in the Languages section)
export default function LanguageSwitcher({ variant = 'select' }) {
  const { lang, setLang, t } = useI18n();

  if (variant === 'select') {
    return (
      <label className={styles.selectWrap}>
        <span className="sr-only">{t('common.language')}</span>
        <select className={styles.select} value={lang} onChange={(e) => setLang(e.target.value)}>
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code} lang={l.code}>
              {l.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <div className={styles.group} role="group" aria-label={t('common.language')}>
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          aria-pressed={lang === l.code}
          className={`${styles.choice} ${lang === l.code ? styles.active : ''}`}
          onClick={() => setLang(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
