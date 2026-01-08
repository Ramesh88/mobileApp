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
  IonItem,
  IonLabel,
  IonList,
  IonIcon,
  IonBackButton,
  IonButtons,
  IonBadge,
  IonSegment,
  IonSegmentButton
} from '@ionic/react';
import { school, book, trophy, playCircle, checkmarkCircle } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { getLessons, getFraudStories } from '../services/api';

const Education = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState('lessons');
  const [lessons, setLessons] = useState([]);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const lessonsData = await getLessons();
      const storiesData = await getFraudStories();
      setLessons(lessonsData);
      setStories(storiesData);
    } catch (error) {
      console.error('Error loading content:', error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'danger';
      default:
        return 'medium';
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" />
          </IonButtons>
          <IonTitle>📚 Learn & Practice</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="page-container">
          {/* Info Card */}
          <IonCard color="light">
            <IonCardContent>
              <p style={{ margin: 0, fontSize: '14px' }}>
                Take quick lessons to learn about different types of scams and how to protect yourself.
                Learn from real fraud stories and improve your safety awareness.
              </p>
            </IonCardContent>
          </IonCard>

          {/* Tab Selector */}
          <IonSegment value={activeTab} onIonChange={e => setActiveTab(e.detail.value)}>
            <IonSegmentButton value="lessons">
              <IonLabel>Lessons</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="stories">
              <IonLabel>Real Stories</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          {/* Lessons Tab */}
          {activeTab === 'lessons' && (
            <>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Interactive Lessons</IonCardTitle>
                </IonCardHeader>
                <IonCardContent style={{ padding: 0 }}>
                  <IonList>
                    {lessons.map(lesson => (
                      <IonItem
                        key={lesson.id}
                        button
                        onClick={() => history.push(`/education/${lesson.id}`)}
                        className="lesson-card"
                      >
                        <div className="lesson-thumbnail" slot="start">
                          {lesson.thumbnail}
                        </div>
                        <IonLabel>
                          <h3>{lesson.title}</h3>
                          <p style={{ fontSize: '13px', marginTop: '4px' }}>
                            {lesson.description}
                          </p>
                          <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                            <IonBadge color={getDifficultyColor(lesson.difficulty)}>
                              {lesson.difficulty}
                            </IonBadge>
                            <IonBadge color="medium">
                              {lesson.duration}
                            </IonBadge>
                          </div>
                        </IonLabel>
                        {lesson.completed ? (
                          <IonIcon icon={checkmarkCircle} color="success" slot="end" />
                        ) : (
                          <IonIcon icon={playCircle} color="primary" slot="end" />
                        )}
                      </IonItem>
                    ))}
                  </IonList>
                </IonCardContent>
              </IonCard>
            </>
          )}

          {/* Stories Tab */}
          {activeTab === 'stories' && (
            <>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Real Fraud Stories</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              
              {stories.map(story => (
                <IonCard key={story.id}>
                  <IonCardHeader>
                    <IonCardTitle style={{ fontSize: '18px' }}>
                      {story.title}
                    </IonCardTitle>
                    <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--ion-color-medium)' }}>
                      {story.persona}
                    </p>
                  </IonCardHeader>
                  <IonCardContent>
                    <div style={{ marginBottom: '12px' }}>
                      <strong style={{ color: 'var(--ion-color-primary)' }}>Scenario:</strong>
                      <p style={{ margin: '4px 0', fontSize: '14px' }}>{story.scenario}</p>
                    </div>
                    
                    <div style={{ marginBottom: '12px' }}>
                      <strong style={{ color: 'var(--ion-color-warning)' }}>What Happened:</strong>
                      <p style={{ margin: '4px 0', fontSize: '14px' }}>{story.what_happened}</p>
                    </div>
                    
                    <div style={{ marginBottom: '12px' }}>
                      <strong style={{ color: 'var(--ion-color-danger)' }}>Mistake:</strong>
                      <p style={{ margin: '4px 0', fontSize: '14px' }}>{story.mistake}</p>
                    </div>
                    
                    <div style={{
                      marginTop: '16px',
                      padding: '12px',
                      background: 'var(--ion-color-success)',
                      borderRadius: '8px',
                      color: 'white'
                    }}>
                      <strong>✓ Lesson Learned:</strong>
                      <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>{story.lesson}</p>
                    </div>
                    
                    <div style={{
                      marginTop: '12px',
                      textAlign: 'center',
                      padding: '12px',
                      background: 'var(--ion-color-light)',
                      borderRadius: '8px'
                    }}>
                      <IonIcon icon={trophy} color="warning" style={{ fontSize: '24px' }} />
                      <p style={{ margin: '4px 0 0 0', fontWeight: '600' }}>
                        Money Saved: ₹{story.money_saved.toLocaleString()}
                      </p>
                    </div>
                  </IonCardContent>
                </IonCard>
              ))}
            </>
          )}

          {/* Progress Card */}
          <IonCard color="primary">
            <IonCardContent>
              <div style={{ textAlign: 'center', padding: '10px' }}>
                <IonIcon icon={school} style={{ fontSize: '48px', color: 'white' }} />
                <h3 style={{ margin: '12px 0 4px 0', color: 'white' }}>Keep Learning!</h3>
                <p style={{ margin: 0, color: 'white', opacity: 0.9 }}>
                  Complete all lessons to become a fraud detection expert
                </p>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Education;






