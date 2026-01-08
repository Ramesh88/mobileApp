import React from 'react';
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
  IonItem,
  IonLabel,
  IonToggle,
  IonList,
  IonIcon,
  IonBackButton,
  IonButtons
} from '@ionic/react';
import { notifications, shield, call, mail, person, informationCircle } from 'ionicons/icons';

const Settings = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="medium">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" />
          </IonButtons>
          <IonTitle>⚙️ Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="page-container">
          {/* Notifications */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Notifications</IonCardTitle>
            </IonCardHeader>
            <IonCardContent style={{ padding: 0 }}>
              <IonList>
                <IonItem>
                  <IonIcon icon={notifications} slot="start" color="primary" />
                  <IonLabel>
                    <h3>Push Notifications</h3>
                    <p>Get alerts for detected scams</p>
                  </IonLabel>
                  <IonToggle checked={true} />
                </IonItem>
                <IonItem>
                  <IonIcon icon={shield} slot="start" color="success" />
                  <IonLabel>
                    <h3>Real-time Protection</h3>
                    <p>Auto-block suspicious activities</p>
                  </IonLabel>
                  <IonToggle checked={true} />
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Protection Settings */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Protection</IonCardTitle>
            </IonCardHeader>
            <IonCardContent style={{ padding: 0 }}>
              <IonList>
                <IonItem>
                  <IonIcon icon={call} slot="start" color="primary" />
                  <IonLabel>
                    <h3>Call Scanner</h3>
                    <p>Scan incoming calls</p>
                  </IonLabel>
                  <IonToggle checked={true} />
                </IonItem>
                <IonItem>
                  <IonIcon icon={mail} slot="start" color="secondary" />
                  <IonLabel>
                    <h3>SMS Scanner</h3>
                    <p>Analyze SMS messages</p>
                  </IonLabel>
                  <IonToggle checked={true} />
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* App Info */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>About</IonCardTitle>
            </IonCardHeader>
            <IonCardContent style={{ padding: 0 }}>
              <IonList>
                <IonItem button>
                  <IonIcon icon={informationCircle} slot="start" color="tertiary" />
                  <IonLabel>
                    <h3>App Version</h3>
                    <p>1.0.0</p>
                  </IonLabel>
                </IonItem>
                <IonItem button>
                  <IonIcon icon={person} slot="start" color="warning" />
                  <IonLabel>
                    <h3>Privacy Policy</h3>
                    <p>How we protect your data</p>
                  </IonLabel>
                </IonItem>
                <IonItem button>
                  <IonIcon icon={shield} slot="start" color="success" />
                  <IonLabel>
                    <h3>Terms of Service</h3>
                    <p>App usage terms</p>
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Info */}
          <IonCard color="light">
            <IonCardContent>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '8px' }}>🛡️</div>
                <h3 style={{ margin: '8px 0' }}>FraudShield</h3>
                <p style={{ margin: '4px 0', fontSize: '14px', color: 'var(--ion-color-medium)' }}>
                  Protecting you from fraud, one scan at a time
                </p>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Settings;






