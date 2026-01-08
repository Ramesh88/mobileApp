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
  IonModal,
  IonSelect,
  IonSelectOption,
  IonAlert
} from '@ionic/react';
import { people, add, warning, shield, call } from 'ionicons/icons';
import { getFamilyMembers, addFamilyMember, getFamilyAlerts, sendSOS } from '../services/api';

const FamilyProtection = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAlertsModal, setShowAlertsModal] = useState(false);
  const [showSOSAlert, setShowSOSAlert] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    phone: '',
    relation: 'parent',
    protectionLevel: 'high'
  });

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const data = await getFamilyMembers();
      setMembers(data);
    } catch (error) {
      console.error('Error loading members:', error);
    }
  };

  const handleAddMember = async () => {
    try {
      await addFamilyMember(newMember);
      setShowAddModal(false);
      setNewMember({ name: '', phone: '', relation: 'parent', protectionLevel: 'high' });
      loadMembers();
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  const handleViewAlerts = async (member) => {
    setSelectedMember(member);
    try {
      const data = await getFamilyAlerts(member.id);
      setAlerts(data);
      setShowAlertsModal(true);
    } catch (error) {
      console.error('Error loading alerts:', error);
    }
  };

  const handleSOS = async () => {
    try {
      await sendSOS('1', 'danger', 'User requested help');
      setShowSOSAlert(false);
      alert('SOS alert sent to all family members!');
    } catch (error) {
      console.error('Error sending SOS:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" />
          </IonButtons>
          <IonTitle>👨‍👩‍👧‍👦 Family Protection</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="page-container">
          {/* Info Card */}
          <IonCard color="light">
            <IonCardContent>
              <p style={{ margin: 0, fontSize: '14px' }}>
                Add your family members to monitor and protect them from scam calls, SMS, and links.
                Get instant alerts when they encounter fraud attempts.
              </p>
            </IonCardContent>
          </IonCard>

          {/* SOS Button */}
          <IonButton
            expand="block"
            color="danger"
            size="large"
            style={{ marginBottom: '20px' }}
            onClick={() => setShowSOSAlert(true)}
          >
            <IonIcon icon={warning} slot="start" />
            🆘 SEND SOS ALERT
          </IonButton>

          {/* Add Member Button */}
          <IonButton
            expand="block"
            color="warning"
            onClick={() => setShowAddModal(true)}
          >
            <IonIcon icon={add} slot="start" />
            Add Family Member
          </IonButton>

          {/* Family Members List */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Protected Family Members</IonCardTitle>
            </IonCardHeader>
            <IonCardContent style={{ padding: 0 }}>
              <IonList>
                {members.length === 0 ? (
                  <IonItem>
                    <IonLabel>
                      <p>No family members added yet</p>
                    </IonLabel>
                  </IonItem>
                ) : (
                  members.map(member => (
                    <IonItem key={member.id}>
                      <IonIcon icon={people} slot="start" color="warning" />
                      <IonLabel>
                        <h3>{member.name}</h3>
                        <p>{member.phone}</p>
                        <p style={{ fontSize: '12px', color: 'var(--ion-color-medium)' }}>
                          Protection: {member.protectionLevel.toUpperCase()}
                        </p>
                      </IonLabel>
                      {member.alerts > 0 && (
                        <div slot="end" style={{ textAlign: 'center' }}>
                          <IonBadge color="danger" className="alert-badge">
                            {member.alerts} alerts
                          </IonBadge>
                          <IonButton
                            fill="clear"
                            size="small"
                            onClick={() => handleViewAlerts(member)}
                          >
                            View
                          </IonButton>
                        </div>
                      )}
                    </IonItem>
                  ))
                )}
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* How It Works */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>How Family Protection Works</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <IonIcon icon={shield} color="success" style={{ marginRight: '8px' }} />
                  <strong>High Protection (Recommended)</strong>
                </div>
                <p style={{ marginLeft: '32px', fontSize: '14px', color: 'var(--ion-color-medium)' }}>
                  Auto-blocks scam calls/SMS, sends you alerts, and can call you automatically during danger
                </p>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <IonIcon icon={warning} color="warning" style={{ marginRight: '8px' }} />
                  <strong>Medium Protection</strong>
                </div>
                <p style={{ marginLeft: '32px', fontSize: '14px', color: 'var(--ion-color-medium)' }}>
                  Blocks scams and sends alerts to you
                </p>
              </div>
              
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <IonIcon icon={call} color="primary" style={{ marginRight: '8px' }} />
                  <strong>Low Protection</strong>
                </div>
                <p style={{ marginLeft: '32px', fontSize: '14px', color: 'var(--ion-color-medium)' }}>
                  Shows warnings only, no auto-blocking
                </p>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Add Member Modal */}
        <IonModal isOpen={showAddModal} onDidDismiss={() => setShowAddModal(false)}>
          <IonHeader>
            <IonToolbar color="warning">
              <IonTitle>Add Family Member</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowAddModal(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="page-container">
              <IonCard>
                <IonCardContent>
                  <IonItem>
                    <IonLabel position="floating">Name *</IonLabel>
                    <IonInput
                      value={newMember.name}
                      onIonChange={e => setNewMember({ ...newMember, name: e.detail.value })}
                      placeholder="Mother, Father, etc."
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Phone Number *</IonLabel>
                    <IonInput
                      type="tel"
                      value={newMember.phone}
                      onIonChange={e => setNewMember({ ...newMember, phone: e.detail.value })}
                      placeholder="+91-9999999999"
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel>Relation</IonLabel>
                    <IonSelect
                      value={newMember.relation}
                      onIonChange={e => setNewMember({ ...newMember, relation: e.detail.value })}
                    >
                      <IonSelectOption value="parent">Parent</IonSelectOption>
                      <IonSelectOption value="spouse">Spouse</IonSelectOption>
                      <IonSelectOption value="child">Child</IonSelectOption>
                      <IonSelectOption value="sibling">Sibling</IonSelectOption>
                      <IonSelectOption value="other">Other</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Protection Level</IonLabel>
                    <IonSelect
                      value={newMember.protectionLevel}
                      onIonChange={e => setNewMember({ ...newMember, protectionLevel: e.detail.value })}
                    >
                      <IonSelectOption value="high">High (Recommended)</IonSelectOption>
                      <IonSelectOption value="medium">Medium</IonSelectOption>
                      <IonSelectOption value="low">Low</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                  <IonButton
                    expand="block"
                    style={{ marginTop: '20px' }}
                    onClick={handleAddMember}
                    disabled={!newMember.name || !newMember.phone}
                    color="warning"
                  >
                    <IonIcon icon={add} slot="start" />
                    Add Member
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </div>
          </IonContent>
        </IonModal>

        {/* Alerts Modal */}
        <IonModal isOpen={showAlertsModal} onDidDismiss={() => setShowAlertsModal(false)}>
          <IonHeader>
            <IonToolbar color="danger">
              <IonTitle>Alerts for {selectedMember?.name}</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowAlertsModal(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="page-container">
              <IonList>
                {alerts.map(alert => (
                  <IonCard key={alert.id} color={alert.severity === 'high' ? 'danger' : 'warning'}>
                    <IonCardContent>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <strong>{alert.type.replace(/_/g, ' ').toUpperCase()}</strong>
                        <IonBadge color={alert.wasBlocked ? 'success' : 'warning'}>
                          {alert.wasBlocked ? 'BLOCKED' : 'WARNED'}
                        </IonBadge>
                      </div>
                      <p style={{ margin: '4px 0', fontSize: '12px', opacity: 0.9 }}>
                        {new Date(alert.timestamp).toLocaleString()}
                      </p>
                      <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
                        {alert.details.reason}
                      </p>
                    </IonCardContent>
                  </IonCard>
                ))}
              </IonList>
            </div>
          </IonContent>
        </IonModal>

        {/* SOS Alert */}
        <IonAlert
          isOpen={showSOSAlert}
          onDidDismiss={() => setShowSOSAlert(false)}
          header="Send SOS Alert?"
          message="This will immediately alert all your family members that you need help."
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Send SOS',
              handler: handleSOS
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default FamilyProtection;






