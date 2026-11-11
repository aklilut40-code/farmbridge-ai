import { useNavigate } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader.jsx';
import Icon from '../components/Icon.jsx';
import { useI18n } from '../i18n/index.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { t } = useI18n();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return (
      <>
        <SiteHeader />
        <main className={`container ${styles.wrap}`} style={{ textAlign: 'center', padding: '5rem 1rem' }}>
          <h2>Please log in to view your dashboard</h2>
          <p style={{ margin: '1.5rem 0' }}>You need an active session to view this page.</p>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>
            Go to Login
          </button>
        </main>
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main id="main" className={`container ${styles.wrap}`}>
        <div className={styles.welcomeCard}>
          <div className={styles.welcomeText}>
            <h1>{t('dashboard.welcome') || 'Welcome,'} {user.fullName}!</h1>
            <p>{t('dashboard.subtitle') || 'Connected to FarmBridge agricultural advisory network'}</p>
            <span className={styles.badge}>{user.role}</span>
          </div>
          <button className="btn btn-ghost" style={{ borderColor: '#fff', color: '#fff' }} onClick={logout}>
            {t('auth.logout') || 'Log out'}
          </button>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div>
              <div className={styles.cardIcon}>
                <Icon name="mic" size={26} color="var(--forest)" />
              </div>
              <h2 className={styles.cardTitle} style={{ marginTop: '1rem' }}>
                {t('features.voice.title') || 'Ask AI Advisor'}
              </h2>
              <p className={styles.cardText}>
                {t('features.voice.text') || 'Describe crop symptoms or ask questions by voice or text.'}
              </p>
            </div>
            <button className="btn btn-primary" onClick={() => alert('AI Advisor consultation feature active!')}>
              Start Conversation
            </button>
          </div>

          <div className={styles.card}>
            <div>
              <div className={styles.cardIcon}>
                <Icon name="camera" size={26} color="var(--forest)" />
              </div>
              <h2 className={styles.cardTitle} style={{ marginTop: '1rem' }}>
                {t('features.photo.title') || 'Scan Crop Photo'}
              </h2>
              <p className={styles.cardText}>
                {t('features.photo.text') || 'Take a clear photo of an affected leaf, stem, or fruit for preliminary diagnosis.'}
              </p>
            </div>
            <button className="btn btn-primary" onClick={() => alert('Photo inspection camera feature ready!')}>
              Upload Photo
            </button>
          </div>

          <div className={styles.card}>
            <div>
              <div className={styles.cardIcon}>
                <Icon name="people" size={26} color="var(--forest)" />
              </div>
              <h2 className={styles.cardTitle} style={{ marginTop: '1rem' }}>
                {t('features.expert.title') || 'Expert Consultations'}
              </h2>
              <p className={styles.cardText}>
                {t('features.expert.text') || 'Cases that need human attention are forwarded directly to verified agronomists.'}
              </p>
            </div>
            <button className="btn btn-ghost" onClick={() => alert('Expert consultation cases loaded.')}>
              View My Cases
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
