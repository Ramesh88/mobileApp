import React from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme and Custom Styles */
import './theme/variables.css';
import './App.css';

/* Pages */
import Dashboard from './pages/Dashboard';
import CallScanner from './pages/CallScanner';
import SmsScanner from './pages/SmsScanner';
import LinkScanner from './pages/LinkScanner';
import QRScanner from './pages/QRScanner';
import FamilyProtection from './pages/FamilyProtection';
import Education from './pages/Education';
import LessonDetail from './pages/LessonDetail';
import Settings from './pages/Settings';

setupIonicReact();

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/call-scanner" component={CallScanner} />
          <Route exact path="/sms-scanner" component={SmsScanner} />
          <Route exact path="/link-scanner" component={LinkScanner} />
          <Route exact path="/qr-scanner" component={QRScanner} />
          <Route exact path="/family" component={FamilyProtection} />
          <Route exact path="/education" component={Education} />
          <Route exact path="/education/:id" component={LessonDetail} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;


