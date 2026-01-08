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
  IonIcon,
  IonBackButton,
  IonButtons,
  IonRadioGroup,
  IonRadio,
  IonItem,
  IonLabel,
  IonBadge
} from '@ionic/react';
import { checkmarkCircle, closeCircle, trophy } from 'ionicons/icons';
import { useParams, useHistory } from 'react-router-dom';
import { getLesson, getQuiz, submitQuiz } from '../services/api';

const LessonDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const [lesson, setLesson] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    loadLesson();
  }, [id]);

  const loadLesson = async () => {
    try {
      const lessonData = await getLesson(id);
      setLesson(lessonData);
      
      const quizData = await getQuiz(id);
      setQuiz(quizData);
    } catch (error) {
      console.error('Error loading lesson:', error);
    }
  };

  const handleSubmitQuiz = async () => {
    const answerArray = Object.values(answers);
    try {
      const resultData = await submitQuiz(quiz.id, answerArray);
      setResult(resultData);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (!lesson) {
    return <IonPage><IonContent>Loading...</IonContent></IonPage>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/education" />
          </IonButtons>
          <IonTitle>{lesson.thumbnail} {lesson.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="page-container">
          {!showQuiz && !result && (
            <>
              {/* Lesson Content */}
              <IonCard>
                <IonCardHeader>
                  <div style={{ textAlign: 'center', fontSize: '64px', marginBottom: '16px' }}>
                    {lesson.thumbnail}
                  </div>
                  <IonCardTitle>{lesson.title}</IonCardTitle>
                  <div style={{ marginTop: '8px' }}>
                    <IonBadge color="medium">{lesson.duration}</IonBadge>
                    <IonBadge color="primary" style={{ marginLeft: '8px' }}>
                      {lesson.difficulty}
                    </IonBadge>
                  </div>
                </IonCardHeader>
                <IonCardContent>
                  <p>{lesson.description}</p>
                </IonCardContent>
              </IonCard>

              {/* Topics */}
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>What You'll Learn</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <ul style={{ marginTop: 0, paddingLeft: '20px' }}>
                    {lesson.topics.map((topic, index) => (
                      <li key={index} style={{ marginBottom: '8px' }}>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </IonCardContent>
              </IonCard>

              {/* Start Quiz Button */}
              <IonButton
                expand="block"
                size="large"
                color="danger"
                onClick={() => setShowQuiz(true)}
              >
                <IonIcon icon={trophy} slot="start" />
                Take Quiz
              </IonButton>
            </>
          )}

          {/* Quiz */}
          {showQuiz && !result && quiz && (
            <>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>{quiz.title}</IonCardTitle>
                </IonCardHeader>
              </IonCard>

              {quiz.questions.map((question, index) => (
                <IonCard key={question.id}>
                  <IonCardContent>
                    <h3 style={{ marginTop: 0 }}>
                      Question {index + 1}
                    </h3>
                    <p style={{ fontSize: '16px', fontWeight: '500' }}>
                      {question.question}
                    </p>
                    
                    <IonRadioGroup
                      value={answers[index]}
                      onIonChange={e => setAnswers({ ...answers, [index]: e.detail.value })}
                    >
                      {question.options.map((option, optionIndex) => (
                        <IonItem key={optionIndex}>
                          <IonLabel style={{ whiteSpace: 'normal' }}>{option}</IonLabel>
                          <IonRadio slot="start" value={optionIndex} />
                        </IonItem>
                      ))}
                    </IonRadioGroup>
                  </IonCardContent>
                </IonCard>
              ))}

              <IonButton
                expand="block"
                size="large"
                color="danger"
                onClick={handleSubmitQuiz}
                disabled={Object.keys(answers).length !== quiz.questions.length}
              >
                <IonIcon icon={checkmarkCircle} slot="start" />
                Submit Quiz
              </IonButton>
            </>
          )}

          {/* Results */}
          {result && (
            <>
              <IonCard color={result.passed ? 'success' : 'warning'}>
                <IonCardContent>
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <IonIcon
                      icon={result.passed ? checkmarkCircle : closeCircle}
                      style={{ fontSize: '80px', color: 'white' }}
                    />
                    <h2 style={{ margin: '16px 0 8px 0', color: 'white' }}>
                      {result.passed ? '🎉 Congratulations!' : '📚 Keep Learning!'}
                    </h2>
                    <h1 style={{ margin: '8px 0', fontSize: '48px', color: 'white' }}>
                      {result.score.toFixed(0)}%
                    </h1>
                    <p style={{ margin: 0, fontSize: '18px', color: 'white' }}>
                      {result.correct} out of {result.total} correct
                    </p>
                  </div>
                </IonCardContent>
              </IonCard>

              {result.passed ? (
                <IonCard color="light">
                  <IonCardContent>
                    <p style={{ textAlign: 'center', margin: 0 }}>
                      <strong>✓ Lesson Completed!</strong><br />
                      You've successfully mastered this topic.
                    </p>
                  </IonCardContent>
                </IonCard>
              ) : (
                <IonCard color="light">
                  <IonCardContent>
                    <p style={{ textAlign: 'center', margin: 0 }}>
                      You need 70% to pass. Review the lesson and try again!
                    </p>
                  </IonCardContent>
                </IonCard>
              )}

              <IonButton
                expand="block"
                color="primary"
                onClick={() => history.push('/education')}
              >
                Back to Lessons
              </IonButton>

              {!result.passed && (
                <IonButton
                  expand="block"
                  color="danger"
                  fill="outline"
                  onClick={() => {
                    setShowQuiz(false);
                    setResult(null);
                    setAnswers({});
                  }}
                >
                  Review Lesson
                </IonButton>
              )}
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LessonDetail;






