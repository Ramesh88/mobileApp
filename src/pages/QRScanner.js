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
  IonSegment,
  IonSegmentButton
} from '@ionic/react';
import { qrCode, alertCircle, checkmarkCircle, camera, image } from 'ionicons/icons';
import { analyzeQR, verifyPaymentScreenshot } from '../services/api';

const QRScanner = () => {
  const [scanType, setScanType] = useState('qr');
  const [qrContent, setQrContent] = useState('');
  const [amount, setAmount] = useState('');
  const [merchantName, setMerchantName] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyzeQR = async () => {
    if (!qrContent) return;

    setAnalyzing(true);
    setResult(null);

    try {
      const data = await analyzeQR(qrContent, null);
      setResult({ ...data, type: 'qr' });
    } catch (error) {
      console.error('Error analyzing QR:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleVerifyPayment = async () => {
    setAnalyzing(true);
    setResult(null);

    try {
      // In real app, imageData would come from camera/file input
      const data = await verifyPaymentScreenshot(null, amount, merchantName);
      setResult({ ...data, type: 'payment' });
    } catch (error) {
      console.error('Error verifying payment:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'critical':
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
        <IonToolbar color="success">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" />
          </IonButtons>
          <IonTitle>📲 QR & Payment Scanner</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="page-container">
          {/* Info Card */}
          <IonCard color="light">
            <IonCardContent>
              <p style={{ margin: 0, fontSize: '14px' }}>
                Scan QR codes to detect tampering, or verify GPay/PhonePe payment screenshots
                to avoid fake payment scams.
              </p>
            </IonCardContent>
          </IonCard>

          {/* Mode Selector */}
          <IonSegment value={scanType} onIonChange={e => setScanType(e.detail.value)}>
            <IonSegmentButton value="qr">
              <IonLabel>QR Code</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="payment">
              <IonLabel>Payment Verify</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          {/* QR Code Scanner */}
          {scanType === 'qr' && (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Scan QR Code</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div style={{ textAlign: 'center', padding: '20px', marginBottom: '16px' }}>
                  <IonIcon
                    icon={camera}
                    style={{ fontSize: '80px', color: 'var(--ion-color-medium)' }}
                  />
                  <p style={{ marginTop: '12px', color: 'var(--ion-color-medium)' }}>
                    In real app, camera will open here
                  </p>
                </div>
                <IonItem>
                  <IonLabel position="floating">Or paste QR content *</IonLabel>
                  <IonInput
                    value={qrContent}
                    onIonChange={e => setQrContent(e.detail.value)}
                    placeholder="upi://pay?pa=merchant@bank..."
                  />
                </IonItem>
                <IonButton
                  expand="block"
                  className="scan-button"
                  onClick={handleAnalyzeQR}
                  disabled={!qrContent || analyzing}
                  color="success"
                >
                  {analyzing ? (
                    <>
                      <IonSpinner name="crescent" /> Analyzing...
                    </>
                  ) : (
                    <>
                      <IonIcon icon={qrCode} slot="start" />
                      Check QR Code
                    </>
                  )}
                </IonButton>
              </IonCardContent>
            </IonCard>
          )}

          {/* Payment Screenshot Verifier */}
          {scanType === 'payment' && (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Verify Payment Screenshot</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div style={{ textAlign: 'center', padding: '20px', marginBottom: '16px' }}>
                  <IonIcon
                    icon={image}
                    style={{ fontSize: '80px', color: 'var(--ion-color-medium)' }}
                  />
                  <p style={{ marginTop: '12px', color: 'var(--ion-color-medium)' }}>
                    Upload customer's payment screenshot
                  </p>
                  <IonButton fill="outline" color="success">
                    <IonIcon icon={image} slot="start" />
                    Select Image
                  </IonButton>
                </div>
                <IonItem>
                  <IonLabel position="floating">Amount (₹)</IonLabel>
                  <IonInput
                    type="number"
                    value={amount}
                    onIonChange={e => setAmount(e.detail.value)}
                    placeholder="500"
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Merchant Name</IonLabel>
                  <IonInput
                    value={merchantName}
                    onIonChange={e => setMerchantName(e.detail.value)}
                    placeholder="Your shop name"
                  />
                </IonItem>
                <IonButton
                  expand="block"
                  className="scan-button"
                  onClick={handleVerifyPayment}
                  disabled={analyzing}
                  color="success"
                >
                  {analyzing ? (
                    <>
                      <IonSpinner name="crescent" /> Verifying...
                    </>
                  ) : (
                    <>
                      <IonIcon icon={checkmarkCircle} slot="start" />
                      Verify Payment
                    </>
                  )}
                </IonButton>
              </IonCardContent>
            </IonCard>
          )}

          {/* QR Result */}
          {result && result.type === 'qr' && (
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
                      {result.isSafe ? '✓ QR Code Safe' : result.warning}
                    </h2>
                    <IonBadge color={getRiskColor(result.riskLevel)}>
                      Risk: {result.riskLevel.toUpperCase()}
                    </IonBadge>
                  </div>
                </div>
                
                <div style={{ marginTop: '16px' }}>
                  <h4 style={{ margin: '0 0 8px 0', fontWeight: '600' }}>Analysis:</h4>
                  <p style={{ margin: 0 }}>{result.recommendation}</p>
                  
                  {result.isTampered && (
                    <div style={{
                      marginTop: '16px',
                      padding: '16px',
                      background: 'rgba(235, 68, 90, 0.1)',
                      borderRadius: '8px'
                    }}>
                      <strong>⚠️ WARNING: QR Code is Tampered!</strong>
                      <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
                        This QR code has been modified by scammers. DO NOT scan or pay.
                        Ask the merchant for a fresh QR code or pay using cash/card.
                      </p>
                    </div>
                  )}
                </div>
              </IonCardContent>
            </IonCard>
          )}

          {/* Payment Verification Result */}
          {result && result.type === 'payment' && (
            <IonCard className={`result-container result-${result.isReal ? 'safe' : 'danger'}`}>
              <IonCardContent>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <IonIcon
                    icon={result.isReal ? checkmarkCircle : alertCircle}
                    color={result.isReal ? 'success' : 'danger'}
                    style={{ fontSize: '48px', marginRight: '12px' }}
                  />
                  <div>
                    <h2 style={{ margin: '0 0 4px 0', fontSize: '20px' }}>
                      {result.isReal ? '✓ Real Payment' : '🚨 FAKE SCREENSHOT'}
                    </h2>
                    <IonBadge color={result.isReal ? 'success' : 'danger'}>
                      Confidence: {(result.confidence * 100).toFixed(0)}%
                    </IonBadge>
                  </div>
                </div>
                
                <div style={{ marginTop: '16px' }}>
                  <h4 style={{ margin: '0 0 8px 0', fontWeight: '600' }}>Analysis Details:</h4>
                  <ul style={{ margin: '0 0 16px 0', paddingLeft: '20px' }}>
                    <li>Screenshot: {result.analysis.screenshotAuthenticity}</li>
                    <li>Transaction ID: {result.analysis.transactionId}</li>
                    <li>Timestamp: {result.analysis.timestamp}</li>
                    <li>UPI Details: {result.analysis.upiDetails}</li>
                  </ul>
                  
                  <h4 style={{ margin: '0 0 8px 0', fontWeight: '600' }}>Recommendation:</h4>
                  <p style={{ margin: 0 }}>{result.recommendation}</p>
                  
                  {!result.isReal && (
                    <div style={{
                      marginTop: '16px',
                      padding: '16px',
                      background: 'rgba(235, 68, 90, 0.1)',
                      borderRadius: '8px'
                    }}>
                      <strong>🚨 DO NOT GIVE GOODS/SERVICES!</strong>
                      <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
                        This screenshot is FAKE/EDITED. Customer has not made any payment.
                        Check your actual UPI app for received payment confirmation.
                      </p>
                    </div>
                  )}
                </div>
              </IonCardContent>
            </IonCard>
          )}

          {/* Tips */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>💡 Safety Tips</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>
                  Always verify QR stickers aren't placed over original ones
                </li>
                <li style={{ marginBottom: '8px' }}>
                  Check merchant name in QR matches the shop name
                </li>
                <li style={{ marginBottom: '8px' }}>
                  For shop owners: NEVER trust customer screenshots
                </li>
                <li style={{ marginBottom: '8px' }}>
                  Always check your UPI app for actual payment received
                </li>
                <li>
                  If QR looks tampered, pay with cash or card instead
                </li>
              </ul>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default QRScanner;






