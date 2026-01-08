import axios from 'axios';

// For now, use static JSON data
// Later, replace with actual API calls to backend
const USE_API = false; // Set to true when backend is ready
const API_BASE_URL = 'http://localhost:3000/api';

// Static JSON Data (will be replaced with API calls)
import callData from '../data/callData.json';
import smsData from '../data/smsData.json';
import linkData from '../data/linkData.json';
import qrData from '../data/qrData.json';
import familyData from '../data/familyData.json';
import educationData from '../data/educationData.json';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Call Scanner APIs
export const analyzeCall = async (phoneNumber, callerName) => {
  if (!USE_API) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const analysis = callData.scamPatterns.find(pattern => 
      phoneNumber.includes(pattern.pattern) || 
      (callerName && callerName.toLowerCase().includes(pattern.keyword))
    );
    
    if (analysis) {
      return {
        isScam: true,
        riskLevel: analysis.riskLevel,
        reason: analysis.reason,
        advice: analysis.advice
      };
    } else {
      return {
        isScam: false,
        riskLevel: 'low',
        reason: 'No suspicious patterns detected',
        advice: 'Call appears safe, but stay vigilant'
      };
    }
  }
  
  const response = await api.post('/calls/analyze', { phoneNumber, callerName });
  return response.data;
};

export const getCallHistory = async () => {
  if (!USE_API) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return callData.callHistory;
  }
  
  const response = await api.get('/calls/history');
  return response.data;
};

export const getCallStats = async () => {
  if (!USE_API) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return callData.statistics;
  }
  
  const response = await api.get('/calls/stats');
  return response.data;
};

// SMS Scanner APIs
export const analyzeSMS = async (message, sender) => {
  if (!USE_API) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const messageLower = message.toLowerCase();
    const detectedPattern = smsData.fraudPatterns.find(pattern => {
      return pattern.keywords.some(keyword => messageLower.includes(keyword.toLowerCase()));
    });
    
    if (detectedPattern) {
      return {
        isFraud: true,
        category: detectedPattern.category,
        riskLevel: detectedPattern.riskLevel,
        reason: detectedPattern.reason,
        recommendation: detectedPattern.recommendation
      };
    } else {
      return {
        isFraud: false,
        category: 'legitimate',
        riskLevel: 'low',
        reason: 'No suspicious patterns detected',
        recommendation: 'Message appears safe'
      };
    }
  }
  
  const response = await api.post('/sms/analyze', { message, sender });
  return response.data;
};

export const getSmsHistory = async () => {
  if (!USE_API) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return smsData.smsHistory;
  }
  
  const response = await api.get('/sms/history');
  return response.data;
};

// Link Scanner APIs
export const analyzeLink = async (url) => {
  if (!USE_API) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const urlLower = url.toLowerCase();
    const threat = linkData.threatIndicators.find(indicator => {
      return indicator.patterns.some(pattern => urlLower.includes(pattern));
    });
    
    if (threat) {
      return {
        isSafe: false,
        status: threat.status,
        riskLevel: threat.riskLevel,
        threats: threat.threats,
        recommendation: threat.recommendation
      };
    } else {
      return {
        isSafe: true,
        status: 'safe',
        riskLevel: 'low',
        threats: [],
        recommendation: 'Link appears safe to visit'
      };
    }
  }
  
  const response = await api.post('/links/analyze', { url });
  return response.data;
};

// QR Scanner APIs
export const analyzeQR = async (qrContent, imageData) => {
  if (!USE_API) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const contentLower = qrContent.toLowerCase();
    const fraudIndicator = qrData.fraudIndicators.find(indicator => {
      return indicator.patterns.some(pattern => contentLower.includes(pattern));
    });
    
    if (fraudIndicator) {
      return {
        isTampered: true,
        isSafe: false,
        fraudType: fraudIndicator.type,
        riskLevel: fraudIndicator.riskLevel,
        warning: fraudIndicator.warning,
        recommendation: fraudIndicator.recommendation
      };
    } else {
      return {
        isTampered: false,
        isSafe: true,
        fraudType: null,
        riskLevel: 'low',
        warning: null,
        recommendation: 'QR code appears legitimate'
      };
    }
  }
  
  const response = await api.post('/qr/analyze', { qrContent, imageData });
  return response.data;
};

export const verifyPaymentScreenshot = async (imageData, amount, merchantName) => {
  if (!USE_API) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Random simulation for demo
    const isReal = Math.random() > 0.3;
    
    if (isReal) {
      return {
        isReal: true,
        confidence: 0.92,
        analysis: {
          screenshotAuthenticity: 'genuine',
          transactionId: 'verified',
          timestamp: 'valid',
          upiDetails: 'correct'
        },
        recommendation: 'Payment screenshot appears authentic'
      };
    } else {
      return {
        isReal: false,
        confidence: 0.85,
        analysis: {
          screenshotAuthenticity: 'suspicious',
          transactionId: 'not found',
          timestamp: 'edited',
          upiDetails: 'inconsistent'
        },
        recommendation: 'FAKE SCREENSHOT DETECTED - Do not accept payment'
      };
    }
  }
  
  const response = await api.post('/qr/verify-payment', { imageData, amount, merchantName });
  return response.data;
};

// Family Protection APIs
export const getFamilyMembers = async () => {
  if (!USE_API) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return familyData.familyMembers;
  }
  
  const response = await api.get('/family/members');
  return response.data;
};

export const addFamilyMember = async (memberData) => {
  if (!USE_API) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      member: {
        id: Date.now().toString(),
        ...memberData,
        addedAt: new Date().toISOString(),
        alerts: 0
      }
    };
  }
  
  const response = await api.post('/family/members', memberData);
  return response.data;
};

export const getFamilyAlerts = async (memberId) => {
  if (!USE_API) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return familyData.sampleAlerts;
  }
  
  const response = await api.get(`/family/alerts/${memberId}`);
  return response.data;
};

export const sendSOS = async (memberId, type, details) => {
  if (!USE_API) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      message: 'SOS alert sent to family members',
      alertId: Date.now().toString()
    };
  }
  
  const response = await api.post('/family/sos', { memberId, type, details });
  return response.data;
};

// Education APIs
export const getLessons = async () => {
  if (!USE_API) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return educationData.lessons;
  }
  
  const response = await api.get('/education/lessons');
  return response.data;
};

export const getLesson = async (id) => {
  if (!USE_API) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return educationData.lessons.find(l => l.id === id);
  }
  
  const response = await api.get(`/education/lessons/${id}`);
  return response.data;
};

export const getQuiz = async (lessonId) => {
  if (!USE_API) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return educationData.quizzes.find(q => q.lessonId === lessonId);
  }
  
  const response = await api.get(`/education/quiz/${lessonId}`);
  return response.data;
};

export const submitQuiz = async (quizId, answers) => {
  if (!USE_API) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const quiz = educationData.quizzes.find(q => q.id === quizId);
    if (!quiz) return { error: 'Quiz not found' };
    
    let correct = 0;
    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correct++;
      }
    });
    
    const score = (correct / quiz.questions.length) * 100;
    
    return {
      score,
      correct,
      total: quiz.questions.length,
      passed: score >= 70
    };
  }
  
  const response = await api.post('/education/quiz/submit', { quizId, answers });
  return response.data;
};

export const getFraudStories = async () => {
  if (!USE_API) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return educationData.fraudStories;
  }
  
  const response = await api.get('/education/stories');
  return response.data;
};

export default api;

