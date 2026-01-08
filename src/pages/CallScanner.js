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
  IonText
} from '@ionic/react';
import { call, alertCircle, checkmarkCircle, warning } from 'ionicons/icons';
import { analyzeCall, getCallHistory } from '../services/api';

const CallScanner = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callerName, setCallerName] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getCallHistory();
      setHistory(data);
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const handleAnalyze = async () => {
    if (!phoneNumber) return;

    setAnalyzing(true);
    setResult(null);

    try {
      const data = await analyzeCall(phoneNumber, callerName);
      setResult(data);
      loadHistory(); // Refresh history
    } catch (error) {
      console.error('Error analyzing call:', error);
      setResult({
        isScam: false,
        riskLevel: 'low',
        reason: 'Error analyzing call',
        advice: 'Please try again'
      });
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
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" />
          </IonButtons>
          <IonTitle>📞 Call Scanner</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="page-container">
          {/* Info Card */}
          <IonCard color="light">
            <IonCardContent>
              <p style={{ margin: 0, fontSize: '14px' }}>
                Enter the phone number and caller name to check if it's a scam call.
                Our AI will analyze the pattern in real-time.
              </p>
            </IonCardContent>
          </IonCard>

          {/* Input Card */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Check Incoming Call</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel position="floating">Phone Number *</IonLabel>
                <IonInput
                  type="tel"
                  value={phoneNumber}
                  onIonChange={e => setPhoneNumber(e.detail.value)}
                  placeholder="+91-9999999999"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Caller Name (Optional)</IonLabel>
                <IonInput
                  value={callerName}
                  onIonChange={e => setCallerName(e.detail.value)}
                  placeholder="Bank Officer, etc."
                />
              </IonItem>
              <IonButton
                expand="block"
                className="scan-button"
                onClick={handleAnalyze}
                disabled={!phoneNumber || analyzing}
              >
                {analyzing ? (
                  <>
                    <IonSpinner name="crescent" /> Analyzing...
                  </>
                ) : (
                  <>
                    <IonIcon icon={call} slot="start" />
                    Analyze Call
                  </>
                )}
              </IonButton>
            </IonCardContent>
          </IonCard>

          {/* Result */}
          {result && (
            <IonCard className={`result-container result-${result.isScam ? 'danger' : 'safe'}`}>
              <IonCardContent>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <IonIcon
                    icon={result.isScam ? alertCircle : checkmarkCircle}
                    color={result.isScam ? 'danger' : 'success'}
                    style={{ fontSize: '48px', marginRight: '12px' }}
                  />
                  <div>
                    <h2 style={{ margin: '0 0 4px 0', fontSize: '20px' }}>
                      {result.isScam ? '⚠️ SCAM DETECTED!' : '✓ Safe Call'}
                    </h2>
                    <IonBadge color={getRiskColor(result.riskLevel)}>
                      Risk: {result.riskLevel.toUpperCase()}
                    </IonBadge>
                  </div>
                </div>
                
                <div style={{ marginTop: '16px' }}>
                  <h4 style={{ margin: '0 0 8px 0', fontWeight: '600' }}>Reason:</h4>
                  <p style={{ margin: '0 0 16px 0' }}>{result.reason}</p>
                  
                  <h4 style={{ margin: '0 0 8px 0', fontWeight: '600' }}>Advice:</h4>
                  <p style={{ margin: 0 }}>{result.advice}</p>
                </div>
              </IonCardContent>
            </IonCard>
          )}

          {/* History */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Recent Scans</IonCardTitle>
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
                        icon={item.isScam ? warning : checkmarkCircle}
                        color={item.isScam ? 'danger' : 'success'}
                        slot="start"
                      />
                      <IonLabel>
                        <h3>{item.phoneNumber}</h3>
                        <p>{item.callerName}</p>
                        <p style={{ fontSize: '12px', color: 'var(--ion-color-medium)' }}>
                          {item.reason}
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

export default CallScanner;






