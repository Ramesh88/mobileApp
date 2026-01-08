import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonBadge,
  IonText
} from '@ionic/react';
import {
  call,
  mail,
  link,
  qrCode,
  people,
  school,
  shield,
  settings
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { getCallStats } from '../services/api';

const Dashboard = () => {
  const history = useHistory();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getCallStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const features = [
    {
      title: 'Call Scanner',
      icon: call,
      color: 'primary',
      path: '/call-scanner',
      description: 'Detect fake calls instantly'
    },
    {
      title: 'SMS Scanner',
      icon: mail,
      color: 'secondary',
      path: '/sms-scanner',
      description: 'Identify fraud messages'
    },
    {
      title: 'Link Safety',
      icon: link,
      color: 'tertiary',
      path: '/link-scanner',
      description: 'Check suspicious links'
    },
    {
      title: 'QR Scanner',
      icon: qrCode,
      color: 'success',
      path: '/qr-scanner',
      description: 'Scan QR codes safely'
    },
    {
      title: 'Family Protection',
      icon: people,
      color: 'warning',
      path: '/family',
      description: 'Protect your loved ones'
    },
    {
      title: 'Learn & Practice',
      icon: school,
      color: 'danger',
      path: '/education',
      description: 'Stay informed & safe'
    }
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>🛡️ FraudShield</IonTitle>
          <IonButton slot="end" fill="clear" onClick={() => history.push('/settings')}>
            <IonIcon icon={settings} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="page-container">
          {/* Header Card */}
          <IonCard color="primary">
            <IonCardContent>
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>🛡️</div>
                <h2 style={{ margin: '10px 0', color: 'white' }}>Stay Protected</h2>
                <p style={{ margin: '5px 0', opacity: 0.9, color: 'white' }}>
                  Your personal fraud detection assistant
                </p>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Statistics */}
          {stats && (
            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-value">{stats.totalCallsScanned}</div>
                <div className="stat-label">Calls Scanned</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.scamCallsBlocked}</div>
                <div className="stat-label">Scams Blocked</div>
              </div>
              <div className="stat-card">
                <div className="stat-value" style={{ fontSize: '20px' }}>
                  ₹{(stats.moneySaved / 1000).toFixed(0)}K
                </div>
                <div className="stat-label">Money Saved</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">
                  <IonIcon icon={shield} size="large" style={{ color: 'var(--ion-color-success)' }} />
                </div>
                <div className="stat-label">Protected</div>
              </div>
            </div>
          )}

          {/* Features Grid */}
          <IonGrid>
            <IonRow>
              {features.map((feature, index) => (
                <IonCol size="6" key={index}>
                  <IonCard
                    button
                    onClick={() => history.push(feature.path)}
                    className="feature-card"
                  >
                    <IonCardContent style={{ textAlign: 'center', padding: '20px 10px' }}>
                      <IonIcon
                        icon={feature.icon}
                        color={feature.color}
                        style={{ fontSize: '48px', marginBottom: '10px' }}
                      />
                      <h3 style={{ fontSize: '14px', fontWeight: '600', margin: '8px 0' }}>
                        {feature.title}
                      </h3>
                      <p style={{ fontSize: '11px', color: 'var(--ion-color-medium)', margin: '4px 0' }}>
                        {feature.description}
                      </p>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>

          {/* Quick Tip */}
          <IonCard color="light">
            <IonCardHeader>
              <IonCardTitle style={{ fontSize: '16px' }}>💡 Today's Tip</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText>
                <p style={{ margin: 0 }}>
                  <strong>Never share your UPI PIN</strong> with anyone, including family or bank staff.
                  Banks NEVER ask for your PIN.
                </p>
              </IonText>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;






