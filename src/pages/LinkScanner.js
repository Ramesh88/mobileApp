import React, { useState } from 'react';
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
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonIcon,
  IonBackButton,
  IonButtons,
  IonBadge,
  IonSpinner,
  IonChip
} from '@ionic/react';
import { link, alertCircle, checkmarkCircle, shield } from 'ionicons/icons';
import { analyzeLink } from '../services/api';

const LinkScanner = () => {
  const [url, setUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!url) return;

    setAnalyzing(true);
    setResult(null);

    try {
      const data = await analyzeLink(url);
      setResult(data);
    } catch (error) {
      console.error('Error analyzing link:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'critical':
        return 'danger';
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      default:
        return 'success';
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" />
          </IonButtons>
          <IonTitle>🔗 Link Safety Scanner</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="page-container">
          {/* Info Card */}
          <IonCard color="light">
            <IonCardContent>
              <p style={{ margin: 0, fontSize: '14px' }}>
                Before clicking any suspicious link, check it here first. We'll analyze the URL
                for phishing, fake bank domains, shortened URLs, and other threats.
              </p>
            </IonCardContent>
          </IonCard>

          {/* Input Card */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Check Link Safety</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel position="floating">URL / Link *</IonLabel>
                <IonInput
                  type="url"
                  value={url}
                  onIonChange={e => setUrl(e.detail.value)}
                  placeholder="https://example.com or bit.ly/xxx"
                />
              </IonItem>
              <IonButton
                expand="block"
                className="scan-button"
                onClick={handleAnalyze}
                disabled={!url || analyzing}
                color="tertiary"
              >
                {analyzing ? (
                  <>
                    <IonSpinner name="crescent" /> Analyzing...
                  </>
                ) : (
                  <>
                    <IonIcon icon={shield} slot="start" />
                    Check Link Safety
                  </>
                )}
              </IonButton>
            </IonCardContent>
          </IonCard>

          {/* Result */}
          {result && (
            <IonCard className={`result-container result-${result.isSafe ? 'safe' : 'danger'}`}>
              <IonCardContent>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <IonIcon
                    icon={result.isSafe ? checkmarkCircle : alertCircle}
                    color={result.isSafe ? 'success' : 'danger'}
                    style={{ fontSize: '48px', marginRight: '12px' }}
                  />
                  <div>
                    <h2 style={{ margin: '0 0 4px 0', fontSize: '20px' }}>
                      {result.isSafe ? '✓ Safe to Visit' : result.recommendation.split(':')[0]}
                    </h2>
                    <IonBadge color={getRiskColor(result.riskLevel)}>
                      Risk: {result.riskLevel.toUpperCase()}
                    </IonBadge>
                  </div>
                </div>
                
                {!result.isSafe && result.threats && result.threats.length > 0 && (
                  <div style={{ marginTop: '16px' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontWeight: '600' }}>Detected Threats:</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                      {result.threats.map((threat, index) => (
                        <IonChip key={index} color="danger">
                          {threat.replace(/_/g, ' ').toUpperCase()}
                        </IonChip>
                      ))}
                    </div>
                  </div>
                )}
                
                <div style={{ marginTop: '16px' }}>
                  <h4 style={{ margin: '0 0 8px 0', fontWeight: '600' }}>Analysis:</h4>
                  <p style={{ margin: 0 }}>{result.recommendation}</p>
                </div>

                {!result.isSafe && (
                  <div style={{
                    marginTop: '20px',
                    padding: '16px',
                    background: 'rgba(235, 68, 90, 0.1)',
                    borderRadius: '8px'
                  }}>
                    <strong>⚠️ DO NOT CLICK THIS LINK!</strong>
                    <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
                      This link may steal your personal information, passwords, or install malware.
                      If you received this in SMS/WhatsApp, delete the message immediately.
                    </p>
                  </div>
                )}
              </IonCardContent>
            </IonCard>
          )}

          {/* Common Scam Examples */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Common Link Scams</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonChip color="danger" style={{ marginBottom: '8px' }}>
                <IonLabel>Shortened URLs (bit.ly, tinyurl)</IonLabel>
              </IonChip>
              <IonChip color="danger" style={{ marginBottom: '8px' }}>
                <IonLabel>Fake bank domains</IonLabel>
              </IonChip>
              <IonChip color="danger" style={{ marginBottom: '8px' }}>
                <IonLabel>Prize/Lottery websites</IonLabel>
              </IonChip>
              <IonChip color="danger" style={{ marginBottom: '8px' }}>
                <IonLabel>No HTTPS (http:// only)</IonLabel>
              </IonChip>
              <IonChip color="danger">
                <IonLabel>Free domains (.tk, .ml, .ga)</IonLabel>
              </IonChip>
              
              <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--ion-color-medium)' }}>
                💡 <strong>Tip:</strong> Always type official website URLs directly in your browser.
                Never click links from unknown SMS or WhatsApp messages.
              </p>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LinkScanner;






