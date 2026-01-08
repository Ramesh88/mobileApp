import React, { useState, useEffect } from 'react';
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
  IonList,
  IonIcon,
  IonBackButton,
  IonButtons,
  IonBadge,
  IonSpinner,
  IonTextarea
} from '@ionic/react';
import { mail, alertCircle, checkmarkCircle, warning } from 'ionicons/icons';
import { analyzeSMS, getSmsHistory } from '../services/api';

const SmsScanner = () => {
  const [message, setMessage] = useState('');
  const [sender, setSender] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getSmsHistory();
      setHistory(data);
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const handleAnalyze = async () => {
    if (!message) return;

    setAnalyzing(true);
    setResult(null);

    try {
      const data = await analyzeSMS(message, sender);
      setResult(data);
      loadHistory(); // Refresh history
    } catch (error) {
      console.error('Error analyzing SMS:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'high':
      case 'critical':
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
        <IonToolbar color="secondary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" />
          </IonButtons>
          <IonTitle>💬 SMS Scanner</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="page-container">
          {/* Info Card */}
          <IonCard color="light">
            <IonCardContent>
              <p style={{ margin: 0, fontSize: '14px' }}>
                Paste suspicious SMS messages here to check if they're fraudulent.
                We'll analyze patterns like fake bills, KYC scams, lottery scams, etc.
              </p>
            </IonCardContent>
          </IonCard>

          {/* Input Card */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Check SMS Message</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel position="floating">Sender ID</IonLabel>
                <IonInput
                  value={sender}
                  onIonChange={e => setSender(e.detail.value)}
                  placeholder="EC-123456, HDFCBK, etc."
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Message Content *</IonLabel>
                <IonTextarea
                  value={message}
                  onIonChange={e => setMessage(e.detail.value)}
                  placeholder="Paste the SMS message here..."
                  rows={6}
                />
              </IonItem>
              <IonButton
                expand="block"
                className="scan-button"
                onClick={handleAnalyze}
                disabled={!message || analyzing}
                color="secondary"
              >
                {analyzing ? (
                  <>
                    <IonSpinner name="crescent" /> Analyzing...
                  </>
                ) : (
                  <>
                    <IonIcon icon={mail} slot="start" />
                    Analyze SMS
                  </>
                )}
              </IonButton>
            </IonCardContent>
          </IonCard>

          {/* Result */}
          {result && (
            <IonCard className={`result-container result-${result.isFraud ? 'danger' : 'safe'}`}>
              <IonCardContent>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <IonIcon
                    icon={result.isFraud ? alertCircle : checkmarkCircle}
                    color={result.isFraud ? 'danger' : 'success'}
                    style={{ fontSize: '48px', marginRight: '12px' }}
                  />
                  <div>
                    <h2 style={{ margin: '0 0 4px 0', fontSize: '20px' }}>
                      {result.isFraud ? '🚨 FRAUD DETECTED!' : '✓ Safe Message'}
                    </h2>
                    <IonBadge color={getRiskColor(result.riskLevel)}>
                      Risk: {result.riskLevel.toUpperCase()}
                    </IonBadge>
                  </div>
                </div>
                
                <div style={{ marginTop: '16px' }}>
                  <h4 style={{ margin: '0 0 8px 0', fontWeight: '600' }}>Category:</h4>
                  <p style={{ margin: '0 0 16px 0', textTransform: 'capitalize' }}>
                    {result.category.replace(/_/g, ' ')}
                  </p>
                  
                  <h4 style={{ margin: '0 0 8px 0', fontWeight: '600' }}>Reason:</h4>
                  <p style={{ margin: '0 0 16px 0' }}>{result.reason}</p>
                  
                  <h4 style={{ margin: '0 0 8px 0', fontWeight: '600' }}>Recommendation:</h4>
                  <p style={{ margin: 0 }}>{result.recommendation}</p>
                </div>
              </IonCardContent>
            </IonCard>
          )}

          {/* History */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Recent SMS Scans</IonCardTitle>
            </IonCardHeader>
            <IonCardContent style={{ padding: 0 }}>
              <IonList>
                {history.length === 0 ? (
                  <IonItem>
                    <IonLabel>
                      <p>No scan history yet</p>
                    </IonLabel>
                  </IonItem>
                ) : (
                  history.slice(0, 5).map(item => (
                    <IonItem key={item.id}>
                      <IonIcon
                        icon={item.isFraud ? warning : checkmarkCircle}
                        color={item.isFraud ? 'danger' : 'success'}
                        slot="start"
                      />
                      <IonLabel>
                        <h3>{item.sender}</h3>
                        <p style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {item.message}
                        </p>
                      </IonLabel>
                      <IonBadge
                        color={getRiskColor(item.riskLevel)}
                        slot="end"
                      >
                        {item.riskLevel}
                      </IonBadge>
                    </IonItem>
                  ))
                )}
              </IonList>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SmsScanner;






