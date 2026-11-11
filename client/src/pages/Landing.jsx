import { Link } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader.jsx';
import SiteFooter from '../components/SiteFooter.jsx';
import LanguageSwitcher from '../components/LanguageSwitcher.jsx';
import Icon from '../components/Icon.jsx';
import { useI18n } from '../i18n/index.jsx';
import styles from './Landing.module.css';

import farmerHero from '../assets/img/farmer-hero.webp';
import robot from '../assets/img/robot.webp';
import leafSick from '../assets/img/leaf-sick.webp';
import leafHealthy from '../assets/img/leaf-healthy.webp';
import farmerPortrait from '../assets/img/farmer.webp';
import expertPortrait from '../assets/img/expert.webp';
import adminPortrait from '../assets/img/admin.webp';
import harvest from '../assets/img/harvest.webp';
import people from '../assets/img/people.webp';

const FEATURES = [
  { key: 'assistant', icon: 'chat' },
  { key: 'photo', icon: 'camera' },
  { key: 'voice', icon: 'mic' },
  { key: 'expert', icon: 'expert' },
  { key: 'alerts', icon: 'bell' },
];

const STEPS = ['s1', 's2', 's3'];

const ROLES = [
  { key: 'farmer', img: farmerPortrait },
  { key: 'expert', img: expertPortrait },
  { key: 'admin', img: adminPortrait },
];

export default function Landing() {
  const { t } = useI18n();

  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* Hero */}
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroText}>
              <h1 id="hero-title" className={styles.h1}>{t('hero.title')}</h1>
              <p className={styles.lead}>{t('hero.text')}</p>
              <div className={styles.heroActions}>
                <Link className="btn btn-primary btn-lg" to="/register">{t('hero.cta1')}</Link>
                <a className="btn btn-ghost btn-lg" href="#how">{t('hero.cta2')}</a>
              </div>
              <p className={styles.tagline}>{t('common.tagline')}</p>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.photoFrame}>
                <img src={farmerHero} alt="" width="272" height="324" />
              </div>
              <p className={`${styles.bubble} ${styles.bubbleQ}`}>{t('hero.bubbleQ')}</p>
              <div className={styles.assistant}>
                <img className={styles.robot} src={robot} alt="" width="230" height="302" />
                <p className={`${styles.bubble} ${styles.bubbleA}`}>{t('hero.bubbleA')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className={`${styles.section} ${styles.tinted}`} aria-labelledby="features-title">
          <div className="container">
            <h2 id="features-title" className={styles.h2}>{t('features.title')}</h2>
            <ul className={styles.tiles}>
              {FEATURES.map((f) => (
                <li key={f.key} className={styles.tile}>
                  <span className={styles.tileIcon}><Icon name={f.icon} size={28} /></span>
                  <h3 className={styles.h3}>{t(`features.${f.key}.title`)}</h3>
                  <p className={styles.muted}>{t(`features.${f.key}.text`)}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How it works: a real sequence, so the steps are numbered */}
        <section id="how" className={styles.section} aria-labelledby="how-title">
          <div className="container">
            <h2 id="how-title" className={styles.h2}>{t('how.title')}</h2>
            <ol className={styles.steps}>
              {STEPS.map((s, i) => (
                <li key={s} className={styles.step}>
                  <span className={styles.stepNo} aria-hidden="true">{i + 1}</span>
                  <h3 className={styles.h3}>{t(`how.${s}.title`)}</h3>
                  <p className={styles.muted}>{t(`how.${s}.text`)}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Trust: how AI results are presented */}
        <section className={`${styles.section} ${styles.tinted}`} aria-labelledby="trust-title">
          <div className={`container ${styles.trustGrid}`}>
            <div>
              <h2 id="trust-title" className={styles.h2}>{t('trust.title')}</h2>
              <p className={`${styles.lead} ${styles.spaced}`}>{t('trust.text')}</p>
            </div>
            <div className={styles.leaves}>
              <figure className={`${styles.leafCard} ${styles.leafWarn}`}>
                <img src={leafSick} alt="" width="166" height="160" />
                <figcaption>
                  <strong className={styles.leafLabel}><Icon name="alert" size={20} /> {t('trust.sick')}</strong>
                  <span className={styles.muted}>{t('trust.sickNote')}</span>
                </figcaption>
              </figure>
              <figure className={`${styles.leafCard} ${styles.leafOk}`}>
                <img src={leafHealthy} alt="" width="167" height="164" />
                <figcaption>
                  <strong className={styles.leafLabel}><Icon name="check" size={20} /> {t('trust.healthy')}</strong>
                  <span className={styles.muted}>{t('trust.healthyNote')}</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Roles */}
        <section id="roles" className={styles.section} aria-labelledby="roles-title">
          <div className="container">
            <h2 id="roles-title" className={styles.h2}>{t('roles.title')}</h2>
            <ul className={styles.roles}>
              {ROLES.map((r) => (
                <li key={r.key} className={styles.role}>
                  <img src={r.img} alt="" width="156" height="183" />
                  <div className={styles.roleBody}>
                    <h3 className={styles.h3}>{t(`roles.${r.key}.title`)}</h3>
                    <p className={styles.muted}>{t(`roles.${r.key}.text`)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Offline */}
        <section className={`${styles.section} ${styles.tinted}`} aria-labelledby="offline-title">
          <div className="container">
            <div className={styles.offlineHead}>
              <span className={styles.tileIcon}><Icon name="save" size={28} /></span>
              <div>
                <h2 id="offline-title" className={styles.h2}>{t('offline.title')}</h2>
                <p className={`${styles.lead} ${styles.spaced}`}>{t('offline.text')}</p>
              </div>
            </div>
            <img className={styles.banner} src={harvest} alt="" width="760" height="185" />
          </div>
        </section>

        {/* Languages */}
        <section className={styles.section} aria-labelledby="lang-title">
          <div className={`container ${styles.langGrid}`}>
            <div>
              <h2 id="lang-title" className={styles.h2}>{t('languages.title')}</h2>
              <p className={`${styles.lead} ${styles.spaced}`}>{t('languages.text')}</p>
              <div className={styles.spaced}>
                <LanguageSwitcher variant="buttons" />
              </div>
            </div>
            <img className={styles.peoplePhoto} src={people} alt="" width="333" height="176" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
